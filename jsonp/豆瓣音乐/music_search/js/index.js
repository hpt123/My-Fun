//https://api.douban.com/v2/music/search?q=关键字&callback=回调函数&count=返回条数

;(function(doc){
  
  var oInput = doc.getElementById('J_searchInput'),
      searchItemTpl = doc.getElementById('J_searchItemTpl').innerHTML,
      oList = doc.getElementsByClassName('J_list')[0],

      musicCount = 7;

  var init = function(){
    bindEvent();
  }

  function bindEvent(){
    oInput.addEventListener('input', debounce(musicSearch, 500, false), false);
  }

  function showList(show){
    if(show){
      oList.style.display = 'block';
    }else{
      oList.innerHTML = '';
      oList.style.display = 'none';
    }
  }

  function renderList(data){
    var list = '';
    data.forEach(function(elem){
      list += searchItemTpl.replace(/{{(.*?)}}/g, function(node, key){
        return {
          url: elem.alt,
          image: elem.image,
          title: elem.alt_title || elem.attrs.title[0],
          singer: elem.attrs.singer ? elem.attrs.singer[0] : ''
        }[key];
      });
    });

    oList.innerHTML = list;
    showList(true);
  }

  function musicSearch(){
    var kw = trimSpace(this.value),
        len = kw.length;

    if(len > 0){
      dataRequest(kw, musicCount);
    }else{
      showList(false);
    }
  }

  function dataRequest(keyword, musicCount){
    xhr.ajax({
      url: 'https://api.douban.com/v2/music/search?q=' + keyword + '&count=' + musicCount,
      type: 'GET',
      dataType: 'JSONP',
      jsonp: 'callback',
      success: function(data){
        if(data && data.musics.length > 0){
          renderList(data.musics);
        }
      }
    })
  }
  
  init();
})(document);