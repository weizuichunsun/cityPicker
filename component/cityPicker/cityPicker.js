// component/cityPicker/cityPicker.js
const cityUtil = require("../../lib/city.js").city;



let provinceName = "北京市" || 0;
let cityName = "市辖区" || 0;
let countyName = "" || 0;


/**
 * findData 获取数据值 @object
 * provinceName 省 @string
 * cityName 市 @string
 * countyName 区 @string
 * data 城市数据 @JSON
 */
function findData(provinceName, cityName, countyName, data) {

  console.log("findData provinceName=>", provinceName);
  console.log("findData cityName=>", cityName);
  console.log("findData countyName=>", countyName);

  var value = [0, 0, 0];
  var address = [];
  var provinceData = [];
  var cityData = [];
  var countData = [];


  Object.keys(data).forEach((it, index) => {
    let cityNodes = data[it].child;
    provinceData.push(data[it].name);
    if (data[it].name == provinceName || index == provinceName) {
      nextCity(cityNodes);
      // console.log("keys cityNodes=>", cityNodes);
      // console.log("index0==>", index);
      // address[0] = data[it].name;
      value[0] = index;
      address[0] = data[it].name || "";
      // value.push(index);
    }
  });

  function nextCity(cityNodes) {
    Object.keys(cityNodes).forEach((it, index) => {
      let countNodes = cityNodes[it].child;
      cityData.push(cityNodes[it].name);
      if (cityNodes[it].name == cityName || index == cityName) {
        nextCounty(countNodes);
        // console.log("index1==>", index);
        value[1] = index;
        address[1] = cityNodes[it].name || "";
        // value.push(index);
        // return true;
      }
    });
  }

  function nextCounty(countNodes) {
    Object.keys(countNodes).forEach((it, index) => {
      countData.push(countNodes[it].name);
      if (countNodes[it].name == countyName || index == countyName) {
        // console.log("index2==>", index);
        address[2] = countNodes[it].name || "";
        value[2] = index;

        // value.push(index);
      }
    });
  }

  let result = {
    provinceData: provinceData,
    cityData: cityData,
    countData: countData,
    value: value,
    address: address,
  };

  return result;
}

let result = findData(provinceName, cityName, countyName, cityUtil);
// console.log(result);

// async function changeColumn(newValue, oldValue, self) {

function changeColumn(newValue, oldValue, callback) {
  console.log("changeColumn newValue=>", newValue);
  console.log("changeColumn oldValue=>", oldValue);


  let provinceColumn = oldValue[0] != newValue[0] && oldValue[1] == newValue[1] && oldValue[2] == newValue[2];
  console.log("provinceColumn=>", provinceColumn);

  let cityColumn = oldValue[0] == newValue[0] && oldValue[1] != newValue[1] && oldValue[2] == newValue[2];
  console.log("cityColumn=>", cityColumn);

  let countColumn = oldValue[0] == newValue[0] && oldValue[1] == newValue[1] && oldValue[2] != newValue[2];
  // console.log("countColumn=>", countColumn);


  let provinceName = newValue[0];
  let cityName = newValue[1];
  let countyName = newValue[2];

  if (provinceColumn) {
    cityName = 0;
    countyName = 0;
  }

  if (cityColumn) {
    countyName = 0;
  }

  // let result = await findData(provinceName, cityName, countyName, cityUtil);
  let result = findData(provinceName, cityName, countyName, cityUtil);
  // console.log("result=>", result)

  if (!!callback) {
    callback(result);
  }

}


Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    areaLayer: result
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * bindChange 修改picker 值
     */
    bindChange: function (e) {
      var self = this;

      let oldValue =  self.data.areaLayer.value || [0, 0, 0];

      let newValue = e.detail.value;
      // console.log("newValue=>", newValue)

      changeColumn(newValue, oldValue, function (result) {
        self.setData({
          areaLayer: result,
        });
      });

    },
    confirmPicker: function (e) {

      var self = this;
      self.setData({
        showPicker: false,
        oldValue: self.data.areaLayer.value || ""
      });

      setTimeout(() => {
        self.triggerEvent('myevent', self.data.areaLayer);
      }, 50)

      // console.log("confirmPicker this.data.areaLayer.value=>", this.data.areaLayer.value);

    },
    cancelPicker: function (e) {
      var self = this;


      self.setData({
        showPicker: false,
        "areaLayer.value": self.data.oldValue || self.data.areaLayer.value || ""
      });
      // setTimeout(() => {
      //   self.triggerEvent('myevent', self.data.areaLayer);
      // }, 50);


      // console.log("cancelPicker this.data.oldValue || this.data.areaLayer.value |=>", this.data.oldValue || this.data.areaLayer.value || "");

    },
    switchPicker: function (value) {

      let oldValue = value || this.data.oldValue || this.data.areaLayer.value || [0, 0, 0];

      let provinceName = oldValue[0];
      let cityName = oldValue[1];
      let countyName = oldValue[2];

      let result = findData(provinceName, cityName, countyName, cityUtil);
      console.log(result);
      this.setData({
        showPicker: !this.data.showPicker,
        areaLayer: result,
        oldValue: oldValue
      });


      // var myEventDetail = {} // detail对象，提供给事件监听函数
      // var myEventOption = {} // 触发事件的选项

      // this.triggerEvent('myevent', myEventDetail, myEventOption)

      // this.triggerEvent('myevent', result)

    }

  }
})
