// Import react components
import { useState } from "react";

// Import react native components
import { TouchableOpacity, StyleSheet } from "react-native";

// Import ImagePicker library
import * as ImagePicker from "expo-image-picker";

const CustomActions = () => {
    const onActionPress = () => {
        const options = ["Pick Photo", "Take Photo", "Send Location", "Cancel"];
        options.map();

        const cancelButtonIndex = options.length - 1;
    };
    return <TouchableOpacity style={styles.container} onPress={onActionPress}></TouchableOpacity>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
});

export default CustomActions;
