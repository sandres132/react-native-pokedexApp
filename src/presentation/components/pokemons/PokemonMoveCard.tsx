import { Image, Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { PokeMove } from '../../../domain/entities/pokemon';
import { useState } from 'react';
import { Formatter } from '../../../config/helpers/Formatter';
import { ScrollView } from 'react-native-gesture-handler';

interface Props {
    move: PokeMove;
    color: string;
}

export const PokemonMoveCard = ( { move, color }:Props ) => {

    const [isVisible, setIsVisible] = useState(false);
    const { width } = useWindowDimensions();
    
    return (
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={isVisible}
                onRequestClose={() => {
                    setIsVisible(false)
                }}
                onDismiss={() => {
                  setIsVisible(false)
              }}
            >
                <View style={[ styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.6)'} ]}>
                    <View style={[ styles.modalView, { flex: 0.5, width: width * 0.8 } ]}>
                        <Text style={[{ color: 'black', fontSize: 20, fontWeight: 'bold'} ]} lineBreakMode='middle'>
                            { Formatter.capitalize(move.name) }
                        </Text>

                        <ScrollView
                          style={{alignSelf: 'flex-start'}}
                        >
                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Learn at level:
                              </Text>
                              <Text style={{ color: 'black'}}>{ '\t\t\t\t\t\t\t\t\t\t\t\t\t' + move.level }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Power:
                              </Text>
                              <Text style={{ color: 'black'}}>{ move.power != undefined ? '\t\t\t\t\t\t' + move.power : '\t\t\t\t\t\t---' }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  PP:
                              </Text>
                              <Text style={{ color: 'black'}}>{ move.pp != undefined ? '\t\t\t\t\t\t' + move.pp : '\t\t\t\t\t\t---' }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Accuracy:
                              </Text>
                              <Text style={{ color: 'black'}}>{ move.accuracy != undefined ? '\t\t\t\t\t\t' + move.accuracy : '\t\t\t\t\t\t---' }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Target:
                              </Text>
                              <Text style={{ color: 'black'}}>{ Formatter.capitalize(move.target.replace('-', ' ')) != undefined ? '\t\t\t\t\t\t' + Formatter.capitalize(move.target.replace('-', ' ')) : '\t\t\t\t\t\t---' }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Damage class:
                              </Text>
                              <Text style={{ color: 'black'}}>{ Formatter.capitalize(move.damageClass) != undefined ? '\t\t\t\t\t\t\t\t\t\t\t\t\t' + Formatter.capitalize(move.target.replace('-', ' ')) : '\t\t\t\t\t\t\t\t\t\t\t\t\t---' }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Short Description:
                              </Text>
                              <Text style={{ color: 'black'}}>{ move.description.map(des => des.shortDesc ) != null ? move.description.map(des => des.shortDesc ) : '---' }</Text>
                          </View>

                          <View style={[ styles.statsContainer, { alignSelf: 'flex-start' } ]} >
                              <Text style={{ color: 'black', fontWeight: 'bold' }} >
                                  Description:
                              </Text>
                              <Text style={{ color: 'black'}}>{ move.description.map(des => des.desc ) != null ? move.description.map(des => des.desc ) : '---' }</Text>
                          </View>
                        </ScrollView>

                        <View style={{ flex: 1, margin:10 }}/>
                        <Pressable
                            style={[styles.button, { backgroundColor: color}]}
                            onPress={() => setIsVisible(false) }>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={{ flex: 1 }}
                onPress={ () => {
                    setIsVisible(true)
                }}
            >
                <Card style={[ styles.cardContainer, { backgroundColor: color } ]}>
                    <Text style={[ styles.name, { color: 'black', fontWeight: 'bold'} ]} variant='bodyLarge' lineBreakMode='middle'>
                        { move.name }
                        { '\nLevel ' + move.level }
                    </Text>

                    <View style={ styles.pokeballContainer }>
                        <Image
                            source={ require('../../../assets/pokeball-light.png')}
                            style={ styles.pokeball }
                        />
                    </View>

                </Card>
            </Pressable>
        </>
      )
}


const styles = StyleSheet.create({
    cardContainer: {
      marginHorizontal: 10,
      backgroundColor: 'grey',
      height: 80,
      width: 120,
      flex: 1,
      marginBottom: 25,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
  
      elevation: 5,
    },
    name: {
      color: 'white',
      top: 10,
      left: 10,
    },
    pokeball: {
      width: 100,
      height: 100,
      right: -25,
      top: -25,
      opacity: 0.4,
    },
    pokemonImage: {
      width: 120,
      height: 120,
      position: 'absolute',
      right: -15,
      top: -30,
    },
  
    pokeballContainer: {
      alignItems: 'flex-end',
      width: '100%',
      position: 'absolute',
  
      overflow: 'hidden',
      opacity: 0.5,
    },
    statsContainer: {
      flexDirection: 'column',
      marginHorizontal: 20,
      alignItems: 'flex-start',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      },
      button: {
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12,
        padding: 10,
        shadowRadius: 10,
        width: '100%',
        elevation: 2,
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});