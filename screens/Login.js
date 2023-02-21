import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import React, { useLayoutEffect } from 'react'
import Dummy from './Dummy'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../features/userSlice'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';

const Login = () => {

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

    useLayoutEffect(() => {
      navigation.setOptions({
        // headerTitle: "TESTING",
        headerShown : false,
      });
  },[]);

    React.useEffect(() => {
        if(response?.type === "success"){
            setAccessToken(response.authentication.accessToken)
        }
        accessToken && fetchUserInfo()
    }, [response, accessToken])

    async function fetchUserInfo() {
        let response = await fetch("https://www.googleapis.com/userinfo/v2/me",{
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        const userInfo = await response.json();
        dispatch(setUser({userInfo}))
    }

    const navigation = useNavigation()

    if (!fontsLoaded) {
      return null;
    }

  return (
    <View className="justify-center items-center h-full bg-white">
      {user == null && accessToken == null && 
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
                    promtAsync()
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
        navigation.navigate("Home")
      }
      
    </View>
  )
}

export default Login