import { View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import Colors from "../../constants/colors";

function FavouriteButton() {
    const [isFavourite, setIsFavourite] = useState(false)

    function onPressHandler() {
        setIsFavourite((current) => !current)
    }
  return (
    <View>
      <Pressable style={({pressed}) => pressed && {opacity: 0.5}} onPress={onPressHandler}>
        <AntDesign name="heart" size={24} color={isFavourite ? 'red' : Colors.accent500} />
      </Pressable>
    </View>
  );
}

export default FavouriteButton;