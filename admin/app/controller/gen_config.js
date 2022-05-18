const Controller = require('../core/base_controller');

class GenConfigController extends Controller {

  async queryByProjectId() {
    const { ctx } = this;
    const res = await ctx.service.genConfig.queryByProjectId(ctx.query.projectId)
    this.success(res)
  }

  async update() {
    const { ctx } = this;
    const res = await ctx.service.genConfig.update(ctx.request.body);
    this.success(res);
  }

  async insert() {
    const { ctx } = this;
    const res = await ctx.service.genConfig.insert(ctx.request.body);
    this.success(res);
}

}

module.exports = GenConfigController