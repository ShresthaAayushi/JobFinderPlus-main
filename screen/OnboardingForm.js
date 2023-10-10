import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../assets/Colors";
import Message from "../assets/Message.svg";
import Lock from "../assets/Lock-icon.svg";
import Eyeslash from "../assets/Eye-slash.svg";
import Union from "../assets/Union.svg";
import Button from "../components/Button";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import useAuth from "../hooks/useAuth";
import Icon from "react-native-vector-icons/Feather";

const Onboarding = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const { id, email, setOnboardingUser } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [cpasswordError, setCpasswordError] = useState("");

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const validate = () => {
    console.log("called validate");
    if (!email.includes("@")) {
      setEmailError("Invalid Email");
    } else if (password.length < 6) {
      setPasswordError("Password must contain at least 6 characters");
    } else if (email.length === 0) {
      setEmailError("Email is required");
    } else if (email.indexOf(" ") >= 0) {
      setEmailError("Email should not have spaces");
    } else if (password.indexOf(" ") >= 0) {
      setPasswordError("Password should not have spaces");
    } else if (password !== cpassword) {
      setCpasswordError("Password donot match");
    } else {
      setEmailError("");
      setPasswordError("");
      setCpasswordError("");
      onRegister();
      // alert("New account created successfully");
    }
  };

  const registerDataToFirebase = () => {
    setLoading(true);
    const payload = {
      name,
      userId: id,
      email: email,
      description,
      phoneNumber: phone,
    };

    console.log(payload);
    firestore()
      .collection("users")
      .add(payload)
      .then(() => {
        // user creatd
        setLoading(false);
        setOnboardingUser("completed");
        navigation.navigate("Dashboard", { screen: "Home" });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 30 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heading}>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30 }}>
              Tell us more about yourself
            </Text>
            <View style={{ height: 48, marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: colors.secondary,
                }}
              >
                We collect information in order to know and get you a job which
                fits to your match.
              </Text>
            </View>
            <View style={styles.inputField}>
              <Union height={40} />
              <TextInput
                placeholder="Full Name"
                style={styles.userInput}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputField}>
              <Icon name="phone" size={20} color={"#6A6A6A"} />

              <TextInput
                placeholder="Phone Number"
                style={styles.userInput}
                keyboardType="numeric"
                onChangeText={setPhone}
              />
            </View>

            <View style={styles.inputField}>
              <Icon name="info" size={20} color={"#6A6A6A"} />
              <TextInput
                placeholder="Description"
                onChangeText={setDescription}
                style={[styles.userInput, { height: 100 }]}
                multiline={true}
              />
            </View>
          </View>
          <View style={{ marginTop: 45 }}>
            <Button
              title={"SUBMIT"}
              hasarrow={false}
              onPress={registerDataToFirebase}
              loading={loading}
              loadingText="Processing..."
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    marginTop: 100,
  },
  inputField: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    height: 54,
    borderRadius: 12,
    paddingLeft: 15,
    marginTop: 18,
    paddingRight: 30,
  },
  userInput: {
    border: 0,
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    height: "100%",
    flex: 1,
    marginLeft: 20,
  },
  lText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 70,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default Onboarding;
