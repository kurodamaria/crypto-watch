import { useCoinGeckoData } from '../../hooks'
import { CoinRecord } from '../CoinRecord';
import styled from 'styled-components'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  justify-items: center;
  gap: 1em 0em;
`
export function CoinBrowser({ coinData }) {
  const data = useCoinGeckoData();
  
  if (data) {
    console.log(data)
    return (
      <Container>
        {
          data.map(coinData => <CoinRecord key={coinData.id} coinData={coinData}/>)
        }
      </Container>
    )
  } else {
    return <div>Loading</div> 
  }
}