import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import Splash from "../assets/splass.svg";
import { StyleSheet } from "react-native";
import { colors } from "../assets/Colors";
import Button from "../components/Button";

export default function SplashScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View>
          <View
            style={{
              marginTop: 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Splash />
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                paddingHorizontal: 50,
                paddingTop: 60,
                paddingBottom: 10,
                fontFamily: "Poppins-Bold",
                fontSize: 34,
                lineHeight: 35,
                textAlign: "center",
                color: "#1A1D1E",
              }}
            >
              Find a Perfect Job Match
            </Text>
          </View>
          <View style={{ width: "100%" }}>
            <Text
              style={{
                paddingHorizontal: 45,
                paddingTop: 5,
                fontFamily: "Poppins-Regular",
                fontSize: 20,
                lineHeight: 26,
                textAlign: "center",
                color: colors.secondary,
              }}
            >
              {" "}
              Finding your dream job is more easier with JobFinderPlus
            </Text>
          </View>

          <View style={{ marginVertical: 50, marginHorizontal: 20 }}>
            <Button
              title={"Let's get started"}
              hasarrow={true}
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: 380,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 50,
    marginHorizontal: 20,
    height: 64,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
});
