import { MDBBtn, MDBCard, MDBCardBody, MDBCardFooter, MDBIcon, MDBInput, MDBValidation } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/features/authSlice';
import {toast} from 'react-toastify';
const initialState = {
  email:"",
  password:""
}

const Login = () => {
  const [fValue, setFValue] = useState(initialState)
  const {email, password} = fValue
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(email && password){
      dispatch(login({fValue, navigate, toast}))
    }
  }
  const onInputChange = (e) =>{
    let {name, value} = e.target
    setFValue({...fValue, [name]:value})
  }
  return (
    <div style={{
      margin:"auto",
      padding:"15px",
      maxWidth:"450px",
      alignContent:"center",
      marginTop:"120px"
    }}>
      <MDBCard alignment='center'>
        <MDBIcon fas icon='user-circle'className='fa-2x'/>
        <h5>Signin</h5>
        <MDBCardBody>
          <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
            <div className="col-md-12">
              <MDBInput label="Email" type="email" value={email} name="email" onChange={onInputChange} required validation="Please provide your email"/>
            </div>
            <div className="col-md-12">
              <MDBInput label="Password" type="password" value={password} name="password" onChange={onInputChange} required  validation="Please provide your password"/>
            </div>
            <div className="col-12">
              <MDBBtn style={{width:"100%"}} className="mt-2">
                Login
              </MDBBtn>
            </div>
          </MDBValidation>
        </MDBCardBody>
        <MDBCardFooter>
          <Link to="/register">
            <p>Don't have an accout? Please Signup</p>
          </Link>
        </MDBCardFooter>
      </MDBCard>
    </div>
  );
};

export default Login;