import React from "react";
import { Image, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const SplashScreen = () => {
  
  return (
    <View
      style={{
        flex: 1,
        backgroundColor:'#fff',
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../assets/aidnSplash.png")}
        style={{ height: 400, width: 400}}
        resizeMode="contain"
      ></Image>
    </View>
  );
};

export default SplashScreen;
