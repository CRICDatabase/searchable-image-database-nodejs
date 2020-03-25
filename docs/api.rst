API
===

The server answers to 

User
----

.. http:post:: /api/v1/usuarios

   Create a new user.

   :<json string primeiro_nome: First name
   :<json string ultimo_nome: Family name
   :<json string email: Email address
   :<json string senha: Password
   :<json int: 1 if user is active and 0 otherwie.

   :>json string primeiro_nome: First name
   :>json string ultimo_nome: Family name
   :>json string email: Email address
   :>json string senha: Password
   :>json int: 1 if user is active and 0 otherwie.

   :statuscode 200:
   :statuscode 400:
   :statuscode 401:
   :statuscode 409:
   :statuscode 500:

.. http:post:: /api/v1/usuarios-administrador

   Create a new user with administrator rights.

   :<json string primeiro_nome: First name
   :<json string ultimo_nome: Family name
   :<json string email: Email address
   :<json string senha: Password
   :<json int: 1 if user is active and 0 otherwie.
   :<json string api_key: Key to REST API
   :<json string nivel_acesso: Access level of the administrator

   :>json string primeiro_nome: First name
   :>json string ultimo_nome: Family name
   :>json string email: Email address
   :>json string senha: Password
   :>json int: 1 if user is active and 0 otherwie.
   :>json string api_key: Key to REST API
   :>json string nivel_acesso: Access level of the administrator

   :statuscode 200:
   :statuscode 400:
   :statuscode 401:
   :statuscode 409:
   :statuscode 500: