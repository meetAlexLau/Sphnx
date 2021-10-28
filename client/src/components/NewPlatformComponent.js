import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import axios from 'axios';
import { Container } from "react-bootstrap";
import '../App.css';

export default class NewPlatformComponent extends Component {
    constructor(props) {
        super(props)

        // Routes
        this.routeChangeProfile = this.routeChangeProfile.bind(this);
        //this.routeChange

        // Setting up functions
        this.onChangePlatformTitle = this.onChangePlatformTitle.bind(this);
        this.onChangePlatformId = this.onChangePlatformId.bind(this);
        this.onChangePlatformDesc = this.onChangePlatformDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            desc: '',
            id: ''
        }
    }

    routeChangeProfile() {
        this.props.history.push('/profile')
    }

    onChangePlatformTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangePlatformId(e) {
        this.setState({ id: e.target.value })
    }

    onChangePlatformDesc(e) {
        this.setState({ desc: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const platformObject = {
            title: this.state.title,
            id: this.state.id
        }

        //axios.post('/')

        this.setState({
            title: '',
            id: ''
        });
    }

    render() {
        //TODO: link Exit button
        return (
            <Container fluid className="sky containerrow">
                <Form onSubmit={this.onSubmit}>
                    <div class="medium">
                        <Form.Group controlId="Title">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" value={this.state.title} onChange={this.onChangePlatformTitle} />
                        </Form.Group>

                        Select Background Image:
                        <div>
                            <Button className="choose-file-button">
                                Choose File
                            </Button>
                        </div>

                        <div class="light">
                            <Form.Group controlId="Description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="textarea" size="lg" value={this.state.desc} onChange={this.onChangePlatformDesc} />
                            </Form.Group>
                        </div>

                        <div class="text-right">
                            <Button className='savebutton' type="submit" onClick={this.routeChangeProfile}>
                                Save
                            </Button>

                            <Button className='cancelbutton' variant="danger" onClick={this.routeChangeProfile}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }
}