<template>
<wux-cell :wux-class="classes.cell" :prefixCls="cellPrefixCls" :thumb="thumb" :title="title" :label="label">
    <wux-selectable slot="footer" :wux-class="classes.selectable" :prefixCls="selectablePrefixCls" type="radio" :value="value" :checked="inputChecked" :color="color" :disabled="disabled" controlled @change="radioChange"></wux-selectable>
</wux-cell>
</template>

import baseComponent from '../helpers/baseComponent';
import classNames from '../helpers/classNames';
baseComponent({
  relations: {
    '../radio-group/index': {
      type: 'parent'
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-radio'
    },
    cellPrefixCls: {
      type: String,
      value: 'wux-cell'
    },
    selectablePrefixCls: {
      type: String,
      value: 'wux-selectable'
    },
    thumb: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    },
    value: {
      type: String,
      value: ''
    },
    checked: {
      type: Boolean,
      value: false,

      observer(newVal) {
        this.setData({
          inputChecked: newVal
        });
      }

    },
    disabled: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: 'balanced'
    }
  },
  data: {
    index: 0,
    inputChecked: false
  },
  computed: {
    classes: ['prefixCls', function (prefixCls) {
      const cell = classNames(prefixCls);
      const selectable = `${prefixCls}__selectable`;
      return {
        cell,
        selectable
      };
    }]
  },
  methods: {
    radioChange(e) {
      const {
        value,
        index,
        disabled
      } = this.data;
      const parent = this.getRelationNodes('../radio-group/index')[0];
      const item = {
        checked: e.detail.checked,
        value,
        index
      };
      if (disabled) return;
      parent ? parent.onChange(item) : this.triggerEvent('change', item);
    },

    changeValue(inputChecked = false, index = 0) {
      this.setData({
        inputChecked,
        index
      });
    }

  }
});<style>
@import "./index.css";
</style>