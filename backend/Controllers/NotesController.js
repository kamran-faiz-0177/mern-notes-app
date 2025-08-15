const Notes = require('../Models/NotesModel');

const CreateNote = async (req, res) => {
    try {
        const { title, tag, description } = req.body;
        const note = new Notes({
            title,
            tag,
            description
        });
        await note.save();
        res.status(201).json({
            success: true,
            message: "blog created successfully :)",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const FetchNote = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json({
            success: true,
            message: "blog fetch successfully",
            notes,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteNote = async (req, res) => {
    try {
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Note deleted successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateNote = async (req, res) => {
    try {
        const { title, tag, description } = req.body;
        await Notes.findByIdAndUpdate(
            req.params.id,
            { title, tag, description },
            { new: true }
        );
        res.status(200).json({
            message: "note updated successfully",
            success: true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    CreateNote,
    FetchNote,
    DeleteNote,
    UpdateNote
};
