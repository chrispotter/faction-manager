import React from "react";
import Faction from "./Faction";

import "./css/factionlist.css";

function FactionList(props) {
  return (
    <div className="factionlist">
      {props.factions.map((c, index) => <Faction key={index} 
                                        name={c.name} 
                                        description={c.description} 
                                        set={c.set}
                                        imageUrl={c.imageUrl} />)}
     </div> 
  ); 
}

export default FactionList;