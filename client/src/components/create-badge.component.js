import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { SketchPicker } from 'react-color';

export default class CreateBadge extends Component {
    constructor(props) {
        super(props)

        // Setting up functions
        this.onChangeBadgeTitle = this.onChangeBadgeTitle.bind(this);
        this.onChangeBadgeId = this.onChangeBadgeId.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            id: ''
        }
    }

    onChangeBadgeTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangeBadgeId(e) {
        this.setState({ id: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        const badgeObject = {
            title: this.state.title,
            id: this.state.id
        }

        //axios.post

        this.setState({
            title: '',
            id: ''
        });
    }

    render(){
        //TODO: link Exit button
        return (<div className="form-wrapper">
            <Form onSubmit={this.onSubmit}>
                <Form.Group controlId="Title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={this.state.title} onChange={this.onChangeBadgeTitle} />
                </Form.Group>
            
                <Button variant="danger" size="lg" block="block" type="submit">
                    Save
                </Button>

            </Form>
            
            <button>
                Exit
            </button>

        </div>);
    }
}