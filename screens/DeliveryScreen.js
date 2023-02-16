import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { styled } from 'nativewind'

const DeliveryScreen = () => {
    const StyledView = styled(View)
    const StyledSafeAreaView = styled(SafeAreaView)
    const StyledText = styled(Text)
    
    
  return (
    <StyledSafeAreaView>
      <StyledText>HII</StyledText>
    </StyledSafeAreaView>
  )
}

export default DeliveryScreen