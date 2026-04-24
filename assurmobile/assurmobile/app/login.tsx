import { useRouter } from "expo-router";
import { useCurrentUser } from "@/contexts/UserContext";
import { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Card, HelperText, Text, TextInput } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { setUser } = useCurrentUser()!;
    const router = useRouter();
    
    const login = async () => {
        setLoading(true);
        setError(null);
        try {
            // const response = await fetch('https://spectrum-eagle-underarm.ngrok-free.dev/login', {
            const response = await fetch('http://127.0.0.1:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
                
            if (!response.ok) {
                setError('Identifiant ou mot de passe incorrect');
                setLoading(false);
                return;
            }

            const data = await response.json();
            await setUser(data);
            router.replace('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Erreur de connexion serveur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <View style={styles.logoContainer}>
                <MaterialCommunityIcons name="shield-check" size={80} color="#185FA5" />
                <Text style={styles.appName}>AssurMoi</Text>
            </View>

            <Card style={styles.card} elevation={2}>
                <Card.Content>
                    <Text style={styles.title}>Connexion</Text>
                    
                    <TextInput 
                        label="Identifiant" 
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        style={styles.input}
                        autoCapitalize="none"
                        left={<TextInput.Icon icon="account" />}
                    />
                    <TextInput 
                        label="Mot de passe" 
                        value={password}
                        onChangeText={setPassword}
                        mode="outlined"
                        secureTextEntry
                        style={styles.input}
                        left={<TextInput.Icon icon="lock" />}
                    />
                    
                    <HelperText type='error' visible={Boolean(error)}>
                        {error}
                    </HelperText>
                    
                    <Button 
                        mode="contained" 
                        onPress={login}
                        loading={loading}
                        disabled={loading}
                        style={styles.btn}
                        contentStyle={styles.btnContent}
                    >
                        Se connecter
                    </Button>
                </Card.Content>
            </Card>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F4F8', justifyContent: 'center', padding: 20 },
    logoContainer: { alignItems: 'center', marginBottom: 40 },
    appName: { fontSize: 32, fontWeight: 'bold', color: '#185FA5', marginTop: 10 },
    card: { borderRadius: 16, backgroundColor: '#fff', paddingVertical: 10 },
    title: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 20, textAlign: 'center' },
    input: { marginBottom: 12, backgroundColor: '#fff' },
    btn: { marginTop: 10, borderRadius: 8, backgroundColor: '#185FA5' },
    btnContent: { paddingVertical: 6 },
});