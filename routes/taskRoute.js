var express = require('express');
var router = express.Router();
const taskController = require("../controller/taskController")
const validateTasks = require("../middleware/validateTask")

// router.put('/tasks/:id',taskController.updateTask)

// router.delete('/tasks/:id',taskController.deleteTask)

router.get('/tasks/priority/:level',taskController.getTasksByPriority)

router.route('/tasks')
        .get(taskController.getTask)
        .post(validateTasks,taskController.addTask)

router.route('/tasks/:id')
        .get(taskController.getTaskById)
        .put(validateTasks,taskController.updateTask)
        .delete(taskController.deleteTask)
        


module.exports = router