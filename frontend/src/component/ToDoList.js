import React, {useEffect, useState} from 'react'
import axios from "axios";
import AddTask from './AddTask';
import { useNavigate } from "react-router-dom"
import './todo.css';

const ToDoList = () => {
  const [data, setData] = useState()
  const [addTask, setIsAddTask] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    const token = localStorage.getItem("token")
    axios.get(`http://localhost:8000/todolist`, {
      headers: {
        Authorization: token
      }
    }).then((res)=>{
      if(res.data.task[0]){
        setData(res.data.task);
        setIsAddTask(true)
      }
    }, (err)=>{
      console.log("todo error",err);
    })
  },[])


  // Done Task
  function doneTask(id){
    axios.patch(`http://localhost:8000/donetask/${id}`).then((res)=>{
      alert(res.data.message)
      if(res.data.success === true){
        setData(res.data.task);
      }
    }, (err)=>{
      alert(err.message);
    })
  }
      
  // Remove Task
  function removeTask(id){
    axios.delete(`http://localhost:8000/removetask/${id}`).then((res)=>{
      alert(res.data.message)
      if(res.data.success === true){
        setData(res.data.task);
      }
    }, (err)=>{
      alert(err.message)
    })
  }
  

  return (
    <div>
      {
        addTask ? (
          <div>
          <button onClick={()=>navigate("/addtask")}>add Task</button>
          <div className='todo__list'>
              <div className="list__row">
                  <span className='task'>Task</span>
                  <span className='date'>Date</span>
                  <span className='button__container'>
                    <button>Done</button> 
                    <button>Remove</button>
                  </span>
                </div>
            {
              data&&data.map((item,i)=>(
                <div className="list__row" key={i}>
                  <span>{item.task}</span>
                  <span>{item.date}</span>
                  <span>
                    {
                      item.taskDone === true ? <span className='check'>✔ Complate</span> : <button onClick={()=>doneTask(item._id)}>Done</button> 
                    }
                    <button onClick={()=>removeTask(item._id)}>Remove</button>
                  </span>
                </div>
              ))
            }
          </div>
        </div>    
        ) : <AddTask/>
      }
            
    </div>
  )
}

export default ToDoList