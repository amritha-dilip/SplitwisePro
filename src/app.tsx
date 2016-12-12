import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Splitwise } from './app/services';

interface IAppState {
    user: IUser
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    } as React.ViewStyle,

    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    } as React.ViewStyle,

    profile: {
        width: 200,
        height: 200,
        borderRadius: 200,
        margin: 10,
    } as React.ViewStyle,

    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    } as React.ViewStyle,
});

const SPLITWISE_TOKEN = 'xMvvT2KQu3VF7Th2BBTtnG1fOSnIfBbHvaDFLpX6';

export default class App extends Component<any, IAppState> {
    private _api: Splitwise;

    state: IAppState = {
        user: null
    };

    componentDidMount() {
        this.setState({
            user: null
        });

        this._api = new Splitwise(SPLITWISE_TOKEN);

        this._api.getCurrentUser()
            .subscribe((user) => {
                console.log(user);
                this.setState({ user });
            }, error => console.log(error));
    }

    render() {
        let greeting = (
            <Text style={styles.welcome}>
                Welcome to React Native. Getting data from Splitwise
            </Text>
        );

        if (this.state.user) {
            let fullName = ({first_name, last_name}) => `${first_name} ${last_name}`;

            greeting = (
                <View>
                    <Image style={styles.profile} source={{ uri: this.state.user.picture.large }} />
                    <Text style={styles.welcome}>
                        Hello {fullName(this.state.user)}
                    </Text>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                {greeting}
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
            </View>
        );
    }
}
