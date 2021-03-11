import React from 'react'
import Navigation from './navigation'
import { ThemeProvider } from 'react-native-elements'
import theme from './theme'
import { StatusBar } from 'react-native'
// import { useAlert } from './hooks/useAlert'
import { Provider } from 'react-redux'
import { store, persistor } from './store'
import { PersistGate } from 'redux-persist/integration/react'

interface AppProps {}

const App:React.FC = (props:AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ThemeProvider theme={theme} >
          <>
            <StatusBar/>
            <Navigation />
          </>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
