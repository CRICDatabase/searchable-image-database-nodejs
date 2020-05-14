Authentication
==============

Authentication means confirming your own identity.
We use the "basic" authentication scheme [RFC_2617]_:
username and password.
These credentials are transported in plain text.

..  http:post:: /api/v1/login

    Verify identify by providing username and password.

    :<json string email: User's email address
    :<json string senha: User's password

    :>json string usuario: User's details
    :>json string token_autenticacao: User's authorization code

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    Successful authentication.

    ..  literalinclude:: ../examples/002-authentication.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/002-authentication.sh.output
        :language: json
        :caption: Output

    **Example**

    Authentication invalid.

    ..  literalinclude:: ../examples/003-authentication.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/003-authentication.sh.output
        :language: json
        :caption: Output

When user forgets the password,
user can request to receive a new one by email.

..  http:post:: /api/v1/forget_password

    Generate new password and send it to user by email.

    :<json string email: User's email address

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/004forget-password.sh
        :language: bash
        :caption: Input


.. [RFC_2617] The Internet Society. *HTTP Authentication: Basic and Digest
              Access Authentication*. 1999. https://tools.ietf.org/html/rfc2617.
