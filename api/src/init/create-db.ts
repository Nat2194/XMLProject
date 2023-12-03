import { Client } from 'pg';
import { config } from '../shared/configs/config';

async function createDatabase() {
  const dbConfig = config.get('db');
  const client = new Client({
    host: dbConfig.ip_address,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: 'postgres', // Connexion à la base de données par défaut pour créer une nouvelle base de données
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE "${dbConfig.name}"`);
    console.log(`Base de données ${dbConfig.name} créée avec succès.`);
  } catch (error) {
    console.error('Erreur lors de la création de la base de données:', error);
  } finally {
    await client.end();
  }
}

createDatabase();
