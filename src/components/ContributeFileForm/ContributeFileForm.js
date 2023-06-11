import "../../pages/interface/Interface.css";
import styles from "./ContributeFileForm.module.css";
import { Box, Button, LinearProgress } from "@mui/material";
import TrainUploadForm from "../ContributeUploadForm/TrainUploadForm";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const ContributeFileForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      setLoading(true);
      // Make a POST request to the server
      await axios.post('/contribute/train');
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
              <p className={styles.guideHeader}>Train a Model</p>
            </div>
            <div className={styles.guideDivider}></div>
            <div className={styles.guideLowerArea}>
              <TrainUploadForm />
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
                    Train
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

export default ContributeFileForm;
