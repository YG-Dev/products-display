import { Pagination } from "@mui/material";
import { ChangeEvent } from "react";

interface PaginationBoxProps {
    count: number;
    defaultPage: number;
    changeEvent: (event: ChangeEvent<unknown> | null, newPage: number) => void
}

function PaginationBox({count, defaultPage, changeEvent}: PaginationBoxProps) {
    if (count === 0) return null;
    
    return (
        <Pagination
            sx={{ display: 'flex', justifyContent: 'center' }}
            count={count}
            defaultPage={defaultPage}
            color="primary"
            onChange={changeEvent}
        />
    )
}

export default PaginationBox;