module.exports = {
    "type": "postgres",
    "url": process.env.DATABASE_URL,
    "entities": ["dist/**/*.entity{ .ts,.js}"],
    "synchronize": true,
    "migrations": ["dist/migrations/*{.ts,.js}"],
    "migrationsTableName": "migrations_typeorm",
    "migrationsRun": process.env.NODE_ENV === 'development'
}