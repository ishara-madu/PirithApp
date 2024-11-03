import { View, Text, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import { darkStyles, lightStyles, useGlobalContext } from './Hooks/GlobalContext'

const ExitAlert = () => {
    const [showExitPopup,setShowExitPopup] = React.useState(false)
    const { theme,showPlaylist,setShowPlaylist,showMenu,setShowMenu,showSettings,setShowSettings,showAbout,setShowAbout } = useGlobalContext();
    const currentStyles = theme === 'Light' ? lightStyles : darkStyles;

    React.useEffect(() => {
        const actionBack = () => {
            if (showPlaylist && showMenu && showSettings) {
                setShowSettings(false);
            } else if (showPlaylist && showMenu && showAbout) {
                setShowAbout(false);
            } else if (showPlaylist && showMenu) {
                setShowMenu(false);
            } else if (showPlaylist) {
                setShowPlaylist(false);
            } else {
                setShowExitPopup(true);
            }
            return true;
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', actionBack);
    
        return () => {
            backHandler.remove();
        };
    }, [showPlaylist, showMenu, showSettings, showAbout]);
    
    

    return (
        <>
        {
            showExitPopup &&
            <View className='absolute w-full h-full items-center justify-center flex'>

                <View className={`w-[85%] h-28 ${currentStyles.bg_3} flex items-center justify-center rounded-xl`}>
                    <View className='flex w-full h-[60%] justify-center items-center'>
                        <Text className={`${currentStyles.tx_1} text-xs`}>Are you sure you want to exit the app?</Text>
                    </View>
                    <View className='flex w-full flex-row justify-end items-center h-[40%] gap-x-2'>
                            <TouchableOpacity onPress={() => {setShowExitPopup(false)}} className={`w-[20%] h-2/3 justify-center ${currentStyles.bg_active_7} rounded-md flex flex-row items-center`}>
                                <Text className={`${currentStyles.tx_1} text-xs`}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {BackHandler.exitApp()}} className={`w-[20%] h-2/3 justify-center ${currentStyles.bg_active_7} rounded-md flex flex-row items-center`}>
                                <Text className={`${currentStyles.tx_1} text-xs`}>Yes</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </View>
        }
        </>
    )
}

export default ExitAlert