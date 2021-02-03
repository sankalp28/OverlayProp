<template>
  <div class="text-editor">
    <div class="heading-overlay">Edit timer</div>

    <div class="overlay-row">
      <div>
        <p class="subhead-overlay">Overlay name</p>
        <div class="txt-box">
          <input type="text" name="OverlayName" @input="handleWidgetNameChange" :value="widgetData.properties.widgetName">
        </div>
      </div>
      <p class="subhead-overlay">Format</p>
      <div class="select">
        <Dropdown
          name="timerFormat"
          :optionList="timerFormatOptions"
          :selectedOption="timerFormatValue"
          @selectOption="handleTimerFormat"
        />
      </div>
      <p class="subhead-overlay">Type</p>
      <el-radio-group v-model="widgetData.properties.timerType" class="radio-btn" @change="handleCountType">
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
          id="Start" :class="getClassForStartResume" @click="handleButtonClick('Start')" :value="getTextForStart">
          {{getTextForStart}}
        </button>
        <button id="Stop" :class="getClassForStop" @click="handleButtonClick('Stop')" :disabled="!actionName" value="Stop">Stop</button>
        <button :class="getClassForReset" id="Reset" @click="handleButtonClick('Reset')" value="Reset">Reset</button>
      </div>
    </div>

    <div class="overlay-row">
      <p class="subhead-overlay">Typography</p>
      <div class="select">
        <Dropdown
          name="fontType"
          :optionList="fontFamilyList"
          :selectedOption="widgetData.properties.fontType"
          @selectOption="handleChangeColor"
        />
      </div>

      <div class="font-size-details">
        <div class="select font">
          <Dropdown
            name="fontStyle"
            :optionList="fontWeightList"
            :selectedOption="widgetData.properties.fontStyle"
            @selectOption="handleChangeColor"
          />
        </div>

        <div class="select size">
          <Dropdown
            name="fontSize"
            :optionList="fontSizeList"
            :selectedOption="widgetData.properties.fontSize"
            @selectOption="handleChangeColor"
          />
        </div>
        <div class="color-piker">
          <el-color-picker
            @change="(e) => handleColor(e, 'fontColor')"
            v-model="widgetData.properties.fontColor"
            color-format="hex"
            @active-change="(e) => handleColor(e, 'fontColor')"
            show-alpha
          ></el-color-picker>
        </div>
      </div>
      <p class="subhead-overlay">
        Text-shadows
        <span class="cus-elcheckbox">
          <el-checkbox
            v-model="widgetData.isTextShadowEnabled"
            @change="(evt) => onChangeCheckBox(evt, 'TXT_SHADOW')"
          ></el-checkbox>
        </span>
      </p>
      <div
        :class="
          widgetData.isTextShadowEnabled
            ? 'text-shadows'
            : 'text-shadows disabled-field'
        "
      >
        <div class="text-shadows-set">
          <span>
            <input
              type="number"
              name="0"
              step="0.1"
              oninput="validity.valid||(value='');"
              :value="getShadowValue(0)"
              v-on:input="(e) => handleTextShadow(e, 0)"
            />
            <label>x</label>
          </span>
          <span>
            <input
              type="number"
              name="1"
              step="0.1"
              oninput="validity.valid||(value='');"
              :value="getShadowValue(1)"
              v-on:input="(e) => handleTextShadow(e, 1)"
            />
            <label>y</label>
          </span>
          <span>
            <input
              type="number"
              name="2"
              step="0.1"
              oninput="validity.valid||(value='');"
              :value="getShadowValue(2)"
              v-on:input="(e) => handleTextShadow(e, 2)"
            />
            <label>Blur</label>
          </span>
        </div>
        <div class="text-shadows-color">
          <div class="color-piker">
            <el-color-picker
              :show-clear="false"
              v-model="textShadowColor"
              color-format="hex"
              @active-change="(e) => handleTextShadow(e, '3')"
              show-alpha
              :disabled="!widgetData.isTextShadowEnabled"
              @change="(e) => handleTextShadow(e, '3')"
            >
            </el-color-picker>
          </div>
          <label>Color</label>
        </div>
      </div>

      <p class="subhead-overlay">
        Text-border
        <span class="cus-elcheckbox">
          <el-checkbox
            v-model="widgetData.isTextBorderEnabled"
            @change="(evt) => onChangeCheckBox(evt, 'TXT_BORDER')"
          ></el-checkbox>
        </span>
      </p>
      <div class="text-shadows text-border">
        <div
          :class="
            widgetData.isTextBorderEnabled
              ? 'text-shadows-set'
              : 'text-shadows-set disabled-field'
          "
        >
          <span>
            <input
              type="number"
              step="0.1"
              max="5"
              name="border-Width"
              oninput="validity.valid||(value='');"
              :value="getBorderValue('border-Width')"
              v-on:input="(e) => handleTextBorder(e, 'border-Width')"
            />
            <label>width</label>
          </span>
        </div>
        <div class="text-shadows-color">
          <div class="color-piker">
            <div class="color-piker">
              <el-color-picker
                v-model="textBorderColor"
                color-format="hex"
                @active-change="(e) => handleTextBorder(e, 'border-color')"
                show-alpha
                :disabled="!widgetData.isTextBorderEnabled"
                @change="(e) => handleTextBorder(e, 'border-color')"
              >
              </el-color-picker>
            </div>
          </div>
          <label>Color</label>
        </div>
      </div>
    </div>

    <div class="overlay-row">
      <div class="fill">
        <span>Fill</span>
        <div class="color-piker">
          <el-color-picker
            @change="(e) => handleColor(e, 'paddingFill')"
            v-model="widgetData.properties.paddingFill"
            color-format="hex"
            @active-change="(e) => handleColor(e, 'paddingFill')"
            show-alpha
          ></el-color-picker>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Dropdown from "@/components/Dropdown";
import {
  fontFamilyArray,
  fontWeightArray,
  fontSizeArray,
} from "@/assets/preview.js";
import Helper from "@/common/helper.js";

export default {
  name: "TimerEditor",
  components: {
    Dropdown,
  },
  props: {
    widgetData: Object,
  },

  data () {
    return {
      fontFamilyList: [],
      fontWeightList: [],
      fontSizeList: [],
      isTextShadowChecked: false,
      debounceTimeOut: 0,
      timerFormatOptions: ["HH:MM:SS", "MM:SS"],
      timerFormatValue: this.widgetData.properties.timerFormat,
      countTypeValue: 'down',
      actionValue: '',
      pickerValue: new Date(0, 0, 0, 0),
      //pickerFormat: "HH:mm:ss",
      timerInputValue: 0,
      actionName: null,
      contentValue: '',
      textShadowColor:null,
      textBorderColor:null
    };
  },

  created() {
    this.fontFamilyList = fontFamilyArray;
    this.fontWeightList = fontWeightArray;
    this.fontSizeList = fontSizeArray();
    this.isTextShadowChecked = this.widgetData.isTextShadowEnabled;
    this.actionName = this.widgetData.properties.action;
    this.setTimerValue();
    this.setTimerInput();
    this.textShadowColor = this.widgetData.properties.textShadows.split(" ")[3];
    this.textBorderColor = this.widgetData.properties.textBorder.split(" ")[2];
    
    
    
  },

  computed: {
   getClassForStartResume: function() {
     return (this.actionName === null || this.actionName === 'Stop' || this.actionName === 'Reset') ? 'active' : '';
   },
   getClassForStop: function() {
    
    return (this.actionName === 'Start' || this.actionName === 'Resume') ? 'active' : 'disabled';
   },
   getClassForReset: function() {
     return this.actionName === 'Stop' ? 'active' : '';
   },
   getTextForStart: function() {
     return (this.actionName === 'Start' || this.actionName === 'Stop') ? 'Resume' : 'Start';
   },
   getTimerFormat: function() {
    return this.timerFormatValue === "MM:SS" ? "mm:ss" : "HH:mm:ss";
   }
  },

  methods: {
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
    updateData: function () {
      this.$emit("changeWidgetData", this.widgetData);
    },
    handleColor: function (e, name) {
      let hexVal = null;
      if (e !== null) {
        hexVal = Helper.rgb2hex(e);
      }
      this.widgetData.properties[name] = hexVal;
      this.updateData();
    },
    handleChangeColor: function (evt) {
      this.widgetData.properties[evt.target.name] = evt.target.value;
      if (evt.target.name === "paddingValue") {
        clearTimeout(this.debounceTimeOut);
        this.debounceTimeOut = setTimeout(() => {
          this.updateData();
        }, 200);
      } else {
        this.updateData();
      }
    },
    handleTextShadow: function (evt, name) {
      const { textShadows } = this.widgetData.properties;
      const txtShdwArr = textShadows.split(" ");
      let x = txtShdwArr[0];
      let y = txtShdwArr[1];
      let blur = txtShdwArr[2];
      let color = txtShdwArr[3];
      if (name == 0) {
        x = evt.target.value;
      } else if (name == 1) {
        y = evt.target.value;
      } else if (name == 2) {
        blur = evt.target.value;
      } else if (name == 3) {
        let hexVal = null;
        if (evt !== null) {
          hexVal = Helper.rgb2hex(evt);
        } else {
          hexVal = "transparent";
        }
        color = hexVal;
      }
      this.widgetData.properties.textShadows = `${x} ${y} ${blur} ${color}`;
      this.updateData();
    },
    getShadowValue: function (index) {
      return this.widgetData.properties.textShadows.split(" ")[index];
    },
    getBorderValue: function (name) {
      if (name == "border-Width") {
        return this.widgetData.properties.textBorder.split(" ")[0];
      } else if (name == "border-color") {
        return this.widgetData.properties.textBorder.split(" ")[2];
      }
    },
    handleTextBorder: function (evt, name) {
      const { textBorder } = this.widgetData.properties;
      const txtBorderwArr = textBorder.split(" ");
      let w = txtBorderwArr[0];
      let color = txtBorderwArr[2];
      if (name == "border-Width") {
        w = evt.target.value;
      } else if (name == "border-color") {
        let hexVal = "transparent";
        if (evt !== null) {
          hexVal = Helper.rgb2hex(evt);
        }
        color = hexVal;
      }
      this.widgetData.properties.textBorder = `${w} solid ${color}`;
      this.updateData();
    },
    onChangeCheckBox: function (isChecked, name) {
      if (name === "TXT_SHADOW") {
        this.widgetData.isTextShadowEnabled = isChecked;
      } else if (name === "TXT_BORDER") {
        this.widgetData.isTextBorderEnabled = isChecked;
      }
      this.updateData();
    },
    handleTimerFormat: function (evt) {
      this.timerFormatValue = evt.target.value;
      this.widgetData.properties.timerFormat = this.timerFormatValue;
      this.setTimerInput();
      this.updateData();
    },
    handleCountType: function(labelValue){
      this.countTypeValue = labelValue;
      this.widgetData.properties.timerType = this.countTypeValue;
      this.updateData();
      
    },
    handleButtonClick: function(btnName) {
      let btnStart = document.getElementById('Start');
      let btnStop = document.getElementById('Stop');
      let btnReset = document.getElementById('Reset');
      let btn = document.getElementById(btnName);
  
      /* if the timer input value or selected timer value is zero and timer type is down 
      //then dont start the timer because it will show some negative value */
      if ( this.widgetData.properties.timerType === 'down' && this.timerInputValue <= 0 ){
        //return false;
      }
      switch(btn.value) {
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
      //console.log("Button Click : ", this.actionValue);
      this.widgetData.properties.action = this.actionValue;
       
      this.updateData();
    },
    handleTimerInput: function(data) {
      console.log("DATA PICKER",data);
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

</style>
