module.exports = {
  
  hump_(key){
    let keyArr = key.split('_');
    for (let i = 0; i < keyArr.length; i++) {
      if (keyArr.includes('url') && keyArr.includes('id')) {
        keyArr[i] = keyArr[i].toUpperCase();
      } else {
        if (i !== 0) {
          keyArr[i] = keyArr[i][0].toUpperCase() + keyArr[i].substr(1);
        }
      }
    }
    return keyArr.join('');
  },
  hump(param){
    Object.keys(param).map((key) => {
      let item = param[key];
      if (item instanceof Object || item instanceof Array) {
        hump(item);
      }
      if (hump_(key) !== key) {
        param[hump_(key)] = param[key];
        delete (param[key]);
      }
    });
    return param;
  }
}