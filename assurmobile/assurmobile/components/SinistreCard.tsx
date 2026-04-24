import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import StatusBadge from "./StatusBadge";
import { Sinistre } from "../models/types";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function SinistreCard({ sinistre }: { sinistre: Sinistre }) {
    const router = useRouter();

    return (
      <TouchableOpacity onPress={() => router.push(`/sinistre/${sinistre.id}`)} activeOpacity={0.8}>
        <Card style={styles.card} mode="elevated" elevation={2}>
          <Card.Content>
            <View style={styles.header}>
              <View style={styles.idContainer}>
                <MaterialCommunityIcons name="shield-car" size={20} color="#185FA5" />
                <Text style={styles.id}>#{sinistre.id}</Text>
              </View>
              <StatusBadge statut={sinistre.statut} />
            </View>

            <Text style={styles.title}>
              {sinistre.immatriculation_vehicule} — {sinistre.nom_prenom_conducteur}
            </Text>

            <View style={styles.grid}>
              <View style={styles.cell}>
                <Text style={styles.label}>Date sinistre</Text>
                <Text style={styles.value}>{formatDate(sinistre.date_heure_sinistre)}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.label}>Responsabilité</Text>
                <Text style={styles.value}>{sinistre.pourcentage_responsabilite}%</Text>
              </View>
              <View style={styles.cellFull}>
                <Text style={styles.label}>Contexte</Text>
                <Text style={styles.value} numberOfLines={2}>{sinistre.contexte}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  idContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  id: {
    fontSize: 14,
    color: '#888',
    fontWeight: '600',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  cell: {
    width: '45%',
  },
  cellFull: {
    width: '100%',
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 14,
    color: '#222',
  },
});
