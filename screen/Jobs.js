import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Recent({ data }) {
  const navigation = useNavigation();

  const vertical = [
    {
      id: "gg1",
      company: "Google",
      workPost: "Lead Product Manager",
      salary: "$1250/m",
      workTime: "Full Time",
      address: "Toronto,Canada",
      url: "https://pngimg.com/uploads/google/small/google_PNG19635.png",
    },
    {
      id: "spf1",
      company: "Spotify",
      workPost: "Senior Manager",
      salary: "$1165/m",
      workTime: "Full Time",
      address: "Ohio,USA",
      url: "https://image.shutterstock.com/image-vector/signal-music-icon-internet-symbol-260nw-2177649199.jpg",
    },
    {
      id: "fb1",
      company: "Facebook",
      workPost: "UI/UX Designer",
      salary: "$3500/m",
      workTime: "Part Time",
      address: "California, USA",
      url: "https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19753.png",
    },
    {
      id: "ntf",
      company: "Netflix",
      workPost: "Visual Designer",
      salary: "$1165/m",
      workTime: "Full Time",
      address: "Ohio, USA",
      url: "https://pngimg.com/uploads/netflix/small/netflix_PNG8.png",
    },
    {
      id: "fb1",
      company: "Facebook",
      workPost: "UI/UX Designer",
      salary: "$3500/m",
      workTime: "Part Time",
      address: "California, USA",
      url: "https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19753.png",
    },
  ];

  const [results, setResults] = useState(vertical);

  useEffect(() => {
    setResults(vertical);
  }, []);

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
    <SafeAreaView style={{ padding: 20 }}>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            fontSize: 21,

            fontFamily: "Poppins-Medium",
          }}
        >
          All Jobs
        </Text>

        <TextInput
          placeholder="Search Here..."
          style={styles.searchBox}
          onChangeText={(searchInput) => {
            if (searchInput === "") {
              return setResults(vertical);
            }

            if (searchInput.length > 3) {
              const filteredResult = vertical.filter((item) =>
                item.workPost.toLowerCase().includes(searchInput.toLowerCase())
              );

              return setResults([...filteredResult]);
            }
          }}
        />
      </View>

      <FlatList
        data={results}
        renderItem={renderItem}
        navigation={navigation}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
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
  searchBox: {
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    fontSize: 20,
    padding: 10,
  },
});
