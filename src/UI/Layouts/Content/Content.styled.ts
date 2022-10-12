import { Box, styled } from '@mui/material'

export const ContentWrapper = styled(Box)`
    position: relative;
    margin-left: 0;
    padding: 10px;
    transition: all 300ms cubic-bezier(1, 0, 0, 1);
    display: flex;
    flex-direction: row;
    flex: 1 0 0;
    overflow-y: auto;
    max-height: 100vh;
    margin-bottom: 8px;

    @media screen and (min-width: 1000px) {
        padding-right: 16px;
        margin-left: 60px;
    }
`