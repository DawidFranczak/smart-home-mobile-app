import { Image, TouchableOpacity } from "react-native";
import useFavouriteMutation from "../hooks/queries/useFavouriteMutation";

interface FavouriteStarProps {
  isFavourite: boolean;
  id: number;
  type: "room" | "device";
  onPress?: (isFavourite: boolean) => void;
}
export default function FavouriteStar({
  isFavourite,
  onPress,
  id,
  type,
}: FavouriteStarProps) {
  const mutation = useFavouriteMutation(onPress);
  const handleFavouriteClick = () => {
    mutation.mutate({
      id,
      is_favourite: isFavourite,
      type,
    });
  };
  if (isFavourite) {
    return (
      <TouchableOpacity onPress={handleFavouriteClick}>
        <Image
          source={require("../../assets/images/favourite_select.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={handleFavouriteClick}>
        <Image
          source={require("../../assets/images/favourite_not_select.png")}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    );
  }
}
