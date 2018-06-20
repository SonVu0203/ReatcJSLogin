import React, { Component } from 'react';
import  LogoLogin from './LogoLogin';
import  FormLogin from './FormLogin';
import {Container,Row} from 'reactstrap';

class LoginPage extends Component {
    render() {
        return (
            <Container className="d-flex justify-content-center">
                <Row className="loginForm justify-content-center">
                    <LogoLogin/>
                    <FormLogin/>
                </Row>
            </Container>
        );
    }
}

export default LoginPage;
