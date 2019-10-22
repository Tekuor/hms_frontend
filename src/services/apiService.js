import axios from 'axios';
const API_URL = 'http://localhost:4000/api';

let token = localStorage.getItem('token')
let config = {
    headers: {
        Authorization: "Bearer " + token
    }
}

export class apiService{

constructor(){
}

register(user){
    const url = `${API_URL}/user/signup/`;
    return axios.post(url,user);
}

login(user){
    const url = `${API_URL}/user/signin/`;
    return axios.post(url,user,config);
}

getUser(pk) {
    const url = `${API_URL}/users/${pk}`;
    return axios.get(url,config).then(response => response.data);
}

getIssues(user_id) {
    const url = `${API_URL}/issues/`;
    return axios.post(url,{'user_id':user_id},config);
}

createIssue(issue){
    const url = `${API_URL}/issue/`;
    return axios.post(url,issue,config);
}

getIssue(pk) {
    const url = `${API_URL}/issue/${pk}`;
    return axios.get(url,config).then(response => response.data);
}

updateIssue(issue){
    const url = `${API_URL}/issue/${issue._id}`;
    return axios.put(url,issue,config);
}

deleteIssue(pk){
    const url = `${API_URL}/delete/issue/${pk}`;
        return axios.get(url,config,);
}

getReplies(issue_id) {
    const url = `${API_URL}/replies/`;
    return axios.post(url,{'issue_id':issue_id},config);
}

createReply(reply){
    const url = `${API_URL}/reply/`;
    return axios.post(url,reply,config);
}

updateUser(user){
    const url = `${API_URL}/user/${user._id}`;
    return axios.put(url,user,config);
}

getUsers(){
    const url = `${API_URL}/users/`;
    return axios.get(url,config).then(response => response.data);
}

allIssues(){
    const url = `${API_URL}/all/issues/`;
    return axios.get(url,config).then(response => response.data);
}

closeIssue(issue){
    const url = `${API_URL}/close/issue/${issue._id}`;
    return axios.put(url,issue,config);
}

issueStatus(status) {
    const url = `${API_URL}/find/issues/`;
    return axios.post(url,{'status':status},config);
}

}