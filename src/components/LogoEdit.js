import React from 'react';
import '../edit.css';
import cookie from 'react-cookies';
import {  Row, Col} from 'reactstrap';
class LogoEdit extends React.Component{
    render(){
        let userInfo= cookie.load('info');
        var image=userInfo.profile.avatar;
        return (
            <Row >
              <Col xs="12" sm="12" md="12">
                    <img id="avatar" 
                    className="rounded-circle text-center" 
                    src={require('../'+image)} alt={"Avatar of User"}/>
              </Col>
            </Row>
        );
    }
}
export default LogoEdit;