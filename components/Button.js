import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { colors } from "../assets/Colors";

export default function Button({
  title,
  hasarrow,
  onPress,
  loading,
  loadingText = "Loading...",
}) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text
        style={{
          color: "white",
          fontFamily: "Poppins-Regular",
          fontSize: 24,
          textAlign: "center",
        }}
      >
        {loading ? loadingText : title}
      </Text>
      {hasarrow && (
        <Image
          source={require("../assets/arrowright.png")}
          style={{ width: 20, marginLeft: 20 }}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    backgroundColor: "#4CA6A8",
    borderRadius: 12,
  },
});
