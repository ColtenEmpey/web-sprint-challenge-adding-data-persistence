const express = require("express")
const router = express.Router()

const Actions = require("./model")


router.post("/", (req, res) =>{
    const {resource_name} = req.body
    if(resource_name){
        Actions.create(req.body)
            .then(proj =>{
                let projClone
                // if( proj.project_completed === null){
                    // projClone = {...proj, project_completed: false}
                // }
                // else{
                //     projClone = {...proj, project_completed: true}
                // }
                
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
        .then(project =>{
            res.json(project)
        })
        .catch(err =>{
            res.status(404).json({message: "error completing request"})
        })
})

module.exports = router