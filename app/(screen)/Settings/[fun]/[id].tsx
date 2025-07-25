import PageContainer from "@/src/ui/containers/PageContainer";
import PageHeader from "@/src/ui/headers/PageHeader";
import StyledLink from "@/src/ui/StyledLink";
import Tile from "@/src/ui/Tile";
import TilesContainer from "@/src/ui/containers/TilesContainer";
import ChangeName from "@/src/components/ChangeName";
import {useLocalSearchParams, useRouter} from "expo-router";
import ConfirmDelete from "@/src/components/ConfirmDelete";
import useDeviceMutation from "@/src/hooks/queries/device/useDeviceMutation";
import {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text} from "react-native";

export default function SettingsDevice() {
    const id = parseInt(useLocalSearchParams().id as string, 10);
    const [deleteFromRoom, setDeleteFromRoom] = useState(false)
    const [deleteDeviceForm, setDeleteDeviceForm] = useState(false)
    const {updateDevice, deleteDevice} = useDeviceMutation();
    const router = useRouter();
    const updateMutation = updateDevice(id);
    const deleteMutation = deleteDevice(id);

    useEffect(() => {
        if (updateMutation.isSuccess || deleteMutation.isSuccess) {
            router.replace("/Home");
        }
    }, [updateMutation.isSuccess, deleteMutation.isSuccess, router]);

    function handleDeleteFromRoom() {
        updateMutation.mutate({room: null});
    }

    function handleDeleteDevice() {
        deleteMutation.mutate();
    }

    return(
        <PageContainer>
            <ConfirmDelete name="z pokoju" onConfirm={handleDeleteFromRoom} onCancel={() => setDeleteFromRoom(false)}
                           visible={deleteFromRoom}/>
            <ConfirmDelete name="urządzenie" onConfirm={handleDeleteDevice} onCancel={() => setDeleteDeviceForm(false)}
                           visible={deleteDeviceForm}/>
            <PageHeader title="Ustawienia">
                <StyledLink type="fancy" to="/"> Wróć</StyledLink>
            </PageHeader>
            <TilesContainer>
                <Tile>
                    <ChangeName type="device" id={id}>Zmień nazwę</ChangeName>
                </Tile>
                <Tile type="danger">
                    <Pressable onPress={() => setDeleteFromRoom(true)}><Text style={styles.text}>Usuń z pokoju</Text></Pressable>
                </Tile>
                <Tile type="danger">
                    <Pressable onPress={() => setDeleteDeviceForm(true)}><Text style={styles.text}>Usuń urządzenie</Text></Pressable>
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
})