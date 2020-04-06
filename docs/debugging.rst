Debugging
=========

To see all the internal logs used in Express,
set the ``DEBUG`` environment variable to ``express:*``::

    $ export DEBUG=express:*

To see all the queries to the database,
set the ``logging``
when creating the Sequelize object
in ``src/database/index.js``.
More details in `Sequelize documentation <https://sequelize.org/master/manual/getting-started.html#logging>`_.
    
