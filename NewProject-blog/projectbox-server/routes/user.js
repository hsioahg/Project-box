var express = require('express');
var router = express.Router();
const { 
  login,
  niken,
  mailCheck,
  register,
  retpass,
  userlog } = require('../src/controller/user')
const { SuccessModel, ErrorModel, jwtSuccessModel } = require('../src/model/resModel')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED } = require('../src/utils/constant')
const {jwtAuth,jwtError,jwtcode} = require('../src/utils/jwt')
const nodemailer = require('nodemailer')
const redis = require('../src/conf/redisConfig')

router.use(jwtAuth)
router.use(jwtError)

/* 登录API */
router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  const result = login(email, password)
  return result.then(user => {
    if (!user.email) {
      res.json(
        new ErrorModel('登录失败')
      )
    } else {
      const email = user.email
      const token = jwt.sign(
        { email },
        PRIVATE_KEY,
        {expiresIn: JWT_EXPIRED}
      )
      res.json(
        new jwtSuccessModel({token},'登录成功')
      )
    }
  })
});

/* 发送验证码邮件api */
router.post('/getemail', (req, res, next) => {
  let code = Math.floor(Math.random() * 900000) + 100000
  // console.log(code)
  const { email } = req.body
  // console.log(email);
  // 建立一个smtp连接
  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    secureConnection: true,
    port: 465,
    auth: {
      user: 'r2628758793@163.com',
      pass: 'PVGFYMTJWJPKIQNE',
    }
  })
  // 配置相关参数
  let options = {
    from: 'r2628758793@163.com',
    to: `${email}`,
    subject: '邮箱注册验证码',
    html: `<div style="
    width: 400px;
    height: 400px;
    background-color: rgb(67, 67, 67);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    padding-top: 45px;
  ">
    <h1 style="
      text-align: center;
      color: aliceblue;
    ">欢迎注册</h1>
    <span style="
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 30px;
      width: 306px;
      color: aliceblue;
      font-size: 20px;
    ">尊敬的用户，您本次的验证码为：</span>
    <h2 style="
      text-align: center;
      color: aliceblue;
    ">${code}</h2>
    <span style="
      display: inline-block;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 15px;
      width: 306px;
      color: aliceblue;
      font-size: 20px;
    ">此验证码用于注册。本验证码10分钟内有效，请尽快输入，感谢您的使用。</span>
  </div>`
  }
  transporter.sendMail(options, (err, msg) => {
    if (err) {
      res.json(
        new ErrorModel('验证码发送失败')
      )
    } else {
      res.json(
        new SuccessModel('验证码发送成功，请查收！')
      )
      redis.setValue(`${email}-${code}`,`${email}-${code}`);
      redis.expireValue(`${email}-${code}`, 600)
    }
  })
})

/* 判断用户名是否已被注册 */
router.get('/nick', (req, res, next) => {
  const { nickname } = req.query
  console.log(nickname);
  const result = niken(nickname)
  return result.then(data => {
    if (data.nickname) {
      res.json(
        new ErrorModel('该用户名已被占用，请重试')
      )
      return
    }
    res.json(
      new SuccessModel()
    )
  })
});

/* 判断邮箱是否已被注册 */
router.get('/mailcheck', (req, res, next) => {
  const {email} = req.query
  const result = mailCheck(email)
  return result.then(data => {
    if (data.email) {
      res.json(
        new ErrorModel('该邮箱已被注册')
      )
      return
    }
    res.json(
      new SuccessModel()
    )
  })
});

// 注册
router.post('/register', async (req, res, next) => {
  const { email, vercode, nickname, password  } = req.body
  let key = await redis.keytf(`${email}-${vercode}`)
  if (key === 0) {
    res.json(
      new ErrorModel('验证码错误,请重新输入！')
    )
  } else {
    const result = register(email, vercode, nickname, password)
    return result.then(data => {
      res.json(
        new SuccessModel()
      )
    })
  }
 
})

//找回密码
router.post('/retpass', async (req,res,next) => {
  const { retemail, vercode, newpass1 } = req.body
  let key = await redis.keytf(`${retemail}-${vercode}`)
  if (key === 0) {
    res.json(
      new ErrorModel('验证码错误,请重新输入！')
    )
  } else {
    const result = retpass(retemail, vercode, newpass1)
    return result.then(data => {
      res.json(
        new SuccessModel()
      )
    })
  }
})

//查询用户信息
router.get('/userlog', (req, res, next) => {
  const undolog = jwtcode(req)
  const result = userlog(undolog.email)
  return result.then(user => {
    res.json(
      new SuccessModel(user)
    )
  })
})



module.exports = router;
