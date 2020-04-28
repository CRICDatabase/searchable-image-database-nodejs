Authorization
=============

Authorization means being allowed access to the system.
We use access tokens (not OAuth 2.0 [RFC_6749]_).
Access token is provided when authentication is successful,
see :doc:`authentication`.

When required,
the authorization code must be provided in as part of the header,
for example::

    curl \
        -H "token_autenticacao: YOUR_AUTHORIZATION_TOKEN" \
        -X POST "http://api.database.cric.com.br/api/v1/end/point"


.. [RFC_6749] IETF Trust and the persons identified as the
   document authors. *The OAuth 2.0 Authorization Framework*.
   2012. https://tools.ietf.org/html/rfc6749
