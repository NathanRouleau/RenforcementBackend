import { UserProvider } from "@/contexts/UserContext";
import { Stack } from "expo-router";
import { PaperProvider, MD3LightTheme } from 'react-native-paper';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#185FA5',
    primaryContainer: '#D1E4F6',
    secondary: '#3B6D11',
    secondaryContainer: '#EAF3DE',
    background: '#F0F4F8',
    surface: '#FFFFFF',
    surfaceVariant: '#FAFAFA',
    error: '#B00020',
  },
  roundness: 12,
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <UserProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#185FA5' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: 'bold' }
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Accueil' }} />
          <Stack.Screen name="login" options={{ title: 'Connexion' }} />
          <Stack.Screen name="create-sinistre" options={{ title: 'Nouveau Sinistre' }} />
          <Stack.Screen name="sinistre/[id]" options={{ title: 'Détail du Sinistre' }} />
        </Stack>
      </UserProvider>
    </PaperProvider>
  );
}
