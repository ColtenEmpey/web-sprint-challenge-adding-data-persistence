const db = require("../../data/dbConfig")

const getAll = () =>{
    return db('projects')
}
const getById = (id) => {
    return db('projects').where('projects_id', id).first()
  }
const create = async (project) =>{
    await db('projects').insert(project)
    // project.project_completed = true
    return project
}

module.exports = {
    getAll,
    getById,
    create
}
