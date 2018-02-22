// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: { 
      host : '54.153.36.225',
      database : 'postgres',
      user: 'postgres'
    }
  },

  production: {
    client: 'postgresql',
    connection: { 
      host : '54.153.36.225',
      database : 'postgres',
      user: 'postgres'
    }
  },
    migrations: {
      tableName: 'knex_migrations'
    }
  };
