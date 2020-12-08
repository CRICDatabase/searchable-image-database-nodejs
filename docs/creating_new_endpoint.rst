Creating New Endpoint
=====================

This document
will guide you
to create a new endpoint.

OpenAPI
-------

First,
edit ``reference/cric.v2.yaml``
to add the desired new endpoint.
We recommend you to use `Stoplight <https://stoplight.io/>`_
to edit the OpenAPI reference file.

Routing
-------

Add the route path to ``src/rotas``.
In Express,
route handlers behave like middleware.
Remember to use ``src/utils/auth_middleware.js``
if you need to restrict any route
to authorised users.

Service
-------

Add the services or route handlers to ``src/executores``
and remember to wrap it in ``src/controllers``.
Remember to use ``res.locals.user``
to get information regarding the user performing the request.
