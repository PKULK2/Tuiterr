import tuits from "./tuits-data.json";
import './tuits.css';
import Tuit from "./tuit";

function Tuits({tuits = [], deleteTuit}) {
 return(
     <div>
        <ul className="ttr-tuits list-group">
         {
           tuits.map && tuits.map(tuit => {
             return(
               <Tuit key={Math.random()} tuit={tuit}/>
             );
           })
         }
        </ul>
     </div>
    );
}
export default Tuits;