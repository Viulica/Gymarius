import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { askChatbot } from '../services/ChatbotService';
import { useIsFocused } from '@react-navigation/native';
import { useChat } from './ChatContext';
import { KeyboardAvoidingView, Platform } from 'react-native';


const ChatScreen = ({ route }) => {
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    const { chatHistory, setChatHistory } = useChat();


    const sendToChatbot = async (message) => {
        setIsLoading(true);
        try {
            // You will need to adapt your chatbot service to handle this message format
            const botResponse = await askChatbot(message);
            setChatHistory(prev => [...prev, { role: 'system', content: botResponse }]);
        } catch (error) {
            console.error('Error communicating with chatbot:', error);
            setChatHistory(prev => [...prev, { role: 'system', content: "Failed to fetch response. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };
    const handleSend = async () => {
        if (!input.trim()) {
            return;
        }
        const userMessage = { role: 'user', content: input.trim() };
        const updatedHistory = [...chatHistory, userMessage];
        setInput('');
        setIsLoading(true);
        try {
            const botResponse = await askChatbot([...updatedHistory, userMessage]); // Ensure API can handle this
            setChatHistory([...updatedHistory, { role: 'system', content: botResponse }]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory([...updatedHistory, { role: 'system', content: "Failed to fetch response. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: 50 }}  // Extra padding to ensure nothing is hidden behind the input
                keyboardShouldPersistTaps='handled'
            >
                {chatHistory.map((item, index) => (
                    <Text key={index} style={[styles.message, item.role === 'user' ? styles.userMessage : styles.systemMessage]}>
                        {item.role === 'user' ? `You: ${item.content}` : item.content}
                    </Text>
                ))}
            </KeyboardAwareScrollView>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"} 
                style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust this value based on your needs
            >
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, margin: 60 }}
                    placeholder="Type a message..."
                    returnKeyType="send"
                    onSubmitEditing={handleSend}
                />
        </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'absolute',  // Fixes the TextInput at the bottom
        left: 0,
        right: 0,
        bottom: 0,
        padding: 10,
        backgroundColor: '#fff'  // Optional: change as per your UI scheme
    },
    message: {
        marginTop: 20,
        fontSize: 16,
        padding: 1,
        borderRadius: 10,
        marginBottom: 5,
    },
    userMessage: {
        backgroundColor: '#D1E8FF',
        alignSelf: 'flex-end',
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10, // Increased spacing
    },
    systemMessage: {
        backgroundColor: '#FFF1CC',
        alignSelf: 'flex-start',
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 10, // Increased spacing
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
    }
});


export default ChatScreen;