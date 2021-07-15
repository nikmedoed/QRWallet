import AsyncStorage from "@react-native-community/async-storage";
import EventEmitter from "EventEmitter";

const kSelected = "kSelected";
const kqrArray = "kqrArray";

class UserData extends EventEmitter {
  selected = 0;
  qrArraray = [];
  constructor() {
    super();
    this.getAllDataFromStorage();
  }

  async getAllDataFromStorage() {
    this.selected = (await AsyncStorage.getItem(kSelected)) || 0;
    this.qrArraray = (await AsyncStorage.getItem(kqrArray)) || [];

    this.emitChange(); //для обновления ячеек царей
  }

  getDataToShow() {
    if (this.qrArraray.length == 0) {
      return {};
    } else {
      return {
        selected: this.selected,
        ...this.qrArraray[this.selected],
      };
    }
  }

  async nextQR() {
    this.selected = (this.selected + 1) % this.qrArraray.length;
    this.emitChange();
  }
  async prevQR() {
    this.selected =
      (this.selected + this.qrArraray.length - 1) % this.qrArraray.length;
    this.emitChange();
  }

  async deleteItem(index = this.selected) {
    this.qrArraray.splice(index, 1);
    this.selected = this.selected % this.qrArraray.length;
    this.emitChange();
  }

  async insertQR(elem) {
    let { qrArraray, selected } = this;
    this.qrArraray = [...qrArraray.splice(0, selected), elem, ...qrArraray];
    this.selected = (selected + 1) % this.qrArraray.lenth;
    this.emitChange();
  }

  async storeData() {
    await AsyncStorage.setItem(kSelected, this.selected);
    await AsyncStorage.setItem(kqrArraray, this.qrArraray);
  }

  async clearCache() {
    await AsyncStorage.clear();
  }

  addChangeListener(callback) {
    this.addListener("CHANGE", callback);
  }

  removeChangeListener(callback) {
    this.removeListener("CHANGE", callback);
  }

  emitChange() {
    this.emit("CHANGE");
  }
}

export default new UserData();
