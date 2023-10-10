import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function RecommendedJobs({ data }) {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <View style={[styles.recentCard]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            id: item.id,
            url: item.company_logo,
            company: item.company,
            workTime: item.title,
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
              source={{ uri: item.company_logo }}
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
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: "Poppins-Regular",
                fontSize: 15,
              }}
            >
              {item.type}
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
            ${item.salary}
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
        ListEmptyComponent={() => (
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              fontFamily: "Poppins-Medium",
            }}
          >
            No similar jobs found
          </Text>
        )}
        vertical
        navigation={navigation}
        showsVerticalScrollIndicator={false}
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
