Download
========

Post Operations
---------------

Not avaiable.

Get Operations
--------------

..  http:get:: /api/v1/imagens/download

    Download images and classifications.

    :query string classifications: 1 to include classifications in the download.
    :query string segmentations: 1 to include classifications in the download.

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

    Download segmentations.

    ..  literalinclude:: ../examples/504-get-download.sh
        :language: bash
        :caption: Input

Delete Operations
-----------------

Not avaiable.
