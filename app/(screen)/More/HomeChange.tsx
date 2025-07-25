import {StyleSheet, View, Text} from "react-native";
import FormContainer from "@/src/ui/containers/FormContainer";
import Header from "@/src/ui/headers/Header";
import InputText from "@/src/ui/inputs/InputText";
import Message from "@/src/ui/Message";
import Button from "@/src/ui/buttons/Button";
import {useEffect, useState} from "react";
import useHomeMutation from "@/src/hooks/queries/useHomeMutation";
import {ICustomError} from "@/src/interfaces/ICustomError";
import variables from "@/src/styles/variables";
import PageContainer from "@/src/ui/containers/PageContainer";
import StyledLink from "@/src/ui/StyledLink";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";

export default function HomeChange() {
  const [homeCode, setHomeCode] = useState("");
  const [error, setError] = useState("");
  const { updateHome } = useHomeMutation();
  const updateHomeMutation = updateHome();
  const errorMutations = updateHomeMutation.error as ICustomError;
  useEffect(() => {
    if(errorMutations) {
      if (!errorMutations.details) return
      const key = Object.keys(errorMutations.details)[0]
      setError(errorMutations.details[key]);
    }
  }, [errorMutations]);
  function handleSubmit() {
    setError("");
    if (homeCode === "") {
      setError("Podaj kod domu");
      return;
    }
    updateHomeMutation.mutate(homeCode);
  }
  return (
      <PageContainer>
        <View style={styles.container}>
          <FormContainer>
            <Header type="large">Zmiana domu</Header>
            <View style={styles.instructionView}>
              <Text style={styles.instructionText}>
                Pamiętaj że po zmianie domu wszystkie urzeczy zapisane w domu zostą usunąte
              </Text>
            </View>
            <InputText
                placeholder="Kod domu"
                onChange={setHomeCode}
            />
            <Message visible={error !== ""} type="error">{error}</Message>
            <ButtonContainer style={styles.containerButton}>
              <Button type="danger" onPress={handleSubmit}>Zmień</Button>
              <StyledLink to="/">Powrót</StyledLink>
            </ButtonContainer>
          </FormContainer>
        </View>
      </PageContainer>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: variables.spacing.xl
  },
  instructionView: {
    fontSize: variables.typography.fontSize.lg,
    lineHeight: 1.5,
    marginBottom:variables.spacing.md,
    padding: variables.spacing.md,
    backgroundColor:variables.colors.tertiaryBg,
    borderRadius:variables.spacing.sm,
    borderRightColor:"rgba(0, 0, 0, 0.0)",
    borderTopColor:"rgba(0, 0, 0, 0.0)",
    borderBottomColor:"rgba(0, 0, 0, 0.0)",
    borderLeftColor:variables.colors.accentPrimary,
    borderStyle:"solid",
    borderWidth:3,
  },
  instructionText:{
    color: variables.colors.textMuted,
  },
  containerButton: {
    marginTop: 10,
    justifyContent: "center",
    gap:50,
  },
});