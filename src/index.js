import React from 'react';
import ReactDOM from 'react-dom';
import LoginPage from './components/loginPage';
import EditPage from './components/editPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
ReactDOM.render(
    <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LoginPage}/>
                <Route path="/profile" component={EditPage}/>
            </Switch>
    </BrowserRouter>  
,document.getElementById('root'));