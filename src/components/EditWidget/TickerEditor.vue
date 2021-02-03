<template>
  <div class="text-editor">
    <div class="heading-overlay">Edit Text Ticker</div>
    <div class="overlay-row">
      <div>
        <p class="subhead-overlay">Overlay name</p>
        <div class="txt-box">
          <input type="text" name="OverlayName" @input="handleWidgetNameChange" :value="widgetData.properties.widgetName">
        </div>
      </div>
      <p class="subhead-overlay">Content</p>
      <textarea rows="4" draggable="false" @input="handleTextChange" @focus="$event.target.select()" :value="widgetData.properties.content">
       Please input text here
      </textarea>
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
          <!-- <select>
            <option>24</option>
          </select> -->
        </div>
        <!-- <div class="color-piker"> -->
          <!-- <input type="color" name="fontColor" :value="widgetData.properties.fontColor" v-on:input="handleChangeColor"/> -->
          <div class="color-piker"> <el-color-picker v-model="widgetData.properties.fontColor" color-format="hex" @active-change="(e)=>handleColor(e,'fontColor')" @change="(e)=>handleColor(e,'fontColor')" show-alpha></el-color-picker></div>

        <!-- </div> -->
      </div>
      <p class="subhead-overlay">
        Text-shadows
        <span class="cus-elcheckbox"> 
          <el-checkbox  v-model="widgetData.isTextShadowEnabled" @change="(evt)=> onChangeCheckBox(evt,'TXT_SHADOW')"></el-checkbox>
        </span>
      </p>
      <div :class="widgetData.isTextShadowEnabled? 'text-shadows' : 'text-shadows disabled-field'">
        <div class="text-shadows-set">
          <span>
            <input type="number" name="0" step="0.1" :value="getShadowValue(0)" v-on:input="(e)=>handleTextShadow(e,0)"/>
            <label>x</label>
          </span>
          <span>
            <input type="number" name="1" step="0.1" :value="getShadowValue(1)" v-on:input="(e)=>handleTextShadow(e,1)"/>
            <label>y</label>
          </span>
          <span>
            <input type="number" name="2" step="0.1" :value="getShadowValue(2)" v-on:input="(e)=>handleTextShadow(e,2)"/>
            <label>Blur</label>
          </span>
        </div>
        <div class="text-shadows-color">
          <!-- <div class="color-piker"> -->
            <!-- <input type="color" name="3" :value="getShadowValue(3)" v-on:input="handleTextShadow"/> -->
             <div class="color-piker"><el-color-picker 
              v-model="textShadowColor" 
              color-format="hex" 
              @active-change="(e)=>handleTextShadow(e,'3')" 
              show-alpha
              :disabled="!widgetData.isTextShadowEnabled"
              @change="(e)=>handleTextShadow(e,'3')">
            </el-color-picker></div>
          <!-- </div> -->
          <label>Color</label>
        </div>
      </div>

      <p class="subhead-overlay">
        Text-border
        <span class="cus-elcheckbox">
          <el-checkbox v-model="widgetData.isTextBorderEnabled" @change="(evt)=> onChangeCheckBox(evt,'TXT_BORDER')"></el-checkbox>
        </span>
      </p>
      <div class="text-shadows text-border">
        <div class="text-shadows-set">
          <span>
            <input type="number" name="border-Width" step="0.1" oninput="validity.valid||(value='');" :value="getBorderValue('border-Width')" v-on:input="(e)=>handleTextBorder(e,'border-Width')" />
            <label>width</label>
          </span>
        </div>
        <div class="text-shadows-color">
          <div class="color-piker">
            <!-- <input type="color" name="border-color" :value="getBorderValue('border-color')" v-on:input="handleTextBorder" /> -->
            <div class="color-piker"> <el-color-picker 
              v-model="textBorderColor" 
              color-format="hex"
              @active-change="(e)=>handleTextBorder(e,'border-color')" 
              show-alpha
              :disabled="!widgetData.isTextBorderEnabled"
              @change="(e)=>handleTextBorder(e,'border-color')"
              >
            </el-color-picker>
           </div>
          </div>
          <label>Color</label>
        </div>
      </div>
    </div>

    <div class="overlay-row">
      <p class="subhead-overlay">Padding</p>
      <div class="typography">
        <div class="slider-sec">
          <input
            type="range"
            name="paddingValue"
            min="0"
            max="20"
            step="0.25"
            :value="widgetData.properties.paddingValue"
            class="slider"
            id="myRange"
            @input="handleChangeColor"
          />
        </div>
        <span class="padding-value">
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            name="paddingValue"
            @input="handleChangeColor"
            :value="widgetData.properties.paddingValue"
          />
          <small>vw</small>
        </span>
      </div>

      <div class="fill">
        <span>Fill</span>
        <!-- <div class="color-piker"> -->
          <!-- <input type="color" name="paddingFill" :value="widgetData.properties.paddingFill" v-on:input="handleChangeColor"/> -->
           <div class="color-piker"><el-color-picker v-model="widgetData.properties.paddingFill" @change="(e)=>handleColor(e,'paddingFill')" color-format="hex" @active-change="(e)=>handleColor(e,'paddingFill')" show-alpha></el-color-picker></div>
        <!-- </div> -->
      </div>
    </div>

    <div class="overlay-row">
        <p class="subhead-overlay">Text direction</p>
        <div class="select">
            <Dropdown 
                name="textDirection" 
                :optionList="direction" 
                :selectedOption="widgetData.properties.textDirection"
                @selectOption="handleChangeColor"
            />
        </div>
        <!-- <p class="subhead-overlay">Spacing</p>
        <div class="typography">
            <div class="slider-sec">
                <input type="range" name="spacing" min="1" max="100" :value="widgetData.properties.spacing" v-on:input="handleChangeColor" class="slider" id="myRange"></div>
            <span class="padding-value"> <input type="text" name="" :value="widgetData.properties.spacing"><small>px</small></span>
        </div> -->
        <p class="subhead-overlay">Crawl speed</p>
        <div class="typography">
            <div class="slider-sec"><input type="range" name="crawlSpeed" min="1" max="100" :value="widgetData.properties.crawlSpeed" @input="handleChangeColor" class="slider" id="myRange"></div>
            <span class="padding-value"> <input type="number" name="crawlSpeed" :value="widgetData.properties.crawlSpeed" @input="handleChangeColor"><small>x</small></span>
        </div>
    </div>



    <!-- <div class="overlay-row no-border">
      <p class="subhead-overlay">Layer</p>
      <div class="layer">
        <span>
          <img src="images/layer-icon1.png" alt />
        </span>
        <span>
          <img src="images/layer-icon1.png" alt />
        </span>
        <span>
          <img src="images/layer-icon1.png" alt />
        </span>
        <span>
          <img src="images/layer-icon1.png" alt />
        </span>
      </div>
      <div class="fill lock">
        <span>Lock</span>
        <div class="switch">
          <input type="checkbox" />
          <div></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Dropdown from '@/components/Dropdown'
import {fontFamilyArray,fontWeightArray,fontSizeArray,direction} from '@/assets/preview.js';
import Helper from '@/common/helper.js'

export default {
  name: "TickerEditor",
  components:{
    Dropdown
  },
  props:{
    widgetData: Object
  },
  data: function() {
    return {
     fontFamilyList :[],
     fontWeightList :[],
     fontSizeList: [],
     direction:[],
     debounceTimeOut:0,
     textShadowColor:null,
      textBorderColor:null
    };
  },
  created(){
    this.fontFamilyList = fontFamilyArray;
    this.fontWeightList = fontWeightArray;
    this.fontSizeList = fontSizeArray();
    this.direction = direction;

    this.textShadowColor = this.widgetData.properties.textShadows.split(" ")[3];
    this.textBorderColor = this.widgetData.properties.textBorder.split(" ")[2];
    
  },
  methods: {
    handleWidgetNameChange: function (evt) {
      this.widgetData.properties.widgetName = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(() => {
        this.updateData();
      }, 200);
    },
    handleTextChange: function(evt) {
      this.widgetData.properties.content = evt.target.value;
      clearTimeout(this.debounceTimeOut);
      this.debounceTimeOut = setTimeout(()=>{
        this.updateData();
      },200);
    },
    updateData(){
      this.$emit('changeWidgetData',this.widgetData);
    },
    handleChangeColor(evt){
      debugger; // eslint-disable-line no-debugger
      this.widgetData.properties[evt.target.name] = evt.target.value;
      if(evt.target.name === 'paddingValue'){
        clearTimeout(this.debounceTimeOut);
        this.debounceTimeOut = setTimeout(()=>{
          this.updateData();
        },200);
      } else {
        this.updateData();
      }
    },
    handleColor(e,name){
      let hexVal=null;
      if(e !== null){
        hexVal = Helper.rgb2hex(e);
      }
      this.widgetData.properties[name] = hexVal;
      this.updateData();
    },
    handleTextShadow(evt,name){
      const { textShadows } = this.widgetData.properties;
      const txtShdwArr = textShadows.split(" ");
      let x = txtShdwArr[0]
      let y = txtShdwArr[1]
      let blur = txtShdwArr[2];
      let color = txtShdwArr[3];
      if(name == 0){
        x = evt.target.value;
      } else if(name == 1){
        y = evt.target.value;
      } else if(name == 2){
        blur = evt.target.value;
      }else if(name == 3){
        let hexVal = null;
         if(evt!== null){
          hexVal = Helper.rgb2hex(evt);
         } else {
           hexVal = 'transparent'
         }
        color = hexVal;
      }
      this.widgetData.properties.textShadows = `${x} ${y} ${blur} ${color}`;
      this.updateData();
    },
    getShadowValue(index){
      return this.widgetData.properties.textShadows.split(" ")[index];
    },
    getBorderValue(name){
       if(name == 'border-Width'){
        return this.widgetData.properties.textBorder.split(" ")[0];
      } else if(name == 'border-color'){
        return this.widgetData.properties.textBorder.split(" ")[2];
      } 
    },
    handleTextBorder(evt,name){
      const { textBorder } = this.widgetData.properties;
      const txtBorderwArr = textBorder.split(" ");
      let w = txtBorderwArr[0]
      let color = txtBorderwArr[2];
      if(name == 'border-Width'){
        w = evt.target.value;
      } else if(name == 'border-color'){
        let hexVal = 'transparent';
        if(evt!== null){
          hexVal = Helper.rgb2hex(evt);
         }
        color = hexVal;
      } 
      this.widgetData.properties.textBorder = `${w} solid ${color}`;
      this.updateData();
    },
    onChangeCheckBox(isChecked,name){
      if(name === 'TXT_SHADOW'){
       this.widgetData.isTextShadowEnabled = isChecked;
      } else if(name === 'TXT_BORDER'){
       this.widgetData.isTextBorderEnabled = isChecked;
      }
      this.updateData();
    },
  }
};
</script>
