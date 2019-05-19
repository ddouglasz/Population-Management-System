import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    hashPassword: { type: String, required: true, trim: true },
},
    {
        timeStamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

const User = mongoose.model('user', userSchema);

export default User;
