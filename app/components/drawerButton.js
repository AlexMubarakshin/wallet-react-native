import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DrawerButton = ({ navigation }) => (
  <TouchableOpacity>
    <Icon
      name="menu"
      size={40}
      color="white"
      onPress={() => navigation.navigate('DrawerOpen')}
    />
  </TouchableOpacity>
)

DrawerButton.propTypes = {
  navigation: React.PropTypes.object.isRequired,
};

export default DrawerButton
