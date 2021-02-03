<template>
  <nav>
    <div class="add-menu" @mouseover="isNav = true">
      <button class="add-bn">
        <i class="fas fa-plus"></i> Add
      </button>
      <ul class="nav" id="multilevelMenu" v-show="isNav">
        <!-- <li><img :src="require('@/assets/images/img-icon.png')" alt=""/>Image</li>     -->
        <li class="submenu">
          <img :src="require('@/assets/images/text-icon.png')" alt /> Text
          <ul>
            <li @click="clickOnSimpleText">Simple Text</li>
            <li @click="clickOnTextText">Text Ticker</li>
          </ul>
        </li>
        <li @click="clickOnDateTime">
          <img :src="require('@/assets/images/date-time.png')" alt />Date and
          Time
        </li>
        <li @click="clickOnTimer">
          <img :src="require('@/assets/images/timer.png')" alt />Timer
        </li>
        <!-- <li><img :src="require('@/assets/images/scoreboard.png')" alt=""/>Scoreboard</li>  -->
        <li @click="clickOnScoreboard">
          <img :src="require('@/assets/images/scoreboard.png')" alt />Scoreboard
        </li>
        <li class="submenu">
          <img :src="require('@/assets/images/shape.png')" alt />Shape
          <ul>
            <li @click="()=>clickOnShape('rectangle')">
              <img :src="require('@/assets/images/rectangle.png')" alt />Rectangle
            </li>
            <li @click="()=>clickOnShape('oval')">
              <img :src="require('@/assets/images/oval.png')" alt />Oval
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import VueDraggableResizable from 'vue-draggable-resizable'
export default {
  name: 'MultiLevelMenu',
  data: function() {
    return {
      isNav: true
    };
  },
  methods: {
    clickOnSimpleText() {
      this.isNav = false;
      this.$emit('selectMenu', 'SIMPLE_TEXT');
    },
    clickOnTextText() {
      this.isNav = false;
      this.$emit('selectMenu', 'TEXT_TICKER');
    },
    clickOnDateTime() {
      this.isNav = false;
      this.$emit('selectMenu', 'DATE_TIME');
    },
    clickOnTimer() {
      this.isNav = false;
      this.$emit('selectMenu', 'TIMER');
    },
    clickOnScoreboard() {
      this.isNav = false;
      this.$emit('selectMenu', 'SCORE_BOARD');
    },
    clickOnShape(type) {
      this.isNav = false;
      if (type == 'rectangle') this.$emit('selectMenu', 'RECTANGLE_SHAPE');
      else this.$emit('selectMenu', 'OVAL_SHAPE');
    }
  }
};
</script>
<style scoped>
nav {
  display: block;
  text-align: center;
  position: relative;
}
nav ul {
  margin: 0;
  padding: 10px 0;
  list-style: none;
  position: absolute;
  top: 38px;
  left: 0;
  width: 156px;
  background: #1a1b1e;
  z-index: 999;
  color: #fff;
  display: none;
}

nav ul li {
  margin: 1px 0px;
  padding: 12px 12px;
  list-style: none;
  display: block;
  text-align: left;
  background: #1a1b1e;
  cursor: pointer;
  position: relative;
  font-weight: normal;
  font-size: 13px;
}
nav ul li > img {
  margin: 1px 10px 0 0;
  float: left;
}

nav ul li:hover {
  background: #212224;
}
nav ul li:hover ul {
  display: block;
}
nav ul li ul {
  position: absolute;
  top: 0;
  left: 156px;
  display: none;
}

.add-menu:hover .nav {
  display: block;
}

nav ul .submenu {
  position: relative;
}
nav ul .submenu:after {
  content: '';
  position: absolute;
  right: 14px;
  top: 18px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 2px;
}
</style>
