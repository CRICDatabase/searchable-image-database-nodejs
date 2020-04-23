Debugging
=========

We use `debug <https://www.npmjs.com/package/debug>`_
to pass debug statements to standard output.
To see all the internal logs for this application,
set the ``DEBUG`` environment variable to ``database.cric:*``::

    $ export DEBUG=database.cric:*

To see all the internal logs used in Express,
set the ``DEBUG`` environment variable to ``express:*``::

    $ export DEBUG=express:*

You use more than one filter for debug statements.
Use commans to separate each filter.
For example, ::

    $ export DEBUG=database.cric:*,express:*

To see all the queries to the database,
set the ``logging``
when creating the Sequelize object
in ``src/database/index.js``.
More details in `Sequelize documentation <https://sequelize.org/master/manual/getting-started.html#logging>`_.