API
===

The server answers to 

User
----

Post Operations
^^^^^^^^^^^^^^^

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
^^^^^^^^^^^^^^

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

    ..  literalinclude:: examples/get-usuarios-1.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/get-usuarios-1.sh.output
        :language: json
        :caption: Output

Delete Operations
^^^^^^^^^^^^^^^^^

Injury
------

Post Operations
^^^^^^^^^^^^^^^

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

    ..  literalinclude:: examples/post-imagens-lesoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/post-imagens-lesoes.sh.output
        :language: json
        :caption: Output

Get Operations
^^^^^^^^^^^^^^

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

    ..  literalinclude:: examples/get-imagens-lesoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/get-imagens-lesoes.sh.output
        :language: json
        :caption: Output

Delete Operations
^^^^^^^^^^^^^^^^^

Description
-----------

Post Operations
^^^^^^^^^^^^^^^

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

    ..  literalinclude:: examples/post-imagens-lesoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/post-imagens-lesoes.sh.output
        :language: json
        :caption: Output

Get Operations
^^^^^^^^^^^^^^

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

    ..  literalinclude:: examples/get-imagens-descricoes.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/get-imagens-descricoes.sh.output
        :language: json
        :caption: Output

Delete Operations
^^^^^^^^^^^^^^^^^

Image
-----

Post Operations
^^^^^^^^^^^^^^^

..  http:post:: /api/v1/imagens

    Create new image.

    :<json int id_usuario: User's id
    :<json int id_lesao: Injury's id
    :<json string codigo_lamina: Microscope slide id
    :<json date dt_aquisicao: Date of scan
    :formparam file file: Image

    :>json int id_usuario: User's id
    :>json int id_lesao: Injury's id
    :>json string codigo_lamina: Microscope slide id
    :>json date dt_aquisicao: Date of scan
    :>json file image: Image

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: examples/post-imagens.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/post-imagens.sh.output
        :language: json
        :caption: Output

..  http:post:: /api/v1/imagens/image_id}/classificacao-celula/{user_id}

    Classify a single cell with nucleus located at *x* and *y*.

    :param image_id: Image's id
    :type user_id: int
    :param user_id: User's id
    :type user_id: int

    :<json int id_lesao: User's id
    :<json int coord_centro_nucleo_x: Nucleus' *x* coordinate in pixels
    :<json int coord_centro_nucleo_y: Nucleus' *y* coordinate in pixels
    :<json int alturaCanvas: Height of canvas from user device
    :<json int larguraCanvas: Width of canvas from user device
    :<json int alturaOriginalImg: Height of original image
    :<json int larguraOriginalImg: Width of original image

    :>jsonarr int id_lesao: User's id
    :>jsonarr int coord_centro_nucleo_x: Nucleus' *x* coordinate in pixels
    :>jsonarr int coord_centro_nucleo_y: Nucleus' *y* coordinate in pixels
    :>jsonarr int alturaCanvas: Height of canvas from user device
    :>jsonarr int larguraCanvas: Width of canvas from user device
    :>jsonarr int alturaOriginalImg: Height of original image
    :>jsonarr int larguraOriginalImg: Width of original image

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

..  http:post:: /api/v1/imagens/{image_id}/segmentacao-celula/{user_id}

    Save the segmentation of cell and nucleus.

    :param image_id: Image's id
    :type user_id: int
    :param user_id: User's id
    :type user_id: int

    :<json int id_descricao: Description's id
    :<json int alturaCanvas: Height of canvas from user device
    :<json int larguraCanvas: Width of canvas from user device
    :<json int alturaOriginalImg: Height of original image
    :<json int larguraOriginalImg: Width of original image
    :<json array segmentos_citoplasma: *x* and *y* coordinates
    :<json array segmentos_nucleo: *x* and *y* coordinates

    :>json int id_descricao: Description's id
    :>json int alturaCanvas: Height of canvas from user device
    :>json int larguraCanvas: Width of canvas from user device
    :>json int alturaOriginalImg: Height of original image
    :>json int larguraOriginalImg: Width of original image
    :>json array segmentos_citoplasma: *x* and *y* coordinates
    :>json array segmentos_nucleo: *x* and *y* coordinates

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

Get Operations
^^^^^^^^^^^^^^

..  http:get:: /api/v1/imagens/listar/{user_id}

    List all images.

    :param user_id: User's id
    :type user_id: int

    :>jsonarr int id_usuario: User's id
    :>jsonarr int id_lesao: Injury's id
    :>jsonarr string codigo_lamina: Microscope slide id
    :>jsonarr date dt_aquisicao: Date of scan
    :>jsonarr file image: Image

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: examples/get-imagens.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/get-imagens.sh.output
        :language: json
        :caption: Output

..  http:get:: /api/v1/imagens/{image_id}

    List all images.

    :param image_id: Image's id
    :type user_id: int

    :>json int id_usuario: User's id
    :>json int id_lesao: Injury's id
    :>json string codigo_lamina: Microscope slide id
    :>json date dt_aquisicao: Date of scan
    :>json file image: Image

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: examples/get-imagens-info.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: examples/get-imagens-info.sh.output
        :language: json
        :caption: Output

Delete Operations
^^^^^^^^^^^^^^^^^