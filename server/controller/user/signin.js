const { users } = require('../../models');
const crypto = require('crypto');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그인을 했을 때, 회원정보를 데이터베이스에서 확인하고, 회원의 id를 session에 담아주도록 구현하세요.
    // console.log('로그인전', req.session); // 세션에 아직 세션데이터 안담김, 쿠키에 아직 세션아이디 안담김
    // console.log(req.cookies); // 아직 쿠키에 세션아이디 안담김
    // console.log(req.sessionID); // 세션 아이디는 만들어짐
    let sess = req.session;
    let pw = req.body.password;
    users
      .findAll({
        where: { email: req.body.email }
      })
      .then(data => {
        if (data.length === 1) {
          let salt = data[0].password.slice(0, 88);
          let target = crypto.pbkdf2Sync(
            String(pw),
            salt,
            123456,
            64,
            'sha512'
          );
          if (salt + target.toString('base64') === data[0].password) {
            sess.userId = data[0].id;
            // console.log('로그인후', req.session); // 세션 데이터 담음, 이 밑에 응답줄때 쿠키에 세션아이디 담을꺼임
            res.status(200).json({ id: data[0].id });
          } else {
            res.status(404).send('unvalid user');
          }
        } else {
          res.status(404).send('unvalid user');
        }
      });
    // res.end();
  }
};
