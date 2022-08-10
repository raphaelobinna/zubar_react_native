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
import { GRAY, SITE_COLOR } from "../../style";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { getComicsByLikes } from "../../redux/actions/comicActions";
import { getSongByLikes } from "../../redux/actions/songActions";

export default function SongRankings({ navigation }) {
  const rankingState = useAppSelector((state) => state.song);

  const dispatch = useAppDispatch();

  const [refreshing, setRefreshing] = React.useState(false);

  function onRefresh() {
    setRefreshing(true);
    dispatch(getComicsByLikes({ page: 1, limit: 100 }));
    setRefreshing(false);
  }

  React.useEffect(() => {
    dispatch(getSongByLikes({ page: 1, limit: 100 }));
  }, [rankingState.shouldReload]);

  const comicList = (data) => {
    if (isEmpty(data)) {
      return <Text>No Comic</Text>;
    }

    const renderItem = ({ item, index }) => {
      return (
        <TouchableOpacity style={styles.card}>
          <Text style={styles.mediumText}>{index + 1}</Text>

          <Text style={styles.mediumColoredText}>{item.song_name}</Text>

          <Text style={styles.mediumText}>{item.likes}</Text>

          <Text style={styles.mediumText}>
            {new Date(item.created_at).toDateString()}
          </Text>
        </TouchableOpacity>
      );
    };

    const FlatList_Header = () => {
      return (
        <View style={styles.card}>
          <Text style={styles.mediumText}>Pos.</Text>

          <Text style={styles.mediumColoredText}>Title</Text>

          <Text style={styles.mediumText}>Likes</Text>

          <Text style={styles.mediumText}>Date</Text>
        </View>
      );
    };

    return (
      <View style={{ flex: 1, flexDirection: "column" }}>
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
            borderBottomColor: GRAY,
            borderBottomWidth: 2,
          }}
        />
      </View>
    );
  };

  return (
    <>
      <AuthorizationMonitor navigation={navigation} />

      {comicList(rankingState.filteredSong)}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: "row",
    paddingTop: "3%",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  mediumText: {
    fontFamily: "gilroy-medium",
    fontSize: hp(2),
    color: GRAY,
    letterSpacing: wp(0.3),
  },
  mediumColoredText: {
    fontFamily: "gilroy-medium",
    fontSize: hp(2),
    color: SITE_COLOR,
    letterSpacing: wp(0.3),
  },
});
