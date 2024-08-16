const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Model/userModel"); // Ensure the path is correct

class UserController {
    //@desc POST register User
    //@route POST /api/users/register
    //@access public
    static async registerUser(req, res) {
        try {
            const { email, name, password, role } = req.body;
            // Use the `findByEmail` method from the User class
            const userAvailable = await User.findByEmail(email);
            if (userAvailable) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Hash the password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const newUser = await User.create({ name, email, password: hashedPassword, role });
            res.status(201).json({ message: 'User created successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    //@desc POST login User
    //@route POST /api/users/login
    //@access public
    static async loginUser(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: "All fields are mandatory" });
                return;
            }

            const user = await User.findByEmail(email);

            if (user) {
                console.log("User Found:", user); // Debugging statement
                const isMatch = await bcrypt.compare(password, user.password);
                console.log("Password Match:", isMatch); // Debugging statement

                if (isMatch) {
                    const accessToken = jwt.sign(
                        {
                            user: {
                                _id: user._id,
                                name: user.name,
                                email: user.email,
                            },
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        { expiresIn: "30m" }
                    );
                    return res.status(200).json({ accessToken });
                }
            }

            res.status(401).json({ message: "Email or Password Not Valid!" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = {
    registerUser: UserController.registerUser,
    loginUser: UserController.loginUser
}

