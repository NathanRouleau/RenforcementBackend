import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Text, Card, ActivityIndicator, Button, Divider, TextInput } from "react-native-paper";
import fetchData, { fetchDocument } from "@/hooks/fetchData";
import * as DocumentPicker from 'expo-document-picker';

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
  const [pickedFile, setPickedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [ documentLabel, setDocumentLabel ] = useState('')
  const [error, setError] = useState<string | null>(null);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ 
      multiple: false, 
    });
    if(result.canceled) {
      return;
    }
    setPickedFile(result.assets[0]);
  } 

  const submitForm = () => {
      const formData = new FormData();
      formData.append("label", documentLabel);
      if(pickedFile) {
          if(Platform.OS === "web") {
              // cas de la version web
              const webfile = (pickedFile as DocumentPicker.DocumentPickerAsset & {file?: File}).file;
              if (webfile) formData.append("file", webfile)
          } else {
              // toutes les autres plateformes
              formData.append("file", {
                  uri: pickedFile.uri,
                  name: pickedFile.name,
                  type: pickedFile.mimeType || 'application/octet-stream'
              } as unknown as Blob)
          }
          setError(null);
          fetchDocument('/documents', 'POST', formData, true)
              .then(response => console.log(response))
              .catch(error => {
                  console.log(error),
                  setError(error.message)
              })
      } else {
          setError('Pas de fichier sélectionné');
      }
    }

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

      {/* Pick Document */}
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.sectionTitle}>ENVOYER UN DOCUMENT</Text>
          <Divider style={styles.divider} />

          <Text style={styles.inputLabel}>Libellé du document</Text>
          <TextInput
            value={documentLabel ?? ''}
            onChangeText={setDocumentLabel}
            mode="outlined"
            placeholder="Ex : Constat amiable, Facture réparation…"
            style={styles.input}
            outlineStyle={{ borderRadius: 8 }}
            theme={{ colors: { background: '#fff' } }}
          />

          <TouchableOpacity style={styles.pickBtn} onPress={pickDocument}>
            <Text style={styles.pickBtnText}>⬆  Choisir un fichier</Text>
          </TouchableOpacity>

          {pickedFile && (
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>{pickedFile.name}</Text>
              <Text style={styles.fileSize}>
                {pickedFile.size ? `${(pickedFile.size / 1024).toFixed(1)} Ko` : ''}
              </Text>
            </View>
          )}

          {error && <Text style={styles.errorText}>{error}</Text>}

          <TouchableOpacity
            style={[styles.sendBtn, !pickedFile && styles.sendBtnDisabled]}
            onPress={submitForm}
            disabled={!pickedFile}
          >
            <Text style={styles.sendBtnText}>Envoyer le document</Text>
          </TouchableOpacity>

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
  inputLabel:   { fontSize: 12, color: '#888', marginBottom: 4 },
  input:        { marginBottom: 14, backgroundColor: '#fff', fontSize: 14 },
  pickBtn:      { borderWidth: 1, borderColor: '#ccc', borderStyle: 'dashed', borderRadius: 8, padding: 12, alignItems: 'center', marginBottom: 12, backgroundColor: '#fafafa' },
  pickBtnText:  { fontSize: 14, color: '#555' },
  fileInfo:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#EAF3DE', padding: 10, borderRadius: 8, marginBottom: 12 },
  fileName:     { fontSize: 13, color: '#27500A', flex: 1, marginRight: 8 },
  fileSize:     { fontSize: 12, color: '#3B6D11' },
  errorText:    { color: '#A32D2D', fontSize: 13, marginBottom: 8 },
  sendBtn:      { backgroundColor: '#185FA5', borderRadius: 8, padding: 13, alignItems: 'center' },
  sendBtnDisabled: { backgroundColor: '#ccc' },
  sendBtnText:  { color: '#fff', fontSize: 14, fontWeight: '500' },
});