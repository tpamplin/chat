// Import React Native components
import { StyleSheet, LogBox, Alert, TurboModuleRegistry } from "react-native";

// Import React components
import { useEffect } from "react";

// Import Screens from components
import Start from "./components/Start.js";
import Chat from "./components/Chat.js";

// Import Navigation Dependencies
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create navigator Stack
const Stack = createNativeStackNavigator();

//Import and initialize firestore.
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

//Import useNetInfo to allow app to know whether or not it is online
import { useNetInfo } from "@react-native-community/netinfo";

// Declare app -- setup navigation screens.
const App = () => {
    // Create constant which hold the App's current connection state.
    const connectionStatus = useNetInfo();

    //Alert user when internet connection is lost.
    useEffect(() => {
        if (connectionStatus.isConnected === false) {
            Alert.alert("Connection lost!");
            disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
            enableNetwork(db);
        }
    }, [connectionStatus.isConnected]);

    //Firebase Configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAGMyXQZPxQ7SU9yXvu6I9APD4RMZm8JMs",
        authDomain: "chat-app-pamplin.firebaseapp.com",
        projectId: "chat-app-pamplin",
        storageBucket: "chat-app-pamplin.firebasestorage.app",
        messagingSenderId: "995725146726",
        appId: "1:995725146726:web:882d61d0dd9af228eb4ba7",
    };

    //Connect to firebase and define database.
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    //React-native navigation handling.
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat">
                    {(props) => <Chat isConnected={connectionStatus.isConnected} db={db} {...props} />}
                </Stack.Screen>
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
