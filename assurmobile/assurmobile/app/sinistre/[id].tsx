import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Card, ActivityIndicator, Button, Divider } from "react-native-paper";
import { useApi } from "@/hooks/useApi";
import { Sinistre } from "@/models/types";
import StatusBadge from "@/components/StatusBadge";
import DetailRow from "@/components/DetailRow";
import DocumentUploadForm from "@/components/DocumentUploadForm";
import fetchData from "@/hooks/fetchData";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const formatDate = (iso: string | null | undefined) =>
  iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

export default function SinistreDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data, loading, error, request } = useApi<Sinistre>();
  const [documents, setDocuments] = useState<any[]>([]);

  const fetchDetail = () => {
      request(`/sinistres/${id}`);
      fetchData(`/documents?sinistre_id=${id}`, 'GET', undefined, true)
        .then(res => setDocuments(res.documents || []))
        .catch(() => {});
  };

  const handleBack = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  if (loading && !data) return <ActivityIndicator style={{ marginTop: 60 }} size="large" color="#185FA5" />;
  
  if (error) return (
    <View style={styles.centered}>
      <Text style={{color: '#A32D2D', fontWeight: 'bold'}}>{error}</Text>
      <Text style={{color: '#555', textAlign: 'center', marginTop: 8}}>Est-ce qu'une extension navigateur ou le mode offline bloquent la requête ?</Text>
      <Button onPress={handleBack} mode="contained" style={{marginTop: 16}}>Retour</Button>
    </View>
  );

  if (!data && !loading) return (
    <View style={styles.centered}>
      <Text>Sinistre introuvable.</Text>
      <Button onPress={handleBack} mode="contained">Retour</Button>
    </View>
  );

  const sinistre = (data as any).sinistre ?? data;

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>

      <View style={styles.topRow}>
        <Text style={styles.idText}>Sinistre #{sinistre.id}</Text>
        <StatusBadge statut={sinistre.statut} />
      </View>

      <Card style={styles.card} mode="elevated" elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Véhicule & conducteur</Text>
          <Divider style={styles.divider} />
          <DetailRow label="Immatriculation"   value={sinistre.immatriculation_vehicule} />
          <DetailRow label="Conducteur"        value={sinistre.nom_prenom_conducteur} />
          <DetailRow label="Conducteur assuré" value={sinistre.is_conducteur_assure ? 'Oui' : 'Non'} />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated" elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Dates</Text>
          <Divider style={styles.divider} />
          <DetailRow label="Date du sinistre" value={formatDate(sinistre.date_heure_sinistre)} />
          <DetailRow label="Date d'appel"     value={formatDate(sinistre.date_heure_appel)} />
          <DetailRow label="Créé le"          value={formatDate(sinistre.createdAt)} />
          <DetailRow label="Mis à jour le"    value={formatDate(sinistre.updatedAt)} />
        </Card.Content>
      </Card>

      <Card style={styles.card} mode="elevated" elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Responsabilité</Text>
          <Divider style={styles.divider} />
          <DetailRow label="Engagée"     value={sinistre.responsabilite_engagee ? 'Oui' : 'Non'} />
          <DetailRow label="Pourcentage" value={`${sinistre.pourcentage_responsabilite}%`} />
        </Card.Content>
      </Card>

      {/* Section des documents listés */}
      {documents.length > 0 && (
        <Card style={styles.card} mode="elevated" elevation={1}>
          <Card.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <MaterialCommunityIcons name="folder-multiple" size={20} color="#185FA5" />
              <Text style={{ fontSize: 15, fontWeight: '600', color: '#185FA5' }}>DOCUMENTS JOINTS ({documents.length})</Text>
            </View>
            <Divider style={{ marginBottom: 12 }} />
            {documents.map((doc, idx) => (
              <View key={doc.id} style={{ 
                  flexDirection: 'row', alignItems: 'center', gap: 12, 
                  backgroundColor: '#F4F8FA', padding: 12, borderRadius: 8,
                  marginBottom: idx === documents.length - 1 ? 0 : 8 
              }}>
                <MaterialCommunityIcons name="file-document-outline" size={24} color="#555" />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#333' }}>{doc.type_document}</Text>
                  <Text style={{ fontSize: 11, color: '#888' }} numberOfLines={1}>{doc.chemin_fichier ? doc.chemin_fichier.split(/[\/\\]/).pop() : 'Fichier'}</Text>
                </View>
                {doc.est_valide ? (
                  <MaterialCommunityIcons name="check-decagram" size={20} color="#3B6D11" />
                ) : (
                  <MaterialCommunityIcons name="clock-outline" size={20} color="#C49B2A" />
                )}
              </View>
            ))}
          </Card.Content>
        </Card>
      )}

      {/* Le formulaire d'upload a été refactoré dans DocumentUploadForm */}
      <DocumentUploadForm sinistreId={sinistre.id} onUploadSuccess={fetchDetail} />

      <Card style={styles.card} mode="elevated" elevation={1}>
        <Card.Content>
          <Text style={styles.sectionTitle}>Contexte</Text>
          <Divider style={styles.divider} />
          <Text style={styles.contexte}>{sinistre.contexte}</Text>
        </Card.Content>
      </Card>

      <Button mode="outlined" onPress={handleBack} style={styles.backBtn}>
        Retour à la liste
      </Button>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F0F4F8' },
  centered:     { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  topRow:       { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  idText:       { fontSize: 24, fontWeight: 'bold', color: '#1B2A4A' },
  card:         { marginBottom: 16, borderRadius: 12, backgroundColor: '#ffffff' },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#555', marginBottom: 8, textTransform: 'uppercase' },
  divider:      { marginBottom: 8 },
  contexte:     { fontSize: 15, lineHeight: 24, color: '#333' },
  backBtn:      { marginTop: 12, borderRadius: 8, borderColor: '#ccc' },
});