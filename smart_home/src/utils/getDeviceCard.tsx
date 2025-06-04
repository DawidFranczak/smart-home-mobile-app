import AquariumCard from "../components/Cards/AquariumCard";
import ButtonCard from "../components/Cards/ButtonCard";
import LampCard from "../components/Cards/LampCard";
import RfidCard from "../components/Cards/RfidCard";

export default function getDeviceComponent(device: any) {
  switch (device.fun) {
    case "lamp":
      return <LampCard lamp={device} key={device.id} />;
    case "rfid":
      return <RfidCard rfid={device} key={device.id} />;
    case "button":
      return <ButtonCard button={device} key={device.id} />;
    case "aquarium":
      return <AquariumCard aquarium={device} key={device.id} />;
  }
  return null;
}
