(function(){
  const view=document.getElementById('view');
  const svg=document.getElementById('tree');
  const zoomLabel=document.getElementById('zl');
  const SVG_WIDTH=4640.09;
  const SVG_HEIGHT=2000;
  let zoom=0.45;

  function setZoom(nextZoom,centerX,centerY){
    const previousZoom=zoom;
    zoom=Math.max(0.05,Math.min(1.6,nextZoom));
    const pointX=(view.scrollLeft+(centerX==null?view.clientWidth/2:centerX))/previousZoom;
    const pointY=(view.scrollTop+(centerY==null?view.clientHeight/2:centerY))/previousZoom;
    svg.setAttribute('width',SVG_WIDTH*zoom);
    svg.setAttribute('height',SVG_HEIGHT*zoom);
    view.scrollLeft=pointX*zoom-(centerX==null?view.clientWidth/2:centerX);
    view.scrollTop=pointY*zoom-(centerY==null?view.clientHeight/2:centerY);
    zoomLabel.textContent=Math.round(zoom*100)+'%';
  }

  function zoomIn(){
    setZoom(zoom*1.25);
  }

  function zoomOut(){
    setZoom(zoom/1.25);
  }

  function fitToScreen(){
    setZoom(view.clientWidth/SVG_WIDTH);
    view.scrollLeft=0;
    view.scrollTop=0;
  }

  document.getElementById('zi').onclick=zoomIn;
  document.getElementById('zo').onclick=zoomOut;
  document.getElementById('zf').onclick=fitToScreen;

  let isDragging=false;
  let startX;
  let startY;
  let startScrollLeft;
  let startScrollTop;

  view.addEventListener('pointerdown',function(event){
    if(event.button!==0)return;
    isDragging=true;
    startX=event.clientX;
    startY=event.clientY;
    startScrollLeft=view.scrollLeft;
    startScrollTop=view.scrollTop;
    view.classList.add('drag');
  });

  window.addEventListener('pointermove',function(event){
    if(!isDragging)return;
    view.scrollLeft=startScrollLeft-(event.clientX-startX);
    view.scrollTop=startScrollTop-(event.clientY-startY);
  });

  window.addEventListener('pointerup',function(){
    isDragging=false;
    view.classList.remove('drag');
  });

  // Start with the joint couple in view.
  const jointLabel=svg.querySelector('.joint-label');
  if(jointLabel){
    const bounds=jointLabel.getBBox();
    view.scrollLeft=Math.max(0,(bounds.x+bounds.width/2)*1.4*zoom-view.clientWidth/2);
    view.scrollTop=0;
  }else{
    view.scrollLeft=Math.max(0,(SVG_WIDTH*zoom-view.clientWidth)/2);
    view.scrollTop=0;
  }
})();
