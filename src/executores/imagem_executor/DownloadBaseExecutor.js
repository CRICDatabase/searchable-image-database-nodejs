"use strict";

// eslint-disable-next-line no-unused-vars
const debug = require("debug")("database.cric:DownloadBaseExecutor");

const JSZip = require("jszip");
const fs = require("fs");
const path = require("path");

const ImagemRepositorio = require("../../repositorios/imagem_repositorio");
// const UsuarioRepositorio = require("../../repositorios/usuario_repositorio");

module.exports = {

    async Executar(req, res) {
        const CSV_CLASSIFICATIONS_FILENAME = "classifications.csv";
        const JSON_CLASSIFICATIONS_FILENAME = "classifications.json";
        const README_CLASSIFICATIONS_FILENAME = "README.classifications.md";
        const CSV_SEGMENTATIONS_FILENAME = "segmentations.csv";
        const JSON_SEGMENTATIONS_FILENAME = "segmentations.json";
        const CSV_NUCLEUS_SEGMENTATIONS_FILENAME = "nucleus-segmentations.csv";
        const JSON_NUCLEUS_SEGMENTATIONS_FILENAME = "nucleus-segmentations.json";
        const CSV_CYTOPLASM_SEGMENTATIONS_FILENAME = "cytoplasm-segmentations.csv";
        const JSON_CYTOPLASM_SEGMENTATIONS_FILENAME = "cytoplasm-segmentations.json";
        const README_SEGMENTATIONS_FILENAME = "README.segmentations.md";
        const path2assets = path.normalize(
            path.join(
                __dirname,
                "..",
                "..",
                "assets"
            )
        );

        var include_images = false;

        var include_classifications = false;
        var classifications_array = [];
        var classifications_csv_string = "image_id,image_filename,image_doi,cell_id,bethesda_system,nucleus_x,nucleus_y\n";
        
        var include_segmentations = false;
        var segmentations_array = [];
        var nucleus_segmentations_array = [];
        var nucleus_segmentations_csv_string = "image_id,image_filename,image_doi,cell_id,bethesda_system,x,y\n";
        var cytoplasm_segmentations_array = [];
        var cytoplasm_segmentations_csv_string = "image_id,image_filename,image_doi,cell_id,bethesda_system,x,y\n";
        var segmentations_csv = "image_id,image_doi,image_filename,cell_id,description_id,cyto_x,cyto_y\n" + "image_id,image_doi,image_filename,cell_id,description_id,nucle_x,nucle_y\n";

        var cytoplasm_segmentations_copy = [];
        var nucleus_segmentations_copy = [];

        var size = 0;
        var coords = []
        var cells = [];         

        var image_info;
        var cell_info;
        var cytoplasm_line;
        var nucleus_line;

        var all_descriptions = {};

        var zip = new JSZip();

        //Função que recebe um array de objetos e retorna um outro array com todas as cordenadas de um segmento de uma determinada célula.
        function filterCellId(array, size, aux){
            let arrayAux = [];
            for(let i = size; i< array.length; i++){
                if(array[i].id_celula === aux) arrayAux.push(array[i]);
            }
            return arrayAux;
        }

        if (req.query.hasOwnProperty("images") && req.query.images === "1") {
            include_images = true;
        }

        if (req.query.hasOwnProperty("classifications") && req.query.classifications === "1") {
            include_classifications = true;

            try {
                zip.file(
                    README_CLASSIFICATIONS_FILENAME,
                    fs.readFileSync(
                        path.resolve(
                            path2assets,
                            "download",
                            README_CLASSIFICATIONS_FILENAME
                        )
                    )
                );
            }
            catch(err) {
                debug(`Fail to add ${README_CLASSIFICATIONS_FILENAME} due ${err}`);
            }
        }

        if (req.query.hasOwnProperty("segmentations") && req.query.segmentations === "1") {
            include_segmentations = true;
            
            await ImagemRepositorio.listarDescricoes().then(
                (query) => {
                    for (let row of query) {
                        all_descriptions[row.id] = row.nome;
                    }
                }
            );

            try {
                zip.file(
                    README_SEGMENTATIONS_FILENAME,
                    fs.readFileSync(
                        path.resolve(
                            path2assets,
                            "download",
                            README_SEGMENTATIONS_FILENAME
                        )
                    )
                );
            }
            catch(err) {
                debug(`Fail to add ${README_SEGMENTATIONS_FILENAME} due ${err}`);
            }
        }

        const all_images = await ImagemRepositorio.listarImagensValidasNoSistema();
        
        for await (let image of all_images){
            if (include_images) {
                try {
                    zip.file(
                        image.nome,
                        fs.readFileSync(
                            path.resolve(
                                path2assets,
                                "imagens",
                                "png",
                                image.nome
                            )
                        )
                    );
                }
                catch(err) {
                    debug(`Fail to add ${image.nome} due ${err}`);
                }
            }

            if (include_classifications) {
                let classifications = await ImagemRepositorio.listarClassificacoesCelula(
                    image.id
                );

                classifications_array.push({
                    image_id: image.id,
                    image_doi: image.doi,
                    image_name: image.nome,
                    classifications: classifications.map(
                        (item) => {
                            return {
                                cell_id: item.id_celula,
                                bethesda_system: lesionID2lesionName(item.id_lesao),
                                nucleus_x: item.coord_centro_nucleo_x,
                                nucleus_y: item.coord_centro_nucleo_y
                            };
                        }
                    )
                });

                classifications.forEach(
                    (item) => {
                        classifications_csv_string = classifications_csv_string + `${image.id},${image.nome},${item.doi},${item.id_celula},${lesionID2lesionName(item.id_lesao)},${item.coord_centro_nucleo_x},${item.coord_centro_nucleo_y}\n`;
                    }
                );
            }

            if (include_segmentations) {
                let cytoplasm_segmentations = await ImagemRepositorio.listarSegmentosCitoplasmaCelula(
                    image.id,
                    req.params.id_usuario ? req.params.id_usuario : 1
                );

                //Trecho de código com o intuito de percorrer o array de citoplasmas e organizar as informação em forma de segmentos.
                size = 0;
                coords = []
                cells = []; 
                
                //Atribuindo o primeiro valor do identificador da célula para ser comparado na função "filterCellId".
                let aux_cytoplasm = cytoplasm_segmentations[size].id_celula;

                //Looping que percorre todos os elementos do citoplasma.
                while(size < cytoplasm_segmentations.length){

                    //Atribuindo ao array um array cujo conteúdo são todas as cordenadas de um determinado segmento.
                    cytoplasm_segmentations_copy = filterCellId(cytoplasm_segmentations, size, aux_cytoplasm);

                    //Gravando todas as coordenadas de um citoplasma em um objeto.
                    for(let i=0; i < cytoplasm_segmentations_copy.length; i++){
                        coords.push({
                            coord_x: cytoplasm_segmentations_copy[i].coord_x,
                            coord_y: cytoplasm_segmentations_copy[i].coord_y,
                        });
                    };

                    //Gravando as informações do segmento e suas coordenadas em um objeto que representa a célula.
                    cells.push({
                        cell_id: cytoplasm_segmentations_copy[0].id_celula,
                        description_id: cytoplasm_segmentations_copy[0].id_descricao,
                        coords: coords
                    });

                    //Atualizando o size para que ele reserve a próxima posição de partida no array de citoplasmas, ou seja, desconsidera um determinado trecho de células já lidas.
                    size += cytoplasm_segmentations_copy.length;

                    //Verificando se o array que percorremos não chegou ao fim.
                    if(size < cytoplasm_segmentations.length){
                        //Atualizando o aux para que guarde o valor do próximo id de célula a ser comparado.
                        aux_cytoplasm = cytoplasm_segmentations[size].id_celula;
                    }
                }
                
                //Adicionando ao objeto informações básicas e todas as células de uma determinada imagem.
                cytoplasm_segmentations_array.push({
                    image_id: image.id,
                    image_doi: image.doi,
                    image_name: image.nome,
                    cytoplasm_segmentation_cells: cells
                });

                cytoplasm_segmentations.forEach(
                    (item) => {
                        cytoplasm_segmentations_csv_string = cytoplasm_segmentations_csv_string + `${image.id},${image.nome},${image.doi},${item.id_celula},${all_descriptions[item.id_descricao]},${item.coord_x},${item.coord_y}\n`;
                    }
                );

                let nucleus_segmentations = await ImagemRepositorio.listarTodosSegmentosNucleoCelula(
                    image.id,
                    req.params.id_usuario ? req.params.id_usuario : 1
                );

                //Trecho de código com o intuito de percorrer o array de nucleos e organizar as informação em forma de segmentos.
                if(typeof nucleus_segmentations !== 'undefined' && nucleus_segmentations.length > 0){                
                    size = 0;
                    coords = []
                    cells = []; 

                    //Atribuindo o primeiro valor do identificador da célula para ser comparado na função "filterCellId".
                    let aux_nucleus = nucleus_segmentations[size].id_celula;               

                    //Looping que percorre todos os elementos do nucleo.
                    while(size < nucleus_segmentations.length){

                        //Atribuindo ao array um array cujo conteúdo são todas as cordenadas de um determinado segmento.
                        nucleus_segmentations_copy = filterCellId(nucleus_segmentations, size, aux_nucleus);

                        //Gravando todas as coordenadas de um nucleo em um objeto.
                        for(let i=0; i < nucleus_segmentations_copy.length; i++){
                            coords.push({
                                coord_x: nucleus_segmentations_copy[i].coord_x,
                                coord_y: nucleus_segmentations_copy[i].coord_y,
                            });
                        };

                        //Gravando as informações do segmento e suas coordenadas em um objeto que representa a célula.
                        cells.push({
                            cell_id: nucleus_segmentations_copy[0].id_celula,
                            description_id: nucleus_segmentations_copy[0].id_descricao,
                            coords: coords
                        });

                        //Atualizando o size para que ele reserve a próxima posição de partida no array de nucleos, ou seja, desconsidera um determinado trecho de células já lidas.
                        size += nucleus_segmentations_copy.length;

                        //Verificando se o array que percorremos não chegou ao fim.
                        if(size < nucleus_segmentations.length){
                            //Atualizando o aux para que guarde o valor do próximo id de célula a ser comparado.
                            aux_nucleus = nucleus_segmentations[size].id_celula;
                        }
                    }                
                    
                    //Adicionando ao objeto informações básicas e todas as células de uma determinada imagem.
                    nucleus_segmentations_array.push({
                        image_id: image.id,
                        image_doi: image.doi,
                        image_name: image.nome,
                        nucleus_segmentation_cells: cells
                    });
                }

                nucleus_segmentations.forEach(
                    (item) => {
                        nucleus_segmentations_csv_string = nucleus_segmentations_csv_string + `${image.id},${image.nome},${image.doi},${item.id_celula},,${all_descriptions[item.id_descricao]},${item.coord_x},${item.coord_y}\n`;
                    }
                );                
            }
        }

        //Trecho de código responsável por organizar os arrays de citoplasma e núcleo em um único array com as coordenas do citoplasma e do núcleo.
        if (include_segmentations) {

            var segmentation_cells = [];
            var aux = 0;

            //Looping que percorre todas as imagens existentes.
            for(let i=0; i < cytoplasm_segmentations_array.length; i++){

                segmentation_cells = [];
                aux = 0;

                //Loopinque que percorre toda a extensão das células presentes na imagem.
                for(let j=0; j < cytoplasm_segmentations_array[i].cytoplasm_segmentation_cells.length; j++){
                    //Objeto que detem todas as informações de uma determinada célula da imagem em questão.
                    segmentation_cells.push({
                        cell_id: cytoplasm_segmentations_array[i].cytoplasm_segmentation_cells[j].cell_id,
                        description_id: cytoplasm_segmentations_array[i].cytoplasm_segmentation_cells[j].description_id,
                        cytoplasm: cytoplasm_segmentations_array[i].cytoplasm_segmentation_cells[j].coords.map(
                            (item) => {
                                return {
                                    coord_x: item.coord_x,
                                    coord_y: item.coord_y,
                                };
                            }
                        ),
                        //Verificando se a célula em questão possuí uma região delimitada para o núcleo.
                        nucleus: cytoplasm_segmentations_array[i].cytoplasm_segmentation_cells[j].cell_id !== nucleus_segmentations_array[i]?.nucleus_segmentation_cells[aux]?.cell_id? null 
                        :
                        nucleus_segmentations_array[i].nucleus_segmentation_cells[j].coords.map(
                            (item) => {
                                return {
                                    coord_x: item.coord_x,
                                    coord_y: item.coord_y,
                                };
                            }
                        ),
                    });
    
                    //Incrementando o contador aux para que possa haver a verificação linear entre o identificador único do citoplasma e do núcleo, excluindo as chances de haver perda de informação e descontinuidade.
                    if(cytoplasm_segmentations_array[i].cytoplasm_segmentation_cells[j].cell_id === nucleus_segmentations_array[i]?.nucleus_segmentation_cells[aux]?.cell_id) aux++;
                };

                //Adicionando ao objeto informações básicas e todas as células de uma determinada imagem.
                segmentations_array.push({
                    image_id: cytoplasm_segmentations_array[i].image_id,
                    image_doi: cytoplasm_segmentations_array[i].image_doi,
                    image_name: cytoplasm_segmentations_array[i].image_name,
                    cells: segmentation_cells
                });
            }

            //Percorrendo todas as imagens segmentadas.
            segmentations_array.forEach(
                (item) => {
                    //Atribuindo as informações da imagem atual.
                    image_info = `${item.image_id},${item.image_doi},${item.image_name},`;
                    //Percorrendo todas as células contidas na imagem.
                    item.cells.forEach(
                        (cell) => {
                            //Atribuindo as informações da célula atual.
                            cell_info = `${cell.cell_id},${cell.description_id},`;
                            //Montando a linha envolvendo as informações da imagem, célula e coordenadas.
                            //Percorrendo o array de citoplasma e guardando suas coordenadas.
                            cytoplasm_line = image_info + cell_info + cell.cytoplasm.map(
                                (cyto_cord) => {
                                    return `${cyto_cord.coord_x},${cyto_cord.coord_y}`
                                }
                            ) + ",\n";
                            //Montando a linha envolvendo as informações da imagem, célula e coordenadas.
                            //Percorrendo o array de nucleo e guardando suas coordenadas.
                            nucleus_line = image_info + cell_info + (typeof cell?.nucleus !== 'null' && cell?.nucleus?.length > 0? cell.nucleus.map(
                                (nucle_cord) => {
                                    return `${nucle_cord.coord_x},${nucle_cord.coord_y}`
                                }
                            ) : "") + (typeof cell?.nucleus !== 'null' && cell?.nucleus?.length > 0? ",\n" : "\n");
                            //Unindo as linhas criadas com as anteriores, garantindo que a informação não se perca.
                            segmentations_csv = segmentations_csv + cytoplasm_line + nucleus_line;
                        }
                    )
                }
            );
        }

        if (include_classifications) {
            try {
                zip.file(
                    JSON_CLASSIFICATIONS_FILENAME,
                    JSON.stringify(classifications_array)
                );
            }
            catch(err) {
                debug(`Fail to add ${JSON_CLASSIFICATIONS_FILENAME} due ${err}`);
            }

            try {
                zip.file(
                    CSV_CLASSIFICATIONS_FILENAME,
                    classifications_csv_string
                );
            }
            catch(err) {
                debug(`Fail to add ${CSV_CLASSIFICATIONS_FILENAME} due ${err}`);
            }
        }

        if (include_segmentations) {
            try {
                zip.file(
                    JSON_SEGMENTATIONS_FILENAME,
                    JSON.stringify(segmentations_array)
                );
            }
            catch(err) {
                debug(`Fail to add ${JSON_SEGMENTATIONS_FILENAME} due ${err}`);
            }

            try {
                zip.file(
                    CSV_SEGMENTATIONS_FILENAME,
                    segmentations_csv
                );
            }
            catch(err) {
                debug(`Fail to add ${CSV_SEGMENTATIONS_FILENAME} due ${err}`);
            }

            try {
                zip.file(
                    JSON_NUCLEUS_SEGMENTATIONS_FILENAME,
                    JSON.stringify(nucleus_segmentations_array)
                );
            }
            catch(err) {
                debug(`Fail to add ${JSON_NUCLEUS_SEGMENTATIONS_FILENAME} due ${err}`);
            }            

            try {
                zip.file(
                    CSV_NUCLEUS_SEGMENTATIONS_FILENAME,
                    nucleus_segmentations_csv_string
                );
            }
            catch(err) {
                debug(`Fail to add ${CSV_NUCLEUS_SEGMENTATIONS_FILENAME} due ${err}`);
            }

            try {
                zip.file(
                    JSON_CYTOPLASM_SEGMENTATIONS_FILENAME,
                    JSON.stringify(cytoplasm_segmentations_array)
                );
            }
            catch(err) {
                debug(`Fail to add ${JSON_CYTOPLASM_SEGMENTATIONS_FILENAME} due ${err}`);
            }

            try {
                zip.file(
                    CSV_CYTOPLASM_SEGMENTATIONS_FILENAME,
                    cytoplasm_segmentations_csv_string
                );
            }
            catch(err) {
                debug(`Fail to add ${CSV_CYTOPLASM_SEGMENTATIONS_FILENAME} due ${err}`);
            }
        }

        return zip
            .generateNodeStream({type:"nodebuffer", streamFiles:true});
    }
};

function lesionID2lesionName(lession_id) {
    var lesion_name;
    switch(lession_id) {
    case 1:
        lesion_name = "Negative for intraepithelial lesion";
        break;
    case 2:
        lesion_name = "ASC-US";
        break;
    case 3:
        lesion_name = "LSIL";
        break;
    case 4:
        lesion_name = "ASC-H";
        break;
    case 5:
        lesion_name = "HSIL";
        break;
    case 6:
        lesion_name = "SCC";
        break;
    }
    return lesion_name;
}
