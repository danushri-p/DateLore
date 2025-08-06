const express = require('express');
const Note = require('../models/Note');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create
router.post('/', auth, async (req, res) => {
  const { title, body } = req.body;
  try {
    const note = new Note({ title, body, user: req.user.id });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
});

// Read all
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes', error: err.message });
  }
});

// Update
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update note', error: err.message });
  }
});

// Delete
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note', error: err.message });
  }
});

module.exports = router;
