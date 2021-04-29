import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import { colorBasedOnOS } from '../../utils/helpers';


export default (props) => {
  return <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={23}
    color={colorBasedOnOS}
  />
}
