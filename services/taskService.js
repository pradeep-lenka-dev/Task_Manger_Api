const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '../task.json');


const validateTask = (task) => {
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
}



const loadData = () => {
    return new Promise((res, rej) => {

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    return []
                }
                return err;
            }
            return res(JSON.parse(data));
        });
    })
};

// save task in json file !!!!
const saveData = async (data) => {
    try {
        await fs.promises.writeFile(filePath, JSON.stringify({ tasks: data }, null, 2), 'utf8');
        return data
    } catch (err) {
        throw err;
    }
};
const addTask = async (data) => {
    const task = await loadData()
    task.tasks.push(data)
    const taskData = saveData(task.tasks)
    return taskData


}
const getTaskById = async (id) => {

    const task = await loadData()
    const taskIndex = task.tasks.findIndex(task => task.id == id)
    if (taskIndex == -1) {
        return ("Task not Found")
    }
    return (task.tasks[taskIndex]);
}

const updateTask = async (id, updatedTask) => {
    const { title, description, completed, priority } = updatedTask;
    const task = await loadData()
    const taskIndex = task.tasks.findIndex(task => task.id == id)
    if (taskIndex == -1) {
        return ("not found")
    }

    task.tasks[taskIndex].title = title;
    task.tasks[taskIndex].description = description;
    task.tasks[taskIndex].completed = completed;
    //data.priority = priority;
    saveData(task.tasks)
    return task.tasks[taskIndex]
}

const deleteTask = async (id) => {
    const { tasks } = await loadData();
    const taskIndex = tasks.findIndex(task => task.id == id);

    if (taskIndex === -1) {
        return { error: 'Task not found' };
    }

    const [deletedTask] = tasks.splice(taskIndex, 1);
    await saveData(tasks);
    return deletedTask;
};

const getTasksByPriority = async (level) =>{
    const {tasks} = await loadData()
    console.log("🚀 ~ getTasksByPriority ~ tasks:", tasks)
    const d= tasks.filter((task)=> task.priority == level)
    console.log("🚀 ~ getTasksByPriority ~ d:", d)
    return d
}

module.exports = { validateTask, addTask, loadData, getTaskById, updateTask, deleteTask,getTasksByPriority }