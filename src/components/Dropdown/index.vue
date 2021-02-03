<template>
        <select :name="name"  v-on:input="handleSelect">
          <option 
            v-for="elem in optionList"
            :key="elem"
            :value="elem"
            :selected="selectedOption==elem"
            >
            {{elem}}
          </option>
        </select>   
</template>

<script>
export default {
  name: "Dropdown",
  props:{
    optionList: Array,
    name: String,
    selectedOption: String
  },
  data: function() {
    return {

    };
  },
  methods: {
    handleSelect(evt){
      this.$emit('selectOption',evt);
    }
  }
};
</script>
