#!/bin/bash
#
# Script to dump the database into JSON files.
MYSQL_CALL="docker-compose exec -T db mysql -p123.456 cric -e"
$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'primeiro_nome', primeiro_nome,
'ultimo_nome', ultimo_nome,
'email', email,
'senha', senha,
'ativo', ativo,
'created_at', created_at,
'updated_at', updated_at,
'admin', admin
)) FROM usuario_base" | tail -n 1 | python -m json.tool > user.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'nome', nome,
'codigo_lamina', codigo_lamina,
'excluida', excluida,
'classificacao_aprovada', classificacao_aprovada,
'dt_aquisicao', dt_aquisicao,
'altura', altura,
'largura', largura,
'id_usuario', id_usuario,
'id_lesao', id_lesao,
'created_at', created_at,
'updated_at', updated_at,
'doi', doi,
'id_collection', id_collection
)) FROM imagem" | tail -n 1 | python -m json.tool > image.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'nome', nome,
'detalhes', detalhes,
'created_at', created_at,
'updated_at', updated_at,
'grade', grade,
'id_collection', id_collection
)) FROM lesao" | tail -n 1 | python -m json.tool > injury.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'codigo', codigo,
'nome', nome,
'created_at', created_at,
'updated_at', updated_at,
'id_collection', id_collection
)) FROM descricao" | tail -n 1 | python -m json.tool > description.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'coord_centro_nucleo_x', coord_centro_nucleo_x,
'coord_centro_nucleo_y', coord_centro_nucleo_y,
'id_usuario', id_usuario,
'created_at', created_at,
'updated_at', updated_at,
'id_lesao', id_lesao,
'id_imagem', id_imagem
)) FROM classificacao_celula" | tail -n 1 | python -m json.tool > classification.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'id_imagem', id_imagem,
'id_descricao', id_descricao,
'created_at', created_at,
'updated_at', updated_at
)) FROM celula" | tail -n 1 | python -m json.tool > cell.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'coord_x', coord_x,
'coord_y', coord_y,
'id_usuario', id_usuario,
'id_celula', id_celula,
'created_at', created_at,
'updated_at', updated_at
)) FROM segmentacao_citoplasma" | tail -n 1 | python -m json.tool > cytoplasm.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'coord_x', coord_x,
'coord_y', coord_y,
'id_usuario', id_usuario,
'id_celula', id_celula,
'created_at', created_at,
'updated_at', updated_at
)) FROM segmentacao_nucleo" | tail -n 1 | python -m json.tool > nucleus.json

$MYSQL_CALL "SELECT JSON_ARRAYAGG(JSON_OBJECT(
'id', id,
'slang', slang,
'name', name,
'description', description,
'public', public,
'owner', owner,
'delete', delete
)) FROM collection" | tail -n 1 | python -m json.tool > collection.json