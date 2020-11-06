import React, { Component } from "react";
import Character from "./Character";
import Button from "@material-ui/core/Button";
import { dkp } from "../DkpData";
import "./Home.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      result: "",
      level: {},
    };
  }

  onBtnClick = () => {
    let charAry = [];
    charAry.push(this.state.dkpObj[document.getElementById("char1").value]);
    charAry.push(this.state.dkpObj[document.getElementById("char2").value]);
    charAry.push(this.state.dkpObj[document.getElementById("char3").value]);
    charAry.push(this.state.dkpObj[document.getElementById("char4").value]);
    charAry.push(this.state.dkpObj[document.getElementById("char5").value]);
    let result = "";
    let charTotal = 0;
    charAry.forEach((char, index) => {
      if (char) {
        const t1 = char.dkp_lifetime_1 ? char.dkp_lifetime_1 : 0;
        const t2 = char.dkp_lifetime_3 ? char.dkp_lifetime_3 : 0;
        const t25 = char.dkp_lifetime_4 ? char.dkp_lifetime_4 : 0;
        const charLevel = this.state.level[`char${index + 1}`] ? this.state.level[`char${index + 1}`] : 0;
        const total = (t1 + t2 * 2 + t25 * 2.5) * charLevel;
        result +=
          document.getElementById(`char${index + 1}`).value +
          "  (会阶系数：" +
          charLevel +
          ")" +
          "\nT1: " +
          t1 +
          "   T2: " +
          t2 +
          "   T2.5: " +
          t25 +
          "\n总计: T1 + T2 x 2  + T2.5 x 2.5 = " +
          total +
          "\n\n";
        charTotal += total;
      }
    });
    result += `玩家总计: ${charTotal}`;
    this.setState({
      result: result,
    });
  };

  handleChange = (event) => {
    // console.log(event.target);
    let tempLevel = this.state.level;
    tempLevel[event.target.name] = event.target.value;
    this.setState({
      level: tempLevel,
    });
  };

  render() {
    return (
      <div className="container">
        <h1>DKP总获取</h1>
        <h6>数据截止到2020-11-3中午。</h6>
        <div className="inner">
          <Character uid="char1" handleChange={this.handleChange} />
          <Character uid="char2" handleChange={this.handleChange} />
          <Character uid="char3" handleChange={this.handleChange} />
          <Character uid="char4" handleChange={this.handleChange} />
          <Character uid="char5" handleChange={this.handleChange} />
          <Button variant="contained" color="primary" onClick={this.onBtnClick}>
            计算
          </Button>
          <h5 className="result">{this.state.result}</h5>
        </div>
      </div>
    );
  }

  componentDidMount() {
    const temp = dkp
      .replace(/=/g, ":")
      .replace(/\[/g, "")
      .replace(/\]/g, "")
      .replace(/ /g, "")
      .replace(/\n/g, "")
      .replace(/,}/g, "}");
    const jsonObj = JSON.parse(temp);
    this.setState({
      dkpObj: jsonObj,
    });
  }
}

export default Home;
