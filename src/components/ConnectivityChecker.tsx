import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { fetchData, getData } from '../pages/Database';
import { useGlobalContext } from './Hooks/GlobalContext';

const ConnectivityChecker = () => {
    const [isConnected, setIsConnected] = useState<any>(true);
    const {setData} = useGlobalContext();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    const retryCheck = () => {
        setTimeout(() => {
            NetInfo.fetch().then(state => {
                setIsConnected(state.isConnected);
                if (!state.isConnected) {
                    showAlert(); // Show alert again if still disconnected
                }
            });
        }, 5000);
    };

    // Show alert based on connection status
    const showAlert = () => {
        if (isConnected) {
            // fetchData();
            // const fetchAsyncData = async () => {
            //     try {
            //         const users = await getData("item");
            //         setData(users);
            //     } catch (error) {
            //         console.error("Error fetching data:", error);
            //     }
            // };
            // fetchAsyncData();
        } else {
            Alert.alert(
                "⚠️ No Internet Connection!",
                "🌐 It looks like you're offline. Please check your connection and try again.",
                [
                    {
                        text: "🔄 Retry",
                        onPress: retryCheck, // Call retryCheck after pressing Retry
                    }
                ],
                { cancelable: false }
            );
        }
    };

    // Trigger alert when isConnected state changes
    useEffect(() => {
        showAlert();
    }, [isConnected]);

    return null; // No need for a return UI element
};

export default ConnectivityChecker;
