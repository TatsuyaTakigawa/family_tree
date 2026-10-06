(function(){
  var view=document.getElementById('view'),svg=document.getElementById('tree');
  var W=10198,H=1230,z=0.7,lab=document.getElementById('zl');
  function set(nz,cx,cy){
    var oz=z; z=Math.max(0.15,Math.min(1.6,nz));
    var px=(view.scrollLeft+(cx==null?view.clientWidth/2:cx))/oz, py=(view.scrollTop+(cy==null?view.clientHeight/2:cy))/oz;
    svg.setAttribute('width',W*z);svg.setAttribute('height',H*z);
    view.scrollLeft=px*z-(cx==null?view.clientWidth/2:cx); view.scrollTop=py*z-(cy==null?view.clientHeight/2:cy);
    lab.textContent=Math.round(z*100)+'%';
  }
  document.getElementById('zi').onclick=function(){set(z*1.25)};
  document.getElementById('zo').onclick=function(){set(z/1.25)};
  document.getElementById('zf').onclick=function(){set(view.clientWidth/W);view.scrollLeft=0;view.scrollTop=0};
  var down=false,sx,sy,sl,st;
  view.addEventListener('pointerdown',function(e){if(e.button!==0)return;down=true;sx=e.clientX;sy=e.clientY;sl=view.scrollLeft;st=view.scrollTop;view.classList.add('drag')});
  window.addEventListener('pointermove',function(e){if(!down)return;view.scrollLeft=sl-(e.clientX-sx);view.scrollTop=st-(e.clientY-sy)});
  window.addEventListener('pointerup',function(){down=false;view.classList.remove('drag')});
  // start with the joint couple in view
  var j=svg.querySelector('.joint-label'); 
  if(j){var b=j.getBBox();view.scrollLeft=Math.max(0,b.x*z-view.clientWidth/2);view.scrollTop=0}
})();
