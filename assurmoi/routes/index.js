const userRoutes = require('./users');
const assureRoutes = require('./assures');
const contratRoutes = require('./contrats');
const sinistreRoutes = require('./sinistres');
const dossierRoutes = require('./dossiers');
const documentRoutes = require('./documents');
const actionLogRoutes = require('./actionLogs');
const authRoutes = require('./auth');

function initRoutes(app) {
    app.use('/users', userRoutes);
    app.use('/assures', assureRoutes);
    app.use('/contrats', contratRoutes);
    app.use('/sinistres', sinistreRoutes);
    app.use('/dossiers', dossierRoutes);
    app.use('/documents', documentRoutes);
    app.use('/action-logs', actionLogRoutes);
    app.use('/', authRoutes)
}

module.exports = initRoutes;