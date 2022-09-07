import * as React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { LIGHT_GRAY, SITE_COLOR, BLACK } from "../style";
import { StyleSheet, View, Text } from "react-native";
import { useAppSelector } from "../redux/actions/constants";
import { isEmpty } from "../helpers/helper";

export const DrawerContent = (props) => {
  const authState = useAppSelector((state) => state.auth);
  let UserName =
    !isEmpty(authState.user) &&
    authState.user.username[0].toUpperCase() +
      authState.user.username.substring(1, 8);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.article}>
        <Text style={styles.userNameText}>{UserName ?? "Guest"}</Text>
      </View>

      <DrawerItemList
        {...props}
        labelStyle={styles.labelText}
        activeTintColor={SITE_COLOR}
        activeBackgroundColor={SITE_COLOR}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 150,
    alignSelf: "center",
    justifyContent: "center",

    opacity: 1,
  },
  article: {
    flexDirection: "column",
    alignSelf: "flex-start",
    padding: 24,
  },
  alignSelfStart: {
    alignSelf: "flex-start",
  },
  alignSelfCentre: {
    alignSelf: "center",
  },
  imageCard: {
    width: 100,
    height: 100,
    flexDirection: "column",
    justifyContent: "center",
    borderRadius: 150 / 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150 / 2,
  },
  paddingLeftRight10: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  userNameText: {
    fontFamily: "gilroy-medium",

    fontSize: 24,
    lineHeight: 36,
    color: BLACK,
  },
  userEditText: {
    fontFamily: "gilroy-regular",
    fontSize: 12,
    lineHeight: 15,
    color: "#CE2600",
  },

  bottomContainer: {
    paddingTop: 24,
    paddingLeft: 20,
    flexDirection: "row",
    marginTop: 16,
    alignContent: "center",
  },
  alignSelfCentre: {
    alignSelf: "center",
  },
  labelText: {
    fontFamily: "gilroy-regular",
    fontSize: 16,
    lineHeight: 20.83,
    color: BLACK,
  },
});
