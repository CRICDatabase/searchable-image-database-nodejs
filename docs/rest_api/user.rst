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

..  http:post:: /api/v1/usuarios/analista/{user_id}

    Promote user with ``id`` equals ``user_id`` to be analyst.

    :param post_id: post's unique id
    :type post_id: int

    :>json string id: User's identifier

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

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

    ..  literalinclude:: ../examples/get-usuarios-1.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/get-usuarios-1.sh.output
        :language: json
        :caption: Output

Delete Operations
-----------------
