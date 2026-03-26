const userRoutes = require('./users');
const assureRoutes = require('./assures');
const contratRoutes = require('./contrats');
const sinistreRoutes = require('./sinistres');
const dossierRoutes = require('./dossiers');
const documentRoutes = require('./documents');
const actionLogRoutes = require('./actionLogs');
const authRoutes = require('./auth');

const { validateAuthentication } = require('../middlewares/auth');

function initRoutes(app) {
    app.use('/users', validateAuthentication, userRoutes);
    app.use('/assures', validateAuthentication, assureRoutes);
    app.use('/contrats', validateAuthentication, contratRoutes);
    app.use('/sinistres', validateAuthentication, sinistreRoutes);
    app.use('/dossiers', validateAuthentication, dossierRoutes);
    app.use('/documents', validateAuthentication, documentRoutes);
    app.use('/action-logs', validateAuthentication, actionLogRoutes);
    app.use('/', authRoutes)
}

module.exports = initRoutes;