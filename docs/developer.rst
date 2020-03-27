Developer
=========

Database
--------

To create the database,
run


    $ npx sequelize db:create
    $ npx sequelize db:migrate


To insert some data,
run

    $ npx sequelize-cli db:seed:all

If you encounter

    ERROR: Validation error

you should be able to get more information using ``--debug``,
for example

    $ npx sequelize-cli db:seed:all --debug

To insert a specific data,
run

    $ npx sequelize-cli db:seed --seed name-of-seed-as-in-data

To remove the data,
run

    $ npx sequelize-cli db:seed:undo:all

To remove a specific data,
run

    npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data

To remove the database,
run

    $ npx sequelize db:drop