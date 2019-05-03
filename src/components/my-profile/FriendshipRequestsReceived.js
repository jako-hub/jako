import React from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    View,
    Text,
    List,
    ListItem,
    Left,
    Body,
    Right,    
    Thumbnail,
    Button,
} from 'native-base';
import { withUserData } from '../../providers';
import { LoadingSpinner } from '../../commons/loaders';
import {IMAGES_SERVER, DEFAULT_USER_IMG} from 'react-native-dotenv';

const RequestItem = ({request}) => {
    const {
        foto,
        jugador_nombre_corto:short_name,
        jugador_seudonimo:alias,
    } = request;
    return (
        <ListItem thumbnail style = { styles.listItem } noBorder>
            <Left>
                <Thumbnail 
                    source = { {uri : foto? `${IMAGES_SERVER}${foto}` : DEFAULT_USER_IMG} } 
                    style = { [styles.listPhoto, styles.thumbWrapper] }
                />
            </Left>
            <Body>
                <Text>{short_name}</Text>
                <Text note>{alias}</Text>
            </Body>
        </ListItem>
    )
};

const OthersElement = ({others=[], toggleOthers}) => {
    const maxPrevs = 3;
    const total = others.length;
    const itemsList = others.slice(0,maxPrevs);
    const thumbs = itemsList.map((item, key) => (
        <Thumbnail 
            source = { {uri : item.foto? `${IMAGES_SERVER}${item.foto}` : DEFAULT_USER_IMG} }
            key = { `thumb-item-diplay-request-sended-${key}` }
            style = {[styles.thumb, styles[`thumb_${key}`]] } 
        />
    ));
    return (
        <ListItem noBorder button noIndent onPress = { toggleOthers }>
            <Body style = { styles.othersWrapper } >
                <View style = { styles.thumbOthersContainer }>
                    {thumbs}
                    {total > maxPrevs && (<View style = { styles.tipMoreOhers }><Text note>+</Text></View>)}
                </View>
                <Text note style = { {textAlign : "center"} }>
                    Y {total > 1? `${total} Jugadores más` : `1 Jugador más`}
                </Text>
            </Body>
        </ListItem>
    );
}

class FriendshipRequestsReceived extends React.Component {
    state = {
        loading : true,
        showOthers : false,
    };
    componentDidMount() {
        this.fetchRequests();
    }

    async fetchRequests() {
        this.setState({loading: true});
        await this.props.fetchFriendshipRequest();
        this.setState({loading: false});
    }

    toggleOthers() {
        this.setState({
            showOthers : !this.state.showOthers,
        });
    }

    renderList() {
        const {friendshipRequests=[], maxResults=2} = this.props;
        const {showOthers} = this.state;
        let players = friendshipRequests, others = [], totalOthers = 0;
        if(!showOthers) {
            players = friendshipRequests.slice(0,maxResults);
            others = friendshipRequests.slice(maxResults);
            totalOthers = others.length;
        }
        return (
            <View style = { styles.list }>
                <List>
                    {players.map((item, key) => (
                        <RequestItem 
                            key = { `friendship-request-item-list-${key}-${item.codigo_jugador_solicitud}` }
                            request = { item }
                        />
                    ))}
                    {!showOthers && (totalOthers > 0) && (
                        <OthersElement others = { others } toggleOthers = { () => this.toggleOthers() } />
                    )}
                    {showOthers && (
                        <View style = { styles.buttonHide }>
                            <Button light onPress = { () => this.toggleOthers() }>
                                <Text>Ver menos</Text>
                            </Button>
                        </View>
                    )}
                </List>
            </View>
        );
    }

    renderLoader() {
        return (
            <View style = { styles.loader }>
                <LoadingSpinner />
            </View>
        );
    }

    render() {
        const {loading} = this.state;        
        let content = null;
        if(loading) {
            content = this.renderLoader();
        } else {
            content = this.renderList();
        }
        return (
          <View style = {styles.root}>
              {content}
          </View>  
        );
    }
}

const styles = StyleSheet.create({
    root : {

    },
    listPhoto : {

    },
    thumbWrapper : {
        backgroundColor : "#e0e0e0",
    },
    thumbOthersContainer : {
        width           : 60,
        height          : 60,
        justifyContent  : "center",
        alignItems      : "flex-start",
    },
    thumb : {
        backgroundColor : "#e0e0e0",
        position        : "absolute",
        width           : 30,
        height          : 30,
    },
    thumb_0 : { transform : [ {translateX : 0},] },
    thumb_1 : { transform : [ {translateX : 10}, ] },
    thumb_2 : { transform : [{translateX : 20}] },
    othersWrapper : {
        flexDirection       : "row",
        justifyContent      : "center",
        alignItems          : "center",       
        padding             : 0,
        paddingTop          : 0,
        paddingBottom       : 0, 
    },
    buttonHide : {alignItems : "center", flexDirection : "row", justifyContent : "center"}
});

FriendshipRequestsReceived.propTypes = {
    fetchMyFriends      : PropTypes.func,
    userCode            : PropTypes.any,
    setUserData         : PropTypes.func,
    friends             : PropTypes.array,
    photo               : PropTypes.string,
    verified            : PropTypes.bool,
    setVerified         : PropTypes.func,
    friendshipRequests  : PropTypes.array,
    friendshipRequestsReceived    : PropTypes.array,
    fetchUserSendedRequests     : PropTypes.func,
    fetchFriendshipRequest      : PropTypes.func,
    removeFriendshipRequest     : PropTypes.func,
    maxResults : PropTypes.number,
};

export default withUserData(FriendshipRequestsReceived);