import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

export default function SemesterScreen({Heading}) {
  return (
    <View style={styles.card}>
      <View style={styles.stitched}>
        <View>
          <Pressable onPress={() => alert("Pressed")} style={styles.button}>
            {/* <MaterialCommunityIcons
              name="vector-square"
              size={17}
              style={{ alignSelf: "flex-start"}}
            ></MaterialCommunityIcons> */}
            <Text>{Heading}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#fff",
    // shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginHorizontal: 4,
    marginVertical: 6,
    width: "100%",
  },
  stitched: {
    padding: 10,
    margin: 12,
    //backgroundColor:'#fff',
    //color:'#000',
    fontSize: 21,
    //fontWeight:'bold',
    //lineHeight:1.3,
    borderRadius: 1,
    //fontWeight:'normal',
    //textShadowColor:"#000",
    //shadowColor:'#000',
    //elevation:6,
    //shadowOffset:{width:1,height:1},
    //shadowOpacity:0.5,
    borderStyle: "dashed",
    borderColor: "#808080",
    borderWidth: 1,
  },
  button: {
    alignItems: "center",
  },
});
