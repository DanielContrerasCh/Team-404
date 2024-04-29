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

    // Fetch all unique brands
    Review.fetchAllBrands()
    .then(([brands]) => {
        // If no year is selected, fetch all reviews for the brand and quarter
         if(!brand && !quarter && !itemCode){
            Review.fetchOnlyForYear(year)
            .then(([rows, fieldData]) => {
                Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
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
        } else if(!brand && !year && !itemCode){
            Review.fetchOnlyForQuarter(quarter)
            .then(([rows, fieldData]) => {
                Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
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

        } else if (!quarter && !year && !itemCode) {
            Review.fetchOnlyForBrand(brand)
            .then(([rows, fieldData]) => {
                Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
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

        } else if (!year && !itemCode) {
            Review.fetchByBrandAndQuarter(brand, quarter)
            .then(([rows, fieldData]) => {
                Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
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
        } else  if (!quarter && !itemCode) {
            console.log(`Brand: ${brand}, Year: ${year}`); 
            // If no quarter is selected, fetch all reviews for the year
            Review.fetchAllForYear(brand, year)
            .then(([rows, fieldData]) => {
                Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
                    reviews: rows,
                    brands: brands,
                    preguntasRespuestas: preguntasRespuestas,
                    username: request.session.username || '',
                    csrfToken: request.csrfToken(),
                    permisos: request.session.permisos || [],
                });
                console.log(rows);
            })
            .catch((error) => {
                console.log(error);
            });
                
            })
            .catch((error) => {
                console.log(error);
            });
        } else if (!brand && !itemCode) {
            Review.fetchAllForYearAndQuarter(year, quarter)
                .then(([rows, fieldData]) => {
                    Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
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
                .catch(err => {
                    console.log(err);
                });
        } else if (!brand && !quarter && !year && itemCode) {
            Review.fetchByItemCode(itemCode)
                .then(([rows, fieldData]) => {
                    Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
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
                .catch(err => {
                    console.log(err);
                });
        } else {
            // If a quarter is selected, fetch reviews for the quarter
            Review.fetchSome(brand, quarter, year)
            .then(([rows, fieldData]) => {
                Review.fetchPreguntasAndRespuestas()
            .then(([preguntasRespuestas]) => {
                response.render('filteredReviews', {
                    reviews: rows,
                    brands: brands,
                    preguntasRespuestas: preguntasRespuestas,
                    username: request.session.username || '',
                    csrfToken: request.csrfToken(),
                    permisos: request.session.permisos || [],
                });
                console.log(rows);
                
            })
            .catch((error) => {
                console.log(error);
            });
            })
            .catch((error) => {
                console.log(error);
            });
        }
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

