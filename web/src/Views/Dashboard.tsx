import React, {useEffect, useState} from 'react';
import { useGetCustomersQuery, useGetSalesByCustomerQuery } from '../Services/api';
import {
    HStack, List, Stack, VStack,
  } from '@chakra-ui/react'
import { SearchBar } from '../Components/SearchBar';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import ListCustomers from '../Components/CustomersList';
import Spin from '../Components/Spinner';

function Dashboard() {
    const [search, setSearch] = useState<string>("");
    const {data, error, isLoading, currentData} = useGetCustomersQuery({lastname: search, page: 1}, {skip: search.length < 3});
    return (
        <Stack>
            <HStack spacing={1} margin={2}>
                <SearchBar placeholder="Search by last name" value={search} setValue={setSearch}/>
                <ColorModeSwitcher />
            </HStack>
            {isLoading ? <Spin/>  : <ListCustomers customers={currentData}/>}
        </Stack>
    );
}

export default Dashboard;