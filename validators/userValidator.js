const Joi = require('joi');

class UserValidator {
    constructor() {
        this.emailPattern = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    }

    get registerSchema() {
        return Joi.object({
            name: Joi.string().min(4).max(30).required(),
            email: Joi.string().pattern(this.emailPattern).required(),
            password: Joi.string().min(6).required(),
            role: Joi.string().valid('member', 'admin', 'creator').required(),
        });
    }

    get loginSchema() {
        return Joi.object({
            email: Joi.string().pattern(this.emailPattern).required(),
            password: Joi.string().min(6).required(),
        });
    }
}

module.exports = new UserValidator();

