import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';  // FontAwesome icons
// import Profile from "./screens/Profile.js";
import About from "./screens/About.js";
import Menu from "./screens/Menu.js";
import Cart from "./screens/Cart.js";
import Contact from "./screens/Contact.js";
import Checkout from './screens/Checkout.js';
import Login from './screens/login.js';
import Signup from './screens/signUp.js';
import Header from "./components/header.js";
import MenuAdmin from "./screens/MenuCRUD.js";
import { Provider } from './components/context.js';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Menu"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              // Determine which icon to use based on the route name
              if (route.name === "Sign Up") {
                iconName = "user";
              } 
              else if (route.name === "About Us") {
                iconName = "map-marker";
              } 
              else if (route.name === "Menu") {
                iconName = "th-large";
              } 
              else if (route.name === "Cart") {
                iconName = "shopping-cart";
              } 
              else if (route.name === "Contact") {
                iconName = "phone";
              }

              // Render the appropriate FontAwesome icon with the color and size provided
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "white", // Active icon color
            tabBarInactiveTintColor: "gray", // Inactive icon color
            tabBarStyle: { 
              backgroundColor: "#b91c1c", 
              height: 70,
              paddingBottom: 0, // Remove bottom padding
              paddingTop: 0, // Remove top padding
              marginBottom: 0, // Remove bottom margin
            },
            tabBarLabelStyle: { 
              display: "none", 
              padding: 0, // Remove label padding
              margin: 0, // Remove label margin
            },
          })}
        >
          <Tab.Screen name="Sign Up" component={Signup} />
          <Tab.Screen name="About Us" component={About} />
          <Tab.Screen name="Menu" component={Menu} />
          <Tab.Screen name="Cart" component={Cart} />
          <Tab.Screen name="Contact" component={Contact} />
          <Tab.Screen name="Checkout" component={Checkout} />
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Header" component={Header} />
          <Tab.Screen name="Admin" component={MenuAdmin} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
