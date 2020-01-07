const { users, Op } = require('../../models');

module.exports = {
  post: (req, res) => {
    // TODO : 유저가 회원가입을 했을 때, 회원정보를 데이터베이스에 저장하도록 구현하세요.

    users
      .findAll({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
        }
      })
      .then(data => {
        if (data.length !== 0) {
          res.status(409).send('Already exists user');
        } else {
          users.create(req.body).then(data => res.status(200).json(data));
        }
      })
      .catch(err => {
        throw err;
      });

    // res.end();
  }
};
