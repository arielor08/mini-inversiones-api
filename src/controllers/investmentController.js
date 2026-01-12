const investmentService = require('../services/investmentService');

function validateInvestmentBody(body) {
  const { cliente, activo, monto, tipo, fecha, rentabilidad } = body;
  if (!cliente || !activo || monto == null || !tipo || !fecha || rentabilidad == null) return false;
  if (typeof monto !== 'number' || monto <= 0) return false;
  if (typeof rentabilidad !== 'number') return false;
  // basic date check
  if (Number.isNaN(Date.parse(fecha))) return false;
  return true;
}

function list(req, res) {
  const all = investmentService.listAll();
  res.json(all);
}

function create(req, res) {
  if (!validateInvestmentBody(req.body)) return res.status(400).json({ error: 'Invalid investment payload' });
  const { cliente, activo, monto, tipo, fecha, rentabilidad } = req.body;
  const newInv = investmentService.add({ cliente, activo, monto, tipo, fecha, rentabilidad });
  res.status(201).json(newInv);
}

function remove(req, res) {
  const { id } = req.params;
  const ok = investmentService.removeById(id);
  if (!ok) return res.status(404).json({ error: 'Investment not found' });
  res.status(204).send();
}

module.exports = { list, create, remove };
