

export const Row = (props) => <div className='Row'>{props.children}</div>

export const Divider = (props) => (
    <div
        style={{
        margin: "20px 0",
        height: 2,
        backgroundColor: "rgb(223, 223, 223)",
        width: "100%",
        }}
    ></div>
)