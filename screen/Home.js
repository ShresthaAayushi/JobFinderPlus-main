import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { colors } from "../assets/Colors";
import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Menu from "../assets/Menu.svg";
import PopularJobs from "../components/Popular";
import RecentPost from "../components/Recent";

const horizontal = [
  {
    id: "gg1",
    company: "Google",
    workPost: "Lead Product Manager",
    salary: "$1250/m",
    address: "Toronto,Canada",
    company_email: "hr@google.com",
    url: "https://pngimg.com/uploads/google/small/google_PNG19635.png",
  },
  {
    id: "spf1",
    company: "Spotify",
    workPost: "Senior Manager",
    salary: "$1165/m",
    address: "Ohio, USA",
    company_email: "hr@spotify.com",
    url: "https://image.shutterstock.com/image-vector/signal-music-icon-internet-symbol-260nw-2177649199.jpg",
  },
  {
    id: "fb1",
    company: "Facebook",
    workPost: "UI/UX Designer",
    salary: "$3500/m",
    address: "California, USA",
    company_email: "hr@facebook.com",
    url: "https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19753.png",
  },
  {
    id: "ntf",
    company: "Netflix",
    workPost: "Visual Designer",
    salary: "$1165/m",
    address: "Ohio, USA",
    company_email: "hr@netflix.com",
    url: "https://pngimg.com/uploads/netflix/small/netflix_PNG8.png",
  },
];

const vertical = [
  {
    id: "gg1",
    company: "Google",
    workPost: "Lead Product Manager",
    salary: "$1250/m",
    workTime: "Full Time",
    address: "Toronto,Canada",
    company_email: "hr@google.com",
    url: "https://pngimg.com/uploads/google/small/google_PNG19635.png",
  },
  {
    id: "spf1",
    company: "Spotify",
    workPost: "Senior Manager",
    salary: "$1165/m",
    workTime: "Full Time",
    address: "Ohio,USA",
    company_email: "hr@spotify.com",
    url: "https://image.shutterstock.com/image-vector/signal-music-icon-internet-symbol-260nw-2177649199.jpg",
  },
  {
    id: "fb1",
    company: "Facebook",
    workPost: "UI/UX Designer",
    salary: "$3500/m",
    workTime: "Part Time",
    address: "California, USA",
    company_email: "hr@facebook.com",
    url: "https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19753.png",
  },
  {
    id: "ntf",
    company: "Netflix",
    workPost: "Visual Designer",
    salary: "$1165/m",
    workTime: "Full Time",
    address: "Ohio, USA",
    company_email: "hr@netlfix.com",
    url: "https://pngimg.com/uploads/netflix/small/netflix_PNG8.png",
  },
  {
    id: "fb1",
    company: "Facebook",
    workPost: "React Developer",
    salary: "$2500/m",
    workTime: "Full Time",
    address: "California, USA",
    url: "https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19753.png",
  },
];

const Home = ({ navigation }) => {
  const [textInput, setTextInput] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.homeContainer}>
          <Menu height={50} width={50} />
          <TextInput
            placeholder="Search Here..."
            style={styles.searchBox}
            onFocus={() => navigation.navigate("Jobs")}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              source={require("../assets/profile.jpeg")}
              style={styles.profileImg}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.postText}>Popular Jobs</Text>
        <View style={{ marginTop: 10, height: 150 }}>
          <PopularJobs data={horizontal} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.recentText}>Recent Post</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Jobs")}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Poppins-Light",
                color: colors.secondary,
                justifyContent: "center",
              }}
            >
              Show All
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, height: 50 }}>
          <RecentPost data={vertical} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    marginTop: 60,
    display: "flex",
    flexDirection: "row",
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
    flex: 1,
    borderRadius: 10,
    fontSize: 20,
    padding: 15,
    marginLeft: 10,
  },
  postText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    marginTop: 30,
  },
  textWrap: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
  },
  recentText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
  },
  footer: {
    width: "100%",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "row",
  },
});

export default Home;
