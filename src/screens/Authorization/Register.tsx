import React, { useState } from "react";

import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { RegisterSVG } from "../../assets";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { BLACK, GRAY, SITE_COLOR, WHITE } from "../../style";
import InputText from "../../reuseable/InputText";
import InputSecureText from "../../reuseable/InputSecureText";
import SolidRectangleButton from "../../reuseable/SolidRectangleButton";
import { useAppDispatch, useAppSelector } from "../../redux/actions/constants";
import {
  loginUserAction,
  registerUserAction,
} from "../../redux/actions/authActions";
import { isEmpty } from "../../helpers/helper";

export default function RegisterScreen({ navigation }) {
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.auth);

  const [input, setInput] = useState({
    email: "",
    username: "",
    full_name: "",
    password: "",
    password_confirmation: "",
  });

  const [disabled, setDisabled] = useState(true);

  React.useEffect(() => {
    disableCheck();
  }, [input]);

  React.useEffect(() => {
    if (!isEmpty(authState.user)) {
      return navigation.navigate("Drawer");
    }
  }, [authState]);

  function disableCheck() {
    if (Object.keys(input).find((a) => input[a] === "")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView style={styles.container}>
        <RegisterSVG height={200} width={200} style={styles.svg} />

        <Text style={styles.largeText}>Register</Text>

        <Text style={styles.mediumText}>create an account</Text>

        <View style={styles.article}>
          <InputText
            label={"Full Name"}
            style={InputStyle}
            placeholder={"Enter your full name"}
            returnInput={(value) =>
              setInput({ ...input, full_name: value.trim().toLowerCase() })
            }
          />
        </View>

        <View style={styles.article}>
          <InputText
            label={"Username"}
            style={InputStyle}
            placeholder={"Enter your username"}
            returnInput={(value) =>
              setInput({ ...input, username: value.trim().toLowerCase() })
            }
          />
        </View>

        <View style={styles.article}>
          <InputText
            label={"Email"}
            style={InputStyle}
            placeholder={"Enter your email"}
            returnInput={(value) =>
              setInput({ ...input, email: value.trim().toLowerCase() })
            }
          />
        </View>

        <View style={styles.article}>
          <InputSecureText
            label={"Password"}
            style={InputStyle}
            placeholder={"Enter your password"}
            returnInput={(value) => setInput({ ...input, password: value })}
          />
        </View>

        <View style={styles.article}>
          <InputSecureText
            label={"Confirm Password"}
            style={InputStyle}
            placeholder={"Confirm your password"}
            returnInput={(value) =>
              setInput({ ...input, password_confirmation: value })
            }
          />
        </View>

        <SolidRectangleButton
          style={ButtonStyle}
          disabled={disabled}
          title="Sign up"
          onPress={() =>
            dispatch(registerUserAction({ ...input, content_creator: true }))
          }
        />

        <Text style={styles.smallText}>
          Already have an account?{" "}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.boldText}
          >
            Sign-in
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const InputStyle = StyleSheet.create({
  inputFence: {
    borderWidth: 0,
    backgroundColor: "rgba(29, 113, 185, 0.04)",
    marginLeft: "1%",
    marginRight: "1%",
  },
  input: {
    color: BLACK,
    fontSize: 14,
    lineHeight: 16,
    fontFamily: "gilroy-regular",
  },
});

const ButtonStyle = StyleSheet.create({
  button: {
    backgroundColor: SITE_COLOR,
    marginVertical: 32,
    padding: "3.5%",
    borderRadius: 10,
    width: "100%",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
    paddingTop: 40,
    paddingBottom: 60,

    paddingHorizontal: 28,
  },
  article: {
    marginVertical: "3%",
  },
  svg: {
    marginBottom: hp(5),
    alignSelf: "center",
  },
  largeText: {
    fontSize: hp(5),
    fontFamily: "gilroy-bold",
    color: BLACK,
  },
  boldText: {
    fontFamily: "gilroy-bold",
    color: SITE_COLOR,
  },
  smallText: {
    fontSize: hp(2),
    textAlign: "center",
    fontFamily: "gilroy-regular",
    marginBottom: hp(10),
    color: GRAY,
  },
  mediumText: {
    fontSize: hp(2.5),
    fontFamily: "gilroy-regular",
    color: GRAY,
    marginBottom: 32,
  },
});
