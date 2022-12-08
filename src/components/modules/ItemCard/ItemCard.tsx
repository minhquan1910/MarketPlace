/* eslint-env browser */
import { Box, HStack, Image, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import { Eth } from '@web3uikit/icons';
import React, { FC, useEffect, useState } from 'react';
import { resolveIPFS } from 'utils/resolveIPFS';
import { IITEMCard } from './types';
import { Button } from 'antd';
import constants from '../../../../constants';
import { ethers } from 'ethers';

const ItemCard: FC<IITEMCard> = ({ contractType, name, symbol, metadata, tokenId })  => {
    const bgColor = useColorModeValue('none', 'gray.700');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const descBgColor = useColorModeValue('gray.100', 'gray.600');
    const marketplace = new ethers.Contract(constants.MRKPLACE_ADDR, constants.MRKPLACE_ABI, constants.PROVIDER);
    const [price, setPrice] = useState("1")

    const handleSell = async () => {
        console.log(tokenId)
    }

    async function loadPrice() {
        const priceValue = await marketplace.getTokenPrice(tokenId)
        const priceEther = ethers.utils.formatEther(priceValue.toString())
        setPrice(priceEther)
    }

    useEffect(() => {
        loadPrice()
    },[tokenId])

    return (
        <>
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
                            {price} BNB
                        </Box>
                    </Box>
                </SimpleGrid>
                <SimpleGrid columns={1} spacing={4} padding={2.5} borderRadius="xl" marginTop={2}>
                    <Button onClick={handleSell}>
                        <span>Buy</span>
                    </Button>
                </SimpleGrid>
            </Box>
        </>
    );
};

export default ItemCard;
