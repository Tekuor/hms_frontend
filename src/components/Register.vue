<template>
    <body>
        <div class="container">
            <div class="row">
            <div class="alert alert-danger col-md-3" v-show="showError" id="notify">
                <strong>Unsuccessful</strong>
                <button type="button" class="btn" @click="hidemessage()"><i class="fas fa-times" id="error"></i></button>
            </div>

            <div class="alert alert-success col-md-3" v-show="showSuccess" id="notify">
                <button type="button" class="btn" id="success"  @click="hidesuccess()"><i class="fas fa-times" id="success"></i></button>
                <strong>Successful</strong>
            </div>
            </div>
            <div class="card mb-3 mx-auto shadow rounded" style="margin-top:10%">
                <div class="row">
                    <div class="col-md-4">
                    <h5 class="text-center info text-white" style="margin-top: 65%;">Sign up to get access to send medical issues to doctors and receive responses from them</h5>
                    </div>
                    <div class="card-body col-md-8">
                        <h5 class="card-title">Register</h5>
                        <div class="row">
                            <form class="col-10">
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
                                    <div class="form-group col-md-12">
                                        <label for="password">Password</label>
                                        <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Password">
                                    </div>
                                </div>
                                <p class="card-text"><small class="text-muted">Already a user? <router-link to="/login">Login</router-link></small></p>
                                <button type="submit" class="btn btn-primary" @click="register()">Submit</button>
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
            user: {},
        };
    },
    methods: {
    register(){
        this.user.user_type="patient"
        service.register(this.user).then((result)=>{
            this.showSuccess = true;
            this.user = {};
            this.$router.push({ path:'login'});
            console.log(result);
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
    #notify { 
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