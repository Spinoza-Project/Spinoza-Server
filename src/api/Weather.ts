import axios from "axios";
import config from "../config";

const getWeather = async (
    baseDate: string,
    baseTime: string,
    nx: number,
    ny: number
) => {
    const { data } = axios.get(
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst",
        {
            params: {
                serviceKey: config.serviceKey,
                numOfRows: 10,
                pageNo: 1,
                dataType: "JSON",
                baseDate: baseDate,
                baseTime: baseTime,
                nx: nx,
                ny: ny,
            },
        }
    );
    return data;
};

const getCurrentDate = () => {
    const date = new Date();
    const yearStr = date.getFullYear().toString();

    let month = date.getMonth() + 1;
    const monthStr = month < 10 ? "0" + month.toString() : month.toString();

    let day = date.getDate();
    const dayStr = day < 10 ? "0" + day.toString() : day.toString();

    return yearStr + monthStr + dayStr;
};

const getCurrentTime = () => {
    const date = new Date();

    let hour = 0;
    let minutes = date.getMinutes();

    if (minutes >= 45) {
        hour = date.getHours();
        minutes = 30;
    } else {
        minutes = 30;
        hour = date.getHours();
        hour = hour == 0 ? 23 : hour - 1;
    }

    const hourStr = hour < 10 ? "0" + hour.toString() : hour.toString();
    const minutesStr =
        minutes < 10 ? "0" + minutes.toString() : minutes.toString();

    return hourStr + minutesStr;
};

export default {
    getWeather,
    getCurrentDate,
    getCurrentTime,
};
