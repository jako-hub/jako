import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Input,
    Form,
    Label,
    Item,    
} from 'native-base';
import { ScenarioPicker } from '../../components';
import { 
    DateTimePicker,
    SubmitButton,
    FieldSetTitle,
} from '../../commons/forms';
import {
    Row,
    Col,
} from '../../commons/forms/Layout';
import TeamManager from './TeamManager';

const GameForm = (props) => {
    const {
        onChange, 
        onSelectScenario,
        onChangeDate,
        gameName,
        isValidForm,
        date,
        onSubmit,
        onAddTeam,
        onRemoveTeam,
        teams=[],
        startHour,
        endHour,
        onChangeTime,
    } = props;
    return (
        <View style={styles.root}>            
            <Form style={styles.form}>
                <Item floatingLabel>
                    <Label>{"Nombre del juego"}</Label>
                    <Input 
                        value        = { gameName                        }
                        onChangeText = { text => onChange("name", text)  }
                    />
                </Item>
                <DateTimePicker 
                    value       = { date         }
                    onChange    = { onChangeDate }
                    label       = { "Seleccione el día" }
                    mode        = "date"
                />
                <Row>
                    <Col>
                        <DateTimePicker 
                            value       = { startHour         }
                            onChange    = { date => onChangeTime('startAt', date) }
                            label       = { "Inicio" }
                            mode        = "time"
                        />
                    </Col>
                    <Col>
                        <DateTimePicker 
                            value       = { endHour         }
                            onChange    = { date => onChangeTime('endsAt', date) }
                            label       = { "Fin" }
                            mode        = "time"
                        />
                    </Col>
                </Row>
                <ScenarioPicker 
                    onSelectScenario = { onSelectScenario }
                />
                <FieldSetTitle title={"Equipos del juego"} />
                <TeamManager 
                    teams       = { teams        }
                    onAddTeam   = { onAddTeam    }
                    onRemoveTeam= { onRemoveTeam }
                />
                <View>
                    <SubmitButton 
                        primary
                        block
                        disabled = { !isValidForm    }
                        label    = { "Guardar juego" }
                        onPress  = { onSubmit        }
                    />
                </View>
                
            </Form>
        </View>
    );
};

const styles = StyleSheet.create({
    root : {        
        paddingHorizontal : 10,
        paddingVertical : 10,
    },
});

GameForm.propTypes = {    
    gameName : PropTypes.string,
    scenario : PropTypes.any,
    onSelectScenario : PropTypes.func,
    onChange         : PropTypes.func,
    onChangeDate     : PropTypes.func,
    isValidForm      : PropTypes.bool,
    onAddTeam        : PropTypes.func,
    onRemoveTeam     : PropTypes.func,
    onSubmit         : PropTypes.func,
    teams            : PropTypes.array,
    startHour        : PropTypes.string,      
    endHour          : PropTypes.string,
    onChangeTime     : PropTypes.func,
};

export default GameForm;