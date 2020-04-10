
import React,{Fragment} from 'react';
import 'react-native-gesture-handler';
import AppNavigator from './navigation/AppNavigator'
import { MenuProvider } from 'react-native-popup-menu';
import rootSaga from './saga/rootSaga'
import rootReducer from './reducer/RootReducer'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { createStore,applyMiddleware } from 'redux'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
console.disableYellowBox = true
const App = () => {
  return (
    <MenuProvider>
        <Fragment>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </Fragment>
    </MenuProvider>
  );
};


export default App;
