import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Card, ActivityIndicator, Button, Divider } from "react-native-paper";
import fetchData from "@/hooks/fetchData";

type Sinistre = {
  id: number;
  assure_id: number;
  contrat_id: number;
  immatriculation_vehicule: string;
  nom_prenom_conducteur: string;
  is_conducteur_assure: boolean;
  date_heure_appel: string | null;
  date_heure_sinistre: string;
  contexte: string;
  responsabilite_engagee: boolean;
  pourcentage_responsabilite: number;
  statut: string;
  createdAt: string;
  updatedAt: string;
};

const statutStyle: Record<string, { bg: string; text: string }> = {
  'En attente de validation': { bg: '#FAEEDA', text: '#854F0B' },
  'Brouillon':                { bg: '#F1EFE8', text: '#5F5E5A' },
  'Validé':                   { bg: '#EAF3DE', text: '#3B6D11' },
  'Refusé':                   { bg: '#FCEBEB', text: '#A32D2D' },
};

const formatDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

export default function SinistreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [sinistre, setSinistre] = useState<Sinistre | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(`/sinistres/${id}`, 'GET')
      .then(data => setSinistre(data.sinistre ?? data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ marginTop: 60 }} />;
  if (!sinistre) return (
    <View style={styles.centered}>
      <Text>Sinistre introuvable.</Text>
      <Button onPress={() => router.back()}>Retour</Button>
    </View>
  );

  const style = statutStyle[sinistre.statut] ?? { bg: '#F1EFE8', text: '#5F5E5A' };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>

      <View style={styles.topRow}>
        <Text style={styles.idText}>Sinistre #{sinistre.id}</Text>
        <View style={[styles.badge, { backgroundColor: style.bg }]}>
          <Text style={[styles.badgeText, { color: style.text }]}>{sinistre.statut}</Text>
        </View>
      </View>

      {/* Véhicule & conducteur */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Véhicule & conducteur</Text>
          <Divider style={styles.divider} />
          <Row label="Immatriculation"   value={sinistre.immatriculation_vehicule} />
          <Row label="Conducteur"        value={sinistre.nom_prenom_conducteur} />
          <Row label="Conducteur assuré" value={sinistre.is_conducteur_assure ? 'Oui' : 'Non'} />
        </Card.Content>
      </Card>

      {/* Dates */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Dates</Text>
          <Divider style={styles.divider} />
          <Row label="Date du sinistre" value={formatDate(sinistre.date_heure_sinistre)} />
          <Row label="Date d'appel"     value={formatDate(sinistre.date_heure_appel)} />
          <Row label="Créé le"          value={formatDate(sinistre.createdAt)} />
          <Row label="Mis à jour le"    value={formatDate(sinistre.updatedAt)} />
        </Card.Content>
      </Card>

      {/* Responsabilité */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Responsabilité</Text>
          <Divider style={styles.divider} />
          <Row label="Engagée"     value={sinistre.responsabilite_engagee ? 'Oui' : 'Non'} />
          <Row label="Pourcentage" value={`${sinistre.pourcentage_responsabilite}%`} />
        </Card.Content>
      </Card>

      {/* Contexte */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Contexte</Text>
          <Divider style={styles.divider} />
          <Text style={styles.contexte}>{sinistre.contexte}</Text>
        </Card.Content>
      </Card>

      <Button mode="outlined" onPress={() => router.back()} style={styles.backBtn}>
        Retour à la liste
      </Button>

    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#f5f5f5' },
  centered:     { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  topRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  idText:       { fontSize: 20, fontWeight: '500' },
  badge:        { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  badgeText:    { fontSize: 12, fontWeight: '500' },
  card:         { marginBottom: 12, borderRadius: 12 },
  sectionTitle: { fontSize: 14, fontWeight: '500', color: '#555', marginBottom: 8 },
  divider:      { marginBottom: 10 },
  row:          { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label:        { fontSize: 13, color: '#888' },
  value:        { fontSize: 13, fontWeight: '500', maxWidth: '60%', textAlign: 'right' },
  contexte:     { fontSize: 14, lineHeight: 22, color: '#333' },
  backBtn:      { marginTop: 8, marginBottom: 32 },
});