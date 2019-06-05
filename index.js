'use strict';
var cheerio = require('cheerio');

// http://stackoverflow.com/questions/14480345/how-to-get-the-nth-occurrence-in-a-string
function getPosition(str, m, i) {
  return str.split(m, i).join(m).length;
}

hexo.extend.filter.register('after_post_render', function(data){
  var config = hexo.config;
  if(config.post_asset_folder){
    var link = data.permalink;
    //获取开始位置 第三个 / 的位置 例如 https://nobige.cn/post/20170926-phpUniqueMark/ 前两个刚好是协议/
    var beginPos = getPosition(link, '/', 3) + 1;

    //截取域名后的地址
    link = link.substring(beginPos);

    /**
     * 对 about 页面进行特别的处理 index.html
     * about页面地址：   about/index.html
     * index.html 长度为10
     */
    if (link.substr(-10)="index.html") {
      link=link.substring(0,link.length-10);
    }
    
    var toprocess = ['excerpt', 'more', 'content'];
    for(var i = 0; i < toprocess.length; i++){
      var key = toprocess[i];

      var $ = cheerio.load(data[key], {
        ignoreWhitespace: false,
        xmlMode: false,
        lowerCaseTags: false,
        decodeEntities: false
      });

      $('img').each(function(){
        if ($(this).attr('src')){
          // For windows style path, we replace '\' to '/'.
          // 对于windows系统进行反斜杠处理
          var src = $(this).attr('src').replace('\\', '/');
          if(!(/http[s]*.*|\/\/.*/.test(src)
            || /^\s+\//.test(src)
            || /^\s*\/uploads|images\//.test(src))) {
            /**
             * 实际使用情况中并没有使用多级目录的习惯，现将其删除
             */
            // For "about" page, the first part of "src" can't be removed.
            // In addition, to support multi-level local directory.
            // var linkArray = link.split('/').filter(function(elem){
            //   return elem != '';
            // });
            // var srcArray = src.split('/').filter(function(elem){
            //   return elem != '' && elem != '.';
            // });
            // if(srcArray.length > 1)
            // srcArray.shift();
            // src = srcArray.join('/');
            $(this).attr('src', config.root + link + src);
            console.info&&console.info("update link as:-->"+config.root + link + src);
          }
        }else{
          console.info&&console.info("no src attr, skipped...");
          console.info&&console.info($(this));
        }
      });
      data[key] = $.html();
    }
  }
});
