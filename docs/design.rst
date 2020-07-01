Design
======

We use the
`model–view–controller <https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller>`_ (MVC)
software design pattern.

When the user make a request,
the request is processed in the following steps:

1. ``src/rotas`` forward the request to the controller
2. ``src/controllers`` forward the request to the service

   No validation is done here.
3. ``src/executores`` validates the request
   and return the data to the user.

   All data query goes to ``src/repositorios``.
