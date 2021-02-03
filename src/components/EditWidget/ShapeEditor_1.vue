<template>
  <div class="text-editor">
    <div class="shape-widget">
      <div class="heading-overlay">Edit {{ getShapeName | capitalize }}</div>

      <div class="overlay-row">
        <div>
          <p class="subhead-overlay">Overlay name</p>
          <div class="txt-box">
            <input
              type="text"
              name="Rectangle"
              @input="handleWidgetNameChange"
              :value="widgetData.properties.widgetName"
            />
          </div>
          <div class="shape-w-h-sec">
            <div class="shape-w-h">
              <p class="subhead-overlay">Width</p>
              <div class="txt-box">
                <input
                  type="number"
                  @input="handleWidgeWidthChange"
                  v-model="widgetData.properties.width"
                />
              </div>
            </div>

            <div class="link-icon">
              <span v-on:click="lockHandler()">
                <img
                  v-if="widgetData.properties.isLock"
                  :src="require('@/assets/images/lock.jpg')"
                  alt
                />
                <img v-else :src="require('@/assets/images/unlock.jpg')" alt />
              </span>
            </div>

            <div class="shape-w-h">
              <p class="subhead-overlay">Height</p>
              <div class="txt-box">
                <input
                  type="number"
                  v-on:input="handleWidgeHeightChange"
                  v-model="widgetData.properties.height"
                  :disabled="widgetData.properties.isLock"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="overlay-row">
        <div class="fill shape-fill">
          <span>Fill</span>
          <div class="color-piker">
            <span class="color-piker-btn" v-on:click="isHidden = !isHidden" :style="{background:pikerButton}"></span>
          </div>
            <ColorPicker
              v-if="!isHidden"
              :gradient="gradient"
              :isGradient="true"
              :onStartChange="(color) => handleGradientColor(color, 'fill')"
              :onChange="(color) => handleGradientColor(color, 'fill')"
              :onEndChange="(color) => (e) => handleGradientColor(e, 'fill')"
            />
        </div>
        <p class="subhead-overlay">
          Border
          <span class="cus-elcheckbox">
            <el-checkbox
              v-model="widgetData.isTextBorderEnabled"
              @change="
                (evt) => handleChangeCheckBox(evt, 'isTextBorderEnabled')
              "
            ></el-checkbox>
          </span>
        </p>

        <div
          :class="widgetData.isTextBorderEnabled ? 'text-shadows' : 'text-shadows disabled-field'"
        >
          <div class="text-shadows-set">
            <span>
              <input
                type="number"
                min="0"
                step="0.1"
                name="border-Width"
                oninput="validity.valid||(value='');"
                :value="getBorderValue(0)"
                v-on:input="(e) => handleTextBorder(e, 'border-Width')"
                :disabled="!widgetData.isTextBorderEnabled"
              />

              <label>Width</label>
            </span>
            <div class="select position">
              <Dropdown
                name="position"
                :optionList="getpositionList"
                :selectedOption="getBorderValue(1)"
                @selectOption="
                  (e) => handleTextBorder(e, 'border-position')
                "
                :disabled="!widgetData.isTextBorderEnabled"
              />
              <label>Position</label>
            </div>
          </div>
          <div class="text-shadows-color">
            <div class="color-piker">
              <el-color-picker
                show-alpha
                color-format="hex"
                @active-change="(e) => handleTextBorder(e, 'border-color')"
                @change="(e) => handleTextBorder(e, 'border-color')"
                :disabled="!widgetData.isTextBorderEnabled"
                :value="getBorderValue(2)"
              ></el-color-picker>
            </div>
            <label>Color</label>
          </div>
        </div>

        <p class="subhead-overlay">
          Shadows
          <span class="cus-elcheckbox">
            <el-checkbox
              v-model="widgetData.isTextShadowEnabled"
              @change="
                (evt) => handleChangeCheckBox(evt, 'isTextShadowEnabled')
              "
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
                min="0"
                step="0.1"
                name="x"
                v-on:input="(e) => handleTextShadow(e, 0)"
                :disabled="!widgetData.isTextShadowEnabled"
                :value="getShadowValue(0)"
              />
              <label>x</label>
            </span>
            <span>
              <input
                type="number"
                min="0"
                step="0.1"
                name="y"
                v-on:input="(e) => handleTextShadow(e, 1)"
                :disabled="!widgetData.isTextShadowEnabled"
                :value="getShadowValue(1)"
              />
              <label>y</label>
            </span>
            <span>
              <input
                type="number"
                min="0"
                step="0.1"
                name="blur"
                v-on:input="(e) => handleTextShadow(e, 2)"
                :disabled="!widgetData.isTextShadowEnabled"
                :value="getShadowValue(2)"
              />
              <label>Blur</label>
            </span>
          </div>
          <div class="text-shadows-color">
            <div class="color-piker">
              <el-color-picker
                :show-clear="false"
                color-format="hex"
                show-alpha
                :disabled="!widgetData.isTextShadowEnabled"
                @active-change="(e) => handleTextShadow(e, 3)"
                @change="(e) => handleTextShadow(e, 3)"
                :value="getShadowValue(3)"
              ></el-color-picker>
            </div>
            <!-- </div> -->
            <label>Color</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Helper from '@/common/helper.js';
import Dropdown from '@/components/Dropdown';
import { ColorPicker } from 'vue-color-gradient-picker';

export default {
  name: 'ShapeEditor',

  components: {
    Dropdown,
    ColorPicker
  },
  props: {
    widgetData: Object
  },
  data() {
    return {
      positionList: [],
      pikerButton: 'linear-gradient(0deg, rgb(0, 0, 0) 0%, rgb(255, 0, 0) 100%)',
      isHidden: true,
      gradient: {
        type: 'linear',
        degree: 0,
        points: [
          {
            left: 0,
            red: 0,
            green: 0,
            blue: 0,
            alpha: 1
          },
          {
            left: 100,
            red: 255,
            green: 0,
            blue: 0,
            alpha: 1
          }
        ]
      }
    };
  },
  
  computed: {
    getShapeName: function() {
      return this.widgetData.name;
    },
    getpositionList: function() {
      let positionList;
      if (this.widgetData.name == 'rectangle') {
        positionList = ['outside', 'center', 'inside'];
      } else {
        positionList = ['center'];
      }
      return positionList;
    }
  },
  methods: {
    updateData() {
      this.$emit('changeWidgetData', this.widgetData);
    },
    handleWidgetNameChange: function(evt) {
      this.widgetData.properties.widgetName = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handleWidgeWidthChange: function (evt) {
      let value = evt.target.value;
      if(!value ){
        value = 1;
      }
      console.log("value --> ", value)
      if (this.widgetData.properties.isLock) {
        this.widgetData.properties.height = value;
      }      
      this.widgetData.properties.width = value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },

    handleWidgeHeightChange: function (evt) {
      let value = evt.target.value;
      if(!value){
        value = 1;
      }
      console.log("value --> ", value)
      if (this.widgetData.properties.isLock) {
        this.widgetData.properties.width = value;
      }      
      this.widgetData.properties.height = value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 500);
    },

    handleProperties(value, name) {
      if (this.widgetData.properties.isLock) {
        this.widgetData.properties.height = value;
      }
      this.widgetData.properties[name] = value;
      this.updateData();
    },
    handleGradientColor(color, name) {
      if (color.style !== null) {
        this.widgetData.properties[name] = color.style;
        this.pikerButton = color.style;
      }
      console.log(color);
      this.gradient = color;
      this.updateData();
    },
    handleColor(e, name) {
      let hexVal = null;
      if (e !== null) {
        hexVal = Helper.rgb2hex(e);
      } else {
        hexVal = 'transparent';
      }
      this.widgetData.properties[name]['color'] = hexVal;
      this.updateData();
    },
    handleBorderProperties(value, name) {
      if (value) {
        this.widgetData.properties.border[name] = value;
      }
      this.updateData();
    },
    handleChangeCheckBox(value, name) {
      if (value) {
        this.widgetData[name] = value;
      }
      this.updateData();
    },
    handleTextBorder(evt, name) {
      const { textBorder } = this.widgetData.properties;
      const txtBorderwArr = textBorder.split(' ');
      let w = txtBorderwArr[0];
      let position = txtBorderwArr[1];
      let color = txtBorderwArr[2];
      if (name == 'border-Width') {
        w = evt.target.value;
      } else if (name == 'border-position') {
        position = evt.target.value;
      } else if (name == 'border-color') {
        let hexVal = null;
        if (evt !== null) {
          hexVal = Helper.rgb2hex(evt);
        } else {
          hexVal = 'transparent';
        }
        color = hexVal;
      }
      this.widgetData.properties.textBorder = `${w} ${position} ${color}`;
      this.updateData();
    },
    getBorderValue(index) {
      return this.widgetData.properties.textBorder.split(' ')[index];
    },
    handleTextShadow(evt, name) {
      const { textShadows } = this.widgetData.properties;
      const txtShdwArr = textShadows.split(' ');
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
          hexVal = 'transparent';
        }
        color = hexVal;
      }
      this.widgetData.properties.textShadows = `${x} ${y} ${blur} ${color}`;
      this.updateData();
    },
    getShadowValue(index) {
      return this.widgetData.properties.textShadows.split(' ')[index];
    },
    lockHandler() {
      this.widgetData.properties.isLock = !this.widgetData.properties.isLock;
      this.widgetData.properties.height = this.widgetData.properties.width;
      this.updateData();
    }
  }
};
</script>

<style src="vue-color-gradient-picker/dist/index.css" lang="css" />

<style scoped>
.picker-box {
  display: block;
}
.picker-box-not {
  display: none;
}
</style>>
