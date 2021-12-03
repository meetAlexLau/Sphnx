import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import axios from 'axios'


import '../css/userComponent.css'

export default class UserComponent extends Component{

    constructor(props){

        super(props)

        this.state = {
            isLoggedIn: sessionStorage.getItem('isLoggedIn'),
            UserPrimaryColor: '',
            UserSecondaryColor: '',
            UserName: '',
            UserPicture: "",
            UserBackgroundPicture: '',
            UserPoints: 0,
            UserPlatformArray: [],
            UserFriendArray: []
        }

        this.onClickNewPlatform = this.onClickNewPlatform.bind(this)
        this.onClickPlatform = this.onClickPlatform.bind(this)
        this.onClickFriend = this.onClickFriend.bind(this)
        this.onClickMyBadge = this.onClickMyBadge.bind(this)
        this.onClickQuiz = this.onClickQuiz.bind(this)
        this.renderPlatforms = this.renderPlatforms.bind(this)
        this.renderFriends = this.renderFriends.bind(this)
        this.renderIsFriend = this.renderIsFriend.bind(this)
        this.friendDisplay = this.friendDisplay.bind(this)
        this.addFriend = this.addFriend.bind(this)

    }

    componentDidMount = async() =>{
        console.log(this.props.location.state.isLoggedIn)
        if (this.props.location.state.isLoggedIn == false) {
            this.props.history.push('/')
        }
        else{
            
            axios.get('http://localhost:4000/users/' + this.props.match.params.id)
                .then(res => {
                    let User = res.data;
                    console.log(res);
                    this.setState({
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
        this.props.history.push({
            pathname:'/profile/' + friendID,
            state: {isLoggedIn:true}

        })

    }

    onClickMyBadge(){
      this.props.history.push({
          pathname: '/myBadge',
          state: {isLoggedIn:true}
      })
    }

    onClickQuiz(){
      this.props.history.push('/quiz')
    }

    renderPlatforms(){
        let p: [number, string] = [];
        let promises = [];
        
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

  
    renderNewPlatformButton() {
        if(this.props.match.params.id == sessionStorage.getItem('ID'))
            return <Button onClick={this.onClickNewPlatform} className="profileCard" style={{background: this.state.UserPrimaryColor}}> New Platform </Button>
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
        //<Button onClick={this.onClickPlatform}  className="profileCard" style={{background: this.state.UserPrimaryColor}}>Cowboys</Button>
        //<Button onClick={this.onClickPlatform} className="profileCard" style={{background: this.state.UserPrimaryColor}}>Instruments</Button>
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
                        onclick={() => this.onClickFriend(friend[0])}
                        className="profileCard"
                        style={{background: this.state.UserPrimaryColor}}
                        >
                            {friend[1]}
                        </Button>
            )
        })

        return(
          <Container fluid style={{ background: this.state.UserPrimaryColor }}>
            <Row>
            <Col md={12}>
                <Row>
                <Col md={1}>
                    <Link to={{pathname:"/home", state: {isLoggedIn:true}}} class="homeButton">
                    Return Home
                    </Link>
                </Col>
                <Col
                    md={10}
                    className="profileBackgroundBlock"
                    style={{backgroundImage: this.state.UserBackgroundPicture}}
                >
                    <Row>
                    <Col md={1}>
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
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
                    <Col md={1}>
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                        <Image
                        src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                        fluid
                        />
                    </Col>
                    </Row>
                </Col>
                <Col md={1}>
                    <Button onClick={this.onClickMyBadge} className="profilePageButton" style={{background: this.state.UserPrimaryColor}}>View All Badges</Button>
                    <Link to={{pathname:"/profile/edit", state: {isLoggedIn:true}}} 
                    className="profilePageButton" style={{background: this.state.UserPrimaryColor}}>Edit Profile </Link>
                    <Button id="add friend"
                      to={"/"}
                      onClick={() => this.addFriend()}
                      className="profilePageButton"
                      style={{background: this.state.UserPrimaryColor}}
                    >
                      {
                        this.renderIsFriend()
                      }
                    </Button>
                </Col>
                </Row>
            </Col>
            </Row>
            <Row className="profileBlockBase">
            <Col md={6}>
                <div className="profileBlock"
                style={{background: this.state.UserSecondaryColor}}>
                <Row>
                    <Col md={8}>
                    <div className="profileCard" style={{background: this.state.UserPrimaryColor}}>My Platforms</div>
                    </Col>
                    <Col md={4}>
                    
                    {this.renderNewPlatformButton()}
                    
                    </Col>
                </Row>
                <Row style={{ margin: "8px" }}>
                    <Col md={12} style={{ margin: "5px 2px" }}>
                        {plats}
                    </Col>
                </Row>
                </div>
            </Col>
            <Col md={6}>
                <div className="profileBlock"
                style={{background: this.state.UserSecondaryColor}}>
                <Row>
                    <Col md={12} style={{ margin: "5px 2px" }}>
                    <div className="profileCard" style={{background: this.state.UserPrimaryColor}}> Friends List </div>
                    <Row style={{ margin: "8px" }}>
                    <Col md={12} style={{ margin: "5px 2px" }}>
                        {friends}
                    </Col>
                </Row>
                    </Col>
                </Row>
                </div>
            </Col>
            </Row>
      </Container>
      )
    }


}
