const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require("../models/user");

const register = async(req,res) =>{
    try{
        
        const {username,email,password} = req.body;

        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({
                success:false,
                message:"Email already exist."
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        await newUser.save()

        res.status(201).json({
            success:true,
            message:"Account Created."
        })


    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const login = async(req,res) =>{
    try{
        const {email,password} = req.body;

        const userExist = await User.findOne({email})

        if(!userExist){
            return res.status(404).json({
                success:false,
                message:"Email not found."
            })
        }

        const comparePassword = await bcrypt.compare(password,userExist.password)

        if(!comparePassword){
            return res.status(400).json({
                success:false,
                message:"Wrong Password."
            })
        }

        const token = jwt.sign({id:userExist._id},process.env.JWT_SECRET , {expiresIn:"1d"})

        res.status(200).json({
            success:true,
            message:"Login Successfull.",
            token
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
            
        })
    }
}


const getUser = async(req,res) =>{
    try{
        const userId = req.userId
        const user = await User.findById(userId).select("-password")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found."
            })
        }

        res.status(200).json({
            success:true,
            user
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {
    register,
    login,
    getUser
}