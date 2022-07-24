import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {

    const { productParam } = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParam.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event:any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)
    return (
        <TextField
              label='Search'
              variant="outlined"
              fullWidth
              value={searchTerm || '' }
            onChange = {(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
              />
    )
}