import { StyleSheet } from "react-native";

import { Color } from "../../assets/color/color.assets";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  icon: {
    marginRight: 15,
    borderRadius: 50,
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    color: Color.purpleishBlue,
    fontFamily: "Asap-Regular",
  },
});

export default styles;
