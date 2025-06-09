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
    | "/Logout";
  image?: any;
  textStyle?: TextStyle;
}
