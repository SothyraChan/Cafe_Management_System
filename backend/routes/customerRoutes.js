const express = require('express');
const Customer = require('../models/Customer');
const router = express.Router();

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await Customer.destroy({
      where: { id: id }
    });

    if (deleted) {
      return res.status(204).end(); // No content to send back for DELETE operation
    } else {
      // If no rows are deleted, it means the customer was not found
      return res.status(404).json({ message: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
