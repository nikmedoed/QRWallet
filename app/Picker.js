import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
// import UserData from "./UserData";
import { Alert } from "react-native";

export default async function pickImage(callback) {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Доступ ограничен",
      "Для использования приложения требуется доступ к фотогалерее"
    );
  } else {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      let bar = await BarCodeScanner.scanFromURLAsync(result.uri);
      //   console.log(bar);
      if (!(bar[0] && bar[0].data)) {
        Alert.alert("Плохое фото", "Извините, но извлечь QR-код не получилось");
      } else {
        callback && callback(bar[0].data);
      }
    }
  }
}
