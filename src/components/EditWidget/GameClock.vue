<template>
    <div class="overlay-row" >
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
            <el-radio label="down" :disabled="disableCountDown">Countdown</el-radio>
            <el-radio label="up" :disabled="disableCountUp">Countup</el-radio>
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
              :disabled="(widgetData.properties.action !==null && widgetData.properties.action !== 'Reset' ) ? true:false "
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
              :disabled="!actionName"
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
</template>

<script>

export default {
  name: "GameClock",
  
  props: {
    widgetData: Object,
    
  },
  created() {
    this.actionName = this.widgetData.properties.action;
    //this.setDate();
    this.setTimerValue();
    this.setTimerInput();
    
    //this.setTimerInput();
    this.toggleCountType(this.widgetData);
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
      disableCountDown:false,
      disableCountUp:false,
    
    };
  },
  methods: {
    toggleCountType:function(widgetObj){
      
      if ( widgetObj.properties.action ){
        if (  widgetObj.properties.action === 'Reset' ){
          this.disableCountDown = false;
          this.disableCountUp   = false;
          return;
        }
        this.disableCountUp   =  widgetObj.properties.timerType === 'up' ? false:true;
        this.disableCountDown = widgetObj.properties.timerType === 'down' ? false:true;
        
      }
      
    },
    setTimerValue(){
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();      
      
      let date =  new Date(year, month, day, 0,  Math.floor(this.widgetData.properties.timerStart/60), this.widgetData.properties.timerStart%60);
      this.pickerValue = date;
    },
    handleWidgetNameChange: function (evt) {
      this.widgetData.properties.widgetName = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },
    setDate: function(){
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();
      
      this.pickerValue =  new Date(year, month, day, 0,  Math.floor(this.widgetData.properties.timerStart/60), this.widgetData.properties.timerStart%60)
    },
    
    onChangeCheckBox(isChecked) {
     
      this.widgetData.properties.isGameClockEnabled = isChecked;
      this.widgetData.properties.timerFormat = 'MM:SS'
      this.updateData();
      console.log('CHANGE FORMAT',this.widgetData);
    },

    handleCountType: function(labelValue) {
      this.countTypeValue = labelValue;
      this.widgetData.properties.timerType = this.countTypeValue;
      this.updateData();
    },

    updateData() {
      this.$emit("changeWidgetData", this.widgetData);
       this.toggleCountType(this.widgetData);
      
    },

    handleTimerFormat: function(evt) {
      this.timerFormatValue = evt.target.value;
      this.widgetData.properties.timerFormat = this.timerFormatValue;
      this.setTimerInput();
      this.updateData();
    },

    handleTimerInput: function(data) {
     
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
          this.timerInputValue = hours*60*60 + minutes*60 + seconds;
          this.contentValue = this.addZero(hours) +':'+ this.addZero(minutes) +':'+ this.addZero(seconds);
        } else if (this.timerFormatValue === "MM:SS") {
          this.timerInputValue = minutes*60 + seconds;
          this.contentValue = this.addZero(minutes) +':'+ this.addZero(seconds);
        }
      } else{
        this.timerInputValue = 0;
        if (this.timerFormatValue === "HH:MM:SS") {
          this.contentValue = "00:00:00";
        } else if (this.timerFormatValue === "MM:SS") {
          this.contentValue = "00:00";
        }
      }
     
      this.widgetData.properties.content = this.contentValue;
      // this.widgetData.properties.timerInput = this.timerInputValue;
      this.widgetData.properties.timerStart = this.timerInputValue;
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

