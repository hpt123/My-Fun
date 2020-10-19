;(function(doc){
  var searchInput = doc.getElementsByClassName('J_searchInput')[0],
      wdList = doc.getElementsByClassName('J_wdList')[0],
      listWrap = wdList.parentNode;
      firstScript = doc.getElementsByTagName('script')[0],
      listTpl = doc.getElementById('J_listTpl').innerHTML;

  var init = function(){
    bindEvent();
  }

  function bindEvent(){
    searchInput.addEventListener('input', typeInput, false);
  }

  function renderList(data){
    var list = '',
        data = data.s,
        len = data.length,
        val = _trimSpace(searchInput.value);

    if(len){
      data.forEach(function(elem){
        list += listTpl.replace(/{{(.*?)}}/g, function(node, key){
          return {
            wdLink: elem,
            wd: _setWdStyle(val, elem)
          }[key];
        });
      });

      wdList.innerHTML = list;
      listWrap.style.display = 'block';
    }else{
      wdList.innerHTML = '';
      listWrap.style.display = 'none';
    }

    
  }

  function typeInput(){
    var val = _trimSpace(searchInput.value);
    if(val.length > 0){
      getDatas(val, 'setDatas');
    }else{
      wdList.innerHTML = '';
      listWrap.style.display = 'none';
    }
  }

  function getDatas(value, callbackName){
    var oScript = doc.createElement('script');
    oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+ value +'&cb=' + callbackName;
    doc.body.insertBefore(oScript, firstScript);
    doc.body.removeChild(oScript);  
  }

  function _trimSpace(str){
    return str.replace(/\s+/g, '');
  }

  function _setWdStyle(value, word){
    return '<span class="font-normal">'+ value +'</span>' + word.replace(value, '');
  }

  window.setDatas = function(data){
    renderList(data);
  }

  init();
})(document);