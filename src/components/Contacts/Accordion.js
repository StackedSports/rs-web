import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from '@mui/material/Stack';
import { Field } from 'formik';

export default function AccordionComponent(props) {

	const handleChange = (panel) => (event, newExpanded) => {
		props.setExpanded(newExpanded ? panel : false);
	};

	return (
		<Accordion
		  sx={{ width: '100%' }}
		  TransitionProps={{ unmountOnExit: true }}
		  onChange={handleChange(props.id)}
		  expanded={props.expanded === props.id}
		>
			<AccordionSummary
			  expandIcon={<ExpandMoreIcon />}
			  aria-controls={`${props.id}-content`}
			  id={`${props.id}-header`}
			>
				<Typography>
					{props.title}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Stack flex={1} direction="column" justifyContent="flex-start" alignItems="center" spacing={2}>
					{props.items ? props.items.map(item => {

					return (
						<Field
						key={item.name}
						id={item.name}
						name={item.name}
						label={item.label}
						type={item.type || "text"}
						component={item.component}
						onChange={e => { item.onChange(e); item.onChange(item.name, e.target.value) }}
						variant="standard"
						/>
					)
					})
					:
					props.children
					}
				</Stack>
			</AccordionDetails>
		</Accordion>
	);
}




// export default function AccordionComponent(props) {

//   return (
//     <div>
//       <Accordion
//         // sx={{
//         //   width: '100%',
//         // }}
//         unmountOnExit
//       >
//         <AccordionSummary
//           expandIcon={<ExpandMoreIcon />}
//           aria-controls={`${props.id}-content`}
//           id={`${props.id}-header`}
//         >
//           <Typography>{props.title}</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           {props.children}
//         </AccordionDetails>
//       </Accordion>
//     </div>
//   );
// }
