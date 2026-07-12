import mongoose from 'mongoose';

const FabricSchema = new mongoose.Schema({
    fabric_name: {type: String, required: true},
    fabric_color: {type: String, required: true},
    fabric_quality: {type: String, required: true},
    fabric_entry_date: {type: Date, default: Date.now},
    organization: {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
});

export const FabricModel = mongoose.model('FabricModel', FabricSchema);
