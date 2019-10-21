<template>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark" style="background-color:darkslateblue">
            <a class="navbar-brand" href="#">HMS</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link to="/patients"><a class="nav-link">Patients</a></router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Issues</a>
                        </li>
                    </ul>
                    <span class="navbar-text ml-auto">
                    <a href="">Logout</a>
                    </span>
            </div>
        </nav>
        <div class="container-fluid">

            <div class="alert alert-danger col-md-3" v-show="showError" id="notification">
                <strong>Unsuccessful</strong>
                <button type="button" class="btn" @click="hidemessage()"><i class="fas fa-times" id="error"></i></button>
            </div>

            <div class="alert alert-success col-md-3" v-show="showSuccess" id="notification">
                <button type="button" class="btn" @click="hidesuccess()"><i class="fas fa-times" id="success"></i></button>
                <strong>Successful</strong>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-2 offset-md-2" id="details">
                    <div class="card ">
                        <div>
                        <avatar :username="fullname" :size=100 color="white" class="mx-auto mt-4" style="width: 100px;"></avatar>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center">{{user.first_name}} {{user.last_name}}</h5>
                                <p class="text-center">{{user.email}}</p>
                                <p class="text-center">{{user.phone_number}}</p>
                                <p class="text-center">{{user.dob | moment("from", "now",true)}}</p>
                                <p class="text-center">{{user.gender}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6"  style="max-width:900px;margin-top:-5%">
                    <div class="card">
                        <div class="card-body">
                            <div class="d-flex justify-content-center" v-if="!showIssue">
                                <div class="spinner-grow" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div v-if="showIssue">
                            <div>
                                <b><p class="text-center" v-if="issues === undefined || issues.length == 0">No medical issues logged</p></b>
                            </div>
                            <h4 class="card-title" v-if="issues.length > 0">Issues</h4>
                            <div class="list-group">
                                <a v-for="m_issue in issues" v-bind:key="m_issue" class="issues list-group-item list-group-item-action" >
                                    <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{m_issue.title}}</h5>
                                    <small class="text-muted">{{ m_issue.created_at | moment("from", "now") }}</small>
                                    </div>
                                    <p class="mb-1">{{m_issue.description|truncate(200)|tailing('...')}}</p>
                                    <div class="mt-4">
                                        <a href="" class="mr-2" data-toggle="modal" data-target="#viewModal" @click="getReplies(m_issue._id)">View</a>
                                    </div>
                                    
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="viewModal" tabindex="-1" role="dialog" aria-labelledby="viewModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="viewModalLabel">View Medical Issue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <h5>{{get_issue.title}}</h5>
                    <p>{{get_issue.description}}</p>

                    <h6>Replies</h6>
                    <div v-for="reply in replies" v-bind:key="reply">
                        <small class="text-muted">{{reply.commenter}}</small>
                        <small class="text-muted float-right">{{reply.created_at | moment("from", "now")}}</small>
                        <p>{{reply.description}}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <form class="col-12">
                        <h6>Reply</h6>
                        <div class="form-group">
                            <textarea class="form-control" id="description" rows="3" v-model="reply.description"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" @click="createReply()">Save</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
    import {apiService} from '../services/apiService';
    import Avatar from 'vue-avatar'

    const service = new apiService();

export default {
    data() {
            return {
                users:[],
                number:0,
                showIssue:false,
                user: {},
                fullname: "",
                issues: [],
                get_issue: {},
                reply: {},
                replies: [],
            };

        },
        components: {
            Avatar,
        },
        methods: {
            getIssue(pk){ 
                service.getIssue(pk).then((result)=>{
                    this.get_issue = result.data
                    console.log(result);
                },(error)=>{
                    console.log(error);
                });
            },
            getReplies(pk){
                this.getIssue(pk)
                service.getReplies(pk).then((result)=>{
                    this.replies = result.data.data
                    console.log(result);
                },(error)=>{
                    console.log(error);
            });
            },
            createReply(){
                let name = localStorage.getItem('name')
                this.reply.commenter = "Dr. "+ name
                this.reply.issue_id = this.get_issue._id
                service.createReply(this.reply).then((result)=>{
                    this.reply.description = '';
                    this.getReplies(this.get_issue._id)
                    console.log(result);
                },(error)=>{
                    console.log(error);
                });
            }
        },
    mounted(){
        let id = this.$route.params.id
        service.getUser(id).then((user)=>{
            this.user = user.data;
            this.fullname = this.user.first_name + " "+this.user.last_name
            console.log(this.user)
        }),
        service.getIssues(id).then((result)=>{
            this.issues = result.data.data
            this.showIssue = true
            console.log(result);
            },(error)=>{
            this.showIssue = true
            console.log(error);
        });
    }
    
}
</script>
<style>

</style>