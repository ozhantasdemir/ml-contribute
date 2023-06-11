import React, { useEffect, useReducer } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Interface.css";
import { Switch, Route } from "react-router-dom";
import Wizard from "../../components/Wizard/Wizard";
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
import WizardHome from "../../components/WizardHome/WizardHome";

const Interface = () => {
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
      <div className="interface-container">
        <WizardStateContext.Provider value={state}>
          <WizardDispatchContext.Provider value={dispatch}>
            <Switch>
              <Route
                path="/interface-wizard/form/:modelId"
                render={(props) => <Wizard {...props} />}
              />
              <Route
                path="/interface-wizard/"
                render={(props) => <WizardHome {...props} />}
              />
            </Switch>
          </WizardDispatchContext.Provider>
        </WizardStateContext.Provider>
      </div>
    </>
  );
};

export default Interface;
