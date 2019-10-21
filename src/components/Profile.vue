<template>
    <body>
        <nav class="navbar navbar-expand-lg navbar-dark" style="background-color:darkslateblue">
            <a class="navbar-brand" href="#">HMS</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <span class="navbar-text ml-auto">
                        <ul class="navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Welcome, {{fullname}}
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a class="dropdown-item  text-primary" @click="logout()">Logout</a>
                                </div>
                            </li>
                        </ul>
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
                        <div class="mt-3 mr-2">
                            <a href="" data-toggle="modal" data-target="#detailsModal"><i class="fas fa-pencil-alt float-right"></i></a>
                        </div>
                        <div>
                        <avatar :username="fullname" :size=100 color="white" class="mx-auto mt-4" style="width: 100px;"></avatar>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center">{{user.first_name}} {{user.last_name}}</h5>
                                <p class="text-center">{{user.email}}</p>
                                <p class="text-center">{{user.phone_number}}</p>
                                <p class="text-center">{{user.dob}}</p>
                                <p class="text-center">{{user.gender}}</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6"  style="max-width:900px;margin-top:-5%">
                    <div class="card">
                        <div class="mt-3 mr-3">
                            <button class="btn btn-primary mb-4 float-right" data-toggle="modal" data-target="#addModal"><i class="fas fa-plus mr-2"></i>Add Issue</button>
                        </div>
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
                                        <a href="" class="mr-2" data-toggle="modal" data-target="#editModal" @click="getIssue(m_issue._id)">Edit</a>
                                        <a href="" data-toggle="modal" data-target="#closeModal" @click="getIssue(m_issue._id)" v-if="m_issue.status == 'open'">Close</a>
                                        <a href="" data-toggle="modal" data-target="#openModal" @click="getIssue(m_issue._id)" v-if="m_issue.status == 'closed'">Reopen</a>
                                        <div class=" float-right"><a href="" data-toggle="modal" data-target="#deleteModal" @click="getIssue(m_issue._id)"><i class="fas fa-trash"></i></a></div>
                                    </div>
                                    
                                </a>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addModalLabel">Add Medical Issue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="col-12">
                        <h6>Describe any medical issues you have in the form below</h6>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" v-model="issue.title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" rows="3" v-model="issue.description"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createIssue()">Save</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editModalLabel">Edit Medical Issue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="col-12">
                        <h6>Describe any medical issues you have in the form below</h6>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" class="form-control" id="title" v-model="get_issue.title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" rows="3" v-model="get_issue.description"></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="editIssue()">Save</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete Medical Issue</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete <b>{{get_issue.title}}</b> issue?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" @click="deleteIssue(get_issue._id)">Yes</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
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
                    <div>
                    <h5>{{get_issue.title}}</h5>
                    </div>
                    <p>{{get_issue.description}}</p>
                    <div>
                        <b><p class="text-center" v-if="replies === undefined || replies.length == 0">No Replies</p></b>
                    </div>
                    <h6 v-if="replies > 0">Replies</h6>
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
        <div class="modal fade" id="detailsModal" tabindex="-1" role="dialog" aria-labelledby="detailsModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="detailsModalLabel">Edit Details</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="first_name">First name</label>
                                <input type="text" class="form-control" v-model="user.first_name" id="first_name" placeholder="Enter first name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="last_name">Last name</label>
                                <input type="text" class="form-control" v-model="user.last_name" id="last_name" placeholder="Enter last name">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" v-model="user.email" id="email" placeholder="Enter email">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="phone_number">Phone number</label>
                                <input type="tel" class="form-control" v-model="user.phone_number" id="phone_number" placeholder="Enter phone number">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="dob">Date of Birth</label>
                                <input type="date" class="form-control" v-model="user.dob" id="dob">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="gender">Select gender</label>
                                <select class="form-control" v-model="user.gender" id="gender">
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="editUser()">Save</button>
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
    import Avatar from 'vue-avatar'

    const service = new apiService();

    export default {
        data() {
            return {
                showIssue:false,
                showError: false,
                showSuccess: false,
                user: {},
                fullname: "",
                issue: {},
                issues: [],
                get_issue: {},
                reply: {},
                replies: [],
                id:"",
            };

        },
        components: {
            Avatar
        },
        methods: {
            createIssue(){  
                let id = localStorage.getItem('id')
                this.issue.user_id = id
                this.issue.name = this.fullname
                this.issue.status = "open"
                service.createIssue(this.issue).then((result)=>{
                    this.showSuccess = true;
                    this.getIssues()
                    this.issue = {};
                    console.log(result);
                },(error)=>{
                    console.log(error);
                    this.showError = true;
                });
            },
            getIssues(){ 
                service.getIssues(this.id).then((result)=>{
                    this.issues = result.data.data
                    this.showIssue = true
                    console.log(result);
                },(error)=>{
                    this.showIssue = true
                    console.log(error);
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
            editIssue(){  
                service.updateIssue(this.get_issue).then((result)=>{
                    console.log(result);
                    this.showSuccess = true;
                },(error)=>{
                    console.log(error);
                    this.showError = true;
                });
            },
            deleteIssue(pk){ 
                service.deleteIssue(pk).then((result)=>{
                    this.getIssues()
                    this.showSuccess = true;
                    console.log(result);
                },(error)=>{
                    this.showError = true;
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
            createReply(){  
                let name = localStorage.getItem('name')
                this.reply.commenter = name
                this.reply.issue_id = this.get_issue._id
                service.createReply(this.reply).then((result)=>{
                    this.reply.description = '';
                    this.getReplies(this.get_issue._id)
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
            editUser(){  
                service.updateUser(this.user).then((result)=>{
                    this.showSuccess = true;
                    console.log(result);
                },(error)=>{
                    this.showError = true;
                    console.log(error);
                });
            },
            hidemessage(){
                this.showError = false;
            },
            hidesuccess(){
                this.showSuccess = false;
            },
            logout(){
            localStorage.clear();
            this.$router.push({path:'login'})
        }
        },
        mounted() {
            this.id = localStorage.getItem('id')
            service.getUser(this.id).then((user)=>{
                this.user = user.data;
                this.fullname = this.user.first_name + " "+this.user.last_name
                console.log(this.user)
            }),
            service.getIssues(this.id).then((result)=>{
                    this.issues = result.data.data
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
    #details{
        margin-top: 3%
    }
    #notification { 
            position: absolute; 
            top: 10%; 
            right: 2%; 
            
        }

</style>