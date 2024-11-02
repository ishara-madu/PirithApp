import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { fetchData } from '../pages/Database';

const ConnectivityChecker = () => {
    const [isConnected, setIsConnected] = useState<any>(true);

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
            fetchData();
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
