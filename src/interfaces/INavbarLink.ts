import { TextStyle, ViewStyle } from "react-native";

export default interface INavbarLink {
  text: string;
  url:
    | "/"
    | "/Device"
    | "/Home"
    | "/Room"
    | "/Router"
    | "/Login"
    | "/More"
    | "/More/ChangePassword"
    | "/More/Camera"
    | "/More/HomeCode"
    | "/More/HomeLeave"
    | "/More/HomeChange"
    | "/Logout";
  image?: any;
  textStyle?: TextStyle;
}
