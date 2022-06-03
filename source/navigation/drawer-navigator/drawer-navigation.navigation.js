import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerComponent from '../../components/drawer-content/drawer-content.component';
import Home from '../../pages/home/home.page';
import RegisterStore from '../../pages/register-store/register-store.page';
import AccountSettings from '../../pages/account-settings/account-settings.page'
import ShowMaps from '../../pages/show-maps/show-maps.page'

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(prop) => <DrawerComponent {...prop} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="AccountSettings" component={AccountSettings} />
      <Drawer.Screen name="RegisterStore" component={RegisterStore} />
      <Drawer.Screen name="ShowMaps" component={ShowMaps} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
