import React, { Component } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    StatusBar,
    ListView,
    Text,
    View
} from 'react-native';

export default class Movies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        return fetch('http://a665e4af.ngrok.io/cars')
            .then((response) => response.json())
            .then((responseJson) => {
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson),
                }, function() {
                    // do something with new state
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, padding: 40}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <View style={{flex: 1, padding: 40}}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor={'#202930'} />

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <Text>{rowData.id}, {rowData.name}</Text>}
                />
                <Button
                    onPress={() => { Alert.alert('You tapped the button!')}}
                    title="Press Me"
                />
            </View>
        );
    }
}