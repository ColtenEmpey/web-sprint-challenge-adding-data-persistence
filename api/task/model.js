
const db = require("../../data/dbConfig")

const getAll = () =>{
    return db('tasks')
}
const getById = (id) => {
    return db('tasks').where('task_id', id).first()
  }
const create = async (task) =>{
    await db('tasks').insert(task)
    return task
}

module.exports = {
    getAll,
    getById,
    create
}
