import React from 'react';
import cookie from 'react-cookies';
import '../edit.css';
import * as FontAwesome from 'react-icons/lib/fa'
import {Row, Col, Label, Form, Alert ,FormFeedback, Button,InputGroup, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
class FromEdit extends React.Component{
    constructor(props){
      super(props);
      this.state={
        errors: {},
        isValid:{},
        modal: false
      }
      this.handleClick=this.handleClick.bind(this);
      this.openModal=this.openModal.bind(this);
      this.handleChangePassClick = this.handleChangePassClick.bind(this)
    }
    //Mount cookie if exist
    componentDidMount(){
      if(cookie.load('info')){
        let userInfo= cookie.load('info');
        this.refs.txtFirstName.value=userInfo.profile.firstName;
        this.refs.txtLastName.value=userInfo.profile.lastName;
        this.refs.txtEmail.value=userInfo.email;
      }
    }
    //function validate data
    formValidate(){
      let errors = {};
      let isValid ={};
      let formIsValid = true;
      let firstName= this.refs.txtFirstName.value;
      let lastName= this.refs.txtLastName.value;
      let email= this.refs.txtEmail.value;
    
      //regex check name only accept alphabet
      let regexName = /^[a-zA-Z]+$/;
      //regex check email format
      // eslint-disable-next-line
      let regexEmail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      //validate First name
      if(!firstName){
        formIsValid=false;
        isValid["firstName"] = "is-invalid";
        errors["firstName"] = (<FormFeedback>Fisrt name must not empty</FormFeedback>);
      }else{
        if(!firstName.match(regexName)){
          formIsValid=false;
          isValid["firstName"] = "is-invalid";
          errors["firstName"] = (<FormFeedback>Fisrt name only accept alphabet</FormFeedback>);
        }else{
          isValid["firstName"] = "is-valid";
        }
      }
      //validate Last name
      if(!lastName){
        formIsValid=false;
        isValid["lastName"] = "is-invalid";
        errors["lastName"] = (<FormFeedback>Last name must not empty</FormFeedback>);
      }else{
        if(!lastName.match(regexName)){
          formIsValid=false;
          isValid["lastName"] = "is-invalid";
          errors["lastName"] = (<FormFeedback>Last name only accept alphabet</FormFeedback>);
        }else{
          isValid["lastName"] = "is-valid";
        }
      }
      //validate email
      if(!email){
        formIsValid=false;
        isValid["email"] = "is-invalid";
        errors["email"] = (<FormFeedback>Email must not empty</FormFeedback>);
      }else{
        if(!email.match(regexEmail)){
          formIsValid=false;
          isValid["email"] = "is-invalid";
          errors["email"] = (<FormFeedback>Wrong email format</FormFeedback>);
        }else{
          isValid["email"] = "is-valid";
        }
      }
      this.setState({errors:errors});
      this.setState({isValid:isValid});
      return formIsValid;
    }

    //handle button "VALIDATE" click
    handleClick(){
      if(this.formValidate()){
        let errors = {};
        let firstName= this.refs.txtFirstName.value;
        let lastName= this.refs.txtLastName.value;
        let email= this.refs.txtEmail.value;
        let infoUsers={};
        errors["successValid"] = (<Alert color="success">Success Validate!</Alert>);
        this.setState({errors:errors});
        if(cookie.load('info')){
          let userInfo= cookie.load('info');
           //store data to cookie
          infoUsers = {
            "id": userInfo.id,
            "email": email,
            "password": userInfo.password,
            "profile": {
              "firstName": firstName,
              "lastName": lastName,
              "avatar": userInfo.profile.avatar
            }
          }
        }
        cookie.save('info',infoUsers);
      }
    }
    // handle button click "Open Modal"
    openModal(){
      this.setState({modal: !this.state.modal});
    }
    //function EditformPassValidate data
    EditformPassValidate(){
      let errors = {};
      let isValid ={};
      let formIsValid = true;
      let currentpassword= this.refs.txtcurrentpassword.value;
      let newpassword= this.refs.txtnewpassword.value;
      let confirmpassword= this.refs.txtconfirmpassword.value;
      let userInfo= cookie.load('info');
      // validate currentpassword
      if(!currentpassword){
        formIsValid=false;
        isValid["currentpassword"] = "is-invalid";
        errors["currentpassword"] = (<FormFeedback>Current-password must not empty</FormFeedback>);
      }
      else{
        if(currentpassword!=userInfo.password)
        {
          formIsValid=false;
          isValid["currentpassword"] = "is-invalid";
          errors["currentpassword"] = (<FormFeedback>Current-password entered incorrectly</FormFeedback>);
        }
        else
        {
          isValid["currentpassword"] = "is-valid";
        }
      }
      // validate newpassword
      if(!newpassword){
          formIsValid=false;
          isValid["newpassword"] = "is-invalid";
          errors["newpassword"] = (<FormFeedback>New-password must not empty</FormFeedback>);
      }
      else
      {
        
        if(String(newpassword).length<6)
        {
          formIsValid=false;
          isValid["newpassword"] = "is-invalid";
          errors["newpassword"] = (<FormFeedback>Use at least six characters, pleas</FormFeedback>);
        }
        else if(newpassword==currentpassword)
        {
          formIsValid=false;
          isValid["newpassword"] = "is-invalid";
          errors["newpassword"] = (<FormFeedback>Current and new passwords must be different</FormFeedback>);
        }
        else{
          isValid["newpassword"]= "is-valid"
        }
      }
      // validate confirmpassword
      if(!confirmpassword){
          formIsValid=false;
          isValid["confirmpassword"] = "is-invalid";
          errors["confirmpassword"] = (<FormFeedback>Confirm-password must not empty</FormFeedback>);
      }
      else
      {
        if(confirmpassword!=newpassword)
        {
          formIsValid=false;
          isValid["confirmpassword"] = "is-invalid";
          errors["confirmpassword"] = (<FormFeedback>Your passwords don't match. Try again?</FormFeedback>);
        }
        else
        {
          isValid["confirmpassword"] = "is-valid";
         
        }
      }
      this.setState({errors:errors});
      this.setState({isValid:isValid});
      return formIsValid;
    }
    // handleChangePass button "VALIDATE" click
    handleChangePassClick(){
      if(this.EditformPassValidate()){
        let errors = {};
        let currentpassword= this.refs.txtcurrentpassword.value;
        let newpassword= this.refs.txtnewpassword.value;
        let confirmpassword= this.refs.txtconfirmpassword.value;
        let infoUsers={};
        errors["successChangePassValid"] = (<Alert color="success">Success Validate!</Alert>);
        this.setState({errors:errors});
        if(cookie.load('info')){
          let userInfo= cookie.load('info');
           //store data to cookie
          infoUsers = {
            "id": userInfo.id,
            "email": userInfo.email,
            "password": newpassword,
            "profile": {
              "firstName": userInfo.profile.firstName,
              "lastName": userInfo.profile.lastName,
              "avatar": userInfo.profile.avatar
            }
          }
        }
        cookie.save('info',infoUsers);
      }
    }

    render(){
        return (
          <div>
          <Form>
              <Row>
                <Col md="12" sm="12">
                  {/* notice when success */}
                  {this.state.errors["successValid"]}
                </Col>
                <Col md="6" sm="12">
                  <Label for="txtFirstName" md="12" sm="12" className="col-form-label">First name</Label>
                  <Col md="12" sm="12">
                  <InputGroup>
                    <input type="text" className={`${this.state.isValid["firstName"]} form-control`}
                    ref="txtFirstName" placeholder=" First name"/>
                    <div className="invalid-feedback feedback-icon">
                        <FontAwesome.FaClose />
                    </div>
                    <div className="valid-feedback feedback-icon">
                        <FontAwesome.FaCheck />
                    </div>
                    {/* notice when error FirstName */}
                    {this.state.errors["firstName"]}
                  </InputGroup>
                  </Col>
                </Col>
                <Col md="6" sm="12">
                  <Label for="txtLastName" md="12" sm="12" className="col-form-label">Last name</Label>
                  <Col md="12" sm="12">
                  <InputGroup>
                    <input type="text" className={`${this.state.isValid["lastName"]} form-control`} 
                    ref="txtLastName" placeholder=" Last name"/>
                    <div className="invalid-feedback feedback-icon">
                        <FontAwesome.FaClose />
                    </div>
                    <div className="valid-feedback feedback-icon">
                        <FontAwesome.FaCheck />
                    </div>
                    {/* notice when error LastName */}
                    {this.state.errors["lastName"]}
                  </InputGroup>
                  </Col>
                </Col>
              <Col md="12" sm="12">
                <Label for="txtEmail" md="12" sm="12" className="col-form-label">Email</Label>
                <Col md="12" sm="12">
                <InputGroup>
                  <input type="text" className={`${this.state.isValid["email"]} form-control`}
                  ref="txtEmail" placeholder=" tantinh@gmail.com"/>
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
            </Row>
            <Row>
              <Col className="classButton" md="12" sm="12">
                <Button id="btnEdit" outline color="secondary" onClick={this.openModal} className="btnRound float-left">
                  <span>EDIT PASSWORD</span>
                </Button>
                <Button id="btnUI" onClick={this.handleClick} outline color="danger" className="btnRound float-right bg-danger text-white">
                  <span>VALIDATE</span>
                </Button>
              </Col>
            </Row>
          </Form>
            {/* Modal change password */}
            <Col lg="6" md="12" >
              <Modal isOpen={this.state.modal} toggle={this.openModal} className={this.props.className} id="Modal-Edit">
          
                <ModalHeader ><FontAwesome.FaArrowLeft onClick={this.openModal} className="arrow" /></ModalHeader>
                <ModalBody>
                  {/* notice when success */}
                  {this.state.errors["successChangePassValid"]}
                  <h2>Edit Password</h2> <br/>
                  <Form>
                    <div className="form-group">
                    <label for="current-password" className="col-form-label" >Current password</label>
                    <InputGroup>
                        <input type="password" className={`${this.state.isValid["currentpassword"]} form-control`}
                              ref="txtcurrentpassword" placeholder="current-password"/>
                        <div className="invalid-feedback feedback-icon">
                            <FontAwesome.FaClose />
                        </div>
                        <div className="valid-feedback feedback-icon">
                            <FontAwesome.FaCheck />
                        </div>
                        {/* notice when error currentpassword */}
                        {this.state.errors["currentpassword"]}
                    </InputGroup>
                    </div>
                    <div className="form-group">
                    <label for="new-password" className="col-form-label" >New password</label>
                    <InputGroup>
                        <input type="password" className={`${this.state.isValid["newpassword"]} form-control`}
                           ref="txtnewpassword" placeholder="new-password"/>
                        <div className="invalid-feedback feedback-icon">
                            <FontAwesome.FaClose />
                        </div>
                        <div className="valid-feedback feedback-icon">
                            <FontAwesome.FaCheck />
                        </div>
                        {/* notice when error newpassword */}
                        {this.state.errors["newpassword"]}
                    </InputGroup>
                    </div>
                    <div className="form-group">
                    <label for="confirm-password" className="col-form-label" >Confirm password</label>
                    <InputGroup>
                        <input type="password" className={`${this.state.isValid["confirmpassword"]} form-control`}
                           ref="txtconfirmpassword" placeholder="confirm-password"/>
                        <div className="invalid-feedback feedback-icon">
                            <FontAwesome.FaClose />
                        </div>
                        <div className="valid-feedback feedback-icon">
                            <FontAwesome.FaCheck />
                        </div>
                        {/* notice when error confirmpassword */}
                        {this.state.errors["confirmpassword"]}
                    </InputGroup>
                    </div>
                  </Form>
                </ModalBody>
                <ModalFooter className="justify-content-start">
                  <Button id="btnChangePass" onClick={this.handleChangePassClick} className="btnRound" color="danger">VALIDATE</Button>
                  <Button className="btnRound ml-5" outline color="secondary" onClick={this.openModal}>Cancel</Button>{' '}
                </ModalFooter>
               
              </Modal>
              </Col>
          </div>
        )
    }
}
export default FromEdit;