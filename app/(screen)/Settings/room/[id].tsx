import {router, useLocalSearchParams, useRouter} from "expo-router";
import useRoomQuery from "@/src/hooks/queries/room/useRoomQuery";
import {useState} from "react";
import useRoomMutation from "@/src/hooks/queries/room/useRoomMutation";
import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import Message from "@/src/ui/Message";
import Button from "@/src/ui/buttons/Button";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import Tile from "@/src/ui/Tile";
import ChangeName from "@/src/components/ChangeName";
import {Pressable, StyleSheet, Text} from "react-native";
import ConfirmDelete from "@/src/components/ConfirmDelete";

export default function SettingsRoom() {
    const params = useLocalSearchParams();
    const idString = params.id as string;
    const id = parseInt(idString ? idString : "0");
    const { room } = useRoomQuery(id);
    const [changeNameSuccess, setChangeNameSuccess] = useState(false)
    const [deleteRoomForm, setDeleteRoomForm] = useState(false)
    const {deleteRoom , updateRoom} = useRoomMutation();
    const deleteMutation = deleteRoom(id);
    const updateMutation = updateRoom(id);

    const navigate = useRouter();

    function handleDeleteRoom(){
        deleteMutation.mutate();
        router.replace("/Home");
    }
    function handleChangeVisibility(){
        const visibility = room.visibility === "private" ? "PU" : "PR"
        updateMutation.mutate({visibility});
    }
    return (
        <PageContainer>
            <PageHeader title="Ustawienia pokoju">
                <Message type="success"
                         visible={changeNameSuccess}
                         timeout={3000}
                         onTimeout={() => setChangeNameSuccess(false)}
                >
                    Zmiana nazwy powiodła się
                </Message>
                <Button type="fancy" onPress={() => navigate.back()}>Wróć</Button>
            </PageHeader>
            <TilesContainer>
                <Tile >
                    <ChangeName type="room" id={id} >Zmień nazwę</ChangeName>
                </Tile>
                <Tile >
                    <Pressable onPress={handleChangeVisibility}><Text style={styles.text}>Zmień widoczność</Text></Pressable>
                    <Message visible={updateMutation.isSuccess}>Zmieniono widoczność pokoju</Message>
                </Tile>
                <Tile type="danger">
                    <Pressable  onPress={() => setDeleteRoomForm(true)}><Text style={styles.text}>Usuń pokój</Text></Pressable>
                    <ConfirmDelete name="z pokoju" onConfirm={handleDeleteRoom} onCancel={() => setDeleteRoomForm(false)}
                                   visible={deleteRoomForm}/>
                </Tile>
            </TilesContainer>
        </PageContainer>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "white",
        textAlign: "center",
    }
});