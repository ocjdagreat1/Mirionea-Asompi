import { useState } from "react";

const useTransitions = () => {

    const [sceneTransition, setSceneTransition] = useState(false);

    const fadeOut = () => {
        setSceneTransition(true);
    };

    const fadeIn = () => {
        setSceneTransition(false);
    };

    return {
        sceneTransition,
        fadeOut,
        fadeIn,
    };
};

export default useTransitions;