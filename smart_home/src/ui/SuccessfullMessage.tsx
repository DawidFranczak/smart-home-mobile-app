import { Text, StyleSheet } from "react-native";

interface SuccessfullMessageProps {
  children: React.ReactNode;
}

const SuccessfullMessage = ({ children }: SuccessfullMessageProps) => {
  return <Text style={styles.successfullMessage}>{children}</Text>;
};

const styles = StyleSheet.create({
  successfullMessage: {
    color: "greenyellow",
  },
});

export default SuccessfullMessage;
