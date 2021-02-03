<template>
  <div class="overlay-control">
    <div class="Slide-section">
      <MultiLevelMenu @selectMenu="onSelectMenu" />
      <i
        v-if="activeWidgetObj"
        class="fas fa-arrow-left"
        aria-hidden="true"
        style="color: #fff; cursor: pointer"
        @click="onBackClick"
      ></i>
      <TextEditor
        v-if="activeWidgetObj && activeWidgetObj.name === 'simpleText'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />
      <TickerEditor
        v-else-if="activeWidgetObj && activeWidgetObj.name === 'textTicker'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />
      <DateTimeEditor
        v-else-if="activeWidgetObj && activeWidgetObj.name === 'dateTime'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />

      <TimerEditor
        v-else-if="activeWidgetObj && activeWidgetObj.name === 'timer'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />
      <ScoreBoard
        v-else-if="activeWidgetObj && activeWidgetObj.name === 'scoreBoard'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />
      <ShapeEditor
        v-else-if="activeWidgetObj && activeWidgetObj.name === 'rectangle'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />
      <ShapeEditor
        v-else-if="activeWidgetObj && activeWidgetObj.name === 'oval'"
        @changeWidgetData="onChangeWidgetData"
        :widgetData="activeWidgetObj"
      />

      <div v-else class="image-slide">
        <SlideBox
          v-for="element in previewWidgets"
          :widgetObj="element"
          :key="element.id"
          @selectBox="onSelectedBox"
          @editWidget="onEditWidget"
          @deleteWidget="onDeleteWidget"
          :previewWidgets="previewWidgets"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SlideBox from '@/components/SlideBox';
import TextEditor from '@/components/EditWidget/TextEditor.vue';
import TickerEditor from '@/components/EditWidget/TickerEditor.vue';
import DateTimeEditor from '@/components/EditWidget/DateTimeEditor.vue';
import TimerEditor from '@/components/EditWidget/TimerEditor.vue';
import ScoreBoard from '@/components/EditWidget/ScoreBoard.vue';
import ShapeEditor from '@/components/EditWidget/ShapeEditor.vue';

import MultiLevelMenu from '@/components/MultiLevelMenu';
// import urlConstant from "@/constants/uri.constants.js";
import Helper from '@/common/helper.js';
import { WebSocket } from '@/WebSocket/webSocket.js';

export default {
  components: {
    TextEditor,
    TickerEditor,
    DateTimeEditor,
    TimerEditor,
    SlideBox,
    MultiLevelMenu,
    ScoreBoard,
    ShapeEditor
  },
  data: function() {
    return {
      previewWidgets: [],
      activeWidgetObj: null,
      sceneId: '',
      iframeUrl: ''
    };
  },
  computed: {
    ...mapState({
      previewWidget: state => state.WidgetModule.getWidgetResponse
    })
  },
  watch: {
    previewWidget() {
      if (this.previewWidget.fetchingSuccess && this.previewWidget.widgetResponse) {
        this.previewWidgets = this.previewWidget.widgetResponse.scene.preview.widgets;
        this.deactiveWidgets();
      }
    }
  },
  created() {
    this.sceneId = Helper.getQueryString('sceneId');
  },
  mounted() {
    this.$store.dispatch('WidgetModule/actionGetPreviewWidget', this.sceneId);
    this.initWebSocket();
  },
  destroyed() {
    WebSocket.close();
  },
  methods: {
    initWebSocket() {
      WebSocket.initWebsocketClient(this.sceneId, (_eventName, _message) => {
        if (_eventName === 'ON_MESSAGE') {
          const previewData = _message.scene.preview.widgets;
          if (_message.scene.action === 'preview') {
            this.previewWidgets = [];
            previewData.forEach(element => {
              this.previewWidgets.push(element);
            });
            previewData.forEach(element => {
              if (element.isActve) {
                const data = Helper.getObjectByKeySearch(this.previewWidgets, 'id', element.id);
                this.activeWidgetObj = data[0];
              }
            });
          }
        }
      });
    },
    handleAddImage() {
      const imageWidgetProp = {
        id: '2',
        name: 'Image',
        properties: {
          src: '@/assets/logo.png'
        }
      };
      this.previewWidgets.push(imageWidgetProp);
    },

    addText() {
      const dt = new Date();
      this.deactiveWidgets();
      const textWidgetProp = {
        id: `${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isActve: true,
        name: 'simpleText',
        isShown: true,
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Simple Text',
          content: 'Enter the Text',
          width: '18',
          height: '10',
          xCoordinate: '50',
          yCoordinate: '50',
          fontColor: '#ffffff',
          fontSize: '15',
          paddingFill: 'none',
          paddingValue: '0',
          fontType: 'Arial',
          fontStyle: 'Normal',
          textShadows: '0.5 0.5 0.1 #ED0707',
          textBorder: '0.5 solid #000000'
        }
      };
      //textWidgetProp.id = this.previewWidgets.length + 1 + '';
      this.activeWidgetObj = textWidgetProp;
      this.previewWidgets.push(textWidgetProp);
    },
    addTextTicker() {
      const dt = new Date();
      this.deactiveWidgets();
      const textTickerProp = {
        id: `${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isShown: true,
        isActve: true,
        name: 'textTicker',
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Text Ticker',
          content: 'Enter the Text',
          width: 100,
          height: 10,
          xCoordinate: '1',
          yCoordinate: '90',
          fontColor: '#000',
          fontSize: '20',
          paddingFill: '#ffffff',
          paddingValue: '0',
          fontType: 'Arial',
          fontStyle: 'Normal',
          textDirection: 'Left',
          spacing: '10',
          crawlSpeed: '5',
          textShadows: '0.5 0.5 0.1 #ED0707',
          textBorder: '0.5 solid #000000'
        }
      };
      //textTickerProp.id = this.previewWidgets.length + 1 + '';
      this.activeWidgetObj = textTickerProp;
      this.previewWidgets.push(textTickerProp);
    },

    addDateTime() {
      const dt = new Date();
      this.deactiveWidgets();
      const d = new Date();
      const dateAndTime =
        this.addZero(d.getMonth() + 1) +
        '/' +
        this.addZero(d.getDate()) +
        '/' +
        d.getFullYear() +
        ' ' +
        this.addZero(d.getHours()) +
        ':' +
        this.addZero(d.getMinutes()) +
        ':' +
        this.addZero(d.getSeconds());
      const dateTimeWidgetProp = {
        id: `${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isActve: true,
        name: 'dateTime',
        isShown: true,
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Date Time',
          content: dateAndTime,
          width: '18',
          height: '10',
          xCoordinate: '42',
          yCoordinate: '50',
          fontColor: '#ffffff',
          fontSize: '15',
          paddingFill: 'none',
          paddingValue: '0',
          fontType: 'Arial',
          fontStyle: 'Normal',
          textShadows: '0.5 0.5 0.1 #ED0707',
          textBorder: '0.5 solid #000000',
          isDate: true,
          isTime: true,
          dateFormat: 'MM/DD/YYYY',
          timeFormat: 'HH:mm:ss',
          timeZone: 'Local'
        }
      };
      //dateTimeWidgetProp.id = this.previewWidgets.length + 1 + '';
      this.activeWidgetObj = dateTimeWidgetProp;
      this.previewWidgets.push(dateTimeWidgetProp);
    },

    addTimer() {
      const dt = new Date();
      this.deactiveWidgets();
      const timerWidgetProp = {
        id: `${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isActve: true,
        name: 'timer',
        isShown: true,
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Timer',
          content: '00:00:00',
          timerStart: 0,
          width: '18',
          height: '10',
          xCoordinate: '50',
          yCoordinate: '50',
          fontColor: '#ffffff',
          fontSize: '15',
          paddingFill: 'none',
          paddingValue: '0',
          fontType: 'Arial',
          fontStyle: 'Normal',
          textShadows: '0.5 0.5 0.1 #ED0707',
          textBorder: '0.5 solid #000000',
          timerFormat: 'HH:MM:SS',
          timerType: 'up',
          timerInput: 0,
          action: null
        }
      };
      //timerWidgetProp.id = this.previewWidgets.length + 1 + '';
      this.activeWidgetObj = timerWidgetProp;
      this.previewWidgets.push(timerWidgetProp);
    },

    addScoreboard(timerWidgetExists = false) {
      const dt = new Date();
      this.deactiveWidgets();
      const scoreBoardWidgetProp = {
        id: `${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isActve: true,
        name: 'scoreBoard',
        isShown: true,
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Score Board',
          content: '00:00',
          styleType: 'Light', //Dark/Light
          player1Name: 'Team A',
          score1: 0,
          player2Name: 'Team B',
          score2: 0,
          timerWidgetExists: timerWidgetExists, // check if timer were exist then dont allow user to enable timer in scoreboard
          isGameClockEnabled: false, // check game clock is enabled or not
          timerStart: 0,
          timerFormat: 'MM:SS',
          timerType: 'up',
          action: null,
          // width: "50",
          // height: "10",
          timerInput: 0,
          xCoordinate: '20',
          yCoordinate: '30',
          widgetHeight: 20, // at the time of resize height
          widgetWidth: 40, // at the time of resize width
          fontSize: '12' // at the time of resize font
        }
      };
      
      
      this.activeWidgetObj = scoreBoardWidgetProp;
      this.previewWidgets.push(scoreBoardWidgetProp);
    },

    addRectangleShape() {
      const dt = new Date();
      this.deactiveWidgets();
      const rectangleWidgetProp = {
        id:`${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isActve: true,
        name: 'rectangle',
        isShown: true,
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Rectangle',
          width: '20',
          height: '15',
          isLock: false,
          xCoordinate: '20',
          yCoordinate: '20',
          fill: 'linear-gradient(0deg, rgb(117, 46, 46) 0%, rgb(255, 0, 0) 100%',
          textShadows: '0.5 0.5 0.1 #1f5ec4',
          textBorder: '0.5 center #1fc43d'
        }
      };
      
      this.activeWidgetObj = rectangleWidgetProp;
      this.previewWidgets.push(rectangleWidgetProp);
    },

    addOvalShape() {
      const dt = new Date();
      this.deactiveWidgets();
      const ovalWidgetProp = {
        id: `${dt.getTime()}`,
        key: `${dt.getTime()}`,
        isActve: true,
        name: 'oval',
        isShown: true,
        isTextShadowEnabled: false,
        isTextBorderEnabled: false,
        properties: {
          widgetName: 'Oval',
          width: '20',
          height: '20',
          isLock: false,
          xCoordinate: '60',
          yCoordinate: '20',
          fill: 'linear-gradient(0deg, rgb(117, 46, 46) 0%, rgb(255, 0, 0) 100%',
          textShadows: '0.5 0.5 0.1 #ED0707',
          textBorder: '0.5 center #ED0707'
        }
      };
      
      this.activeWidgetObj = ovalWidgetProp;
      this.previewWidgets.push(ovalWidgetProp);
    },

    onChangeWidgetData() {
      this.updateWidgetData();
    },
    onSelectMenu(type) {
      let isTimerExist = false;
      if (type === 'SIMPLE_TEXT') {
        this.addText();
      } else if (type === 'TEXT_TICKER') {
        this.addTextTicker();
      } else if (type === 'DATE_TIME') {
        this.addDateTime();
      } else if (type === 'TIMER') {
        let existingTimerObj;
        let isGameClockEnabled = false;
        let scoreBoardIndex;
        this.previewWidgets.forEach((element, index) => {
          if (element.name === 'timer') {
            isTimerExist = true;
            existingTimerObj = element;
          }
          if (element.name === 'scoreBoard') {
            scoreBoardIndex = index;
          }
          // check scoreboard widget have and it is gameTimer enabled or not
          if (element.name === 'scoreBoard' && element.properties.isGameClockEnabled) {
            isGameClockEnabled = true;
          }
        });

        if (isGameClockEnabled) {
          return false;
        }

        if (isTimerExist) {
          this.onEditWidget(existingTimerObj);
        } else {
          this.addTimer();
          if (parseInt(scoreBoardIndex) >= 0) {
            this.previewWidgets[scoreBoardIndex].properties.timerWidgetExists = true;
            this.updateWidgetData();
          }
        }
      } else if (type === 'SCORE_BOARD') {
        let scoreBoardExist = false;
        let timerExist = false;
        let scoreObj;

        this.previewWidgets.forEach(element => {
          if (element.name === 'scoreBoard') {
            scoreBoardExist = true;
            scoreObj = element;
          }
          if (element.name == 'timer') {
            timerExist = true;
          }
        });

        if (!scoreBoardExist) {
          this.addScoreboard(timerExist);
        } else {
          this.onEditWidget(scoreObj);
        }
      } else if (type === 'RECTANGLE_SHAPE') {
        this.addRectangleShape();
      } else if (type === 'OVAL_SHAPE') {
        this.addOvalShape();
      }
      if (!isTimerExist) {
        this.updateWidgetData();
      }
    },

    updateWidgetData() {
      const sceneObj = {
        scene: {
          action: 'properties',
          sceneId: this.sceneId,
          preview: {
            widgets: this.previewWidgets
          },
          program: {
            widgets: this.previewWidgets
          }
        }
      };
      console.log('sceneObj ---> ', sceneObj);
      WebSocket.sendMessage(sceneObj);
      // this.$store.dispatch("WidgetModule/actionUpdateWidget",sceneObj);
    },
    onBackClick() {
      this.activeWidgetObj = null;
      this.deactiveWidgets();
      this.updateWidgetData();
    },
    onSelectedBox(_obj) {
      _obj.isShown = !_obj.isShown;
      this.updateWidgetData();
    },
    onDeleteWidget(_id) {
      let deletedWidgetName;
      this.previewWidgets = this.previewWidgets.filter(function(el) {
        if (el.name === 'timer') {
          deletedWidgetName = el.name;
        }
        return el.key !== _id;
      });

      if (deletedWidgetName && deletedWidgetName === 'timer' && this.previewWidgets.length > 0) {
        this.previewWidgets.forEach((element, index) => {
          if (element.name === 'scoreBoard' && element.properties.timerWidgetExists) {
            this.previewWidgets[index].properties.timerWidgetExists = false;
          }
        });
      }

      this.updateWidgetData();
    },
    onEditWidget(_obj) {
      this.previewWidgets.forEach(element => {
        element.isActve = false;
      });
      _obj.isActve = true;
      this.activeWidgetObj = _obj;
      this.updateWidgetData();
    },
    deactiveWidgets() {
      this.previewWidgets.forEach(element => {
        element.isActve = false;
      });
    },
    addZero: function(val) {
      if (val < 10) {
        val = '0' + val;
      }
      return val;
    }
  }
};
</script>
<style scoped>
.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
  overflow: hidden;
}
</style>
