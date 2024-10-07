import { getGameAssets } from "../init/assets";
import { getStage, setStage } from "../models/stage.model";

export const moveStageHandler = (userID, payload) => {
    let currentStages = getStage(userID)
    //현재 스테이지 정보
    if (!currentStages.length) {
        return { status: 'fail', message: 'No stage found for user' };
    }

    currentStages.sort((a, b) => a.id - b.id);
    const currentStage = currentStages[currentStages.length - 1].id;

    if (currentStage.id !== payload.currentStage) {//클라이언트 서버 비교
        return { status: 'fail', message: 'incorrect stage' };
    }

    const { stages } = getGameAssets();

    const currentStageData = stages.data.find((stage) => stage.id === payload.currentStage);
    if (!currentStageData) {
        return { status: 'fail', message: `Current stage data not found stage id: ${payload.currentStage}` };
    }

    const targetStageData = stages.data.find((stage) => stage.id === payload.targetStage);
    if (!targetStageData) {
        return { status: 'fail', message: `Target stage not found stage id: ${payload.currentStage}` };
    }

    const serverTime = Data.now();
    const elapsedTime = (serverTime - currentStage.timestamp) / 1000;

    return { status: 'success' };
}