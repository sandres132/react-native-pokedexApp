import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, FAB, Text, useTheme } from 'react-native-paper';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigator/StackNavigator';

import { PokeballBg } from '../../components/ui/PokeballBg';
import { globalTheme } from '../../../config/theme/global-theme';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { getPokemons } from '../../../actions/pokemons';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'>{}

export const HomeScreen = ({navigation}: Props) => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();
    const theme = useTheme();

    // Esta es la forma tradicional de una peticion http con tanstackquery
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60, // 60 minutos mantenga la data de la peticion
    // });

    // forma de hacer peticiones infitas con tanstackquery
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60, // 60 minutos mantenga la data de la peticion
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);

            pokemons.forEach( pokemon => {
                queryClient.setQueryData( ['pokemon', pokemon.id ], pokemon );
            })

            return pokemons
        },
        getNextPageParam: ( lastPage, pages ) => pages.length,
    });

    return (
        <View style={ globalTheme.globalMargin }>
            <PokeballBg style={ styles.imgPosition } />
            {/* <PokeballBg style={ styles.imgPosition2 } /> */}

            <FlatList
                data={ data?.pages.flat() ?? [] }
                keyExtractor={ (pokemon, index) => `${pokemon.id} - ${index}`}
                numColumns={2}
                ListHeaderComponent={ () => (
                    <Text variant='displayMedium'>Pokédex</Text>
                )}
                style={{ paddingTop: top + 20 }}
                renderItem={ ({ item }) => <PokemonCard pokemon={item} /> }
                onEndReachedThreshold={ 0.6 }
                onEndReached={ () => fetchNextPage() }
                showsVerticalScrollIndicator={ false }
                ListFooterComponent={ () => (
                    <View style={{ height: 150, justifyContent: 'center' }}>
                        <ActivityIndicator size={ 40 }/>
                    </View>
                )}
            />

            <FAB
                label='Search'
                style={[ globalTheme.fab, { backgroundColor: theme.colors.primary } ]}
                mode='elevated'
                icon='search-outline'
                color={ theme.dark ? 'black' : 'white' }
                onPress={() => navigation.push('SearchScreen')}
            />

            {
                isLoading && (
                    <ActivityIndicator
                        style={{position: 'absolute'}}
                        color="grey"
                        size={30}
                    />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -70,
        right: -70,
    },
    // imgPosition2: {
    //     position: 'absolute',
    //     top: 770,
    //     left: -70,
    // },
})