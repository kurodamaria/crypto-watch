import styled from 'styled-components'
import { CoinBrowser } from './components/CoinBrowser'

const AppContainer = styled.div`
  margin: 0 auto;
  background-color: white;
  box-shadow: 0px 0px 15px black;
  padding: 0.5em 0.2em;
`

function App () {
  return (
    <AppContainer>
      <CoinBrowser /> 
    </AppContainer>
  )
}

export default App
