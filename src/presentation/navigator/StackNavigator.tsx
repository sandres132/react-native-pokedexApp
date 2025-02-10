import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen,
SearchScreen,
PokemonScreen } from '../screens';

export type RootStackParams = {
    HomeScreen: undefined,
    PokemonScreen: { pokemonId: number },
    SearchScreen: undefined,
    // Product: { id: number, name: string },
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
      <Stack.Navigator screenOptions={{
          headerShown: false,
        //   headerStyle: {
        //       elevation: 0,
        //       shadowColor: 'transparent',
        //   }
      }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />

        {/* <Stack.Screen name="Product" component={ProductScreen} /> */}
      </Stack.Navigator>
  );
}