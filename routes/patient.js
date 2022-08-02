const express=require('express');
const router=express.Router();
const passport=require('passport');
const pc=require('../controllers/patient_controller');

router.post('/register',passport.authenticate('jwt',{session:false}),pc.register);

router.post('/:id/create_report',pc.createReport);

router.get('/:id/all_reports',pc.allReports);

module.exports=router;
