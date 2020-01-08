import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Link,Switch ,Redirect} from 'react-router-dom'
import Route from 'react-router-dom/Route' 
import Sider from './components/Layout'
import WrappedLogin from './components/Login'
import Company from './components/Company'
import Login from './components/Login';
import SiderDemo from './Hris/Hris';
// import AdvancedSearchForm from './components/BasicDetails'
import Leave from './components/Leave';
// import FormLayoutDemo from './Hris/ContactInformation'
import Attendence from './Attendence/Attendence'
import AddLeave from './Attendence/AddLeave'
import Employeedetails from './components/Employeedetails'
// import Forgotpassword from './components/Forgotpassword';

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  prevLocation: path,
                  error: "You need to login first!",
                },
              }}
            />
          );
      }}
    />
  );
};

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cookieExists(name)
{
  if (getCookie(name)!=null)
  {
    return true
  }
  else
    return false
}

function getCookie1(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function cookieExists1(name)
{
  if (getCookie1(name)!=null)
  {
    return true
  }
  else
    return false
}

class App extends Component {
  state = {
    loggedIn: cookieExists('id'),
    loggedIn: cookieExists1('id')
  }

  handleLogin = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;

    this.setState(
      {
        loggedIn: cookieExists('id'),
      },
      () => {
        this.props.history.push(prevLocation || "/Company");
      },
    );
  };
  handleLogin1 = () => {
    const { state = {} } = this.props.location;
    const { prevLocation } = state;

    this.setState(
      {
        loggedIn: cookieExists1('id'),
      },
      () => {
        this.props.history.push(prevLocation || "/Login");
      },
    );
  };


  render (){
   return (
     <Router>
       <div className="App">
          {/* <Route path="/Home" render={
           ()=>{
             return (<Sider/>);
           }
         }/>  */}
          {/* <Route exact path="/Login" render={
           ()=>{
             return (<Login/>);
           }
         }/> */}
         <ProtectedRoute path="/Login" loggedIn={this.state.loggedIn} component={Login}  />
         <ProtectedRoute path="/Home" loggedIn={this.state.loggedIn} component={Sider}  />
         <Route exact path="/" render={
          ()=>{
            return (<Company/>);
          }
        }/>
         <Route path="/hris" render={
          ()=>{
            return (<SiderDemo/>);
          }
        }/>
         {/* <Route path="/forgotpassword" render={
          ()=>{
            return (<Forgotpassword/>);
          }
        }/> */}
         
          <Route path="/Attendence" render={
          ()=>{
            return (<Attendence/>);
          }
        }/>
        <Route path="/Employeedetails" render={
          ()=>{
            return (<Employeedetails/>)
          }
        }/>
        {/* <Route path="/BasicDetails" render={
          ()=>{
            return (<AdvancedSearchForm/>);
          }
        }/> */}
        {/* <Route path="/Leave" render={
          ()=>{
            return (<Leave/>);
          }
        }/>
          <Route path="/ContactInformation" render={
          ()=>{
            return (<FormLayoutDemo/>);
          }
        }/>
       
           <Route path="/AddLeave" render={
          ()=>{
            return (<AddLeave/>);
          }
        }/> */}

       </div>
     </Router>
  );
}
}

export default App;
