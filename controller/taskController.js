const taskService = require('../services/taskService');

const taskController = {

    loadTask: async (callback) => {
        taskService.loadData(callback)
    },



    saveTask: (req, res) => {
        const task = req.body
        try {

            const result = taskService.saveData(data, callback)
            res.status(2000).json({ message: "task added successfully", task: result })
        } catch (error) {

        }
    },

    validateTask: async (task) => {
        const { title, description, completed } = task;

        if (!title || typeof title !== 'string' || title.trim() === '') {
            return "title is required !"
        }

        if (!description || typeof description !== 'string' || description.trim() === '') {
            return "Description is required !"
        }

        if (typeof completed !== 'boolean') {
            return "completed status must be true o false"
        }

        return null;
    },

    addTask: (task, callback) => {
        loadTask((err, data) => {
            if (err) {
                return callback(err)
            }
            data.push(task);
            saveTask(data, callback);
        });

    },

    getTaskById:  (req, res) => {
        const id = req.params.id;
        try {
            const result =  taskService.getTaskById(id)
            console.log("🚀 ~ result:", result)
            return res.status(200).json({message:"",task:result})
        } catch (error) {

        }
    },

    updateTask: (req, res) => {
        const id = req.params.id;
        const updatedTask = req.body
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid task id" });
        }
        try {
            const result = taskService.updateTask(id, updatedTask)

            return res.status(200).json({ message: "Task Update successfully", task: result })

        } catch (error) {

        }
    },

    deleteTask: (req, res) => {
        const id = req.params.id;
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, error: "Invalid task id" });
        }
        try {
            const result = taskService.deleteTask(id);
            if (result == -1) {
                return res.status(404).json({ error: "Task not found" })
            }
            return res.status(200).json({ message: "Task deleted successfully", task: result });
        } catch (error) {

        }
    }
}


module.exports = taskController