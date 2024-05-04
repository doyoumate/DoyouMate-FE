import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import RootNavigator from './navigators/RootNavigator.tsx'
import AlertModal from './components/AlertModal.tsx'

const App = () => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
          <AlertModal />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
