import React, { Component } from 'react';

import {Row, Col  } from 'reactstrap';
import * as FontAwesome from 'react-icons/lib/fa/';

class LogoLogin extends Component {
  render() {
    return (
        <Row>
            <Col>
                <FontAwesome.FaCamera className="logo"/>
            </Col>
            <Col>
                <h1 className="bliink">bliink</h1>
            </Col>
        </Row>
    );
  }
}

export default LogoLogin;
