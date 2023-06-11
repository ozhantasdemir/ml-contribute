import {
  Button,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Typography,
} from "@mui/material";
import "./ContributeGuide.css";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import UseExistingModelDialog from "../UseExistingModelDialog/UseExistingModelDialog";
import { Box } from "@mui/system";

const steps = [
  {
    label: "Train",
    description: `Upload your dataset and train it. The trained model will be saved as a .pkl file.`,
  },
  {
    label: "Label",
    description: `Please upload the dataset containing the predictions of domain experts. The dataset will be saved as a labeled .csv file.`,
  },
  {
    label: "Merge",
    description: `Merge the two datasets you desired.`,
  },
 
];

const WizardStepper = () => {
  return (
    <>
      <Box>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label} active={true}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </>
  );
};

const ContributeGuide = ({ }) => {
  const history = useHistory();
  const [useExistingOpen, setExistingOpen] = useState(false);

const onUseExistingClick = (route) => {
  console.log("Existing clicked with route:", route);
  // Redirect to the specified route
  history.push(route);
};


  return (
    <div className="guide-wrapper">
      <UseExistingModelDialog
        open={useExistingOpen}
        onCloseClicked={() => setExistingOpen(false)}
      />
      <div className="guide-container">
        <div className="guide-body">
          <div className="guide-upper-area">
            {/**Head component */}
            <p className="guide-header"> How to Use?</p>
          </div>
          <div className="guide-divider"></div>
          <div className="guide-lower-area">
            <WizardStepper />
            <div className="upload-container">
              <Button
                variant="outlined"
                size="large"
                onClick={() => onUseExistingClick("/contribute/train")}
              >
                Train a Model
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onUseExistingClick("/contribute/label")}
              >
                Label a Dataset
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => onUseExistingClick("/contribute/merge")}
              >
                Merge Datasets
              </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributeGuide;
