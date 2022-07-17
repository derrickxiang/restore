import {  useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors, fetchFilters } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status, filtersLoaded} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

    useEffect(()=> {
      if (!productsLoaded) dispatch(fetchProductsAsync());
    },[productsLoaded, dispatch]);

    useEffect(() => {
      if (!filtersLoaded) dispatch(fetchFilters());
    },[dispatch, filtersLoaded]);

    if (status.includes('pending')) return <LoadingComponent message="Loading products..." />;

    return (
      <>
        <ProductList products={products} />
      </>
    )
}

