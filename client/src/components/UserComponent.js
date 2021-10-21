import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Image from 'react-bootstrap/Image'

export default class UserComponent extends Component{

    constructor(props){

        super(props)

        this.state = {
          UserPrimaryColor: '#FF5353',
          UserSecondaryColor: '#87CEEB',
          UserName: 'ScaryJones23'
        }

    }

    render(){

        return(
            <div
            style={{
              background: this.state.UserPrimaryColor,
              width: "1920px",
              height: "1080px"
            }}
          >
            <Link
              style={{
                position: "absolute",
                width: "244px",
                height: "69px",
                left: "18px",
                top: "28px",
                background: "#C4C4C4",
                border: "solid",
                borderColor: "#000000",
                borderSize: "2px",
                boxSizing: "border-box",
                borderRadius: "15px"
              }}
              to={"/home"}
            >
              <div
                style={{
                  position: "absolute",
                  width: "205px",
                  height: "41px",
                  left: "19px",
                  top: "11px",
        
                  fontFamily: "Roboto",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "35px",
                  lineHeight: "41px",
                  color: "#000000"
                }}
              >
        
                
                Return Home
              
              
              </div>
            </Link>
        
            <div
              style={{
                background: "gray",
                position: "absolute",
                width: "1361px",
                height: "610px",
                left: "279px",
                top: "8px",
        
                border: "solid",
                borderSize: "4px",
                borderRadius: "25px",
                boxSizing: "border-box"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "111px",
                  width: "94px",
                  left: "334px",
                  top: "105px"
                }}
              >
                <Image
                  src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                  fluid
                />
              </div>
        
              <div
                style={{
                  position: "absolute",
                  height: "111px",
                  width: "94px",
                  left: "334px",
                  top: "275px"
                }}
              >
                <Image
                  src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                  fluid
                />
              </div>
        
              <div
                style={{
                  position: "absolute",
                  height: "111px",
                  width: "94px",
                  left: "334px",
                  top: "445px"
                }}
              >
                <Image
                  src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                  fluid
                />
              </div>
        
              <div
                style={{
                  position: "absolute",
                  height: "111px",
                  width: "94px",
                  left: "934px",
                  top: "105px"
                }}
              >
                <Image
                  src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                  fluid
                />
              </div>
        
              <div
                style={{
                  position: "absolute",
                  height: "111px",
                  width: "94px",
                  left: "934px",
                  top: "275px"
                }}
              >
                <Image
                  src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                  fluid
                />
              </div>
        
              <div
                style={{
                  position: "absolute",
                  height: "111px",
                  width: "94px",
                  left: "934px",
                  top: "455px"
                }}
              >
                <Image
                  src="https://www.pngmart.com/files/14/Golden-Ribbon-Badge-PNG.png"
                  fluid
                />
              </div>
        
              <div
                style={{
                  position: "absolute",
                  width: "511px",
                  height: "511px",
                  left: "424px",
                  top: "8px",
        
                  backgroundPosition: "center",
                  backgroundImage:
                    'url("https://images.freeimages.com/images/large-previews/25d/eagle-1523807.jpg")',
                  border: "solid",
                  boxSizing: "border-box",
                  borderRadius: "50%"
                }}
              ></div>
        
              <div
                style={{
                  position: "absolute",
                  width: "272px",
                  height: "54px",
                  left: "1064px",
                  top: "437px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  boxSizing: "border-box",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "396px",
                  height: "76px",
                  left: "45px",
                  top: "10px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "25px",
                  lineHeight: "32px",
                  color: "#000000"
                }}>View All Badges</div>
              </div>
        
              <Link
                style={{
                  position: "absolute",
                  width: "272px",
                  height: "54px",
                  left: "1064px",
                  top: "519px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  boxSizing: "border-box",
                  borderRadius: "15px"
                }}
                to={'/profile/edit'}
              >
                <div style={{
                  position: "absolute",
                  width: "396px",
                  height: "76px",
                  left: "75px",
                  top: "11px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "25px",
                  lineHeight: "32px",
                  color: "#000000"
                }}>Edit Profile</div>
              </Link>
        
              <div
                style={{
                  position: "absolute",
                  width: "288px",
                  height: "68px",
                  left: "534.5px",
                  top: "531px",
        
                  background: this.state.UserSecondaryColor,
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "205px",
                  height: "41px",
                  left: "35px",
                  top: "5px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "40px",
                  lineHeight: "51px",
                  color: "#000000"
                }}>{this.state.UserName}</div>
              </div>
            </div>
        
            <div
              style={{
                position: "absolute",
                width: "843px",
                height: "478px",
                left: "78px",
                top: "634px",
        
                background: this.state.UserSecondaryColor,
                boxSizing: "border-box",
                borderRadius: "25px",
                border: "solid",
                borderSize: "4px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "773px",
                  height: "120px",
                  left: "35px",
                  top: "169px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "396px",
                  height: "76px",
                  left: "27px",
                  top: "16px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  color: "#000000"
                }}>Test Platform 2</div>
              </div>
        
              <div
                style={{
                  position: "absolute",
                  width: "773px",
                  height: "120px",
                  left: "35px",
                  top: "321px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "396px",
                  height: "76px",
                  left: "27px",
                  top: "16px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  color: "#000000"
                }}>Test Platform 1</div>
              </div>
        
              <div
                style={{
                  position: "absolute",
                  width: "450px",
                  height: "108px",
                  left: "29px",
                  top: "35px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "396px",
                  height: "76px",
                  left: "27px",
                  top: "16px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  color: "#000000"
                }}>Your Platforms</div>
              </div>
        
              <div
                style={{
                  position: "absolute",
                  width: "259px",
                  height: "108px",
                  left: "529px",
                  top: "35px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "244px",
                  height: "115px",
                  left: "8px",
                  top: "12px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "35px",
                  lineHeight: "44px",
                  color: "#000000",
                  textAlign: 'center'
                }}>Create New Platform</div>
              </div>
            </div>
        
            <div
              style={{
                position: "absolute",
                width: "843px",
                height: "478px",
                left: "1000px",
                top: "634px",
        
                background: this.state.UserSecondaryColor,
                boxSizing: "border-box",
                borderRadius: "25px",
                border: "solid",
                borderSize: "4px"
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "773px",
                  height: "120px",
                  left: "35px",
                  top: "169px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "496px",
                  height: "76px",
                  left: "2px",
                  top: "15px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  textAlign: 'center',
                  color: "#000000"
                }}>Platform: Movies</div>
              </div>
        
              <div
                style={{
                  position: "absolute",
                  width: "773px",
                  height: "120px",
                  left: "35px",
                  top: "321px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "494px",
                  height: "76px",
                  left: "20px",
                  top: "15px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  textAlign: 'center',
                  color: "#000000"
                }}>Quiz: Orange Juice</div>
              </div>
        
              <div
                style={{
                  position: "absolute",
                  width: "725px",
                  height: "92px",
                  left: "55px",
                  top: "34px",
        
                  background: "#FFA2A2",
                  border: "solid",
                  borderRadius: "15px"
                }}
              >
                <div style={{
                  position: "absolute",
                  width: "235px",
                  height: "76px",
                  left: "245px",
                  top: "3px",
        
                  fontFamily: "Oxygen",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  fontSize: "60px",
                  lineHeight: "76px",
                  textAlign: 'center',
                  color: "#000000"
                }}>Recently</div>
              </div>
            </div>
          </div>
        )
    }


}