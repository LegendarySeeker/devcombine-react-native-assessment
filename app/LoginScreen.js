import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native'; 
import { useAuth } from './AuthContext';

const LoginScreen = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        login(username, password);
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUserName}
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;
