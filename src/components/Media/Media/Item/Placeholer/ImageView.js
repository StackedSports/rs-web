import React from "react";

const ImageView = (props) => {
    return(
        <div
            style={{
                display: "flex",
                width: 270,
                marginleft: 10,
                marginRight: 10,
            }}
        >
            <img
                style={{
                    marginTop: 10,
                    height: 170,
                    width: 75,
                    objectFit: "cover",
                    zIndex: 4,
                    opacity: 0.9,
                    marginLeft: 20,
                }}
                src={props.url}
            ></img>
            <img
                style={{
                    marginTop: 10,
                    height: 170,
                    width: 150,
                    marginLeft: -20,
                    objectFit: "cover",
                    zIndex: 10,
                }}
                src={props.url}
            ></img>
            <img
                style={{
                    marginTop: 10,
                    height: 170,
                    zIndex: 4,
                    opacity: 0.9,

                    marginLeft: -30,
                    width: 75,

                    objectFit: "cover",
                }}
                src={props.url}
            ></img>
        </div>
    )
}

export default ImageView;