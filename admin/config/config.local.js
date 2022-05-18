exports.mysql = {
  // 单数据库信息配置
  client: {
    // host
    host: '39.103.231.26',
    // 端口号
    port: '18836',
    // 用户名
    user: 'root',
    // 密码
    password: 'Lu89800718@',
    // 数据库名
    database: 'generate-code',
  },
  default: {
    underscored: true
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
  underscored: true
};
