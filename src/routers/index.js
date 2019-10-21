import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import Patients from '../components/Patients.vue';
import Patient_Profile from '../components/Patient-Profile.vue';

const routes = [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/profile', component: Profile },
    { path: '/patients', component: Patients },
    { path: '/patient/:id', component: Patient_Profile },
];

export default routes;