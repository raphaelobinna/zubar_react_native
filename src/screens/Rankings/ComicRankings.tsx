import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { isEmpty } from "../../helpers/helper";
import { useAppDispatch, useAppSelector } from "../../redux/actions/constants";
import AuthorizationMonitor from "../../reuseable/AuthorizationMonitor";
import { BLACK, GRAY, LIGHT_GRAY, SITE_COLOR } from "../../style";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getComicsByLikes } from "../../redux/actions/comicActions";
import { PaperBoardLayout } from "../../layouts/PaperBoardLayout";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function ComicRankings({ navigation }) {
  const rankingState = useAppSelector((state) => state.comic);

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  console.log("uiororooree", rankingState.filteredComic);

  function onRefresh() {
    setRefreshing(true);
    dispatch(getComicsByLikes({ page: 1, limit: 100 }));
    setRefreshing(false);
  }

  React.useEffect(() => {
    dispatch(getComicsByLikes({ page: 1, limit: 100 }));
  }, [rankingState.shouldReload]);

  const comicList = (data) => {
    if (isEmpty(data)) {
      return <Text>No Comic</Text>;
    }

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate("ComicDetail", { comic: { ...item } })
          }
        >
          <View style={{ flex: 0.3 }}>
            <Text style={styles.mediumText}>{index + 1}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={
                index + 1 === 1
                  ? {
                      ...styles.mediumBoldText,
                      fontSize: hp(2.2),
                      fontFamily: "gilroy-extraBold",
                    }
                  : styles.mediumBoldText
              }
            >
              {item.comic_name}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Icon
                name="cards-heart-outline"
                style={{ marginRight: wp(1) }}
                color={SITE_COLOR}
                size={10}
              />
              <Text style={styles.mediumColoredText}>{item.likes}</Text>
            </View>
          </View>

          <View
            style={{
              flex: 0.5,
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Text style={styles.mediumColoredText}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
        </TouchableOpacity>
      );
    };

    const FlatList_Header = () => {
      return (
        <Text style={styles.mediumDescText}>
          Weekly ranking of the best and exquisite comics and music. Just for
          you!!!
        </Text>
      );
    };

    return (
      <View style={{ flex: 1, flexDirection: "column", padding: wp(4) }}>
        <FlatList
          data={data.data}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[SITE_COLOR]}
              tintColor={SITE_COLOR}
            />
          }
          showsVerticalScrollIndicator={false}
          horizontal={false}
          numColumns={1}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={FlatList_Header}
          ListHeaderComponentStyle={{
            paddingVertical: "5%",
            borderBottomColor: LIGHT_GRAY,
            borderBottomWidth: 1,
          }}
        />
      </View>
    );
  };

  return (
    <PaperBoardLayout navigation={navigation}>
      <AuthorizationMonitor navigation={navigation} />

      {comicList(rankingState.filteredComic)}
    </PaperBoardLayout>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: "3%",
    borderBottomColor: LIGHT_GRAY,
    borderBottomWidth: 0.2,
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  mediumBoldText: {
    fontFamily: "gilroy-medium",
    fontSize: hp(2),
    flex: 1,
    marginBottom: 4,
    color: BLACK,
    letterSpacing: wp(0.3),
  },
  mediumText: {
    fontFamily: "gilroy-bold",
    fontSize: hp(2.5),
    flex: 1,
    fontWeight: "600",
    color: BLACK,
    letterSpacing: wp(0.3),
  },
  mediumDescText: {
    fontFamily: "gilroy-medium",
    flex: 1,
    fontSize: hp(1.7),
    color: GRAY,
    letterSpacing: wp(0.3),
  },
  mediumColoredText: {
    fontFamily: "gilroy-medium",
    flex: 1,
    fontSize: hp(1.7),
    color: SITE_COLOR,
    letterSpacing: wp(0.3),
  },
});
