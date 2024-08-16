
const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();
const UserValidator = require("../validators/userValidator");
const { registerLimiter, loginLimiter } = require("../middleware/rateLimiter");
const ValidateRequest = require("../middleware/ValidateRequest");

router.post("/register", registerLimiter, new ValidateRequest(UserValidator.registerSchema).handle, registerUser);
router.post("/login", loginLimiter, new ValidateRequest(UserValidator.loginSchema).handle, loginUser);

module.exports = router;

