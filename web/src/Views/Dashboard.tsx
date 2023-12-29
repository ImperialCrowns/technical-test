import React, {useEffect, useState} from 'react';
import { useGetCustomersQuery, useGetSalesByCustomerQuery } from '../Services/api';
import {
    HStack, List, Stack, VStack,
  } from '@chakra-ui/react'
import { SearchBar } from '../Components/SearchBar';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { SpinnerIcon } from '@chakra-ui/icons';
import ListCustomers from '../Components/List';

function Dashboard() {
    const [search, setSearch] = useState<string>("");
    const {data, error, isLoading, currentData} = useGetCustomersQuery({lastname: search, page: 1});
    return (
        <Stack>
            <HStack spacing={1} margin={2}>
                    <SearchBar placeholder="Search by last name" value={search} setValue={setSearch}/>
                    <ColorModeSwitcher />
            </HStack>
            {isLoading ? <SpinnerIcon w={6} h={6} />  : <ListCustomers customers={currentData}/>}
        </Stack>
    );
}

export default Dashboard;