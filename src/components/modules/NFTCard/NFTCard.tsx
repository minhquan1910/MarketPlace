/* eslint-env browser */
import { Box, HStack, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Eth } from '@web3uikit/icons';
import React, { FC, useState } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import { INFTCard } from './types';
import { Button, Input, Modal } from 'antd';
import Link from 'next/link';
import { getExplorer } from '../../../../helpers/networks';
import constants from '../../../../constants';
import { useSigner } from 'wagmi';
import styles from "./NFTCard.module.css"
import { ethers, Signer } from 'ethers';

const NFTCard: FC<INFTCard> = ({ amount, contractType, name, symbol, metadata, chain, tokenAddress, tokenId }) => {
  const bgColor = useColorModeValue('none', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const descBgColor = useColorModeValue('gray.100', 'gray.600');
  const {data: signer} = useSigner();
  const [visible, setVisibility] = useState<boolean>(false);
  const [price, setPrice] = useState<string>()

  const nftCollection = new ethers.Contract(constants.NFT_ADDR, constants.NFT_ABI, signer as Signer)
  const marketPlace = new ethers.Contract(constants.MRKPLACE_ADDR, constants.MRKPLACE_ABI, signer as Signer)

  const handleSellClick = () => {
    setVisibility(true)
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceValue:string = ethers.utils.parseEther(e.target.value).toString()
    setPrice(priceValue);
  }

  const handleSell = async() => {
    setVisibility(false);
    console.log("Input", price)
    console.log("Signer ", signer)
    const approveFunc = await nftCollection.approve(constants.MRKPLACE_ADDR, tokenId)
    const tx = await approveFunc.wait();
    console.log("Approve tx ", tx)
    const createItem = await marketPlace.createMarketItem(constants.NFT_ADDR,tokenId, price);
    const itemTx = await createItem.wait();
    console.log("Create Item Tx", itemTx)
  }

  const listModal = <Modal
    title="Sell"
    open={visible}
    onCancel={() => setVisibility(false)}
    footer={[
      <Button
        key="1"
        className='btnCancel'
        onClick={() => setVisibility(false)}
      >
        Cancel
      </Button>,
      <Button key="3"
        type='primary'
        className='btnAution' onClick={handleSell}>
        Sell
      </Button>
    ]}
  >
    <div
      style={{
        width: "250px",
        margin: "auto",
        borderRadius: "10px",
        marginBottom: "15px",
      }}>
      <img
        src={resolveIPFS(metadata?.image as string)}
        alt=""
        className={styles.image}
        width="350"
      />
      <Input
        autoFocus
        placeholder="Set Price in BNB"
        onChange={onChangePrice}
        min={0}
        type="number"
      />
      <div style={{ color: "red" }}>

        {!price ? "Please input your price" : ""}
      </div>
      <div style={{ color: "red" }}>

        {price
          ? "Price must greater than 0"
          : ""}
      </div>
      <div style={{ color: "red" }}>
        Please select at least one category
      </div>
    </div>
  </Modal>

  return (
    <>
      {visible ? listModal : null}
      <Box maxWidth="315px" bgColor={bgColor} padding={3} borderRadius="xl" borderWidth="1px" borderColor={borderColor}>
        <Box maxHeight="260px" overflow={'hidden'} borderRadius="xl">
          <Image
            src={resolveIPFS(metadata?.image as string)}
            alt={'nft'}
            minH="260px"
            minW="260px"
            boxSize="100%"
            objectFit="fill"
          />
        </Box>
        <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
          {name}
        </Box>
        <HStack alignItems={'center'}>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
            {contractType}
          </Box>

          <Eth fontSize="20px" />
        </HStack>
        <SimpleGrid columns={2} spacing={4} bgColor={descBgColor} padding={2.5} borderRadius="xl" marginTop={2}>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Symbol
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {symbol}
            </Box>
          </Box>
          <Box>
            <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
              Amount
            </Box>
            <Box as="h4" noOfLines={1} fontSize="sm">
              {amount}
            </Box>
          </Box>
        </SimpleGrid>
        <SimpleGrid columns={2} spacing={4} padding={2.5} borderRadius="xl" marginTop={2}>
          <Link href={`${getExplorer(chain)}address/${tokenAddress}`} target="_blank">
            Tx info
          </Link>
          <Button onClick={handleSellClick}>
            <span>List</span>
          </Button>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default NFTCard;
