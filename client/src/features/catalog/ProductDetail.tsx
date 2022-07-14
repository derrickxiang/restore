import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/Product";

export default function ProductDetail() {

    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const { basket, setBasket, removeItem} = useStoreContext();
    const [quantity, setQuantity] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const item = basket?.items.find(i => i.productId === product?.id);

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        setSubmitting(true);

        if (!item || quantity > item.quantity) {
            const updatedQuantity = item? quantity - item.quantity : quantity;

            agent.Basket.addItem(product?.id!, updatedQuantity)
                .then(basket => setBasket(basket))
                .catch(error => console.log(error))
                .finally(()=> setSubmitting(false))
        } else {
            const updatedQuantity = item.quantity - quantity;

            agent.Basket.removeItem(product?.id!, updatedQuantity)
                .then(basket => setBasket(basket))
                .then(()=> removeItem(product?.id!, updatedQuantity))
                .catch(error => console.log(error))
                .finally(() => setSubmitting(false)) 

        }
    }

    useEffect(()=> {
        if (item) setQuantity(item.quantity);
        agent.Catalog.details(parseInt(id))
            .then( response => setProduct(response))
            .catch(error => console.log(error.response))
            .finally(() => setLoading(false));
    }, [id, item]);

    if (loading) return <LoadingComponent message="Loading product..." />;

    if (!product) return <NotFound/>
    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} style={{width: '100%'}} alt={product.name} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant="h4" color='secondary'>${ (product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.type}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Quantity in the stock</TableCell>
                            <TableCell>{product.quantityInStock}</TableCell>
                        </TableRow>

                    </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            type={'number'}
                            fullWidth
                            label='Quantity in Cart'
                            value={quantity}
                            onChange={handleInputChange}
                            />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            loading={submitting}
                            disabled={!item && quantity === 0 || item && quantity == item?.quantity}
                            sx={{height: '55px'}}
                            size='large'
                            variant="contained"
                            color='primary'
                            fullWidth
        onClick={handleUpdateCart}
                            >
                                {item ? 'Update Quantity' : 'Add to Cart'}
                            </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}