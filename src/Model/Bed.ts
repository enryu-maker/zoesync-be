import mongoose from "mongoose";

const bedSchema = new mongoose.Schema({
    room_number:{
        type:String,
        required:[true, "Please enter your room_number"],
    },
    bed_number:{
        type: String,
        required: [true, "Please enter your bed_number"],
    },
    status:{
        type:Boolean,
        required : [true, "No status Provided"]
    },
    patient:{
        type: Object , 
        required: false
    },
    admission_date:{
        type:String,
        required: [true, "Please enter your admission_date"],
    }
})

export default mongoose.model("Bed", bedSchema);