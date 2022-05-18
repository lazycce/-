const Service = require('egg').Service;
const DATABASE_TAB = "gen_config";

class GenConfigService extends Service {

  async queryByProjectId(projectId) {
    const res = await this.app.mysql.get(DATABASE_TAB, {project_id: projectId})
    return res;
  }

  async update(data) {
    const res = await this.app.mysql.update(DATABASE_TAB, data);
    return res.affectedRows;
  }

  async insert(data) {
    const res = await this.app.mysql.insert(DATABASE_TAB, data);
    return res.affectedRows;
  }

}

module.exports = GenConfigService