Download
========

Post Operations
---------------

Not avaiable.

Get Operations
--------------

..  http:get:: /api/v1/imagens/download/base_interna_cvx/{user_id}

    Download images and classifications.

    :param user_id: Optional user's id. Default user's id is 1.

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    Using default value.

    ..  literalinclude:: ../examples/501-get-download.sh
        :language: bash
        :caption: Input

    **Example**

    Providing valid user's id.

    ..  literalinclude:: ../examples/502-get-download.sh
        :language: bash
        :caption: Input

    **Example**

    Providing invalid user's id.

    ..  literalinclude:: ../examples/503-get-download.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/503-get-download.sh.output
        :language: json
        :caption: Output

Delete Operations
-----------------

Not avaiable.
