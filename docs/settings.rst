Settings
========

Values that might change depending on your environment
are managed with the help of `config <http://lorenwest.github.com/node-config>`_.

The default values are kept in ``config/default.js``

..  literalinclude:: ../config/default.js

Values used in production mode are kept in ``config/production.js``

..  literalinclude:: ../config/production.js

To enable production mode,
run ::

    $ export NODE_ENV=production

