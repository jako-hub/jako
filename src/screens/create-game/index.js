import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BaseScreen } from '../../components/commons';
import PropTypes from 'prop-types';

/**
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class CreateGameScreen extends React.PureComponent {
    render() {
        const navigation = this.props.navigation;
        return (
            <BaseScreen navigation={navigation}>
                <View style={styles.root}>
                    <Text>
                        Create Game
                    </Text>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    root : {
        paddingHorizontal   : 10,
        paddingVertical     : 10,
        alignItems          : "center",
    },
});

CreateGameScreen.propTypes = {
    navigation : PropTypes.object,
};

export default CreateGameScreen;