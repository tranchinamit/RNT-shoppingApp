# Practice RNT - ShoppingApp

## The purpose

    The practical project, support me to learning React Native

## How to run the project

    #"yarn start": "expo start",
    #"yarn android": "expo start --android",
    #"yarn ios": "expo start --ios",
    #"yarn web": "expo start --web",

## How to build the project

    #"expo build:android",
    #"expo build:ios",

## Server info

    Firebase:
      Email: tranchinamitytb@gmail.com
      Project: rn-shopping-app
      URL: https://rn-shopping-app-2d05b-default-rtdb.firebaseio.com/

## Animated-switch

    Android still use createSwitchNavigator
    iOS & web can use createAnimatedSwitchNavigator
    About others: need to test more

    => https://github.com/react-navigation/animated-switch/blob/master/example/src/index.tsx

## Storage

    @react-native-async-storage/async-storage

    => https://react-native-async-storage.github.io/async-storage/docs/install/

## Warning!!!

    With the "Auto Logout" approach implemented in the previous lecture, you'll very likely get a warning like this on Android:

    Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981

    What's the problem?

    Using setTimeout() with a big timeout duration (as we're setting it => 1 hour), can't be handled in the most efficient way by Android. Unfortunately, there is no perfect solution available though but you can browse the referenced issue thread for possible workarounds: https://github.com/facebook/react-native/issues/12981

## Author

    Name: Nam Tran
    Email: tranchinamit@gmail.com
    My devices: 
      iOS     - 14.5.1
      android - 9.0
      web     - 90.0.4430.212 (chrome)
    
    ( ^ __ ^ )
    
    ps: Don't hesitate to contact me, if you have any questions!!!

