import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import React, { useState, useEffect } from "react";

const useAuth = () => {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [onboarding, setOnBoarding] = useState("pending");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const respUserId = await AsyncStorage.getItem("userId");
    const responseEmail = await AsyncStorage.getItem("email");

    const responseOnBoarding = await AsyncStorage.getItem("onboarding");
    if (respUserId) {
      setId(respUserId);
    }
    if (responseEmail) {
      setEmail(responseEmail);
    }

    if (responseOnBoarding) {
      setOnBoarding(responseOnBoarding);
    }

    console.log("usr d", respUserId);
    console.log("tye of", typeof respUserId);
  };

  const setUserId = async (userId) => {
    return await AsyncStorage.setItem("userId", userId);
  };

  const setUserEmail = async (email) => {
    return await AsyncStorage.setItem("email", email);
  };

  const setOnboardingUser = async (status) => {
    return await AsyncStorage.setItem("onboarding", status);
  };

  return {
    email,
    id,
    name,
    setName,
    setUserEmail,
    setUserId,
    onboarding,
    setOnboardingUser,
  };
};

export default useAuth;
