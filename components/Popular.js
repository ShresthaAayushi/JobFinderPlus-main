import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../assets/Colors";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";

export default function Popular({ data }) {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const getData = () => {
    setLoading(true);
    return (
      firestore()
        .collection("jobs")
        // .orderBy('status')
        .get()
        .then((querySnapshot) => {
          setLoading(false);
          const items = [];
          console.log("aaasnap", querySnapshot);
          querySnapshot.forEach((documentSnapshot) => {
            items.push({ ...documentSnapshot.data(), id: documentSnapshot.id }); //concatenate id with obj
          });
          setJobs(items);
        })
    );
  };

  console.log("jobs", jobs[0]);
  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Detail", {
            id: item.id,
            url: item.company_logo,
            workTime: item.type,
            company: item.company_name,
            description: item.description,
            workPost: item.title,
            salary: item.salary,
            address: item.address,
            company_email: item.company_email,
          })
        }
      >
        <Image
          source={{ uri: item.company_logo }}
          style={{ height: 50, width: 50, resizeMode: "contain" }}
        />
        <Text
          style={{
            fontFamily: "Poppins-Light",
            fontSize: 12,
            color: colors.secondary,
          }}
        >
          {item.company}
        </Text>
        <Text
          style={{
            textAlign: "left",
            marginTop: 10,
            fontFamily: "Poppins-Medium",
            fontSize: 16,
          }}
        >
          {item.title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Poppins-Regular",
              fontSize: 12,
            }}
          >
            ${item.salary}
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontFamily: "Poppins-Light",
              fontSize: 12,
              marginLeft: 10,
              color: colors.secondary,
            }}
          >
            {item.address}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ marginTop: 10, height: 150 }}>
      {loading && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      )}
      <FlatList
        data={jobs}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    width: 200,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    paddingLeft: 15,
  },
});
