import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from "react-native";

const Start = ({ navigation }) => {
    const [name, setName] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("");
    const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

    useEffect(() => {
        navigation.setOptions({ title: "Chat App" });
    });

    return (
        <ImageBackground source={require("../assets/BackgroundImage.png")} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <Text>Welcome to my chat app!</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your display name"
                />
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
                <Button
                    title="Enter Chat"
                    onPress={() => navigation.navigate("Chat", { name: name, backgroundColor: backgroundColor })}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        marginTop: 15,
        marginBottom: 15,
    },
    image: {
        flex: 1,
        justifyContent: "center",
    },
    colorSelector: {
        flexDirection: "row",
        alignItems: "center",
    },
    color: {
        width: 50,
        height: 50,
        borderRadius: 25,
        margin: 3,
    },
});

export default Start;
