import { useEffect, useRef, useState, memo } from 'react'
import styled from 'styled-components'

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

const RecordIcon = styled.img`
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

const CryptoCoinPriceRecordItem = memo(({ logo_url, name, price }) => {
  return (
    <RecordWrapper>
      <RecordIcon src={logo_url} />
      <RecordCoinSymbol>{name}</RecordCoinSymbol>
      <RecordCoinPrice>{price}</RecordCoinPrice>
    </RecordWrapper>
  )
})

const MainPage = ({ cryptoData }) => {
  const [filter, setFilter] = useState('')
  return (
    <>
      <div>
        <FilterInput onChange={(e) => {
          setFilter(e.target.value)
        }}
        />
      </div>
      <div>
        {
        cryptoData && cryptoData.sort(
          (a, b) => b.price - a.price
        ).filter(
          (crypto) => crypto.name.toLowerCase().includes(filter.toLowerCase())
        ).map((crypto) => <CryptoCoinPriceRecordItem {...crypto} key={crypto.id} />)
      }
      </div>
    </>
  )
}

function App () {
  const [cryptoData, setCryptoData] = useState(undefined)
  useEffect(() => {
    fetch(
      'https://api.nomics.com/v1/currencies/ticker?key=5582925c69cc16b163f51399df72b98bd7423284&interval=1d,30d&convert=EUR&per-page=100&page=1',
      {
        mode: 'cors'
      }
    )
      .then(response => response.json())
      .then(setCryptoData)
  }, [])

  return (
    <Container>
      {
        cryptoData
          ? <MainPage cryptoData={cryptoData} />
          : <Loading />
      }
    </Container>
  )
}

export default App
