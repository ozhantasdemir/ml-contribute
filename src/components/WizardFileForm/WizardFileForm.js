import "../../pages/interface/Interface.css";
import styles from "./WizardFileForm.module.css";
import { Alert, Box, Button, LinearProgress, Snackbar } from "@mui/material";
import FilesUploadForm from "../FilesUploadForm/FilesUploadForm";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { uploadModelWrapper } from "../../api/predictionsApi";
import {
  WizardStateContext,
  WizardDispatchContext,
} from "../../stores/wizardStore/wizardContext";

const WizardFileForm = ({}) => {
  const history = useHistory();
  const state = useContext(WizardStateContext);
  const dispatch = useContext(WizardDispatchContext);
  const [loading, setLoading] = useState(false);

  async function upload() {
    try {
      setLoading(true);
      const args = {
        model: state.model[0],
        config: JSON.parse(localStorage.getItem("config")),
        intsf: state.intsf?.[0],
        outtsf: state.outtsf?.[0],
      };
      const result = await uploadModelWrapper(args);
      console.log(result);
      setLoading(false);
      history.push(`/interface-wizard/form/${result.model_id}`);
    } catch (e) {
      console.error(e);
      setLoading(false);
      dispatchError("Upload failed. Please try again.");
    }
  }

  const onGenerateFormClick = async () => {
    if (!state.config || !state.model) {
      dispatchError("Please provide both mandatory files.");
      return;
    }
    console.log(state);
    upload();
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: "clearMessage" });
  };

  const dispatchError = (message) => {
    dispatch({
      type: "setMessage",
      message: message,
    });
  };

  const SnackbarError = (
    <Snackbar
      open={state.message !== null}
      autoHideDuration={6000}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="error"
        sx={{ width: "100%" }}
      >
        {state.message}
      </Alert>
    </Snackbar>
  );

  return (
    <>
      <div className={styles.guideWrapper}>
        <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
        <div className={styles.guideContainer}>
          {SnackbarError}
          <div className={styles.guideBody} style={{ minHeight: "800px" }}>
            <div className={styles.guideUpperArea}>
              {/**Head component */}
              <p className={styles.guideHeader}>Upload Form</p>
            </div>
            <div className={styles.guideDivider}></div>
            <div className={styles.guideLowerArea}>
              {/**Body */}
              <FilesUploadForm />
              <div className={styles.uploadContainer}>
                <>
                  <Button
                    variant="contained"
                    size="large"
                    color="success"
                    onClick={() => {
                      onGenerateFormClick();
                    }}
                  >
                    Generate the Form
                  </Button>
                </>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardFileForm;
