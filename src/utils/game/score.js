import { SCORE_MODE } from '../../constants';

export function getScore(distance, difficulty, time, mode) {
    switch (mode) {
        case SCORE_MODE.TIME:
            return Math.round(
                //6000000 : 4852 en 3 minutes à 0m
                //1200000 : 4303 en 3 minutes à 0m
                getScoreNormal(distance, difficulty) * Math.exp(-time / 1200000)
            );

        default:
            return getScoreNormal(distance, difficulty);
    }
}

function getScoreNormal(distance, difficulty) {
    if (distance < 50) {
        return 5000;
    } else {
        const point = Math.round(
            5000 * Math.exp(-(distance / 1000 / difficulty))
        );

        if (point > 5000) {
            return 5000;
        } else if (point < 0) {
            return 0;
        }
        return point;
    }
}
