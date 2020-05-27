var fs = require("fs");

var notes = JSON.parse(fs.readFileSync("./db/db.json"));

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        return res.json(notes);
    });
    
    app.post("/api/notes", function(req, res) {
        var newNote = req.body;

        var newId;
        if (notes.length === 0) {
            newId = 0;
        }
        else {
            newId = notes[notes.length - 1].id + 1;
        }
        newNote = {id:newId, ...newNote};
        notes.push(newNote);
        console.log(notes);
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(newNote);
    });
    
    app.delete("/api/notes/:id", function(req, res) {
        var deletedNoteId = parseInt(req.params.id);
        var newNotes = notes.filter(note => note.id !== deletedNoteId);
        notes = newNotes;
        console.log(notes);
        fs.writeFileSync("./db/db.json", JSON.stringify(notes));
        res.json(notes);
    });
};