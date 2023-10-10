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

import Stepper from "react-native-stepper-ui";

const AddJob = ({ navigation }) => {
  const [form, setForm] = useState({});

  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);

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
  const onRegister = (payload) => {
    console.log("called");

    console.log(payload);
    firestore()
      .collection("jobs")
      .add(payload)
      .then(() => {
        // user creatd
        setLoading(false);

        alert("Job created successfully.");
      });
  };

  const Form1 = () => {
    const [jobTitle, setJobTitle] = useState("");
    const [salary, setSalary] = useState("");
    const [jobType, setJobType] = useState("");
    const [keywords, setKeywords] = useState("");

    const handleNext = () => {
      // Validate form inputs
      if (!jobTitle || !salary || !jobType || !keywords) {
        alert("Please fill in all the fields.");
        return;
      }

      setActive(active + 1);

      setForm({
        ...form,
        keywords: keywords,
        salary: salary,
        title: jobTitle,
        type: jobType,
      });
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.heading}>
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30 }}>
                Job description
              </Text>
              <View style={{ width: 227, height: 48, marginTop: 5 }}>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: colors.secondary,
                  }}
                >
                  Fill up the requirements that match with JD
                </Text>
              </View>

              <View style={styles.inputField}>
                <TextInput
                  placeholder="Job title"
                  style={styles.userInput}
                  onChangeText={setJobTitle}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  value={salary}
                  placeholder="Salary"
                  style={styles.userInput}
                  onChangeText={setSalary}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  placeholder="Type"
                  style={styles.userInput}
                  onChangeText={setJobType}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  placeholder="Keywords"
                  style={styles.userInput}
                  onChangeText={setKeywords}
                />
              </View>

              <View style={{ marginTop: 10 }}>
                <Button title={"NEXT"} onPress={handleNext} />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  const Form2 = () => {
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [companyDesc, setCompanyDesc] = useState("");
    const [companyEmail, setCompanyEmail] = useState("");
    const [companywebsite, setCompanyWebsite] = useState("");

    const handleSubmit = () => {
      // Validate form inputs
      if (
        !companyName ||
        !companyAddress ||
        !companyDesc ||
        !companyEmail ||
        !companyWebsite
      ) {
        alert("Please fill in all the fields.");
        return;
      }

      onRegister({
        ...form,
        address: companyAddress,
        description: companyDesc,
        company_email: companyEmail,
        company_name: companyName,
      });
    };

    return (
      <SafeAreaView style={{ flex: 1, padding: 10 }}>
        <View style={{ flex: 1, padding: 10 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.heading}>
              <Text style={{ fontFamily: "Poppins-Bold", fontSize: 30 }}>
                Extra details (Company Info)
              </Text>
              <View style={{ width: 227, height: 48, marginTop: 5 }}>
                <Text
                  style={{
                    fontFamily: "Poppins-Regular",
                    fontSize: 16,
                    color: colors.secondary,
                  }}
                >
                  Fill up the company information
                </Text>
              </View>
              <View style={styles.inputField}>
                <TextInput
                  placeholder="Company Name"
                  style={styles.userInput}
                  onChangeText={setCompanyName}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  placeholder="Company Address"
                  style={styles.userInput}
                  onChangeText={setCompanyAddress}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  multiline={true}
                  placeholder="Company Description"
                  style={styles.userInput}
                  onChangeText={setCompanyDesc}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  placeholder="Company Website(http://facebook.com) "
                  style={styles.userInput}
                  onChangeText={setCompanyWebsite}
                />
              </View>

              <View style={styles.inputField}>
                <TextInput
                  placeholder="Email Address"
                  style={styles.userInput}
                  onChangeText={setCompanyEmail}
                />
              </View>

              <View style={{ marginTop: 15 }}>
                <Button title={"SUBMIT"} onPress={handleSubmit} />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };

  const content = [<Form1 />, <Form2 />];

  if (active === 0) {
    return <Form1 />;
  }

  return <Form2 />;
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

export default AddJob;
