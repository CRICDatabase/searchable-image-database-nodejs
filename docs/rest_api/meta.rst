Current version
===============

..  http:get:: /api/v1/

    Get version of the REST API.

    :>jsonarr string descricao: Name of the service
    :>jsonarr string versao: Version

    :statuscode 200:
    :statuscode 400:
    :statuscode 401:
    :statuscode 409:
    :statuscode 500:

    **Example**

    ..  literalinclude:: ../examples/001-get-meta-info.sh
        :language: bash
        :caption: Input

    ..  literalinclude:: ../examples/001-get-meta-info.sh.output
        :language: json
        :caption: Output
                             
