export type Sinistre = {
  id: number;
  assure_id?: number;
  contrat_id?: number;
  immatriculation_vehicule: string;
  nom_prenom_conducteur: string;
  date_heure_sinistre: string;
  date_heure_appel?: string | null;
  contexte: string;
  statut: string;
  pourcentage_responsabilite: number;
  is_conducteur_assure: boolean;
  responsabilite_engagee?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
