import { useContext } from "react";
import styles from "./MergeUploadForm.module.css";
import WizardOptionalFile from "../WizardOptionalFile/WizardOptionalFile";
import WizardUploadButton from "../WizardUploadButton/WizardUploadButton";
import {
  WizardDispatchContext,
  WizardStateContext,
} from "../../stores/wizardStore/wizardContext";

const MergeUploadForm = () => {
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
          mainText={"Click here to upload first Dataset."}
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
        <WizardUploadButton
          mainText={"Click here to upload second Dataset."}
          hintText={"Mandatory. File format is .csv."}
          fileName={configName}
          onClick={() => { }}
          onChange={(e) => {
            handleFileChange(e, "config");
          }}
          onClearClick={() => {
            onClearFile("config");
          }}
        />
      </div>
    </>
  );
};

export default MergeUploadForm;
