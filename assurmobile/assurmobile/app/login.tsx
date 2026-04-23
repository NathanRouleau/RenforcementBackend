import { useRouter } from "expo-router";
import { useCurrentUser } from "@/contexts/UserContext";
import { useState } from "react";
import { View } from "react-native";
import { Button, Card, HelperText, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useCurrentUser()!;
    const router = useRouter();
    
    const login = async () => {
        try {
            //const response = await fetch('http://localhost:3000/login', {
            const response = await fetch('https://spectrum-eagle-underarm.ngrok-free.dev/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password
                })
            });
            console.log('Login', response)
            if (!response.ok) {
                setError('Echec de la connexion');
                return;
            }

            const data = await response.json();
            setUser(data);
            router.replace('/');
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Erreur de connexion');
        }
    };

    return (
        <View>
            <Card>
                <Card.Content>
                    <Text>Connexion</Text>
                    <TextInput 
                        label="Identifiant" 
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput 
                        label="Password" 
                        value={password}
                        onChangeText={setPassword}
                    />
                    <HelperText type='error' visible={Boolean(error)}>
                        {error}
                    </HelperText>
                    <Button 
                        mode="contained" 
                        onPress={ login }
                    >
                        Se connecter
                    </Button>
                </Card.Content>
            </Card>
        </View>
    )
}