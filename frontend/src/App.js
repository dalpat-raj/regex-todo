import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './component/Login';
import AddTask from './component/AddTask';
import ToDoList from './component/ToDoList';

const App = () => {


  return (
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path={"/todo"} element={<ToDoList/>} />
        <Route path='/addtask' element={<AddTask/>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App