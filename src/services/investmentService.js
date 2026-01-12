const { getInversiones, addInversion, removeInversionById } = require('../data/store');
const { v4: uuidv4 } = require('uuid');

function listAll() {
  return getInversiones();
}

function add(inversion) {
  const newInv = { id: uuidv4(), ...inversion };
  return addInversion(newInv);
}

function removeById(id) {
  return removeInversionById(id);
}

module.exports = { listAll, add, removeById };
