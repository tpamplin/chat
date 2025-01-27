// Import React Native components
import { StyleSheet } from "react-native";

// Import Screens from components
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";

// Import Navigation Dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create navigator Stack
const Stack = createNativeStackNavigator();

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Declare app -- setup navigation screens.
const App = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyAGMyXQZPxQ7SU9yXvu6I9APD4RMZm8JMs",
        authDomain: "chat-app-pamplin.firebaseapp.com",
        projectId: "chat-app-pamplin",
        storageBucket: "chat-app-pamplin.firebasestorage.app",
        messagingSenderId: "995725146726",
        appId: "1:995725146726:web:882d61d0dd9af228eb4ba7",
    };

    const app = initializeApp(firebaseConfig);

    const db = getFirestore(app);
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat">{(props) => <Chat db={db} {...props} />}</Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// Styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default App;
