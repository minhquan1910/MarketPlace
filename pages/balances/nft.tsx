import { Default } from 'components/layouts/Default';
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { INFTBalances } from 'components/templates/balances/NFT/types';
import { NFTBalances } from 'components/templates/balances/NFT';
import constants from '../../constants';
import Moralis from 'moralis';


const ERC20: NextPage<INFTBalances> = (props) => {
  return (
    <Default pageName="NFT Balances">
      <NFTBalances {...props} />
    </Default>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  if (!session?.user.address) {
    return { props: { error: 'Connect your wallet first' } };
  }

  const balances = await Moralis.EvmApi.account.getNFTsForContract({
    address: session?.user.address,
    chain: process.env.APP_CHAIN_ID,
    tokenAddress: constants.NFT_ADDR,
  });


  return {
    props: {
      balances: JSON.parse(JSON.stringify(balances.result)),
    },
  };
};

export default ERC20;
