import React,{useState,useEffect} from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {useCookies, Cookies} from 'react-cookie'
import "./Login.css"

// const Login = () =>{
//     const [login, setlogin] = useState({})
//     const handlelogin = () => {
//         axios({
//             url: "http://localhost:3000/user/login",
//             method : "POST",
//             header : {

//             },
//             data : {email: login.email, password:login.password}

//         }).then((res)=>{
//             if (res.res.authToken.length > 0) {
//                 localStorage.setItem("authorization", res.data.authToken);
//                 localStorage.setItem('userid', login.email)
//                 alert(`${login.email} login in sucessfully`)
//                 //navigate("/listproperty")
//         }
//     }).catch((err)=>{
//              console.log(err)
//              if(err.response.data === "User doesn't exists!"){
//                 window.alert("User doesn't exists!")
//               }else if(err.response.data === "Incorrect password"){
//                 window.alert("Incorrect password")
//               }
//         })

//     }
const Login = () =>{
    const [loginDetails, setLoginDetails] = useState({})
    const [dataSent, setDataSent] = useState(false)
    const [cookies, setCookie] = useCookies([]);
    let navigate = useNavigate();

    const handleLogin = (e)=>{
        e.preventDefault();
        setLoginDetails({
          email : e.target.elements.email.value,
          password : e.target.elements.password.value
        })
        setDataSent(true)
    }
    useEffect(() => {
        const cookies = new Cookies()
        console.log("Token in login => " + cookies.get('jwt'))
    
        const userLogin = ()=>{
          axios({
            method : 'post',
            url: "http://localhost:3000/login",
            data : loginDetails
    
          }).then((response)=>{
            let token = response.data.authToken
            setCookie("jwt", token,  { path: '/' , expires:new Date(Date.now()+3.6e+6)})
            console.log(token)
            console.log(response.data.authToken)
            window.alert("Login successfull")
            navigate("/")
          }).catch((err)=>{
              console.log(err)
              if(err.response.data === "User doesn't exists!"){
                window.alert("User doesn't exists!")
              }else if(err.response.data === "Incorrect password"){
                window.alert("Incorrect password")
              }
          })
    
        }
        if(dataSent){
          userLogin()
          console.log("Inside useEffect login function")
    
          setDataSent(false)
          // console.log( `This is cookie from useEffect => ${cookies}`)
        }
        console.log("Inside useEffect")
        
      }, [loginDetails, dataSent, navigate,cookies, setCookie])
      

    return (
    <>
    <div className="login-container">
    <div className="login-formlogbox">
        <h1>Real Estate</h1>
        <p>Enter your credentials to access your account</p>
        <form action="/login" method="Post" onSubmit={handleLogin}>
        <input id='login-userid' type="email" required={true}  name='email' placeholder='Email ID'/>
              <input id='login-password' name='password'  required={true} type="password" placeholder='Password'/>  
              <button type='submit' id='L-signin'>Login</button>       
        </form>
            {/* <div>
                <div>
                <label for="email"> Email:</label>
                </div>
                
                <div>
                <input id="email" type="text" onChange={(e)=>(setlogin ({...login, email: e.target.value}))} />
                </div>
                <div>
                <label for="password"> Password:</label>
                </div>

                <div>
                <input id="password" type="text" onChange={(e)=>(setlogin ({...login, password: e.target.value}))}/>
                </div>
            </div>
            <button type="button" onClick={handlelogin}> Login</button>  */}
    </div>
    <h3 id="login-afterform">Dont have an account? <Link className="signup" to="/signup">Signup</Link></h3>
    </div>
    </>
    )
}
export default Login