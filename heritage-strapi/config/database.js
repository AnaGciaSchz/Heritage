module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'heritageData'),
        username: env('DATABASE_USERNAME', 'HeritageAdmin'),
        password: env('DATABASE_PASSWORD', '(BTz5BP/_Q%9n9hJ'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      options: {}
    },
  },
});
