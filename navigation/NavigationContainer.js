import React, { useEffect, useRef } from 'react';
import ShopNavigator from './ShopNavigator';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationActions } from 'react-navigation';
// import { logout } from '../store/actions/auth';

export default () => {
  // const dispatch = useDispatch();
  const navRef = useRef();
  const isAuth = useSelector(state => !!state.auth.token);

  useEffect(() => {
    if (!isAuth) {
      navRef.current.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      )
    }
    return () => { };
  }, [isAuth, dispatch])

  // useEffect(() => {
  //   if (!isAuth) {
  //     navRef.current.dispatch(
  //       NavigationActions.navigate({ routeName: 'Auth' })
  //     )
  //     return () => { }
  //   } else {
  //     let logoutTimer = setTimeout(() => {
  //       dispatch(logout());
  //     }, 5 * 1000);

  //     return () => {
  //       clearTimeout(logoutTimer);
  //     };
  //   }
  // }, [isAuth, dispatch])


  return <ShopNavigator ref={navRef} />;
}
