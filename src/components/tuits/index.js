import tuits from "./tuits-data.json";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as service from "../../services/tuits-service";

function Tuits({tuits = [], refreshTuits}) {
    const likeTuit = (tuit) =>
        likesService
            .userTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e))
    const dislikeTuit = (tuit) =>
        likesService.userTuitDisLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e=> alert(e))
    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);
    return(
        <div>
            <ul className="ttr-tuits list-group">
                {
                    tuits.map && tuits.map(tuit => {
                        return(
                            <Tuit key={Math.random()} tuit={tuit} deleteTuit={deleteTuit} likeTuit={likeTuit} unlikeTuit={dislikeTuit}/>
                        );
                    })
                }
            </ul>
        </div>
    );
}
export default Tuits;