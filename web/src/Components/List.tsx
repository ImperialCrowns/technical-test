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
    Link,
  } from '@chakra-ui/react'

function ListCustomers(props : {customers: Customer[] | undefined}) {
    return (
        <Center>
            <Stack>
                <List>
                    {props.customers?.map((customer) => {
                        return (
                            <ListItem key={customer.customers_id}>
                                <Link href={`/customers/:${customer.customers_id}`}>
                                    {customer.first_name} {customer.last_name}
                                </Link>
                            </ListItem>
                        );
                    })}
                </List>
            </Stack>
        </Center>
    );
}

export default ListCustomers;