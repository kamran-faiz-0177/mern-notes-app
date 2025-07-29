const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const NoteModel = mongoose.model('Notes', NoteSchema);
module.exports = NoteModel;