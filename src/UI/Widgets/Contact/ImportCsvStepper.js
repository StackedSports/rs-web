import { useState, useEffect, useRef } from 'react'
import { useTags } from 'Api/ReactQuery';
import { Dropdown } from '../DropdownMui';

import { CircularProgress, DialogContent, Link, Stack, StepContent } from '@mui/material'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { FaFileCsv } from 'react-icons/fa';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import UploadImg from "images/Upload.PNG"
import { SearchableOptionSelected } from 'UI/Forms/Inputs/SearchableOptions';

const UploadCsvContent = (props) => {
    const [file, setFile] = useState(null)
    const inputFileRef = useRef(null)

    const onBrowseClick = () => {
        inputFileRef.current.click()
    }

    const handleFileChange = (e) => {
        console.log(e.target.files)
        setFile(e.target.files[0])
    }

    const onDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file.type === "text/csv")
            setFile(file)
    }

    return (
        <>
            <Typography>
                Importing a CSV allows you to add and update people stored in Stacked Messenger. If a users phone number or Twitter handle is in your CSV matches an existing contact in Stacked messenger, they will be updated with the mapped values. Otherwise, a new contact will be created. A contact must have either a phone number or Twitter handle in order to be created.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                size='large'
                sx={{ maxWidth: '300px', alignSelf: 'center' }}
                endIcon={<FaFileCsv />}
            >
                Download Import Template
            </Button>
            <Stack //Dropzone
                alignItems="center"
                justify="center"
                mt={6}
                mb={2}
                p={3}
                sx={{
                    width: '100%',
                    background: "#fafcfd",
                    borderRadius: 1,
                    border: "0.8px dashed #DAE1ED",
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={onDrop}
            >
                {file ?
                    <>
                        <Typography variant='h5' fontWeight='bold' gutterBottom>
                            {file.name}
                        </Typography>
                        <Button
                            variant="text"
                            onClick={() => setFile(null)}
                        >
                            Remove
                        </Button>
                    </> : <>
                        <img src={UploadImg} style={{ userSelect: 'none', userDrag: 'none', pointerEvents: 'none' }} />

                        <Typography color='text.secondary'>
                            Drag & Drop or
                            <Button
                                variant='text'
                                onClick={onBrowseClick}
                            >
                                Browse
                            </Button>
                            your file here
                        </Typography>
                        <input
                            ref={inputFileRef}
                            type="file"
                            name="csv"
                            accept=".csv"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                    </>
                }
            </Stack>
        </>
    )
}

const TagContent = (props) => {
    const tags = useTags()
    const [selectedTags, setSelectedTags] = useState([])
    return (
        <>
            <Typography>
                Tags let you group a set of users together. For example, they’re great for highlighting VIP contacts or protential prospects and customers. For more information about tags, vistit our help docs.

                Each import gets a unique tag to help you find the users you’ve created and updated. You can also add more tags to identify these users.
            </Typography>
            <Stack direction='row' flexWrap='wrap' gap={1} minHeight='70px'>
                {selectedTags.map(tag => <SearchableOptionSelected key={tag.id} item={tag.name} onRemove={() => setSelectedTags(selectedTags.filter(t => t.id !== tag.id))} />)}
            </Stack>
            <Dropdown
                label="Add Tags"
                icon={<LocalOfferIcon />}
                options={tags.items}
                onClick={(tag) => setSelectedTags([...selectedTags, tag])}
                onSearch={(search) => tags.search(search)}
                getOptionLabel={(option) => option.name}
                zIndex={(theme) => theme.zIndex.modal}
            />
        </>
    )
}

const ImportLoadingContent = (props) => {
    return (
        <Box p={6} alignSelf='center'>
            <CircularProgress />
        </Box>
    )
}

const ImportResultsContent = (props) => {
    return (
        <>
            <Typography fontWeight='bold'>
                Import complete
            </Typography>
            <Stack direction='row' justifyContent='space-around' >
                <Box>
                    <Typography>
                        250
                    </Typography>
                    <Typography>
                        Contacts imported
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        56
                    </Typography>
                    <Typography>
                        Contacts updated
                    </Typography>
                </Box>
                <Box>
                    <Typography>
                        0
                    </Typography>
                    <Typography>
                        Erros
                    </Typography>
                    <Link underline='always'  >
                        View Errors
                    </Link>
                </Box>
            </Stack>
            <Typography>
                Your data is processing and will be available shorlty. In a few minutes, you can browse the created and updated contacts with the tag:
            </Typography>
            <Stack direction='row' flexWrap='wrap' gap={1}>
                {[{ id: 1, name: 'CSV Import -  MM/DD/YY TIME' }, { id: 2, name: 'Goodluck Graphics' }].map(tag => <SearchableOptionSelected key={tag.id} item={tag.name} disabled />)}
            </Stack>
        </>
    )
}

export const ImportCsvStepper = (props) => {
    const steps = ['Upload CSV', 'Tag', 'Imports'];
    const [activeStep, setActiveStep] = useState(0);


    const handleNext = () => {
        if (activeStep === steps.length) {
            props.onClose()
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 0)
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        else
            props.onBack()
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <UploadCsvContent />;
            case 1:
                return <TagContent />;
            case 2:
                return <ImportLoadingContent />;
            case 3:
                return <ImportResultsContent />;
            default:
                return 'Unknown step';
        }
    }

    return (
        <DialogContent>
            <Stepper activeStep={activeStep} orientation='horizontal' sx={{ justifyContent: 'space-evenly' }}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>

            <Stack gap={2.5} p={2} mt={2}>
                {getStepContent(activeStep)}
            </Stack>

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    onClick={handleBack}
                >
                    Back
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button onClick={handleNext}>
                    {activeStep === steps.length ? 'Close' : 'Next'}
                </Button>
            </Box>

        </DialogContent>
    );
}

export default ImportCsvStepper
