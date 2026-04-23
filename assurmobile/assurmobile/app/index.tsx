import { Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Card, ActivityIndicator } from "react-native-paper";
import { useCurrentUser } from "@/contexts/UserContext";
import fetchData from "@/hooks/fetchData";

type Sinistre = {
  id: number;
  immatriculation_vehicule: string;
  nom_prenom_conducteur: string;
  date_heure_sinistre: string;
  contexte: string;
  statut: string;
  pourcentage_responsabilite: number;
  is_conducteur_assure: boolean;
};

const statutStyle: Record<string, { bg: string; text: string }> = {
  'En attente de validation': { bg: '#FAEEDA', text: '#854F0B' },
  'Brouillon':                { bg: '#F1EFE8', text: '#5F5E5A' },
  'Validé':                   { bg: '#EAF3DE', text: '#3B6D11' },
  'Refusé':                   { bg: '#FCEBEB', text: '#A32D2D' },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export default function Index() {
  const { user, isLoading } = useCurrentUser()!;
  const [sinistres, setSinistres] = useState<Sinistre[]>([]);
  const [fetching, setFetching] = useState(true);
  const router = useRouter(); // ✅

  useEffect(() => {
    if (!user) return;
    fetchData('/sinistres', 'GET')
      .then(data => setSinistres(data.sinistres ?? []))
      .catch(console.error)
      .finally(() => setFetching(false));
  }, [user]);

  if (isLoading) return null;
  if (!user) return <Redirect href="/login" />;

  const renderItem = ({ item }: { item: Sinistre }) => {
    const style = statutStyle[item.statut] ?? { bg: '#F1EFE8', text: '#5F5E5A' };
    return (
      // ✅ Wrap dans TouchableOpacity pour naviguer vers le détail
      <TouchableOpacity onPress={() => router.push(`/sinistre/${item.id}`)}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.header}>
              <Text style={styles.id}>#{item.id}</Text>
              <View style={[styles.badge, { backgroundColor: style.bg }]}>
                <Text style={[styles.badgeText, { color: style.text }]}>{item.statut}</Text>
              </View>
            </View>
            <Text style={styles.title}>
              {item.immatriculation_vehicule} — {item.nom_prenom_conducteur}
            </Text>
            <View style={styles.grid}>
              <View style={styles.cell}>
                <Text style={styles.label}>Date sinistre</Text>
                <Text style={styles.value}>{formatDate(item.date_heure_sinistre)}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.label}>Responsabilité</Text>
                <Text style={styles.value}>{item.pourcentage_responsabilite}%</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.label}>Contexte</Text>
                <Text style={styles.value} numberOfLines={2}>{item.contexte}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.label}>Conducteur assuré</Text>
                <Text style={styles.value}>{item.is_conducteur_assure ? 'Oui' : 'Non'}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {fetching ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={sinistres}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <Text style={styles.pageTitle}>Sinistres</Text>
              <Text style={styles.count}>
                {sinistres.length} dossier{sinistres.length > 1 ? 's' : ''}
              </Text>
            </View>
          }
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#f5f5f5' },
  listHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  pageTitle:   { fontSize: 20, fontWeight: '500' },
  count:       { fontSize: 13, color: '#888' },
  card:        { marginBottom: 12, borderRadius: 12 },
  header:      { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  id:          { fontSize: 13, color: '#888' },
  badge:       { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 6 },
  badgeText:   { fontSize: 12, fontWeight: '500' },
  title:       { fontSize: 15, fontWeight: '500', marginBottom: 10 },
  grid:        { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cell:        { width: '47%' },
  label:       { fontSize: 12, color: '#888', marginBottom: 2 },
  value:       { fontSize: 14 },
});