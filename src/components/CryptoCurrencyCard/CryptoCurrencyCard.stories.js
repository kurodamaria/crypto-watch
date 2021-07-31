import React from 'react'

import { CryptoCurrencyCard } from './CryptoCurrencyCard'
export default {
  component: CryptoCurrencyCard,
  title: 'Components/CryptoCurrencyCard'
}

const Template = (args) => <CryptoCurrencyCard {...args} />

export const Default = Template.bind({})
Default.args = {
  symbol: 'Bitcoin',
  logo_url: 'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/btc.svg',
  price: 34874.44585885
}
