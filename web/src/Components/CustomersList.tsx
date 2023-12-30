import React from 'react';
import { Customer } from '../Models/Customer';
import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    Stack,
    Center,
    Button,
  } from '@chakra-ui/react'
import { Navigate, Link } from 'react-router-dom';

function ListCustomers(props : {customers: Customer[] | undefined}) {
    return (
        <Center>
            <Stack>
                <List>
                    {props.customers?.map((customer) => {
                        return (
                            <ListItem key={customer.customers_id} margin={2} blockSize={50}>
                                <Button as={Link} to={`/customers/${customer.customers_id}?lastname=${customer.last_name}&firstname=${customer.first_name}`}>{customer.first_name} {customer.last_name}</Button>
                            </ListItem>
                        );
                    })}
                </List>
            </Stack>
        </Center>
    );
}

export default ListCustomers;