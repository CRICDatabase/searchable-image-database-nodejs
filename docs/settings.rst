Settings
========

Values that might change depending on your environment
are managed with the help of `config <http://lorenwest.github.com/node-config>`_.

The default values are kept in ``config/default.json``

..  literalinclude:: ../config/default.json
    :lines: 2-

Values used in production mode are kept in ``config/production.json``

..  literalinclude:: ../config/production.json
    :lines: 3-

To enable production mode,
run ::

    $ export NODE_ENV=production

