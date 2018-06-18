const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/plantr')
module.exports = db


const Gardener = db.define('gardeners', {

  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
})

const Plot = db.define('plots', {

  size: {
    type: Sequelize.INTEGER
  },
  shaded: {
    type: Sequelize.BOOLEAN
  }
})

const Vegetable = db.define('vegetables', {

  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  planted_on: {
    type: Sequelize.DATE
  }
})

Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'})
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'})
Plot.belongsTo(Gardener)
Gardener.hasOne(Plot)
Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'})
