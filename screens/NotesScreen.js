import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome, adjust if using another icon set

const NotesScreen = ({ navigation }) => {
    const [notes, setNotes] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            loadNotes();
        }
    }, [isFocused]);

    const loadNotes = async () => {
        const storedNotes = await AsyncStorage.getItem('notes');
        setNotes(storedNotes ? JSON.parse(storedNotes) : []);
    };

    const deleteNote = async (id) => {
        const updatedNotes = notes.filter(note => note.id !== id);
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        setNotes(updatedNotes);
    };

    const handleDelete = (id) => {
        Alert.alert("Delete Note", "Are you sure you want to delete this note?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", onPress: () => deleteNote(id), style: "destructive" }
        ]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.note}>
            <TouchableOpacity style={styles.noteContent} onPress={() => navigation.navigate('NoteDetail', { note: item })}>
                <Text style={styles.noteText}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.previewText}>{item.text}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(item.id)}>
                <Icon name="trash" size={24} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={notes}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NoteDetail')}>
                <Icon name="plus" size={30} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    note: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#f9f9f9'
    },
    noteContent: {
        flex: 1,
    },
    noteText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    previewText: {
        fontSize: 14
    },
    deleteIcon: {
        padding: 10,
    },
    addButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default NotesScreen;
