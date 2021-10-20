import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class UserComponent extends Component{

    constructor(props){

        super(props)

    }

    render(){

        return(
            <div style={{background: '#FF5353'}}>
                <Container>

                    <Row>

                        <Link to={'/home'}>Home</Link>

                    </Row>
                    <Row>
                        <Stack direction="horizontal" gap={3}>
                            <div>

                            </div>
                            <div>
                                
                            </div>
                        </Stack>
                    </Row>
                </Container>
            </div>
        )
    }


}