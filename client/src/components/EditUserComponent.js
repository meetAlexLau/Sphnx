import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import '../css/EditUser.css';
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

export default class EditUserComponent extends Component{

    constructor(props){
        super(props)

        this.state = {
          isLoggedIn: sessionStorage.getItem('isLoggedIn'),
          UserPrimaryColor: '',
          UserSecondaryColor: '',
          UserName: '',
          UserPicture:'',
          UserBackgroundPicture: '',
          IDtoEdit: ''
        }

        this.onChangeUserName = this.onChangeUserName.bind(this)
        this.onChangeUserPrimaryColor = this.onChangeUserPrimaryColor.bind(this)
        this.onChangeUserSecondaryColor = this.onChangeUserSecondaryColor.bind(this)
        this.setUploadingImg = this.setUploadingImg.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        

    }

    componentDidMount(){
      if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
        this.props.history.push('/')
      }
      else{

        axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
          .then(res => {
            let User = res.data[0]
            this.setState({
              oldUser: User,
              IDtoEdit: User._id ,
              UserName: User.UserName ,
              UserPrimaryColor: User.UserPrimaryColor,
              UserSecondaryColor: User.UserSecondaryColor,
              UserPicture: User.UserPicture,
              UserBackgroundPicture: User.UserBackgroundPicture
            })
          })
      }

      console.log(this.state.IDtoEdit)

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
      console.log(uploadedUrl)
      this.setState({

        UserPicture: uploadedUrl

      })

    };

    handleFileChange2 = async event => {
      const [file] = event.target.files;
      if (!file) return;
    
      
      const uploadedUrl2 = await uploadImage(file);
      console.log(uploadedUrl2)
      this.setState({

        UserBackgroundPicture: 'url(' + uploadedUrl2 + ')'

      })
    
    };

    onSubmit(e){

        let updatedUser = this.state.oldUser
      
        updatedUser.UserPicture= this.state.UserPicture
        updatedUser.UserBackgroundPicture= this.state.UserBackgroundPicture
        updatedUser.UserName= this.state.UserName
        updatedUser.UserPrimaryColor= this.state.UserPrimaryColor
        updatedUser.UserSecondaryColor= this.state.UserSecondaryColor
      

        
        const newPath = ('http://localhost:4000/users/'+this.state.IDtoEdit)
        
        axios.put(newPath, updatedUser)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
        this.props.history.push(
          {
            pathname: '/profile/'+ this.state.IDtoEdit,
            state: {isLoggedIn: true}
          })
        window.location.reload(false);

      }
      
    

    onChangeUserName(e){
      this.setState({
        UserName: e.target.value
      })
    }

    onChangeUserPrimaryColor(e){
      this.setState({
        UserPrimaryColor: e.target.value
      })
    }

    onChangeUserSecondaryColor(e){
      this.setState({
        UserSecondaryColor: e.target.value
      })
    }

    render(){
        return(
            <Container fluid className='editusercontainer medium'>
                  <Container className="light edituserinner">
                    <div style={{fontSize: 60}}>
                      Edit Profile
                    </div>

                    <div>
                      <Form>
                        <Form.Group controlId="formUserName">
                          <Form.Label
                            style={{
                              width: "250px",
                              height: "32px",
                              fontFamily: "Oxygen",
                              fontStyle: "normal",
                              fontWeight: "bold",
                              fontSize: "25px",
                              lineHeight: "32px"
                            }}
                          >
                            Change Username
                          </Form.Label>
                          <Form.Control type="text" placeholder={this.state.UserName} onChange={this.onChangeUserName} />
                        </Form.Group>

                        <Form.Group controlId="formUserProfilePicture">
                          <Form.Label
                            style={{
                              width: "314px",
                              height: "32px",
                              fontFamily: "Oxygen",
                              fontStyle: "normal",
                              fontWeight: "bold",
                              fontSize: "25px",
                              lineHeight: "32px"
                            }}
                          >
                            Profile Picture
                          </Form.Label>
                          <Form.Control type="file" accept='image/*' onChange={this.handleFileChange}/>
                        </Form.Group>

                        <Form.Group controlId="formUserBackgroundPicture">
                          <Form.Label
                            style={{
                              width: "100%",
                              height: "32px",
                              fontFamily: "Oxygen",
                              fontStyle: "normal",
                              fontWeight: "bold",
                              fontSize: "25px",
                              lineHeight: "32px"
                            }}
                          >
                            Profile Background Picture
                          </Form.Label>
                          <Form.Control type="file" accept='image/*' onChange={this.handleFileChange2}/>
                        </Form.Group>

                        <Form.Label
                          style={{
                            width: "300px",
                            height: "32px",
                            fontFamily: "Oxygen",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: "25px",
                            lineHeight: "32px"
                          }}
                        >
                          Primary Color
                        </Form.Label>
                        <Form.Control
                          type="color"
                          value={this.state.UserPrimaryColor}
                          title="Choose your color"
                          onChange={this.onChangeUserPrimaryColor}
                        />

                        <Form.Label
                          style={{
                            width: "300px",
                            height: "32px",
                            fontFamily: "Oxygen",
                            fontStyle: "normal",
                            fontWeight: "bold",
                            fontSize: "25px",
                            lineHeight: "32px"
                          }}
                        >
                          Secondary Color
                        </Form.Label>
                        <Form.Control
                          type="color"
                          value={this.state.UserSecondaryColor}
                          title="Choose your color"
                          onChange={this.onChangeUserSecondaryColor}
                        />

                        <Link className = 'edituserexit edituserbutton'
                            to={{pathname: '/profile/' + this.state.IDtoEdit, state:{isLoggedIn: true}}}>
                              Exit
                        </Link>
                        <Button className = 'editusersubmit edituserbutton'
                          onClick={this.onSubmit}>
                            Save & Exit
                        </Button>
                      </Form>
                    </div>
                  </Container>
  </Container>
        )

    }
}
