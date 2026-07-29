import { useState } from "react";

const useStageEffects = () => {

    const [stageEffect, setStageEffect] = useState("normal");

    const normal = () => setStageEffect("normal");

    const locked = () => setStageEffect("locked");

    const correct = () => setStageEffect("correct");

    const wrong = () => setStageEffect("wrong");

    return {
        stageEffect,
        normal,
        locked,
        correct,
        wrong,
    };
};

export default useStageEffects;