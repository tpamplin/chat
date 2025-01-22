import { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Chat = ({ route, navigation }) => {
    const { name, backgroundColor } = route.params;
    let chatColor;
    backgroundColor === "#090C08" || backgroundColor === "#474056" ? (chatColor = "white") : (chatColor = "black");

    useEffect(() => {
        navigation.setOptions({ title: name });
    });

    return (
        <View style={(styles.container, { backgroundColor })}>
            <Text style={{ color: chatColor }}>Chat!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Chat;
