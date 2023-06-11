import React, { useEffect, useReducer } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Contribute.css";
import { Switch, Route } from "react-router-dom";
import ContributeForm from "../../components/ContributeForm/Contribute";
import ContributeFileForm from "../../components/ContributeFileForm/ContributeFileForm";
import ContributeLabelForm from "../../components/ContributeLabelForm/ContributeLabelForm";
import ContributeMergeForm from "../../components/ContributeMergeForm/ContributeMergeForm";
import {
  initialState,
  readAndParseConfig,
  wizardStateReducer,
} from "../../stores/wizardStore/wizardReducer";
import {
  WizardStateContext,
  WizardDispatchContext,
} from "../../stores/wizardStore/wizardContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import ContributeHome from "../../components/ContributeHome/ContributeHome";

const Contribute = () => {
  const [state, dispatch] = useReducer(wizardStateReducer, initialState);
  const [_, setParsedConfig] = useLocalStorage("config", null);

  //NOTE: Every time the config is parsed(validated) save it to localStorage.
  useEffect(() => {
    readAndParseConfig(state.config, ({ parsedConfig, message }) => {
      if (message) {
        dispatch({
          type: "setMessage",
          message: message,
        });
      } else {
        setParsedConfig(parsedConfig);
      }
    });
  }, [state.config]);

  return (
    <>
      <Navbar />
      <div className="contribute-container">
        <WizardStateContext.Provider value={state}>
          <WizardDispatchContext.Provider value={dispatch}>
            <Switch>
              <Route
                path="/contribute/train"
                render={(props) => <ContributeFileForm {...props} />}
              />
              <Route
                path="/contribute/label"
                render={(props) => <ContributeLabelForm {...props} />}
              />
              <Route
                path="/contribute/merge"
                render={(props) => <ContributeMergeForm {...props} />}
              />
              <Route
                path="/contribute/form/:modelId"
                render={(props) => <ContributeForm {...props} />}
              />
              <Route
                path="/contribute/"
                render={(props) => <ContributeHome {...props} />}
              />
            </Switch>
          </WizardDispatchContext.Provider>
        </WizardStateContext.Provider>
      </div>
    </>
  );
};

export default Contribute;
