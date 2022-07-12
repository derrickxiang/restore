import { Typography } from "@mui/material";
import { useEffect, useState } from "react"
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/Basket";

export default function BasketPage() {

    const [loading, setLoading] = useState(true);
    const [basket, setBasket] = useState<Basket>();

    useEffect(()=> {
        agent.Basket.get()
            .then(response => setBasket(response))
            .catch((error)=> console.log(error))
            .finally(()=> setLoading(false));
    }, []);

    if (loading) return <LoadingComponent message="Loading basket..." />

    if (!basket) return <Typography variant="h3">Your basket is empty!</Typography>

    return (
        <h2>Buyer ID = {basket.buyerId}</h2>
    )
}