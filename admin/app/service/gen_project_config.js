const Service = require('egg').Service;
const DATABASE_TAB = "gen_project_config";

class GenProjectConfigService extends Service {

    async queryByProjectId(id) {
        const res = await this.app.mysql.select(DATABASE_TAB, { 
          where : { project_id: id },
          orders: [['sort','asc']]
        });
        return res;
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
        const updateDatas = data.filter(d => d.id);
        const insertDatas = data.filter(d => !d.id);

        if(updateDatas && updateDatas.length > 0) {
            updateDatas.forEach( async(d) => {
                await this.app.mysql.update(DATABASE_TAB, d)
            })
        }

        if (insertDatas && insertDatas.length > 0) {
            await this.app.mysql.insert(DATABASE_TAB, insertDatas);
        }
        return 1;
    }
}

module.exports = GenProjectConfigService;
