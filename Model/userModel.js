const mongoose = require('mongoose');

class User {
  constructor() {
    const userSchema = new mongoose.Schema({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      role: { type: String, enum: ['admin', 'member'], default: 'member' },
    });

    this.model = mongoose.model('User', userSchema);
  }

  async create(data) {
    const user = new this.model(data);
    return await user.save();
  }

  async findByEmail(email) {
    return await this.model.findOne({ email });
  }
}

module.exports = new User();

