import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./Character.css";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
}));

const Character = ({ uid, handleChange }) => {
  const classes = useStyles();
  const [level, setLevel] = React.useState("");

  const onChange = (event) => {
    setLevel(event.target.value);
    handleChange(event);
  };

  return (
    <div className="character">
      <TextField id={uid} label="角色" variant="outlined" />
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">会阶</InputLabel>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" name={uid} value={level} onChange={onChange}>
          <MenuItem value={1}>强力党</MenuItem>
          <MenuItem value={0.5}>弱鸡</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Character;
