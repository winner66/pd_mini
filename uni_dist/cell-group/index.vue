<template>
<view :class="'wux-class ' + classes.wrap">
    <view :class="classes.hd" v-if="title">{{ title }}</view>
    <view :class="classes.bd">
        <slot></slot>
    </view>
    <view :class="classes.ft" v-if="label">{{ label }}</view>
</view>
</template>

import baseComponent from '../helpers/baseComponent';
import classNames from '../helpers/classNames';
baseComponent({
  options: {
    multipleSlots: false
  },
  relations: {
    '../cell/index': {
      type: 'descendant',

      observer() {
        this.debounce(this.updateIsLastElement);
      }

    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-cell-group'
    },
    title: {
      type: String,
      value: ''
    },
    label: {
      type: String,
      value: ''
    }
  },
  computed: {
    classes: ['prefixCls', function (prefixCls) {
      const wrap = classNames(prefixCls);
      const hd = `${prefixCls}__hd`;
      const bd = `${prefixCls}__bd`;
      const ft = `${prefixCls}__ft`;
      return {
        wrap,
        hd,
        bd,
        ft
      };
    }]
  },
  methods: {
    updateIsLastElement() {
      const elements = this.getRelationNodes('../cell/index');

      if (elements.length > 0) {
        const lastIndex = elements.length - 1;
        elements.forEach((element, index) => {
          element.updateIsLastElement(index === lastIndex);
        });
      }
    },

    getBoundingClientRect(callback) {
      const className = `.${this.data.prefixCls}`;
      uni.createSelectorQuery().in(this).select(className).boundingClientRect(rect => {
        if (!rect) return;
        callback.call(this, rect.height);
      }).exec();
    }

  }
});<style>
@import "./index.css";
</style>