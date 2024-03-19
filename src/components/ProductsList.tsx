import { Box, Alert, Modal, Typography } from '@mui/material';
import { ProductsResponse } from "../api/products";
import { ProductItem } from '../api/products';
import {  useState } from 'react';
import { getErrorMessage } from '../api/get-error-message';

const productModalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #fff',
    boxShadow: 24,
    p: 4,
  };

function ProductsList(props: ProductsResponse) {
    const [open, setOpen] = useState(false);
    const [modalData, setModalData] = useState<ProductItem>();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function showModal(itemData: ProductItem) {
        setModalData(itemData);
        handleOpen();
    }
    
    function SingleProduct(item: ProductItem) {
        return (
            <Box
                key={item.id}
                sx={{
                    bgcolor: item.color,
                    color: 'secondary.contrastText',
                    padding: 2,
                    marginY: 2,
                    borderRadius: 4,
                    textAlign: 'center',
                    cursor: 'pointer'
                }}
                onClick={() => showModal(item)}
            >
                {item.name}
            </Box>
        );
    }

    if (props.isSuccessful && props.products) {
        let products: JSX.Element | JSX.Element[] = <></>;

        if(!Array.isArray(props.products.data)) { // If the result is single object
            products = SingleProduct(props.products.data);
        }

        if(Array.isArray(props.products.data)) {
            products = props.products.data.map((item) => { // If the result is array of objects
                return SingleProduct(item);
            })
        }

        return (
            <>
                {products}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={productModalStyle} bgcolor={modalData?.color}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalData?.name} with ID of {modalData?.id}
                        </Typography>
                        <Box id="modal-modal-description" sx={{ mt: 2 }}>
                            <Typography>Made in {modalData?.year}</Typography>
                            <Typography>HEX color value: {modalData?.color}</Typography>
                            <Typography>Pantone value: {modalData?.pantone_value}</Typography>
                        </Box>
                    </Box>
                </Modal>
                
            </>
        );
    }

    if (!props.isSuccessful && props.status) { // Error occured with status code
        const errorMessage = getErrorMessage(props.status);

        return (
            <Alert sx={{ padding: 2, marginY: 2, }} severity='error'>
                Error {props.status} - {errorMessage}
            </Alert>
        )
    }
    
    return ( // Other error
        <Alert sx={{ padding: 2, marginY: 2, }} severity='error'>
            Oops! Something went wrong. Please try again
        </Alert>
    )
}

export default ProductsList;