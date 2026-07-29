import { useState } from "react";

const useStatusMessage = () => {

    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    const showStatus = (message, type = "info") => {

        setStatusMessage(message);
        setStatusType(type);

        setTimeout(() => {
            setStatusMessage("");
            setStatusType("");
        }, 2000);

    };

    return {
        statusMessage,
        statusType,
        showStatus,
    };

};

export default useStatusMessage;