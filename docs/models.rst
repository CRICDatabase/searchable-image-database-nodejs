Models
======

The models are described using `Sequelize <https://sequelize.org/>`_ as object-relational mapping.
The source code for Sequelize's objects are at ``src/models``.

Users
-----

.. autoclass:: UsuarioBaseModel

Users might also be specialists:

.. autoclass:: AdministradorModel

.. autoclass:: CitopatologistaModel

.. autoclass:: AnalistaModel

Images
------

.. autoclass:: ImagemModel

Injury
------

.. autoclass:: LesaoModel

Description
-----------

.. autoclass:: DescricaoModel

Cells
-----

.. autoclass:: CelulaModel

.. autoclass:: ClassificacaoCelulaModel

.. autoclass:: SegmentacaoCitoplasmaModel

.. autoclass:: SegmentacaoNucleoModel

Authorization
-------------

.. autoclass:: SessaoUsuarioModel