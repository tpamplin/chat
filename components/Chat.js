// Import react components
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

// Import Gifted Chat
import { GiftedChat } from "react-native-gifted-chat";

// Create Chat screen component
const Chat = ({ route, navigation }) => {
    // Get username and background color from params from start screen
    const { name, backgroundColor } = route.params;

    //set text color to white with dark background or black with light background
    let chatColor;
    backgroundColor === "#090C08" || backgroundColor === "#474056" ? (chatColor = "white") : (chatColor = "black");

    // Create messages array state
    const [messages, setMessages] = useState([]);

    // Handle user pressing send button.
    const onSend = (newMessages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    };

    //Initialize state
    useEffect(() => {
        // Set title to the username.
        navigation.setOptions({ title: name });
    }, []);

    // Set Default test messages
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
        ]);
    }, []);

    // Return View with Chat.
    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1,
                }}
            />
            {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

// Export Chat screen as react component.
export default Chat;
