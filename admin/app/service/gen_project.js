const Service = require('egg').Service;
// const Service = requrie('../core/base_service')
const DATABASE_TAB = "gen_project";

class GenProjectService extends Service {

    async selectById(id) {
        const res = await this.app.mysql.get(DATABASE_TAB, { id });
        return res;
    }

    async select({ pageNum, pageSize, name }) {
        const res = await this.app.mysql.select(DATABASE_TAB, {
            limit: Number(pageSize),
            offset: (pageNum - 1) * pageSize
        })
        return res;
    }

    async slectCount() {
        const res = await this.app.mysql.select(DATABASE_TAB)
        return res.length;
    }

    async insert(data) {
        const res = await this.app.mysql.insert(DATABASE_TAB, data);
        return res.affectedRows;
    }

    async remove(ids) {
        const res = await this.app.mysql.delete(DATABASE_TAB, {
            id: ids
        })
        return res.affectedRows;
    }

    async update(data) {
        const res = await this.app.mysql.update(DATABASE_TAB, data);
        return res.affectedRows;
    }
}

module.exports = GenProjectService;
