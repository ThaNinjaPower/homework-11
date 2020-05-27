var fs = require("fs");

var notes = JSON.parse(fs.readFileSync("./db/db.json"));

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        return res.json(notes);
    });
    
    app.post("/api/notes", function(req, res) {
        var newNote = req.body;
        
        notes.push(newNote);
    
        console.log(notes);
    
        res.json(newNote);
    });
    
    app.delete("/api/notes/:id", function(req, res) {
        var deletedNote = req.params.id;
    });
};