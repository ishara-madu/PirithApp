import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { fetchData, getData } from '../pages/Database';
import { useGlobalContext } from './Hooks/GlobalContext';

const ConnectivityChecker = () => {
    const [isConnected, setIsConnected] = useState<any>(true);
    const { setData } = useGlobalContext();

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });

        return () => unsubscribe();
    }, []);


    const showAlert = async () => {
        if (isConnected) {
            try {
                await fetchData();
                const fetchAsyncData = async () => {
                    try {
                        const users = await getData("item");
                        setData(users);

                    } catch (error) {
                        console.error("Error fetching data:", error);
                    }
                };
                await fetchAsyncData();
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        showAlert();
    }, [isConnected]);

    return (
        <>{
            !isConnected && (
                <View className="flex-1 items-center justify-center bg-gray-900/80 absolute z-50 w-full h-full">
                    <View className="bg-white p-6 rounded-xl shadow-2xl w-11/12 max-w-md">
                        <Text className="text-base font-bold text-red-600 mb-2 flex items-center">
                            ⚠️ No Internet Connection!
                        </Text>
                        <Text className="text-sm text-gray-700 leading-relaxed">
                            It seems you're currently offline. Please check your internet connection and try again.
                        </Text>
                    </View>
                </View>
            )
        }
        </>
    )
};

export default ConnectivityChecker;
