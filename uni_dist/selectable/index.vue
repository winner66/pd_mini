<template>
<label :class="'wux-class ' + classes.wrap" @tap="onChange" :style="extStyle">
    <block v-if="type === 'checkbox'">
    	<checkbox :value="value" :checked="inputChecked" :color="inputColor" :disabled="disabled" :class="'wux-input-class ' + classes.input"></checkbox>
    	<icon :class="classes.icon" :type="inputChecked ? 'success' : 'circle'" size="23" :color="!disabled ? inputColor : '#666'"></icon>
    </block>
    <block v-else-if="type === 'radio'">
    	<radio :value="value" :checked="inputChecked" :color="inputColor" :disabled="disabled" :class="'wux-input-class ' + classes.input"></radio>
        <icon :class="classes.icon" type="success_no_circle" size="16" :color="!disabled ? inputColor : '#666'" :hidden="!inputChecked"></icon>
    </block>
    <block v-else>
    	<slot name="icon-on" v-if="inputChecked"></slot>
    	<slot name="icon-off" v-else></slot>
    </block>
    <slot></slot>
</label>
</template>

import baseComponent from '../helpers/baseComponent';
import classNames from '../helpers/classNames';
import styleToCssString from '../helpers/styleToCssString';
import { isPresetColor } from '../helpers/colors';
baseComponent({
  externalClasses: ['wux-input-class'],
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-selectable'
    },
    type: {
      type: String,
      value: 'checkbox'
    },
    value: {
      type: String,
      value: ''
    },
    defaultChecked: {
      type: Boolean,
      value: false
    },
    checked: {
      type: Boolean,
      value: false,

      observer(newVal) {
        if (this.data.controlled) {
          this.updated(newVal);
        }
      }

    },
    disabled: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: 'balanced',

      observer(newVal) {
        this.setData({
          inputColor: isPresetColor(newVal)
        });
      }

    },
    controlled: {
      type: Boolean,
      value: false
    },
    wrapStyle: {
      type: [String, Object],
      value: '',

      observer(newVal) {
        this.setData({
          extStyle: styleToCssString(newVal)
        });
      }

    }
  },
  data: {
    inputChecked: false,
    inputColor: '',
    extStyle: ''
  },
  computed: {
    classes: ['prefixCls, inputChecked, disabled', function (prefixCls, inputChecked, disabled) {
      const wrap = classNames(prefixCls, {
        [`${prefixCls}--checked`]: inputChecked,
        [`${prefixCls}--disabled`]: disabled
      });
      const input = `${prefixCls}__input`;
      const icon = `${prefixCls}__icon`;
      return {
        wrap,
        input,
        icon
      };
    }]
  },
  methods: {
    updated(inputChecked) {
      if (this.data.inputChecked !== inputChecked) {
        this.setData({
          inputChecked
        });
      }
    },

    onChange() {
      const {
        value,
        inputChecked,
        disabled,
        controlled
      } = this.data;
      const item = {
        checked: !inputChecked,
        value
      };
      if (disabled) return;

      if (!controlled) {
        this.updated(!inputChecked);
      }

      this.triggerEvent('change', item);
    }

  },

  attached() {
    const {
      defaultChecked,
      checked,
      controlled
    } = this.data;
    const inputChecked = controlled ? checked : defaultChecked;
    const inputColor = isPresetColor(this.data.color);
    this.setData({
      inputChecked,
      inputColor
    });
  }

});<style>
@import "./index.css";
</style>