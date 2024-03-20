import { Provider } from "react-redux"
import store from "./store"
import { BrowserRouter } from "react-router-dom"
import { MainRouter } from "./main_router"

function App() {
  return (
  <Provider store={store}>
      <BrowserRouter>
            <MainRouter />
      </BrowserRouter>
  </Provider>
  )
}

export default App
