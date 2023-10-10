import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Message from "./Message";
import Profile from "./Profile";
import Setting from "./Setting";
import AddJob from "./AddJob";
import Icon from "react-native-vector-icons/MaterialIcons";
import AntDesignIcons from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelStyle: {
          fontSize: 13,
          paddingBottom: 3,
          paddingTop: 2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel1: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="home" color={color} size={size} />
          ),
          header: () => null,
        }}
      />
      {/* <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarLabel1: "Message",
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="message1" color={color} size={size} />
          ),
          header: () => null,
        }}
      /> */}
      <Tab.Screen
        name="AddJob"
        component={AddJob}
        options={{
          tabBarLabel1: "Add Job",
          tabBarIcon: ({ color, size }) => (
            <Icon name="add-circle-outline" color={color} size={size} />
          ),
          header: () => null,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel1: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesignIcons name="user" color={color} size={size} />
          ),
          header: () => null,
        }}
      />
    </Tab.Navigator>
  );
}
