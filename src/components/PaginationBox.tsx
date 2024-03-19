import { Pagination } from "@mui/material";
import { ChangeEvent } from "react";

interface PaginationBoxProps {
    count: number;
    changeEvent: (event: ChangeEvent<unknown> | null, newPage: number) => void
}

function PaginationBox({count, changeEvent}: PaginationBoxProps) {
    if (count === 0) return null;
    
    return (
        <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={count}
            color="primary"
            onChange={changeEvent}
        />
    )
}

export default PaginationBox;