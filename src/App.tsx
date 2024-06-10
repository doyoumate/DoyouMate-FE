import { NavigationContainer } from '@react-navigation/native'
import { Provider } from 'react-redux'
import store from './redux/store.ts'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'
import RootNavigator from './navigators/RootNavigator.tsx'
import { Button, Platform, SafeAreaView, Text, UIManager } from 'react-native'
import ErrorBoundary from 'react-native-error-boundary'
import Loading from './components/common/Loading.tsx'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
  UIManager.setLayoutAnimationEnabledExperimental(true)

const App = () => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          FallbackComponent={({ error, resetError }) => (
            <SafeAreaView>
              <Text>{error.name}</Text>
              <Text>{error.message}</Text>
              <Button onPress={resetError} title="try reset" />
            </SafeAreaView>
          )}>
          <NavigationContainer>
            <Loading />
            <RootNavigator />
          </NavigationContainer>
        </ErrorBoundary>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
