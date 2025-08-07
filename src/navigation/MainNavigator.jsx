import { NavigationContainer } from "@react-navigation/native";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { useSelector, useDispatch } from "react-redux";
import { useGetProfilePictureQuery } from "../services/user/userApi";
import { setProfilePicture } from "../features/user/userSlice";
import { useEffect, useState } from "react";
import { initSessionTable, getSession } from "../db";
import { ActivityIndicator, View } from "react-native";
import { setUser } from "../features/user/userSlice";
import { colors } from "../global/colors";

export default function MainNavigator() {
    const userEmail = useSelector(state => state.userReducer.userEmail)
    const localId = useSelector(state => state.userReducer.localId)
    const [checkingSession, setCheckingSession] = useState(true);

    const dispatch = useDispatch()
    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)

    useEffect(() => {
        const bootstrap = async () => {
            await initSessionTable();
            const session = await getSession();
            if (session) {
                dispatch(setUser({ email: session.email, localId: session.localId }))
            }
            setCheckingSession(false);
        };

        bootstrap();
    }, []);

    useEffect(() => {
        if (profilePicture) {
            dispatch(setProfilePicture(profilePicture.image))
        }
    }, [profilePicture])

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors["btn-text"]} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {userEmail ? <TabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}