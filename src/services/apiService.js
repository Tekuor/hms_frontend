import axios from 'axios';
const API_URL = 'https://hmsbackend.herokuapp.com/api';

export class apiService{

constructor(){
}

register(user){
    const url = `${API_URL}/user/signup/`;
    return axios.post(url,user);
}

login(user){
    const url = `${API_URL}/user/signin/`;
    return axios.post(url,user);
}

getUser(pk) {
    const url = `${API_URL}/users/${pk}`;
    return axios.get(url).then(response => response.data);
}

getIssues(user_id) {
    const url = `${API_URL}/issues/`;
    return axios.post(url,{'user_id':user_id});
}

createIssue(issue){
    const url = `${API_URL}/issue/`;
    return axios.post(url,issue);
}

getIssue(pk) {
    const url = `${API_URL}/issue/${pk}`;
    return axios.get(url).then(response => response.data);
}

updateIssue(issue){
    const url = `${API_URL}/issue/${issue._id}`;
    return axios.put(url,issue);
}

deleteIssue(pk){
    const url = `${API_URL}/delete/issue/${pk}`;
        return axios.get(url);
}

getReplies(issue_id) {
    const url = `${API_URL}/replies/`;
    return axios.post(url,{'issue_id':issue_id});
}

createReply(reply){
    const url = `${API_URL}/reply/`;
    return axios.post(url,reply);
}

updateUser(user){
    const url = `${API_URL}/user/${user._id}`;
    return axios.put(url,user);
}

getUsers(){
    const url = `${API_URL}/users/`;
    return axios.get(url).then(response => response.data);
}

}