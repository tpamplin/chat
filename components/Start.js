// Import react components
import { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";

import { getAuth, signInAnonymously } from "firebase/auth";

// Define default view -- this view will be shown when the app is loaded.
const Start = ({ navigation }) => {
    // Define states for username and background color
    const [name, setName] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");

    // An array containing possible background colors
    const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

    const auth = getAuth();

    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                Alert.alert("User signed in successfully.");
                navigation.navigate("Chat", { userID: result.user.uid, name: name, backgroundColor: backgroundColor });
            })
            .catch((error) => {
                Alert.alert("Unable to sign in, ", error.message);
            });
    };

    // Change page title to "Chat App" instead of default "Start"
    useEffect(() => {
        navigation.setOptions({ title: "Chat App" });
    });

    // Return Default view:
    return (
        <ImageBackground source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text>Welcome to my chat app!</Text>
                {/*A place for the user to enter their display name. */}
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your display name"
                />
                {/* Color selection section, lets the user select their preferred background color and sets the chat screen's background to that color. */}
                <Text>Choose your Background Color:</Text>
                <View style={styles.colorSelector}>
                    {colors.map((color, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.color, { backgroundColor: color }]}
                            onPress={() => setBackgroundColor(color)}
                        />
                    ))}
                </View>
                {/* This button will navigate to the chat screen. while sending the username and preferred background color to the chat screen so it can display them. */}
                <Button title="Enter Chat" onPress={signInUser} />
                {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
            </View>
        </ImageBackground>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    // Main container
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    // Username input box
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    // Background image.
    image: {
        flex: 1,
        justifyContent: "center",
    },
    // Background color selection area.
    colorSelector: {
        flexDirection: "row",
        alignItems: "center",
    },
    // Background color selection buttons.
    color: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 3,
    },
});

export default Start;
