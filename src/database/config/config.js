module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "incluyetec",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      // Configura 'boolean' para utilizar valores booleanos en lugar de TINYINT
      boolean: true,
      underscored: true, // Opcional: establece la convención de nomenclatura en minúsculas_con_guiones_bajos
    },
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      // Configura 'boolean' para utilizar valores booleanos en lugar de TINYINT
      boolean: true,
      underscored: true, // Opcional: establece la convención de nomenclatura en minúsculas_con_guiones_bajos
    },
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "define": {
      // Configura 'boolean' para utilizar valores booleanos en lugar de TINYINT
      boolean: true,
      underscored: true, // Opcional: establece la convención de nomenclatura en minúsculas_con_guiones_bajos
    },
  },
}

