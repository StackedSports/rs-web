
import { Stack, Typography, Chip } from '@mui/material'

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions'

const Tag = (props) => (
    <Chip label={props.name} variant="outlined" onDelete={props.onRemove} />
    // <Stack>
    //     <Typography>
    //         {props.name}
    //     </Typography>
    //     <ClearIcon
    //       onClick={props.onRemove}
    //       style={{
    //         color: "red",
    //         fontSize: 17,
    //         cursor: "pointer",
    //         marginLeft: 8,
    //       }}
    //     />
    // </Stack>
)

const TagsList = (props) => {
    if(!props.tags || props.tags.length === 0)
        return <></>
        
    return (
        <Stack
          direction="row" 
          flexWrap="wrap" 
          style={props.style} 
          gap={1} 
          mt={2} 
          mb={2}>
            {props.tags && props.tags.map((tag, index) => (
                <Tag
                //   style={{ margin: 0, margin }}
                  key={index}
                  name={tag.name}
                  onRemove={(e) => props.onRemoveTag(tag, index)}
                />
            ))}
        </Stack>

    )
}

export default TagsList