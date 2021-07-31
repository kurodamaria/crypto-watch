import styled from 'styled-components'

const Frame = styled.div`
  display: flex;
  align-items: center;
`

const CoinLogo = styled.img`
  width: 2em;
  height: 2em;
`

const Heading = styled.h1`
  margin: 0;
`

function usePrice (price) {
  return `$${price.toFixed(2)}`
}

const Price = ({ price }) => {
  return <span>{usePrice(price)}</span>
}

export const CryptoCurrencyCard = ({ symbol, logo_url, price }) =>
  <Frame>
    <CoinLogo src={logo_url} alt='logo' />
    <Heading>{symbol}</Heading>
    <Price price={price} />
  </Frame>
