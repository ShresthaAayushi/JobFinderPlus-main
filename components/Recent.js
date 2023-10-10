import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Recent({ data }) {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={[styles.recentCard]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            id: item.id,
            url: item.url,
            company: item.company,
            workTime: item.workTime,
            workPost: item.workPost,
            salary: item.salary,
            address: item.address,
          })
        }
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 5,
          }}
        >
          <View style={{ flex: 1.5 }}>
            <Image
              source={{ uri: item.url }}
              style={{ height: 50, width: 50, resizeMode: "contain" }}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              flex: 4,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                //marginTop: 10,
                fontFamily: "Poppins-Medium",
                fontSize: 20,
              }}
            >
              {item.workPost}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              {item.workTime}
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Poppins-Regular",
              fontSize: 15,
              marginLeft: 30,
              flex: 1.5,
            }}
          >
            {item.salary}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ height: 450 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        vertical
        navigation={navigation}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  recentCard: {
    width: "100%",
    height: 90,
    marginTop: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 8,
    flex: 1,
    justifyContent: "center",
  },
  profileImg: {
    height: 50,
    width: 50,
    borderRadius: 50,
    marginLeft: 20,
  },
});
