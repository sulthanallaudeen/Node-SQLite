var express = require('express');
var router = express.Router();

  const { Sequelize, DataTypes } = require('sequelize');
  const sequelize = new Sequelize(
    {
      dialect: 'sqlite',
      storage: 'db/db.sqlite'
    }
  );
//   const queryInterface = sequelize.getQueryInterface();
//   queryInterface.createTable('User', {
//   id: {
//       type: DataTypes.INTEGER, primaryKey: true
//     },
//   firstName: DataTypes.STRING,
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// });

/* GET home page. */


var cron = require('node-cron');
cron.schedule('* * * * *', () => {
  // doBulk();
});
function doBulk(){
  for (var i = 0; i < 1000; i++) {
    const jane = Test.build({ name: "Jane_"+i,phone: "9042445010" });
    jane.save();
  }
}

router.get('/insert', function(req, res, next) {
  const jane = Test.build({ name: "Jane",phone: "9042445010" });
  jane.save();
  res.render('index', { title: result });
});

router.get('/bulkInsert', function(req, res, next) {
  for (var i = 0; i < 1000; i++) {
    const jane = Test.build({ name: "Jane_"+i,phone: "9042445010" });
    jane.save();
  }
  res.render('index', { title: 'ok ok !' });
});

router.get('/search', function(req, res, next) {
  var id = req.query.id;
  fetch(id).then(function(result){
      res.render('index', { title: result });
  });
});

router.get('/all', function(req, res, next) {
  fetchAll().then(function(result){
    console.log('r',result);
    var text = '';
    for (var i = 0; i < result.length; i++) {
      text = text + result[i].name + ' | ';
    }
      res.render('index', { title: text });
  });
});
const Test = sequelize.define('test', {
  id: {
    type: DataTypes.INTEGER, primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  freezeTableName: true,
  timestamps: false
});

async function fetch (id){
  const test = await Test.findOne({ where: { id: id } });
  if (test === null) {
    return('Not found!');
  } else {
    console.log('result is ',test.dataValues.name);
    return(test.dataValues.name);
  }
}

async function fetchAll (){
  const test = await Test.findAll();
  return test;
}

module.exports = router;
