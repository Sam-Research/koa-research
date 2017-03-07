/*!
 * respone 返回特定格式
 */
// respone CODE 的枚举
const CODE = {
  SUCCESS: 0,
  FAIL: 1
}

module.exports = {
  CODE: CODE,
  get body () {
    // respone body 数据
    return {
      code: CODE.SUCCESS,
      msg: null,
      data: null
    }
  }
}
