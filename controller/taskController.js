const taskService = require('../services/taskService');

const taskController = {

    addTask: async (req, res) => {
        const taskData = req.body;

        try {
            // Add the task using the service
            const newTask = await taskService.addTask(taskData);
            res.status(201).json({ message: 'Task added successfully', task: newTask });
        } catch (error) {
            console.error('Error adding task:', error);
            res.status(500).json({ error: 'An error occurred while adding the task. Please try again later.' });
        }
    },

    getTask : async (req, res) => {
        try {
            const tasks = await taskService.loadData();
            res.status(200).json(tasks.tasks);
            // res.status(200).json({ message: 'Tasks fetched successfully', tasks });
        } catch (error) {
            console.error('Error fetching tasks:', error);
            res.status(404).json({ error: 'Failed to load tasks' });

            // res.status(500).json({ error: 'An error occurred while fetching tasks. Please try again later.' });
        }
    },

    getTaskById : async (req, res) => {
        const id = req.params.id;
        try {
            const result = await taskService.getTaskById(id);
            // if (!result) {
            //     return res.status(404).json({ message: 'Task not found' });
            // }
            if (!result) {
                return res.status(404).json({ error: 'Task not found' });
            }
            res.status(200).json(result);

            // return res.status(200).json({ message: 'Task retrieved successfully', task: result });
        } catch (error) {
            console.error('Error retrieving task:', error);
            return res.status(404).json({ error: 'An error occurred while retrieving the task. Please try again later.' });
        }
    },

    updateTask : async (req, res) => {
        const id = req.params.id;
        const updatedTask = req.body;
    
        // Validate ID format
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid task id' });
        }
    
        try {
            const result = await taskService.updateTask(id, updatedTask);
            if (!result) {
                return res.status(404).json({ message: 'Task not found' });
            }
            return res.status(200).json({ message: 'Task updated successfully', task: result });
        } catch (error) {
            console.error('Error updating task:', error);
            return res.status(404).json({ error: 'An error occurred while updating the task. Please try again later.' });
        }
    },

    deleteTask : async (req, res) => {
        const id = req.params.id;
    
        // Validate ID format
        if (isNaN(id)) {
            return res.status(400).json({ status: 400, error: 'Invalid task id' });
        }
    
        try {
            const result = await taskService.deleteTask(id);
            if (result === -1) {
                return res.status(404).json({ error: 'Task not found' });
            }
            return res.status(200).json({ message: 'Task deleted successfully' });
        } catch (error) {
            console.error('Error deleting task:', error);
            return res.status(404).json({ error: 'An error occurred while deleting the task. Please try again later.' });
        }
    },

    getTasksByPriority:async (req,res) => {
        priorityLevel = req.params
        validLevel = ["low","medium","heigh"]
        if(!validLevel.includes(priorityLevel.level)){
            res.status(400).json({error:`Invalid priority level. Must be one of ${validLevel.join(', ')}.` })
        }
        try {
            const result = await taskService.getTasksByPriority(priorityLevel.level)
            console.log("🚀 ~ getTasksByPriority: ~ result:", result)
            res.status(200).json({message:`Task with Priority level ${priorityLevel.level}`, result})
            
        } catch (error) {
            console.log("🚀 ~ getTasksByPriority: ~ error:", error)
            res.status(500).json({ error: 'An error occurred while retrieving tasks by priority.',error });

        }
    }
}


module.exports = taskController