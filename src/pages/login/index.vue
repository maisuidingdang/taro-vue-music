<template lang="">
    <view class='root'>
        <z-title :isFixed='false'/>
        <!-- <at-icon value='phone' size='24' color='#ccc'></at-icon> -->
        <at-form>
            <view class='login_content__item'>
                <at-icon value='iphone' size='24' color='#ccc' />
                <at-input  :onChange='val=>handleInput("phone",val)' clear name='phone' type='text' placeholder='手机号' :value='phone' />
            </view>
            <view class='login_content__item'>
                <at-icon value='lock' size='24' color='#ccc' />
                <at-input clear :onChange='val=>handleInput("password",val)' name='password' type='password' placeholder='密码' :value='password' />
            </view>
            <view class="form_btn">
                <at-button type='primary' :onClick='onSubmit' circle >登录</at-button>
            </view>
            <view class='form_reset' >
              <text class='form_reset_text'>重设密码</text>
            </view>
        </at-form>
        <at-toast :isOpened='showLoading' text='登录中……' status='loading' hasMask :duration='30000000' :onClose='closeLoading'></at-toast>
        <at-toast :isOpened='showTip' :text='tip'  hasMask :duration='2000' :onClose='closeToast'></at-toast>
    </view>
</template >
<script>
import Taro from "@tarojs/taro";
import { AtIcon, AtButton, AtInput, AtForm, AtToast } from "taro-ui-vue";
import ZTitle from "@/components/ZTitle";
import { Login } from "@/services/login";
import Component from 'vue-class-component'

export default {
  name: "Login",
  data() {
    return {
      phone: "15321050600",
      password: "nacey123",
      showLoading: false,
      showTip: false,
      tip: "",
    };
  },
  methods: {
    handleInput(type, val) {
      console.log(type);
      this[type] = val;
    },
    onSubmit() {
      console.log("onSubmit");
      const { phone, password } = this;
      if (!phone) {
        this.showTip = true;
        this.tip = "请输入手机号";
        return;
      }
      if (!password) {
        this.showTip = true;
        this.tip = "请输入手机号";
        return;
      }

      this.showLoading = true;
      Login(phone, password)
        .then((res) => {
          let { code } = res;
          let tip = "登录成功";
          if (code !== 200) {
            tip = res.msg || "登录失败";
          }
          this.showLoading = false;
          this.showTip = true;
          this.tip = tip;
          if (code === 200) {
            Taro.setStorageSync("userInfo", res);
            Taro.setStorageSync("userId", res.account.id);
            Taro.navigateBack();
          }
        })
        .catch((err) => {
          console.log(888, err);
          // this.showLoading = false;
          // this.showTip = true;
          // this.tip = "登录失败";
        });
    },
    closeLoading() {
      console.log("closeLoading");
    },
    closeToast() {
      console.log("closeToast");
      this.showTip = false;
    },
  },
  components: {
    "z-title": ZTitle,
    "at-form": AtForm,
    "at-icon": AtIcon,
    "at-input": AtInput,
    "at-button": AtButton,
    "at-toast": AtToast,
  },
};
</script>
<style lang="scss">
@import "~taro-ui-vue/dist/style/variables/default.scss";
@import "../../assets/taro-ui_#E93B3D/custom-theme.scss";
.root {
  background: $color-bg;
  .at-form::after {
    border-bottom-width: 0 !important ;
  }
  .wrapper {
    background: $color-bg;
    margin-bottom: $spacing-v-xl;
  }
  .login_content__item {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    font-size: 32px;
    .at-input {
      width: 600px;
      padding-left: 20px;
      // background: lightcoral;
    }
  }
  .form_btn {
    padding: $spacing-h-md;
    margin: $spacing-v-md 0;
    .at-button {
      border-color: $color-border-grey;
      color: $color-text-base-inverse;
      font-size: $font-size-xl;
      background: $color-brand;
    }
  }
  .form_reset {
    margin-top: $spacing-h-md;
    text-align: center;
    .form_reset_text {
      font-size: $font-size-xs;
      text-decoration: underline;
    }
  }
}
</style>