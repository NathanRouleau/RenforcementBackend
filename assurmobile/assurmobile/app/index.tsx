import { Redirect, useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text, Button, Card, Avatar } from "react-native-paper";
import { useCurrentUser } from "@/contexts/UserContext";


export default function Index() {
  const { user, setUser } = useCurrentUser()!;
  const router = useRouter();
  
  if (!user) {
    return <Redirect href="/login" />;
  }

  const logout = () => setUser(undefined);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          <Avatar.Text 
            size={64} 
            label={user.token ? "👤" : "?"} 
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.title}>
            Bienvenue ! 👋
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Vous êtes connecté avec succès.
          </Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={logout}>
            Se déconnecter
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 16,
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: 24,
    gap: 12,
  },
  avatar: {
    backgroundColor: "#6200ee",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
  },
});