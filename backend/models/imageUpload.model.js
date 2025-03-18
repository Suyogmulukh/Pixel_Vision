import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    filename:String,
    path:String,
 
}, { timestamps: true });

const Image = mongoose.model('Image', imageSchema);
export default Image
