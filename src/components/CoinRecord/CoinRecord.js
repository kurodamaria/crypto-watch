import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid gray;
  padding: 0.5em 0.5em;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 320px;
  &:hover {
    background-color: hsl(0, 0%, 95%);
  }
`

const BasicInfoCard = styled.div`
  display: flex;
  flex-direction: row;
`


const BasicInfoCardBody = styled.tbody`
  color: hsl(0, 0%, 40%);
`

const BasicInfoCardHeading = ({header}) => 
  <thead style={{textAlign: 'left'}}>
    <tr>
      <th colSpan={2}>{header}</th>
    </tr>
  </thead>

const BasicInfoCardItem = ({lead, tail}) =>
  <tr>
    <td>{lead}</td>
    <td style={{textAlign: 'right', paddingLeft: '1em'}}>{tail}</td>
  </tr>

const BasicInfoLeft = styled.div``
const BasicInfoRight = styled.div`
  margin-left: 1em;
`

const BasicInfo = ({coinData}) => 
  <BasicInfoCard>
    <BasicInfoLeft>
      <img src={coinData.image.small} alt='logo'/>
    </BasicInfoLeft>
    <BasicInfoRight>
      <BasicInfoCardHeading header={coinData.name} />
      <BasicInfoCardBody>
        <BasicInfoCardItem lead='Current Price' tail={coinData.market_data.current_price.usd + ' USD'} />
        <BasicInfoCardItem lead='Market Cap' tail={coinData.market_data.market_cap.usd + ' USD'} />
        <BasicInfoCardItem lead='Total Volume' tail={coinData.market_data.total_volume.usd + ' USD'} />
      </BasicInfoCardBody>
    </BasicInfoRight>
  </BasicInfoCard>

export function CoinRecord({coinData}) {
  console.log(coinData)
  return (
    <Container>
      <img src='https://media.tenor.com/images/2a3065163177df2c7108b9c7a670502a/tenor.gif' />
      <BasicInfo coinData={coinData} />
    </Container>
  )
}