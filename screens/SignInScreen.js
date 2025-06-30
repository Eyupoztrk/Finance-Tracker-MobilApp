import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignInScreen = () => {
    const API_URL = 'http://192.168.1.2:3000/api/users/auth';

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSignIn = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            console.log(JSON.stringify({ email, password }));


            const resData = await response.json();
            console.log("Sunucudan gelen:", resData);


            if (resData.code == "200") {
                const { token, user } = resData.data;

                await AsyncStorage.setItem('token', token);

                alert('Giriş Başarılı', `Hoş geldin ${user.email}`);
                handleSuccessSignIn(user, token);
            } else {
                alert('Giriş Hatası', resData.error?.message || 'Hatalı giriş');
            }

        } catch (error) {
            console.error(error);
            alert('Sunucu Hatası', 'Bir şeyler ters gitti.');
        }
    };


    const handleSignUp = () => {
        navigation.navigate('SignUp');

    };

    const handleSuccessSignIn = (user, token) => {
        navigation.navigate("MainScreen", {
            user,
            token,
        });
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Hoş Geldiniz!</Text>
                <Text style={styles.subtitle}>Giriş yaparak devam edin</Text>

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
                    secureTextEntry // Şifrenin gizli görünmesini sağlar
                />

                <TouchableOpacity style={styles.button} onPress={handleSignIn}>
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>

                <View style={styles.signupContainer}>
                    <Text style={styles.signupText}>Hesabınız yok mu? </Text>
                    <TouchableOpacity onPress={handleSignUp}>
                        <Text style={[styles.signupText, styles.signupLink]}>Kayıt Olun</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

// Stil tanımlamaları
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
        backgroundColor: '#007bff',
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
    signupContainer: {
        marginTop: 20,
        flexDirection: 'row',
    },
    signupText: {
        fontSize: 14,
        color: '#555',
    },
    signupLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default SignInScreen;
