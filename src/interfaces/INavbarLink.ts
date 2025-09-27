import { TextStyle } from "react-native";

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
    | "/More/Router"
    | "/Logout";
  image?: any;
  textStyle?: TextStyle;
}
