module.exports = {
  post: (req, res) => {
    // TODO : 유저가 로그아웃했을 때, session 정보를 없애고, '/'로 redirect할 수 있도록 구현하세요.
    let sess = req.session;
    console.log(sess);
    if (sess.userId) {
      req.session.destroy(err => {
        // console.log(req.session);
        if (err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    } else {
      res.redirect('/');
    }
    // res.end();
  }
};
