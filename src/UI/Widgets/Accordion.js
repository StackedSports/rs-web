import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { ErrorMessage, Field } from 'formik';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function AccordionComponent(props) {

	const [showLoadingButton, setShowLoadingButton] = useState(false)

	const handleChange = (accordionId, event, newExpanded) => {
		props.setExpanded(newExpanded ? accordionId : false);
	};
	return (
		<Accordion
			sx={{ width: '100%' }}
			TransitionProps={{ unmountOnExit: true }}
			onChange={(event, newExpanded) => handleChange(props.id, event, newExpanded)}
			expanded={props.expandedId === props.id}
			disableGutters
			elevation={0}
		>
			<AccordionSummary
				sx={{ backgroundColor: '#f7f7f7', padding: '1 2' }}
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${props.id}-content`}
				id={`${props.id}-header`}
			>
				<Stack sx={{ width: "95%" }} direction="row" spacing={1} justifyContent="space-between" alignItems="center">
					<Typography fontWeight="bold">
						{props.title}
					</Typography>
					<LoadingButton
						style={{ visibility: props.showSaveButton && !props.saving ? "visible" : "hidden" }}
						//loadingPosition="start"
						// startIcon={<SaveIcon />}
						variant="outlined"
						onClick={props.onDiscard} 
					>
						Discard
					</LoadingButton>
					<LoadingButton
						style={{ visibility: props.showSaveButton ? "visible" : "hidden" }}
						loading={props.saving}
						//loadingPosition="start"
						// startIcon={<SaveIcon />}
						variant="contained"
						type="submit"
						onClick={(e) => e.stopPropagation()}
					>
						Save
					</LoadingButton>
				</Stack>
			</AccordionSummary>
			<AccordionDetails>
				<Stack
					flex={1}
					justifyContent="flex-start"
					spacing={2}
				>
					{props.items && props.items.map(item => {

						const onInputChange = (e) => {
							// if (e.target.value != "")
							// 	setShowLoadingButton(true)
							// if (e.target.value == "")
							// 	setShowLoadingButton(false)
							props.onFieldChange(e)
						}

						return (
							<>
								<Field
									key={item.name}
									id={item.name}
									name={item.name}
									label={item.label}
									value={item.value || ""}
									type={item.type || "text"}
									variant={item.variant || 'outlined'}
									component={item.component}
									onChange={e => { onInputChange(e); props.onFieldValue(item.name, e.target.value) }}
									//error={ Boolean(item.error)}
        							//helperText={ item.error}
								/>
								{item.touch && <ErrorMessage name={item.name} />}
							</>
						)
					})}
					{props.children}
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}