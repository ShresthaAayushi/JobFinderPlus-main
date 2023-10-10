import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { colors } from "../assets/Colors";
import Icon from "../components/Icon";

export default function Message({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 15 }}>
        <Icon pageName={"Message"} navigation={navigation} hassearch={true} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cont: {
    display: "flex",
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "space-between",
    padding: 15,
  },
});
