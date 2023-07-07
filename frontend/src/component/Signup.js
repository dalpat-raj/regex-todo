import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import "./style.css";

const SignUp = () => {
    const [name, setName] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")

    const navigate = useNavigate();

    const obj = {
        name: name,
        email: email,
        password: password
    }

    const URL = "http://localhost:8000/signup";
    
    const handler= (e)=>{
        e.preventDefault();
        if(obj.name && obj.email && obj.password){
            axios.post(URL, obj).then((res)=>{
                console.log(res);
                alert(res.data.message);
                navigate("/login")
            })
        }

    }

  return (
    <div>
        <form action="">
        <h2>Sign Up</h2>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='name'value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Email</label>
                <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Password</label>
                <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type='submit' onClick={handler}>submit</button>
            <div>
                <p>allready have an account ? <button onClick={()=>navigate("/login")}>login</button></p>
            </div>
        </form>
    </div>
  )
}

export default SignUp