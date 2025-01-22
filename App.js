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

// Declare app
const App = () => {
    return (
        <NavigationContainer style={styles.container}>
            <Stack.Navigator initialRouteName="Start">
                <Stack.Screen name="Start" component={Start} />
                <Stack.Screen name="Chat" component={Chat} />
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
