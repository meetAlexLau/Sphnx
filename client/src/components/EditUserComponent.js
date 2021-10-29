import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

      axios.get('http://localhost:4000/users/UserID/' + sessionStorage.getItem('UserID'))
        .then(res => {
          console.log(res.data[0]._id)
          this.setState({
            IDtoEdit: res.data[0]._id ,
            UserName: res.data[0].UserName ,
            UserPrimaryColor: res.data[0].UserPrimaryColor,
            UserSecondaryColor: res.data[0].UserSecondaryColor /* SOLUTION FOUND:
                                         Axios put and get are ASYNC functions, that's why you're getting
                                         an error for get and put. Some of the time, it is putting before getting.

                                         --You need to make both functions async/await so that you wait for 
                                          .get to execute, then execute .put
                                        */
          })
        })

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


        const updatedUser = {
          UserPicture: this.state.UserPicture,
          UserBackgroundPicture: this.state.UserBackgroundPicture,
          UserName: this.state.UserName,
          UserPrimaryColor: this.state.UserPrimaryColor,
          UserSecondaryColor: this.state.UserSecondaryColor
        }

        
        const newPath = ('http://localhost:4000/users/'+this.state.IDtoEdit)
        
        axios.put(newPath, updatedUser)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
        this.props.history.push('/profile')
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
            <Container fluid style={{ width: "100%" }}>
    <Row className="containerrow">
      <Col className="medium" md={6}>
        <Container className="light loginleft">
          <div
            style={{
              width: "311px",
              height: "76px",
              left: "54px",
              top: "87px",

              fontFamily: "Oxygen",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "60px",
              lineHeight: "76px",
              textAlign: "center"
            }}
          >
            Edit Profile
          </div>

          <div
            style={{
              width: "864px",
              height: "801px",

              background: "#E7C496",
              border: "solid",
              boxSizing: "border-box",
              borderRadius: "15px"
            }}
          >
            <Form>
              <Form.Group controlId="formUserName">
                <Form.Label
                  style={{
                    width: "218px",
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
                defaultValue={this.state.UserPrimaryColor}
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
                defaultValue={this.state.UserSecondaryColor}
                title="Choose your color"
                onChange={this.onChangeUserSecondaryColor}
              />

              <Link
                style={{position: 'absolute',
                        width: '164px',
                        height: '76px',
                        left: '431px',
                        top: '700px',
                        
                        background: '#FF6961',
                        border: 'solid',
                        borderColor: "black",
                        borderSize: '4px',
                        boxSizing: 'border-box',
                        borderRadius: '20px',
                  }}
                  to={'/profile'}>
                    Exit
              </Link>
              <Button
                
                style={{position: 'absolute',
                  width: '233px',
                  height: '76px',
                  left: '608px',
                  top: '700px',
                  
                  background: '#77DD77',
                  border: 'solid',
                  borderSize: '4px',
                  borderColor: 'black',
                  boxSizing: 'border-box',
                  borderRadius: '20px',
                }}
                onClick={this.onSubmit}>
                  Save & Exit
              </Button>
            </Form>
          </div>
        </Container>
      </Col>
    </Row>
  </Container>
        )

    }
}
