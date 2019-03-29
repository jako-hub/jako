import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {
    Container,
    Text,
    Tab,
    Tabs,
} from 'native-base';
import {_t} from "../../configs/dictionary";
import stylesPalette from "../../utils/stylesPalette";
import ListComponent from './my-games-list';
import {withGames, withSearch} from "../../providers";

class MyGamesComponent extends React.Component {
    state = {
        currentTab : 0,
        games : [],
    };
    componentDidMount() {
        this.fetchGames();
    }

    fetchGames() {
        this.props.fetchMyGames(this.props.userCode);
    }

    onSelectGame(selectedGame) {
        this.props.selectGame(selectedGame);
        const currentRoute = this.props.navigation.state.routeName;
        this.props.navigation.navigate("GameDetail", {prevRoute : currentRoute});
    }

    render() {
        const { myGames=[]} = this.props;
        console.log(myGames);
        return (
            <Container>
                <Tabs>
                    <Tab heading={_t('my_games_title_2')} tabStyle={styles.tab} activeTabStyle={styles.tabActive}>
                        <ListComponent
                            games   = { myGames }
                            onSelectGame = {this.onSelectGame.bind(this)}
                        />
                    </Tab>
                    <Tab heading={_t('my_games_title_3')} tabStyle={styles.tab} activeTabStyle={styles.tabActive}>
                        <Text>
                            Historico
                        </Text>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

const palette = stylesPalette();
const styles = StyleSheet.create({
    tab : {
        backgroundColor : palette.primary.color,
    },
    tabActive : {
        backgroundColor : palette.primary.color,
    },
});

MyGamesComponent.propTypes = {
    navigation      : PropTypes.object.isRequired,
    fetchMyGames    : PropTypes.func,
    myGames         : PropTypes.array,
    userCode        : PropTypes.any,
};

export default withGames(withSearch(MyGamesComponent));