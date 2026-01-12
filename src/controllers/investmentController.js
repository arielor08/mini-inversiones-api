const { listAll, add, removeById } = require('../services/investmentService');

async function list(req, res) {
  const all = listAll();
  res.json(all);
}

async function create(req, res) {
  // request validation handled in middleware
  const { cliente, activo, monto, tipo, fecha, rentabilidad } = req.body;
  const newInv = add({ cliente, activo, monto, tipo, fecha, rentabilidad });
  res.status(201).json(newInv);
}

async function remove(req, res) {
  const { id } = req.params;
  const ok = removeById(id);
  if (!ok) return res.status(404).json({ error: 'Investment not found' });
  res.status(204).send();
}

module.exports = { list, create, remove }; 
