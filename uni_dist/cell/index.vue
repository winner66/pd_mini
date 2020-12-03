<template>
<button :class="'wux-class ' + classes.wrap" :disabled="disabled" :open-type="openType" :hover-class="!disabled ? classes.hover : 'none'" :hover-stop-propagation="hoverStopPropagation" :hover-start-time="hoverStartTime" :hover-stay-time="hoverStayTime" :lang="lang" @getuserinfo="bindgetuserinfo" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard" @contact="bindcontact" @getphonenumber="bindgetphonenumber" :app-parameter="appParameter" @error="onError" @opensetting="bindopensetting" @tap="onTap">
    <view :class="classes.hd">
        <block v-if="thumb">
            <image :class="classes.thumb" :src="thumb"></image>
        </block>
        <block v-else>
            <slot name="header"></slot>
        </block>
    </view>
    <view :class="classes.bd">
        <view v-if="title" :class="classes.text">{{ title }}</view>
        <view v-if="label" :class="classes.desc">{{ label }}</view>
        <slot></slot>
    </view>
    <view :class="classes.ft">
        <block v-if="extra">{{ extra }}</block>
        <block v-else>
            <slot name="footer"></slot>
        </block>
    </view>
</button>
</template>

import baseComponent from '../helpers/baseComponent';
import classNames from '../helpers/classNames';
import eventsMixin from '../helpers/eventsMixin';
const defaultEvents = {
  onClick() {},

  onError() {}

};
baseComponent({
  behaviors: [eventsMixin({
    defaultEvents
  })],
  relations: {
    '../cell-group/index': {
      type: 'ancestor'
    },
    '../picker/index': {
      type: 'parent'
    },
    '../date-picker/index': {
      type: 'parent'
    },
    '../popup-select/index': {
      type: 'parent'
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-cell'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    hoverClass: {
      type: String,
      value: 'default'
    },
    hoverStopPropagation: {
      type: Boolean,
      value: false
    },
    hoverStartTime: {
      type: Number,
      value: 20
    },
    hoverStayTime: {
      type: Number,
      value: 70
    },
    lang: {
      type: String,
      value: 'en'
    },
    sessionFrom: {
      type: String,
      value: ''
    },
    sendMessageTitle: {
      type: String,
      value: ''
    },
    sendMessagePath: {
      type: String,
      value: ''
    },
    sendMessageImg: {
      type: String,
      value: ''
    },
    showMessageCard: {
      type: Boolean,
      value: false
    },
    appParameter: {
      type: String,
      value: ''
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
    extra: {
      type: String,
      value: ''
    },
    isLink: {
      type: Boolean,
      value: false
    },
    openType: {
      type: String,
      value: 'navigateTo'
    },
    url: {
      type: String,
      value: ''
    },
    delta: {
      type: Number,
      value: 1
    }
  },
  data: {
    isLast: false
  },
  computed: {
    classes: ['prefixCls, hoverClass, isLast, isLink, disabled', function (prefixCls, hoverClass, isLast, isLink, disabled) {
      const wrap = classNames(prefixCls, {
        [`${prefixCls}--last`]: isLast,
        [`${prefixCls}--access`]: isLink,
        [`${prefixCls}--disabled`]: disabled
      });
      const hd = `${prefixCls}__hd`;
      const thumb = `${prefixCls}__thumb`;
      const bd = `${prefixCls}__bd`;
      const text = `${prefixCls}__text`;
      const desc = `${prefixCls}__desc`;
      const ft = `${prefixCls}__ft`;
      const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
      return {
        wrap,
        hd,
        thumb,
        bd,
        text,
        desc,
        ft,
        hover
      };
    }]
  },
  methods: {
    onTap() {
      if (!this.data.disabled) {
        this.triggerEvent('click');
        this.linkTo();
      }
    },

    bindgetuserinfo(e) {
      this.triggerEvent('getuserinfo', e.detail);
    },

    bindcontact(e) {
      this.triggerEvent('contact', e.detail);
    },

    bindgetphonenumber(e) {
      this.triggerEvent('getphonenumber', e.detail);
    },

    bindopensetting(e) {
      this.triggerEvent('opensetting', e.detail);
    },

    onError(e) {
      this.triggerEvent('error', e.detail);
    },

    linkTo() {
      const {
        url,
        isLink,
        openType,
        delta
      } = this.data;
      const navigate = ['navigateTo', 'redirectTo', 'switchTab', 'navigateBack', 'reLaunch']; // openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch

      if (!isLink || !url || !navigate.includes(openType)) {
        return false;
      } else if (openType === 'navigateBack') {
        return uni[openType].call(uni, {
          delta
        });
      } else {
        return uni[openType].call(uni, {
          url
        });
      }
    },

    updateIsLastElement(isLast) {
      this.setData({
        isLast
      });
    }

  }
});<style>
@import "./index.css";
</style>