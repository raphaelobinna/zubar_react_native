import React, { useState } from "react";

import { StyleSheet, View, Image, useWindowDimensions } from "react-native";
import { useAppDispatch } from "../../redux/actions/constants";
import { TabView, TabBar } from "react-native-tab-view";
import {
  ComicRanking,
  GRAY,
  MusicRanking,
  SITE_COLOR,
  TRANSPARENT,
  WHITE,
} from "../../style";
import AuthorizationMonitor from "../../reuseable/AuthorizationMonitor";
import ComicRankings from "./ComicRankings";
import SongRankings from "./MusicRanking";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export default function Rankings({ navigation, route }) {
  const dispatch = useAppDispatch();
  // Available Scenes
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <ComicRankings navigation={navigation} />;
      case "second":
        return <SongRankings navigation={navigation} />;
      default:
        return null;
    }
  };

  // TabView properties
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "Comics" },
    { key: "second", title: "Songs" },
  ]);

  // TabView TabBar properties
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={false}
      activeColor={SITE_COLOR}
      inactiveColor={GRAY}
      indicatorStyle={{
        backgroundColor: SITE_COLOR,
        marginLeft: "12%",
        width: "20%",
      }}
      indicatorContainerStyle={{}}
      labelStyle={{ fontFamily: "gilroy-bold", fontSize: 16, marginBottom: 0 }}
      contentContainerStyle={{}}
      style={{ backgroundColor: TRANSPARENT, elevation: 0 }}
      tabStyle={{}}
    />
  );

  // TabView lazy loaded screens
  const lazyLoad = ({ route }) => {
    switch (route.key) {
      case "first":
        return true;
      case "second":
        return true;
      default:
        return false;
    }
  };

  // Switching tab view route according to route parameters
  React.useEffect(() => {
    if (
      route.params &&
      (route.params.tabViewRoute || route.params.tabViewRoute === 0)
    ) {
      setIndex(route.params.tabViewRoute);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <AuthorizationMonitor navigation={navigation} />
      <View style={{ flex: 0.5 }}>
        <View
          style={{
            width: wp(90),
            height: hp(35),
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={index === 0 ? ComicRanking : MusicRanking}
          />
        </View>
      </View>

      <View style={{ flex: 1 }}>
        <TabView
          lazy={lazyLoad}
          renderTabBar={renderTabBar}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
