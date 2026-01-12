const { inversiones } = require('../data/store');
const { v4: uuidv4 } = require('uuid');

function listAll() {
  return inversiones;
}

function add(inversion) {
  const newInv = { id: uuidv4(), ...inversion };
  inversiones.push(newInv);
  return newInv;
}

function removeById(id) {
  const idx = inversiones.findIndex(i => i.id === id);
  if (idx === -1) return false;
  inversiones.splice(idx, 1);
  return true;
}

module.exports = { listAll, add, removeById };
