const mongoose=require('mongoose');

const reportSchema=new mongoose.Schema({
      patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
      },
      status: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
},{
    timestamps:true
})

const Report=mongoose.model('Report',reportSchema);
module.exports=Report;