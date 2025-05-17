import Toast from "../Components/Toast";
import Button from "../Components/Button";

const ButtonWithToast = ({ label, toastMessage, toastEmoji }) => {
    const handleClick = () => {
        Toast(toastMessage, toastEmoji);
    };

    return (
        <Button label={label} onClick={handleClick} />
    );
}

const Step1ReusableComponent = () => (
    <>
        <h2 className="text-2xl font-semibold mb-4">Reusable React Components</h2>
        <p className="text-gray-800 mb-4">
            Reusable components are self-contained pieces of UI that can be used multiple times throughout an application, promoting code reusability and consistency.
        </p>
       <div className="flex flex-row space-x-4">
         <ButtonWithToast 
      label="Greet" 
      toastMessage="Hello there!" 
      toastEmoji="👋" 
    />
    <ButtonWithToast 
      label="Celebrate" 
      toastMessage="Congratulations!" 
      toastEmoji="🎉" 
    />
    <ButtonWithToast 
      label="Warning" 
      toastMessage="Be careful!" 
      toastEmoji="⚠️" 
    />
       </div>
    </>
);

export default Step1ReusableComponent;
