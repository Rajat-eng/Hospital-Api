const express=require('express');
const router=express.Router();

const rc=require('../controllers/report_controller');

router.get('/:status',rc.findReport);
module.exports=router;