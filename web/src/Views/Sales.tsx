import React, { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useGetCustomersQuery, useGetSalesByCustomerQuery } from "../Services/api";
import { Box, Button, Center, HStack, Heading, Stack, Text, Flex } from "@chakra-ui/react";
import { Customer } from "../Models/Customer";
import { ArrowBackIcon } from "@chakra-ui/icons";

function Sales() {
    const { id } = useParams();
    console.log(id);
    const [searchParams, setSearchParams] = useSearchParams();
    const lastname = useMemo(() => searchParams.get("lastname"), [searchParams]);
    const firstname = useMemo(() => searchParams.get("firstname"), [searchParams]);
    const {data, error, isLoading, currentData} = useGetSalesByCustomerQuery({id: +id!, page: 1}, {skip: id === ""});
    return (
        <Stack spacing={1} marginLeft={2} marginTop={2}>
            <Button as={Link} to="/customers" size="sm" alignSelf="flex-start" position="absolute" leftIcon={<ArrowBackIcon />}>Back</Button>
            <Center>
                <Heading size="md" alignSelf="auto">{firstname} {lastname}'s sales list</Heading>
            </Center>
        </Stack>
    );
}

export default Sales;