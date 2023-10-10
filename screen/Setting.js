import React from "react";
import { View } from "react-native";
import Icon from "../components/Icon";

export default function Setting({ navigation }) {
  return (
    <View>
      <Icon pageName={"Settings"} navigation={navigation} />
    </View>
  );
}
