const Note = require('../models/Note');
const { validationResult } = require('express-validator');

const getUserNotes = async (req, res) => {

    try {
        const notes = await Note.find({user:req.userId});
        res.json(notes);
    } catch (err) {
        res.status(500).send(`Internal Server Error ${err.message}`);
    }
}

const createUserNote = async (req,res) => {

    // error handling if there are any validation errors
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
    }

    try {
        const note = await Note.create({
            title:req.body.title,
            description:req.body.description,
            tag:req.body.tag,
            user:req.userId
        });
        res.json(note);
    } catch (err) {
        res.status(500).send(`some error occured: ${err.message}`);
    }
}

const updateUserNote = async(req,res) => {
    try {
        const {title,description,tag} = req.body;
        const noteID = req.params.id;

        let note = await Note.findById(noteID);

        if(!note)
            return res.status(404).send('Invalid Request');
        

        if(note.user.toString() !== req.userId)
            return res.status(401).send('unauthorized request');

        const newNote = {}
        if(title){ newNote.title = title}
        if(description){ newNote.description = description}
        if(tag){ newNote.tag = tag}

        note = await Note.findByIdAndUpdate(noteID,{$set: newNote},{new:true});
        res.json(note);
    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
}

const deleteUserNote = async (req,res) => {
    try {
        const noteId = req.params.id;
        let note = await Note.findById(noteId);
        
        if(!note)
            return res.status(404).send('not found');

        if(note.user.toString() !== req.userId)
            return res.status(401).send('unauthorized request');

        note = await Note.findByIdAndDelete(noteId);
        
        if(note)
            res.json({'success':'Note Deleted Sucessfully!'});

    } catch (err) {
        res.status(500).send(`Internal Server Error: ${err.message}`);
    }
}

module.exports = {getUserNotes,createUserNote,updateUserNote,deleteUserNote}