import React from 'react';

import DeliveriesHome from '../../assets/svg-files/deliveries-home.svg';
import DoctorHome from '../../assets/svg-files/doctor-home.svg';
import ActivitiesHome from '../../assets/svg-files/activities-home.svg';
import WeedHome from '../../assets/svg-files/weed-shop-home.svg';
import FeaturedHome from '../../assets/svg-files/featured-home.svg';

export const categories = [
  {id: 1, icon: <FeaturedHome height={55} width={55} />, name: 'Featured Home'},
  {id: 2, icon: <WeedHome height={55} width={55} />, name: 'Medical Shops'},
  {id: 3, icon: <DeliveriesHome height={55} width={55} />, name: 'Delivery'},
  {id: 4, icon: <DoctorHome height={55} width={55} />, name: 'Doctor'},
  {id: 5, icon: <ActivitiesHome height={55} width={55} />, name: 'Events'},
];
