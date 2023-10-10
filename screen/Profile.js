import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { colors } from "../assets/Colors";
import Button from "../components/Button";
import Icon from "../components/Icon";
import useAuth from "../hooks/useAuth";
import firestore from "@react-native-firebase/firestore";

const profile = {
  name: "Rajeshwory ",
  email: "abcdef@gmail.com",
};
export default function Profile({ navigation }) {
  const { id, email, setName, setUserEmail, setUserId } = useAuth();

  const [editable, setEditable] = useState(false);

  const [user, setUser] = useState({}); // from firebase data
  const onLogout = () => {
    setUserId("");
    setName("");
    setUserEmail("");
    navigation.navigate("Login");
  };

  useEffect(() => {
    firestore()
      .collection("users")
      .where("userId", "==", "WfFRGmU89EfriOytIYAW0N8NP2v1")
      .get()
      .then((response) => {
        setUser(response.docs[0]._data);
        console.log("response", response.docs[0]._data);
      });
    // user creatd
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.proCont}>
        <Icon pageName={"Profile"} navigation={navigation} />
        <View style={{ marginTop: 10, alignItems: "center" }}>
          <Image source={require("../assets/lady.jpg")} style={styles.Img} />
          <Text
            style={{
              fontFamily: "Poppins-SemiBold",
              fontSize: 28,
              marginTop: 5,
            }}
          >
            {user.name}
          </Text>

          <TouchableOpacity onPress={() => setEditable(true)}>
            <Text
              style={{
                fontFamily: "Poppins-Medium",
                fontSize: 15,
                color: colors.secondary,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25, display: "flex" }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: colors.secondary,
              fontSize: 18,
            }}
          >
            Name
          </Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={user.name}
            editable={editable}
          />
        </View>
        <View style={{ marginTop: 18, display: "flex" }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: colors.secondary,
              fontSize: 18,
            }}
          >
            Email
          </Text>

          <TextInput
            placeholder="Email Address"
            style={styles.input}
            value={email}
            editable={editable}
          />
        </View>

        <View style={{ marginTop: 18, display: "flex" }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: colors.secondary,
              fontSize: 18,
            }}
          >
            Phone Number
          </Text>

          <TextInput
            placeholder="Phone Number"
            style={styles.input}
            value={user.phoneNumber}
            editable={editable}
          />
        </View>

        <View style={{ marginTop: 18, display: "flex" }}>
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: colors.secondary,
              fontSize: 18,
            }}
          >
            Bio
          </Text>

          <TextInput
            placeholder="Bio"
            style={styles.input}
            value={user.description}
            editable={editable}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Button title={"Logout"} hasarrow={false} onPress={onLogout} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  proCont: {
    padding: 20,
  },
  Img: {
    height: 80,
    width: 80,
    borderRadius: 50,
    marginLeft: 20,
  },
  input: {
    backgroundColor: "white",
    height: 46,
    marginVertical: 10,
    marginRight: 10,
    borderRadius: 6,
    paddingLeft: 15,
    fontSize: 18,
    marginBottom: 10,
  },
});
