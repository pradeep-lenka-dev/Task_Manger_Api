var express = require('express');
var router = express.Router();
var taskData = require('../apiData')
const dataStore = require('../dataStore')


router.get('/',function(req,res,next){
    res.send('respponse with resorce')
});

router.get('/tasks1',function(req,res,next){
    res.send({"Task":"add todo","description":"description about task"})
})

router.get('/tasks',(req,res)=>{
res.json("get....data")
})
router.post('/tasks',function(req,res){
    taskData = req.body
    dataStore.loadData((err,data)=>{
        if(err){
            return res.status(500).send("Internal Server Error")
        }

        data.push(taskData);
        dataStore.saveData(data,(err)=>{
            if(err){
                return res.status(500).send("Internal Server Error")
            }
             res.send("Task store succsefully")
        })
    })
    console.log("🚀 ~ router.post ~ taskData:", taskData)

})
module.exports =  router