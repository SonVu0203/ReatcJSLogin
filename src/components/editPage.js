import React, { Component } from 'react';
import LogoEdit from './LogoEdit';
import FormEdit from './FormEdit';
import {Container,Row} from 'reactstrap';

class EditPage extends Component {
    render() {
        return (
            <Container className="d-flex justify-content-center">
                <Row className="checkForm justify-content-center">
                    <LogoEdit/>
                    <FormEdit/>
                </Row>
            </Container>
        );
    }
}

export default EditPage;
