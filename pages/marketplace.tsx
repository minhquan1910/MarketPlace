import { NextPage, GetServerSideProps } from "next";
import Moralis from "moralis";
import { Default } from "components/layouts/Default";
import { INFTMarketplace } from "components/templates/Marketplace/types";
import { Marketplace } from "components/templates/Marketplace";

const MarketPlacePage: NextPage<INFTMarketplace> = (props) => {
    return (
        <Default pageName="Marketplace">
            <Marketplace {...props} />
        </Default>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {

    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

    const items = await Moralis.EvmApi.account.getNFTs({
        address: "0xfd8c907934Cb665FD5c2D3e0bcA75bFF6132CeF0",
        chain: process.env.APP_CHAIN_ID,
    })

    return {
        props: {
            items: JSON.parse(JSON.stringify(items.result)),
        }
    }
}

export default MarketPlacePage