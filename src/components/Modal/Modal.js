import Button from '../Button/Button';
import CheckMark from '../Icons/CheckMark';
import XCircle from '../Icons/XCircle';
import './Modal.css';

const Modal = ({isErroneous, closeModalCallback}) => {

    return (
        <div className="background-wrapper" >
            <div className="background-darker" >

            </div>
            <div className="modal-wrapper" onClick={closeModalCallback} >
                {
                    isErroneous ?
                    <div style={{textAlign:"center"}} >
                        <XCircle height={100} width={100} />
                        <br/>
                        <br/>
                        You have to choose one before submitting!
                    </div>
                    :
                    <div style={{textAlign:"center"}}>
                        <CheckMark height={100} width={100} />
                        <br/>
                        <br/>
                        "Successfully submitted. Want to fill another?"
                    </div>
                }

                <div className='button-container' >
                    <Button type="button" buttonType="danger" text="Close" />
                    {
                        isErroneous ?
                        null
                        :
                        <div style={{marginLeft:30}} >
                            <Button type="button" buttonType="success" text="Fill Another" />
                        </div>
                    }
                </div>
            </div>
            
        </div>
    )
}

export default Modal;