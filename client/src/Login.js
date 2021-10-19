import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class Login extends Component{
    constructor(props){
        super(props);

    }
    routeChange() {
        //should be  /home/:userid
        axios.post('/home')
        .then(res => console.log(res.data));
    }
    render(){
        return (
            <Button onClick={routeChange} variant="primary">
                Login
            </Button>
        )
    }
}