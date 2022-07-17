import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBastetItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetail() {

    const {id} = useParams<{id: string}>();

    const product = useAppSelector(state => productSelectors.selectById(state, id));
    const { basket, status} = useAppSelector(state => state.basket);
    const {status : productStatus } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item? quantity - item.quantity : quantity;

            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}));
            
        } else {
            const updatedQuantity = item.quantity - quantity;

            dispatch(removeBastetItemAsync({productId: product?.id!, quantity: updatedQuantity}));

        }
    }

    useEffect(()=> {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(id)))
    }, [id, item, dispatch, product]);

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />;

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
                            loading={status.includes('pending')}
                            disabled={!item && quantity === 0 || item && quantity === item?.quantity}
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