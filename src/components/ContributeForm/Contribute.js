import PredictionForm from "../PredictionForm/PredictionForm";
import "./Contribute.css";
import { useHistory, useParams } from "react-router-dom";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Button } from "@mui/material";

const Contribute = () => {
  const [parsedConfig, _] = useLocalStorage("config", null);
  const { modelId } = useParams();
  const history = useHistory();

  const validState = parsedConfig != null && modelId.length === 24;

  return (
    <>
      <div className="wizard-wrapper">
        <div className="wizard-container">
          <div className="info-container"></div>
          {validState ? (
            <PredictionForm parsedConfig={parsedConfig} modelId={modelId} />
          ) : (
            <div className="error-container">
              <h1 className="error-code">404</h1>
              <h3 className="error-text">
                The Model ID is malformed. Go back to our Guide page and learn
                how you can get started.
              </h3>
              <Button
                onClick={() => {
                  history.push("/interface-wizard");
                }}
                size="large"
                variant="contained"
              >
                Go to Guide
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contribute;
