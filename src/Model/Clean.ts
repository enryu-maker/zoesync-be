import mongoose from "mongoose";

const cleanSchema = new mongoose.Schema({
    clean:{
        type:Boolean,
        required: [true, "Please enter your clean status"],
    }
})

export default mongoose.model("Clean", cleanSchema);
