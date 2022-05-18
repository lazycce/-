module.exports = app => {
  const { router, controller } = app;

  /** 项目 */
  router.get('/getProjectById', controller.genProject.query)
  router.get('/genProject', controller.genProject.queryList);
  router.post('/insertProject', controller.genProject.insert);
  router.delete('/removeProject', controller.genProject.remove);
  router.put('/updateProject', controller.genProject.update);
  router.get('/download', controller.genProject.download);
  router.get('/viewCode', controller.genProject.ViewCode);

  /** 项目配置 */
  router.get('/getProjectConfigByProjectId', controller.genProjectConfig.queryByProjectId)
  router.post('/insertProjectConfig', controller.genProjectConfig.insert);
  router.delete('/removeProjectConfig', controller.genProjectConfig.remove);
  router.post('/updateProjectConfig', controller.genProjectConfig.update);

  /** 其他配置 */
  router.get('/getConfigByProjectId', controller.genConfig.queryByProjectId)
  router.put('/updateConfig', controller.genConfig.update)
  router.post('/addConfig', controller.genConfig.insert)

};
