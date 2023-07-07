import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import "./addtask.css";

const AddTask = () => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");

    const navigate = useNavigate();

    const obj = {
        task: task,
        date: date
    }
    

    const handler=(e)=>{
        e.preventDefault();
        if(!obj.task){
            alert("Please enter your task")
        }else{
            if(!obj.date){
                alert("Please enter date")
            }else{
                const token = localStorage.getItem("token")
                axios.post("http://localhost:8000/addtask", obj, {
                    headers: {
                        Authorization: token
                    }
                }).then((res)=>{
                        alert(res.data.message)
                }, (err)=>{
                    alert(err.message);
                })
            }
        }
    }

  return (
    <div className='addtask__main'>
        <form action="">
            <h2>Add Task</h2>
            <div>
                <label htmlFor="">Task</label>
                <input type="text" placeholder='task' value={task} onChange={(e)=>setTask(e.target.value)}/>
            </div>
            <div>
                <label htmlFor="">Task</label>
                <input type='date' placeholder='task' value={date} onChange={(e)=>setDate(e.target.value)}/>
            </div>
            <div>
                <button type='submit' onClick={handler}>Add Task</button>
            </div>
            <div>
                <button className='add__task' onClick={()=>navigate("/todo")}>Show Task</button>
            </div>
        </form>
    </div>
  )
}

export default AddTask