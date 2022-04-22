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

	const [disabledButton, setDisabledButton] = useState(true)

	const handleChange = (accordionId) => (event, newExpanded) => {
		props.setExpanded(newExpanded ? accordionId : false);
	};

	return (
		<Accordion
			sx={{ width: '100%' }}
			TransitionProps={{ unmountOnExit: true }}
			onChange={handleChange(props.id)}
			expanded={props.expandedId === props.id}
		>
			<AccordionSummary
				sx={{ backgroundColor: '#f7f7f7', padding: '7px' }}
				expandIcon={<ExpandMoreIcon />}
				aria-controls={`${props.id}-content`}
				id={`${props.id}-header`}
			>
				<Stack sx={{ width: "95%" }} direction="row" spacing={1} justifyContent="space-between" alignItems="center">
					<Typography fontWeight="bold">
						{props.title}
					</Typography>
					{props.showButtonSummary &&
						<LoadingButton
							loading={(props.expandedId === props.id) && props.loadingUpdateContact}
							loadingPosition="start"
							startIcon={<SaveIcon />}
							variant="contained"
							disabled={disabledButton}
							type="submit"
						>
							Save
						</LoadingButton>
					}
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
							if (e.target.value != "")
								setDisabledButton(false)
							if (e.target.value == "")
								setDisabledButton(true)
							props.onFildChange(e)
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
									component={item.component}
									onChange={e => { onInputChange(e); props.setFildValue(item.name, e.target.value) }}
									variant="standard"
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