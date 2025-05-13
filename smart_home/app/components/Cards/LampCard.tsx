import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ILamp } from "@/app/interfaces/ILamp";
import DeviceCardContainer from "@/app/ui/DeviceCardContainer";

function formatDate(date: string): string {
  return date.slice(0, 5);
}

interface LampCardProps {
  lamp: ILamp;
}

export default function LampCard({ lamp }: LampCardProps) {
  const navigate = useRouter();

  return (
    <DeviceCardContainer
      isFavourite={lamp.is_favourite}
      name={lamp.name}
      wifiStrength={lamp.brightness}
      isOnline={lamp.is_online}
      id={lamp.id}
    >
      <Text style={styles.infoText}>
        Jasność: <Text style={styles.bold}>{lamp.brightness}%</Text>
      </Text>
      <Text style={styles.infoText}>
        Czas świecenia: <Text style={styles.bold}>{lamp.lighting_time}s</Text>
      </Text>
      <View style={styles.timeContainer}>
        <Text style={styles.p}>Czas świecenia:</Text>
        <Text style={styles.bold}>
          {formatDate(lamp.light_start)} - {formatDate(lamp.light_stop)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigate.push(`/lamp/${lamp.id}`)}
      >
        <Text style={styles.buttonText}>Wybierz</Text>
      </TouchableOpacity>
    </DeviceCardContainer>
  );
}

const styles = StyleSheet.create({
  infoText: {
    fontSize: 14,
    color: "#000",
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  p: {
    fontSize: 14,
    color: "#000",
    margin: 0,
  },
  button: {
    backgroundColor: "#00bfff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});
