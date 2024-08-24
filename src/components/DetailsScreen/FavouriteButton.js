import { View, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import Colors from "../../constants/colors";
import {
  addMovieToFavourites,
  checkIfFavourited,
  deleteMovieFromFavourites,
} from "../../utils/favourites";

function FavouriteButton({ ids, title }) {
  const isFavourite = useRef(false);
  const [enabled, setEnabled] = useState(false)

  function onPressHandler() {
    if (isFavourite.current) {
      remove()
    } else {
      add()
    }
    isFavourite.current = !isFavourite.current
    setEnabled(isFavourite.current)
  }

  async function checkState() {
    const shouldEnable = await checkIfFavourited(ids.imdb);
    setEnabled(shouldEnable)
    isFavourite.current = shouldEnable
  }

  async function add() {
    await addMovieToFavourites({ title: title, ids: ids });
  }

  async function remove() {
    await deleteMovieFromFavourites(ids.imdb);
  }

  useEffect(() => {
    checkState();
  }, []);

  return (
    <View>
      <Pressable
        style={({ pressed }) => pressed && { opacity: 0.5 }}
        onPress={onPressHandler}
      >
        <AntDesign
          name="heart"
          size={24}
          color={enabled ? "red" : Colors.accent500}
        />
      </Pressable>
    </View>
  );
}

export default FavouriteButton;
