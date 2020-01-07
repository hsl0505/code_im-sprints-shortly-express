'use strict';

const crypto = require('crypto');
// crypto.randomBytes(64, (err, buf) => {
//   let salt = buf.toString('base64');
//   console.log(salt.length); // 88개
//   crypto.pbkdf2(String(1234), salt, 123456, 64, 'sha512', (err, key) => {
//     console.log('이건어디', key.toString('base64'));
//   });
// });

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {
      hooks: {
        afterValidate: (data, option) => {
          let salt = crypto.randomBytes(64).toString('base64');
          // console.log(salt.length);
          let key = crypto.pbkdf2Sync(
            String(data.password),
            salt,
            123456,
            64,
            'sha512'
          );
          data.password = salt + key.toString('base64');
        }
      }
    }
  );
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};
