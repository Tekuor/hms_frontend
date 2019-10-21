<template>
    <body>
        <div class="container">
            <div class="row">
            <div class="alert alert-danger col-md-3" v-show="showError" id="notification">
                <strong>Login Unsuccessful</strong>
                <button type="button" class="btn" @click="hidemessage()"><i class="fas fa-times" id="error"></i></button>
            </div>

            <div class="alert alert-success col-md-3" v-show="showSuccess" id="notification">
                <button type="button" class="btn" id="success"  @click="hidesuccess()"><i class="fas fa-times" id="success"></i></button>
                <strong>Login Successful</strong>
            </div>
            </div>
            <div class="card mb-3 mx-auto shadow rounded" style="max-width: 840px;">
                <div class="row">
                    <div class="col-md-4">
                    <h5 class="text-center info text-white">Login to send medical issues to doctors and receive responses from them</h5>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Login</h5>
                        <div class="row">
                            <form class="col-10">
                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input type="email" class="form-control" v-model="user.email" id="email" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Password">
                                </div>
                                <p class="card-text"><small class="text-muted">Not a user? <router-link to="/register">Register</router-link></small></p>
                                <button type="submit" class="btn btn-primary" @click="login()">Submit</button>
                            </form>
                        </div>
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
    components: {
    },
    data() {
        return {
            showError: false,
            showSuccess: false,
            user: {}
        };
    },
    methods: {
    login(){
        service.login(this.user).then((result)=>{
            this.showSuccess = true
            if(result.data.data.user_type == 'doctor'){
                this.$router.push({ path:'patients'});
            }
            else{
                this.$router.push({ path:'profile'});
            }
            localStorage.setItem('id',result.data.data._id);
            localStorage.setItem('name',result.data.data.first_name+" "+result.data.data.last_name);
        },(error)=>{
            console.log(error);
            this.showError = true;

        });
    },
    hidemessage(){
            this.showError = false;
    },
    hidesuccess(){
            this.showSuccess = false;
    },
    }
    }

</script>

<style>
    .card {
        margin-top: 25%;
    }

    body {
        background-color: #F8F8FF;
    }
    #notification { 
            position: absolute; 
            top: 2%; 
            right: 2%; 
            
        }
    .info{
        margin-top: 45%;
    }
    .col-md-4{
        background-color: darkslateblue
    }
</style>