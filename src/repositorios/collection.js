"use strict";

const Sequelize = require("sequelize");

const CollectionModel = require("../models/CollectionModel");


const db = require("../database");

module.exports = {

    async create_collection(collection){
        return CollectionModel.create({
            slang: collection.slang,
            name: collection.name,
            description: collection.description,
            public: false,
            delete: false,
            owner: collection.owner
        });
    },

    async make_collection_public(id_collection){
        return CollectionModel.update(
            {
                public: true,
            },
            {
                where:{
                    id:{
                        [Sequelize.Op.eq]: id_collection
                    }
                }
            }
            );
    },

    async make_collection_private(id_collection){
        return CollectionModel.update(
            {
                public: false,
            },
            {
                where:{
                    id:{
                        [Sequelize.Op.eq]: id_collection
                    }
                }
            }
            );
    },

    async delete_collection(id_collection){
        return CollectionModel.update(
            {
                delete: true
            },
            {
                where: {
                    id:{
                        [Sequelize.Op.eq]: id_collection
                    }
                }
            }
        );
    },

    async list_collection(){
        return CollectionModel.findAll();
    },

    async get_collection(id_collection){
        return CollectionModel.findByPk(id_collection);
    },

    async update_collection(request){
        return CollectionModel.update(
            {
                slang: request.slang,
                public: request.public,
                name: request.name,
                description: request.description
            },
            {
                where: {
                    id :{
                        [Sequelize.Op.eq]: request.id_collection
                    }
                }
            }
        );
    }

};