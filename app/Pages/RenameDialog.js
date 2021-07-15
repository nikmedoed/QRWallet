import React from "react";
import {
  Animated,
  Pressable,
  TouchableOpacity,
  Text,
  TextInput,
  View,
} from "react-native";
import styles, * as styleConstants from "../constant/styles";
import UserData from "../UserData";

import { useCardAnimation } from "@react-navigation/stack";

export default RenameDialogScreen = ({ navigation }) => {
  //   const { colors } = useTheme();
  const { selected, name, content } = UserData.getDataToShow();

  const { current } = useCardAnimation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
  let [value, onChangeText] = React.useState(name);

  console.log(selected, name, content, value);

  return (
    <View style={styles.containerCenter}>
      <Pressable style={styles.backdrop} onPress={() => navigation.goBack()} />
      <Animated.View
        style={[
          styles.dialog,
          {
            transform: [
              {
                scale: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                  extrapolate: "clamp",
                }),
              },
            ],
          },
        ]}
      >
        <Text style={{ ...styles.buttontext, ...styles.buttonMargin }}>
          Введите название
        </Text>
        <TextInput
          style={{
            ...styles.buttontext,
            ...styles.button,
            width: "90%",
          }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        ></TextInput>
        {/*  */}
        <View style={{ ...styles.containerRow, ...styles.buttonMargin }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              UserData.renameQR(value, selected);
              navigation.goBack();
            }}
          >
            <Text style={{ ...styles.buttontext }}>Сохранить</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <Text style={{ ...styles.buttontext }}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
