const Task = require("../model/taskSchema")

exports.addTask = async (req, res, next)=>{
    if(!req.body.task || !req.body.date){
        res.send({ success: false, message: "Please enter your task"}) 
     }else{
        await Task.create({
            task: req.body.task,
            date: req.body.date,
            userId: req.user.email
        })
        res.status(200).json({ success: true, message: "task added successfully"})    
     }
}


exports.todolist = async (req, res, next)=>{
    
    const task = await Task.find({userId: req.user.email});
    if(!task){
        res.send({ success: false, message:"Task is not found"})
    }else{
        res.send({success:true, task})
    }
}


exports.removeTask = async (req, res, next)=>{
    const id = req.params.id;
    
    const task = await Task.findOne({_id: id})
    if(!task){
        res.send({ success: false, message:"Task is not foundd"})
    }else{
        if(task.taskDone === true){
            await Task.deleteOne({_id: id})
            const data = await Task.find();
            res.send({success: true, message: "Task Deleted Successfully", task: data})
        }else{
            res.send({success: false, message: "Please Complate Task"})
        }
    }
    
}


exports.doneTask = async (req, res, next)=>{
    const id = req.params.id;
    const task = await Task.updateOne({_id: id}, {$set:{taskDone: true}})
    if(!task.acknowledged === true){
        res.send({ success: false, message:"Task is not found"})
    }else{
        const data = await Task.find();
        res.send({success: true, message: "Task Done Successfully", task: data})
    }
}