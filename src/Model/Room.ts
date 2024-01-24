import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    room_number: {
        type: String,
        required: [true, "Please enter your room_number"],
    },
    bed: {
        type: Array,
        required: [true, "Please enter your bed"],
    },
    clean: {
        type: Boolean,
        required: [true, "Please enter your clean status"],
    }
})

export default mongoose.model("Room", roomSchema);