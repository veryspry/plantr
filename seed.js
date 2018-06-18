const { db, Vegetable } = require('./models');

db.sync({force: true})
  .then(() => {
    console.log('Database synced!')
    // db.close() // only if using a version of node without `finally`
  })
  .then(() => {
    let seed = []
    let vegetables = ['carrot', 'lettuce', 'tomato', 'greenBeans']
    let color = ['red', 'blue', 'yellow']

    for (let i=0; i<=10; i++) {
      seed.push(Vegetable.create({
        name: vegetables[i % vegetables.length],
        color: color[i % color.length]
      }))
    }
    return Promise.all(seed)

    // const p1 = Vegetable.create({name: 'carrot', color: 'orange', planted_on: Date.now()})
    // const p2 = Vegetable.create({name: 'lettuce', color: 'green', planted_on: Date.now()})
    // const p3 = Vegetable.create({name: 'tomato', color: 'red', planted_on: Date.now()})
    // return Promise.all([p1, p2, p3])
  })
  .catch(err => {
    console.log('Disaster! Something went wrong! ')
    console.log(err)
    // db.close() // only if using a version of node without `finally`
  })
  .finally(() => { // only if using a version of node WITH `finally`
    db.close()
  })
