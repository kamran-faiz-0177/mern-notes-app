const Notes = require('../Models/NotesModel');

const CreateNote = async (req, res) => {
    try {
        const { title, tag, description } = req.body;
        const note = new Notes({
            title,
            tag,
            description
        });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const FetchNote = async (req, res) => {
    try {
        const notes = await Notes.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const DeleteNote = async (req, res) => {
    try {
        const note = await Notes.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const UpdateNote = async (req, res) => {
    try {
        const { title, tag, description } = req.body;
        const note = await Notes.findByIdAndUpdate(
            req.params.id,
            { title, tag, description },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json(note);
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
