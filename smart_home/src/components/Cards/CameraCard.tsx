import { useVideoPlayer, VideoView } from "expo-video";
import { useEvent } from "expo";
import { Button, StyleSheet, View } from "react-native";
interface HlsPlayerProps {
  url: string;
}

export default function CameraCard({ url }: HlsPlayerProps) {
  const player = useVideoPlayer(url, (player) => {
    player.loop = true;
    player.play();
  });
  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

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
  video: {
    width: "90%",
    height: 275,
  },
});
