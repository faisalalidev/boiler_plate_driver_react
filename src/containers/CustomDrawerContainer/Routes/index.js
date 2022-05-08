import {Images} from '../../../theme';

export const drawerRoutes = (params) => {
  return [
    {
      title: 'Home',
      route: 'home',
      IsActive: true,
      ActiveBorder: 'Black',
    },
    {
      title: 'My Trips',
      route: 'myTrips',
      IsActive: false,
      ActiveBorder: 'Black',
    },
    {
      title: 'Notifications',
      route: 'notifications',
      IsActive: false,
      ActiveBorder: 'Black',
    },
    {
      title: 'Settings',
      route: 'setting',
      IsActive: false,
      ActiveBorder: 'Black',
    },
    {
      title: 'Get Help',
      route: 'getHelp',
      IsActive: false,
      ActiveBorder: 'Black',
    },
  ];
};
