<template>
<view>
<wux-backdrop id="wux-backdrop" v-if="mask" @click="onMaskClick" :zIndex="zIndex"></wux-backdrop>
<view :class="'wux-class ' + classes.wrap" :style="extStyle">
    <wux-animation-group :wux-class="prefixCls" :in="popupVisible" :classNames="transitionName" @exited="onExited" :wrapStyle="{ zIndex }" :mountOnEnter="mountOnEnter" :unmountOnExit="unmountOnExit">
        <view :class="'wux-content-class ' + classes.content">
            <view :class="'wux-header-class ' + classes.hd" v-if="hasHeader">
                <view :class="classes.title" v-if="title">{{ title }}</view>
                <block v-else>
                    <slot name="header"></slot>
                </block>
            </view>
            <view :class="'wux-body-class ' + classes.bd">
                <view v-if="content">{{ content }}</view>
                <slot></slot>
            </view>
            <view :class="'wux-footer-class ' + classes.ft" v-if="hasFooter">
                <view :class="classes.extra" v-if="extra">{{ extra }}</view>
                <block v-else>
                    <slot name="footer"></slot>
                </block>
            </view>
            <view :class="'wux-close-class ' + classes.close" v-if="closable" @tap="close">
                <text :class="classes.x"></text>
            </view>
            <view :class="'wux-close-class ' + classes.clear" v-if="clearable" @tap="clear">
                <text :class="'wux-close-class ' + classes.clear + '-text'">【清空条件】</text>
            </view>
        </view>
    </wux-animation-group>
</view>
</view>
</template>

import baseComponent from '../helpers/baseComponent';
import classNames from '../helpers/classNames';
import styleToCssString from '../helpers/styleToCssString';
import { $wuxBackdrop } from '../index';
baseComponent({
  useSafeArea: true,
  externalClasses: ['wux-content-class', 'wux-header-class', 'wux-body-class', 'wux-footer-class', 'wux-close-class'],
  properties: {
    clearable: {
      type: Boolean,
      value: false
    },
    prefixCls: {
      type: String,
      value: 'wux-popup'
    },
    animationPrefixCls: {
      type: String,
      value: 'wux-animate'
    },
    title: {
      type: String,
      value: ''
    },
    content: {
      type: String,
      value: ''
    },
    extra: {
      type: String,
      value: ''
    },
    position: {
      type: String,
      value: 'center',
      observer: 'getTransitionName'
    },
    wrapStyle: {
      type: [String, Object],
      value: '',

      observer(newVal) {
        this.setData({
          extStyle: styleToCssString(newVal)
        });
      }

    },
    closable: {
      type: Boolean,
      value: false
    },
    mask: {
      type: Boolean,
      value: true
    },
    maskClosable: {
      type: Boolean,
      value: true
    },
    visible: {
      type: Boolean,
      value: false,
      observer: 'setPopupVisible'
    },
    zIndex: {
      type: Number,
      value: 1000
    },
    hasHeader: {
      type: Boolean,
      value: true
    },
    hasFooter: {
      type: Boolean,
      value: true
    },
    mountOnEnter: {
      type: Boolean,
      value: true
    },
    unmountOnExit: {
      type: Boolean,
      value: true
    }
  },
  data: {
    transitionName: '',
    popupVisible: false,
    extStyle: ''
  },
  computed: {
    classes: ['prefixCls, position, safeAreaConfig, isIPhoneX', function (prefixCls, position, safeAreaConfig, isIPhoneX) {
      const wrap = classNames(`${prefixCls}-position`, {
        [`${prefixCls}-position--${position}`]: position,
        [`${prefixCls}-position--is-iphonex`]: safeAreaConfig.bottom && isIPhoneX
      });
      const content = `${prefixCls}__content`;
      const hd = `${prefixCls}__hd`;
      const title = `${prefixCls}__title`;
      const bd = `${prefixCls}__bd`;
      const ft = `${prefixCls}__ft`;
      const extra = `${prefixCls}__extra`;
      const close = `${prefixCls}__close`;
      const x = `${prefixCls}__close-x`;
      const clear = `${prefixCls}__clear`;
      return {
        wrap,
        content,
        hd,
        title,
        bd,
        ft,
        extra,
        close,
        x,
        clear
      };
    }]
  },
  methods: {
    clear() {
      this.triggerEvent('clear');
    },

    /**
     * 点击关闭按钮事件
     */
    close() {
      this.triggerEvent('close');
    },

    /**
     * 点击蒙层事件
     */
    onMaskClick() {
      if (this.data.maskClosable) {
        this.close();
      }
    },

    /**
     * 组件关闭后的回调函数
     */
    onExited() {
      this.triggerEvent('closed');
    },

    /**
     * 获取过渡的类名
     */
    getTransitionName(value = this.data.position) {
      const {
        animationPrefixCls
      } = this.data;
      let transitionName = '';

      switch (value) {
        case 'top':
          transitionName = `${animationPrefixCls}--slideInDown`;
          break;

        case 'right':
          transitionName = `${animationPrefixCls}--slideInRight`;
          break;

        case 'bottom':
          transitionName = `${animationPrefixCls}--slideInUp`;
          break;

        case 'left':
          transitionName = `${animationPrefixCls}--slideInLeft`;
          break;

        default:
          transitionName = `${animationPrefixCls}--fadeIn`;
          break;
      }

      this.setData({
        transitionName
      });
    },

    /**
     * 设置 popup 组件的显示隐藏
     */
    setPopupVisible(popupVisible) {
      if (this.data.popupVisible !== popupVisible) {
        this.setData({
          popupVisible
        });
        this.setBackdropVisible(popupVisible);
      }
    },

    /**
     * 设置 backdrop 组件的显示隐藏
     */
    setBackdropVisible(visible) {
      if (this.data.mask && this.$wuxBackdrop) {
        this.$wuxBackdrop[visible ? 'retain' : 'release']();
      }
    }

  },

  created() {
    if (this.data.mask) {
      this.$wuxBackdrop = $wuxBackdrop('#wux-backdrop', this);
    }
  },

  attached() {
    this.setPopupVisible(this.data.visible);
    this.getTransitionName();
  }

});<style>
@import "./index.css";
</style>