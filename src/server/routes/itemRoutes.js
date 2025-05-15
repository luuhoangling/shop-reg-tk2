const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../../models/Item');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', '..', 'public', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// GET single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST create new item with possible file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('Upload request received:', req.body);
    
    const itemData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    };

    // If a file was uploaded, add the imageUrl
    if (req.file) {
      console.log('File uploaded:', req.file);
      itemData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const item = new Item(itemData);
    await item.save();
    
    console.log('Item saved successfully:', item);
    res.status(201).json({ message: 'Item created successfully', item });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// PUT update item
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const itemData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category
    };

    if (req.file) {
      itemData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      itemData,
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// DELETE item
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
