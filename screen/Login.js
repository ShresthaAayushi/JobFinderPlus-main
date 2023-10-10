import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../assets/Colors";
import { StyleSheet } from "react-native";
import Message from "../assets/Message.svg";
import Lock from "../assets/Lock-icon.svg";
import Eyeslash from "../assets/Eye-slash.svg";
import Button from "../components/Button";
import { useState } from "react";
import auth from "@react-native-firebase/auth";
import useAuth from "../hooks/useAuth";

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, showPasswordVisible] = useState(true);

  const { setUserEmail, setUserId, onboarding } = useAuth();
  const validate = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email");
    } else if (password.length === 0) {
      setPassError("Password cannot be empty");
    } else if (password.indexOf(" ") >= 0) {
      setPassError("Password must not contain spaces");
    } else {
      setEmailError("");
      setPassError("");

      onLogin();
    }
  };

  const checkAdmin = () => {
    if (email.includes("admin")) {
      // its an admin
    }
  };

  const onLogin = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        setLoading(false);

        setUserId(response.user.uid);
        setUserEmail(email);

        navigation.navigate(
          onboarding === "pending" ? "Onboarding" : "Dashboard"
        );
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === "auth/invalid-email") {
          alert("email address is invalid!");
        }

        if (error.code === "auth/wrong-password") {
          alert("Sorry!  password does not match!");
        }
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 30 }}>
        <View style={styles.heading}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30 }}>
            Welcome Back !
          </Text>
          <View style={{ width: 227, height: 48, marginTop: 5 }}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: colors.secondary,
              }}
            >
              Fill your details below to log into the page
            </Text>
          </View>
          <View>
            <View style={styles.inputField}>
              <Message height={40} />
              <TextInput
                placeholder="Email Address"
                style={styles.userInput}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                value={email}
              />
            </View>
            <Text style={styles.errorMsg}>{emailError}</Text>
            <View style={styles.inputField}>
              <Lock height={40} />
              <TextInput
                placeholder="Password"
                style={styles.userInput}
                secureTextEntry={passwordVisible}
                onChangeText={(text) => {
                  setPassword(text);
                  setPassError(""); // turns off error message
                }}
                value={password}
              />
              <TouchableOpacity
                onPress={() => showPasswordVisible(!passwordVisible)}
              >
                <Eyeslash height={30} />
              </TouchableOpacity>
            </View>
            <Text style={styles.errorMsg}>{passError}</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Reset")}>
              <Text
                style={{
                  color: colors.secondary,
                  fontFamily: "Poppins-Regular",
                  fontSize: 14,
                  textAlign: "right",
                  marginTop: 10,
                }}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 45 }}>
            <Button
              title={"LOG IN"}
              hasarrow={false}
              onPress={validate}
              loading={loading}
            />
          </View>
          <View style={styles.lText}>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 16 }}>
              New User?
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Bold",
                fontSize: 16,
                marginLeft: 10,
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              Create Account
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
  errorMsg: {
    color: colors.error,
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
