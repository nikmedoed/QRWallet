// import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import styles, * as styleConstants from "../constant/styles";
import BurstSVG from "./assets/burst.svg";
import DeleteSVG from "./assets/delete.svg";
import GestureRecognizer from "react-native-swipe-gestures";
import QRCode from "react-native-qrcode-svg";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import AddQR from "./AddQR";
import UserData from "../UserData";

import {
  Text,
  View,
  TouchableOpacity,
  AppState,
  AppStateStatus,
} from "react-native";

export default class MainScreen extends React.Component {
  appState = AppState.currentState;
  shouldInit = true;

  constructor(props) {
    super(props);

    if (!this.shouldInit) return;
    this.shouldInit = false;

    this.pickImage = this.pickImage.bind(this);
    this.insertToArray = this.insertToArray.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    UserData.storeData();
    AppState.removeEventListener("change", this.handleAppStateChange);
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

  insertToArray(elem) {
    let { qrArraray, selected } = this.state;
    this.setState({
      qrArraray: [...qrArraray.splice(0, selected), elem, ...qrArraray],
      selected: selected + 1,
    });
  }

  onSwipeUp(gestureState) {
    this.props.navigation.navigate("AddQR", {
      callback: this.insertToArray.bind(this),
    });
  }

  //   onSwipeDown(gestureState) {
  //     this.setState({myText: 'You swiped down!'});
  //   }

  onSwipeLeft(gestureState) {
    this.setState({
      selected:
        (this.state.selected + this.state.qrArraray.length - 1) %
        this.state.qrArraray.length,
    });
  }

  onSwipeRight(gestureState) {
    this.setState({
      selected: (this.state.selected + 1) % this.state.qrArraray.length,
    });
  }

  async pickImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Извините, для использования приложения требуется доступ к фотогалерее"
      );
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.cancelled) {
        let bar = await BarCodeScanner.scanFromURLAsync(result.uri);
        console.log(bar);
        if (!(bar[0] && bar[0].data)) {
          alert("Прочитать код не получилось");
        } else {
          this.insertToArray({ name: "", content: bar.data });
          this.goToRename();
        }
      }
    }
  }

  goToRename() {
    const { name, content } = this.state.qrArraray[this.state.selected];
    this.props.navigation.navigate("RenameDialog", {
      initText: name || "",
      qrDate: content,
    });
  }

  render() {
    const configGesture = {
      velocityThreshold: 0,
      directionalOffsetThreshold: 80,
    };

    const { selected, name, content } = UserData.getDataToShow;

    const { navigation } = this.props;

    if (!content) {
      this.onSwipeUp();
      return <View />;
    } else {
      return (
        <GestureRecognizer
          onSwipeUp={(state) => this.onSwipeUp(state)}
          onSwipeLeft={(state) => this.onSwipeLeft(state)}
          onSwipeRight={(state) => this.onSwipeRight(state)}
          config={configGesture}
          style={styles.container}
        >
          <View style={styles.containerSecondary}>
            <TouchableOpacity
              style={{ ...styles.icon, top: 0, left: 0 }}
              onPress={this.pickImage}
            >
              <BurstSVG
                width="100%"
                height="100%"
                fill={styleConstants.mainColor}
              />
            </TouchableOpacity>

            <QRCode size={250} value={content} />

            <TouchableOpacity
              onPress={this.goToRename}
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
              onPress={() => navigation.navigate("DeleteDialog", {})}
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
