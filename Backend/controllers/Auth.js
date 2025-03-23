const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');
const OTP = require('../models/OTP');
const { sendOTPEmail } = require('../utils/emailService');
const crypto = require('crypto');


// Login user
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("From Login controller");
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please provide email and password",
            });
        }
        
        // Check if user exists
        const user = await User.findOne({ email }).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist, please sign up first"
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
        console.log("From Login controller2",user);
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

// Register user
exports.register = async (req, res) => {
    try {
        const { 
            firstname, 
            lastname, 
            email, 
            password,
            confirmPassword,
            role,
            otp,
            Contact
        } = req.body;
        
        // Validate input
        if(!firstname || !lastname || !email || !password || !confirmPassword  || !otp || !Contact){
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields",
            });
        }
        console.log("Constact",Contact);
        // Password matching
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match",
            });
        }
        
        // Check existing User
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Verify OTP
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired. Please request a new OTP.",
            });
        }

        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
        if (!isOtpValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP. Please try again.",
            });
        }
        
        // Create profile details
        const profileDetails = await Profile.create({
            gender: null,
            dob: null,
            address: null,
            city: null, 
            state: null,
            pincode: null,
            country: null,
        });
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log("From Register controller");
        // Create user
        const user = await User.create({
            firstName:firstname,
            lastName:lastname,
            email,
            password: hashedPassword,
            role: role || "user", // Default to user role if not specified
            contact:Contact,
            additionalDetails: profileDetails._id,
        });
        console.log("From Register controller2");
        // Delete OTP record after successful verification
        await OTP.deleteOne({ email });
        console.log("From Register controller3");
        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                role: user.role
            }
        });
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "User registration failed",
            error: error.message
        });
    }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('additionalDetails');
            
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const { 
            gender, 
            dob, 
            address, 
            city, 
            state, 
            pincode, 
            country,
            Contact
        } = req.body;
        
        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Update profile
        const profile = await Profile.findByIdAndUpdate(
            user.additionalDetails,
            {
                gender,
                dob,
                address,
                city,
                state,
                pincode,
                country
            },
            { new: true }
        );

        // Update user's Contact if provided
        if (Contact) {
            user.Contact = Contact;
            await user.save();
        }
        
        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                Contact: user.Contact
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Change password
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        
        // Validate input
        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please provide current password and new password"
            });
        }
        
        // Find user
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        
        // Check current password
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect"
            });
        }
        
        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        
        res.status(200).json({
            success: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

// Generate OTP for registration
exports.generateOTP = async (req, res) => {
    try {
        console.log("generate otp controller");
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User with this email already exists"
            });
        }
        
        // Generate a 6-digit OTP
        const plainOTP = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Hash OTP before storing
        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(plainOTP, salt);
        
        // Delete any existing OTP for this email
        await OTP.deleteOne({ email });
        
        // Store the new OTP
        await OTP.create({
            email,
            otp: hashedOTP
        });
        
        // Send OTP via email
        console.log("send otp controller check");
        const emailSent = await sendOTPEmail(email, plainOTP);
        console.log("send otp controller check2");
        if (!emailSent) {
            console.log("Printning message ------- ",emailSent);
            return res.status(500).json({
                success: false,
                message: "Failed to send OTP email. Please try again."
            });
        }
        
        res.status(200).json({
            success: true,
            message: "OTP sent to your email. Please check your inbox."
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Failed to generate OTP",
            error: error.message
        });
    }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }
        
        // Find OTP record
        const otpRecord = await OTP.findOne({ email });
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "OTP not found or expired. Please request a new OTP."
            });
        }
        
        // Verify OTP
        const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);
        if (!isOtpValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP. Please try again."
            });
        }
        
        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            success: false,
            message: "Failed to verify OTP",
            error: error.message
        });
    }
};