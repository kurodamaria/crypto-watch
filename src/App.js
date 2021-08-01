import { useEffect, useRef, useState, memo } from 'react'
import styled from 'styled-components'
import CoinGecko from 'coingecko-api'

const CoinGeckoClient = new CoinGecko()

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
  background-color: black;
  box-shadow: 0px 0px 15px black;
  font-size: 1.2em;
  padding: 0.5em 0.2em;
`

const RecordWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.1em 0.5em;

  &:hover {
    background-color: gray;
    cursor: pointer;
  }

  & + & {
    margin-top: 0.4em;
  }

  border: 1px solid lightcoral;
  border-radius: 0.2em;
  margin: 0 0.5em;

  transition: all 0.3s;
`

const RecordCoinIcon = styled.img`
  width: 1.5em;
  height: 1.5em;
`

const RecordCoinSymbol = styled.span`
  margin-left: 0.2em;
`

const RecordCoinPrice = styled.span`
  margin-left: auto;
`

const FilterInput = styled.input.attrs({ type: 'text', placeholder: 'filter...' })`
  width: calc(100% - 8em);
  margin: 1em 2em;
  padding: 0.5em 1em;

  background-color: black;
  color: lightsalmon;
  border-radius: 0.4em;
  outline: 0;
  border: 1px solid lightseagreen;
`

const Spiner = styled.div`
  width: calc(${props => props.radius} * 2);
  height: calc(${props => props.radius} * 2);

  border: 10px solid ${props => props.color};
  border-radius: ${props => props.borderRadius};
`

const LoadingContainer = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Loading = () =>
  <LoadingContainer>
    <Spiner radius='5em' borderRadius='5px' color='white' />
  </LoadingContainer>

const DoFollow = styled.a.attrs({ target: 'blank' })`
  text-decoration: underline dashed;
  color: lightseagreen;
  font-size: 0.6em;
  display: block;
  text-align: center;
`

// eslint-disable-next-line
function useSize () {
  const ref = useRef()
  const [size, setSize] = useState(undefined)

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect()
    setSize({
      width: rect.width,
      height: rect.height
    })
    ref.current.addEventListener(
      'resize',
      (e) => {
        const rect = ref.current.getBoundingClientRect()
        setSize({
          width: rect.width,
          height: rect.height
        })
      }
    )
  }, [])

  return [ref, size]
}

const CryptoCoinPriceRecordItem = memo((coinData) => {
  return (
    <RecordWrapper>
      <RecordCoinIcon src={coinData.image.small} />
      <RecordCoinSymbol>
        {coinData.name}
      </RecordCoinSymbol>
      <RecordCoinPrice>
        ${coinData.market_data.current_price.usd}
      </RecordCoinPrice>
    </RecordWrapper>
  )
})

const MainPage = ({ cryptoData }) => {
  return (
    <>
      <div>
        <FilterInput />
      </div>
      <div>
        {
        cryptoData && cryptoData.map((crypto) => <CryptoCoinPriceRecordItem {...crypto} key={crypto.id} />)
      }
      </div>
    </>
  )
}

function App () {
  const [cryptoData, setCryptoData] = useState(undefined)
  useEffect(() => {
    CoinGeckoClient.coins.all()
      .then(data => {
        setCryptoData(data.data)
      })
  }, [])

  return (
    <Container>
      {
        cryptoData
          ? <MainPage cryptoData={cryptoData} />
          : <Loading />
      }
      <DoFollow href='https://nomics.com'>
        Crypto Market Cap &amp; Pricing Data Provided By Nomics
      </DoFollow>
    </Container>
  )
}

export default App
