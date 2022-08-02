const express=require('express');
const router=express.Router();

const dc=require('../controllers/doctor_controller')

router.post('/register',dc.register);
router.post('/login',dc.login);


module.exports=router;