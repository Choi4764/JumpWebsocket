import { getGameAssets } from '../init/assets.js';
import { clearStage, getStage, setStage } from '../models/stage.model.js';

export const gameStart = (uuid, payload) => {
    const { stages } = getGameAssets();

    clearStage(uuid);
    setStage(uuid, stages.data[0].id, payload.timestamp);

    console.log('Stage:', getStage(uuid))

    return { status: 'success' };
}

export const gameEnd = (uuid, payload) => {
    const { score } = payload;
    const stage = getStage(uuid);

    if (!stage.length) {
        return {status: 'fail', message: 'No stages found for user'};
    }

    const{stages} = getGameAssets();
    let totalScore = 0;
    stages.forEach((stage, index) => {
        let stageEndTime;

        if (index === stages.length - 1) {
            stageEndTime = gameEndTime;
        } else {
            stageEndTime = stages[index + 1].timestamp;
        }

        const stageDuration = (stageEndTime - stage.timestamp) / 1000;

        const currentStageAsset = stageAssets.data.find((s) => s.id === stage.id);
        if (currentStageAsset) {
            const scorePerSecond = currentStageAsset.scorePerSecond;
            totalScore += stageDuration * scorePerSecond;
        }
    });
    //점수와 타임 스탬프 검증
    if (Math.abs(score - totalScore) > 5) {
        return { status: 'fail', message: 'Score verification failed' };
    }
    return { status: 'success', message: 'Game ended successfully', score };
};
