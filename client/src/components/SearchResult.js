import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class SearchResult extends Component{
    constructor(props){
        super(props);

    }
    routeChangeHome() {
        //should be  /home/:userid
        axios.post('/home')
        .then(res => console.log(res.data));
    }
    routeChangeProfile(){
        //should be  /profile/:userid
        axios.post('/profile')
        .then(res => console.log(res.data));
    }
    render(){
        return (
            <Button onClick={routeChangeLogout} variant="primary">
                Login
            </Button>
            <Button onClick={} variant="primary">
                Platform Example
            </Button>
            <Button onClick={routeChangeProfile} variant="primary">
                Profile
            </Button>
        )
    }
}