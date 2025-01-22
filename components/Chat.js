import { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

const Chat = ({ route, navigation }) => {
    const { name } = route.params;

    useEffect(() => {
        navigation.setOptions({ title: "Chatroom" });
    });

    return (
        <View style={styles.container}>
            <Text>Chat!</Text>
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
