import React, { Component } from "react";

import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image'
import axios from 'axios'


export default class Post extends Component {

    constructor(props) {
        super(props)
        this.onClickBack = this.onClickBack.bind(this)
        // Setting up state
        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            postId: '',
            postTitle: '',
            postDec: '',
            picture: '',
            platformID: ''

        }
    }

    async componentDidMount() {
        if (this.props.location.state.isLoggedIn == false) {
            this.props.history.push('/')
        }
        else {

            let currentPost = sessionStorage.getItem('current post');
            let PostID = currentPost ? currentPost : sessionStorage.getItem('previous post')
            sessionStorage.setItem('current post', sessionStorage.getItem('previous post'))

            await axios.get('http://localhost:4000/posts/' + PostID)
                .then(res => {
                    this.setState({
                        postId: res.data._id,
                        postTitle: res.data.PostTitle,
                        postDec: res.data.PostDesc,
                        picture: res.data.PostPicture,
                        platformID: res.data.PlatformID,
                    })
                })

            await axios.get('http://localhost:4000/platforms/' + this.state.platformID)
                .then(res => {
                    let Platform = res.data
                    this.setState({
                        oldPlatform: Platform,
                        platformName: Platform.PlatformName
                    })
                })
        }
    }

    onClickBack() {
        this.props.history.goBack()
    }
    

    onClickDelete = async() => {

        let platCreator = ""

        await axios.get('http://localhost:4000/platforms/' + this.state.platformID)
        .then(res => {
            let Platform = res.data
            platCreator = Platform.PlatformCreator

        })

        if(platCreator == sessionStorage.getItem('UserID')){

            await axios.delete('http://localhost:4000/posts/deletePost/' + this.state.postId)
            .then(res => {
                console.log('deleted post!')
            })
            .catch(err => {
                console.log(err)
            })

            await axios.get('http://localhost:4000/platforms/' + this.state.platformID)
            .then(res => {
                let Platform = res.data
                const index = Platform.PlatformContentArray.indexOf(this.state.postId)
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
        }
        else{

            alert("Sorry, you do not have permission to do that.")
        }


    }

    render() {
        return (
            <div>
                <div key={this.state.indexOfQuestion}>

                    <div className="background" >
                        <div className="quiz-content">

                            <h1 style={{ textAlign: 'center', fontSize: 20 }}>{this.state.postTitle}</h1>

                            <h2 style={{ fontSize: 15, marginLeft: "5%" }}>{this.state.postDec}</h2>
                            <img style={{ "witdth": "70px", "height": "70px", marginLeft: "5%" }} src={this.state.picture} />

                            <div style={{ "width": "100%", "display": "table" }}>

                            </div>

                            <button className="quiz-button" onClick={() => this.onClickBack()}>
                                Back
                            </button>
                            <button className='quiz-button' onClick={() => this.onClickDelete()}>Delete Post</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
