import { View, Text, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { colors } from "../assets/Colors";
import { StyleSheet } from "react-native";
import Message from "../assets/Message.svg";
import Button from "../components/Button";
import { useState } from "react";

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }

  return false;
}

export default function Reset({ navigation }) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    if (!validateEmail(email)) {
      setEmailError("Invalid email");
    } else if (email.length === 0) {
      setEmailError("PLease enter email");
    } else {
      setEmailError("");
      alert("The password reset code has been sent to your email.");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 30 }}>
        <View style={styles.heading}>
          <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30 }}>
            Reset Password!!!
          </Text>
          <View style={{ width: 227, height: 48, marginTop: 5 }}>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 16,
                color: colors.secondary,
              }}
            >
              Enter your email below to receive your password reset code!
            </Text>
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
              value={email}
            />
          </View>
          <Text style={styles.errorMsg}>{emailError}</Text>
        </View>
        <View style={{ marginTop: 45 }}>
          <Button title={"SUBMIT"} hasarrow={false} onPress={validate} />
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

  errorMsg: {
    color: colors.error,
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    marginTop: 5,
    marginBottom: 5,
  },
});
