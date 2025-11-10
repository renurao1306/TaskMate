import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
}, {timestamps: true});


//Hashing
UserSchema.pre('save', async function (next) {
    console.log('this.password: ', this.password)
    if(!this.isModified('password')) return next();

    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
});


//Match password method
UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
}

export default mongoose.model('User', UserSchema);