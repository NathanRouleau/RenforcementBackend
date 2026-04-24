import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, ActivityIndicator } from "react-native-paper";
import { useCurrentUser } from "@/contexts/UserContext";
import { useApi } from "@/hooks/useApi";
import SinistreCard from "@/components/SinistreCard";
import { Sinistre } from "@/models/types";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Index() {
  const { user, isLoading: userLoading } = useCurrentUser()!;
  const router = useRouter();
  const { data, loading: apiLoading, request } = useApi<{ sinistres: Sinistre[] }>();

  // Fetch data on mount and user available
  useEffect(() => {
    if (user) {
      request('/sinistres', 'GET');
    }
  }, [user]);

  if (userLoading) return null;
  if (!user) return <Redirect href="/login" />;

  const sinistres = data?.sinistres ?? [];
  const loading = apiLoading && sinistres.length === 0;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 60 }} size="large" color="#185FA5" />
      ) : (
        <FlatList
          data={sinistres}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <SinistreCard sinistre={item} />}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.listHeader}>
              <View>
                <Text style={styles.pageTitle}>Mes Sinistres</Text>
                <Text style={styles.count}>
                  {sinistres.length} dossier{sinistres.length > 1 ? 's' : ''} en cours
                </Text>
              </View>
              <TouchableOpacity style={styles.addBtn} onPress={() => router.push('/create-sinistre')}>
                <MaterialCommunityIcons name="plus" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          }
          contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#F0F4F8' },
  listHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 },
  pageTitle:   { fontSize: 26, fontWeight: 'bold', color: '#1B2A4A' },
  count:       { fontSize: 14, color: '#6A7D9A', marginTop: 4 },
  addBtn:      { 
    backgroundColor: '#185FA5', 
    width: 48, 
    height: 48, 
    borderRadius: 24, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#185FA5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4
  }
});