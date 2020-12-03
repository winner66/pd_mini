<template>
<!-- <view class="pd-split"></view> -->

<view class="page">
  <scroll-view class="pd-content" scroll-y="true" enable-back-to-top="true">
  <view class="pd-split"></view>
  
    <swiper class="swiper _obect_img" :style="'height:' + objImgHeight" indicator-dots="true" circular="true" v-if="tab == 'obj'">
      <block v-for="(url, index) in pd.pdModel.objectUrls" :key="index">
        <swiper-item>
          <image :src="context + url" mode="widthFix" @tap="prePdImg" :data-url="url"></image>
        </swiper-item>
      </block>
    </swiper>

    <view v-if="tab == 'rule'" class="_order_rule">
      <view style="padding:5px 5px 0px 5px">
        <text style="font-size:13px; font-weight:550;line-height:2" space="ensp">{{pd.ruleExp}}</text>
      </view>
      <view style="margin-top:20px"></view>
      <block v-for="(desc, i) in pd.ruleDesc" :key="i">
        <view class="weui-flex" v-if="i % 4 == 0" style="margin-top:5px">
          <block v-for="(desc, j) in pd.ruleDesc" :key="j">
            <view class="weui-flex__item" style="white-space: nowrap;overflow: hidden;" v-if="j >= i && j < i + 4">{{desc}}</view>
          </block>
        </view>
      </block>
      </view>
    <view class="pd-split"></view>
    <view v-if="pd.pdModel.objectUrls.length > 0">
      <wux-segmented-control theme="balanced" :values="['订货示例', '实物图']" @change="changeTab"></wux-segmented-control>
      <view class="pd-split"></view>
    </view>

    <view class="weui-cells weui-cells_after-title">
      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">产品分类</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdClass.name}}</view>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">产品型号</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.code}}</view>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">产品名称</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.name}}</view>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">生产厂家</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.company}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="rule">
        <view class="weui-cell__hd">
          <view class="weui-label">订货标识</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{rule}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdInfo.std">
        <view class="weui-cell__hd">
          <view class="weui-label">执行标准</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.std}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdInfo.quality">
        <view class="weui-cell__hd">
          <view class="weui-label">质量等级</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.quality}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdInfo.size">
        <view class="weui-cell__hd">
          <view class="weui-label">尺寸</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.size}}</view>
          <view class="pd-cell-label">
            <text>{{pd.pdInfo.sizeDesc}}</text>
          </view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdInfo.voltage">
        <view class="weui-cell__hd">
          <view class="weui-label">电压</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.voltage}}</view>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.temperature">
        <view class="weui-cell__hd">
          <view class="weui-label">温度特性</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.temperature}}</view>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar" data-handle="true" data-type="pin" data-optiontype="pins" v-if="pd.pdInfo.pin">
        <view class="weui-cell__hd">
          <view class="weui-label">引脚形状</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择引脚形状【必填】" :value="pinText" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="true ? (!pin ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="casOpen" :data-handle="pd.selCapacity?true:false" data-type="capacity" data-optiontype="capacities" v-if="pd.pdInfo.capacityMin && pd.pdInfo.capacityMax">
        <view class="weui-cell__hd">
          <view class="weui-label">容量</view>
        </view>
        <view class="weui-cell__bd" v-if="!pd.selCapacity">
          <view class="pd-cell-label">{{pd.pdInfo.capacity}}</view>
        </view>
        <view class="weui-cell__bd" v-if="pd.selCapacity">
          <input type="text" class="weui-input" placeholder="请选择容量【必填】" :value="capacityText" disabled="true"></input>
        </view>
        <view class="weui-cell__ft" v-if="pd.selCapacity">
          <icon type="warn" size="20" :hidden="true ? (!capacity ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar" :data-handle="pd.selTolerance?true:false" data-type="tolerance" data-optiontype="tolerances" v-if="pd.pdInfo.tolerance">
        <view class="weui-cell__hd">
          <view class="weui-label">精度</view>
        </view>
        <view class="weui-cell__bd" v-if="!pd.selTolerance">
          <view class="pd-cell-label">{{pd.pdInfo.tolerance}}</view>
        </view>
        <view class="weui-cell__bd" v-if="pd.selTolerance">
          <input type="text" class="weui-input" placeholder="请选择精度【必填】" :value="toleranceText" disabled="true"></input>
        </view>
        <view class="weui-cell__ft" v-if="pd.selTolerance">
          <icon type="warn" size="20" :hidden="true ? (!tolerance ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar" :data-handle="pd.selOutlet?true:false" data-type="outlet" data-optiontype="outlets" v-if="pd.pdInfo.outlet">
        <view class="weui-cell__hd">
          <view class="weui-label">引出端形式</view>
        </view>
        <view class="weui-cell__bd" v-if="!pd.selOutlet">
          <view class="pd-cell-label">{{pd.pdInfo.outlet}}</view>
        </view>
        <view class="weui-cell__bd" v-if="pd.selOutlet">
          <input type="text" class="weui-input" placeholder="请选择引出端形式【必填】" :value="outletText" disabled="true"></input>
        </view>
        <view class="weui-cell__ft" v-if="pd.selOutlet">
          <icon type="warn" size="20" :hidden="true ? (!outlet ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar" data-handle="true" data-type="wireMa" data-optiontype="wireMas" v-if="pd.pdInfo.wireMa">
        <view class="weui-cell__hd">
          <view class="weui-label">引线材质</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择引线材质【必填】" :value="wireMaText" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="true ? (!wireMa ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell" hover-class="weui-cell_active" @tap="selectPar" data-handle="true" data-type="wireSize" data-optiontype="wireSizes" v-if="pd.pdInfo.wireSize">
        <view class="weui-cell__hd">
          <view class="weui-label">引线长短</view>
        </view>
        <view class="weui-cell__bd">
          <input type="text" class="weui-input" placeholder="请选择引线长短【必填】" :value="wireSizeText" disabled="true"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="true ? (!wireSize ? false : true) : true"></icon>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.elecCode">
        <view class="weui-cell__hd">
          <view class="weui-label">电极材料代码</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.elecCode}}</view>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.capNum">
        <view class="weui-cell__hd">
          <view class="weui-label">电容数量</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.capNum}}</view>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.elecType">
        <view class="weui-cell__hd">
          <view class="weui-label">电路形式</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.elecType}}</view>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.temperRange">
        <view class="weui-cell__hd">
          <view class="weui-label">工作温度范围</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.temperRange}}</view>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.elecSer">
        <view class="weui-cell__hd">
          <view class="weui-label">电流系列</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.elecSer}}</view>
        </view>
      </view>

      <view class=" weui-cell" v-if="pd.pdInfo.socStr">
        <view class="weui-cell__hd">
          <view class="weui-label">端头结构</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.socStr}}</view>
        </view>
      </view>
	  
	  <view class=" weui-cell" v-if="pd.pdInfo.permittivityBy1_9G">
	    <view class="weui-cell__hd">
	      <view class="weui-label">介电常数@1.9G</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.permittivityBy1_9G}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.permittivityBy15G">
	    <view class="weui-cell__hd">
	      <view class="weui-label">介电常数@15G</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.permittivityBy15G}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.dielectricLossBy1_9G">
	    <view class="weui-cell__hd">
	      <view class="weui-label">介电损耗@1.9G</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.dielectricLossBy1_9G}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.dielectricLossBy20G">
	    <view class="weui-cell__hd">
	      <view class="weui-label">介电损耗@20G</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.dielectricLossBy20G}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.flexureStrength">
	    <view class="weui-cell__hd">
	      <view class="weui-label"> 抗弯强度</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.flexureStrength}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.insulationResistance">
	    <view class="weui-cell__hd">
	      <view class="weui-label">绝缘电阻</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.insulationResistance}}</view>
	    </view>
	  </view>
	  
	  <view class=" weui-cell" v-if="pd.pdInfo.breakdownVoltage">
	    <view class="weui-cell__hd">
	      <view class="weui-label">击穿电压</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.breakdownVoltage}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.passBandInsertionLoss">
	    <view class="weui-cell__hd">
	      <view class="weui-label">通带损耗 </view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.passBandInsertionLoss}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.cutOffFrequency">
	    <view class="weui-cell__hd">
	      <view class="weui-label">3dB截止频率</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.cutOffFrequency}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.stopBand">
	    <view class="weui-cell__hd">
	      <view class="weui-label">通带电压驻波比(1.5:1)</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.stopBand}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.vswrStopBand">
	    <view class="weui-cell__hd">
	      <view class="weui-label">阻带电压驻波比</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.vswrStopBand}}</view>
	    </view>
	  </view>  <view class=" weui-cell" v-if="pd.pdInfo.frequencyRange">
	    <view class="weui-cell__hd">
	      <view class="weui-label">频率范围</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.frequencyRange}}</view>
	    </view>
	  </view>  <view class=" weui-cell" v-if="pd.pdInfo.isolation">
	    <view class="weui-cell__hd">
	      <view class="weui-label">隔离度 </view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.isolation}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.insertionLoss">
	    <view class="weui-cell__hd">
	      <view class="weui-label">插入损耗</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.insertionLoss}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.phaseBalance">
	    <view class="weui-cell__hd">
	      <view class="weui-label">相位平衡度</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.phaseBalance}}</view>
	    </view>
	  </view>  <view class=" weui-cell" v-if="pd.pdInfo.amplitudeBalance">
	    <view class="weui-cell__hd">
	      <view class="weui-label"> 幅度平衡度</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.amplitudeBalance}}</view>
	    </view>
	  </view>  <view class=" weui-cell" v-if="pd.pdInfo.vswr">
	    <view class="weui-cell__hd">
	      <view class="weui-label">驻波*</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.vswr}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.powerCapacity">
	    <view class="weui-cell__hd">
	      <view class="weui-label">功率容量</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.powerCapacity}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.ripple">
	    <view class="weui-cell__hd">
	      <view class="weui-label">带内纹波</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.ripple}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.outOfBandRejection">
	    <view class="weui-cell__hd">
	      <view class="weui-label">带外抑制</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.outOfBandRejection}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.other">
	    <view class="weui-cell__hd">
	      <view class="weui-label"> 其他要求</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.other}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.passBandRange">
	    <view class="weui-cell__hd">
	      <view class="weui-label">通带范围</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.passBandRange}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.centerFrequency">
	    <view class="weui-cell__hd">
	      <view class="weui-label"> 中心频率</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.centerFrequency}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.bandwidth">
	    <view class="weui-cell__hd">
	      <view class="weui-label">带宽</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.bandwidth}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.materialCode">
	    <view class="weui-cell__hd">
	      <view class="weui-label">材料代码</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.materialCode}}</view>
	    </view>
	  </view> <view class=" weui-cell" v-if="pd.pdInfo.lengthWidthCode">
	    <view class="weui-cell__hd">
	      <view class="weui-label">长宽代码</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.lengthWidthCode}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.thicknessCode">
	    <view class="weui-cell__hd">
	      <view class="weui-label">厚度代码</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.thicknessCode}}</view>
	    </view>
	  </view>
	  <view class=" weui-cell" v-if="pd.pdInfo.surfaceCode">
	    <view class="weui-cell__hd">
	      <view class="weui-label"> 表面代码</view>
	    </view>
	    <view class="weui-cell__bd">
	      <view class="pd-cell-label">{{pd.pdInfo.surfaceCode}}</view>
	    </view>
	  </view>
	
      <view class=" weui-cell" v-if="pd.pdInfo.packType">
        <view class="weui-cell__hd">
          <view class="weui-label">包装方式</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdInfo.packType}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.voltage">
        <view class="weui-cell__hd">
          <view class="weui-label">介质耐电压</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.voltage}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.ohm">
        <view class="weui-cell__hd">
          <view class="weui-label">绝缘电阻</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.ohm}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.tan">
        <view class="weui-cell__hd">
          <view class="weui-label">损耗角正切</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.tan}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.purpose">
        <view class="weui-cell__hd">
          <view class="weui-label">产品应用</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.purpose}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.feature">
        <view class="weui-cell__hd">
          <view class="weui-label">产品特点</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.feature}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.contact">
        <view class="weui-cell__hd">
          <view class="weui-label">技术联系人</view>
        </view>
        <view class="weui-cell__bd">
          <view class="pd-cell-label">{{pd.pdModel.contact}}</view>
        </view>
      </view>

      <view class="weui-cell" v-if="pd.pdModel.phone" hover-class="weui-cell_active" @tap="callPhone" :data-phone="pd.pdModel.phone">
        <view class="weui-cell__hd">
          <view class="weui-label">联系方式</view>
        </view>
        <view class="weui-cell__bd">
          <!-- <view class="pd-cell-label"> -->
          {{pd.pdModel.phone}}
          <!-- <image src="/images/call_phone.png" class="pd-icon" style="float:right"></image> -->
          <!-- </view> -->
        </view>
        <view class="weui-cell__ft">
          <image src="/static/images/call_phone.png" class="pd-icon" style="float:right"></image>
        </view>
      </view>

      <!-- <view class="weui-cell" hover-class="weui-cell_active">
    <view class="weui-cell__hd">
      <view class="weui-label">产品手册</view>
    </view>
    <view class="weui-cell__bd" bindtap="openManual">
        产品手册.PDF (点我查看)
    </view>
  </view> -->

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">数量</view>
        </view>
        <view class="weui-cell__bd">
          <input class="weui-input" type="number" maxlength="9" pattern="[0-9]*" placeholder="请输入数量【必填】" @input="inputNum" :value="num"></input>
        </view>
        <view class="weui-cell__ft">
          <icon type="warn" size="20" :hidden="checked ? (!num ? false : true) : true"></icon>
        </view>
      </view>

      <view class="weui-cell">
        <view class="weui-cell__hd">
          <view class="weui-label">备注</view>
        </view>
        <view class="weui-cell__bd">
          <textarea class="weui-textarea" placeholder="可以备注其他需求" :value="descr" maxlength="200" auto-height="true" :hidden="visible || casvisible" @input="inputDesc"></textarea>
        </view>
      </view>

    </view>
  </scroll-view>

  <!-- <view class="pd-split"></view> -->

  <!-- <view class="weui-flex pd-bottom-tool"> -->
  <!-- <view class="weui-flex__item">
      <button class="weui-btn" type="primary" open-type="contact" style="width:90%">客服</button>
    </view>
    <view class="weui-flex__item">
      <button class="weui-btn" type="primary" style="width:90%" bindtap="order"> 我要订货</button>
    </view> -->
  <!-- </view> -->

  <view class="weui-flex pd-bottom-tool">
    <view class="weui-flex__item">
      <view class="placeholder">
        <button class="weui-btn" type="primary" style="width:90%" @tap="commit">加入清单</button>
      </view>
    </view>
  </view>

  <wux-popup-select :value="value" :options="options" @valueChange="onValueChange" :visible="visible" controlled :toolbar="toolbar" @visibleChange="onVisibleChange">
  </wux-popup-select>

  <wux-cascader :visible="casvisible" :value="casvalue" title="请选择" :options="casoptions" @close="casClose" @change="casChange" controlled="true" position="bottom"></wux-cascader>

</view>
</template>

<script>
var util = require("../../utils/util.js"); // pages/pdetail/pdetail.js
// import wuxCascader from "../../dist/cascader/index";
// import wuxPopupSelect from "../../dist/popup-select/index";
// import wuxCellGroup from "../../dist/cell-group/index";
// import wuxCell from "../../dist/cell/index";
// import wuxSegmentedControl from "../../dist/segmented-control/index";

export default {
  data() {
    return {
      context: getApp().globalData.context,
      pd: {},
      tempFilePath: '',
      type: '',
      toolbar: {
        title: '请选择'
      },
      tolerance: '',
      outlet: '',
      capacity: '',
      toleranceText: '',
      outletText: '',
      capacityText: '',
      wireMa: '',
      wireMaText: '',
      wireSize: '',
      wireSizeText: '',
      pin: '',
      pinText: '',
      visible: false,
      options: '',
      value: '',
      checked: false,
      rule: '',
      num: '',
      descr: '',
      tab: 'rule',
      objImgHeight: '',
      casvisible: false,
      casoptions: "",
      casvalue: ""
    };
  },

  // components: {
  //   wuxCascader,
  //   wuxPopupSelect,
  //   wuxCellGroup,
  //   wuxCell,
  //   wuxSegmentedControl
  // },
  props: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log('onLoad, pdClassId:', pdreq.get());
    this.getPdDetail(options.piId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    util.login();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  methods: {
    setHiehgt: function () {
      var that = this;
      var obj = uni.createSelectorQuery();
      obj.selectAll('._order_rule').boundingClientRect();
      obj.exec(function (rect) {
        // console.log(rect[0]);
        // console.log(rect[0][0].height);
        // console.log(rect[0][0].width);
        that.setData({
          objImgHeight: rect[0][0].height + "px"
        });
      });
    },
    changeTab: function (e) {
      if (e.detail.key == '0') {
        // 规则
        this.tab = 'rule';
      } else {
        // 实物图
        this.setHiehgt();
        this.tab = 'obj';
      }

      this.setData({
        tab: this.tab
      });
    },
    casClose: function () {
      this.setData({
        casvisible: false
      });
    },
    casOpen: function (e) {
      var handle = e.currentTarget.dataset.handle;

      if (!handle) {
        return;
      }

      this.setData({
        casoptions: this.pd.pdInfo.capacities,
        casvalue: this.capacity,
        casvisible: true
      });
    },

    casChange(e) {
      this.setData({
        casvalue: e.detail.value
      });
      var child = e.detail.options[e.detail.options.length - 1].children;

      if (child && child.length > 0) {
        return;
      }

      this.setData({
        capacity: e.detail.value[1],
        capacityText: e.detail.value[1] + '[' + e.detail.value[0] + ']'
      });
      this.setRule();
    },

    inputNum: function (e) {
      // this.data.num = e.detail.value;
      this.setData({
        num: e.detail.value
      });
    },
    inputDesc: function (e) {
      this.descr = e.detail.value;
    },
    validate: function (e) {
      this.checked = true;

      if (this.pd.selCapacity && !this.capacity) {
        return false;
      }

      if (this.pd.selTolerance && !this.tolerance) {
        return false;
      }

      if (this.pd.selOutlet && !this.outlet) {
        return false;
      }

      if (this.pd.pdInfo.wireMa && !this.wireMa) {
        return false;
      }

      if (this.pd.pdInfo.wireSize && !this.wireSize) {
        return false;
      }

      if (this.pd.pdInfo.pin && !this.pin) {
        return false;
      }

      if (!this.num) {
        return false;
      }

      return true;
    },
    commit: function (e) {
      var result = this.validate();
		console.log(result);
      if (!result) {
        // this.setData(this);

        uni.showToast({
          title: '请完善必填项！',
          icon: 'none',
          duration: 1000
        });
        return;
      }

      uni.showToast({
        title: '请稍等',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var rule = this.rule.replace(/\?/g, "");
      var that = this;
      var data = {
        pdInfoId: this.pd.id,
        num: this.num,
        descr: this.descr,
        flag: rule
      };
      uni.request({
        url: this.context + '/order/save-tmp',
        header: {
          'x-access-token': uni.getStorageSync(getApp().globalData.tokenKey)
        },
        data: data,
        method: 'POST',

        success(res) {
          if (res.data.code == 200) {
            getApp().globalData.flushOrder = true;
            uni.hideToast();
            uni.showToast({
              title: '加入清单成功',
              icon: 'success',
              duration: 1500,
              success: function () {
                setTimeout(function () {
                  uni.switchTab({
                    url: '/pages/pdlist/pdlist'
                  });
                }, 1500);
              }
            });
          } else {
            uni.hideToast();
            uni.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 1500
            });
          }
        },

        fail(res) {
          uni.hideToast();
          uni.showToast({
            title: '加入清单出错,请重试',
            icon: 'none',
            duration: 1500
          });
        },

        complete(res) {}

      });
    },
    order: function (e) {
      uni.navigateTo({
        url: '/pages/pdrule/pdrule?piId=' + this.pd.id
      });
    },
    callPhone: function (e) {
      // console.log(e, e);
      var phone = e.currentTarget.dataset.phone;

      if (!phone) {
        return;
      }

      var p = phone.split("、");

      if (p.length > 1) {
        uni.showActionSheet({
          itemList: p,
          success: function (res) {
            if (!res.cancel) {
              console.log(res.tapIndex);
              uni.makePhoneCall({
                phoneNumber: p[res.tapIndex]
              });
            }
          }
        });
      } else {
        uni.makePhoneCall({
          phoneNumber: phone
        });
      }
    },
    prePdImg: function (e) {
      var current = this.context + e.currentTarget.dataset.url;
      var urls = [];

      for (let u in this.pd.pdModel.objectUrls) {
        urls[u] = this.context + this.pd.pdModel.objectUrls[u];
      }

      uni.previewImage({
        current: current,
        urls: urls
      });
    },
    getPdDetail: function (piId) {
      uni.showToast({
        // title: '数据加载中',
        icon: 'loading',
        duration: 10000,
        mask: true
      });
      var pdpar = getApp().globalData.pdpar;
      var data = {};
      data.id = piId;

      for (let key in pdpar) {
        if ('key' == key) {
          if (pdpar[key] && pdpar[key] != '') {
            data[key] = pdpar[key];
          }
        } else if (pdpar[key] && pdpar[key] != '') {
          data[key] = pdpar[key][pdpar[key].length - 1];
        }
      }

      var text = getApp().globalData.pdpartext;

      if (text && text.capacity) {
        var index = text.capacity.lastIndexOf("\/");
        data['capacityCode'] = text.capacity.substring(index + 1, text.length);
      }

      var that = this;
      uni.request({
        url: this.context + '/pd/get-pd-detail',
        data: data,
        method: 'GET',

        success(res) {
          if (res.data.code == 200) {
            console.log('get-pd-detail:', res.data.data);
            that.setData({
              pd: res.data.data,
              rule: res.data.data.rule
            });
            that.setDefault(that, res.data.data);
            that.setRule();
          }
        },

        fail(res) {
          console.log('get-pd-detail:', res);
        },

        complete(res) {
          uni.hideToast();
        }

      });
    },
    setDefault: function (that, data) {
      try {
        if (data.pdInfo.capacities.length == 1 && data.pdInfo.capacities[0].children.length == 1) {
          that.capacity = data.pdInfo.capacities[0].children[0].value;
          that.capacityText = data.pdInfo.capacities[0].children[0].label + '[' + data.pdInfo.capacities[0].label + ']';
        }

        if (data.pdInfo.tolerances.length == 1) {
          this.tolerance = data.pdInfo.tolerances[0].value;
          this.toleranceText = data.pdInfo.tolerances[0].title;
        }

        if (data.pdInfo.outlets.length == 1) {
          this.outlet = data.pdInfo.outlets[0].value;
          this.outletText = data.pdInfo.outlets[0].title;
        }

        if (data.pdInfo.wireMas.length == 1) {
          this.wireMa = data.pdInfo.wireMas[0].value;
          this.wireMaText = data.pdInfo.wireMas[0].title;
        }

        if (data.pdInfo.wireSizes.length == 1) {
          this.wireSize = data.pdInfo.wireSizes[0].value;
          this.wireSizeText = data.pdInfo.wireSizes[0].title;
        }

        if (data.pdInfo.pins.length == 1) {
          this.pin = data.pdInfo.pins[0].value;
          this.pinText = data.pdInfo.pins[0].title;
        }

        that.setData({
          capacity: that.capacity,
          capacityText: that.capacityText,
          tolerance: this.tolerance,
          toleranceText: this.toleranceText,
          outlet: this.outlet,
          outletText: this.outletText,
          wireMa: this.wireMa,
          wireMaText: this.wireMaText,
          wireSize: this.wireSize,
          wireSizeText: this.wireSizeText,
          pin: this.pin,
          pinText: this.pinText
        });
      } catch (e) {
        console.log('setDefault', e);
      }
    },
    setRule: function () {
      var rule = this.pd.rule;
      rule = rule.replace('电容', !this.capacity ? '[?]' : this.capacity);
      rule = rule.replace('精度/容量偏差', !this.tolerance ? '[?]' : this.tolerance);
      rule = rule.replace('引出端形式', !this.outlet ? '[?]' : this.outlet);
      rule = rule.replace('引线材质', !this.wireMa ? '[?]' : this.wireMa);
      rule = rule.replace('引线长短', !this.wireSize ? '[?]' : this.wireSize);
      rule = rule.replace('引脚形状', !this.pin ? '[?]' : this.pin);
      this.setData({
        rule: rule
      });
    },

    onValueChange(e) {
      var data = {};
      data[this.type] = e.detail.value;
      data[this.type + 'Text'] = e.detail.displayValue;
      data.visible = false;
      this.setData(data);
      this.setRule(); // console.log(`onValueChange `, e.detail)
    },

    selectPar(e) {
      console.log("selectPar start", e);
      var handle = e.currentTarget.dataset.handle;

      if (!handle) {
        return;
      }

      var type = e.currentTarget.dataset.type;
      var optiontype = e.currentTarget.dataset.optiontype;
      this.setData({
        options: this.pd.pdInfo[optiontype],
        value: this[type],
        type: type,
        visible: true
      }); // console.log("selectPar end", e);
    },

    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible
      });
    }

  }
};
</script>
<style>
@import "./pdetail.css";
</style>