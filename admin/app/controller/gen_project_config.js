const Controller = require('../core/base_controller');

class GenProjectConfigController extends Controller {

  async queryByProjectId() {
    const { ctx } = this;
    const rows = await ctx.service.genProjectConfig.queryByProjectId(ctx.query.projectId)
    const config = await ctx.service.genConfig.queryByProjectId(ctx.query.projectId)
    this.success({ rows, config: config })
  }

  async insert() {
    const { ctx } = this;
        const res = await ctx.service.genProjectConfig.insert(ctx.request.body.list);
        this.success(res);
  }

  async remove() {
    const { ctx } = this;
        const res = await ctx.service.genProjectConfig.remove(ctx.request.body);
        this.success(res)
  }

  async update() {
      const { ctx } = this;
      if (ctx.request.body.form.id) {
        await ctx.service.genConfig.update(ctx.request.body.form);
      } else {
        const data =  ctx.request.body.form
        delete data.id
        await ctx.service.genConfig.insert(data);
      }
      const res = await ctx.service.genProjectConfig.update(ctx.request.body.list);
      this.success(res);
  }
}

module.exports = GenProjectConfigController
