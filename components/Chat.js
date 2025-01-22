// Import react components
import { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

// Create Chat screen component
const Chat = ({ route, navigation }) => {
    // Get username and background color from params from start screen
    const { name, backgroundColor } = route.params;
    //set text color to white with dark background or black with light background
    let chatColor;
    backgroundColor === "#090C08" || backgroundColor === "#474056" ? (chatColor = "white") : (chatColor = "black");

    // Set title to the username.
    useEffect(() => {
        navigation.setOptions({ title: name });
    });

    // Return View with Chat.
    return (
        <View style={(styles.container, { backgroundColor })}>
            <Text style={{ color: chatColor }}>Chat!</Text>
        </View>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

// Export Chat screen as react component.
export default Chat;
