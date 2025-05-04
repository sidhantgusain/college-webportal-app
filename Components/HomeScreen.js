import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import SemesterScreen from "./SemesterScreen";
import { FlatList } from "react-native";
import { AppContext } from "../AppContext";
import logo from "../assets/logo2.jpeg";

const Tab = createMaterialBottomTabNavigator();

// const renderItem = ({ item }) => {
//   <SemesterScreen Heading={item.heading} />;
// };

// const SemListComponent = () => {
//   return (
//     <FlatList
//       data={semData}
//       renderItem={renderItem}
//       keyExtractor={(item) => item.id}
//     />
//   )
// }

export default function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const { studentDetail, setStudentDetail } = React.useContext(AppContext);

  const handleSignOut = () => {
    setStudentDetail({});
    navigation.navigate("Login");
  };

  const now = new Date();
  let greeting = "";
  if (now.getHours() >= 5 && now.getHours() < 12) {
    greeting = "Good morning";
  } else if (now.getHours() >= 12 && now.getHours() < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const studentName = studentDetail?.response?.regdata?.name;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffff" }}>
      <ScrollView style={{ paddingTop: 45 }}>
        <View style={{ justifyContent: "space-evenly" }}>
          <View>
            <Modal
              animationType={"slide"}
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                // console.log("Modal has been closed");
                setModalVisible(!modalVisible);
              }}
            >
              <Image
                // style={styles.image}
                source="https://picsum.photos/seed/696/3000/2000"
                // placeholder={blurhash}
                contentFit="cover"
                transition={1000}
                style={{flex: 1,
                  width: '100%',
                  backgroundColor: '#0553'}}
              /> 
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  marginLeft: 5,
                  marginRight: 9,
                  marginTop: 10,
                }}
              >
                <Pressable
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingVertical: 15,
                    paddingHorizontal: 32,
                    borderRadius: 4,
                    elevation: 3,
                    backgroundColor: "black",
                    marginBottom: 12,
                  }}
                  onPress={handleSignOut}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      lineHeight: 21,
                      fontWeight: "bold",
                      letterSpacing: 0.25,
                      color: "white",
                    }}
                  >
                    Sign out
                  </Text>
                </Pressable>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Entypo
                    name="cross"
                    size={30}
                    style={{ alignSelf: "center", marginBottom: 60 }}
                  ></Entypo>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={30}
              style={{ marginLeft: 8 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="account"
              size={40}
              style={{ alignSelf: "flex-end", marginTop: -30, marginRight: 5 }}
            ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </ScrollView> 
      <View style={{alignItems:'center',marginBottom:30,marginTop:100}}>
          <Image source={logo} style={{ width: 200, height: 200 }} />
        </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        
        <Text>
          {greeting}, {studentName}
        </Text>
      </View>
    </SafeAreaView>
  );
}
