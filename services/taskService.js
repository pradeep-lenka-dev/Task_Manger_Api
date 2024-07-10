const dataStore = require ('../dataStore');

const loadTask = (callback) =>{
    dataStore.loadData(callback)
}

const saveTask = (data,callback)=>{
    dataStore.saveData(data,callback)
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
        saveTask(task,callback);
    });

};

module.exports = {
    validateTask,
    addTask,
    loadTask,
    saveTask
}