const express = require('express');
const executeQuery = require('../db');
const router = express.Router();

// GET: 키와 체중 정보 조회
router.get('/', async (req, res) => {
  try {
    const records = await executeQuery('SELECT * FROM bongjini');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새로운 키와 체중 정보 추가
router.post('/', async (req, res) => {
  const { ID, Height, Weight } = req.body;
  try {
    await executeQuery('INSERT INTO bongjini (ID, Height, Weight) VALUES (:ID, :Height, :Weight)', [
      { name: 'ID', value: { stringValue: ID } },
      { name: 'Height', value: { stringValue: Height } },
      { name: 'Weight', value: { stringValue: Weight } },
    ]);
    res.status(201).json({ message: 'Height and Weight added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// DELETE: 키와 체중 정보 삭제
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await executeQuery('DELETE FROM bongjini WHERE ID = :ID', [
      { name: 'ID', value: { stringValue: id } },
    ]);
    res.status(200).json({ message: 'Height and Weight deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
