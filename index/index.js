var iNumber = 1;
Page({
  data: {
    areaLayer: {},
    // areaLayer: {},

    showPicker: true
  },
  onLoad: function () {
    var self = this;

    self.cityPickerNodes = self.selectComponent("#cityPickerNodes");



  },
  onTap: function () {
    var self = this;
    // console.log("self.cityPickerNodes.switchPicker=>", self.cityPickerNodes.switchPicker)
    let value = null;
    if(iNumber == 1){
      value = [18, 11, 8] || ["广东省", "梅州市", "兴宁市"];
      iNumber = 0;
   
    }
   
    self.cityPickerNodes.switchPicker(value);

  },
  _myEventListener: function (e) {
    var self = this;

    let result = e.detail;

    console.log("_myEventListener result=>", result)

    let address = result.address;

    self.setData({
      address: address
    })
  },
})