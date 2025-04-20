const userModel = require('../models/user.model');

module.exports.createUser = async ({
    fullname, email, password
}) => {
    try {
        if (!fullname || !email || !password) {
            throw new Error('All fields are required');
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('User with this email already exists');
        }

        // Hash password before creating user
        const hashedPassword = await userModel.hashPassword(password);
        
        // Return the Mongoose document directly
        return await userModel.create({
            fullname,
            email,
            password: hashedPassword,
        });
    } catch (error) {
        throw new Error(error.message || 'Error creating user');
    }
}