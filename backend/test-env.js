require('dotenv').config();

console.log('=== VARIABLES D\'ENVIRONNEMENT ===');
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_USER:', process.env.DATABASE_USER);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
console.log('Type du password:', typeof process.env.DATABASE_PASSWORD);