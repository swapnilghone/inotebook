const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authenticateToken = require('../middleware/authenticateToken');

const { getUserNotes,createUserNote,updateUserNote,deleteUserNote } = require('../controller/notes')

 
// Route 1: get all the notes GET "/api/notes/new". login required
router.get('/',authenticateToken, getUserNotes);

// Route 2: create note for user POST "/api/notes/". login required
router.post('/',authenticateToken,[
    body('title','Title cannot be empty').notEmpty(),
    body('description','Description should be of min 10 characters').notEmpty().isLength({min:10}),
],createUserNote);

// Route 3: Update user note PUT "api/notes/". login required
router.put('/:id',authenticateToken,[],updateUserNote);

// Route 4: Delete user note DELETE "api/notes/delete". login required
router.delete('/:id',authenticateToken,deleteUserNote)

module.exports = router;