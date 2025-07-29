const router = require("express").Router();
const { CreateNote, FetchNote, UpdateNote, DeleteNote } = require("../Controllers/NotesController");

router.post("/create",CreateNote);
router.get("/fetch",FetchNote);
router.put("/update",UpdateNote);
router.delete("/delete",DeleteNote);

module.exports = router;