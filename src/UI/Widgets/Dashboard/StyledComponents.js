import { styled, Typography } from "@mui/material";

export const Section = styled("div")(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.spacing(.5),
    backgroundColor: theme.palette.background.paper,
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
    fontFamily: 'ProximaNovaBold',
    fontSize: theme.typography.pxToRem(18),
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: theme.typography.pxToRem(31),
}));