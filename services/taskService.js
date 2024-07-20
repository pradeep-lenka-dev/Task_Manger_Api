const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, 'apiData.json');

const saveData = (data) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
            return err;
        }
        return (data)
    })
}

const loadData = () => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return  []
            }
            return err;
        }
        console.log( JSON.parse(data))
        return  JSON.parse(data);
    });
};

const getTaskById = async (id) => {
    const task = await loadData()
    console.log("🚀 ~ returnnewPromise ~ task:", task)
    // return new Promise((res,rej)=>{


        // loadData((err, data) => {
        //     if (err) {
    
        //     }
        //     const taskIndex = data.findIndex(task => task.id == id)
        //     if (taskIndex == -1) {
        //         return ("Task not Found")
        //     }
        //     console.log("🚀 ~ loadData ~ data[taskIndex]:", data[taskIndex])
        //     return (data[taskIndex]);
        // })
    // })
}

const updateTask = (id, updatedTask) => {
    const { title, description, completed, priority } = updatedTask;

    loadData((err, data) => {
        if (err) {

        }
        const taskIndex = data.findIndex(task => task.id == id)
        if (taskIndex == -1) {
            return ("not found")
        }
        
        data[taskIndex].title = title;
        data[taskIndex].description = description;
        data[taskIndex].completed = completed;
        //data.priority = priority;
        saveData(data, (err) => {
            if (err) {
                return err;
            }
            return  data[taskIndex];
        });
    })

}

const deleteTask = (Id) => {
    
        
        loadData((err,data)=>{
            if (err) {
    
            }
            const taskIndex = data.findIndex(task => task.id == Id)
            if (taskIndex == -1) {
                return  taskIndex
            }
            data.splice(taskIndex,1)
            saveData(data, (err) => {
                if (err) {
                    return err;
                }
                return  taskIndex;
            });
        })


}


module.exports = { saveData, loadData, getTaskById, updateTask,deleteTask }