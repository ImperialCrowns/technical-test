import React, { useMemo, useState, useEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetCustomersQuery, useGetSalesByCustomerQuery } from "../Services/api";
import { Box, Button, Center, HStack, Heading, Stack, Text, Flex, VStack } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import SalesList from "../Components/SalesList";
import Spin from "../Components/Spinner";

function Sales() : JSX.Element {
    const { id } = useParams();
    const [page, setPage] = useState<number>(1);
    const [nextDisabled, setNextDisabled] = useState<boolean>(false);
    const [prevDisabled, setPrevDisabled] = useState<boolean>(true);
    const [lastRequestLength, setLastRequestLength] = useState<number>(1);
    console.log(id);
    const [searchParams, setSearchParams] = useSearchParams();
    const lastname = useMemo(() => searchParams.get("lastname"), [searchParams]);
    const firstname = useMemo(() => searchParams.get("firstname"), [searchParams]);
    const {data, error, isLoading, currentData} = useGetSalesByCustomerQuery({id: +id!, page: page}, {skip: id === ""});

    const handleNextPage = () => {
        setPage(page + 1);
    }

    const handlePrevPage = () => {
        setPage(page - 1);
    }

    useEffect(() => {
        if (page === 1) {
            setPrevDisabled(true);
        } else {
            setPrevDisabled(false);
        }
        if (currentData?.length! < 5) {
            setNextDisabled(true);
        
        } else if (currentData?.length === 0) {
            setLastRequestLength(0);
            if (page > 1)
                setPage(page - 1);
        } else {
            if (lastRequestLength === 0) {
                setNextDisabled(true);
                setLastRequestLength(currentData?.length || 0);
            } else {
                setNextDisabled(false);
            }
        }
    }, [page, currentData]);

    return (
        <Stack spacing={1} marginLeft={2} marginTop={2}>
            <Button as={Link} to="/customers" size="sm" alignSelf="flex-start" position="absolute" leftIcon={<ArrowBackIcon />}>Back</Button>
            <VStack>
                <Center>
                    <Heading size="md" alignSelf="auto">{firstname} {lastname}'s sales list</Heading>
                </Center>
                {isLoading ? <Spin/> : <SalesList sales={currentData} page={page} />}
                {data?.length === 0 ? <Heading size="sm">No sales found</Heading> :
                    <>
                    <HStack>
                        <Button leftIcon={<ArrowBackIcon/>} variant="solid" colorScheme='green' onClick={handlePrevPage} isDisabled={prevDisabled}>
                            Prev page
                        </Button>
                        <Button rightIcon={<ArrowForwardIcon/>} variant="solid" colorScheme='green' onClick={handleNextPage} isDisabled={nextDisabled}>
                            Next page
                        </Button>
                    </HStack>
                    <Heading size="sm">Page {page}</Heading>
                    </>
                    }
            </VStack>
        </Stack>
    );
}

export default Sales;