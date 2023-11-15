module.exports = (Sequelize, DataType) => {
    const Category = Sequelize.define('Category', {
        id: {
            type: DataType.STRING(45),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataType.STRING(45),
            allowNull: false,
        }
    }, {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: false
    });

    Category.associate = (models) => {
        // Una categoria pertenece a varios productos
        Category.hasMany(models.Product, {
            as: 'products',
            foreignKey: 'id_category'
        })
    }

    return Category;
};
