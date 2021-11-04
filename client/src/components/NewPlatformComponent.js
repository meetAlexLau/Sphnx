import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
//import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Container } from "react-bootstrap";
import '../App.css';

const NAME_OF_UPLOAD_PRESET = "kmowfgdj";
const YOUR_CLOUDINARY_ID = "dxczlnkjx";

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
        this.onChangePlatformColor1 = this.onChangePlatformColor1.bind(this);
        this.onChangePlatformColor2 = this.onChangePlatformColor2.bind(this);
        this.onChangePlatformPicture = this.onChangePlatformPicture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            title: '',
            desc: '',
            color1: '',
            color2: '',
            picture: '',
            id: ''
        }
    }
    componentDidMount() {
        if(this.state.isLoggedIn !== "true"){
            this.props.history.push('/')
        }
        else{
            
        axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
         .then(res => {
          let User = res.data[0];
            this.setState({
                oldUser: User,
                IDtoEdit: User._id
            })
        })
        }
    }
    setUploadingImg(isUploading){
        this.setState({
            uploading: isUploading
        })
    }

    handleFileChange = async event => {
        const [file] = event.target.files;
        if (!file) return;

       
        const uploadedUrl = await uploadImage(file);
        this.setState({
            PlatformPicture: uploadedUrl
        })
    };

    routeChangeProfile() {
        this.props.history.push('/profile')
        window.location.reload(false)
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

    onChangePlatformColor1(e) {
        this.setState({ color1: e.target.value })
    }

    onChangePlatformColor2(e) {
        this.setState({ color2: e.target.value })
    }

    onChangePlatformPicture(e) {
        this.setState({ picture: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault()

        let updatedUser = this.state.oldUser
        updatedUser.UserPoints = updatedUser.UserPoints + 25


        const platformObject = {
            PlatformName: this.state.title,
            PlatformDesc: this.state.desc,
            PlatformColor1: this.state.color1,
            PlatformColor2: this.state.color2,
            PlatformPicture: this.state.PlatformPicture,
            PlatformID: this.state.id
        }

        axios.post('http://localhost:4000/platforms/createPlatform', platformObject).then(res => console.log(res.data));
        const newPath = ('http://localhost:4000/users/'+this.state.IDtoEdit)
        
        axios.put(newPath, updatedUser)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))

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
                            <Form.Control type="file" className="choose-file-button" accept='image/*' onChange={this.handleFileChange}/>
                        </Form.Group>

                        <div>
                            <Form.Label>Color1:</Form.Label>
                            <Form.Control type="color" value={this.state.color1} onChange={this.onChangePlatformColor1} />
                            <Form.Label>Color2:</Form.Label>
                            <Form.Control type="color" value={this.state.color2} onChange={this.onChangePlatformColor2} />
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