import { ethers } from "ethers"

// 2. Define network configurations
const providerRPC = {
    bsc: {
        name: "bscTestnet",
        rpc: "https://data-seed-prebsc-1-s3.binance.org:8545",
        chainId: 97,
    },
    bscMain: {
        name: "bscMainnet",
        rpc: "https://bsc-dataseed1.binance.org/",
        chainId: 56,
    }
}
// 3. Create ethers provider
const provider = new ethers.providers.StaticJsonRpcProvider(
    providerRPC.bsc.rpc,
    {
        chainId: providerRPC.bsc.chainId,
        name: providerRPC.bsc.name,
    }
)
export default provider