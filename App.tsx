import * as React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootSiblingParent } from 'react-native-root-siblings';
import * as Font from "expo-font";
import HomeScreen from './src/screens/Common/HomeScreen';
import { DrawerContent } from './src/navigation/DrawerContent';
import metrics from './src/style/metrics';
import { HomeSVG, ProfileSVG, RankingSVG } from './src/assets';
import { TabImageButton } from './src/navigation/CustomTabBarIcon';
import SearchScreen from './src/screens/Common/SearchScreen';
import CreateScreen from './src/screens/Common/CreateScreen';
import MessageScreen from './src/screens/Common/MessageScreen';
import { Provider } from 'react-redux';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import { ActivityMessage } from './src/reuseable/ActivityMessage';
import { ActivityNotification } from './src/reuseable/ActivityNotification';
import store from './src/redux/store';
import LoginScreen from './src/screens/Authorization/LoginScreen';
import RegisterScreen from './src/screens/Authorization/Register';
import { SITE_COLOR, WHITE } from './src/style';
import { HeaderLeft } from './src/header/HeaderLeft';
import Rankings from './src/screens/Rankings/Rankings';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

export default function App() {

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();


  const [ready, setReady] = React.useState(false);



  React.useEffect(() => {
    Font.loadAsync({
      "gilroy-bold": require("./assets/gilroy/Gilroy-Bold.ttf"),
      "gilroy-extraBold": require("./assets/gilroy/Gilroy-ExtraBold.ttf"),
      "gilroy-extraBoldItalic": require("./assets/gilroy/Gilroy-ExtraBoldItalic.ttf"),
      "gilroy-heavy": require("./assets/gilroy/Gilroy-Heavy.ttf"),
      "gilroy-light": require("./assets/gilroy/Gilroy-Light.ttf"),
      "gilroy-regular": require("./assets/gilroy/Gilroy-Regular.ttf"),
      "gilroy-medium": require("./assets/gilroy/Gilroy-Medium.ttf"),
      "gilroy-semiBold": require("./assets/gilroy/Gilroy-SemiBold.ttf"),
    }).then(() => {
      setReady(true);
    });
  }, []);

  if (!ready) {
    return (<ActivityIndicator />)
  }

  const toastConfig = {

    successToast: ({ text1, text2 }) => (
      <View style={{
        width: '90%', alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#008319',
        borderRadius: 8
      }}>
        <View style={{ width: '80%', alignSelf: 'center', marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: "white" }}>{text1}</Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: "white", marginTop: 5 }}>{text2}</Text>
        </View>
      </View>
    ),
    errorToast: ({ text1, text2 }) => (
      <View style={{
         width: '90%', alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,0,0,0.95)',
        borderRadius: 8
      }}>
        <View style={{ width: '80%', alignSelf: 'center', marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: "white" }}>{text1}</Text>
          <Text style={{ fontSize: 13, fontWeight: '500', color: "white", marginTop: 5 }}>{text2}</Text>
        </View>
      </View>
    )
  }
  

  function DrawerNavigator() {
    return (
      <>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            headerLeft:(props) => <></>,
            drawerStyle: {
              width: metrics.screenWidth * 0.86,
              backgroundColor: WHITE
            },
            overlayColor: 'rgba(4,4,16,0.8)',
            unmountOnBlur: true,
            drawerType: 'front',
            swipeEnabled: true,
            drawerActiveBackgroundColor:SITE_COLOR,
            drawerActiveTintColor: WHITE,
            drawerLabelStyle:{fontFamily:'gilroy-bold'},
          }}
          drawerContent={(props) => <DrawerContent {...props} />}>

          <Drawer.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false, title: 'Home', drawerIcon: ({ color }) => <HomeSVG color={color} height={32} width={32} /> }}
          />
          <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false, title: 'Profile', drawerIcon: ({ color }) => <ProfileSVG color={color} height={32} width={32} /> }}
          />
           <Drawer.Screen
            name="Rankings"
            component={Rankings}
            options={{ headerShown: false, title: 'Rankings', drawerIcon: ({ color }) => <RankingSVG color={color} height={32} width={32} /> }}
          />
          {/* <Drawer.Screen
            name="IndexTrackOrders"
            component={IndexTrackOrder}
            options={{ headerShown: true, title: 'Track Order', drawerIcon: ({ color }) => <LocationSVG height={32} width={32} /> }}
          />

          <Drawer.Screen
            name="IndexDelivery"
            component={IndexDeliveryScreen}
            options={{ headerShown: true, title: 'Delivery Rates', drawerIcon: ({ color }) => <DeliverySVG height={32} width={32} /> }}
          /> */}
        </Drawer.Navigator>
      </>
    );
  }

  function TabNavigator({ navigation, route }) {
    return (
      <Tab.Navigator
        screenOptions={{
          headerStyle: { height: 120 },
          tabBarStyle: { height: 80, justifyContent: 'center', alignItems: 'center', paddingVertical: 21 },
        }}
      >

        {/* <Tab.Screen
          name="Home"
          component={DrawerNavigator}
          options={{ headerShown: false,
            tabBarButton: (props) => <TabImageButton {...props} title={'Home'} iconName={'home'} />
          }}
        /> */}

        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarButton: (props) => <TabImageButton {...props} title={'Home'} iconName={'home'} />
          }}
        />


        <Tab.Screen
          name="IndexSearch"
          component={SearchScreen}
          options={{
           
            tabBarButton: (props) => <TabImageButton {...props} title={'Search'} iconName={'search'} />
          }}
        />

        <Tab.Screen
          name="IndexCreate"
          component={CreateScreen}

          options={{
            tabBarButton: (props) => <TabImageButton {...props} title={'Create'} iconName={'create'} />
          }}
        />

        <Tab.Screen
          name="IndexMessaging"
          component={MessageScreen}
          options={{
            tabBarButton: (props) => <TabImageButton {...props} title={'Inbox'} iconName={'inbox'} />
          }}
        />

        <Tab.Screen
          name="IndexProfile"
          component={ProfileScreen}
          options={{
            tabBarButton: (props) => <TabImageButton {...props} title={'Profile'} iconName={'profile'} />
          }}
        />

      </Tab.Navigator>
    );
  }


  return (
    <Provider store={store}>
      <RootSiblingParent>
       
        <NavigationContainer>
          <Stack.Navigator>
            {/* <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          /> */}

            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />



          </Stack.Navigator>
        </NavigationContainer>
      </RootSiblingParent>
      <Toast config={toastConfig} />
    </Provider>
  );
}