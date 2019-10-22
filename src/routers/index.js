import Vue from 'vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import Patients from '../components/Patients.vue';
import Patient_Profile from '../components/Patient-Profile.vue';
import Issues from '../components/Issues.vue';
import VueRouter from 'vue-router';




const routes = [
    { 
        path: '/', 
        component: Login
    },
    { 
        path: '/login', 
        component: Login
    },
    { 
        path: '/register', 
        component: Register
    },
    { 
        path: '/profile', 
        component: Profile,
        meta: { requiresAuth: true ,adminAuth:false , patientAuth : true} 
    },
    { 
        path: '/patients', 
        component: Patients,
        meta: { requiresAuth: true ,adminAuth:true , patientAuth : false} 
    },
    { 
        path: '/patient/:id', 
        component: Patient_Profile,
        meta: { requiresAuth: true ,adminAuth:true , patientAuth : false} 
    },
    { 
        path: '/issues', 
        component: Issues,
        meta: { requiresAuth: true ,adminAuth:true , patientAuth : false} 
    },
]

Vue.use(VueRouter)

const router = new VueRouter({ routes,history:true});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth) {
    const authUser = localStorage.getItem('isLoggedIn')
    if(!authUser) {
        next('/login')
    }
    else if(to.meta.adminAuth) {
        const authUser = localStorage.getItem('type')
        if(authUser === 'doctor') {
            next()
        }else {
            next('/profile')
        }
    } 
    else if(to.meta.patientAuth) {
        const authUser = localStorage.getItem('type')
        if(authUser === 'patient') {
            next()
        }else {
            next('/patients')
        }
    }
    else{
        next()
    }
}
else{
    next()
}
    
})

export default router;