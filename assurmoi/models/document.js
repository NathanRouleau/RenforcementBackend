const { Model } = require('sequelize');

const Document = (dbInstance, DataTypes) => {
    class Document extends Model {}
    Document.init({
        sinistre_id: DataTypes.INTEGER,
        dossier_id: DataTypes.INTEGER,
        type_document: { type: DataTypes.STRING, allowNull: false },
        chemin_fichier: { type: DataTypes.STRING, allowNull: false },
        est_valide: DataTypes.BOOLEAN
    }, {
        sequelize: dbInstance,
        modelName: 'Document',
        tableName: 'Document',
        timestamps: true
    });
    return Document;
}
module.exports = Document;