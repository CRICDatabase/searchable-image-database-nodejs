User
====

Post Operations
---------------

..  http:post:: /api/v1/usuarios

    Create a new user.

    :<json string primeiro_nome: First name
    :<json string ultimo_nome: Family name
    :<json string email: Email address
    :<json string senha: Password
    :<json int ativo: 1 if user is active and 0 otherwise.

    :>json string primeiro_nome: First name
    :>json string ultimo_nome: Family name
    :>json string email: Email address
    :>json string senha: Password
    :>json int ativo: 1 if user is active and 0 otherwise.

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/101-post-usuarios.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/101-post-usuarios.sh.output
        :language: json
        :caption: Output

..  http:post:: /api/v1/usuarios-administrador

    Create a new user with administrator rights.

    :<json string primeiro_nome: First name
    :<json string ultimo_nome: Family name
    :<json string email: Email address
    :<json string senha: Password
    :<json int ativo: 1 if user is active and 0 otherwise.
    :<json string api_key: Key to REST API
    :<json string nivel_acesso: Access level of the administrator

    :>json string primeiro_nome: First name
    :>json string ultimo_nome: Family name
    :>json string email: Email address
    :>json string senha: Password
    :>json int ativo: 1 if user is active and 0 otherwise.
    :>json string api_key: Key to REST API
    :>json string nivel_acesso: Access level of the administrator

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/102-post-usuarios-administrador.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/102-post-usuarios-administrador.sh.output
        :language: json
        :caption: Output

..  http:post:: /api/v1/usuarios-citopatologista

    Create a new user with cytopathologist rights.

    :<json string primeiro_nome: First name
    :<json string ultimo_nome: Family name
    :<json string email: Email address
    :<json string senha: Password
    :<json int ativo: 1 if user is active and 0 otherwise.
    :<json string codigo_crc: Cytopathologist registration code

    :>json string primeiro_nome: First name
    :>json string ultimo_nome: Family name
    :>json string email: Email address
    :>json string senha: Password
    :>json int ativo: 1 if user is active and 0 otherwise.
    :>json string codigo_crc: Cytopathologist registration code

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/103-post-usuarios-citopatologista.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/103-post-usuarios-citopatologista.sh.output
        :language: json
        :caption: Output

..  http:post:: /api/v1/usuarios/analista/{user_id}

    Promote a cytopathologist with ``id`` equals ``user_id`` to be analyst.

    :param post_id: post's unique id
    :type post_id: int

    :>json string id: User's identifier

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/104-post-usuarios-analista.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/104-post-usuarios-analista.sh.output
        :language: json
        :caption: Output


    **Example**

    If the ``user_id`` provided isn't a cytopathologist,
    your request will fail.

    ..  literalinclude:: ../examples/105-post-usuarios-analista-fail.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/105-post-usuarios-analista-fail.sh.output
        :language: json
        :caption: Output



Get Operations
--------------

..  http:get:: /api/v1/usuarios

    Get list of all users.

    :>jsonarr string primeiro_nome: First name
    :>jsonarr string ultimo_nome: Family name
    :>jsonarr string email: Email address
    :>jsonarr string senha: Password
    :>jsonarr int ativo: 1 if user is active and 0 otherwise.

..  http:get:: /api/v1/usuarios/{user_id}

    Get single user.

    :param user_id: User's identifier or 0
    :type user_id: int

    :<json string email: Email address
    :<json string senha: Password

    :>json string primeiro_nome: First name
    :>json string ultimo_nome: Family name
    :>json string email: Email address
    :>json string senha: Password
    :>json int ativo: 1 if user is active and 0 otherwise.

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/106-get-usuarios-1.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/106-get-usuarios-1.sh.output
        :language: json
        :caption: Output

Delete Operations
-----------------
