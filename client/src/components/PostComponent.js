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
        if (this.state.isLoggedIn !== "true") {
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



                        </div>
                    </div>

                </div>




            </div>



        );
    }
}
