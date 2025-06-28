import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View } from "react-native";
import Loading from "../Loading";
interface HlsPlayerProps {
  url: string;
}

export default function CameraCard({ url }: HlsPlayerProps) {
  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.play();
    console.log(player);
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });
  if (!isPlaying) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <VideoView
      style={styles.video}
      player={player}
      allowsFullscreen
      allowsPictureInPicture
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    width: "90%",
    height: 235,
    backgroundColor: "grey",
  },
  video: {
    width: "90%",
    height: 275,
  },
});
