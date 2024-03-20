const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');
const Note = require('../models/Note');
 
// Route 1: get all the notes GET "/api/notes/new". login required
router.get('/',authenticateToken, async (req, res) => {

    try {
        const notes = await Note.find({user:req.userId});
        res.json(notes);
    } catch (err) {
        res.status(500).send(`Internal Server Error ${err.message}`);
    }
})

// Route 2: create note for user POST "/api/notes/". login required
router.post('/',authenticateToken,[
    body('title','Title cannot be empty').notEmpty(),
    body('description','Description should be of min 10 characters').notEmpty().isLength({min:10}),
],async (req,res) => {

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
});

// Route 3: Update user note PUT "api/notes/". login required
router.put('/:id',authenticateToken,[],async(req,res) => {
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
})

// Route 4: Delete user note DELETE "api/notes/delete". login required
router.delete('/:id',authenticateToken,async (req,res) => {
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
})

module.exports = router;