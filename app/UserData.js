import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeEventEmitter } from "react-native";

const kSelected = "kSelected";
const kqrArray = "kqrArray";

class UserData extends NativeEventEmitter {
  selected = 0;
  qrArray = [];
  constructor(props) {
    super(props);
    this.getAllDataFromStorage();
  }

  async getAllDataFromStorage() {
    a = AsyncStorage.getItem(kSelected)
      .then((el) => (this.selected = el && !isNaN(el) ? parseInt(el) : 0))
      .catch((e) => {
        // console.log("No Seleleted", e);
        this.selected = 0;
      });

    b = AsyncStorage.getItem(kqrArray)
      .then((el) => {
        // console.log("kqrArray", el);
        this.qrArray = el ? JSON.parse(el) : [];
      })
      .catch((e) => {
        // console.log("No qrArray", e);
        this.qrArray = [];
      });

    await a;
    await b;
    this.emitChange(); //для обновления ячеек царей
  }

  logInfo(args) {
    // console.log();
    // console.log(args, "len / sel", this.qrArray.length, this.selected);
  }

  getDataToShow() {
    // this.logInfo("getDataToShow");

    if (this.qrArray.length == 0) {
      return { content: null };
    } else {
      return {
        selected: this.selected,
        ...this.qrArray[this.selected],
      };
    }
  }

  renameQR(name, index = this.selected || 0) {
    // console.log("renameQR", name, index, this.qrArray);

    this.qrArray[index].name = name;
    this.emitChange();
  }

  replaceQR(code, index = this.selected || 0) {
    // console.log("renameQR", code, index, this.qrArray);

    this.qrArray[index].content = code;
    this.emitChange();
  }

  async nextQR() {
    this.selected = (this.selected + 1) % this.qrArray.length;
    this.emitChange();
  }
  async prevQR() {
    this.selected =
      (this.selected + this.qrArray.length - 1) % this.qrArray.length;
    this.emitChange();
  }

  async deleteItem(index = this.selected) {
    this.qrArray.splice(index, 1);
    this.selected = this.selected % this.qrArray.length;

    // console.log("len / sel", this.qrArray.length, this.selected);

    this.emitChange();
  }

  async insertQR(elem) {
    let { qrArray, selected } = this;

    elem = { name: "", ...elem };

    qrArray = qrArray || [];
    selected = selected || 0;

    this.qrArray = [...qrArray.splice(0, selected + 1), elem, ...qrArray];
    this.selected = (selected + 1) % this.qrArray.length;

    // this.logInfo("insertQR");

    this.emitChange();
  }

  async storeData() {
    await AsyncStorage.setItem(kSelected, this.selected.toString());
    await AsyncStorage.setItem(kqrArray, JSON.stringify(this.qrArray));
  }

  async clearCache() {
    await AsyncStorage.clear();
  }

  addChangeListener(callback) {
    this.addListener("data.change", callback);
  }

  removeChangeListener(callback) {
    this.removeAllListeners("data.change", callback);
  }

  emitChange() {
    this.emit("data.change");
  }
}

export default new UserData();
