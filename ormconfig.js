module.exports = {
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: ['dist/**/entities/*.entity.{ts,js}'],
  subscribers: ['src/subscriber/**/*.{js,ts}'],
  //  specify the directory with which all our migration, entity and subscription files will be created when we run their respective cli command
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
}
