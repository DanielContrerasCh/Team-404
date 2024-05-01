const { response } = require('express');
const Review = require('../models/reviews.model');

exports.getReviews = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    // Fetch all unique brands
    Review.fetchAllBrands()
    .then(([brands]) => {
        // Fetch all reviews
        Review.fetchAllReviews(request)
        .then(([rows, fieldData]) => {
            Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('reviews', {
                    reviews: rows,
                    brands: brands,
                    preguntasRespuestas: preguntasRespuestas,
                    username: request.session.username || '',
                    csrfToken: request.csrfToken(),
                    permisos: request.session.permisos || [],
                });
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            console.log(error);
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

exports.getSomeReviews = (request, response, next) => {
    const error = request.session.error || '';
    request.session.error = '';
    const brand = request.body.brand; // Get brand from the request
    const quarter = request.body.quarter; // Get quarter from the request
    const year = request.body.year; // Get year from the request
    const itemCode = request.body.itemCode;
    const stars = request.body.stars

    console.log("Brand: ", brand)
    console.log("quarter: ", quarter)
    console.log("year: ", year)
    console.log("itemcode: ", itemCode)
    console.log("stars: ", stars)
    // Fetch all unique brands
    Review.fetchAllBrands()
    .then(([brands]) => {

        if (stars == 'Cualquier') {
        
            if (!itemCode){ //Si no se recibe un itemcode, es decir se busca por marca

                if (brand == 'Todas las marcas'){ //Se busca por todas las marcas

                    if (!year){ //Todas las marcas: Se busca por cualquier anio

                        if(quarter == 'Todo el anio'){ //Todas las marcas: Se busca por todo el anio

                            console.log("Prueba 1")

                            Review.fetchAllReviews()
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        } //Fin de Todas las marcas: Se busca por todo el anio



                        if(quarter != 'Todo el anio'){ //Todas las marcas: Se busca por cuartil

                            console.log("Prueba 2")

                            Review.fetchOnlyForQuarter(quarter)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });


                        } //Fin de Todas las marcas: Se busca por cuartil

                    } //Final de Todas las marcas: busqueda por cualquier anio



                    if (year){ //Todas las marcas: Se busca por anio

                        if(quarter == 'Todo el anio'){ //Todas las marcas: Se busca por todo el anio

                            console.log("Prueba 3")

                            Review.fetchOnlyForYear(year)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });


                        } //Fin de Todas las marcas: Se busca por todo el anio



                        if(quarter != 'Todo el anio'){ //Todas las marcas: Se busca por cuartil

                            console.log("Prueba 4")

                            Review.fetchAllForYearAndQuarter(year, quarter)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });


                        } //Fin de Todas las marcas: Se busca por cuartil

                    } //Final de Todas las marcas: busqueda por anio


                } //final de Todas las marcas: si busca por todas las marcas


    //------------------------------------------------------------------------------------------------------------------------------

                if (brand != 'Todas las marcas'){ // si se busca por marca especifica

                    if (!year){ //Se busca por todos los anios

                        if(quarter == 'Todo el anio'){
                            
                            console.log("Prueba 5")

                            Review.fetchOnlyForBrand(brand)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        }

                        if(quarter != 'Todo el anio'){ //busqueda por cuartil
                            
                            console.log("Prueba 6")

                            Review.fetchByBrandAndQuarter(brand, quarter)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        }

                    } //Final de busqueda por todos los anios

                    if (year){ //Se busca un anio especifico

                        if(quarter == 'Todo el anio'){
                            console.log("Prueba 7")

                            Review.fetchAllForBrandAndYear(brand, year)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        }

                        if(quarter != 'Todo el anio'){
                            
                            console.log("Prueba 8")

                            Review.fetchByBrandYearAndQuarter(brand, year, quarter)
                            .then(([rows, fieldData]) => {

                                Review.fetchPreguntasAndRespuestas()       
                                .then(([preguntasRespuestas]) => {
                                    response.render('filteredReviews', {
                                        brand: brand,
                                        year: year,
                                        quarter: quarter,
                                        itemCode: itemCode,
                                        reviews: rows,
                                        brands: brands,
                                        preguntasRespuestas: preguntasRespuestas,
                                        username: request.session.username || '',
                                        csrfToken: request.csrfToken(),
                                        permisos: request.session.permisos || [],
                                    });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });

                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        }

                    } //Final de busqueda por anio especifico

                } //final de si busca por todas las marcas
            
            } //final de si no se recibe itemcode

        //------------------------------------------------------------------------------------------------------------------------
            
        if (itemCode){ // si se busca por itemCode

            if (!year){ //Se busca por todos los anios

                if(quarter == 'Todo el anio'){
                    
                    console.log("Prueba 9")

                    Review.fetchOnlyForItemCode(itemCode)
                    .then(([rows, fieldData]) => {

                        Review.fetchPreguntasAndRespuestas()       
                        .then(([preguntasRespuestas]) => {
                            response.render('filteredReviews', {
                                brand: brand,
                                year: year,
                                quarter: quarter,
                                itemCode: itemCode,
                                reviews: rows,
                                brands: brands,
                                preguntasRespuestas: preguntasRespuestas,
                                username: request.session.username || '',
                                csrfToken: request.csrfToken(),
                                permisos: request.session.permisos || [],
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    });


                }

                if(quarter != 'Todo el anio'){ //busqueda por cuartil
                    
                    console.log("Prueba 10")

                    Review.fetchByItemCodeAndQuarter(itemCode, quarter)
                    .then(([rows, fieldData]) => {

                        Review.fetchPreguntasAndRespuestas()       
                        .then(([preguntasRespuestas]) => {
                            response.render('filteredReviews', {
                                brand: brand,
                                year: year,
                                quarter: quarter,
                                itemCode: itemCode,
                                reviews: rows,
                                brands: brands,
                                preguntasRespuestas: preguntasRespuestas,
                                username: request.session.username || '',
                                csrfToken: request.csrfToken(),
                                permisos: request.session.permisos || [],
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    });

                }

            } //Final de busqueda por todos los anios

            if (year){ //Se busca un anio especifico

                if(quarter == 'Todo el anio'){
                    console.log("Prueba 11")

                    Review.fetchAllForItemCodeAndYear(itemCode, year)
                    .then(([rows, fieldData]) => {

                        Review.fetchPreguntasAndRespuestas()       
                        .then(([preguntasRespuestas]) => {
                            response.render('filteredReviews', {
                                brand: brand,
                                year: year,
                                quarter: quarter,
                                itemCode: itemCode,
                                reviews: rows,
                                brands: brands,
                                preguntasRespuestas: preguntasRespuestas,
                                username: request.session.username || '',
                                csrfToken: request.csrfToken(),
                                permisos: request.session.permisos || [],
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }

                if(quarter != 'Todo el anio'){

                    console.log("Prueba 12")

                    Review.fetchByItemCodeYearAndQuarter(itemCode, year, quarter)
                    .then(([rows, fieldData]) => {

                        Review.fetchPreguntasAndRespuestas()       
                        .then(([preguntasRespuestas]) => {
                            response.render('filteredReviews', {
                                brand: brand,
                                year: year,
                                quarter: quarter,
                                itemCode: itemCode,
                                reviews: rows,
                                brands: brands,
                                preguntasRespuestas: preguntasRespuestas,
                                username: request.session.username || '',
                                csrfToken: request.csrfToken(),
                                permisos: request.session.permisos || [],
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }

            } //Final de busqueda por anio especifico

        } //final de si busca por itemCode
    } //Fin de busqueda por cualquier calificacion


    //-/-/-/--/-/-/-/-//-/-----//-/--/-/--/-/-/-/-/-/-//---/-----------/---/-/-/--/-//-/-/-/---/---/-/-/-//-/--/--/--/--/-
//-/-/-/--/-/-/-/-//-/-----//-/--/-/--/-/-/-/-/-/-//---/-----------/---/-/-/--/-//-/-/-/---/---/-/-/-//-/--/--/--/--/-
//-/-/-/--/-/-/-/-//-/-----//-/--/-/--/-/-/-/-/-/-//---/-----------/---/-/-/--/-//-/-/-/---/---/-/-/-//-/--/--/--/--/-


    if (stars != 'Cualquier') {
        
        if (!itemCode){ //Si no se recibe un itemcode, es decir se busca por marca

            if (brand == 'Todas las marcas'){ //Se busca por todas las marcas

                if (!year){ //Todas las marcas: Se busca por cualquier anio

                    if(quarter == 'Todo el anio'){ //Todas las marcas: Se busca por todo el anio

                        console.log("Prueba 1.1")

                        Review.fetchPreguntasAndRespuestasAndStars(stars)
                        .then(([rows, fieldData]) => {

                            
                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    } //Fin de Todas las marcas: Se busca por todo el anio



                    if(quarter != 'Todo el anio'){ //Todas las marcas: Se busca por cuartil

                        console.log("Prueba 2.1")

                        Review.fetchOnlyForQuarterAndStars(quarter, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });


                    } //Fin de Todas las marcas: Se busca por cuartil

                } //Final de Todas las marcas: busqueda por cualquier anio



                if (year){ //Todas las marcas: Se busca por anio

                    if(quarter == 'Todo el anio'){ //Todas las marcas: Se busca por todo el anio

                        console.log("Prueba 3.1")

                        Review.fetchOnlyForYearAndStars(year, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });


                    } //Fin de Todas las marcas: Se busca por todo el anio



                    if(quarter != 'Todo el anio'){ //Todas las marcas: Se busca por cuartil

                        console.log("Prueba 4.1")

                        Review.fetchAllForYearAndQuarterAndStars(year, quarter, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });


                    } //Fin de Todas las marcas: Se busca por cuartil

                } //Final de Todas las marcas: busqueda por anio


            } //final de Todas las marcas: si busca por todas las marcas


//------------------------------------------------------------------------------------------------------------------------------

            if (brand != 'Todas las marcas'){ // si se busca por marca especifica

                if (!year){ //Se busca por todos los anios

                    if(quarter == 'Todo el anio'){
                        
                        console.log("Prueba 5.1")

                        Review.fetchOnlyForBrandAndStars(brand, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    }

                    if(quarter != 'Todo el anio'){ //busqueda por cuartil
                        
                        console.log("Prueba 6.1")

                        Review.fetchByBrandAndQuarterAndStars(brand, quarter, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    }

                } //Final de busqueda por todos los anios

                if (year){ //Se busca un anio especifico

                    if(quarter == 'Todo el anio'){
                        console.log("Prueba 7.1")

                        Review.fetchAllForBrandAndYearAndStars(brand, year, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    }

                    if(quarter != 'Todo el anio'){
                        
                        console.log("Prueba 8.1")

                        Review.fetchByBrandYearAndQuarterAndStars(brand, year, quarter, stars)
                        .then(([rows, fieldData]) => {

                            Review.fetchPreguntasAndRespuestas()       
                            .then(([preguntasRespuestas]) => {
                                response.render('filteredReviews', {
                                    brand: brand,
                                    year: year,
                                    quarter: quarter,
                                    itemCode: itemCode,
                                    stars: stars,
                                    reviews: rows,
                                    brands: brands,
                                    preguntasRespuestas: preguntasRespuestas,
                                    username: request.session.username || '',
                                    csrfToken: request.csrfToken(),
                                    permisos: request.session.permisos || [],
                                });
                            })
                            .catch((error) => {
                                console.log(error);
                            });

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    }

                } //Final de busqueda por anio especifico

            } //final de si busca por todas las marcas
        
        } //final de si no se recibe itemcode

    //------------------------------------------------------------------------------------------------------------------------
        
    if (itemCode){ // si se busca por itemCode

        if (!year){ //Se busca por todos los anios

            if(quarter == 'Todo el anio'){
                
                console.log("Prueba 9.1")

                Review.fetchOnlyForItemCodeAndStars(itemCode, stars)
                .then(([rows, fieldData]) => {

                    Review.fetchPreguntasAndRespuestas()       
                    .then(([preguntasRespuestas]) => {
                        response.render('filteredReviews', {
                            brand: brand,
                            year: year,
                            quarter: quarter,
                            itemCode: itemCode,
                            stars: stars,
                            reviews: rows,
                            brands: brands,
                            preguntasRespuestas: preguntasRespuestas,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                })
                .catch((error) => {
                    console.log(error);
                });


            }

            if(quarter != 'Todo el anio'){ //busqueda por cuartil
                
                console.log("Prueba 10.1")

                Review.fetchByItemCodeAndQuarterAndStars(itemCode, quarter, stars)
                .then(([rows, fieldData]) => {

                    Review.fetchPreguntasAndRespuestas()       
                    .then(([preguntasRespuestas]) => {
                        response.render('filteredReviews', {
                            brand: brand,
                            year: year,
                            quarter: quarter,
                            itemCode: itemCode,
                            stars: stars,
                            reviews: rows,
                            brands: brands,
                            preguntasRespuestas: preguntasRespuestas,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                })
                .catch((error) => {
                    console.log(error);
                });

            }

        } //Final de busqueda por todos los anios

        if (year){ //Se busca un anio especifico

            if(quarter == 'Todo el anio'){
                console.log("Prueba 11.1")

                Review.fetchAllForItemCodeAndYearAndStars(itemCode, year, stars)
                .then(([rows, fieldData]) => {

                    Review.fetchPreguntasAndRespuestas()       
                    .then(([preguntasRespuestas]) => {
                        response.render('filteredReviews', {
                            brand: brand,
                            year: year,
                            quarter: quarter,
                            itemCode: itemCode,
                            stars: stars,
                            reviews: rows,
                            brands: brands,
                            preguntasRespuestas: preguntasRespuestas,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                })
                .catch((error) => {
                    console.log(error);
                });
            }

            if(quarter != 'Todo el anio'){

                console.log("Prueba 12.2")

                Review.fetchByItemCodeYearAndQuarterAndStars(itemCode, year, quarter, stars)
                .then(([rows, fieldData]) => {

                    Review.fetchPreguntasAndRespuestas()       
                    .then(([preguntasRespuestas]) => {
                        response.render('filteredReviews', {
                            brand: brand,
                            year: year,
                            quarter: quarter,
                            itemCode: itemCode,
                            stars: stars,
                            reviews: rows,
                            brands: brands,
                            preguntasRespuestas: preguntasRespuestas,
                            username: request.session.username || '',
                            csrfToken: request.csrfToken(),
                            permisos: request.session.permisos || [],
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });

                })
                .catch((error) => {
                    console.log(error);
                });
            }

        } //Final de busqueda por anio especifico

    } //final de si busca por itemCode
} //Fin de busqueda por cualquier calificacion


    })
    .catch((error) => {
        console.log(error);
    });
};


exports.changeVisibility = (request, response, next) => {
    const { IdResena } = request.params;
    
    Review.changeVisibility(IdResena)
    
        .then(([result]) => {
            const newCsrfToken = request.csrfToken();
            response.status(200).json({ message: 'Visibility changed successfully', result, csrfToken: newCsrfToken });
        })
        .catch((error) => {
            console.error(error);
            response.status(500).json({ error: 'Internal server error' });
        });
};

