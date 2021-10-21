import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default class NewPlatformComponent extends Component {
    constructor(props) {
        super(props)

        // Routes
        this.routeChangeUser = this.routeChangeUser.bind(this);
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

    routeChangeUser() {
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
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
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

                <Form.Group controlId="Description">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control type="textarea" size="lg" value={this.state.desc} onChange={this.onChangePlatformDesc} />
                </Form.Group>

                <div class="text-right">
                    <Button className='savebutton' type="submit" onClick={this.routeChangeUser}>
                        Save
                    </Button>

                    <Button className='cancelbutton' variant="danger" onClick={this.routeChangeUser}>
                        Cancel
                    </Button>
                </div>

            </Form>

        </div>);
    }
}