const db = require('../database/models');
const { v4: uuidv4 } = require('uuid');

const categoriesController = {
    getCreatePage: (req, res) => {
        try {
            db.Category.findAll()
                .then((categories) => {
                    let alert = null;

                    if (req.query.alert) {
                        const status = req.query.alert.split('_')[0];
                        let random = Math.floor(Math.random() * 4) + 1;
                        if (status == 'ok') {
                            switch (random) {
                                case 1:
                                    alert = 'La categoria "'
                                        + req.query.alert.split('_')[1]
                                        + '" se ha integrado a nuestras filas!';
                                    break;
                                case 2:
                                    alert = '¡Hoy celebramos la llegada de la categoría "'
                                        + req.query.alert.split('_')[1]
                                        + '" a nuestra familia de productos!';
                                    break;
                                case 3:
                                    alert = '¡Nueva categoría en la ciudad! Ahora tenemos a "'
                                        + req.query.alert.split('_')[1]
                                        + '" en nuestras filas.';
                                    break;
                                case 4:
                                    alert = '¡Bienvenido, "'
                                        + req.query.alert.split('_')[1]
                                        + '"! La última incorporación a nuestras categorías está aquí para quedarse.';
                                    break;
                                case 5:
                                    alert = '¡Aplausos para "'
                                        + req.query.alert.split('_')[1]
                                        + '" que acaba de unirse a la fiesta de categorías!';
                                    break;
                                default:
                                    alert = 'Error en categorias random.';
                                    break;
                            }
                        } else {
                            switch (random) {
                                case 1:
                                    alert = 'La categoria "'
                                        + req.query.alert.split('_')[1]
                                        + '" ya existe. Para que repetir, no?';
                                    break;
                                case 2:
                                    alert = '¡Ups! Parece que alguien intenta duplicar la categoría "'
                                        + req.query.alert.split('_')[1]
                                        + '". No se permite la clonación aquí.';
                                    break;
                                case 3:
                                    alert = '¡Espera un momento! La categoría "'
                                        + req.query.alert.split('_')[1]
                                        + '" ya figura en nuestro repertorio. ¿Intentamos algo nuevo?';
                                    break;
                                case 4:
                                    alert = '¡Alerta de repetición! La categoría "'
                                        + req.query.alert.split('_')[1]
                                        + '" ya se encuentra en nuestra selección. Busquemos algo único.';
                                    break;
                                case 5:
                                    alert = '¡Eh, cuidado! La categoría "'
                                        + req.query.alert.split('_')[1]
                                        + '" ya está en nuestra colección. Intentemos algo diferente.';
                                    break;
                                default:
                                    alert = 'Error en categorias random.';
                                    break;
                            }
                        }
                    }

                    res.render('createCategory',
                        {
                            categories,
                            alert,
                            title: 'Administrar categorías',
                            style: 'createCategory'
                        }
                    );
                });
        } catch (error) {
            res.render(error);
        }
    },

    createCategory: (req, res) => {
        try {
            db.Category.findOne({
                where: { name: req.body.name }
            }).then((category) => {
                let categoryName = req.body.name;

                if (!category || (category.name.toLowerCase() != categoryName.toLowerCase())) {
                    db.Category.create(
                        {
                            id: uuidv4(),
                            name: req.body.name
                        }
                    ).then(() => {
                        res.redirect(`/categories/create?alert=ok_${categoryName}`);
                    });
                } else {
                    res.redirect(`/categories/create?alert=error_${categoryName}`);
                }
            });
        } catch (error) {
            res.render(error);
        }
    },

    getUpdatePage: (req, res) => {
        try {
            db.Category.findAll()
                .then((categories) => {
                    let alert = null;

                    if (req.query.alert) {
                        const status = req.query.alert.split('_')[0];

                        if (status == 'ok') {
                            alert = 'Creo que la categoria "'
                                + req.query.alert.split('_')[1]
                                + '" ahora se ve mucho mejor!';
                        } else {
                            alert = 'Mmmm... deberiamos buscar un nombre diferente para "'
                                + req.query.alert.split('_')[1] + '".';
                        }
                    }

                    res.render('editCategory',
                        {
                            categories,
                            alert,
                            title: 'Administrar categorías',
                            style: 'editCategory'
                        }
                    );
                });
        } catch (error) {
            res.render(error);
        }
    },

    updateCategory: (req, res) => {
        try {
            db.Category.findByPk(req.body.category)
                .then((category) => {
                    let categoryName = req.body.name;

                    if (categoryName.toLowerCase() != category.name.toLowerCase()) {
                        category.update(
                            {
                                id: category.id,
                                name: req.body.name
                            }
                        ).then(() => {
                            res.redirect(`/categories/update?alert=ok_${categoryName}`);
                        });
                    } else {
                        res.redirect(`/categories/update?alert=error_${categoryName}`);
                    }
                });
        } catch (error) {
            res.render(error);
        }
    },

    getDeletePage: (req, res) => {
        try {
            db.Category.findAll()
                .then((categories) => {
                    let alert = null;

                    if (req.query.alert) {
                        const status = req.query.alert.split('_')[0];

                        if (status == 'ok') {
                            alert = 'Oh! La categoria "'
                                + req.query.alert.split('_')[1]
                                + '" ha tenido un final inesperado.'
                        } else {
                            alert = 'Ups! Parece que la categoria "'
                                + req.query.alert.split('_')[1]
                                + '" esta en uso.'
                        }
                    }

                    res.render('deleteCategory',
                        {
                            categories,
                            alert,
                            title: 'Administrar categorias',
                            style: 'deleteCategory'
                        });
                });
        } catch (error) {
            res.render(error);
        }
    },

    deleteCategory: (req, res) => {
        try {
            db.Product.findAll({
                where: { id_category: req.params.id }
            }).then((products) => {
                db.Category.findByPk(req.params.id)
                    .then((category) => {
                        const categoryName = category.name;
                        if (products.length == 0) {
                            category.destroy()
                                .then(() => {
                                    res.redirect(`/categories/delete?alert=ok_${categoryName}`);
                                })
                        } else {
                            res.redirect(`/categories/delete?alert=error_${categoryName}`);
                        }
                    });
            });
        } catch (error) {
            res.render(error);
        }
    }
}

module.exports = categoriesController;