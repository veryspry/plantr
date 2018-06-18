const { db, Vegetable } = require('./models');

db.sync({force: true})
  .then(() => {
    console.log('Database synced!')
    // db.close() // only if using a version of node without `finally`
  })
  .then(() => {
    const p1 = Vegetable.create({name: 'carrot', color: 'orange', planted_on: Date.now()})
    const p2 = Vegetable.create({name: 'lettuce', color: 'green', planted_on: Date.now()})
    const p3 = Vegetable.create({name: 'tomato', color: 'red', planted_on: Date.now()})
    return Promise.all([p1, p2, p3])

    // Sequelize.bulkInsert('vegetables', [
    //   { name: 'carrot', color: 'orange', planted_on: Date.now() },
    //   { name: 'lettuce', color: 'green', planted_on: Date.now() },
    // ])
    // TRUNCATE TABLE vegetables;
    // INSERT INTO vegetables (name, color, planted_on) VALUES ('carrot', 'orange', Date.now())
  })
  .catch(err => {
    console.log('Disaster! Something went wrong! ')
    console.log(err)
    // db.close() // only if using a version of node without `finally`
  })
  .finally(() => { // only if using a version of node WITH `finally`
    db.close()
  })
