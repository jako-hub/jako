import React from 'react';
import BaseScreen from '../BaseScreen';
import { withUserData } from '../../providers';
import FriendshipRequestsReceived from '../../components/my-profile/friendship-requests-received';


class TestAreaScreen extends React.Component {
    state = {
        open : false,
    };
    toggle() {
        this.setState({
            open : !this.state.open,
        });
    }
    render() {
        const navigation = this.props.navigation;
        const {open} = this.state;
        return (
            <BaseScreen
                navigation = { navigation }
            >
                <FriendshipRequestsReceived 
                    navigation = { navigation } 
                    onlyIfResults
                />
            </BaseScreen>
        );
    }
}

export default withUserData(TestAreaScreen);