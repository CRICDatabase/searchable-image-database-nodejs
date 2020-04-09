Injury
======

Post Operations
---------------

..  http:post:: /api/v1/imagens-lesoes/{id_usuario}

    Create new injury.

    :param user_id: User's id
    :type user_id: int

    :<jsonarr string nome: Name of the injury
    :<jsonarr string detalhes: Details of the injury

    :>jsonarr string nome: Name of the injury
    :>jsonarr string detalhes: Details of the injury

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

..  http:get:: /api/v1/imagens-lesoes

    List all injuries.

    :>jsonarr string nome: Name of the injury
    :>jsonarr string detalhes: Details of the injury

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/get-imagens-lesoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/get-imagens-lesoes.sh.output
        :language: json
        :caption: Output

Delete Operations
-----------------
