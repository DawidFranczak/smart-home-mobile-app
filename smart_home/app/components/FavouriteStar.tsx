import { Image, TouchableOpacity, ViewStyle } from "react-native";
import useFavouriteMutation from "../hooks/queries/useFavouriteMutation";

interface FavouriteStarProps {
  isFavourite: boolean;
  id: number;
  type: "room" | "device";
  onPress?: (isFavourite: boolean) => void;
  style?: ViewStyle;
}
export default function FavouriteStar({
  isFavourite,
  onPress,
  id,
  type,
  style,
}: FavouriteStarProps) {
  const mutation = useFavouriteMutation(onPress);
  const handleFavouriteClick = () => {
    mutation.mutate({
      id,
      is_favourite: isFavourite,
      type,
    });
  };
  const imgSource = isFavourite
    ? require("../../assets/images/favourite_select.png")
    : require("../../assets/images/favourite_not_select.png");
  return (
    <TouchableOpacity style={style} onPress={handleFavouriteClick}>
      <Image source={imgSource} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );
}
