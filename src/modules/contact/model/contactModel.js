const { Model, DataTypes } = require("sequelize");

module.exports = class ContactModel extends Model {
  static setup(sequelizeInstance) {
    ContactModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        message: {
          type: DataTypes.TEXT,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: "Contact",
        tableName: "contacts",
        underscored: true,
        paranoid: true,
        timestamps: true,
      }
    );

    return ContactModel;
  }

  static setupAssociation(MemberModel) {
    ContactModel.belongsTo(MemberModel, { foreignKey: "memberId" });

    return ContactModel;
  }
};
