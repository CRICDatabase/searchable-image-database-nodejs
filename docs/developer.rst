Developer
=========

Database
--------

To create the database,
run

```
$ npx sequelize db:create
$ npx sequelize db:migrate
```

To insert some data,
run

```
$ npx sequelize-cli db:seed:all
```

To remove the data,
run

```
$ npx sequelize-cli db:seed:undo:all
```