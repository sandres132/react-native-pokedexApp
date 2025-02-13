import { StackScreenProps } from '@react-navigation/stack';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { RootStackParams } from '../../navigator/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { getPokemonById } from '../../../actions/pokemons';
import { Chip, FAB, Text } from 'react-native-paper';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { Formatter } from '../../../config/helpers/Formatter';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { isDark, theme } = useContext( ThemeContext )
    const { pokemonId } = route.params;
    const { top } = useSafeAreaInsets();

    const pokeballImg = isDark
        ? require('../../../assets/pokeball-light.png')
        : require('../../../assets/pokeball-dark.png');

    const { isLoading, data: pokemon } = useQuery({
        queryKey: ['pokemon', pokemonId],
        queryFn: () => getPokemonById(pokemonId),
        staleTime: 1000 * 60 * 60, // 1 hour
    })

    if (!pokemon) {
        return (<FullScreenLoader />)
    }

    const onPress = (value: number) => {
        if( pokemonId + value === 0 ) return;
        navigation.navigate('PokemonScreen', { pokemonId: pokemon.id + value })
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: pokemon.color }}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            {/* Header Container */}
            <View style={styles.headerContainer}>
                {/* Nombre del Pokemon */}
                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 5,
                    }}>
                    {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
                </Text>

                {/* Pokeball */}
                <Image source={pokeballImg} style={styles.pokeball} />

                <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
            </View>

            {/* Types */}
            <View
                style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10 }}>
                {pokemon.types.map(type => (
                    <Chip
                        key={type}
                        mode="outlined"
                        selectedColor={ isDark ? 'white' : 'black'}
                        style={{ marginLeft: 10 }}>
                        {type}
                    </Chip>
                ))}
            </View>

            {/* Sprites */}
            <FlatList
                data={pokemon.sprites}
                horizontal
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                centerContent
                style={{
                    marginTop: 20,
                    height: 100,
                }}
                renderItem={({ item }) => (
                    <FadeInImage
                        uri={item}
                        style={{ width: 100, height: 100, marginHorizontal: 5 }}
                    />
                )}
            />

            {/* Weight and Height */}
            <View style={[ styles.statsContainer, { flexDirection: 'row' } ]} >
                <Text variant='displaySmall' style={{ flex: 1, color: isDark ? 'white' : 'black' }} >
                    {`Height: ${pokemon.height} ft`}
                </Text>
                <Text variant='displaySmall' style={{ flex: 1, color: isDark ? 'white' : 'black' }} >
                    {`Weight: ${pokemon.weight} lbs`}
                </Text>
            </View>

            {/* abilities */}
            <Text style={[ styles.subTitle, { color:  isDark ? 'white' : 'black' } ]}>Abilities</Text>
            <FlatList
                data={pokemon.abilities}
                horizontal
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Chip selectedColor={ isDark ? 'white' : 'black'} style={{marginRight: 10}} >{Formatter.capitalize(item)}</Chip>
                )}
                style={{paddingHorizontal: 20}}
            />

            {/* stats */}
            <Text style={[ styles.subTitle, { color:  isDark ? 'white' : 'black' } ]}>Stats</Text>
            <FlatList
                data={pokemon.stats}
                horizontal
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={ styles.statsContainer } >
                        <Text style={{ flex: 1, color:  isDark ? 'white' : 'black' }} >
                            {Formatter.capitalize(item.name)}
                        </Text>
                        <Text style={{ color:  isDark ? 'white' : 'black'}}>{ item.value }</Text>
                    </View>
                )}
            />

            {/* Moves */}
            <Text style={[ styles.subTitle, { color:  isDark ? 'white' : 'black' } ]}>Moves</Text>
            <FlatList
                data={pokemon.moves}
                horizontal
                showsHorizontalScrollIndicator={false}
                centerContent
                renderItem={({ item }) => (
                    <View style={ styles.statsContainer } >
                        <Text style={{ flex: 1, color:  isDark ? 'white' : 'black' }} >
                            {Formatter.capitalize(item.name)}
                        </Text>
                        <Text style={{ color:  isDark ? 'white' : 'black'}}>lvl { item.level }</Text>
                    </View>
                )}
            />

            {/* Games */}
            <Text style={[ styles.subTitle, { color:  isDark ? 'white' : 'black' } ]}>Games</Text>
            <FlatList
                data={pokemon.games}
                horizontal
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                centerContent
                renderItem={({ item }) => (
                    <View style={ styles.statsContainer } >
                        <Chip selectedColor={ isDark ? 'white' : 'black'}>{ Formatter.capitalize(item)}</Chip>
                    </View>
                )}
            />

            <FAB
                onPress={ () => onPress(-1) }
                style={[
                    styles.button,
                    {
                        left: 30,
                        backgroundColor: theme.colors.primary
                    },
                ]}
                color={ theme.dark ? 'black' : 'white' }
                icon='arrow-back-outline'
                mode='flat'
            />
            
            <FAB
                onPress={ () => onPress(1) }
                style={[
                    styles.button,
                    {
                        right: 30,
                        backgroundColor: theme.colors.primary
                    },
                ]}
                color={ theme.dark ? 'black' : 'white' }
                icon='arrow-forward-outline'
                mode='flat'
            />

            <View style={{ height: 100 }} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
      height: 370,
      zIndex: 999,
      alignItems: 'center',
      borderBottomRightRadius: 1000,
      borderBottomLeftRadius: 1000,
      backgroundColor: 'rgba(0,0,0,0.2)',
    },
    pokemonName: {
      color: 'white',
      fontSize: 40,
      alignSelf: 'flex-start',
      left: 20,
    },
    pokeball: {
      width: 250,
      height: 250,
      bottom: -20,
      opacity: 0.7,
    },
    pokemonImage: {
      width: 240,
      height: 240,
      position: 'absolute',
      bottom: -40,
    },
    loadingIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subTitle: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 20,
      marginTop: 20,
    },
    statsContainer: {
      flexDirection: 'column',
      marginHorizontal: 20,
      alignItems: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 15,
        width: 70,
        // borderRadius: 10,
        // borderColor: 'white',
        // borderWidth: 1.5,
        // padding: 10,
        alignItems: "center",
        // backgroundColor: 'rgba(0,0,0,0.2)',
    },
});