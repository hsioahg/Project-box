var express = require('express');
var router = express.Router();
const {
  floordata,
  floordata1,
  roomnum,
  studennum,
  datenum,
  detailstudent
} = require('../../whole/controller/studentServer/homedata');
const { SuccessModel, ErrorModel } = require('../../whole/model/resModel')

router.get('/floordate', (req,res,next) => {
  const biulding = req.session.juris
  const require = floordata(biulding)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

router.get('/floordate1', (req,res,next) => {
  const biulding = req.session.juris
  const require = floordata1(biulding)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

router.get('/roomnum', (req,res,next) => {
  const biulding = req.session.juris
  const require = roomnum(biulding)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

router.get('/studennum', (req,res,next) => {
  const biulding = req.session.juris
  const require = studennum(biulding)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

router.get('/datenum', (req,res,next) => {
  const biulding = req.session.juris
  const require = datenum(biulding)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    }
  })
})

router.get('/detailstudent', (req,res,next) => {
  const keyword = req.query.keyword
  const require = detailstudent(keyword)
  return require.then(data => {
    if (data) {
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
})

module.exports = router;