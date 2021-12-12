import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import '../css/UserComponent.css'

export default class UserComponent extends Component{

    constructor(props){

        super(props)

        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            UserPrimaryColor: '',
            ID: '',
            UserSecondaryColor: '',
            UserName: '',
            UserPicture: "",
            UserBackgroundPicture: '',
            UserPoints: 0,
            UserPlatformArray: [],
            UserFriendArray: []
        }

        this.onClickNewPlatform = this.onClickNewPlatform.bind(this)
        this.onClickHome = this.onClickHome.bind(this)
        this.onClickPlatform = this.onClickPlatform.bind(this)
        this.onClickFriend = this.onClickFriend.bind(this)
        this.onClickMyBadge = this.onClickMyBadge.bind(this)
        this.onClickQuiz = this.onClickQuiz.bind(this)
        this.onClickEditProfile = this.onClickEditProfile.bind(this)
        this.renderPlatforms = this.renderPlatforms.bind(this)
        this.renderFriends = this.renderFriends.bind(this)
        this.renderIsFriend = this.renderIsFriend.bind(this)
        this.friendDisplay = this.friendDisplay.bind(this)
        this.addFriend = this.addFriend.bind(this)

    }

    componentDidMount = async() =>{
        if (this.state.isLoggedIn == "false" || this.state.isLoggedIn == undefined) {
            this.props.history.push('/')
        }
        else{       
            console.log(this.props.match.params.id);
            axios.get('http://localhost:4000/users/' + this.props.match.params.id)
                .then(res => {
                    let User = res.data;
                    this.setState({
                        ID: User._id,
                        UserName : User.UserName,
                        UserPicture : User.UserPicture,
                        UserPrimaryColor : User.UserPrimaryColor,
                        UserSecondaryColor : User.UserSecondaryColor,
                        UserBackgroundPicture : User.UserBackgroundPicture,
                        UserPoints : User.UserPoints,
                        UserPlatformArray: User.UserPlatformArray,
                        UserFriendArray : User.UserFriendArray
                    }) 
                    this.renderPlatforms();
                    this.renderFriends();
                })
        }

        let getUserID = sessionStorage.getItem('UserID');
        let getFriendID = this.props.match.params.id;

        await axios.get('http://localhost:4000/users/UserID/' + getUserID)
            .then(res => {
                let friendFlag = res.data[0].UserFriendArray.find(id => id == getFriendID);
                if (typeof friendFlag === 'undefined') friendFlag = false;
                else friendFlag = true;
                this.setState({
                    isFriend: friendFlag
                })
            })
    }

    onClickHome(){
        this.props.history.push({
            pathname: '/home',
            state: {isLoggedIn: true}
        })
    }

    onClickNewPlatform(){
      this.props.history.push({
          pathname:'/newPlatform',
          state: {isLoggedIn:true}
          })
    }

    onClickPlatform(PlatformID){
        sessionStorage.setItem('current platform', PlatformID);
        sessionStorage.setItem('previous platform', PlatformID);
        this.props.history.push({
            pathname:'/platform/' + PlatformID,
            state: {isLoggedIn:true}
            });
    }

    onClickFriend(friendID){

        console.log('here')
        sessionStorage.setItem('profileID', friendID)
        this.props.history.push('/')
        
        this.props.history.push({
            pathname:'/profile/' + friendID,
            state: {isLoggedIn:true}

        });
        window.location.reload(false)
    }

    onClickMyBadge(){
      this.props.history.push({
          pathname: '/myBadge/' + this.state.ID,
          state: {isLoggedIn:true, ID: this.state.ID}
      })
    }

    onClickEditProfile(){
        this.props.history.push({
            pathname: '/profile/edit/' + this.state.ID,
            state: {isLoggedIn: true}
        })
    }

    onClickQuiz(){
      this.props.history.push('/quiz')
    }

    renderPlatforms(){
        let p: [number, string] = [];
        let promises = [];
        
        //console.log(this.state.UserPlatformArray);

        for(let i =0; i < this.state.UserPlatformArray.length; i++){
            let platID = this.state.UserPlatformArray[i];
            promises.push(
                axios.get('http://localhost:4000/platforms/' + platID)
                    .then(res => {
                        let object = res.data;
                        p.push([object.PlatformID, object.PlatformName]);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            )
        }
        Promise.all(promises).then(() => {
            this.setState({
                UserPlatformArray: p
            })
        });
    }

    renderFriends(){
        let f: [number, string] = [];
        let promises = [];

        for(let i = 0; i < this.state.UserFriendArray.length; i++){
            let friendID = this.state.UserFriendArray[i];
            promises.push(
                axios.get('http://localhost:4000/users/' + friendID)
                .then(res => {
                    let object = res.data;
                    f.push([friendID, object.UserName])
                })
                .catch((err) => {
                    console.log(err)
                })
            )
        }
        Promise.all(promises).then(() => {
            this.setState({
                UserFriendArray: f
            })
        })
    }

    friendDisplay(){

        if (this.state.isFriend == true) {
            document.getElementById('add friend').innerHTML = 'Add friend'
            alert("Removed " + this.state.UserName + " as a friend!");
          }
          else if (this.state.isFriend == false) {
            document.getElementById('add friend').innerHTML = 'Unfriend'
            alert("Added " + this.state.UserName + " as a friend!");
          }
        
    }

    renderIsFriend(){

    if (document.getElementById('add friend'))
      if (this.state.isFriend == true) {
        document.getElementById('add friend').innerHTML = 'Unfriend';
      }
      else if (this.state.isFriend == false) {
        document.getElementById('add friend').innerHTML = 'Add friend'
      }

    }

    renderEditProfileButton(){
        if(this.props.match.params.id == sessionStorage.getItem('ID'))
            return <Button onClick={this.onClickEditProfile} 
            className="profilePageButton" style={{background: this.state.UserPrimaryColor}}>Edit Profile </Button>
    }

    renderNewPlatformButton() {
        if(this.props.match.params.id == sessionStorage.getItem('ID'))
            return <Button onClick={this.onClickNewPlatform} className="profileNewPlatform" style={{background: this.state.UserPrimaryColor}}> New Platform </Button>
    }

    renderAddFriendButton() {
        if(this.props.match.params.id != sessionStorage.getItem('ID'))
            return <Button id="add friend"
                    to={"/"}
                    onClick={() => this.addFriend()}
                    className="profilePageButton"
                    style={{background: this.state.UserPrimaryColor}}
                >
                    {
                    this.renderIsFriend()
                    }
                </Button>
    }

    addFriend = async () => {
        this.friendDisplay()
        let getUserID = sessionStorage.getItem('UserID');
        let newFriendID = this.props.match.params.id;
        let user;
        await axios.get('http://localhost:4000/users/UserID/' + getUserID)
        .then(res => {
            user = res.data[0];
        })

        if(this.state.isFriend == true){
            let tempFriendArray = user.UserFriendArray;
            user.UserFriendArray = tempFriendArray.filter(function (value) {
                console.log(value);
                return value !== newFriendID;
            })
        }
        else{
            user.UserFriendArray.push(newFriendID)
        }

        this.setState({
            isFriend: !this.state.isFriend
        })

        await axios.put('http://localhost:4000/users/'+ user._id, user)
        .then(res => console.log("User friend Arr:", res))
        .catch(err => console.log("User friend Arr Err:", err))
    }

    
    render(){
        let plats = this.state.UserPlatformArray?.map((plat, i) => {
            return(
            <Button key={i} 
                    onClick={() => this.onClickPlatform(plat[0])} 
                    className="profileCard" 
                    style={{background: this.state.UserPrimaryColor}}
                    >
                    {plat[1]}
            </Button>
            )
        })

        let friends = this.state.UserFriendArray?.map((friend, i) =>{
            return(
                <Button key={i}
                        onClick={() => this.onClickFriend(friend[0])}
                        className="profileCard"
                        style={{background: this.state.UserPrimaryColor}}
                        >
                            {friend[1]}
                        </Button>
            )
        })

        return(
          <Container className='profileBackground' fluid style={{ background: this.state.UserPrimaryColor }}>
            <Row>
                <Col md={12}>
                    <Row>
                        <Col className='profileColumn profileHomeCol'>
                            <Button onClick={this.onClickHome} className="homeButton">
                                Return Home
                            </Button>
                        </Col>
                        <Col md={8}
                             className="profileBackgroundBlock"
                             style={{backgroundImage: this.state.UserBackgroundPicture}} >
                            <Row>
                                <Col md={1}>
                                    
                                </Col>
                                <Col md={10}>
                                    <Image
                                    className="rounded-circle"
                                    style={{ margin: "auto", width: "33%", display: "block" }}
                                    src={this.state.UserPicture}
                                    />
                                    <div className="profileNameTag"
                                        style={{background: this.state.UserSecondaryColor}}>{this.state.UserName}</div>
                                    <div className="profileNameTag"
                                        style={{background: this.state.UserSecondaryColor}}>Total Points: {""+this.state.UserPoints}</div>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='profileColumn profileEditCol'>
                            <Button onClick={this.onClickMyBadge} className="profilePageButton" style={{background: this.state.UserPrimaryColor}}>View All Badges</Button>
                            {this.renderEditProfileButton()}
                            {this.renderAddFriendButton()}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="profileBlockBase">
            <Col md={6}
                className="profileBlock"
                style={{background: this.state.UserSecondaryColor}}>
                    <Row>
                        <Col md={10}>
                            <div className="profileCardTitle" style={{background: this.state.UserPrimaryColor}}>My Platforms</div>
                        </Col>
                        <Col md={2}>
                            {this.renderNewPlatformButton()}
                        </Col>
                    </Row>
                    
                        <Col md={12} style={{margin: '8px'}}>
                            {plats}
                        </Col>
                    
                
            </Col>
            <Col md={6}>
                <div className="profileBlock"
                style={{background: this.state.UserSecondaryColor}}>
                    <Row>
                        <Col md={12}>
                            <div className="profileCardTitle" style={{background: this.state.UserPrimaryColor}}> Friends List </div>
                        
                            <Col md={12} style={{margin:'8px'}}>
                                {friends}
                            </Col>
                        </Col>
                    </Row>
                </div>
            </Col>
            </Row>
      </Container>
      )
    }


}
