<template>
  <div class="text-editor">
    <div class="heading-overlay">Edit Scoreboard</div>
    <div class="overlay-row">
      <div>
        <p class="subhead-overlay">Overlay name</p>
        <div class="txt-box">
          <input
            type="text"
            name="Scoreboard"
            :value="widgetData.properties.widgetName"
            :maxlength="maxLength.overLayName"
            @input="handleWidgetNameChange"
          />
        </div>
        <p class="subhead-overlay">Style</p>
        <div class="select">
          <Dropdown
            name="styleType"
            :optionList="styleTypeList"
            :selectedOption="widgetData.properties.styleType"
            @selectOption="handleChangeStyleType"
          />

          <!-- <select>
            <option>Dark</option>
            <option>Light</option>
          </select> -->
        </div>
      </div>
    </div>

    <div class="overlay-row">
      <div>
        <p class="subhead-overlay">Player 1</p>
        <div class="txt-box">
          <input
            type="text"
            name="TeamA"
            :value="widgetData.properties.player1Name"
            :maxlength="maxLength.player1"
            @input="handlePlayer1NameChange"
          />
        </div>
        <p class="subhead-overlay">Score 1</p>
        <div class="Score-btn">
          <button @click="handleSubScore1(3)">- 3</button
          ><button @click="handleSubScore1(2)">- 2</button
          ><button @click="handleSubScore1(1)">- 1</button>
          <input type="text" :value="widgetData.properties.score1" readonly />
          <button @click="handleAddScore1(1)">+ 1</button
          ><button @click="handleAddScore1(2)">+ 2</button
          ><button @click="handleAddScore1(3)">+ 3</button>
        </div>
        <p class="subhead-overlay">Player 2</p>
        <div class="txt-box">
          <input
            type="text"
            name="TeamB"
            :value="widgetData.properties.player2Name"
            :maxlength="maxLength.player2"
            @input="handlePlayer2NameChange"
          />
        </div>
        <p class="subhead-overlay">Score 2</p>
        <div class="Score-btn">
          <button @click="handleSubScore2(3)">- 3</button
          ><button @click="handleSubScore2(2)">- 2</button
          ><button @click="handleSubScore2(1)">- 1</button>
          <input type="text" :value="widgetData.properties.score2" readonly />
          <button @click="handleAddScore2(1)">+ 1</button
          ><button @click="handleAddScore2(2)">+ 2</button
          ><button @click="handleAddScore2(3)">+ 3</button>
        </div>
      </div>
      <div></div>
    </div>

    <div class="overlay-row">
      <div>
        <p class="subhead-overlay">
          Game clock
          <span class="cus-elcheckbox">
            <el-checkbox
              v-model="widgetData.properties.isGameClockEnabled"
              @change="(evt) => onChangeCheckBox(evt)"
            ></el-checkbox>
          </span>
        </p>
        <div v-if="widgetData.properties.isGameClockEnabled">
          <p class="subhead-overlay">Type</p>
          <el-radio-group
            v-model="widgetData.properties.timerType"
            class="radio-btn"
            @change="handleCountType"
          >
            <el-radio label="down">Countdown</el-radio>
            <el-radio label="up">Countup</el-radio>
          </el-radio-group>
          <p class="subhead-overlay">Timer</p>
          
          <div class="time-picker">
            <el-time-picker
              v-model="pickerValue"
              :editable="true"
              :clearable="false"
              :format="getTimerFormat"
              :placeholder="timerFormatValue"
              @change="handleTimerInput"
            >
            </el-time-picker>
          </div>

          <div class="timer-btn">
            <button
              id="Start"
              :class="getClassForStartResume"
              @click="handleButtonClick('Start')"
              :value="getTextForStart"
            >
              {{ getTextForStart }}
            </button>
            
            <button
              id="Stop"
              :class="getClassForStop"
              @click="handleButtonClick('Stop')"
              value="Stop"
            >
              Stop
            </button>
            <button
              :class="getClassForReset"
              id="Reset"
              @click="handleButtonClick('Reset')"
              value="Reset"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";

export default {
  name: "ScoreBoard",
  components: { Dropdown },
  props: {
    widgetData: Object,
  },
  created() {
    this.actionName = this.widgetData.properties.action;
    this.setDate();
    this.setTimerInput();
  },
  computed: {
    getClassForStartResume: function() {
      return this.actionName === null ||
        this.actionName === "Stop" ||
        this.actionName === "Reset"
        ? "active"
        : "";
    },
    getClassForStop: function() {
      return this.actionName === "Start" || this.actionName === "Resume"
        ? "active"
        : "";
    },
    getClassForReset: function() {
      return this.actionName === "Stop" ? "active" : "";
    },
    getTextForStart: function() {
      return this.actionName === "Start" || this.actionName === "Stop"
        ? "Resume"
        : "Start";
    },
    getTimerFormat: function() {
      return this.timerFormatValue === "MM:SS" ? "mm:ss" : "HH:mm:ss";
    },
  },

  data: function() {
    return {
      styleTypeList: ["Dark", "Light"],
      minScore: 0,
      maxScore: 10000,
      maxLength: {
        overLayName: 500,
        player1: 500,
        player2: 500,
      },
      isGameClockEnable: false,
      countTypeValue: "down",
      timerFormatOptions: ["HH:MM:SS", "MM:SS"],
      timerFormatValue: this.widgetData.properties.timerFormat,
      actionValue: "",
      pickerValue: new Date(0, 0, 0, 0, 0),
      timerInputValue: 0,
      actionName: null,
      contentValue: "",
    };
  },
  methods: {
    setDate: function(){
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      console.log(this.widgetData.properties.timerStart , "->", Math.floor(this.widgetData.properties.timerStart/60) , "------" , this.widgetData.properties.timerStart%60);
      
      this.pickerValue =  new Date(year, month, day, 0,  Math.floor(this.widgetData.properties.timerStart/60), this.widgetData.properties.timerStart%60)
    },
    handleWidgetNameChange: function(evt) {
      console.log("handleWidgetNameChange -->", evt.target.value);
      this.widgetData.properties.widgetName = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handleChangeStyleType(evt) {
      console.log("handleChangeStyleType --> ", evt.target.value);
      this.widgetData.properties.styleType = evt.target.value;
      this.updateData();
    },

    handlePlayer1NameChange: function(evt) {
      console.log("handlePlayer1NameChange -->", evt.target.value);
      this.widgetData.properties.player1Name = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handleScore1Click: function(evt) {
      console.log("handleScore1Click -->", evt.target.value);
      this.widgetData.properties.score1 = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handlePlayer2NameChange: function(evt) {
      console.log("handlePlayer2NameChange --> ", evt.target.value);
      this.widgetData.properties.player2Name = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handleScore2Click: function(evt) {
      console.log("handleScore2Click --> ", evt.target.value);
      this.widgetData.properties.score2 = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handleAddScore1(_num) {
      console.log("handleAddScore1");
      if (this.widgetData.properties.score1 + _num <= this.maxScore) {
        this.widgetData.properties.score1 =
          this.widgetData.properties.score1 + _num;
        this.updateData();
      }
    },

    handleAddScore2(_num) {
      console.log("handleAddScore2");
      if (this.widgetData.properties.score2 + _num <= this.maxScore) {
        this.widgetData.properties.score2 =
          this.widgetData.properties.score2 + _num;
        this.updateData();
      }
    },

    handleSubScore1(_num) {
      console.log("handleSubScore1");
      if (this.widgetData.properties.score1 - _num >= this.minScore) {
        this.widgetData.properties.score1 =
          this.widgetData.properties.score1 - _num;
        this.updateData();
      }
    },

    handleSubScore2(_num) {
      if (this.widgetData.properties.score2 - _num >= this.minScore) {
        this.widgetData.properties.score2 =
          this.widgetData.properties.score2 - _num;
        this.updateData();
      }
    },

    onChangeCheckBox(isChecked) {
      this.widgetData.isGameClockEnabled = isChecked;
      this.updateData();
    },

    handleCountType: function(labelValue) {
      this.countTypeValue = labelValue;
      this.widgetData.properties.timerType = this.countTypeValue;
      this.updateData();
    },

    updateData() {
      console.log(
        "todo: update props data -> changeWidgetData ---> this.widgetData.properties --> ",
        this.widgetData.properties
      );
      this.$emit("changeWidgetData", this.widgetData);
    },

    handleTimerFormat: function(evt) {
      this.timerFormatValue = evt.target.value;
      this.widgetData.properties.timerFormat = this.timerFormatValue;
      this.setTimerInput();
      this.updateData();
    },

    handleTimerInput: function(data) {
      console.log("DATA PICKER", data);
      this.pickerValue = data;
      this.setTimerInput();
      this.updateData();
    },
    setTimerInput: function() {
      
      const date = this.pickerValue;
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      if (hours !== 0 || minutes !== 0 || seconds !== 0) {
        if (this.timerFormatValue === "HH:MM:SS") {
          this.timerInputValue = hours * 60 * 60 + minutes * 60 + seconds;
          this.timerInputFormat =
            this.addZero(hours) +
            ":" +
            this.addZero(minutes) +
            ":" +
            this.addZero(seconds);
        } else if (this.timerFormatValue === "MM:SS") {
          this.timerInputValue = minutes * 60 + seconds;
          this.timerInputFormat =
            this.addZero(minutes) + ":" + this.addZero(seconds);
        }
      } else {
        this.timerInputValue = 0;
        if (this.timerFormatValue === "HH:MM:SS") {
          this.timerInputFormat = "00:00:00";
        } else if (this.timerFormatValue === "MM:SS") {
          this.timerInputFormat = "00:00";
        }
      }
      //this.widgetData.properties.timerInput = this.timerInputFormat;
      this.widgetData.properties.timerStart = this.timerInputValue;
      this.widgetData.properties.timerInput = this.timerInputValue;
      this.updateData();
      
      console.log("mmmmmmmmmmm",this.widgetData.properties);
    },

    handleButtonClick: function(btnName) {
      let btnStart = document.getElementById("Start");
      let btnStop = document.getElementById("Stop");
      let btnReset = document.getElementById("Reset");
      let btn = document.getElementById(btnName);
      
      switch (btn.value) {
        case "Start":
          this.actionValue = "Start";
          //Change label Start to Resume
          btnStart.value = "Resume";
          btnStart.innerHTML = "Resume";
          //Disable Start/Resume button
          btnStart.disabled = true;
          btnStart.classList.remove("active");
          //Enable Stop button
          btnStop.disabled = false;
          btnStop.classList.add("active");
          //Disable Reset button
          btnReset.disabled = true;
          btnReset.classList.remove("active");
          break;
        case "Resume":
          this.actionValue = "Resume";
          //Disable Start/Resume button
          btnStart.disabled = true;
          btnStart.classList.remove("active");
          //Enable Stop button
          btnStop.disabled = false;
          btnStop.classList.add("active");
          //Disable Reset button
          btnReset.disabled = true;
          btnReset.classList.remove("active");
          break;
        case "Stop":
          this.actionValue = "Stop";
          //Disable Stop button
          btnStop.disabled = true;
          btnStop.classList.remove("active");
          //Enable Start/Resume button
          btnStart.disabled = false;
          btnStart.classList.add("active");
          //Enable Reset button
          btnReset.disabled = false;
          btnReset.classList.add("active");
          break;
        case "Reset":
          this.actionValue = "Reset";
          //Change label Resume to Start
          btnStart.value = "Start";
          btnStart.innerHTML = "Start";
          //Enable Start button
          btnStart.disabled = false;
          btnStart.classList.add("active");
          //Disable Stop button
          btnStop.disabled = true;
          btnStop.classList.remove("active");
          //Disable Reset button
          btnReset.disabled = true;
          btnReset.classList.remove("active");
          break;
        default:
      }
      
      this.widgetData.properties.action = this.actionValue;
      this.updateData();

    },

    addZero: function (val) {
      if (val < 10) {
        val = "0" + val;
      }
      return val;
    },
        
  },
};
</script>

<style scoped>
body {
  margin: 0;
  /*margin-top: 100px; /* simulating a header */
  font-family:Arial, Helvetica, sans-serif;
  background:#000;
}
.scoreBoardwidgetDark {
	position:absolute;
	width:15%;
	top:5%;
	left:5%;
}
.scoreBoardwidgetDark .teamScoreBoard {
	display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
	font-weight:bold;
	width:100%;
	font-size:3vw;
}
.scoreBoardwidgetDark .teamScoreBoard .teamName {
	background:#293d5a;
	color:#fff;
	width:75%;
	padding:4vw 2vw;
}
.scoreBoardwidgetDark .teamScoreBoard .teamName font {
	margin-left:.5vw;
}
.scoreBoardwidgetDark .teamScoreBoard .teamScore {
	background:#f3f3f3;
	color:#000;
	text-align:center;
	width:25%;
	padding:4vw .5vw;
}
.scoreBoardwidgetDark .gameClock {
	background: #842924;
    color: #fff;
    display: inline-block;
    padding: 3vw 1vw;
    font-size: 2.5vw;
    font-weight: bold;
}

.scoreBoardwidgetLight {
	position:absolute;
	width:15%;
	top:30%;
	left:5%;
}
.scoreBoardwidgetLight .teamScoreBoard {
	display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
	font-weight:bold;
	width:100%;
	font-size:3vw;
}
.scoreBoardwidgetLight .teamScoreBoard:nth-child(1) {
	margin-left:2vw;
}
.scoreBoardwidgetLight .teamScoreBoard .teamName {
	background-image: linear-gradient(#f4f3ec, #e7e4cc);
	color:#333333;
	width:70%;
	padding:4vw 2vw;
	position:relative;
	transform: skew(-12deg);
	margin-right:1vw;
}
.scoreBoardwidgetLight .teamScoreBoard .teamName font {
	transform: skew(12deg);
	display:inline-block;
	margin-left:1vw;
}
.scoreBoardwidgetLight .teamScoreBoard .teamScore {
	background-image: linear-gradient(#417d60, #204730);
	color:#fff;
	text-align:center;
	width:25%;
	padding: 4vw .5vw;
	transform: skew(-12deg);
}
.scoreBoardwidgetLight .teamScoreBoard .teamScore font {
	transform: skew(12deg);
	display:inline-block;
}
.scoreBoardwidgetLight .gameClock {
	background-image: linear-gradient(#7b6247, #4f2e0f);
	color:#fff;
	padding: 3vw 2vw;
    font-size: 2.5vw;
    font-weight: bold;
    transform: skew(-12deg);
    position: absolute;
    bottom: 0px;
    right: -10vw;
}
.scoreBoardwidgetLight .gameClock font{
	transform: skew(12deg);
	display:inline-block;
}
</style>

