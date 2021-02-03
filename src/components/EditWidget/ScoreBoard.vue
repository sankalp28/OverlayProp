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
          <input type="number"  @input="handleScoreOne" v-model="scoreOne" />
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
          <input type="number"  @input="handleScoreTwo" v-model="scoreTwo"   />
          <button @click="handleAddScore2(1)">+ 1</button
          ><button @click="handleAddScore2(2)">+ 2</button
          ><button @click="handleAddScore2(3)">+ 3</button>
        </div>
      </div>
      <div></div>
    </div>
    
    <GameClock 
    v-if="widgetData.properties.timerWidgetExists === false"
 :widgetData="widgetData" @changeWidgetData="updateData"/>
  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import GameClock from "@/components/EditWidget/GameClock";

export default {
  name: "ScoreBoard",
  components: { Dropdown,GameClock },
  props: {
    widgetData: Object,
  },
  
  created() {
    this.actionName = this.widgetData.properties.action;
    this.setDate();
    
    
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
      scoreOne: this.widgetData.properties.score1,
      scoreTwo: this.widgetData.properties.score2,
      
    };
  },
  watch:{
    scoreOne(newVal,lastVal){
     if ( parseInt(newVal) > 999 ){
        this.scoreOne = lastVal;
        this.handleScoreOne();
        
      }
    },
    scoreTwo(newVal,lastVal){
     if ( parseInt(newVal) > 999 ){
        this.scoreTwo = lastVal;
        this.handleScoreTwo();
        
      }
    }
  }
   ,
  methods: {
    handleScoreOne(){
     
        if ( isNaN(parseInt(this.scoreOne)) ){
          this.scoreOne = 0;
        }else if(parseInt(this.scoreOne) > 999 ){
          return false;
        }
        this.scoreOne = parseInt(this.scoreOne);
        this.widgetData.properties.score1 = parseInt(this.scoreOne);
        this.updateData();


    },
    handleScoreTwo(){
        if ( isNaN(parseInt(this.scoreTwo)) ){
          this.scoreTwo = 0;
        }else if(parseInt(this.scoreTwo) > 999 ){
          return false;
        }
        this.scoreTwo = parseInt(this.scoreTwo);
         this.widgetData.properties.score2 = parseInt(this.scoreTwo);
        this.updateData();
        
    },
    
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
      let playerName = evt.target.value.trim();
      playerName = playerName.substr(0,32);
      this.widgetData.properties.player1Name = playerName;

     


      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
      
    },

    handleScore1Click: function(evt) {
      this.widgetData.properties.score1 = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handlePlayer2NameChange: function(evt) {
      let playerName = evt.target.value.trim();
      playerName = playerName.substr(0,32);
      

      this.widgetData.properties.player2Name = playerName;
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
      if (this.widgetData.properties.score1 + _num <= this.maxScore) {
        this.widgetData.properties.score1 += parseInt(_num);
        this.scoreOne = this.widgetData.properties.score1;
        this.updateData();
      }
    },

    handleAddScore2(_num) {
      console.log("handleAddScore2");
      if (this.widgetData.properties.score2 + _num <= this.maxScore) {
        this.widgetData.properties.score2 =
          this.widgetData.properties.score2 + _num;
          this.scoreTwo = this.widgetData.properties.score2;
        this.updateData();
      }
    },

    handleSubScore1(_num) {
      console.log("handleSubScore1");
      if (this.widgetData.properties.score1 - _num >= this.minScore) {
        this.widgetData.properties.score1 =
          this.widgetData.properties.score1 - _num;
          this.scoreOne = this.widgetData.properties.score1;

        this.updateData();
      }
    },

    handleSubScore2(_num) {
      console.log("handleSubScore2");
      if (this.widgetData.properties.score2 - _num >= this.minScore) {
        this.widgetData.properties.score2 =
          this.widgetData.properties.score2 - _num;
          this.scoreTwo = this.widgetData.properties.score2;

        this.updateData();
      }
    },

    onChangeCheckBox(isChecked) {
      console.log("onChangeCheckBox");
      this.widgetData.properties.isGameClockEnabled = isChecked;
      this.updateData();
    },

    handleCountType: function(labelValue) {
      this.countTypeValue = labelValue;
      this.widgetData.properties.timerType = this.countTypeValue;
      this.updateData();
    },

    updateData() {
      this.$emit("changeWidgetData", this.widgetData);
    },

    
    
        
  },
};
</script>

