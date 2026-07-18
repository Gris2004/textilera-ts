import mongoose from 'mongoose';
import { FabricInterface } from '../interfaces/FabricInterface.js'

const FabricSchema = new mongoose.Schema<FabricInterface>({
    fabric_name: {type: String, required: true},
    fabric_color: {type: String, required: true},
    fabric_quality: {type: String, required: true},
    fabric_entry_date: {type: Date, required: true},
    //organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
});

export const FabricModel = mongoose.model<FabricInterface>('FabricModel', FabricSchema);
