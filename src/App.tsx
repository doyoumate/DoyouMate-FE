import { NavigationContainer } from '@react-navigation/native'
import RootNavigator from './navigators/RootNavigator.tsx'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

const App = () => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
