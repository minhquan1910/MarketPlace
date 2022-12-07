import { nftCollectionABI } from "./ABI";
import { nftCollectionAddr } from "./address";

const CURRENT_NETWORK = "testnet"

const constants = {
    NFT_ADDR: nftCollectionAddr[CURRENT_NETWORK],
    NFT_ABI: JSON.parse(nftCollectionABI),
}

export default constants