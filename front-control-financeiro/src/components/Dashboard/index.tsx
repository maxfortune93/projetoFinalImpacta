import { useState } from "react";
import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashboard () {

    const [transactionData, setTransactionData] = useState([]);

    const handleTransactionDataChange = (data: any) => {
        setTransactionData(data);
    };

    return (

        <Container>
            <Summary transactionData={transactionData}/>
            <TransactionsTable onTransactionDataChange={handleTransactionDataChange} />
        </Container>
    )
}