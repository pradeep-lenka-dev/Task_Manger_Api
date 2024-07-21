const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../task.json');

const validateTask = (task) => {
    const { title, description, completed, priority } = task;

    if (!title || typeof title !== 'string' || title.trim() === '') {
        return "Title is required!";
    }

    if (!description || typeof description !== 'string' || description.trim() === '') {
        return "Description is required!";
    }

    if (typeof completed !== 'boolean') {
        return "Completed status must be true or false.";
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
        return "Priority must be 'low', 'medium', or 'high'.";
    }

    return null;
};

const loadData = async () => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading data file:', error);
        return { tasks: [] };
    }
};

const saveData = async (data) => {
    try {
        await fs.writeFile(filePath, JSON.stringify({ tasks: data }, null, 2), 'utf8');
        return data;
    } catch (error) {
        console.error('Error saving data file:', error);
        throw error;
    }
};

const addTask = async (task) => {
    const data = await loadData();
    const newTask = {
        id: data.tasks.length ? data.tasks[data.tasks.length - 1].id + 1 : 1,
        ...task
    };
    data.tasks.push(newTask);
    await saveData(data.tasks);
    return newTask;
};

const getTaskById = async (id) => {
    const data = await loadData();
    const task = data.tasks.find(task => task.id === parseInt(id, 10));
    if (!task) {
        throw new Error('Task not found');
    }
    return task;
};

const updateTask = async (id, updatedTask) => {
    const data = await loadData();
    const taskIndex = data.tasks.findIndex(task => task.id === parseInt(id, 10));
    if (taskIndex === -1) {
        throw new Error('Task not found');
    }
    const updatedData = { ...data.tasks[taskIndex], ...updatedTask };
    data.tasks[taskIndex] = updatedData;
    await saveData(data.tasks);
    return updatedData;
};

const deleteTask = async (id) => {
    const data = await loadData();
    const taskIndex = data.tasks.findIndex(task => task.id === parseInt(id, 10));
    if (taskIndex === -1) {
        throw new Error('Task not found');
    }
    const [deletedTask] = data.tasks.splice(taskIndex, 1);
    await saveData(data.tasks);
    return deletedTask;
};

const getTasksByPriority = async (level) => {
    const data = await loadData();
    const tasks = data.tasks.filter(task => task.priority === level);
    return tasks;
};

module.exports = { validateTask, addTask, loadData, getTaskById, updateTask, deleteTask, getTasksByPriority };
