export function getErrorMessage(errorStatus: number): string {
    let errorMessage: string;

    switch(errorStatus) {
        case 404:
            errorMessage = 'Not found'
            break;
        case 505:
            errorMessage = 'Internal server error'
            break;
        default:
            errorMessage = 'Something went wrong';
            break;
    }
    
    return errorMessage;
}