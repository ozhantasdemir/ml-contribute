import "../../pages/interface/Interface.css";
import styles from "./ContributeMergeForm.module.css";
import { Box, Button, LinearProgress } from "@mui/material";
import MergeUploadForm from "../ContributeUploadForm/MergeUploadForm";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';


const ContributeMergeForm = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const upload = async () => {
    try {
      setLoading(true);
      // Make a POST request to the server
      await axios.post('/contribute/merge');
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
              <p className={styles.guideHeader}>Merge Datasets</p>
            </div>
            <div className={styles.guideDivider}></div>
            <div className={styles.guideLowerArea}>
              <MergeUploadForm />
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
                    Merge Datasets
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

export default ContributeMergeForm;
