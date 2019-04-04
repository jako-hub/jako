import React from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import Header, { GameItemBody } from '../../../game-item-header';
import Footer from './Footer';
import ImagePreview from './ImagePreview';
import PropTypes from 'prop-types';

/**
 * This component renders the Item presentation
 * @param {*} param0 
 */
const Item = ({item, onSelect}) => (
    <View style={styles.root}>
        <TouchableOpacity onPress={onSelect}>
            <View style={styles.wrapper}>
                <View style={styles.pictureWrapper}>
                    <ImagePreview />
                </View>
                <View style={styles.infoWrapper}>
                    <Header
                        title               = { item.juego_nombre                }
                        date                = { item.juego_fecha_desde           }
                        dateTo              = { item.juego_fecha_hasta           }
                        totalPlayers        = { item.juego_jugadores             }
                        confirmedPlayers    = { item.juego_jugadores_confirmados }
                    />
                    <GameItemBody 
                        game={item}
                    />
                </View>
            </View>
        </TouchableOpacity>
        <Footer
            gameCode = {item.codigo_juego}
         />
    </View>
    
);

const styles = StyleSheet.create({
    root : {
        flex : 1,
        marginVertical : 15,
    },
    wrapper : {
        flex : 1,
        flexDirection   : "row",
        justifyContent  : "space-between",
        alignItems      : "center",
    },
    pictureWrapper : {
        flex : 3,
        justifyContent : "center",
        alignItems  : "center",
    },
    infoWrapper : {
        flex : 7,
    },
});

Item.propTypes = {
    onSelect    : PropTypes.func,
    onAdd       : PropTypes.func,
    onComment   : PropTypes.func,
};

export default Item;