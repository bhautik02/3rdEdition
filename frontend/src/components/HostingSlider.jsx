import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FirstStep from "./SliderComponent/FirstStep";
import SecondStep from "./SliderComponent/SecondStep";
import ThirdStep from "./SliderComponent/ThirdStep";
import { useSelector } from "react-redux";

const steps = ["Add basic Details", "Add Perks & Photos", "Add extra info"];

export default function HostingSlider(props) {
  const addPlace = useSelector((state) => state.addPlace.addPlace);

  const ref = React.useRef();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  // const [close, setClose] = React.useState(false);

  // const [disabled, setDisabled] = React.useState(data ? false : true);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    // console.log("handleNext.......");
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    ref.current.click();
  };

  const modalClose = () => {
    props.setClose();
  };

  React.useEffect(
    () => {
      if (addPlace.title) {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      }
    },
    // eslint-disable-next-line
    [addPlace]
  );

  // React.useEffect(() => {
  //   if (activeStep === 2) {
  //     console.log("fromslider", addPlace);
  //   }
  // }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step
            key={label}
            completed={completed[index]}
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#F5385D", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "black",
              },
            }}
          >
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              <div className="justify-center flex text-3xl m-8">
                Place Hosted
              </div>
              <div className="flex justify-center">
                <Button
                  onClick={modalClose}
                  sx={{
                    mr: 1,
                    color: "#F5385D",
                    ":hover": {
                      bgcolor: "#F5385D",
                      color: "white",
                    },
                  }}
                >
                  Close
                </Button>
              </div>
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                pt: 2,
              }}
            >
              <Box sx={{ flex: "1 1 auto" }} />
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box>
              {activeStep === 0 && (
                <FirstStep
                  ref={ref}
                  editingPlaceInfo={props.editingPlaceInfo}
                />
              )}
            </Box>
            <Box>
              {activeStep === 1 && (
                <SecondStep
                  ref={ref}
                  editingPlaceInfo={props.editingPlaceInfo}
                />
              )}
            </Box>
            <Box>
              {activeStep === 2 && (
                <ThirdStep
                  ref={ref}
                  editingPlaceInfo={props.editingPlaceInfo}
                />
              )}
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />

              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button
                    onClick={handleComplete}
                    sx={{
                      color: "#F5385D",
                      ":hover": {
                        bgcolor: "#F5385D",
                        color: "white",
                      },
                    }}
                  >
                    {completedSteps() === totalSteps() - 1 ? "Finish" : "NEXT"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
