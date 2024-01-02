import {useState} from 'react';
import { useGetCustomersQuery } from '../Services/api';
import {
    HStack, Stack,
  } from '@chakra-ui/react'
import { SearchBar } from '../Components/SearchBar';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import ListCustomers from '../Components/CustomersList';
import Spin from '../Components/Spinner';
import LogoutButton from '../Components/LogoutButton';

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
            <LogoutButton position="fixed" bottom="4" right="4"/>
        </Stack>
    );
}

export default Dashboard;