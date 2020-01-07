const { users } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
  get: (req, res) => {
    // TODO : 유저의 session을 이용하여, 데이터베이스에 있는 정보를 제공하도록 구현하세요.
    // let cookie = req.cookies;
    // console.log(req.session); // 세션 데이터 담겨있음, 세션아이디가 쿠키를 통해 옴!!!!!
    // console.log(req.cookies); // 쿠키를 보면 세션 아이디가 있다...!!
    // console.log(req.sessionID); // 이 세션아이디가 쿠키에 있더라..
    // console.log(req.session.id); // 실제 세션에 저장되어있는 세션아이디 보는법!!
    // 세션저장소에 세션 id를 가지고 해당하는 세션 파일을 읽어서 req에 세션객체를 만든대!!!
    // let sess = req.session;
    // console.log(sess);
    console.log('쿠키', req.cookies);
    let token = req.cookies.user;
    // console.log('token', token);
    if (token) {
      let decoded = jwt.verify(token, 'secret');
      users
        .findAll({ where: { id: decoded.userId } })
        .then(data => res.status(200).json(data[0]));
    } else {
      res.status(401).send('need user session');
    }
    // res.end();
  }
};
