import React from "react";
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import "./css/faction.css";

function Faction(props) {
  return (
    <Card className="faction">
        <CardHeader
          title={props.name}
          subheader={props.set}
        />
        <CardMedia
          className="factionLogo"
          // classes={{
          //   root: {"background-size": "100px, 100px"}
          // }}
          style={{"backgroundSize": "100px, 100px"}}
          image={props.imageUrl}
          title={props.name}
        />
        <CardContent>
          <Typography component="p">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
  );
 }

 Faction.propTypes = {
  name: PropTypes.string.isRequired,
  set: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

export default Faction;