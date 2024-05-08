import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const ExercisePicker = ({ exercises, selectedValue, onChange }) => {
    const [open, setOpen] = useState(false); // State to manage dropdown visibility
    const [items, setItems] = useState(exercises.map(ex => ({
        label: `${ex.name} - ${ex.type}`, 
        value: ex.id
    }))); // State to manage dropdown items

    return (
        <View style={styles.container}>
            <DropDownPicker
                open={open}
                value={selectedValue}
                items={items}
                setOpen={setOpen}
                setValue={onChange}
                setItems={setItems}
                searchable={true}
                placeholder="Select an exercise"
                searchPlaceholder="Search exercises..."
                listMode="MODAL"
                modalProps={{
                    animationType: "slide"
                }}
                modalContentContainerStyle={styles.modalContentContainerStyle}
                searchTextInputStyle={styles.searchTextInputStyle}
                zIndex={3000} // Ensure zIndex is high enough if being used within a modal or similar component
                zIndexInverse={1000} // Lower zIndex for the items so they are below the other UI components
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: '50%', // Adjust as needed
        backgroundColor: '#f9f9f9',
    },
    modalContentContainerStyle: {
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    searchTextInputStyle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    }
});

export default ExercisePicker;
