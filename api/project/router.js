const express = require("express")
const router = express.Router()

const Actions = require("./model")


router.post("/", (req, res) =>{
    const {project_name} = req.body
    if(project_name){
        Actions.create(req.body)
            .then(proj =>{
                // proj.project_completed = true
                let projClone
                if( proj.project_completed == null){
                    // projClone = {...proj, project_completed: false}
                    proj.project_completed = false
                }
                else{
                    // projClone = {...proj, project_completed: true}
                    proj.project_completed = true
                }
                res.json(proj)
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
        .then(projects =>{
            projects.map(proj =>{
                if( proj.project_completed === null){
                    proj.project_completed = false
                }
                else{
                    proj.project_completed = true
                }
            })
            res.json(projects)
        })
        .catch(err =>{
            err.status(404).json({message: "error completing request"})
        })
})

module.exports = router