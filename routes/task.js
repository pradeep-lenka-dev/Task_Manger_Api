var express = require('express');
var router = express.Router();
var taskData = require('../apiData')
const taskService = require ("../services/taskService")

router.get('/',function(req,res,next){
    res.send('respponse with resorce')
});



router.get('/tasks',(req,res)=>{
    dataStore.loadData((err,data)=>{
        if(err){
            return res.status(500).send("Internal Error")
        }
        res.send(data)
    })
})



router.post('/tasks',function(req,res){

    taskData = req.body
    const validationError = taskService.validateTask(taskData)
    if(validationError){
        return res.status(400).send(validationError)
    }
   
    taskService.addTask(taskData,(err)=>{
        if(err){
            return res.status(500).send("Internal Server error")
        }
        res.status(200).send("Task stored successfully")
    })

})
module.exports =  router