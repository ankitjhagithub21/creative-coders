const Contact = require("../models/contact");

const sendMessage = async (req, res) => {
    try {
        const {username,email,message} = req.body;
        
        const newContact = new Contact({
            username,
            email,
            message
        })
        
        await newContact.save()

        res.status(200).json({
            success: true,
            message: "Message send successfully."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getAllMessage = async(req,res) =>{
    try{
       const messages = await Contact.find()
       res.json(messages)

    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

module.exports = {
    sendMessage,
    getAllMessage
}