import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoteDetail = ({ route, navigation }) => {
    const [note, setNote] = useState(route.params?.note || { id: null, title: '', text: '' });

    useEffect(() => {
        navigation.setOptions({ title: note.title ? note.title : 'New Note' });
    }, [note.title]);

    const saveNote = async () => {
        const newNote = {
            ...note,
            text: note.text,
            title: note.text.split('\n')[0] || 'New Note'
        };

        const storedNotes = await AsyncStorage.getItem('notes');
        let notes = storedNotes ? JSON.parse(storedNotes) : [];
        if (note.id) {
            const index = notes.findIndex(n => n.id === note.id);
            notes[index] = newNote;
        } else {
            newNote.id = Date.now().toString();  // Creating a unique ID for new notes
            notes.push(newNote);
        }
        await AsyncStorage.setItem('notes', JSON.stringify(notes));
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                value={note.text}
                onChangeText={(text) => setNote({ ...note, text: text })}
                style={styles.input}
                multiline
                placeholder="Type your note here..."
            />
            <TouchableOpacity style={styles.button} onPress={saveNote}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff' // Light background for the screen
    },
    input: {
        minHeight: 200, // Ensure a decent height for the text input
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        fontSize: 18,
        borderRadius: 5,
        backgroundColor: '#f9f9f9' // Slightly off-white background for the text area
    },
    button: {
        marginTop: 20,
        backgroundColor: '#007BFF', // A pleasing shade of blue
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#ffffff', // White text color
        fontSize: 18, // Slightly larger text for better readability
        fontWeight: 'bold' // Bold font weight for the text
    }
});

export default NoteDetail;
