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

module.exports = { users, inversiones };
