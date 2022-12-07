import { Box, Grid, Heading } from '@chakra-ui/react';
import { NFTCard } from 'components/modules';
import { FC, useEffect } from 'react';
import { INFTMarketplace } from './types';

const Marketplace: FC<INFTMarketplace> = ({ items }) => {
    useEffect(() => console.log('Items: ', items), [items]);

    return (
        <>
            <Heading size="lg" marginBottom={6}>
                NFT Balances
            </Heading>
            {items?.length ? (
                <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
                    {items.map((item, key) => (
                        <NFTCard {...item} key={key} />
                    ))}
                </Grid>
            ) : (
                <Box>Looks Like you do not have any NFTs</Box>
            )}
        </>
    );
};

export default Marketplace;
