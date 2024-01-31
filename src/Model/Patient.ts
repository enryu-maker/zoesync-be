import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    id:{
        type:String,
        required: [true, "Please enter your id"],
    },
    firstname: {
        type: String,
        required: [true, "Please enter your first name"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter your last name"],
    },
    date_of_birth: {
        type: String,
        required: [true, "Please enter your DOB"],
    },
    gender: {
        type: String,
        required: [true, "Please enter your gender"],
        eval: ["male", "female"]
    },
    contact_number: {
        type: String,
        required: [true, "Please enter your contact_number"],
    },
    emergency_contact: {
        type: Object,
        required: [true, "Please enter your emergency_contact"],
    },
    admission_date: {
        type: String,
        required: [true, "Please enter your admission_date"],
    },
    attending_physician: {
        type: String,
        required: [true, "Please enter your attending_physician"],
    },
    attending_nurse: {
        type: String,
        required: [true, "Please enter your attending_nurse"],
    },
    medication:{
        type: Array, 
        required: [false,"No medication Provided"]
    },
    medicationHistory:{
        type: Array, 
        required: [false,"No medication Provided"]
    }
})

export default mongoose.model("Patient", patientSchema);
