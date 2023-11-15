const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');

const productsController = {
    listProducts: (req, res) => {
        try {
            db.Product.findAll({
                order: [
                    ['stock', 'DESC'],
                    ['created_at', 'ASC']
                ]
            })
                .then((products) => {
                    let alert = '';

                    if (req.query.alert) {
                        let action = req.query.alert.split('_')[1];
                        let random = Math.floor(Math.random() * 4) + 1;

                        if (action == 'created') {
                            switch (random) {
                                case 1:
                                    alert = '¡Bienvenido! Un nuevo producto se ha unido al equipo.';
                                    break;
                                case 2:
                                    alert = '¡Hurra! Un flamante producto acaba de aterrizar en nuestra colección.';
                                    break;
                                case 3:
                                    alert = '¡Saludos al recién llegado! Un producto fresquito se ha unido al catálogo.';
                                    break;
                                case 4:
                                    alert = '¡Notición! Un nuevo producto ha entrado en escena. ¡Aplausos!';
                                    break;
                                case 5:
                                    alert = 'Se agranda el equipo! Un nuevo producto esta aqui.';
                                    break;
                                default:
                                    alert = 'Error en productos random';
                                    break;
                            }
                        } else if (action == 'deleted') {
                            switch (random) {
                                case 1:
                                    alert = 'Un producto se ha tomado unas largas vacaciones!';
                                    break;
                                case 2:
                                    alert = '¡Adiós! Un producto decidió tomar el camino escénico hacia la inexistencia.';
                                    break;
                                case 3:
                                    alert = '¡Producto desvanecido! Se ha esfumado misteriosamente del catálogo.';
                                    break;
                                case 4:
                                    alert = 'Un producto se decidio a explorar nuevos horizontes.';
                                    break;
                                case 5:
                                    alert = 'Un producto nos ha dejado, ¡pero siempre recordaremos los buenos momentos!';
                                    break;
                                default:
                                    alert = 'Error en productos random';
                                    break;
                            }
                        }
                    }

                    res.render('products',
                        {
                            products,
                            alert,
                            addPricePoint,
                            filterDecimal,
                            title: 'Productos',
                            style: 'products'
                        });
                });
        } catch (error) {
            res.send(error);
        }
    },

    getDetailPage: (req, res) => {
        try {
            db.Product.findByPk(req.params.id, { include: ['category'] })
                .then((product) => {
                    product.list_price = filterDecimal(product.list_price);
                    product.special_price = filterDecimal(product.special_price);

                    if (product.interest) {
                        product.interest_price = filterDecimal(product.interest_price);
                        product.installment_price = filterDecimal(product.interest_price / product.installments_num);
                    } else {
                        product.installment_price = filterDecimal(product.list_price / product.installments_num);
                    }

                    let alert = '';
                    if (req.query.alert) {
                        let action = req.query.alert.split('_')[1];
                        let random = Math.floor(Math.random() * 4) + 1;

                        if (action == 'edited') {
                            switch (random) {
                                case 1:
                                    alert = '¡Increíble! Este producto ahora luce simplemente genial.';
                                    break;
                                case 2:
                                    alert = '¡Mira eso! El producto ha recibido una mejora notable. ¡Está fantástico!';
                                    break;
                                case 3:
                                    alert = '¡Impresionante transformación! El producto se ve mucho mejor ahora.';
                                    break;
                                case 4:
                                    alert = '¡Bravo! Has elevado el nivel de este producto. ¡Se ve increíble!';
                                    break;
                                case 5:
                                    alert = '¡Guau! El producto ha pasado por un cambio asombroso y ahora está más atractivo.';
                                    break;
                                default:
                                    alert = 'Error en productos random';
                                    break;
                            }
                        } else if (action == 'addCart') {
                            alert = 'Este proyecto es solo de prueba. Aunque podria implementarlo no?';
                        }
                    }

                    res.render('detailProd',
                        {
                            product,
                            addPricePoint,
                            alert,
                            title: 'Detalle',
                            style: 'detailProd'
                        });
                });
        } catch (error) {
            res.render(error);
        }
    },

    getCreatePage: (req, res) => {
        try {
            db.Category.findAll({
                order: [['name', 'ASC']]
            })
                .then((categories) => {
                    res.render('createProd',
                        {
                            categories,
                            alert: null,
                            data: null,
                            title: 'Agregar producto',
                            style: 'createProd'
                        });
                });
        } catch (error) {
            res.render(error);
        }
    },

    createProduct: (req, res) => {
        try {
            const bodyParams = req.body;

            if (((bodyParams.name != '' && bodyParams.listPrice != '' && bodyParams.specialPrice != '') && (!isNaN(parseFloat(bodyParams.listPrice)) && !isNaN(parseFloat(bodyParams.specialPrice))))
                && (bodyParams.interestRate == null || (bodyParams.interestRate != null && bodyParams.interestRate != '' && !isNaN(parseFloat(bodyParams.interestRate)) && checkComa(bodyParams.interestRate)))
                && (checkComa(bodyParams.listPrice) && checkComa(bodyParams.specialPrice)) && bodyParams.category != 'Seleccione') {
                db.Product.create(
                    {
                        id: uuidv4(),
                        name: bodyParams.name,
                        list_price: parseFloat(replaceComa(bodyParams.listPrice)),
                        special_price: parseFloat(replaceComa(bodyParams.specialPrice)),
                        installments: bodyParams.installments == 'withInstallments' ? true : false,
                        installments_num: bodyParams.installmentsNum ? parseFloat(bodyParams.installmentsNum) : 0,
                        interest: bodyParams.interest && bodyParams.interest == 'withInterest' ? true : false,
                        interest_rate: bodyParams.interest && bodyParams.interest == 'withInterest'
                            ? parseFloat(replaceComa(bodyParams.interestRate)) : 0,
                        interest_price: bodyParams.interest && bodyParams.interest == 'withInterest'
                            ? getInterestPrice(bodyParams.listPrice, bodyParams.interestRate) : 0,
                        stock: bodyParams.stock == 'hasStock' ? true : false,
                        shipment: bodyParams.shipment == 'withShipment' ? true : false,
                        warranty: bodyParams.warranty == 'withWarranty' ? true : false,
                        warranty_duration: bodyParams.warranty ? bodyParams.warrantyDuration : '0',
                        img_name: req.file ? req.file.filename : 'default-image.jpg',
                        id_category: bodyParams.category
                    }
                ).then(() => {
                    res.redirect('/products?alert=ok_created');
                });
            } else {
                db.Category.findAll()
                    .then((categories) => {
                        let data = {
                            name: bodyParams.name,
                            list_price: bodyParams.listPrice,
                            special_price: bodyParams.specialPrice,
                            interest_rate: bodyParams.interestRate,
                            id_category: bodyParams.category
                        }

                        let alert = '';
                        if (data.name == '' || data.list_price == '' || data.special_price == ''
                            || (data.interest_rate != null && data.interest_rate == '')) {
                            alert = 'Seria mejor no dejar campos vacios.';

                        } else if (isNaN(parseFloat(data.list_price)) || isNaN(parseFloat(data.special_price))
                            || (data.interest_rate != null && isNaN(parseFloat(data.interest_rate)))) {
                            alert = 'Por favor chequea que los números ingresados sean validos.'

                        } else if (data.id_category == 'Seleccione') {
                            alert = 'No deberiamos darle al producto alguna categoria?';
                        } else {
                            alert = 'El número decimal debe ir marcado solo con un punto "." o coma ","';
                        }

                        res.render('createProd',
                            {
                                categories,
                                alert,
                                data,
                                title: 'Agregar producto',
                                style: 'createProd'
                            }
                        );
                    });
            }
        } catch (error) {
            res.render('error', {
                error: error,
                message: error.message,
                stack: error.stack,
                title: 'Error',
                style: 'error'
            });
        }
    },

    getUpdatePage: (req, res) => {
        try {
            const promProduct = db.Product.findByPk(req.params.id, { include: ['category'] });
            const promCategories = db.Category.findAll({ order: [['name', 'ASC']] });
            Promise.all([promProduct, promCategories])
                .then(([product, categories]) => {
                    product.list_price = filterDecimal(product.list_price);
                    product.special_price = filterDecimal(product.special_price);
                    product.interest_rate = filterDecimal(product.interest_rate);
                    res.render('editProd',
                        {
                            product,
                            categories,
                            alert: null,
                            data: null,
                            title: 'Editar producto',
                            style: 'editProd'
                        });
                });
        } catch (error) {
            res.render(error);
        }
    },

    updateProduct: (req, res) => {
        try {
            const prodId = req.params.id;
            db.Product.findByPk(prodId, { include: ['category'] })
                .then((editedProduct) => {
                    const bodyParams = req.body;

                    if (((bodyParams.name != '' && bodyParams.listPrice != '' && bodyParams.specialPrice != '') && (!isNaN(parseFloat(bodyParams.listPrice)) && !isNaN(parseFloat(bodyParams.specialPrice))))
                        && (bodyParams.interestRate == null || (bodyParams.interestRate != null && bodyParams.interestRate != '' && !isNaN(parseFloat(bodyParams.interestRate)) && checkComa(bodyParams.interestRate)))
                        && (checkComa(bodyParams.listPrice) && checkComa(bodyParams.specialPrice)) && bodyParams.category != 'Seleccione') {
                        editedProduct.update(
                            {
                                id: editedProduct.id,
                                name: bodyParams.name,
                                list_price: parseFloat(replaceComa(bodyParams.listPrice)),
                                special_price: parseFloat(replaceComa(bodyParams.specialPrice)),
                                installments: bodyParams.installments == 'withInstallments' ? true : false,
                                installments_num: bodyParams.installmentsNum
                                    ? parseFloat(bodyParams.installmentsNum) : editedProduct.installments_num,
                                interest: bodyParams.interest == 'withInterest' ? true : editedProduct.interest,
                                interest_rate: bodyParams.interestRate
                                    ? parseFloat(replaceComa(bodyParams.interestRate)) : editedProduct.interest_rate,
                                interest_price: bodyParams.interest && bodyParams.interest == 'withInterest'
                                    ? getInterestPrice(bodyParams.listPrice, bodyParams.interestRate) : 0,
                                stock: bodyParams.stock == 'hasStock' ? true : false,
                                shipment: bodyParams.shipment == 'withShipment' ? true : false,
                                warranty: bodyParams.warranty == 'withWarranty' ? true : false,
                                warranty_duration: bodyParams.warrantyDuration
                                    ? bodyParams.warrantyDuration : editedProduct.warranty_duration,
                                img_name: req.file ? req.file.filename : editedProduct.img_name,
                                id_category: bodyParams.category
                            }
                        ).then(() => {
                            res.redirect(`/products/detail/${prodId}?alert=ok_edited`)
                        });
                    } else {
                        db.Category.findAll()
                            .then((categories) => {
                                let data = {
                                    name: bodyParams.name,
                                    list_price: bodyParams.listPrice,
                                    special_price: bodyParams.specialPrice,
                                    interest_rate: bodyParams.interestRate,
                                    id_category: bodyParams.category
                                }

                                let alert = '';
                                if (data.name == '' || data.list_price == '' || data.special_price == ''
                                    || (data.interest_rate != null && data.interest_rate == '')) {
                                    alert = 'Seria mejor no dejar campos vacios.';

                                } else if (isNaN(parseFloat(data.list_price)) || isNaN(parseFloat(data.special_price))
                                    || (data.interest_rate != null && isNaN(parseFloat(data.interest_rate)))) {
                                    alert = 'Por favor chequea que los números ingresados sean validos.'

                                } else if (data.id_category == 'Seleccione') {
                                    alert = 'No deberiamos darle al producto alguna categoria?';

                                } else {
                                    alert = 'El número decimal debe ir marcado solo con un punto "." o coma ","';

                                }

                                res.render('editProd',
                                    {
                                        product: editedProduct,
                                        categories,
                                        alert,
                                        data,
                                        title: 'Editar producto',
                                        style: 'editProd'
                                    }
                                );
                            });
                    }
                });
        } catch (error) {
            res.render('error', {
                error: error,
                message: error.message,
                stack: error.stack,
                title: 'Error',
                style: 'error'
            });
        }
    },

    deleteProduct: (req, res) => {
        try {
            db.Product.findByPk(req.params.id)
                .then((product) => {
                    const fs = require('fs');
                    const path = require('path');
                    const productImgName = product.img_name;
                    product.destroy();

                    if (productImgName != 'default-image.jpg') {
                        const filePath = path.join(__dirname, '../public/img/products', productImgName);
                        fs.unlinkSync(filePath);
                    }
                    setTimeout(() => {
                        res.redirect('/products?alert=ok_deleted');
                    }, 100);
                })
        } catch (error) {
            res.render(error);
        }
    }
}

// Se pasa un valor tipo number
function addPricePoint(price) {
    // Se obtiene la parte entera y se convierte en string
    let intPart = Math.floor(price).toString();
    // Al valor original se transforma en string y luego en array a partir del punto
    // Se obtiene la parte decimal del segundo elemento del array
    let decPart = price.toString().split(".")[1];
    // Se crea un arreglo de la parte entera convertida en string
    let arrPrice = Array.from(intPart);
    let auxPrice = '';

    for (let i = (intPart.length - 1); i >= 0; i--) {
        for (let j = 0; j < 3; j++) {
            if (arrPrice[i] != undefined) {
                auxPrice = auxPrice + arrPrice[i];
                i--;
            }
        }
        auxPrice = auxPrice + '.';
        intPart = intPart / 1000;
        i++;
    }

    // Se crea un nuevo string con los elementos del arreglo modificado
    let priceStr = '';
    for (let i = (auxPrice.length - 2); i >= 0; i--) {
        priceStr = priceStr + auxPrice[i];
    }

    if (decPart) {
        // Se concatena la parte entera con la decimal mas la coma
        return priceStr.concat(',' + decPart);
    } else {
        return priceStr;
    }
}

function getInterestPrice(price, rate) {
    let priceNum = parseFloat(price);
    let rateNum = parseFloat(rate)
    return priceNum + (priceNum * (rateNum / 100));
}

// En db se guarda con dos decimales a pesar de ser 00
function filterDecimal(price) {
    // Elimino la parte decimal si es igual a 00
    if (price.toString().split('.')[1] == '00') {
        return parseInt(price.toString().split('.')[0]);
    }
    // Si no, devuelvo como flotante redondeado en dos decimales
    return parseFloat(price).toFixed(2);
}

function checkComa(price) {
    if ((price.includes('.') && !price.includes(',')) || (!price.includes('.') && price.includes(',')) || (!price.includes('.') && !price.includes(','))) {
        return true;
    } else if (price.includes('.') && price.includes(',')) {
        return false;
    }
}

function replaceComa(price) {
    if (price.includes(',') && !price.includes('.')) {
        return price.replace(',', '.');
    } else {
        return price;
    }
}

module.exports = productsController;