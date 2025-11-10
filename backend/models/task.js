import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: false,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('Task', TaskSchema);