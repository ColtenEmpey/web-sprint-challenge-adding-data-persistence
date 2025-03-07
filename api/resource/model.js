
const db = require("../../data/dbConfig")

const getAll = () =>{
    return db('resources')
}
const getById = (id) => {
    return db('resources').where('resource_id', id).first()
  }
const create = async (resource) =>{
    await db('resources').insert(resource)
    return resource
}

module.exports = {
    getAll,
    getById,
    create
}