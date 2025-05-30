const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        min: [3,'fullname must be at least 3 characters'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: [6,'email must be at least 6 characters'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparePassword = async function(Password){
    return await bcrypt.compare(Password, this.password);
}
 userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10); 
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;