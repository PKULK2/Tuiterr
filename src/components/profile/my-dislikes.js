import Tuits from "../tuits";
import * as service from "../../services/likes-service";
import {useEffect, useState} from "react";

const MyDislikes = () => {
    const [disLikedTuits, setDisLikedTuis] = useState([]);
    const findTuitsIDislike = () =>
        service.findAllTuitsDislikedByUser("my")
            .then((tuits) => setDisLikedTuis(tuits));
    useEffect(findTuitsIDislike, []);

    return(
        <div>
            <Tuits tuits={disLikedTuits} refreshTuits={findTuitsIDislike}/>
        </div>
    );
};
export default MyDislikes;