import React from "react";
import { useParams } from "react-router-dom";
import { useGetSalesByCustomerQuery } from "../Services/api";

function Sales() {
    const { id } = useParams();
    const trueId = id!
    const {data, error, isLoading, currentData} = useGetSalesByCustomerQuery({id: parseInt(trueId), page: 1});
    return (
        <div>
            <h1>Sales for customer {id}</h1>
        </div>
    );
}

export default Sales;