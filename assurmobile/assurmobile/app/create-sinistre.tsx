import { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, TextInput, Button, Switch, Divider, ActivityIndicator } from "react-native-paper";
import { useRouter } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CreateSinistreScreen() {
    const router = useRouter();
    const { request, loading, error } = useApi();
    
    // Form fields
    const [immatriculation, setImmatriculation] = useState('');
    const [nomConducteur, setNomConducteur] = useState('');
    const [contexte, setContexte] = useState('');
    const [isConducteurAssure, setIsConducteurAssure] = useState(true);
    
    const handleSubmit = async () => {
        if (!immatriculation || !nomConducteur || !contexte) {
            alert('Veuillez remplir les champs obligatoires.');
            return;
        }

        try {
            // "Créer un sinistre" route
            await request('/sinistres', 'POST', {
                immatriculation_vehicule: immatriculation,
                nom_prenom_conducteur: nomConducteur,
                contexte: contexte,
                is_conducteur_assure: isConducteurAssure,
                date_heure_sinistre: new Date().toISOString(),
                // Champs requis par le backend (bouchonnés pour l'exemple)
                assure_id: 1, 
                contrat_id: 1, 
                responsabilite_engagee: false,
                pourcentage_responsabilite: 0,
                statut: "EN ATTENTE DE VALIDATION"
            });
            alert('Sinistre déclaré avec succès !');
            router.replace('/'); 
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.pageTitle}>Déclarer un sinistre</Text>
            <Text style={styles.subtitle}>Saisissez les informations relatives à votre accident ou réclamation.</Text>

            <Card style={styles.card} elevation={1}>
                <Card.Content>
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="car-info" size={22} color="#185FA5" />
                        <Text style={styles.sectionTitle}>Véhicule & Conducteur</Text>
                    </View>
                    <Divider style={styles.divider} />

                    <TextInput
                        label="Immatriculation *"
                        value={immatriculation}
                        onChangeText={setImmatriculation}
                        mode="outlined"
                        style={styles.input}
                        theme={{ colors: { background: '#fff' } }}
                    />

                    <TextInput
                        label="Nom et Prénom du conducteur *"
                        value={nomConducteur}
                        onChangeText={setNomConducteur}
                        mode="outlined"
                        style={styles.input}
                        theme={{ colors: { background: '#fff' } }}
                    />

                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>Le conducteur est-il l'assuré ?</Text>
                        <Switch 
                            value={isConducteurAssure} 
                            onValueChange={setIsConducteurAssure} 
                            color="#185FA5"
                        />
                    </View>
                </Card.Content>
            </Card>

            <Card style={styles.card} elevation={1}>
                <Card.Content>
                    <View style={styles.sectionHeader}>
                        <MaterialCommunityIcons name="text-box-outline" size={22} color="#185FA5" />
                        <Text style={styles.sectionTitle}>Contexte de l'accident</Text>
                    </View>
                    <Divider style={styles.divider} />

                    <TextInput
                        label="Décrivez les circonstances *"
                        value={contexte}
                        onChangeText={setContexte}
                        mode="outlined"
                        multiline
                        numberOfLines={4}
                        style={styles.textArea}
                        theme={{ colors: { background: '#fff' } }}
                    />
                </Card.Content>
            </Card>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <Button 
                mode="contained" 
                onPress={handleSubmit} 
                loading={loading}
                disabled={loading}
                style={styles.submitBtn}
                contentStyle={styles.submitBtnContent}
                labelStyle={styles.submitBtnLabel}
            >
                Soumettre la déclaration
            </Button>
            
            <Button 
                mode="outlined" 
                onPress={() => router.back()} 
                style={styles.cancelBtn}
            >
                Annuler
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    content: { padding: 16, paddingBottom: 40 },
    pageTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
    card: { marginBottom: 16, borderRadius: 12, backgroundColor: '#fff' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
    sectionTitle: { fontSize: 16, fontWeight: '600', color: '#222' },
    divider: { marginBottom: 16 },
    input: { marginBottom: 12 },
    textArea: { marginBottom: 12 },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, paddingVertical: 8 },
    switchLabel: { fontSize: 15, color: '#444' },
    errorText: { color: '#D32F2F', textAlign: 'center', marginBottom: 16, fontWeight: '500' },
    submitBtn: { borderRadius: 8, backgroundColor: '#185FA5', marginBottom: 12 },
    submitBtnContent: { paddingVertical: 6 },
    submitBtnLabel: { fontSize: 16, fontWeight: 'bold' },
    cancelBtn: { borderRadius: 8, borderColor: '#ccc' },
});
