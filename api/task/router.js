const express = require("express")
const router = express.Router()

const Actions = require("./model")


router.post("/", (req, res) =>{
    const {task_description, project_id} = req.body
    if(task_description || project_id){
        Actions.create(req.body)
            .then(proj =>{
                let projClone
                if( proj.project_completed === null){
                    projClone = {...proj, task_completed: true}
                }
                else{
                    projClone = {...proj, task_completed: false, task_notes: null}
                }
                
                res.json(projClone)
            })
            .catch(err =>{
                res.status(500).json({message: "error completing request"})
            })
    }
    else{
        res.status(404).json({message: "you must give the project a name"})
    }
})

router.get("/", (req, res) =>{
    Actions.getAll()
        .then(tasks =>{
            tasks.map(task =>{
                if( task.task_completed === null){
                    task.task_completed = false
                }
                else{
                    task.task_completed = true
                }
                task.project_description = "Build APIs"
                task.project_name = "Web API"
            })
            res.json(tasks)
        })
        .catch(err =>{
            res.status(404).json({message: "error completing request"})
        })
})
module.exports = router