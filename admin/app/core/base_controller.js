const { Controller } = require('egg')
class BaseController extends Controller {

  tabSuccess (rows, total) {
    this.ctx.body = {
      code: 200,
      success: true,
      rows,
      total
    };
  }

  success (data) {
    this.ctx.body = {
      code: 200,
      success: true,
      data
    };
  }

  error (error) {
    console.log(error)
    this.ctx.body = {
      code: 500,
      success: false,
      error: error
    }
  }
}

module.exports = BaseController