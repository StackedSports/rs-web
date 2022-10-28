import { Typography } from "@mui/material";

export default function MediaInputTitle(props) {

  //let el = props.type ? props.type : p

  return (
    <Typography
      color='text.secondary'
      style={{
        fontSize: 17,
        fontWeight: 500,
        marginTop: 0,
        marginBottom: 10,
        ...props.style
      }}
    >
      {props.title}
    </Typography>
  )
}