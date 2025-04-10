import mysql from 'mysql2/promise';

interface QueryResult {
  [key: string]: string | number | boolean | null | Date;
}

interface QueryParams {
  query: string;
  values?: (string | number)[];
}

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3310'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'pmpwebsite',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Fonction pour tester la connexion
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à la base de données réussie');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    return false;
  }
}

// Fonction pour exécuter des requêtes
export async function query(queryOrParams: QueryParams | string, valuesOrNothing?: any[]): Promise<QueryResult[]> {
  try {
    // Support de l'ancien format (query, values)
    if (typeof queryOrParams === 'string') {
      console.log('📝 Exécution de la requête (ancien format):', queryOrParams);
      console.log('📌 Paramètres:', valuesOrNothing || []);
      
      const [results] = await pool.execute(queryOrParams, valuesOrNothing || []);
      console.log('✅ Requête exécutée avec succès');
      return results as QueryResult[];
    } 
    // Support du nouveau format ({query, values})
    else {
      const { query: sql, values = [] } = queryOrParams;
      console.log('📝 Exécution de la requête (nouveau format):', sql);
      console.log('📌 Paramètres:', values);
      
      const [results] = await pool.execute(sql, values);
      console.log('✅ Requête exécutée avec succès');
      return results as QueryResult[];
    }
  } catch (error) {
    console.error('❌ Erreur lors de l\'exécution de la requête:', error);
    throw error;
  }
}

// Test de la connexion au démarrage
testConnection().then(success => {
  if (success) {
    console.log('🚀 Base de données prête à être utilisée');
  } else {
    console.error('⚠️ La base de données n\'est pas accessible');
  }
});

export default pool; 