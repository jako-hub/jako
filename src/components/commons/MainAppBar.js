import React from 'react';
import {
    Header,
    Body,
    Button,
    Left,
    Right,
    Title,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { displayName as appName } from '../../../app';

/**
 * This component renders the main application menu bar.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param navigation
 * @returns {*}
 * @constructor
 */
const MainAppBar = ({navigation}) => (
    <Header>
        <Left>
            <Button transparent onPress={() => navigation.openDrawer()}>
                <Icon name="bars" size={18}/>
            </Button>
        </Left>
        <Body>
            <Title>{appName}</Title>
        </Body>
        <Right>
            <Button transparent>
                <Icon style={styles.icon} name="ellipsis-v" size={18}/>
            </Button>
        </Right>
    </Header>
);
MainAppBar.propTypes = {
    navigation : PropTypes.object.isRequired,
};

const styles = StyleSheet.create({

});

export default MainAppBar;