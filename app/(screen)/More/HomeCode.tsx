import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import useHomeCodeQuery from "@/src/hooks/queries/useHomeCodeQuery";
import variables from "@/src/styles/variables";
import PageContainer from "@/src/ui/containers/PageContainer";

export default function HomeCode() {
  const {data, status, isLoading} = useHomeCodeQuery();
  if (isLoading || data === undefined) return <ActivityIndicator size="large" />
  if (status === "error") return <Text>Wystąpił bład</Text>
  return (
      <PageContainer extraStyle={{alignItems: "center", justifyContent: "center"}}>
        <View style={styles.container}>
          <View style={styles.topAccent}></View>
          <Text style={styles.text}>Twój jednorazowy kod domu</Text>
          <Text style={styles.code}>{data.data.code}</Text>
        </View>
      </PageContainer>
  )
}
const styles = StyleSheet.create({
  container:{
    borderRadius: 16,
    paddingVertical: 40,
    paddingHorizontal: 30,
    maxWidth: 400,
    alignSelf: 'center',
    position: 'relative',
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
  },
  text:{
    fontSize: variables.typography.fontSize.base,
    fontWeight: 500,
    color: "#64748b",
    textAlign: "center",
  },
  code:{
    color: "white",
  },
  topAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "200%",
    height: 4,
    backgroundColor: variables.colors.accentSecondary,
    borderRadius: variables.borderRadius.xxl,
    zIndex: 1,
    boxShadow: "0 0 10px var(--accent-secondary)",
  }
});