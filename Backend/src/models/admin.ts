import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    password: string;
}

const adminSchema: Schema<IAdmin> = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Admin: Model<IAdmin> = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
