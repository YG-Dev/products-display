import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, Container, Pagination, TextField } from '@mui/material';
import useDebouncedValue from '../hooks/useDebouncedValue';
import { ProductsResponse, getProducts } from '../api/products';
import { useParams } from 'react-router-dom';
import ProductsList from './ProductsList';
import PaginationBox from './PaginationBox';

function HomePage() {
  const params = useParams();
  const isMounted = useRef(false);
  const [inputValue, setInputValue] = useState('');
  const [productsRes, setProductsRes] = useState<ProductsResponse>();
  const debouncedInputTerm = useDebouncedValue(inputValue, 500);

  const handleInput = (value: string) => {
    setInputValue(value);
  }

  const handleChangePage = (
    event: ChangeEvent<unknown> | null,
    newPage: number,
  ) => {
    getProducts({
        id: debouncedInputTerm || '',
        page: newPage.toString()
    }).then((res) => {
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
        setProductsRes(res);
    });
  }, [debouncedInputTerm]); // After value debounce, fetch results by ID

  useEffect(() => {
    const { id, page } = params; // TODO implement router and params
    getProducts({
      id: id || '',
      page: page || ''
    }).then((res) => {
      setProductsRes(res);
    });
  }, []) // Search for urls on load and fetch products

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
                changeEvent={handleChangePage}
            />
        </Container>
    </Container>
  );
}

export default HomePage;
