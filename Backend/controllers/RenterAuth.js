const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Renter = require('../models/Renter');
const Product = require('../models/Product');
// const Renter = require('../models/Renter');

// @route   POST /api/v1/renderAuth/register
// @desc    Register a render
// @access  Public
exports.register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email, 
            password, 
            contact,
            userType,
            aadharNumber,
            shopName,
            shopAddress,
            businessReg
        } = req.body;

        if(!firstName){
            return res.status(400).json({
                success:false,
                message:"enter all fields",
            })
        }
        console.log("hello");
        // Check if render already exists
        let renter = await Renter.findOne({ email });   
        
        if (renter) {   
            return res.status(400).json({ success: false, message: 'Render already exists' });
        }
        console.log("firstName : -", firstName)
        renter = new Renter({
            firstName,
            lastName,
            email,
            password,
            contact,
            renterType:userType,
            AadharNumber:aadharNumber,
            ShopName:shopName, 
            shopAddress,
            RegistrationNo:businessReg,
        });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        renter.password = await bcrypt.hash(password, salt);

        await renter.save();
        // console.log("Aadhar Number",aadharNumber)
        console.log("Renter Controller")
        res.status(201).json({ success: true, message: 'Render registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

// Login user
exports.login = async (req, res) => {
    try {
        console.log("Trying to renter Login from backend");
        const { email, password } = req.body;
        console.log("From renter Login controller");
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }
        // Check if user exists
        const user = await Renter.findOne({ email });
        if(!user){
            return res.status(401).json({
                success: false,
                message: "renter does not exist, please sign up first"
            });
        }
        
        // Check password matching
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: 'Password is not correct' 
            });
        }
        
        // Create JWT payload
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };
        user.toObject();
        user.password = undefined;
        console.log("From renter Login controller2",user);
        // Sign token
        const token=jwt.sign(
            payload, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }, 
        );
        
        return res.status(200).json({
            success: true,
            token,
            user
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

