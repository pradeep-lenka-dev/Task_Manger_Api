const taskService = require ('../services/taskService');

const loadTask = (callback) =>{
    taskService.loadData(callback)
}

const getTaskById = (id,callback) =>{
    taskService.getTaskById(id,callback)
}

const saveTask = (data,callback)=>{
    taskService.saveData(data,callback)
}

const validateTask = (task) =>{
    const {title,description,completed} = task;

    if(!title || typeof title !== 'string' || title.trim() === ''){
        return "title is required !"
    }

    if(!description || typeof description !== 'string' || description.trim() ===''){
        return "Description is required !"
    }

    if(typeof completed !== 'boolean'){
        return "completed status must be true o false"
    }

    return null;
}

const addTask = (task, callback) =>{
    loadTask((err, data)=>{
        if(err){
            return callback(err)
        }
        data.push(task);
        saveTask(data,callback);
    });

};

const updateTask = (id,updatedTask,callback) =>{
   const d= taskService.updateTask(id,updatedTask,callback)
   console.log("🚀 ~ updateTask ~ d:", d)
}

module.exports = {
    validateTask,
    addTask,
    loadTask,
    saveTask,
    getTaskById,
    updateTask
}