import { StyleSheet } from "react-native";

export const mainColor = "#000000";
const backColor = "#ffffff";

const inconSize = 65;

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "8%",
  },
  containerSecondary: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  titleText: {
    fontSize: 30,
  },

  icon: {
    height: inconSize,
    width: inconSize,
    borderColor: "#000000",
    position: "absolute",
  },

  buttons: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },

  button: {
    margin: 8,
    alignSelf: "center",
    borderColor: mainColor,
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 3,
  },
  buttontext: {
    fontSize: 20,
    color: mainColor,
    textAlign: "center",
  },
  buttonMargin: {
    marginVertical: 20,
  },

  dialog: {
    padding: 20,
    width: "90%",
    maxWidth: 400,
    borderRadius: 10,
    borderWidth: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
