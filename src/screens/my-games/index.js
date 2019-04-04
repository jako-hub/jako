import React from 'react';
import { BaseScreen } from '../../commons';
import PropTypes from 'prop-types';
import {_t} from "../../configs/dictionary";
import { MyGamesComponent } from "../../components";
import { FabButton } from '../../commons';
import { withSession, withSearch } from '../../providers';
import { Linking } from 'react-native';
import { consoleError, resolveUrl } from '../../utils/functions';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class MyGamesScreen extends React.PureComponent {
    componentDidMount() {
        Linking.getInitialURL().then(url => {
            if(url) {
                setTimeout(() => {
                    console.log("Url", url);                    
                    const {action, value} = resolveUrl(url);
                    if(action === "juego") {
                        this.props.selectGame({codigo_juego : value});
                        this.props.navigation.navigate("GameDetail", {goToHome : true});
                    }
                }, 200);
            }   
        })
        .catch(response => {
            consoleError("Read url: ", response);
        });
     }

    render() {
        const {sessionStack, navigation} = this.props;    
        return (
            <BaseScreen navigation={navigation} title={"Mis juegos"}>
                <MyGamesComponent navigation={navigation}/>
                {sessionStack.crearJuego && (
                    <FabButton 
                        icon = "plus"
                        onPress = {() => navigation.navigate("CreateGame", {prevRoute : "MyGames"})}
                    />
                )}          
            </BaseScreen>
        );
    }
}

MyGamesScreen.propTypes = {
    navigation      : PropTypes.object,
    sessionStack    : PropTypes.object,
    selectGame      : PropTypes.func,
};

export default withSession(withSearch(MyGamesScreen));