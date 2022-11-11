import React, { useState , useEffect, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './signup.css'
import axios from 'axios'

// const Signup = ()=>{
//     const [signupData, setSignupData] = useState({})
//     const signupFormData = [{attr: "email", type:"email", id: "email", label: "Email:"},
//                             {attr: "password", type:"password", id: "password", label: "password:"},
//                             {attr: "password", type:"password", id: "password", label: "Confirm Password:"}
// ]
//     const handleSignup = ()=>{
//         console.log(signupData)
//         axios({
//             url: "http://localhost:3000/user/signup",
//             method : "POST",
//             header : {

//             },
//             data : signupData

//         }).then((res)=>{
//              console.log(res)
//         }).catch((err)=>{
//              console.log(err)
//         })
//     }
//     const handleInputChange =(e,id) =>{
//         setSignupData({...signupData, [id]: e.target.value})
//     }
const Signup = () => {
  const [signupDetails, setSignupDetails] = useState({})
  const [dataSent, setDataSent] = useState(false)
  let navigate = useNavigate();


  const handleSignup = (e)=>{
    e.preventDefault();
    const password = e.target.elements.password.value
    const confirmPassword = e.target.elements.cpassword.value

    if(password === confirmPassword){
      console.log("matching")
      setSignupDetails({
      email : e.target.elements.email.value,
      password : e.target.elements.password.value,
      cpassword : e.target.elements.cpassword.value

      })
      setDataSent(true)
    }else{
      window.alert("Passwords are not matching")
    }
      // console.log(e.target.elements.email.value)
      // console.log(e.target.elements.password.value)
      // console.log(e.target.elements.cpassword.value)
  }

  useEffect(() => {
    const userSignup = ()=>{
      axios({
        method : 'post',
        url: "http://localhost:3000/signup",
        data : signupDetails

      }).then((response)=>{
        // console.log(response)
        window.alert("User created successfully!\n Please Login First.")
        navigate("/login")
      }).catch((err)=>{
          // console.log(err.response.data === "User already exists!")
          if(err.response.data === "User already exists!"){
            window.alert("Email already exists!")
          }
      })

    }
    if(dataSent){
      userSignup()
      setDataSent(false)
    }
    
    
  }, [signupDetails, dataSent, navigate])

    return  (
        <>
    <div className='signup-container'>
      <div className='signup-formDiv'>
          <h1>Realestate</h1>
          <p>Create New Account</p>
          <form action='/signup' method='POST' onSubmit={handleSignup} >  
              {/* <input id='S-username' type="text" required={true} name='username' placeholder='ENTER YOUR NAME'/> */}
              <input id='signup-userid' type="email" required={true} name='email' placeholder='Enter mail ID'/>
              <input id='Signup-password' name='password' required={true}  type="password" placeholder='Enter Password'/> 
              <input id='signup-cpassword' name='cpassword' required={true} type="password" placeholder='Confirm Password'/>  
              <button type='submit' id='signup-login'>Sign Up</button>       
          </form>
          
      </div>

      <h2 id='signup-afterForm'><Link  className='signup-signup' to="/">Login</Link></h2>
    </div>
        </>
    )
}
export default Signup