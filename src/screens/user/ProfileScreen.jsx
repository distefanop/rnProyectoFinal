import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { colors } from '../../global/colors'
import CameraIcon from '../../components/CameraIcon'
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { usePutProfilePictureMutation, useGetProfilePictureQuery } from '../../services/user/userApi';
import { setProfilePicture } from '../../features/user/userSlice';
import { useEffect } from 'react';


const ProfileScreen = () => {
    const user = useSelector(state => state.userReducer.userEmail)
    const localId = useSelector(state => state.userReducer.localId)
    const image = useSelector(state => state.userReducer.profilePicture)
    const [triggerPutProfilePicture] = usePutProfilePictureMutation()

    const { data: profilePictureData } = useGetProfilePictureQuery(localId);

    const dispatch = useDispatch()

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        });

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setProfilePicture(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })

        }
    };

    useEffect(() => {
        if (profilePictureData) {
            dispatch(setProfilePicture(profilePictureData.image));
        }
    }, [profilePictureData, dispatch]);

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                    <CameraIcon />
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user}</Text>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        backgroundColor: colors['secondary-color'],
        height: '75%'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors['secondary-color'],
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16,
        fontFamily: 'NataSans-Light',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
})