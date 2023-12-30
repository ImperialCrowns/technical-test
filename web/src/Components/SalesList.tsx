import React from 'react';
import { Sale } from '../Models/Sale';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Heading,
    Box,
    List,
    ListItem,
    Button,
    HStack,
} from '@chakra-ui/react'
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

function SaleItem(props: {sale: Sale}) : JSX.Element {
    return (
        <Box>
            <List>
                <ListItem>Sale id : {props.sale.sale_id}</ListItem>
                <ListItem>Store id : {props.sale.store_id}</ListItem>
                <ListItem>Customer id : {props.sale.customer_id}</ListItem>
                <ListItem>Vendor id : {props.sale.vendor_id}</ListItem>
                <ListItem>Unique Sale id : {props.sale.unique_sale_id}</ListItem>
                <ListItem>Currency : {props.sale.currency}</ListItem>
                <ListItem>Total : {props.sale.total}</ListItem>
                <ListItem>Billing Address : {props.sale.billing_address}</ListItem>
                <ListItem>Shipping Adress : {props.sale.shipping_address}</ListItem>
                <ListItem>Completed at : {props.sale.completed_at}</ListItem>
                <ListItem>Created at : {props.sale.created_at}</ListItem>
                <ListItem>Date Z: {props.sale.date_z}</ListItem>
            </List>
        </Box>
    );
}

function SaleProps(props: {sale: Sale}) : JSX.Element {
    const date = new Date(props.sale.created_at);
    const dateStr = date.toLocaleString();
    return (
        <AccordionItem>
            <Heading>
                <AccordionButton>
                    <Box as="span" flex="1" textAlign='left' w={300}>
                        {dateStr} - {props.sale.total} {props.sale.currency}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </Heading>
            <AccordionPanel pb={4}>
                <SaleItem sale={props.sale} />
            </AccordionPanel>
        </AccordionItem>
    );
}

function SalesList(props: {sales: Sale[] | undefined, page : number}) : JSX.Element {
    return (
        <Box pt={12} minHeight="235px">
            <Accordion allowMultiple>
                {props.sales?.map((sale) => {
                    return (
                        <SaleProps sale={sale} />
                    );
                })}
            </Accordion>
        </Box>
    );
}

export default SalesList;