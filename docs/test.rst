Test
====

We use
`Jest <https://jestjs.io/>`_
and
`SuperTest <https://www.npmjs.com/package/supertest>`_
for test.

Use ::

    npm run test
  
to run all tests.
To run tests stored in ``awesome.test.js``,
use ::

    npm run test -- awesome.test.js

To run test named `foo`,
use ::

    npm run test -- --testNamePattern foo

or ::

    npm run test -- -t foo

Setup and Teardown
------------------

Before run any test,
we populate the ``jest`` database.
And after the last test,
we drop all tables from the ``jest`` database.

..  literalinclude:: ../config/test.js
    :caption: Configuration file used when by Jest

Unit Test
---------

``src/**/*.test.js`` stores unit tests,
for example,
data access object.


Integration Test
----------------

``src/__tests__/`` stores integration tests,
for example,
HTTP REST API calls.

Continuous Integration
----------------------

We use `Travis CI <https://travis-ci.com/>`_
for Continous Integration.

..  literalinclude:: ../.travis.yml
    :caption: Travis CI configuration

Travis CI provides MySQL to be used during the tests:

..  literalinclude:: ../config/travis.js
    :caption: Configuration file used when in Travis CI
