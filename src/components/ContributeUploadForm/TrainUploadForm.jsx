import { useContext } from "react";
import styles from "./TrainUploadForm.module.css";
import WizardUploadButton from "../WizardUploadButton/WizardUploadButton";
import {
  WizardDispatchContext,
  WizardStateContext,
} from "../../stores/wizardStore/wizardContext";

const TrainUploadForm = () => {
  const state = useContext(WizardStateContext);
  const dispatch = useContext(WizardDispatchContext);

  const handleFileChange = (e, type) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const action = {
        type: type,
        file: e.target.files,
      };
      dispatch(action);
      console.log(`action invoked with ${action}`);
    }
  };

  const onClearFile = (type) => {
    const action = {
      type: type,
      file: null,
    };
    dispatch(action);
  };

  const modelName = state.model ? state.model[0].name : "";
  const configName = state.config ? state.config[0].name : "";
  const inTsfName = state.intsf ? state.intsf[0].name : "";
  const outTsfName = state.outtsf ? state.outtsf[0].name : "";

  return (
    <>
      <div className={styles.container}>
        <WizardUploadButton
          mainText={"Click here to upload a dataset."}
          hintText={"Mandatory. File format is .csv."}
          fileName={modelName}
          onClick={() => { }}
          onChange={(e) => {
            console.log("change invoked");
            handleFileChange(e, "model");
          }}
          onClearClick={() => {
            onClearFile("model");
          }}
        />
      </div>
    </>
  );
};

export default TrainUploadForm;
