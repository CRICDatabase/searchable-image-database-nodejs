Image
=====

Post Operations
---------------

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

    ..  literalinclude:: ../examples/401-post-imagens-png.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/401-post-imagens-png.sh.output
        :language: json
        :caption: Output

    **Example**

    ..  literalinclude:: ../examples/401-post-imagens-tif.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/401-post-imagens-tif.sh.output
        :language: json
        :caption: Output

    **Example**

    ..  literalinclude:: ../examples/401-post-imagens-jpg.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/401-post-imagens-jpg.sh.output
        :language: json
        :caption: Output

..  http:post:: /api/v1/imagens/{image_id}/classificacao-celula/{user_id}

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

    **Example**

    ..  literalinclude:: ../examples/408-post-imagens-classificacao-celula.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/408-post-imagens-classificacao-celula.sh.output
        :language: json
        :caption: Output


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

    **Example**

    ..  literalinclude:: ../examples/409-post-imagens-segmentacao-celula.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/409-post-imagens-segmentacao-celula.sh.output
        :language: json
        :caption: Output


Get Operations
--------------

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

    ..  literalinclude:: ../examples/402-get-imagens.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/402-get-imagens.sh.output
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

    ..  literalinclude:: ../examples/403-get-imagens-info.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/403-get-imagens-info.sh.output
        :language: json
        :caption: Output

Delete Operations
-----------------
