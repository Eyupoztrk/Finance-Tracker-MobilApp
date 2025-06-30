import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const SignUpScreen = () => {
    const navigation = useNavigation();

    const [firstName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currency, setCurrency] = useState('');

    const [data, setData] = useState([])

    const API_URL = 'http://192.168.1.2:3000/api/users/signup'; 

    const handleSignUp = async () => {
        console.log('Kayıt Olunuyor:', { firstName, lastName, currency, email, password });
        if (!firstName || !lastName || !currency || !email || !password) {
            alert('Lütfen tüm alanları doldurun.');
            return;
        }
        //API

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    currency
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Sunucu hatası: ${response.status} - ${errorText}`);
            }

            const jsonResponse = await response.json();
            setData(jsonResponse);
             console.log('Kayıt Olundu:', { firstName, lastName, currency, email, password });
            navigation.navigate('MainScreen');
        } catch (err) {
            console.error("Kayıt sırasında hata:", err);
            alert("Kayıt başarısız oldu.");
        }


    };

    const handleSignIn = () =>{
        navigation.navigate("SignIn")
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Hesap Oluşturun</Text>
                <Text style={styles.subtitle}>Aramıza katılın!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="İsim "
                    placeholderTextColor="#888"
                    value={firstName}
                    onChangeText={setName}
                    autoCapitalize="words"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Soyisim "
                    placeholderTextColor="#888"
                    value={lastName}
                    onChangeText={setLastName}
                    autoCapitalize="words"
                />

                <TextInput
                    style={styles.input}
                    placeholder="E-posta Adresiniz"
                    placeholderTextColor="#888"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Şifreniz"
                    placeholderTextColor="#888"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TextInput
                    style={styles.input}
                    placeholder="Para Birimi"
                    placeholderTextColor="#888"
                    value={currency}
                    onChangeText={setCurrency}
                    autoCapitalize="words"
                />

                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>

                <View style={styles.signinContainer}>
                    <Text style={styles.signinText}>Zaten bir hesabınız var mı? </Text>
                    <TouchableOpacity onPress={handleSignIn}>
                        <Text style={[styles.signinText, styles.signinLink]}>Giriş Yapın</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#28a745', 
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signinContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
    signinText: {
        fontSize: 14,
        color: '#555',
    },
    signinLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default SignUpScreen;
