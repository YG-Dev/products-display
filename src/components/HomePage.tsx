import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Container, TextField } from '@mui/material';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { ProductsResponse, getProducts } from '../api/products';
import {  useSearchParams } from 'react-router-dom';
import ProductsList from './ProductsList';
import PaginationBox from './PaginationBox';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMounted = useRef(false);
  const [inputValue, setInputValue] = useState('');
  const [productsRes, setProductsRes] = useState<ProductsResponse>();
  const debouncedInputTerm = useDebouncedValue(inputValue, 500);

  const handleInput = (value: string) => {
    setInputValue(value);
  }

  const getPageNumber = (pageValue: string | number | null): number | null => {
    if(typeof pageValue === "number") {
        return pageValue;
    }

    if(typeof pageValue === "string") {
        return parseInt(pageValue);
    }

    return null;
  }

  const handleChangePage = (
    event: ChangeEvent<unknown> | null,
    newPage: number,
  ) => {
    getProducts({
        id: debouncedInputTerm || '',
        page: newPage.toString()
    }).then((res) => {
        setSearchParams({ page: newPage.toString() });
        setProductsRes(res);
    });
  };

  useEffect(() => {
    if (!isMounted.current) { // Skip on initial load
        isMounted.current = true;
        return;
    }
    
    getProducts({
        id: debouncedInputTerm
    }).then((res) => {
        debouncedInputTerm && setSearchParams({ id: debouncedInputTerm});
        setProductsRes(res);
    });
  }, [debouncedInputTerm, setSearchParams]); // After value debounce, fetch results by ID

  useEffect(() => {
    const id = searchParams.get('id');
    const page = searchParams.get('page');
    getProducts({
      id: id || '',
      page: page ||  ''
    }).then((res) => {
      setProductsRes(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Search for urls on load and fetch products. Do it once on mount

  return (
    <Container sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: '#121212' }}>
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: '2em' }} >
            <TextField
                type="number"
                label="Product ID"
                variant="outlined"
                value={inputValue}
                onChange={(e) => handleInput(e.target.value)}
                inputProps={{
                min: 0,
                step: 1
                }}
            />
            <ProductsList {...productsRes}/>
            <PaginationBox
                count={productsRes?.products?.total_pages || 0}
                defaultPage={getPageNumber(searchParams.get('page')) || 1}
                changeEvent={handleChangePage}
            />
        </Container>
    </Container>
  );
}

export default HomePage;
