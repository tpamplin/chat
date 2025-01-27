// Import react components
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";

//Import Firebase components, so the app can access the firestore database.
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

// Import GiftedChat to handle the chat UI
import { Bubble, InputToolbar, GiftedChat } from "react-native-gifted-chat";

//Import AsyncStorage so messages can be stored and viewed offline
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create Chat screen component
const Chat = ({ route, navigation, db, isConnected }) => {
    // Get username, user ID and background color from params from start screen
    const { name, backgroundColor, userID } = route.params;

    // Create messages array state
    const [messages, setMessages] = useState([]);

    // Handle user pressing send button.
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    //Store messages in AsyncStorage.
    const storeMessages = async (messagesToStore) => {
        try {
            await AsyncStorage.setItem("oldMessages", JSON.stringify(messagesToStore));
        } catch (error) {
            console.log(error.message);
        }
    };

    //Load messages from AsyncStorage
    const loadStoredMessages = async () => {
        const storedMessages = (await AsyncStorage.getItem("oldMessages")) || [];
        setMessages(JSON.parse(storedMessages));
    };

    //create onSnapshot listener to listen to the messages collection in db, and update messages array whenever there is a change.
    let unsubMessages;
    useEffect(() => {
        //set page title to user's username
        navigation.setOptions({ title: name });

        if (isConnected === true) {
            // Deregister current onSnapshot listener to avoid having multiple running concurrently, since useEffect will be called whenever there is a change in connection status.
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            //define the query location so onSnapshot knows where to look for updates
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

            // Load messages from firestore database whenever the database is updated
            unsubMessages = onSnapshot(q, (documentsSnapshot) => {
                let newMessages = [];
                documentsSnapshot.forEach((doc) => {
                    // Adds new messages to the newMessages array in the order that they were created.
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });

                //store messages in AsyncStorage and update messages array with new messages.
                storeMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadStoredMessages();

        //Clean up code!
        return () => {
            if (unsubMessages) unsubMessages();
        };
    }, [isConnected]);

    //Changes the color of chat bubbles based on if they are from the current user (right) or a different user (left)
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

    //only render toolbar if connection is online
    const renderInputToolbar = (props) => {
        if (isConnected === true) {
            return <InputToolbar {...props} />;
        } else return null;
    };
    // Return View with Chat.
    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
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
