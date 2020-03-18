
import React,{Fragment} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator'
import { MenuProvider } from 'react-native-popup-menu';



const App = () => {
  return (
    <MenuProvider>
        <Fragment>
          <AppNavigator />
        </Fragment>
    </MenuProvider>
  );
};


export default App;
