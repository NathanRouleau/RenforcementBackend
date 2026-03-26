'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 2. Users (Attention, la table s'appelle Users)
    await queryInterface.bulkInsert('Users', [
      { id: 1, username: 'admin', password: 'password123', firstname: 'Super', lastname: 'Admin', email: 'admin@assurmoi.fr' },
      { id: 2, username: 'nrouleau', password: 'password123', firstname: 'Nathan', lastname: 'Rouleau', email: 'nathan@assurmoi.fr' }
    ]);

    // 3. Assurés
    await queryInterface.bulkInsert('Assure', [
      { user_id: 2, numero_client: 'CLI-001', adresse: '1 rue de la Paix', telephone: '0600000000' }
    ]);

    // 4. Contrats
    await queryInterface.bulkInsert('Contrat', [
      { numero_contrat: 'CTR-001', assure_id: 1, type_couverture: 'Tous risques', franchise: 250.00, statut: 'Actif', date_souscription: new Date() }
    ]);

    // 5. Sinistres
    await queryInterface.bulkInsert('Sinistre', [
      { assure_id: 1, contrat_id: 1, charge_clientele_id: 1, immatriculation_vehicule: 'AB-123-CD', nom_prenom_conducteur: 'Nathan Rouleau', is_conducteur_assure: true, date_heure_sinistre: new Date(), contexte: 'Accident sur un parking', responsabilite_engagee: true, pourcentage_responsabilite: 50, statut: 'Validé' }
    ]);

    // 6. Dossiers
    await queryInterface.bulkInsert('Dossier', [
      { numero_dossier: 'DOS-001', sinistre_id: 1, charge_suivi_id: 1, statut_courant: 'Dossier initialisé', scenario: '1' }
    ]);

    // 7. Documents
    await queryInterface.bulkInsert('Document', [
      { sinistre_id: 1, type_document: 'carte_grise', chemin_fichier: '/uploads/cg.pdf', est_valide: false }
    ]);

    // 8. Action Logs
    await queryInterface.bulkInsert('ActionLog', [
      { user_id: 1, entite_concernee: 'Sinistre', entite_id: 1, action: 'CREATE', details: 'Création du premier sinistre' }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ActionLog', null, {});
    await queryInterface.bulkDelete('Document', null, {});
    await queryInterface.bulkDelete('Dossier', null, {});
    await queryInterface.bulkDelete('Sinistre', null, {});
    await queryInterface.bulkDelete('Contrat', null, {});
    await queryInterface.bulkDelete('Assure', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};