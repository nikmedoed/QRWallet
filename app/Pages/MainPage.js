// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import styles, * as styleConstants from "../constant/styles";
import BurstSVG from "./assets/burst.svg";
import DeleteSVG from "./assets/delete.svg";
import GestureRecognizer from "react-native-swipe-gestures";
import QRCode from "react-native-qrcode-svg";
import UserData from "../UserData";
import AddQR from "./AddQR";
import picker from "../Picker";

import { Text, View, TouchableOpacity, AppState } from "react-native";

export default class MainScreen extends React.Component {
  appState = AppState.currentState;
  shouldInit = true;

  constructor(props) {
    super(props);

    if (!this.shouldInit) return;
    this.shouldInit = false;
    this.state = UserData.getDataToShow();

    this.updateState = this.updateState.bind(this);
  }

  updateState() {
    console.log("updateState");

    this.setState({
      ...UserData.getDataToShow("updateState"),
    });
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
    UserData.addChangeListener(this.updateState);
  }

  componentWillUnmount() {
    UserData.storeData();
    AppState.removeEventListener("change", this.handleAppStateChange);
    UserData.removeChangeListener();
  }

  handleAppStateChange = (nextAppState) => {
    if (
      this.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
    } else {
      UserData.storeData();
    }
    this.appState = nextAppState;
  };

  goToRename() {
    this.props.navigation.navigate("RenameDialog");
  }

  render() {
    const configGesture = {
      velocityThreshold: 0,
      directionalOffsetThreshold: 80,
    };

    const { selected, name, content } = this.state;
    console.log("render selected, name, content", selected, name, content);
    const { navigation } = this.props;
    if (!content) {
      return <AddQR navigation={navigation} noBack={true} />;
    } else {
      return (
        <GestureRecognizer
          onSwipeUp={() => navigation.navigate("AddQR")}
          onSwipeLeft={() => UserData.nextQR()}
          onSwipeRight={() => UserData.prevQR()}
          config={configGesture}
          style={styles.container}
        >
          <View style={styles.containerSecondary}>
            <TouchableOpacity
              style={{ ...styles.icon, top: 0, left: 0 }}
              onPress={() =>
                picker((e) => {
                  UserData.replaceQR(e, selected);
                })
              }
            >
              <BurstSVG
                width="100%"
                height="100%"
                fill={styleConstants.mainColor}
              />
            </TouchableOpacity>

            <QRCode size={250} value={content} />

            <TouchableOpacity
              onPress={() => navigation.navigate("RenameDialog")}
              style={
                {
                  // position: "absolute", bottom: 110,
                }
              }
            >
              <Text style={{ ...styles.titleText }}>{name || content}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ ...styles.icon, bottom: 0, right: 0 }}
              onPress={() => navigation.navigate("DeleteDialog")}
            >
              <DeleteSVG
                width="100%"
                height="100%"
                fill={styleConstants.mainColor}
              />
            </TouchableOpacity>
          </View>
        </GestureRecognizer>
      );
    }
  }
}
