import WizardGuide from "../ContributeGuide/ContributeGuide";
import WizardFileForm from "../ContributeFileForm/ContributeFileForm";
import styles from "./ContributeHome.module.css";

export default function ContributeHome() {
  return (
    <>
      <div className={styles.container}>
        <WizardGuide />
        
      </div>
    </>
  );
}
