import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigators/RootNavigator.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  )
}

export default App
