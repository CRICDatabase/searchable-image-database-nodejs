"use strict";

jest.useFakeTimers();

let CollectionDOA = require("./collection");

describe(
    "Create CollectionModel",
    () => {
        test(
            "create_collection",
            () => {
                return CollectionDOA.create_collection({
                    name: "Jest",
                    slang: "jest",
                    public: false,
                    description: "test with jest",
                    owner: 1,
                    delete: false
                })
                .then(
                    data => {
                        expect(data.dataValues)
                            .toMatchObject(
                                {
                                    id: expect.any(Number),
                                    name: "Jest",
                                    slang: "jest",
                                    public: false,
                                    description: "test with jest",
                                    owner: 1,
                                    delete: false
                                }  
                            );
                    }
                )
            }
        );

        test(
            "create_collection without name",
            () => {
                return CollectionDOA.create_collection({
                    slang: "jest",
                    public: false,
                    description: "test with jest",
                    owner: 1,
                    delete: false
                })
                .then(
                    data => {
                        expect(() => CollectionDOA.create_collection(data).toThrowError());
                    }
                )
            }
        );

        test(
            "create_collection without slang",
            () => {
                return CollectionDOA.create_collection({
                    name: "Jest",
                    public: false,
                    description: "test with jest",
                    owner: 1,
                    delete: false
                })
                .then(
                    data => {
                        expect(() => CollectionDOA.create_collection(data).toThrowError());
                    }
                )
            }
        );

        test(
            "create_collection without description",
            () => {
                return CollectionDOA.create_collection({
                    name: "Jest",
                    public: false,
                    slang: "jest",
                    owner: 1,
                    delete: false
                })
                .then(
                    data => {
                        expect(() => CollectionDOA.create_collection(data).toThrowError());
                    }
                )
            }
        );

        test(
            "create_collection without owner",
            () => {
                return CollectionDOA.create_collection({
                    name: "Jest",
                    public: false,
                    description: "test with jest",
                    slang: "jest",
                    delete: false
                })
                .then(
                    data => {
                        expect(() => CollectionDOA.create_collection(data).toThrowError());
                    }
                )
            }
        );

        test(
            "create_collection without public",
            () => {
                return CollectionDOA.create_collection({
                    name: "Jest",
                    owner: 1,
                    description: "test with jest",
                    slang: "jest",
                    delete: false
                })
                .then(
                    data => {
                        expect(() => CollectionDOA.create_collection(data).toThrowError());
                    }
                )
            }
        );

        test(
            "create_collection without delete",
            () => {
                return CollectionDOA.create_collection({
                    name: "Jest",
                    public: false,
                    description: "test with jest",
                    slang: "jest",
                    owner: 1
                })
                .then(
                    data => {
                        expect(() => CollectionDOA.create_collection(data).toThrowError());
                    }
                )
            }
        );
    }
)

describe(
    "Delete Collection",
    () => {
        test(
            "delete_collection",
            () => {
                return CollectionDOA.delete_collection(1)
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        name: expect.any(String),
                                        slang: expect.any(String),
                                        public: expect.any(Boolean),
                                        delete: true,
                                        description: expect.any(String),
                                        owner: expect.any(Number)
                                    }
                                );
                        }
                    );
            }
        );
    }
)

describe(
    "Get Collection",
    () => {
        test(
            "get_collection",
            () => {
                return CollectionDOA.get_collection(1)
                    .then(
                        data => {
                            expect(data.dataValues)
                                .toMatchObject(
                                    {
                                        id: 1,
                                        name: expect.any(String),
                                        slang: expect.any(String),
                                        public: expect.any(Boolean),
                                        delete: expect.any(Boolean),
                                        description: expect.any(String),
                                        owner: expect.any(Number)
                                    }
                                );
                        }
                    );
            }
        );
    }
)

describe(
    "Toggle public atribute from Collection",
    () => {
        test(
            "make_collection_public",
            () => {
                return CollectionDOA.make_collection_public(1)
                    .then(
                        data => {
                            expect(data).toEqual([1]);
                        }
                    );
            }
        );

        test(
            "make_collection_private",
            () => {
                return CollectionDOA.make_collection_private(1)
                    .then(
                        data => {
                            expect(data).toEqual([1]);
                        }
                    );
            }
        );
    }
)

describe(
    "List CollectionModel",
    () => {
        test(
            "list_collection",
            () => {
                return CollectionDOA.list_collection()
                    .then(
                        data => {
                            expect(data.map(
                                item => {
                                    return item.dataValues;
                                }
                            ))
                            .toMatchObject(
                                expect.arrayContaining(
                                    [{
                                        id: expect.any(Number),
                                        name: expect.any(String),
                                        slang: expect.any(String),
                                        public: expect.any(Boolean),
                                        delete: expect.any(Boolean),
                                        description: expect.any(String),
                                        owner: expect.any(Number)
                                    }]
                                )
                            );
                        }
                    );
            }
        );
    }
)

