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
                  v-on:input="
                    (evt) => handleProperties(evt.target.value, 'width')
                  "
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
                  name="Height"
                  v-on:input="
                    (evt) => handleProperties(evt.target.value, 'height')
                  "
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
            <span class="color-piker-btn" v-on:click="isHidden = !isHidden"></span>
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
                name="width"
                v-on:input="
                  (e) => handleBorderProperties(e.target.value, 'width')
                "
                v-model="widgetData.properties.border.width"
                :disabled="!widgetData.isTextBorderEnabled"
              />

              <label>Width</label>
            </span>
            <div class="select position">
              <Dropdown
                name="position"
                :optionList="getpositionList"
                :selectedOption="widgetData.properties.border.position"
                @selectOption="
                  (e) => handleBorderProperties(e.target.value, 'position')
                "
                :disabled="!widgetData.isTextBorderEnabled"
              />
              <label>Position</label>
            </div>
          </div>
          <div class="text-shadows-color">
            <div class="color-piker">
              <el-color-picker
                color-format="hex"
                @active-change="(e) => handleColor(e, 'border')"
                @change="(e) => handleColor(e, 'border')"
                v-model="widgetData.properties.border.color"
                :disabled="!widgetData.isTextBorderEnabled"
                show-alpha
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
                v-on:input="(e) => handleTextShadow(e.target.value, 'x')"
                :disabled="!widgetData.isTextShadowEnabled"
                v-model="widgetData.properties.shadows.x"
              />
              <label>x</label>
            </span>
            <span>
              <input
                type="number"
                name="y"
                v-on:input="(e) => handleTextShadow(e.target.value, 'y')"
                :disabled="!widgetData.isTextShadowEnabled"
                v-model="widgetData.properties.shadows.y"
              />
              <label>y</label>
            </span>
            <span>
              <input
                type="number"
                name="blur"
                v-on:input="(e) => handleTextShadow(e.target.value, 'blur')"
                :disabled="!widgetData.isTextShadowEnabled"
                v-model="widgetData.properties.shadows.blur"
              />
              <label>Blur</label>
            </span>
          </div>
          <div class="text-shadows-color">
            <!-- <div class="color-piker"> -->
            <!-- <input type="color" name="3" :value="getShadowValue(3)" v-on:input="handleTextShadow"/> -->
            <div class="color-piker">
              <el-color-picker
                :show-clear="false"
                color-format="hex"
                show-alpha
                :disabled="!widgetData.isTextShadowEnabled"
                @active-change="(e) => handleColor(e, 'shadows')"
                @change="(e) => handleColor(e, 'shadows')"
                v-model="widgetData.properties.shadows.color"
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
  created() {
    // this.widgetData.properties.shadows = {
    //   x: '',
    //   y: '',
    //   blur: '',
    //   color: ''
    // };
    // this.widgetData.properties.border = {
    //   width: '',
    //   position: '',
    //   color: ''
    // };
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
      }

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
    handleTextShadow(value, name) {
      if (value) {
        this.widgetData.properties.shadows[name] = value;
        this.updateData();
      }
    },
    getTextShadowValue(name) {
      return this.widgetData.properties.shadows[name] ? this.widgetData.properties.shadows[name] : '';
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
/* .ui-color-picker {
  
} */
</style>>
