const express = require('express');
const executeQuery = require('../db');
const router = express.Router();

// GET: 모든 회원 조회
router.get('/', async (req, res) => {
  try {
    const records = await executeQuery('SELECT * FROM register');
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// POST: 새 회원 추가
router.post('/', async (req, res) => {
  const { ID, PW, NICKNAME } = req.body;
  try {
    await executeQuery('INSERT INTO register (ID, PW, NICKNAME) VALUES (:ID, :PW, :NICKNAME)', [
      { name: 'ID', value: { stringValue: ID } },
      { name: 'PW', value: { stringValue: PW } },
      { name: 'NICKNAME', value: { stringValue: NICKNAME } },
    ]);
    res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// PATCH: 회원 정보 수정
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { PW, NICKNAME } = req.body;
  try {
    await executeQuery('UPDATE register SET PW = :PW, NICKNAME = :NICKNAME WHERE ID = :ID', [
      { name: 'PW', value: { stringValue: PW } },
      { name: 'NICKNAME', value: { stringValue: NICKNAME } },
      { name: 'ID', value: { stringValue: id } },
    ]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
