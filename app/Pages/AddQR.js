// import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import AddSVG from "./assets/add.svg";
import styles, * as styleConstants from "../constant/styles";
import GestureRecognizer from "react-native-swipe-gestures";
import UserData from "../UserData";
import picker from "../Picker";

export default function App({ navigation, noBack }) {
  const { selected, name, content } = UserData.getDataToShow;

  const back = () => {
    if (!noBack) {
      navigation.goBack();
    }
  };

  const onPress = (e) => {
    // callback({ name: "dsffsdadfssfdsfad", content: "121234124124" });

    picker((data) => {
      console.log("picker", data);

      UserData.insertQR({ content: data });
      if (!noBack) {
        navigation.replace("RenameDialog");
      } else {
        navigation.navigate("RenameDialog");
      }
    });
  };

  return (
    <GestureRecognizer
      onSwipeUp={back}
      onSwipeDown={back}
      style={[styles.container, styles.containerSecondary]}
    >
      <Text style={{ ...styles.titleText, position: "absolute", top: 110 }}>
        Добавить QR-код
      </Text>
      <TouchableOpacity
        onPress={onPress}
        style={{ width: "50%", height: "30%" }}
      >
        <AddSVG width="100%" height="100%" fill={styleConstants.mainColor} />
      </TouchableOpacity>
    </GestureRecognizer>
  );
}
