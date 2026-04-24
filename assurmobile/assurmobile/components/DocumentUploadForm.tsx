import { useState } from "react";
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Text, Card, Divider, TextInput, ActivityIndicator } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { fetchDocument } from "@/hooks/fetchData";

export default function DocumentUploadForm({ sinistreId, onUploadSuccess }: { sinistreId: number, onUploadSuccess?: () => void }) {
  const [pickedFile, setPickedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null);
  const [documentLabel, setDocumentLabel] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({ multiple: false });
    if (!result.canceled) {
      setPickedFile(result.assets[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const submitForm = async () => {
    if (!pickedFile) {
      setError('Pas de fichier sélectionné');
      return;
    }
    setLoading(true);
    setSuccess(false);
    const formData = new FormData();
    // Le backend de Thallia / Assurmoi a probablement besoin du sinistreId aussi si c'est lié au dossier, 
    // ou alors on le parse côté backend avec le label ?
    // Alignement parfait avec le nom des colonnes en DB !
    formData.append("type_document", documentLabel || "Fichier joint");
    formData.append("sinistre_id", sinistreId.toString());

    if (Platform.OS === "web") {
        const webfile = (pickedFile as any).file;
        if (webfile) formData.append("file", webfile);
    } else {
        formData.append("file", {
            uri: pickedFile.uri,
            name: pickedFile.name,
            type: pickedFile.mimeType || 'application/octet-stream'
        } as unknown as Blob);
    }

    try {
        await fetchDocument('/documents', 'POST', formData, true);
        setSuccess(true);
        setPickedFile(null);
        setDocumentLabel('');
        if (onUploadSuccess) onUploadSuccess();
    } catch (err: any) {
        setError(err.message || "Erreur d'upload");
    } finally {
        setLoading(false);
    }
  };

  return (
    <Card style={styles.card} mode="elevated" elevation={1}>
      <Card.Content>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons name="file-upload-outline" size={20} color="#555" />
          <Text style={styles.sectionTitle}>ENVOYER UN DOCUMENT</Text>
        </View>
        <Divider style={styles.divider} />

        {success && (
            <View style={styles.successBox}>
                <MaterialCommunityIcons name="check-circle" size={18} color="#3B6D11" />
                <Text style={styles.successText}>Document envoyé avec succès !</Text>
            </View>
        )}

        <Text style={styles.inputLabel}>Libellé du document</Text>
        <TextInput
          value={documentLabel}
          onChangeText={setDocumentLabel}
          mode="outlined"
          placeholder="Ex : Constat amiable, Facture réparation…"
          style={styles.input}
          outlineStyle={{ borderRadius: 8 }}
          theme={{ colors: { background: '#fff' } }}
        />

        <TouchableOpacity style={styles.pickBtn} onPress={pickDocument} activeOpacity={0.7}>
          <MaterialCommunityIcons name="cloud-upload" size={24} color="#185FA5" style={{ marginBottom: 6 }} />
          <Text style={styles.pickBtnText}>Choisir un fichier</Text>
        </TouchableOpacity>

        {pickedFile && (
          <View style={styles.fileInfo}>
            <MaterialCommunityIcons name="file-document-outline" size={20} color="#27500A" style={{ marginRight: 8 }} />
            <Text style={styles.fileName} numberOfLines={1}>{pickedFile.name}</Text>
            <Text style={styles.fileSize}>
              {pickedFile.size ? `${(pickedFile.size / 1024).toFixed(1)} Ko` : ''}
            </Text>
          </View>
        )}

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          style={[styles.sendBtn, (!pickedFile || loading) && styles.sendBtnDisabled]}
          onPress={submitForm}
          disabled={!pickedFile || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.sendBtnText}>Envoyer le document</Text>
          )}
        </TouchableOpacity>

      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 16, borderRadius: 12, backgroundColor: '#ffffff' },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#555' },
  divider: { marginBottom: 12 },
  inputLabel: { fontSize: 13, color: '#888', marginBottom: 4, fontWeight: '500' },
  input: { marginBottom: 16, backgroundColor: '#fff', fontSize: 14 },
  pickBtn: { 
      borderWidth: 1.5, borderColor: '#185FA5', borderStyle: 'dashed', 
      borderRadius: 12, padding: 16, alignItems: 'center', 
      marginBottom: 16, backgroundColor: '#F4F8FA' 
  },
  pickBtnText: { fontSize: 14, color: '#185FA5', fontWeight: '500' },
  fileInfo: { 
      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', 
      backgroundColor: '#EAF3DE', padding: 12, borderRadius: 8, marginBottom: 16 
  },
  fileName: { fontSize: 13, color: '#27500A', flex: 1, fontWeight: '500' },
  fileSize: { fontSize: 12, color: '#3B6D11' },
  errorText: { color: '#A32D2D', fontSize: 13, marginBottom: 12, textAlign: 'center' },
  successBox: {
      flexDirection: 'row', alignItems: 'center', gap: 6,
      backgroundColor: '#EAF3DE', padding: 12, borderRadius: 8, marginBottom: 16 
  },
  successText: { color: '#3B6D11', fontSize: 13, fontWeight: '500' },
  sendBtn: { backgroundColor: '#185FA5', borderRadius: 8, padding: 14, alignItems: 'center' },
  sendBtnDisabled: { backgroundColor: '#A5C1DC' },
  sendBtnText: { color: '#fff', fontSize: 15, fontWeight: '600' },
});
