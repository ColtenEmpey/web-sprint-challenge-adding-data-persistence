
exports.up = async function(knex) {

  await knex.schema.createTable('projects', tbl =>{
    tbl.increments('project_id', 128)
    tbl.varchar('project_name', 128)
        .notNullable()
    tbl.varchar('project_description', 128)
    tbl.varchar('project_completed', 128)
  })
//TODO dont think this is registering as unique, might have done it wrong.
  await knex.schema.createTable('resources', tbl =>{
    tbl.increments('resource_id')
    tbl.varchar('resource_name', 128)
        .unique()
        .notNullable();
    tbl.varchar('resource_description', 128)
  })

  await knex.schema.createTable('tasks', tbl =>{
    tbl.increments('task_id')
    tbl.varchar('task_description', 128)
        .notNullable()
    tbl.varchar('task_notes', 128)
    tbl.varchar('task_completed', 128)
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
    // tbl.varchar('project_description')
    //         .unsigned()
    //     .references('project_description')
    //     .inTable('projects')
    // tbl.varchar('project_name')
    //       .unsigned()
    //         .notNullable()
    //     .references('project_name')
    //     .inTable('projects')

  })
  
  await knex.schema.createTable('project-resources', tbl =>{
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
    tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
    tbl.primary(['project_id','resource_id'])
  })
};


exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('project-resources');
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('resources');
  await knex.schema.dropTableIfExists('projects');
};
