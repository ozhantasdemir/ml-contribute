import "../../pages/interface/Interface.css";
import styles from "./ContributeLabelForm.module.css";
import { Box, Button, LinearProgress } from "@mui/material";
import LabelUploadForm from "../ContributeUploadForm/LabelUploadForm";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const ContributeLabelForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      setLoading(true);
      // Make a POST request to the server
      await axios.post('/contribute/label');
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      // Handle error if upload fails
    }
  };


  const onGenerateFormClick = async () => {
    upload();
  };


  return (
    <>
      <div className={styles.guideWrapper}>
        <Box sx={{ width: "100%" }}>{loading && <LinearProgress />}</Box>
        <div className={styles.guideContainer}>
          <div className={styles.guideBody} style={{ minHeight: "800px" }}>
            <div className={styles.guideUpperArea}>
              <p className={styles.guideHeader}>Label Dataset</p>
            </div>
            <div className={styles.guideDivider}></div>
            <div className={styles.guideLowerArea}>
              <LabelUploadForm />
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
                    Label Dataset
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

export default ContributeLabelForm;
