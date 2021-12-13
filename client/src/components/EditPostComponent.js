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
        this.onClickDelete = this.onClickDelete.bind(this);

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

    async componentDidMount() {
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
        else{

        
            let currentPost = sessionStorage.getItem('current post');
            let PostID = currentPost ? currentPost : sessionStorage.getItem('previous post')
            sessionStorage.setItem('current quiz', sessionStorage.getItem('previous quiz'))

            await axios.get('http://localhost:4000/posts/' + PostID)
            .then(res => {
                this.setState({
                    id: res.data.PostID,
                    title: res.data.PostTitle,
                    desc: res.data.PostDesc,
                    picture: res.data.PostPicture,
                    platformID: res.data.PlatformID
                })
            })

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

    onClickDelete = async() => {

        var r = confirm("Are you sure you want to delete this post? This action cannot be undone.")

        if(r == true){

        let platCreator = ""

            await axios.get('http://localhost:4000/platforms/' + this.state.platformID)
            .then(res => {
          
                let Platform = res.data
                platCreator = Platform.PlatformCreator
               

            })

            if(platCreator == sessionStorage.getItem('UserID')){

                await axios.delete('http://localhost:4000/posts/deletePost/' + this.state.id)
                .then(res => {
                    console.log('deleted post!')
                })
                .catch(err => {
                    console.log(err)
                })

                await axios.get('http://localhost:4000/platforms/' + this.state.platformID)
                .then(res => {
                    let Platform = res.data
                    const index = Platform.PlatformContentArray.indexOf(this.state.id)
                    if (index > -1){
                        Platform.PlatformContentArray.splice(index, 1)
                    }

                    axios.put('http://localhost:4000/platforms/updatePlatform/' + this.state.platformID, Platform).then(res => {})

                    this.props.history.push({
                        pathname:'/platform/'+this.state.platformID,
                        state: {isLoggedIn:true}
                        });
                    window.location.reload(false)
                    
                })
                window.location.reload(false)
            }
            else{

                alert("Sorry, you do not have permission to do that.")
            }
        }
        else{
            
        }

    }


    

    onSubmit = async(e) => {
        e.preventDefault()

        let currentPlatform = sessionStorage.getItem('current platform');
        let PlatformID = currentPlatform ? currentPlatform : sessionStorage.getItem('previous platform')
        sessionStorage.setItem('current platform', sessionStorage.getItem('previous platform'))


        const updatedPostObject = {
            PostTitle: this.state.title,
            PostDesc: this.state.desc,
            PostPicture: this.state.picture,
            PostID: this.state.id,
            PlatformID: PlatformID
        }

        const editPostPath = ('http://localhost:4000/posts/updatePost/' + this.state.id)

        await axios.put(editPostPath, updatedPostObject)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        
        this.props.history.push({
            pathname: '/platform/' + PlatformID,
            state: { isLoggedIn: true }
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
                            <Form.Control type="text" maxLength="12" value={this.state.title} onChange={this.onChangePostTitle} />
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

                            <Button className ='cancelbutton' variant='danger' onClick={this.onClickDelete}>
                                Delete Post
                            </Button>

                        </div>
                    </div>
                </Form>
            </Container>
        );
    }
}