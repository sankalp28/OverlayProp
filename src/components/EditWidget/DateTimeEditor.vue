<template>
  <div class="text-editor">
    <div class="heading-overlay">Edit current date and time</div>
    <div class="overlay-row">
      <div>
        <p class="subhead-overlay">Overlay name</p>
        <div class="txt-box">
          <input type="text" name="OverlayName" @input="handleWidgetNameChange" :value="widgetData.properties.widgetName">
        </div>
      </div>
      <p class="subhead-overlay">Type</p>
      <div class="select">
        <Dropdown
          name="dateTimeType"
          :optionList="dateTimeTypeOptions"
          :selectedOption="getSelectedDateTimeType"
          @selectOption="handleDateTimeType"
        />
      </div>

      <div v-if="widgetData.properties.isDate">
        <p class="subhead-overlay">Date format</p>
        <div class="select">
          <Dropdown
            name="dateFormat"
            :optionList="dateFormatOptions"
            :selectedOption="widgetData.properties.dateFormat"
            @selectOption="handleDateFormat"
          />
        </div>
      </div>

      <div v-if="widgetData.properties.isTime">
        <p class="subhead-overlay">Time format</p>
        <div class="select">
          <Dropdown
            name="timeFormat"
            :optionList="timeFormatOptions"
            :selectedOption="widgetData.properties.timeFormat"
            @selectOption="handleTimeFormat"
          />
        </div>
      </div>

      <p class="subhead-overlay">Time zone</p>
      <div class="select">
        <Dropdown
          name="timeZone"
          :optionList="timeZoneOptions"
          :selectedOption="getSelectedTimeZone"
          @selectOption="handletimeZone"
        />
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
  timeZoneArray
} from "@/assets/preview.js";
import Helper from "@/common/helper.js";

export default {
  name: "DateTimeEditor",
  components: {
    Dropdown,
  },
  props: {
    widgetData: Object,
  },
  data: function () {
    return {
      fontFamilyList: [],
      fontWeightList: [],
      fontSizeList: [],
      timeZoneOptions: [],
      isTextShadowChecked: false,
      debounceTimeOut: 0,
      isDate: true,
      isTime: true,
      dateTimeTypeOptions: ["Date and time", "Date only", "Time only"],
      dateFormatOptions: ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY/MM/DD"],
      timeFormatOptions: ["HH:mm:ss", "HH:mm", "HH:mm:ss tt", "HH:mm tt"],
      dateFormatValue: "MM/DD/YYYY",
      timeFormatValue: "HH:mm:ss",
      timeZoneValue: "Local",
      textShadowColor:null,
      textBorderColor:null
    };
  },
  created() {
    this.fontFamilyList = fontFamilyArray;
    this.fontWeightList = fontWeightArray;
    this.fontSizeList = fontSizeArray();
    this.timeZoneOptions = timeZoneArray;
    this.isTextShadowChecked = this.widgetData.isTextShadowEnabled;
    if(!this.widgetData.properties.content){
      this.getDateTime();
    }
    this.textShadowColor = this.widgetData.properties.textShadows.split(" ")[3];
    this.textBorderColor = this.widgetData.properties.textBorder.split(" ")[2];
    
  },

  computed: {
    getSelectedDateTimeType: function(){
      let dateType;
      if (this.widgetData.properties.isDate && this.widgetData.properties.isTime) {
        dateType = this.dateTimeTypeOptions[0];
      } else if (this.widgetData.properties.isDate) {
        dateType = this.dateTimeTypeOptions[1];
      } else if (this.widgetData.properties.isTime) {
        dateType = this.dateTimeTypeOptions[2];
      }
        return dateType;
    },
    getSelectedTimeZone: function(){
      let timeZone;
      if (this.widgetData.properties.timeZone === "Local") {
        timeZone = this.timeZoneOptions[0];
      } else if (this.widgetData.properties.timeZone === "Pacific/Kiritimati") {
        timeZone = this.timeZoneOptions[1];
      } else if (this.widgetData.properties.timeZone === "Pacific/Chatham") {
        timeZone = this.timeZoneOptions[2];
      } else if (this.widgetData.properties.timeZone === "Pacific/Auckland") {
        timeZone = this.timeZoneOptions[3];
      } else if (this.widgetData.properties.timeZone === "Asia/Anadyr") {
        timeZone = this.timeZoneOptions[4];
      } else if (this.widgetData.properties.timeZone === "Australia/Melbourne") {
        timeZone = this.timeZoneOptions[5];
      } else if (this.widgetData.properties.timeZone === "Australia/Adelaide") {
        timeZone = this.timeZoneOptions[6];
      } else if (this.widgetData.properties.timeZone === "Australia/Brisbane") {
        timeZone = this.timeZoneOptions[7];
      } else if (this.widgetData.properties.timeZone === "Australia/Darwin") {
        timeZone = this.timeZoneOptions[8];
      } else if (this.widgetData.properties.timeZone === "Asia/Tokyo") {
        timeZone = this.timeZoneOptions[9];
      } else if (this.widgetData.properties.timeZone === "Australia/Eucla") {
        timeZone = this.timeZoneOptions[10];
      } else if (this.widgetData.properties.timeZone === "Asia/Shanghai") {
        timeZone = this.timeZoneOptions[11];
      } else if (this.widgetData.properties.timeZone === "Asia/Jakarta") {
        timeZone = this.timeZoneOptions[12];
      } else if (this.widgetData.properties.timeZone === "Asia/Yangon") {
        timeZone = this.timeZoneOptions[13];
      } else if (this.widgetData.properties.timeZone === "Asia/Dhaka") {
        timeZone = this.timeZoneOptions[14];
      } else if (this.widgetData.properties.timeZone === "Asia/Kathmandu") {
        timeZone = this.timeZoneOptions[15];
      } else if (this.widgetData.properties.timeZone === "Asia/Kolkata") {
        timeZone = this.timeZoneOptions[16];
      } else if (this.widgetData.properties.timeZone === "Asia/Tashkent") {
        timeZone = this.timeZoneOptions[17];
      } else if (this.widgetData.properties.timeZone === "Asia/Tehran") {
        timeZone = this.timeZoneOptions[18];
      } else if (this.widgetData.properties.timeZone === "Asia/Dubai") {
        timeZone = this.timeZoneOptions[19];
      } else if (this.widgetData.properties.timeZone === "Europe/Moscow") {
        timeZone = this.timeZoneOptions[20];
      } else if (this.widgetData.properties.timeZone === "Africa/Cairo") {
        timeZone = this.timeZoneOptions[21];
      } else if (this.widgetData.properties.timeZone === "Europe/Brussels") {
        timeZone = this.timeZoneOptions[22];
      } else if (this.widgetData.properties.timeZone === "Europe/London") {
        timeZone = this.timeZoneOptions[23];
      } else if (this.widgetData.properties.timeZone === "Etc/GMT-1") {
        timeZone = this.timeZoneOptions[24];
      } else if (this.widgetData.properties.timeZone === "Etc/GMT-2") {
        timeZone = this.timeZoneOptions[25];
      } else if (this.widgetData.properties.timeZone === "America/St_Johns") {
        timeZone = this.timeZoneOptions[26];
      } else if (this.widgetData.properties.timeZone === "America/Argentina/Buenos_Aires") {
        timeZone = this.timeZoneOptions[27];
      } else if (this.widgetData.properties.timeZone === "America/New_York") {
        timeZone = this.timeZoneOptions[28];
      } else if (this.widgetData.properties.timeZone === "America/Chicago") {
        timeZone = this.timeZoneOptions[29];
      } else if (this.widgetData.properties.timeZone === "America/Mexico_City") {
        timeZone = this.timeZoneOptions[30];
      } else if (this.widgetData.properties.timeZone === "America/Los_Angeles") {
        timeZone = this.timeZoneOptions[31];
      } else if (this.widgetData.properties.timeZone === "America/Anchorage") {
        timeZone = this.timeZoneOptions[32];
      } else if (this.widgetData.properties.timeZone === "America/Adak") {
        timeZone = this.timeZoneOptions[33];
      } else if (this.widgetData.properties.timeZone === "Pacific/Marquesas") {
        timeZone = this.timeZoneOptions[34];
      } else if (this.widgetData.properties.timeZone === "Pacific/Honolulu") {
        timeZone = this.timeZoneOptions[35];
      } else if (this.widgetData.properties.timeZone === "Pacific/Niue") {
        timeZone = this.timeZoneOptions[36];
      } else if (this.widgetData.properties.timeZone === "Etc/GMT-12") {
        timeZone = this.timeZoneOptions[37];
      }
      console.log("getSelectedTimeZone --> this.widgetData.properties.timeZone --> ", this.widgetData.properties.timeZone);
      console.log("getSelectedTimeZone --> timeZone --> ", timeZone);
      return timeZone;
    },
  },

  methods: {
    handleWidgetNameChange: function (evt) {
      this.widgetData.properties.widgetName = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },
    updateData: function () {
      this.widgetData.properties.isDate = this.isDate;
      this.widgetData.properties.isTime = this.isTime;
      this.widgetData.properties.dateFormat = this.dateFormatValue;
      this.widgetData.properties.timeFormat = this.timeFormatValue;
      this.widgetData.properties.timeZone = this.timeZoneValue;
      this.getDateTime();
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
    handleDateTimeType: function (evt) {
      if (evt.target.value === "Date only") {
        this.isDate = true;
        this.isTime = false;
      } else if (evt.target.value === "Time only") {
        this.isDate = false;
        this.isTime = true;
      } else {
        this.isDate = true;
        this.isTime = true;
      }
      this.updateData();
    },
    handleDateFormat: function (evt) {
      this.dateFormatValue = evt.target.value;
      this.updateData();
    },
    handleTimeFormat: function (evt) {
      this.timeFormatValue = evt.target.value;
      this.updateData();
    },
    handletimeZone: function (evt) {
      let selectedTimeZone = evt.target.value;
      if (selectedTimeZone === "Local") {
        this.timeZoneValue = "Local";
      } else if (selectedTimeZone === "GMT +14 LINT Kiritimati") {
        this.timeZoneValue = "Pacific/Kiritimati";
      } else if (selectedTimeZone === "GMT +13:45 CHADAT Chatham Island") {
        this.timeZoneValue = "Pacific/Chatham";
      } else if (selectedTimeZone === "GMT +13 NZDT Auckland") {
        this.timeZoneValue = "Pacific/Auckland";
      } else if (selectedTimeZone === "GMT +12 ANAT Anadyr") {
        this.timeZoneValue = "Asia/Anadyr";
      } else if (selectedTimeZone === "GMT +11 AEDT Melbourne") {
        this.timeZoneValue = "Australia/Melbourne";
      } else if (selectedTimeZone === "GMT +10:30 ACDT Adelaide") {
        this.timeZoneValue = "Australia/Adelaide";
      } else if (selectedTimeZone === "GMT +10 AEST Brisbane") {
        this.timeZoneValue = "Australia/Brisbane";
      } else if (selectedTimeZone === "GMT +9:30 ACST Darwin") {
        this.timeZoneValue = "Australia/Darwin";
      } else if (selectedTimeZone === "GMT +9 JST Tokyo") {
        this.timeZoneValue = "Asia/Tokyo";
      } else if (selectedTimeZone === "GMT +8:45 ACWST Eucla") {
        this.timeZoneValue = "Australia/Eucla";
      } else if (selectedTimeZone === "GMT +8 CST Beijing") {
        this.timeZoneValue = "Asia/Shanghai";
      } else if (selectedTimeZone === "GMT +7 WIB Jakarta") {
        this.timeZoneValue = "Asia/Jakarta";
      } else if (selectedTimeZone === "GMT +6:30 MMT Yangon") {
        this.timeZoneValue = "Asia/Yangon";
      } else if (selectedTimeZone === "GMT +6 BST Dhaka") {
        this.timeZoneValue = "Asia/Dhaka";
      } else if (selectedTimeZone === "GMT +5:45 NPT Kathmandu") {
        this.timeZoneValue = "Asia/Kathmandu";
      } else if (selectedTimeZone === "GMT +5:30 IST New Delhi") {
        this.timeZoneValue = "Asia/Kolkata";
      } else if (selectedTimeZone === "GMT +5 UZT Tashkent") {
        this.timeZoneValue = "Asia/Tashkent";
      } else if (selectedTimeZone === "GMT +4:30 IRDT Tehran") {
        this.timeZoneValue = "Asia/Tehran";
      } else if (selectedTimeZone === "GMT +4 GST Dubai") {
        this.timeZoneValue = "Asia/Dubai";
      } else if (selectedTimeZone === "GMT +3 MSK Moscow") {
        this.timeZoneValue = "Europe/Moscow";
      } else if (selectedTimeZone === "GMT +2 EET Cairo") {
        this.timeZoneValue = "Africa/Cairo";
      } else if (selectedTimeZone === "GMT +1 CET Brussels") {
        this.timeZoneValue = "Europe/Brussels";
      } else if (selectedTimeZone === "GMT +0 GMT London") {
        this.timeZoneValue = "Europe/London";
      } else if (selectedTimeZone === "GMT -1 CVT Praia") {
        this.timeZoneValue = "Etc/GMT-1";
      } else if (selectedTimeZone === "GMT -2 GST King Edward Point") {
        this.timeZoneValue = "Etc/GMT-2";
      } else if (selectedTimeZone === "GMT -2:30 DNT St. John's") {
        this.timeZoneValue = "America/St_Johns";
      } else if (selectedTimeZone === "GMT -3 ART Buenos Aires") {
        this.timeZoneValue = "America/Argentina/Buenos_Aires";
      } else if (selectedTimeZone === "GMT -4 EDT New Yark") {
        this.timeZoneValue = "America/New_York";
      } else if (selectedTimeZone === "GMT -5 CDT Chicago") {
        this.timeZoneValue = "America/Chicago";
      } else if (selectedTimeZone === "GMT -6 CST Mexico City") {
        this.timeZoneValue = "America/Mexico_City";
      } else if (selectedTimeZone === "GMT -7 Los Angeles") {
        this.timeZoneValue = "America/Los_Angeles";
      } else if (selectedTimeZone === "GMT -8 AKDT Anchorage") {
        this.timeZoneValue = "America/Anchorage";
      } else if (selectedTimeZone === "GMT -9 HDT Adak") {
        this.timeZoneValue = "America/Adak";
      } else if (selectedTimeZone === "GMT -9:30 MART Taiohae") {
        this.timeZoneValue = "Pacific/Marquesas";
      } else if (selectedTimeZone === "GMT -10 HST Honolulu") {
        this.timeZoneValue = "Pacific/Honolulu";
      } else if (selectedTimeZone === "GMT -11 NUT Alofi") {
        // this.timeZoneValue = "Etc/GMT-11";
        this.timeZoneValue = "Pacific/Niue";
      } else if (selectedTimeZone === "GMT -12 AoE Baker Island") {
        this.timeZoneValue = "Etc/GMT-12";
      }
      console.log("handletimeZone --> this.timeZoneValue --> ", this.timeZoneValue);
      this.updateData();
    },
    getDateTime: function () {
      let resultDate;
      if (this.widgetData.properties.isDate && this.widgetData.properties.isTime) {
        resultDate = this.getDateOnly() + " " + this.getTimeOnly();
      } else if (this.widgetData.properties.isDate) {
        resultDate = this.getDateOnly();
      } else if (this.widgetData.properties.isTime) {
        resultDate = this.getTimeOnly();
      }
      this.widgetData.properties.content = resultDate;
    },
    getDateOnly: function () {
      const currentDateTime = new Date();
      let currentDateZone;
      if (this.timeZoneValue === "Local") {
        currentDateZone = currentDateTime;
      } else {
        currentDateZone = new Date(
          currentDateTime.toLocaleString("en-US", { timeZone: this.widgetData.properties.timeZone })
        );
      }
      const date = this.addZero(currentDateZone.getDate());
      const month = this.addZero(currentDateZone.getMonth() + 1);
      const year = currentDateZone.getFullYear();
      let resultDate;
      if (this.widgetData.properties.dateFormat === "MM/DD/YYYY") {
        resultDate = month + "/" + date + "/" + year;
      } else if (this.widgetData.properties.dateFormat === "DD/MM/YYYY") {
        resultDate = date + "/" + month + "/" + year;
      } else if (this.widgetData.properties.dateFormat === "YYYY/MM/DD") {
        resultDate = year + "/" + month + "/" + date;
      }
      return resultDate;
    },
    getTimeOnly: function () {
      const currentDateTime = new Date();
      let currentTimeZone;
      if (this.timeZoneValue === "Local") {
        currentTimeZone = currentDateTime;
      } else {
        currentTimeZone = new Date(
          currentDateTime.toLocaleString("en-US", { timeZone: this.widgetData.properties.timeZone })
        );
      }
      const hour = this.addZero(currentTimeZone.getHours());
      const minute = this.addZero(currentTimeZone.getMinutes());
      const second = this.addZero(currentTimeZone.getSeconds());
      let time;
      if (this.widgetData.properties.timeFormat === "HH:mm:ss") {
        time = hour + ":" + minute + ":" + second;
      } else if (this.widgetData.properties.timeFormat === "HH:mm") {
        time = hour + ":" + minute;
      } else if (this.widgetData.properties.timeFormat === "HH:mm:ss tt") {
        time =
          (currentTimeZone.getHours() > 12
            ? this.addZero(currentTimeZone.getHours() - 12)
            : hour) +
          ":" +
          minute +
          ":" +
          second +
          " " +
          (currentTimeZone.getHours() >= 12 ? "PM" : "AM");
      } else if (this.widgetData.properties.timeFormat === "HH:mm tt") {
        time =
          (currentTimeZone.getHours() > 12
            ? this.addZero(currentTimeZone.getHours() - 12)
            : hour) +
          ":" +
          minute +
          " " +
          (currentTimeZone.getHours() >= 12 ? "PM" : "AM");
      }
      return time;
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
