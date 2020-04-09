Description
===========

Post Operations
---------------

..  http:post:: /api/v1/imagens-descricoes/{user_id}

    Create new descriptions.

    :param user_id: User's id
    :type user_id: int

    :<jsonarr int codigo: Code of description
    :<jsonarr string nome: Name

    :>jsonarr int codigo: Code of description
    :>jsonarr string nome: Name

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/post-imagens-lesoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/post-imagens-lesoes.sh.output
        :language: json
        :caption: Output

Get Operations
--------------

..  http:get:: /api/v1/imagens-descricoes

    List all descriptions.

    :>jsonarr int codigo: Code of description
    :>jsonarr string nome: Name

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/get-imagens-descricoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/get-imagens-descricoes.sh.output
        :language: json
        :caption: Output

Delete Operations
-----------------
