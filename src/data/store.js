const users = [
  { username: 'admin', password: 'adminpass', role: 'admin' },
  { username: 'analyst', password: 'analystpass', role: 'analyst' }
];

const inversiones = [
  // sample
  {
    id: '1',
    cliente: 'Cliente Uno',
    activo: 'ACC-XYZ',
    monto: 10000,
    tipo: 'Renta Variable',
    fecha: '2025-01-01',
    rentabilidad: 0.08
  }
];

function getUsers() {
  return users;
}

function getInversiones() {
  return inversiones;
}

function addInversion(inv) {
  inversiones.push(inv);
  return inv;
}

function removeInversionById(id) {
  const idx = inversiones.findIndex(i => i.id === id);
  if (idx === -1) return false;
  inversiones.splice(idx, 1);
  return true;
}

function resetData() {
  // useful for tests - resets to initial sample
  users.length = 0;
  users.push({ username: 'admin', password: 'adminpass', role: 'admin' }, { username: 'analyst', password: 'analystpass', role: 'analyst' });
  inversiones.length = 0;
  inversiones.push({ id: '1', cliente: 'Cliente Uno', activo: 'ACC-XYZ', monto: 10000, tipo: 'Renta Variable', fecha: '2025-01-01', rentabilidad: 0.08 });
}

module.exports = { getUsers, getInversiones, addInversion, removeInversionById, resetData };
