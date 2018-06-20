import React, { Component } from 'react';
import * as FontAwesome from 'react-icons/lib/fa';
import users from '../json/users.json';
import '../login.css';
import cookie, { load } from 'react-cookies';
import {  Row, Col, Label, Form, Alert ,FormFeedback, Button,InputGroup} from 'reactstrap';
import {Redirect} from 'react-router-dom';
class FormLogin extends Component {
    constructor(props){
        super(props);
        this.state={
          errors: {},
          isValid:{},
          modal: false,
          redirect: false
        }
        this.handleClick=this.handleClick.bind(this);
      }
      formValidate(){
  
        let errors = {};
        let isValid ={};
        let formIsValid = true;
        let email= this.refs.txtEmail.value;
        let password= this.refs.txtPassword.value;
        //regex check name only accept alphabet
        //regex check email format
        // eslint-disable-next-line
        let regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        //validate First name
        //validate email
        
        if(!email){
          formIsValid=false;
          isValid["email"] = "is-invalid";
          errors["email"] = (<FormFeedback>Enter email</FormFeedback>);
        }else{
          if(!email.match(regexEmail)){
            formIsValid=false;
            isValid["email"] = "is-invalid";
            errors["email"] = (<FormFeedback>Could not find your email</FormFeedback>);
          }
          else{     
            isValid["email"] = "is-valid";
          }
        }
       if(!password){
            formIsValid=false;
            isValid["password"] = "is-invalid";
            errors["password"] = (<FormFeedback>Enter password</FormFeedback>);
        }else{
            isValid["password"] = "is-valid";
        }

        //Validate email and password
      
    
        
    //End Validate email and password
        this.setState({errors:errors});
        this.setState({isValid:isValid});
        return formIsValid;
      }
        
      handleClick(){
            if(this.formValidate()){
            let arrUsers=[];
            arrUsers.push(users);
            let errors = {};
            let isValid ={};
            let loginInfo={};
            let email= this.refs.txtEmail.value;
            let password= this.refs.txtPassword.value;
            if(cookie.load('info'))
            {
                let infoUsers = cookie.load('info');
                console.log(infoUsers);
                
                if(infoUsers.email === email && infoUsers.password===password)
                {
                     this.setState({ redirect: true });
                }
            }
            else
            {
                for(let i = 0; i < arrUsers[0].length;++i){
                    if(arrUsers[0][i].email===email && arrUsers[0][i].password===password){
                        loginInfo = {
                            "id": arrUsers[0][i].id,
                            "email": arrUsers[0][i].email,
                            "password": arrUsers[0][i].password,
                            "profile": {
                            "firstName": arrUsers[0][i].profile.firstName,
                            "lastName": arrUsers[0][i].profile.lastName,
                            "avatar": arrUsers[0][i].profile.avatar
                            }
                        }
                        cookie.save('info',loginInfo);
                        this.setState({ redirect: true });
                    }
                }
            }
            isValid["email"] = "is-invalid";
            isValid["password"] = "is-invalid";
            errors["successValid"] = (<Alert color="danger">Wrong email or password!</Alert>);
            this.setState({errors:errors});
            this.setState({isValid:isValid});
            
            }  //store data to cookie
    }
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/profile'/>;
    }
    return (
        <div>
        <Form className="frmLogin">
            <Row>
                <Col className="text-center">
                    <h4 className="singIn">Sign in</h4>
                </Col>
            </Row>    
            <Row>
                <Col md="12" sm="12">
                  {/* notice when success */}
                  {this.state.errors["successValid"]}
                </Col>
                <Col md="12" sm="12">
                    <Label for="txtEmail" md="12" sm="12" className="col-form-label">Email</Label>
                    <Col md="12" sm="12">
                        <InputGroup>
                            <input type="text" className={`${this.state.isValid["email"]} form-control`}
                            ref="txtEmail"/>
                            <div className="invalid-feedback feedback-icon">
                                <FontAwesome.FaClose />
                            </div>
                            <div className="valid-feedback feedback-icon">
                                <FontAwesome.FaCheck />
                            </div>
                            {/* notice when error Email */}
                            {this.state.errors["email"]}
                        </InputGroup>
                    </Col>
                </Col>
                <Col md="12" sm="12">
                    <Label for="txtpassword" md="12" sm="12" className="col-form-label">Password</Label>
                    <Col md="12" sm="12">
                        <InputGroup>
                            <input type="password" className={`${this.state.isValid["password"]} form-control`}
                            ref="txtPassword"/>
                            <div className="invalid-feedback feedback-icon">
                                <FontAwesome.FaClose />
                            </div>
                            <div className="valid-feedback feedback-icon">
                                <FontAwesome.FaCheck />
                            </div>
                            {/* notice when error Email */}
                            {this.state.errors["password"]}
                        </InputGroup>
                    </Col>
                </Col>
            </Row>
            <Row>
                <Col className="classButton text-center" md="12" sm="12">
                   
                        <Button id="btnLogin" onClick={this.handleClick} outline color="danger" className="btnRound bg-danger text-white">
                        <span>Sign in</span>
                        </Button>
                  
                </Col>
            </Row>
            <Row>
                <Col className="classButton text-center" md="12" sm="12">
                   <a href="">Forgot password?</a>
                </Col>
            </Row>
        </Form>
    </div>
    );
  }
}

export default FormLogin;
