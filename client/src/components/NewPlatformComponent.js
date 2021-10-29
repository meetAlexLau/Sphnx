import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from "react-bootstrap";
import '../App.css';

const NAME_OF_UPLOAD_PRESET = "kmowfgdj";
const YOUR_CLOUDINARY_ID = "dxczlnkjx";

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
        this.onChangePlatformColor = this.onChangePlatformColor.bind(this);
        this.onChangePlatformPicture = this.onChangePlatformPicture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            desc: '',
            color: '',
            picture: '',
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

    onChangePlatformColor(e) {
        this.setState({ color: e.target.value })
    }

    onChangePlatformPicture(e) {
        this.setState({ picture: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const platformObject = {
            PlatformName: this.state.title,
            PlatformDesc: this.state.desc,
            PlatformColor: this.state.color,
            PlatformPicture: this.state.picture,
            PlatformID: this.state.id
        }

        axios.post('http://localhost:4000/platforms/createPlatform', platformObject).then(res => console.log(res.data));

        this.routeChangeProfile();
        /*
        this.setState({
            title: '',
            desc: '',
            id: ''
        });
        */
    }

//
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
                        <Form.Group>
                            <Form.Control type="file" className="choose-file-button"/>
                        </Form.Group>

                        <div>
                            <Form.Label>Color:</Form.Label>
                            <Form.Control type="color" value={this.state.color} onChange={this.onChangePlatformColor} />
                        </div>

                        <div class="light">
                            <Form.Group controlId="Description">
                                <Form.Label>Description:</Form.Label>
                                <Form.Control type="textarea" size="lg" value={this.state.desc} onChange={this.onChangePlatformDesc} />
                            </Form.Group>
                        </div>

                        <div class="text-right">
                            <Button className='savebutton' type="submit">
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