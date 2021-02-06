import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
//import auth from '../middleware/auth.js'


// Register

export const Register = async (req, res) => {
    try {
    let { email, password, passwordCheck, userName , usertype} = req.body;
    // validate
    if (!email || !password || !passwordCheck ||!usertype)
    return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password.length < 8)
    return res.status(400).json({ msg: "The password needs to be at least 8 characters long." });

    if (password !== passwordCheck)
    return res.status(400).json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
    return res.status(400).json({ msg: "An account with this email already exists." });

    if (!userName) userName = email;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = new User({
    email,
    password: passwordHash,
    userName,
    usertype
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };


    // Login
    /*router.post("/login", async (req, res) => {
    try {
    const { email, password } = req.body;
        */
    export const LoginUser = async (req, res) => {
        try {
            //const user = await User.find()
            const { email, password ,usertype} = req.body;
    
           
            // validate
            if (!email || !password)
                return res.status(400).json({ msg: "Not all fields have been entered." });

            const user = await User.findOne({ email: email });
            if (!user)
                return res.status(400).json({ msg: "No account with this email has been registered." });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });
           //const stu = await compare(usertype,user.usertype,"student");
           
            if(usertype!="student" && user.usertype!="student") {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET1);
                    res.json({
                    token,
                    user: {
                    id: user._id,
                    userName: user.userName,
                    },
                    });
            };
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET2);
            res.json({
            token,
            user: {
            id: user._id,
            userName: user.userName,
            },
            });
            console.log("Successfully login");
        } 
    
        catch (err) {
        res.status(500).json({ error: err.message });
        }

    }

    
    // Delete
    export const Delete = async (req, res) => {
    
    try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };
   

    // Check if token is valid
    
    export const tokenIsValid = async (req, res) => {
    try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.JWT_SECRET1);
    const verified2 = jwt.verify(token, process.env.JWT_SECRET2);
    if (!verified && !verified2) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
    } catch (err) {
    res.status(500).json({ error: err.message });
    }
    };
    
    export const getUser = async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
    userName: user.userName,
    id: user._id,
    });
    };