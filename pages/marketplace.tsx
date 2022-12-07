import { NextPage, GetServerSideProps } from "next";
import Moralis from "moralis";
import { Default } from "components/layouts/Default";
import { INFTMarketplace } from "components/templates/Marketplace/types";
import { Marketplace } from "components/templates/Marketplace";
import constants from "../constants";

const MarketPlacePage: NextPage<INFTMarketplace> = (props) => {
    return (
        <Default pageName="Marketplace">
            <Marketplace {...props} />
        </Default>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

    const items = await Moralis.EvmApi.account.getNFTsForContract({
        address: constants.MRKPLACE_ADDR,
        chain: process.env.APP_CHAIN_ID,
        tokenAddress: constants.NFT_ADDR
    })

    return {
        props: {
            items: JSON.parse(JSON.stringify(items.result)),
        }
    }
}

export default MarketPlacePage