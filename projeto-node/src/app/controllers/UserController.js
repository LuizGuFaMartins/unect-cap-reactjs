const User = require('../schemas/User');

class UserController {
  async store(req, res) {

    const userExists = await User.find({
      email: req.body.email,
    });

    if (userExists.length > 0) {
      return res.status(400).json({error: 'User already exists'});
    }
    
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.json(user);
  }

  async index(req, res) {
    const user = await User.find();

    return res.json(user);
  }

  async update(req, res) {
    const updatedUser = await User.findOneAndUpdate(
      {email: req.body.email},
      {
        name: req.body.name,
      },
    );

    return res.json(updatedUser);
  }

  async delete(req, res) {
    const deletedUser = await User.findOneAndDelete(
      {email: req.body.email}
    );

    return res.json(deletedUser);
  }
}

module.exports = new UserController();