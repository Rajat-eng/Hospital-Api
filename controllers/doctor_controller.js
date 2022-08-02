const Doctor=require('../models/doctor');
const jwt=require('jsonwebtoken');

module.exports.register=async function(req,res){
    try{    
        let doctor=await Doctor.findOne({email:req.body.email});
        
        if(!doctor){
            if(req.body.password!==req.body.confirm_password){
                return res.status(401).json({
                    message:"Password does not match"
                })
            }
            doctor=await Doctor.create({
                name:req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            return res.status(200).json({
                message:"Doctor registered",
                doctor:doctor
            })
        }else{
            return res.status(409).json({
                message:'User already registered'
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Sahi karo'
        })
    }
}

module.exports.login=async function(req,res){
    try{
    let doctor=await Doctor.findOne({email:req.body.email});
    
    if(!doctor || req.body.password!==doctor.password){
        return res.status(401).json({
            message:"Username/Password does not match"
        })
    }

    return res.status(200).json({
        message : 'Login successful',
        data :{
            token :  jwt.sign(doctor.toJSON() , 'hospital' , {expiresIn : '1000000'})
        }
    })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Sahi karo'
        })
    }
}