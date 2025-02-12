import { View, Text } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

interface Props {
    color?: string;
}

export const FullScreenLoader = ( { color }:Props) => {

    const { colors } = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color,
        }}>

            <ActivityIndicator size={ 50 } />
            
        </View>
    )
}