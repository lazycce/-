const Controller = require('../core/base_controller');
const fs = require('fs');
const ejs = require('ejs')

/**
 * 代码生成管理
 */
class GenProjectController extends Controller {
    async query() {
        const { ctx } = this;
        const data = await ctx.service.genProject.selectById(ctx.query.id);
        this.success(data);
    }

    async queryList() {
        const { ctx } = this;
        const { pageNum, pageSize, name  } = this.ctx.query
        const dataList = await ctx.service.genProject.select({
            name,
            pageNum,
            pageSize
        })
        const total = await ctx.service.genProject.slectCount()
        this.tabSuccess(dataList, total);
    }

    async insert() {
        const { ctx } = this;
        const res = await ctx.service.genProject.insert(ctx.request.body);
        this.success(res);
    }

    async remove() {
        const { ctx } = this;
        const res = await ctx.service.genProject.remove(ctx.request.body);
        this.success(res)
    }

    async update() {
        const { ctx } = this;
        const res = await ctx.service.genProject.update(ctx.request.body);
        this.success(res);
    }

    async download() {
        const { ctx } = this;
        try {
            const files = [];
            const res = await ctx.service.genProjectConfig.queryByProjectId(ctx.query.projectId);
            // 查询模块名称
            const moduleConfig = await ctx.service.genConfig.queryByProjectId(ctx.query.projectId)

            // 列表代码解析
            const filePath = 'app/temp/tpl/list.tpl';
            const tempFile = fs.readFileSync(filePath);
            const codeRes = ejs.render(tempFile.toString(), { items: res, config: moduleConfig })
            files.push({
                filename: 'index.vue',
                content: codeRes
            })

            // api 代码解析
            const apiPath = 'app/temp/tpl/api.tpl'
            const apiTemp = fs.readFileSync(apiPath);
            const apiCode = ejs.render(apiTemp.toString(), { config: {name: 'Test'} })
            files.push({
                filename: 'api.js',
                content: apiCode
            })

            // 详情编辑代码解析
            const detailPath = 'app/temp/tpl/detail.tpl'
            const detailTemp = fs.readFileSync(detailPath);
            // const detaiCode = ejs.render(detailTemp.toString(), { config: {name: 'Test'} })
            files.push({
                filename: 'detail.vue',
                content: detailTemp.toString()
            })

            this.success(files)
        } catch (error) {
            this.error(error)
        }
    }

    async ViewCode() {
        const { ctx } = this;
        try {
            const res = await ctx.service.genProjectConfig.queryByProjectId(ctx.query.projectId);
            // 查询模块名称
            const moduleConfig = await ctx.service.genConfig.queryByProjectId(ctx.query.projectId)

            const filePath = 'app/temp/tpl/list.tpl';
            const apiPath = 'app/temp/tpl/api.tpl'
            const detailPath = 'app/temp/tpl/detail.tpl'

            const vuleTemp = fs.readFileSync(filePath);
            const apiTemp = fs.readFileSync(apiPath);
            const detailTemp = fs.readFileSync(detailPath);
            const vueCode = ejs.render(vuleTemp.toString(), { items: res, config: moduleConfig })
            const apiCode = ejs.render(apiTemp.toString(), { config: {name: 'Test'} })
            this.success({
                vue: vueCode,
                api: apiCode,
                detail: detailTemp.toString()
            })
            
        } catch (error) {
            this.error(error)
        }
    }
}

module.exports = GenProjectController
