import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from "react-bootstrap";

import '../App.css';

const NAME_OF_UPLOAD_PRESET = "sphnxPreset";
const YOUR_CLOUDINARY_ID = "sphnx";

var newIDofPost = ""

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

export default class NewPostComponent extends Component {

    constructor(props) {
        super(props)

        // Routes
        this.routeChangePlatform = this.routeChangePlatform.bind(this);
        //this.routeChange

        // Setting up functions
        this.onChangePostTitle = this.onChangePostTitle.bind(this);
        this.onChangePostId = this.onChangePostId.bind(this);
        this.onChangePostDesc = this.onChangePostDesc.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            title: '',
            desc: '',
            picture: '',
            id: ''
        }
    }
    componentDidMount() {
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
        else{
            
        axios.get('/users/UserID/' + sessionStorage.getItem('UserID'))
         .then(res => {
          let User = res.data[0];
            this.setState({
                oldUser: User,
                IDtoEdit: User._id
            })
        })
        }
    }
   

    handleFileChange = async event => {
        const [file] = event.target.files;
        if (!file) return;

       
        const uploadedUrl = await uploadImage(file);
        this.setState({
            picture: uploadedUrl
        })
    };

    routeChangePlatform(e) {
        this.props.history.goBack()
    }

    onChangePostTitle(e) {
        this.setState({ title: e.target.value })
    }

    onChangePostId(e) {
        this.setState({ id: e.target.value })
    }

    onChangePostDesc(e) {
        this.setState({ desc: e.target.value })
    }


    

    onSubmit = async(e) => {
        e.preventDefault()

        let currentPlatform = sessionStorage.getItem('current platform');
        let PlatformID = currentPlatform ? currentPlatform : sessionStorage.getItem('previous platform')
        sessionStorage.setItem('current platform', sessionStorage.getItem('previous platform'))


        const postObject = {
            PostTitle: this.state.title,
            PostDesc: this.state.desc,
            PostPicture: this.state.picture,
            PostID: this.state.id,
            PlatformID: PlatformID
        }

        await axios.post('/posts/createPost', postObject).then(res => {newIDofPost = res.data});


        axios.get('/platforms/' + PlatformID)
        .then(res => {
            console.log(sessionStorage.getItem('current platform'));
            console.log('logging res', res);
            let plat = res.data;
            plat.PlatformPostArray.push(newIDofPost);
            plat.PlatformContentArray.push(newIDofPost);
            axios.put('/platforms/updatePlatform/' + PlatformID, plat).then(res => {})
        })  
   
       
        this.props.history.push({
            pathname:'/platform/'+PlatformID,
            state: {isLoggedIn:true}
            });
        window.location.reload(false)

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
                            <Form.Control type="text"  maxLength="12" value={this.state.title} onChange={this.onChangePostTitle} />
                        </Form.Group>

                        Select Image:
                        <Form.Group>
                            <Form.Control type="file" className="choose-file-button" accept='image/*' onChange={this.handleFileChange}/>
                        </Form.Group>

                        <div class="light">
                            <Form.Group controlId="Description">
                                <Form.Label>Description:</Form.Label>
                                {/*
                                <Form.Control type="textarea" size="lg" value={this.state.desc} onChange={this.onChangePostDesc} />
                                <textarea value={this.state.desc} onChange={this.onChangePostDesc} />
                                */}
                                
                                <Form.Control as="textarea" style={{backgroundColor: '#F3ECC9'}} rows={3} value={this.state.desc} onChange={this.onChangePostDesc}/>
                               

                            </Form.Group>
                        </div>

                        <div class="text-right">
                            <Button className='savebutton' type="submit">
                                Save
                            </Button>

                            <Button className='cancelbutton' variant="warning" onClick={this.routeChangePlatform}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }
}