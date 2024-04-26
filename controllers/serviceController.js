const User = require("../models/user")
const Service = require("../models/service")
const addService = async(req,res) =>{
    try{
        const {title ,description} = req.body;
        
        const userId = req.userId;
        const user = await User.findById(userId)
        if(!user || !user.isAdmin){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials."
            })
        }

        const newService = new Service({
            title,
            description
        })
        await newService.save()

        res.status(201).json({
            success:true,
            message:"Service Added."
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

const deleteService = async(req,res) =>{
    try{

        
        const userId = req.userId;
        const serviceId = req.params.serviceId
        const user = await User.findById(userId)
        if(!user || !user.isAdmin){
            return res.status(400).json({
                success:false,
                message:"Invalid Credentials."
            })
        }
        const deletedService = await Service.findByIdAndDelete(serviceId)
        if(!deletedService){
            return res.status(400).json({
                success:false,
                message:"Service not found."
            })
        }

        res.status(200).json({
            success:false,
            message:"Service deleted."
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const getAllServices = async(req,res) =>{
    try{

        const services = await Service.find()

        res.json({services})

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
module.exports = {
    addService,
    deleteService,
    getAllServices
}