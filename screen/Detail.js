import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Linking,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Button from "../components/Button";
import Icon from "../components/Icon";
import { colors } from "../assets/Colors";
import RecommendedJobs from "../components/RecommendedJobs";

const Description = ({ text }) => {
  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text
          style={{ fontFamily: "Poppins-Bold", fontSize: 17, marginTop: 30 }}
        >
          Qualifications
        </Text>
      </View>

      <View style={{ height: 300 }}>
        <FlatList
          data={[
            { key: "Exceptional communication skills and team working skill" },
            { key: "Creative with an eye for shape and color" },
            {
              key: "Know the principle of animation and you can create high prototypes",
            },
            { key: "Figma, Xd & Sketch must know about this app" },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={{ marginBottom: 10 }}>
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    marginTop: 15,
                  }}
                >
                  {`\u2023 ${item.key}`}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
};

const Company = ({ desc }) => {
  return (
    <View style={{ flex: 1, marginTop: 20 }}>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 14,
          marginTop: 15,
        }}
      >
        Our company is an outsourcing company.
      </Text>
      <Text
        style={{
          fontFamily: "Poppins-Medium",
          fontSize: 14,
          marginTop: 15,
        }}
      >
        {desc}
      </Text>
    </View>
  );
};
export default function Detail({ navigation, route, data }) {
  const {
    url,
    workTime,
    workPost,
    salary,
    company,
    address,
    id,
    description,
    company_email,
  } = route.params;

  const [similarData, setSimilarData] = useState([]);

  const [activeTab, setActiveTab] = useState("description");

  const sendEmail = () => {
    Linking.openURL(
      `mailto:${company_email}?subject=Job Application for ${workPost}&body=Submit your cover letter here...&title="${workPost}`
    );
  };

  const mockData = [
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
      id: "fb1",
      company: "Facebook",
      workPost: "React Developer",
      salary: "$2500/m",
      workTime: "Full Time",
      address: "California, USA",
      url: "https://pngimg.com/uploads/facebook_logos/small/facebook_logos_PNG19753.png",
    },
  ];

  const Similar = () => {
    const baseUrl = `http://localhost:8080/jobs/${id}/recommendations`;
    const fetchSimilarJobs = async () => {
      try {
        const response = await axios.get(baseUrl);

        if (response) {
          setSimilarData(response.data.recommendations);
        }
      } catch (e) {
        console.log("e", e);
      }
    };

    useEffect(() => {
      fetchSimilarJobs();
    }, []);

    return (
      <View style={{ width: "100%", flex: 1, marginVertical: 10 }}>
        <RecommendedJobs data={similarData} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          padding: 15,
          alignItems: "center",
        }}
      >
        {/* <View>
          <Icon navigation={navigation} pageName={"Detail"} hassearch={false} />
        </View> */}

        <Image
          source={{ uri: url }}
          style={{
            height: 70,
            width: 70,
            resizeMode: "contain",
            marginVertical: 10,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            fontFamily: "Poppins-Medium",
            marginTop: 10,
          }}
        >
          {workPost}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 7,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Regular",
              marignRight: 15,
            }}
          >
            {company}
          </Text>
          <Text style={{ fontSize: 50 }}>-</Text>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Poppins-Regular",
            }}
          >
            {address}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: 10,
            justifyContent: "space-around",
          }}
        >
          <View>
            <Text style={{ fontFamily: "Poppins-Regular", fontSize: 18 }}>
              {workTime}
            </Text>
          </View>

          <Text
            style={{
              fontFamily: "Poppins-Regular",
              fontSize: 18,
            }}
          >
            Salary:{" "}
            <Text style={{ fontFamily: "Poppins-Medium" }}>${salary}</Text>
          </Text>
        </View>

        <View style={[styles.tabs, { marginTop: 10 }]}>
          <TouchableOpacity
            onPress={() => setActiveTab("description")}
            style={[styles.tab, styles.activeTab(activeTab === "description")]}
          >
            <Text
              style={[
                styles.tab,
                styles.activeTabText(activeTab === "description"),
              ]}
            >
              Description
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("company")}
            style={[styles.tab, styles.activeTab(activeTab === "company")]}
          >
            <Text
              style={[
                styles.tab,
                styles.activeTabText(activeTab === "company"),
              ]}
            >
              Company
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("similar")}
            style={[styles.tab, styles.activeTab(activeTab === "similar")]}
          >
            <Text
              style={[
                styles.tab,
                styles.activeTabText(activeTab === "similar"),
              ]}
            >
              Similar Jobs
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "description" && <Description text={description} />}
        {activeTab === "company" && <Company desc={description} />}
        {activeTab === "similar" && <Similar desc={description} />}

        <View style={{ width: "100%" }}>
          <Button title={"Apply Now"} onPress={sendEmail} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabs: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  tab: {
    padding: 10,
    borderRadius: 8,
  },
  activeTab: (active) => {
    return {
      backgroundColor: active ? "#4CA6A8" : "transparent",
    };
  },
  activeTabText: (active) => {
    return {
      color: active ? "white" : "black",
    };
  },
});
