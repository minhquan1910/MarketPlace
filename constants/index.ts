import { nftCollectionABI, marketplaceABI } from "./ABI";
import { nftCollectionAddr, marketplaceAddr } from "./address";

const CURRENT_NETWORK = "testnet"

const constants = {
    NFT_ADDR: nftCollectionAddr[CURRENT_NETWORK],
    NFT_ABI: JSON.parse(nftCollectionABI),
    MRKPLACE_ADDR: marketplaceAddr[CURRENT_NETWORK],
    MRKPLACE_ABI: JSON.parse(marketplaceABI), 
}

export default constants