// Import react components
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// Import Gifted Chat
import { Bubble, GiftedChat } from "react-native-gifted-chat";

// Create Chat screen component
const Chat = ({ route, navigation, db }) => {
    // Get username, user ID and background color from params from start screen
    const { name, backgroundColor, userID } = route.params;

    // Create messages array state
    const [messages, setMessages] = useState([]);

    // Handle user pressing send button.
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    //Initialize state
    useEffect(() => {
        // Set title to the username.
        navigation.setOptions({ title: name });
    }, []);

    // Set Default test messages
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (documentsSnapshot) => {
            let newMessages = [];
            documentsSnapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis()) });
            });
            setMessages(newMessages);
        });

        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, []);

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: "#000",
                    },
                    left: {
                        backgroundColor: "#fff",
                    },
                }}
            />
        );
    };

    // Return View with Chat.
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: userID,
                    name: name,
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
