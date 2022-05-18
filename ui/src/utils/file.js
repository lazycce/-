const FileSaver = require('file-saver');
const JSZip = require('jszip');

export const downloadZip = (files) => {

  if (!files || files.length === 0) {
    throw new Error('下载文件不能为空')
  }
  const zip = new JSZip();
  files.forEach(i => {
    zip.file( i.filename,  i.content)
  })
  zip.generateAsync({type:"blob"}).then((blob) => {
    FileSaver.saveAs(blob, `test.zip`);
  })

}