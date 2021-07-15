import React from "react";
import {
  Animated,
  Pressable,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import styles, * as styleConstants from "../constant/styles";
import UserData from "../UserData";
import { useCardAnimation } from "@react-navigation/stack";

export default RenameDialogScreen = ({ navigation }) => {
  //   const { colors } = useTheme();
  const { current } = useCardAnimation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);
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
          Вы действительно хотите удалить этот QR-код?
        </Text>
        <View style={{ ...styles.containerRow, ...styles.buttonMargin }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              UserData.deleteItem();
              navigation.goBack();
            }}
          >
            <Text style={{ ...styles.buttontext }}>Удалить</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <Text style={{ ...styles.buttontext }}>Отмена</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};
