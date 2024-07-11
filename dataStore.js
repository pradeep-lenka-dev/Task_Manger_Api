const fs = require('fs');
const path =  require ('path');


const filePath = path.join(__dirname, 'apiData.json');

const saveData = (data, callback) => {
    fs.writeFile(filePath, JSON.stringify(data,null,2), 'utf8',(err)=>{
        if(err){
            return callback(err);
        }
        return callback(null)
    })
}

const loadData = (callback) => {
    fs.readFile(filePath, 'utf8',(err,data)=>{
        if(err){
            if(err.code === 'ENOENT'){
                return callback(null,[])
            }
            return callback (err);
        }
        callback(null, JSON.parse(data));
    });
};

const getTaskById = (id,callback) =>{
    loadData((err,data)=>{
        if(err){

        }
        const task = data.find(task => task.id == id)
    callback(null, task)
    })
    const data = fs.readFileSync(filePath, 'utf8');
       
    console.log("🚀 ~ uniqueTask ~ data:", JSON.parse(data))
}


module.exports = {saveData,loadData,getTaskById}