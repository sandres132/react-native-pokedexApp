import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, Text, TextInput } from 'react-native-paper';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import { getPokemonNamesWithId, getPokemonsByIds } from '../../../actions/pokemons';
import { useMemo, useState } from 'react';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { useDebounceValue } from '../../hooks/useDebounceValue';
import { PokeballBg } from '../../components/ui/PokeballBg';

export const SearchScreen = () => {

    const { top, bottom } = useSafeAreaInsets();
    const [term, setTerm] = useState('');

    const debounceValue = useDebounceValue(term);

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNamesWithId()
    });

    // aplicar el debounce
    const pokemonNameIdList = useMemo( () => {
        // condicion para verificar si es un numero
        if( !isNaN(Number(debounceValue)) ) {
            const pokemon = pokemonNameList.find( pokemon => pokemon.id === Number(debounceValue) );
            return pokemon ? [pokemon] : [];
        }

        // si la persona no ha escrito nada se regresa un arreglo vacio
        if( debounceValue.length === 0 ) return [];

        // si el usuario no ha escrito mas de 3 caracteres enviar un arreglo vacio
        if( debounceValue.length < 3 ) return [];

        return pokemonNameList.filter( pokemon => 
            pokemon.name.includes( debounceValue.toLocaleLowerCase() ),
        )

    }, [debounceValue]);

    const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonNameIdList ],
        queryFn: () => getPokemonsByIds( pokemonNameIdList.map( pokemon => pokemon.id ) ),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    if ( isLoading ) {
        return (<FullScreenLoader/>);
    }

    return (
        <View style={[ globalTheme.globalMargin, { paddingTop: top + 10 } ]}>
            <PokeballBg style={[ styles.imgPosition, { bottom: bottom } ]} />

            <TextInput
                placeholder='Search Pokémon'
                mode='flat'
                autoFocus
                autoCorrect={false}
                onChangeText={ setTerm }
                value={term}
            />

            {
                isLoadingPokemons && (<ActivityIndicator style={{ paddingTop: 20 }}/>)
            }
            
            <FlatList
                data={ pokemons }
                keyExtractor={ (pokemon, index) => `${pokemon.id} - ${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={ ({ item }) => <PokemonCard pokemon={item} /> }
                showsVerticalScrollIndicator={ false }
                ListFooterComponent={ <View style={{ height: Platform.OS === 'android' ? 120 : 150 }} />}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        left: -70,
    },
})