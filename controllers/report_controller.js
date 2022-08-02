const Patient=require('../models/patient');
const Report=require('../models/report');

module.exports.findReport=async function(req,res){

    try{
    let reports=await Report.find({status:req.params.status})
    .populate({
        path:'patient',
        select:'name phone'
    })

    if(reports && reports.length!=0){
        return res.status(200).json({
            message:`all reports of patients with status ${req.params.status}`,
            allreports:reports
        })
    }else{
        return res.status(401).json({
            message:`No reports found`,
        })
    }
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:'Sahi karo'
        })
    }
    
}