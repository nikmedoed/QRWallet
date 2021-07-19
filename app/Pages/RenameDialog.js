import React from "react";
import {
  Animated,
  Pressable,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
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
  const [error, setError] = React.useState(false);

  console.log(selected, name, content, value);

  const goBack = () => {
    navigation.goBack();
  };

  const saveGoBack = () => {
    if (value.length > 0) {
      UserData.renameQR(value, selected);
      navigation.goBack();
    } else {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.containerCenter}
    >
      <Pressable style={styles.backdrop} onPress={saveGoBack} />
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
        <Text
          style={{
            ...styles.buttontext,
            ...styles.buttonMargin,
          }}
        >
          {error ? "Название QR кода обязательно" : "Введите название"}
        </Text>
        <TextInput
          style={{
            ...styles.buttontext,
            ...styles.button,
            width: "90%",
            ...(error ? styles.textError : {}),
          }}
          onChangeText={(text) => onChangeText(text)}
          value={value}
        ></TextInput>
        {/*  */}
        <View style={{ ...styles.containerRow, ...styles.buttonMargin }}>
          <TouchableOpacity style={styles.button} onPress={saveGoBack}>
            <Text style={{ ...styles.buttontext }}>Сохранить</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.button} onPress={goBack}>
            <Text style={{ ...styles.buttontext }}>Отмена</Text>
          </TouchableOpacity> */}
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};
