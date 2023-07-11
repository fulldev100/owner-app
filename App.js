import React, { Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  StatusBar,
} from "react-native";
import AppNavigator from "./src/Routes";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import Store from "./src/Page/redux/reduxStore/index";
import DropdownAlert from "react-native-dropdownalert";
import { AlertHelper } from "./src/Page/App/AlertHelper";
import { async } from "validate.js";
import LoginPage from "./src/Page/Auth/LoginPage";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

export default function App() {
  // Font Family Load

  let [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/Fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/Fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("./assets/Fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("./assets/Fonts/Poppins-Bold.ttf"),
  });

  // Get the mobile language

  // let deviceLanguage = Platform.OS === 'ios' ?
  // 	NativeModules.SettingsManager.settings.AppleLocale :
  // 	NativeModules.I18nManager.localeIdentifier;
  // SecureStore.setItemAsync('deviceLanguage', deviceLanguage);
  // if (deviceLanguage === undefined) {
  // 	deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0]
  // 	if (deviceLanguage == undefined) {
  // 		return defaultLocalization
  // 	}

  // }
  if (!fontsLoaded) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#102b46" />
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={Store}>
          <AppNavigator style={styles.container} />
          {/* <LoginPage /> */}
        </Provider>
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: "row",
          }}
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </View>
    );
  }
}

// export default class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       fontLoaded: false
//     }
//   }

//   componentDidMount() {
//     this._loadFontsAsync();
//   }
//   _loadFontsAsync = async () => {
//     // loadAsync returns true | error
//     let fontsLoaded = await Font.loadAsync({
//       // add as many fonts as you want here ....
//       'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
//     });
//     this.setState({ fontLoaded: fontsLoaded });
//   };

//     // async componentDidMount() {
//   //   try {
//   //     await Font.loadAsync({
//   //       'Poppins-Bold': require('./assets/Fonts/Poppins-Bold.ttf'),
//   //     })
//   //     this.setState({ fontLoaded: true })
//   //   } catch (error) {
//   //     return
//   //   }
//   // }

//   // render() {
//   //   const { fontLoaded } = this.state

//     render() {
//       const { fontLoaded } = this.state

//       if (!fontLoaded) {
//         return <ActivityIndicator
//         style={styles.loading}
//         size="large"
//         color="#65be44"
//       />;
//       }
//       // from the custom App we return the component we assigned to RootApp.
//       return <AppNavigator style={styles.container} />;
//     }

//     // if (!fontLoaded) {
//     //   return (
//     //     <ActivityIndicator
//     //       style={styles.loading}
//     //       size="large"
//     //       color="#65be44"
//     //     />
//     //   )

//     // }
//     // return (
//     //   <AppNavigator style={styles.container} />
//     // );

//   // }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: "100%",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
