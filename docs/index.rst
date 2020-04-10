.. CRIC Database documentation master file, created by
   sphinx-quickstart on Wed Mar 25 11:01:35 2020.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to Node.js Backend for CRIC Database's documentation!
=============================================================

CRIC Searchable Image Database is a public cervical cell image database
aiming supporting cervical cancer analysis of Pap smear.

This documentation is for the reference implementation written in Node.js.
More documentation about CRIC Searchable Image Database
is available at https://cric-database.readthedocs.io/.

REST API
--------

We provide examples
of calls to the REST API
using `cURL <https://curl.haxx.se/>`_.
The output of the calls
are based in the seeders
included in the source code.

..  toctree::
    :maxdepth: 2
    :caption: Contents:

    rest_api/meta
    rest_api/user
    rest_api/injury
    rest_api/description
    rest_api/image

Developers
----------

..  toctree::
    :maxdepth: 2
    :caption: Contents:

    dependencies
    settings
    models
    database
    debugging
    contributing

Indices and tables
------------------

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`
