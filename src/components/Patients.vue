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
                            <router-link active-class="active" to="/issues"><a class="nav-link" href="#">Issues</a></router-link>
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
                <div class="card-body">
                    <h5>Patients</h5>
                    <p class="text-muted">List of all registered patients</p>
                    <div class="d-flex justify-content-center" v-if="!showPatients">
                            <div class="spinner-grow" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                    </div>
                    <div v-if="showPatients">
                    <table class="table table-hover">
                        <thead style="background-color:darkslateblue" class="text-white">
                            <tr>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Number</th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="user in users" v-bind:key="user">
                            <td>{{user.first_name}}</td>
                            <td>{{user.last_name}}</td>
                            <td>{{user.email}}</td>
                            <td>{{user.phone_number}}</td>
                            <td><router-link :to="'/patient/'+ user._id"><a>View</a></router-link></td>
                            </tr>
                        </tbody>
                    </table>
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
                users:[],
                number:0,
                username: '',
                showPatients:false,
            };

        },
        components: {
        },
        methods: {
            logout(){
            localStorage.clear();
            this.$router.push({path:'login'})
        }
        },
    mounted(){
        this.username = localStorage.getItem('name')
        service.getUsers().then((result)=>{
                    this.showPatients = true
                    this.users = result.data
                    console.log(result);
                },(error)=>{
                    this.showPatients = true
                    console.log(error);
        });
    }
    
}
</script>
<style>

</style>