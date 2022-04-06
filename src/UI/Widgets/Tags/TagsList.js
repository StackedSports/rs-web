
import {
    Grid,
} from "@material-ui/core"

import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions'

const TagsList = (props) => {


    return (
        <Grid container direction="row" style={props.style}>
            {props.tags && props.tags.map((tag, index) => (
                <SearchableOptionSelected
                  item={tag.name}
                  onRemove={(e) => props.onRemoveTag(tag, index)}
                />
            ))}

        </Grid>

    )
}

export default TagsList