const express = require("express");
const router = express.Router();
const { 
    addTask, 
    todolist, 
    removeTask, 
    doneTask } = require("../controller/taskController");
const {auth} = require("../middleware/auth");


router.route("/addtask").post(auth, addTask)
router.route("/todolist").get(auth, todolist)
router.route("/removetask/:id").delete(removeTask)
router.route("/donetask/:id").patch(doneTask)


module.exports = router;