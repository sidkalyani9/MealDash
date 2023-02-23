import { View, Text, SafeAreaView, Image, TouchableOpacity, Platform } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import React, { useLayoutEffect } from 'react'
import Dummy from './Dummy'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../features/userSlice'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useEffect } from 'react'
import * as AuthSession from 'expo-auth-session';
import { selectAccessToken, selectauth, setAuth } from '../features/authSlice'
import HomeScreen from './HomeScreen'

const Login = () => {

    
    const[userInfo, setUserInfo] = React.useState(null)
    const[isLogged,setIsLogged] = React.useState(false)
    const auth = useSelector(selectauth);
    // const[auth,setAuth] = React.useState(null)
    const[requireRefresh, setRequireRefresh] = React.useState(false)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    WebBrowser.maybeCompleteAuthSession();
    const[accessToken, setAccessToken] = React.useState(null)
    const[request, response, promtAsync] = Google.useIdTokenAuthRequest({
        clientId: "387019062552-iuqdsqvu2knceadhr5lhpecqn1fv5s1h.apps.googleusercontent.com",
        iosClientId: "387019062552-9vp4fl9svqaliirtihmnhgqitc4su70a.apps.googleusercontent.com",
        androidClientId: "387019062552-5mb808mo0pufmcghkelk2gjp6i6blc17.apps.googleusercontent.com"
    })

    const [fontsLoaded] = useFonts({
      'EpilogueB': require('../assets/fonts/Epilogue-Bold.ttf'),
      'EpilogueXB': require('../assets/fonts/Epilogue-ExtraBold.ttf'),
      'EpilogueR': require('../assets/fonts/Epilogue-Regular.ttf'),
      'EpilogueM': require('../assets/fonts/Epilogue-Medium.ttf'),
    });

    // Hide Device Header
    useLayoutEffect(() => {
      navigation.setOptions({
        // headerTitle: "TESTING",
        headerShown : false,
      });
  },[]);

  // Save Response state for access token and refresh token on device storage for first login
    React.useEffect(() => {
      if(isLogged==false){
        if(response?.type === "success"){
          
          setAccessToken(response.authentication.accessToken)
          // dispatch(setAuth(response))
          dispatch(setAuth(JSON.stringify(response.authentication.accessToken)))

          const persistAuth = async () => {
            await AsyncStorage.setItem("auth",JSON.stringify(response.authentication.accessToken));
          }
          persistAuth();
      }
      
      auth && fetchUserInfo()
      }
      console.log(isLogged)
    }, [response, auth])

    // Getting access token from device storage and refreshing token if required
    React.useEffect(() => {
      const getPersistedValue = async () => {
        
        const jsonValue = await AsyncStorage.getItem("auth")
        if(jsonValue != null) {
          dispatch(setAuth(JSON.parse(jsonValue)));
          // console.log("Persisted Auth: " + auth)
          // Checking and setting if Access Token needs refresh
          setRequireRefresh(!AuthSession.TokenResponse.isTokenFresh(auth))
        }
      }

      getPersistedValue()
    },[])

    const getClientId = () => {
      if(Platform.OS == "ios"){
        return "387019062552-9vp4fl9svqaliirtihmnhgqitc4su70a.apps.googleusercontent.com"
      }
      else if(Platform.OS == "android") {
        return "387019062552-5mb808mo0pufmcghkelk2gjp6i6blc17.apps.googleusercontent.com"
      }
      else {
        console.log("Invalid OS")
      }
    }

    // Refreshes Access Token if necessary
    // const refreshToken = async () => {
    //   const clientId = getClientId();
    //     // console.log(auth?.authentication.refreshToken)
    //   if(auth !=null) {
    //     const tokenResult = await AuthSession.refreshAsync({
    //       clientId: clientId,
    //       refreshToken: "1//0gzbrIn807iHPCgYIARAAGBASNwF-L9IrnXa5EoAc6XffeLs3V7tX1X3BZYU3kfZwkVitHShxY2TZEqoKrKh4KdZCfFwC3KIA80k"
    //     },{
    //       tokenEndpoint: "https://www.googleapis.com/oauth2/v4/token"
    //     });

    //     tokenResult.refreshToken = "1//0gzbrIn807iHPCgYIARAAGBASNwF-L9IrnXa5EoAc6XffeLs3V7tX1X3BZYU3kfZwkVitHShxY2TZEqoKrKh4KdZCfFwC3KIA80k"

    //     setAuth(tokenResult)
    //     await AsyncStorage.setItem("auth",JSON.stringify(tokenResult));
    //     setRequireRefresh(false)
    //   }
    // }

    // if(requireRefresh){
    //   refreshToken();
    // }

    
    // Fetch User info
    async function fetchUserInfo() {
      try{
        setIsLogged(true)
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
          headers: { Authorization: `Bearer ${auth}` }
        });
        const userInfo2 = await response.json();
        setUserInfo(userInfo2)

      }
      catch(error) {
        console.log(error)
      }
    }


    // Set User Redux State
    React.useEffect(() => {
      if(userInfo != null){
        dispatch(setUser({userInfo}))
      }
      
    },[userInfo])

    // const logout = async () => {
    //   await AuthSession.revokeAsync({
    //     token: auth.authentication.accessToken
    //   }, {
    //     revocationEndpoint: "https://oauth2.googLeapis.com/revoke"
    //   });
    // }

    // Navigate to homescreen after successfull login
    // useEffect(() => {
    //   if(user!=null) {
    //       navigation.navigate("Home")
    //   }
    // },[user])


    const navigation = useNavigation()

    if (!fontsLoaded) {
      return null;
    }

  return (
    <View className='justify-center items-center h-full bg-white'>
      {/* {console.log("Response: " + JSON.stringify(response))} */}
      {user == null &&  
        <>
        <Image 
          source={
            require('../assets/fonts/Wave2.png')
          }
          className="absolute top-0 h-[50%] w-full"
        />
          <Image
            
            source={
              require('../assets/fonts/login2.gif')
            }
            className="w-[100%] h-[35%] mt-20"
            
          />
          <Text style={{ fontFamily: 'EpilogueB'}} className="absolute top-[80px] left-5 text-[9vw] text-white">Welcome</Text>
          <Text style={{ fontFamily: 'EpilogueB'}} className="absolute top-[130px] left-5 text-[8vw] text-white">To Meal Dash</Text>
          <TouchableOpacity
                disabled={!request}
                onPress = {() => {
                    
                    
                    promtAsync({useProxy: false, showInRecents: true})
                    setIsLogged(false)
                    console.log("BTN " + isLogged)
                    
                }}
                className="justify-center items-center flex-row bg-gray-white border-[1px] rounded-xl border-gray-200 w-[80%] p-3 absolute bottom-[10%]"
                // style={{shadowColor:"black", shadowOffset: "10px", shadowRadius:"12px"}}
            >
              <Image 
                source={
                  require('../assets/fonts/googleLogo.png')
                }
                className="w-8 h-8 absolute left-3"
              />
                <Text style={{ fontFamily: 'EpilogueR'}} className=" text-lg">Login using Google</Text>
            </TouchableOpacity>
        </> 
      }

      {user != null && 
        <HomeScreen />
      }
      
    </View>
  )
}

export default Login