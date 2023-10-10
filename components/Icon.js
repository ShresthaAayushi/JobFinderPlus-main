import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesignIcons from "react-native-vector-icons/AntDesign";
import { colors } from "../assets/Colors";

export default function Icon({ pageName, navigation, hassearch }) {
  return (
    <View style={styles.iconPlace}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={{ flex: 2.5 }}
      >
        <AntDesignIcons name="left" size={25} color={colors.secondary} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 25,
          flex: 3.2,
        }}
      >
        {pageName}
      </Text>
      {hassearch && (
        <AntDesignIcons name="search1" size={30} color={colors.tertiary} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  iconPlace: {
    marginTop: 60,
    display: "flex",
    flexDirection: "row",
  },
});
