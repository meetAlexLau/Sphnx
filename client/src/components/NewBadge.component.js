import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";

export default class NewBadgeComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);

        // Setting up functions
        this.onChangeBadgeTitle = this.onChangeBadgeTitle.bind(this);
        this.onChangeBadgeId = this.onChangeBadgeId.bind(this);
        this.onChangeBadgeDesc = this.onChangeBadgeDesc.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            title: '',
            desc: '',
            id: ''
        }
    }

    routeChangePlatform(e) {
        this.props.history.push('/platform')
    }

    onChangeBadgeTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangeBadgeId(e) {
        this.setState({ id: e.target.value })
    }

    onChangeBadgeDesc(e) {
        this.setState({ desc: e.target.value })
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


    render() {
        //TODO: link Exit button
        return (
        <Container fluid className="sky containerrow">
            <Form onSubmit={this.onSubmit}>
                <div class="medium">
                    <Form.Group controlId="Title">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={this.onChangeBadgeTitle} />
                    </Form.Group>

                    Select Badge Image:
                    <div>
                        <Button className="choose-file-button">
                            Choose File
                        </Button>
                    </div>


                    <div class="light">
                        <Form.Group controlId="BadgeCondition">
                            <div>
                                <Form.Label>Select Badge Condition:</Form.Label>
                                <div>
                                <select id="conditions" name="conditions">
                                    <option value="blank">-------------------------------------------------------------------------------</option>
                                    <option value="QuizTime">Complete Quiz in /TIME/</option>
                                    <option value="QuizTime">Score at or above /PERCENT/</option>
                                    <option value="Leaderboard>">Reach /POSITION/ on the Leaderboard</option>
                                </select>
                                </div>
                            </div>
                        </Form.Group>

                        <Form.Group controlId="Description">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="textarea" size="lg" value={this.state.desc} onChange={this.onChangePlatformDesc} />
                        </Form.Group>
                    </div>

                    <div class="text-right">
                        <Button className='savebutton' type="submit" onClick={this.routeChangePlatform}>
                            Save
                        </Button>

                        <Button className='cancelbutton' variant="danger" onClick={this.routeChangePlatform}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>);
    }
}