const jwt = require('jsonwebtoken');
const User = require('../schemas/User');

const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const {email, password} = req.body;

    const user = await User.find({
      email,
    });

    if (user.length == 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    
    if (!(await user[0].comparePassword(password))) {
      return res.status(400).json({ error: 'Password does not match' });
    } 
    

    const { _id, name  } = user[0];

    return res.json({
      user: {
        _id,
        name,
        email
      },
      token: jwt.sign({ _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();