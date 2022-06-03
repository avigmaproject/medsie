import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import DrawerNavigator from '../drawer-navigator/drawer-navigation.navigation';
import Login from '../../pages/login/login.page';
import Registration from '../../pages/registration/registration.page';
import ListPage from '../../pages/list-page/list-page.page';
import Listing from '../../pages/listing/listing.page';
import RegisterStore from '../../pages/register-store/register-store.page';
import EditStore from '../../pages/edit-store/edit-store.page';
import WriteReviews from '../../pages/write-reviews/write-reviews.page';
import ReplyReview from '../../pages/reply-review/reply-review.page';
import EditReply from '../../components/edit-reply/edit-reply.component';
import SearchAndFilter from '../../pages/search-and-filter/search-and-filter.page'
import FilterModal from '../../pages/filter-modal/filter-modal.page'
import VerifyPage from '../../pages/verify/verify.page'
import ManagedStore from '../../pages/managed-store/managed-store.page'

const Stack = createStackNavigator();

const MainStackNavigator = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Home" component={DrawerNavigator} />
    <Stack.Screen name="Registration" component={Registration} />
    <Stack.Screen name="VerifyPage" component={VerifyPage} />
    <Stack.Screen name="RegisterStore" component={RegisterStore} />
    <Stack.Screen name="ListPage" component={ListPage} />
    <Stack.Screen name="EditStore" component={EditStore} />
    <Stack.Screen name="WriteReviews" component={WriteReviews} />
    <Stack.Screen name="Listing" component={Listing} />
    <Stack.Screen name="ReplyReview" component={ReplyReview} />
    <Stack.Screen name="EditReply" component={EditReply} />
    <Stack.Screen name="SearchAndFilter" component={SearchAndFilter} />
    <Stack.Screen name="FilterModal" component={FilterModal} />
    <Stack.Screen name="ManagedStore" component={ManagedStore}/>
  </Stack.Navigator>
);

export default MainStackNavigator;
