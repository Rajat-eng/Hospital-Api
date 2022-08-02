const Doctor=require('../models/doctor');
const Patient=require('../models/patient');
const Report=require('../models/report');

module.exports.register=async function(req,res){
   try{
    let patient=await Patient.findOne({phone:req.body.phone});
    let doctor=await Doctor.findById(req.user._id);
   
    if(!patient){
        if(doctor){
            patient=await Patient.create({
                name:req.body.name,
                phone:req.body.phone,
                doctor:req.user._id,
            })
            return res.status(200).json({
                message:"patient registered",
                patient:patient
            })
        }else{
            return res.status(401).json({
                message:"Doctor is not found"
            }) 
        }
       
    }else{
        return res.status(409).json({
            message:"Patient already registered by this doctor"
        })
    }
   }catch(err){
    console.log(err);
    return res.status(500).json({
        message:'Sahi karo'
    })
   }
}


module.exports.createReport=async function(req,res){
   try{
    let patient=await Patient.findById(req.params.id);

    if(patient){
        let report =await Report.create({
            patient:req.params.id,
            status:req.body.status,
            date:new Date().toDateString()
        })
    
        patient.reports.push(report);
        patient.save();
        return res.status(200).json({
            message:"report of patient created",
            report:report
        })
    }else{
        return res.status(401).json({
            message:"Patient is not found"
        }) 
    }
   }catch(err){
    console.log(err);
    return res.status(500).json({
        message:'Sahi karo'
    })
   }
    
}

module.exports.allReports=async function(req,res){
    try{
        let patient=await Patient.findById(req.params.id);
    if(patient){
        let reports=await patient.populate({
            path:'reports',
        })
        return res.status(200).json({
            message:`all report of patient ${patient.name}`,
            reports:reports
        })
    }else{
        return res.status(401).json({
            message:"Patient is not found"
        }) 
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({
        message:'Sahi karo'
    })
    }
}
