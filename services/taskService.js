const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'apiData.json');

const saveData = (data, callback) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            return callback(err);
        }
        return callback(null)
    })
}

const loadData = (callback) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return callback(null, [])
            }
            return callback(err);
        }
        callback(null, JSON.parse(data));
    });
};

const getTaskById = (id, callback) => {
    loadData((err, data) => {
        if (err) {

        }
        const taskIndex = data.findIndex(task => task.id == id)
        if (taskIndex == -1) {
            callback(null, "Task not Found")
        }
        callback(null, data[taskIndex])
    })
}

const updateTask = (id, updatedTask, callback) => {
    const { title, description, completed, priority } = updatedTask;

    loadData((err, data) => {
        if (err) {

        }
        const taskIndex = data.findIndex(task => task.id == id)
        if (taskIndex == -1) {
            // callback(null, "Task not Found")
        }
        
        data[taskIndex].title = title;
        data[taskIndex].description = description;
        data[taskIndex].completed = completed;
        //data.priority = priority;
        saveData(data, (err) => {
            console.log("🚀 ~ saveData ~ data:", data)
            if (err) {
                return callback(err);
            }
            return callback(null, data[taskIndex]);
        });

        // console.log("🚀 ~ loadData ~ data:", data)
        // callback(null, data)
    })

}


module.exports = { saveData, loadData, getTaskById, updateTask }