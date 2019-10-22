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
                            <router-link active-class="active" to="/patients"><a class="nav-link">Patients</a></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link active-class="active" to="/issues"><a class="nav-link">Issues</a></router-link>
                        </li>
                    </ul>
                    <span class="navbar-text ml-auto">
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Welcome, Dr. {{username}}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item  text-primary" @click="logout()">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </span>
            </div>
        </nav>
        <div class="container">
            <div class="card mt-5">
                <div class="row">
                    <div class="col-4 mt-4 ml-auto mr-4">
                <select name="statusChange" @change="onChange($event)" class="form-control float-right" v-model="statusChange">
                    <option value="" disabled>Filter by status</option>
                    <option value="all">All</option>
                    <option value="open">Open</option>
                    <option value="closed">Closed</option>
                    </select>
                    </div>
                </div>
                <div class="card-body">
                    <h5>Issues</h5>
                    <p class="text-muted">List of all medical issues reported by patients</p>
                    
                        <div class="d-flex justify-content-center" v-if="!showIssue">
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <div v-if="showIssue">
                        <div>
                        <b><p class="text-center" v-if="issues === undefined || issues.length == 0">No Medical Issues Reported</p></b>
                        </div>
                        <div class="list-group">
                            <a v-for="m_issue in issues" v-bind:key="m_issue" class="issues list-group-item list-group-item-action" >
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{m_issue.title}}</h5>
                                    <small class="text-muted">{{ m_issue.created_at | moment("from", "now") }}</small>
                                </div>
                                <p class="text-muted">{{m_issue.name}}</p>
                                <p class="mb-1">{{m_issue.description|truncate(200)|tailing('...')}}</p>
                                <div class="mt-4">
                                    <a href="" class="mr-2" data-toggle="modal" data-target="#viewModal" @click="getReplies(m_issue._id)">View</a>
                                    <a href="" data-toggle="modal" data-target="#closeModal" @click="getIssue(m_issue._id)" v-if="m_issue.status == 'open'">Close</a>
                                    <a href="" data-toggle="modal" data-target="#openModal" @click="getIssue(m_issue._id)" v-if="m_issue.status == 'closed'">Reopen</a>
                                </div>
                            </a>
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
                    <p class="text-muted">{{get_issue.name}}</p>
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
                <div class="modal fade" id="closeModal" tabindex="-1" role="dialog" aria-labelledby="closeModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="closeModalLabel">Close Issue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to close <b>{{get_issue.title}}</b> issue?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="closeIssue(get_issue._id)">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="openModal" tabindex="-1" role="dialog" aria-labelledby="openModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="openModalLabel">Close Issue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to reopen <b>{{get_issue.title}}</b> issue?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="openIssue(get_issue._id)">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
    import {apiService} from '../services/apiService';

    const service = new apiService();

export default {
    
    data() {
        return {
            showIssue:false,
            issues: [],
            get_issue: {},
            reply: {},
            replies: [],
            username: '',
            statusChange: ''
        };

    },
    methods: {
        getIssues(){
            service.allIssues().then((result)=>{
                    this.issues = result.data
                    this.showIssue = true
                    console.log(result);
                },(error)=>{
                    this.showIssue = true
                    console.log(error);
            });
        },
        closeIssue(){  
                this.get_issue.status = "closed"
                service.updateIssue(this.get_issue).then((result)=>{
                    console.log(result);
                    this.getIssues()
                    this.showSuccess = true;
                },(error)=>{
                    console.log(error);
                    this.showError = true;
                });
            },
        openIssue(){  
                this.get_issue.status = "open"
                service.updateIssue(this.get_issue).then((result)=>{
                    console.log(result);
                    this.getIssues()
                    this.showSuccess = true;
                },(error)=>{
                    console.log(error);
                    this.showError = true;
                });
        },
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
        onChange(event) {
            if(event.target.value == 'open'){
                service.issueStatus(event.target.value).then((result)=>{
                    this.issues = result.data.data
                    console.log(result);
                },(error)=>{
                    console.log(error);
            });
            }
            else if(event.target.value == 'closed'){
                service.issueStatus(event.target.value).then((result)=>{
                    this.issues = result.data.data
                    console.log(result);
                },(error)=>{
                    console.log(error);
            });
            }
            else{
                this.getIssues()
            }
        },
        logout(){
            localStorage.clear();
            this.$router.push({path:'login'})
        }
    },
    mounted() {
            this.username = localStorage.getItem('name')
            service.allIssues().then((result)=>{
                    this.issues = result.data
                    this.showIssue = true
                    console.log(result);
                },(error)=>{
                    this.showIssue = true
                    console.log(error);
            });
        },
        filters: {
            truncate: function(value, limit) {
            return value.substring(0, limit)
            },
            tailing: function(value, tail) {
            return value + tail;
            }
        },
}
</script>

<style>

</style>