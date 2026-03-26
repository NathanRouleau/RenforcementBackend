const userRoutes = require('./users');
const roleRoutes = require('./roles');
const assureRoutes = require('./assures');
const contratRoutes = require('./contrats');
const sinistreRoutes = require('./sinistres');
const dossierRoutes = require('./dossiers');
const documentRoutes = require('./documents');
const actionLogRoutes = require('./actionLogs');

function initRoutes(app) {
    app.use('/users', userRoutes);
    app.use('/roles', roleRoutes);
    app.use('/assures', assureRoutes);
    app.use('/contrats', contratRoutes);
    app.use('/sinistres', sinistreRoutes);
    app.use('/dossiers', dossierRoutes);
    app.use('/documents', documentRoutes);
    app.use('/action-logs', actionLogRoutes);

    app.get('/', (req, res, next) => {
        console.log('middleware 1 homepage');
        next();
    }, (req, res) => {
        console.log('controller homepage');
        res.status(200).json({ 
            message: 'Bienvenue sur la homepage AssurMoi !' 
        });
    });
}

module.exports = initRoutes;