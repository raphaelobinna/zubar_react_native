import React, { useState } from 'react';

import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useAppDispatch } from '../../redux/actions/constants';
import { TabView, TabBar } from 'react-native-tab-view';
import { GRAY, SITE_COLOR, TRANSPARENT, WHITE } from '../../style';
import ComicCreate from '../../presenters/createPresenters/Comic';
import Player from '../../presenters/player/SongPlayer';
import MusicCreate from '../../presenters/createPresenters/Music';
import AuthorizationMonitor from '../../reuseable/AuthorizationMonitor';

export default function CreateScreen({ navigation, route }) {


    const dispatch = useAppDispatch()
    // Available Scenes
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <ComicCreate navigation={navigation} />;
            case 'second':
                return <MusicCreate navigation={navigation} />;
            default:
                return null;
        }
    };

    // TabView properties
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Comics' },
        { key: 'second', title: 'Songs' },
    ]);


    // TabView TabBar properties
    const renderTabBar = props => (
        <TabBar
            {...props}
            scrollEnabled={false}
            activeColor={SITE_COLOR}
            inactiveColor={GRAY}
            indicatorStyle={{ backgroundColor: SITE_COLOR, marginLeft: '12%', width: '20%' }}
            indicatorContainerStyle={{}}
            labelStyle={{ fontFamily: 'gilroy-bold', fontSize: 16 }}
            contentContainerStyle={{}}
            style={{ backgroundColor: TRANSPARENT, elevation: 0 }}
            tabStyle={{}}
        />
    );


    // TabView lazy loaded screens
    const lazyLoad = ({ route }) => {
        switch (route.key) {
            case 'first':
                return true;
            case 'second':
                return true;
            default:
                return false;
        }
    }

    // Switching tab view route according to route parameters
    React.useEffect(() => {
        if (route.params && (route.params.tabViewRoute || route.params.tabViewRoute === 0)) {
            setIndex(route.params.tabViewRoute);
        }
    }, [route.params])



    return (
        <View style={styles.container}>
             <AuthorizationMonitor navigation={navigation} />

            <TabView
                lazy={lazyLoad}
                renderTabBar={renderTabBar}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WHITE
    }
});