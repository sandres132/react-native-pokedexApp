import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Si se elige Ionicons si no seria el de su eleccion

export const HomeScreen = () => {

    const myIcon = <Icon name='rocket-outline' size={100} color='#900' />

    return (
        <View>
            <Text>HomeScreen</Text>
            {myIcon}
        </View>
    )
}