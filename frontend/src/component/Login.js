import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import axios from "axios";
import "./style.css";


const Login = () => {

    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")

    const navigate = useNavigate();
    const obj = {
        email : email,
        password: password
    }

    useEffect(()=>{
        const token = localStorage.getItem("token")

        if(token){
            navigate("/todo")
        }else{
            navigate("/")
        }
    },[])



    const handlerr=(e)=>{
        e.preventDefault();
        if(!email){
            alert("Please enter email")
        }else{
            if(!password){
                alert("Please enter password")
            }else{
                axios.post("http://localhost:8000/login", obj).then((res)=>{
                        alert(res.data.message)
                        localStorage.setItem("token", res.data.token)
                        navigate("/todo")      
                },(err)=>{
                    // alert(err.message)
                    console.log("login error", err);
                })
            }
        }
    }


  return (
    <div>
        <form action="">
        <h2>Login</h2>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='email' onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button type='submit' onClick={handlerr}>login</button>
            <div>
                <p>dont have account ? <button onClick={()=>navigate("/")}>Sign Up</button></p>
            </div>
        </form>
    </div>
  )
}

export default Login