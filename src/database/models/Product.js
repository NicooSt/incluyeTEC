module.exports = (Sequelize, DataType) => {
    const Product = Sequelize.define('Product',
        {
            id: {
                type: DataType.STRING(45),
                primaryKey: true,
                allowNull: false,
                unsigned: true,
                autoIncrement: true,
            },
            name: {
                type: DataType.STRING(200),
                allowNull: false,
                unsigned: true,
            },
            list_price: {
                type: DataType.DECIMAL(10, 2),
                allowNull: false,
                unsigned: true,
            },
            special_price: {
                type: DataType.DECIMAL(10, 2),
                allowNull: false,
                unsigned: true,
            },
            installments: {
                type: DataType.BOOLEAN,
                allowNull: false,
            },
            installments_num: {
                type: DataType.INTEGER,
                allowNull: false,
                unsigned: true,
            },
            interest: {
                type: DataType.BOOLEAN,
                allowNull: false,
            },
            interest_rate: {
                type: DataType.INTEGER,
                allowNull: false,
                unsigned: true,
            },
            interest_price: {
                type: DataType.DECIMAL(10, 2),
                allowNull: false,
                unsigned: true,
            },
            stock: {
                type: DataType.BOOLEAN,
                allowNull: false,
            },
            shipment: {
                type: DataType.BOOLEAN,
                allowNull: false,
            },
            warranty: {
                type: DataType.BOOLEAN,
                allowNull: false,
            },
            warranty_duration: {
                type: DataType.STRING(45),
                allowNull: false,
            },
            img_name: {
                type: DataType.STRING(45),
                allowNull: false,
            },
            id_category: {
                type: DataType.STRING(45),
                allowNull: false,
            }
        },
        {
            timestamps: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            deletedAt: false
        });

    Product.associate = (models) => {
        // Un producto pertenece a una categoria
        Product.belongsTo(models.Category, {
            // Alias de la relacion
            as: 'category',
            foreignKey: 'id_category'
        });
    };

    return Product;
};
