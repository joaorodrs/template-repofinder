import React, { lazy } from 'react';

// Icons
import MainReposIcon from '@material-ui/icons/Star';
import AllReposIcon from '@material-ui/icons/List';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

// Pages
import Login from 'pages/Login';
import ForgotPassword from 'pages/ForgotPassword';

// Logged Pages
const Dashboard = lazy(() => import('pages/Dashboard'));
const Users = lazy(() => import('pages/Users'));
const Profile = lazy(() => import('pages/Profile'));

const config = {
  public: [
    {
      path: '/login',
      component: Login,
      exact: true,
    },
    {
      path: '/esqueci-minha-senha',
      component: ForgotPassword,
      exact: true,
    },
  ],
  protected: [
    {
      path: '/',
      component: Dashboard,
      title: 'Principal',
      exact: true,
      icon: <MainReposIcon />,
    },
    {
      path: '/users',
      component: Users,
      title: 'Todos',
      exact: true,
      icon: <AllReposIcon />,
    },
    {
      path: '/profile',
      component: Profile,
      title: 'Perfil',
      exact: true,
      icon: <AccountBoxIcon />,
    },
  ],
};

export default config;
