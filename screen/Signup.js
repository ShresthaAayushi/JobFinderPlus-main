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

const Signup = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
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
  const onRegister = () => {
    console.log("called");
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setLoading(false);
        registerDataToFirebase(response.user.uid);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
        if (error.code === "auth/email-already-in-use") {
          alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          alert("That email address is invalid!");
        }

        console.error(error);
      });
  };

  const registerDataToFirebase = (userId) => {
    const payload = {
      name,
      userId,
      email: email,
      description: "",
      phoneNumber: phone,
    };

    firestore()
      .collection("users")
      .add(payload)
      .then(() => {
        // user creatd
        navigation.navigate("Login");
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 30 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heading}>
            <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30 }}>
              Register Account
            </Text>
            <View style={{ width: 227, height: 48, marginTop: 5 }}>
              <Text
                style={{
                  fontFamily: "Poppins-Regular",
                  fontSize: 16,
                  color: colors.secondary,
                }}
              >
                Fill your details to create new account
              </Text>
            </View>
            <View style={styles.inputField}>
              <Union height={40} />
              <TextInput placeholder="User Name" style={styles.userInput} />
            </View>
            <View style={styles.inputField}>
              <Message height={40} />
              <TextInput
                placeholder="Email Address"
                style={styles.userInput}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
              />
            </View>
            {emailError !== "" && (
              <Text style={styles.error}>{emailError}</Text>
            )}

            <View style={styles.inputField}>
              <Lock height={40} />
              <TextInput
                placeholder="Password"
                style={styles.userInput}
                secureTextEntry={!passwordShow}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
              />
              <TouchableOpacity onPress={() => setPasswordShow(!passwordShow)}>
                <Eyeslash height={30} />
              </TouchableOpacity>
            </View>
            {passwordError !== "" && (
              <Text style={styles.error}>{passwordError}</Text>
            )}

            <View style={styles.inputField}>
              <Lock height={40} />
              <TextInput
                placeholder="Confirm Password"
                style={styles.userInput}
                secureTextEntry={!confirmPasswordShow}
                onChangeText={(text) => {
                  setCpassword(text);
                  setCpasswordError("");
                }}
              />
              <TouchableOpacity
                onPress={() => setConfirmPasswordShow(!confirmPasswordShow)}
              >
                <Eyeslash height={30} />
              </TouchableOpacity>
            </View>
            {cpasswordError !== "" && (
              <Text style={styles.error}>{cpasswordError}</Text>
            )}
          </View>
          <View style={{ marginTop: 45 }}>
            <Button
              title={"SIGN UP"}
              hasarrow={false}
              onPress={validate}
              loading={loading}
              loadingText="Processing..."
            />
          </View>
          <View style={styles.lText}>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
              Already have an account?
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 16,
                marginLeft: 10,
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Log in
            </Text>
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

export default Signup;
