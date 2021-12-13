import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
//import axios from 'axios';
//import { SketchPicker } from 'react-color';
import { Container } from "react-bootstrap";
const NAME_OF_UPLOAD_PRESET = "sphnxPreset";
const YOUR_CLOUDINARY_ID = "sphnx";


async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", NAME_OF_UPLOAD_PRESET);
    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${YOUR_CLOUDINARY_ID}/image/upload`,
        {
            method: "POST",
            body: data
        }
    );
    const img = await res.json();
    console.log(img);
    return img.secure_url;

}

export default class NewBadgeComponent extends Component {
    constructor(props) {
        super(props)

        // Setting up routes
        

        // Setting up functions
        this.onChangeBadgeTitle = this.onChangeBadgeTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onOption1Change = this.onOption1Change.bind(this)
        this.onOption2Change = this.onOption2Change.bind(this)
        this.onOption3Change = this.onOption3Change.bind(this)
        this.onChangeMaxTime = this.onChangeMaxTime.bind(this)
        this.onChangeMinScore = this.onChangeMinScore.bind(this)
        this.buildBadgeObject = this.buildBadgeObject.bind(this)

        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            badgeTitle: '',
            badgeID: '',
            badgeType: 0,
            minScore: 0,
            maxTime: 0,
            badgePicture: '',
            optionOneDisabled:'',
            optionTwoDisabled:'',
            optionThreeDisabled:''
        }
    }
    componentDidMount(){
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
    }

    onChangeBadgeTitle(e) {
        this.setState({ badgeTitle: e.target.value }, () => {
            if(this.props.onChange) {
                this.props.onChange(this.state, this.props.index)
            }
        })
    }

    onChangeMinScore(e){
        this.setState({minScore: e.target.value}, () => {
            if(this.props.onChange) {
                this.props.onChange(this.state, this.props.index)
            }
        })
    }

    onChangeMaxTime(e){
        this.setState({maxTime: e.target.value}, () => {
            if(this.props.onChange) {
                this.props.onChange(this.state, this.props.index)
            }
        })
    }

    onOption1Change(e){
        if(this.state.optionTwoDisabled != ''){
            this.setState({optionTwoDisabled : ''})
        }
        else{
            this.setState({optionTwoDisabled : 'true'})
        }

        if(this.state.optionThreeDisabled != ''){
            this.setState({optionThreeDisabled: ''})
        }
        else{
            this.setState({optionThreeDisabled: 'true'})
        }

        if(this.state.badgeType != 1){
            this.setState({badgeType: 1}, () => {
                if(this.props.onChange) {
                    this.props.onChange(this.state, this.props.index)
                }
            })
        }
    }

    onOption2Change(e){
        if(this.state.optionOneDisabled != ''){
            this.setState({optionOneDisabled : ''})
        }
        else{
            this.setState({optionOneDisabled : 'true'})
        }

        if(this.state.optionThreeDisabled != ''){
            this.setState({optionThreeDisabled: ''})
        }
        else{
            this.setState({optionThreeDisabled: 'true'})
        }

        if(this.state.badgeType != 2){
            this.setState({badgeType: 2}, () => {
                if(this.props.onChange) {
                    this.props.onChange(this.state, this.props.index)
                }
            })
        }

    }

    onOption3Change(e){
        if(this.state.optionTwoDisabled != ''){
            this.setState({optionTwoDisabled : ''})
        }
        else{
            this.setState({optionTwoDisabled : 'true'})
        }

        if(this.state.optionOneDisabled != ''){
            this.setState({optionOneDisabled: ''})
        }
        else{
            this.setState({optionOneDisabled: 'true'})
        }

        if(this.state.badgeType != 3){
            this.setState({badgeType: 3}, () => {
                if(this.props.onChange) {
                    this.props.onChange(this.state, this.props.index)
                }
            })
        }
    }

    buildBadgeObject(){

        console.log('badge title: ' + this.state.badgeTitle)
        if(this.state.badgeType == 1){
            console.log('badge type: beat min score')
        }
        else if(this.state.badgeType == 2){
            console.log('badge type: beat max time')

        }
        else if(this.state.badgeType == 3){
            console.log('badge type: perfect score')
        }
        else{
            console.log('badge type: unknown')
        }
        console.log('min score: ' + this.state.minScore)
        console.log('max time: ' + this.state.maxTime)
        console.log('badge picture url: ' + this.state.badgePicture)
    }

    onSubmit(e) {
        e.preventDefault()
    }

    handleFileChange = async event => {
        const [file] = event.target.files;
        if (!file) return;


        const uploadedUrl = await uploadImage(file);
        console.log(uploadedUrl)
        this.setState({

            badgePicture: uploadedUrl

        }, () => {
            if(this.props.onChange) {
                this.props.onChange(this.state, this.props.index)
            }
        })

    };


    render() {
        //TODO: link Exit button
        return (
        <Container fluid className="sky containerrow">
            <Form onSubmit={this.onSubmit}>
                <div class="medium">
                    <Form.Group controlId="Title">
                        <Form.Label>Badge Title:</Form.Label>
                        <Form.Control type="text" value={this.state.title} onChange={this.onChangeBadgeTitle} name="badgeTitle"/>
                    </Form.Group>

                    Select Badge Image:
                    <Form.Control type="file" accept='image/*' onChange={this.handleFileChange} />

                    <div class="light">
                        <Form.Group controlId="BadgeCondition">
                            <div>
                                <Form.Label>Badge Condition:</Form.Label>
                                <div>
                                    <Form.Check type='checkbox' label='Beat minimum score' onChange={this.onOption1Change} disabled={this.state.optionOneDisabled}></Form.Check>
                                    <Form.Check type='checkbox' label='Beat minimum time' onChange={this.onOption2Change} disabled={this.state.optionTwoDisabled}></Form.Check>
                                    <Form.Check type='checkbox'label='Earn perfect score' onChange={this.onOption3Change} disabled={this.state.optionThreeDisabled}></Form.Check>
                                </div>
                            </div>
                            <Form.Label>Minimum Score:</Form.Label>
                            <Form.Control type='number' disabled={this.state.optionOneDisabled} placeholder={this.state.minScore} onChange={this.onChangeMinScore} name="minScore"></Form.Control>
                            <Form.Label>Minimum Time:</Form.Label>
                            <Form.Control type='number' disabled={this.state.optionTwoDisabled} placeholder={this.state.maxTime} onChange={this.onChangeMaxTime} name="maxTime"></Form.Control>
                        </Form.Group>
                    </div>

                    <div class="text-right">
                        <Button className='savebutton' type="submit" onClick={this.buildBadgeObject}>
                            Save
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>);
    }
}