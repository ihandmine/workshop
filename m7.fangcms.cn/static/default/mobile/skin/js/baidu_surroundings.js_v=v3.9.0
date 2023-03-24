var letter=new Array("A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z");

var column = ["商业","交通","教育","医疗"];
//多个关键字搜索数组初化始:数据依次为商业,交通,教育,医疗
var keyword=[["银行","餐厅","商场","便利店","超市"],["地铁站","公交","火车站","机场","长途车站"],["幼儿园","小学","中学","大学"],["医院","社康中心"]];
// 复杂的自定义覆盖物

function ComplexCustomOverlay(point, text, mouseoverText){

    this._point = point;

    this._text = text;

    this._overText = mouseoverText;

}

ComplexCustomOverlay.prototype = new BMap.Overlay();

ComplexCustomOverlay.prototype.initialize = function(map){

    this._map = map;

    var div = this._div = document.createElement("div");

    div.style.position = "absolute";

    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);

    div.style.backgroundColor = "#fc5172"//backgroundColors[this._type];

    div.style.border = "1px solid ";//+borders[this._type];

    div.style.color = "white";

    div.style.height = "18px";

    div.style.padding = "2px";

    div.style.cursor = "pointer";

    div.style.lineHeight = "18px";

    div.style.whiteSpace = "nowrap";

    div.style.MozUserSelect = "none";

    div.style.fontSize = "12px"

    var span = this._span = document.createElement("span");

    div.appendChild(span);

    //调整地图楼盘初始显示价格

    span.appendChild(document.createTextNode(this._overText));

    var that = this;



    var arrow = this._arrow = document.createElement("div");

    arrow.style.background = "url(/public/static/common/images/surroundings/label.png) no-repeat";

    arrow.style.backgroundPosition = "0px -20px";

    arrow.style.position = "absolute";

    arrow.style.width = "11px";

    arrow.style.height = "10px";

    arrow.style.top = "22px";

    arrow.style.left = "10px";

    arrow.style.overflow = "hidden";

    div.appendChild(arrow);



    div.onmouseover = function(){


        div.style.backgroundColor = "#fc5172";//背景色

        $(div).css("z-index","9999");

        div.style.borderColor = "white";

        div.getElementsByTagName("span")[0].innerHTML = that._overText;

        arrow.style.backgroundPosition = "0px 10 px";

    }



    div.onmouseout = function(){



        div.style.backgroundColor = "#fc5172";

        $(div).css("z-index","1");

        div.style.borderColor = "white";

        //鼠标移出后楼盘显示内容不变

        div.getElementsByTagName("span")[0].innerHTML = that._overText;

        arrow.style.backgroundPosition = "0px 10 px";

    }



    mp.getPanes().labelPane.appendChild(div);



    return div;

}



ComplexCustomOverlay.prototype.draw = function(){

    var map = this._map;

    var pixel = map.pointToOverlayPixel(this._point);

    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";

    this._div.style.top = pixel.y - 30 + "px";

}



//点击事件

ComplexCustomOverlay.prototype.addEventListener = function(event,fun){

    this._div['on'+event] = fun;

}



//点击当前楼盘显示信息

function myBuildInfo(index, bid, bname, address){

    // infowindow的标题

    var infoWindowTitle = '<div><a  href="javascript:;" style="font-weight:bold;color:#CE5521;font-size:14px">'+bname+'</a></div>';

    // infowindow的显示信息

    var infoWindowHtml = [];

    infoWindowHtml.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');

    infoWindowHtml.push('<tr>');

    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址：</td>');

    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + address + ' </td>');

    infoWindowHtml.push('</tr>');

    infoWindowHtml.push('</tbody></table>');

    return new BMap.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});

}



// 添加标注

function addMarker(point, index,selectIndex){
    if(selectIndex>10){
        // selectIndex=12;
    }

    // var myIcon = new BMap.Icon("//api.map.baidu.com/img/markers.png", new BMap.Size(23, 25), {
    //     offset: new BMap.Size(10, 25),
    //     imageOffset: new BMap.Size(0, 0 - (selectIndex-1) * 25)
    // });
    // var marker = new BMap.Marker(point, {icon: myIcon});

    // var marker = new BMap.Marker(point);
    // var myIcon=new BMap.Icon('../images/surroundings/position.png',new BMap.Size(23,35));
    // marker.setIcon(myIcon);


    var marker = new BMap.Marker(point);  // 创建标注
    marker.setIcon(new BMap.Icon('//map.baidu.com/newmap/static/common/images/mk_14e51b4.gif',new BMap.Size(34,24),{
        imageOffset:new BMap.Size(0,0)
    }));
    // console.log(selectIndex);
    var label = new BMap.Label(selectIndex,{offset:new BMap.Size(3,0)});
    label.setStyle({
        background:'none',color:'#fff',border:'none'
    });
    marker.setLabel(label);


    mp.addOverlay(marker);

    return marker;

}



// 添加信息窗口

function addInfoWindow_my(marker,poi,index, bid, bname, address){

    var maxLen = 10;

    // infowindow的标题

    var infoWindowTitle = '<div><a href="javascript:;" style="font-weight:bold;color:#CE5521;font-size:14px">'+bname+'</a></div>';

    // infowindow的显示信息

    var infoWindowHtml = [];

    infoWindowHtml.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');

    infoWindowHtml.push('<tr>');

    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">地址：</td>');

    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + address + ' </td>');

    infoWindowHtml.push('</tr>');

    infoWindowHtml.push('</tbody></table>');

    var infoWindow = new BMap.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});

    var openInfoWinFun = function(){

        marker.openInfoWindow(infoWindow);

        for(var cnt = 0; cnt < maxLen; cnt++){

            if(!document.getElementById("list" + cnt)){continue;}

            if(cnt == index){

                document.getElementById("list" + cnt).style.backgroundColor = "#f0f0f0";

            }else{

                document.getElementById("list" + cnt).style.backgroundColor = "#fff";

            }

        }

    }

    marker.addEventListener("click", openInfoWinFun);

    return openInfoWinFun;

}



// 添加信息窗口

function addInfoWindow(marker,poi,index,i){

    var maxLen = 10;

    var name = null;

    if(poi.type == BMAP_POI_TYPE_NORMAL){

        name = "地址：  "

    }else if(poi.type == BMAP_POI_TYPE_BUSSTOP){

        name = "公交：  "

    }else if(poi.type == BMAP_POI_TYPE_SUBSTOP){

        name = "地铁：  "

    }

    // infowindow的标题

    var infoWindowTitle = '<div style="font-weight:bold;color:#CE5521;font-size:14px">'+poi.title+'</div>';

    // infowindow的显示信息

    var infoWindowHtml = [];

    infoWindowHtml.push('<table cellspacing="0" style="table-layout:fixed;width:100%;font:12px arial,simsun,sans-serif"><tbody>');

    infoWindowHtml.push('<tr>');

    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">' + name + '</td>');

    infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + poi.address + ' </td>');

    infoWindowHtml.push('</tr>');



    if(poi.phoneNumber!=null && poi.phoneNumber!='undefined'){

        infoWindowHtml.push('<tr>');

        infoWindowHtml.push('<td style="vertical-align:top;line-height:16px;width:38px;white-space:nowrap;word-break:keep-all">电话：</td>');

        infoWindowHtml.push('<td style="vertical-align:top;line-height:16px">' + poi.phoneNumber + ' </td>');

        infoWindowHtml.push('</tr>');

    }



    infoWindowHtml.push('</tbody></table>');

    var infoWindow = new BMap.InfoWindow(infoWindowHtml.join(""),{title:infoWindowTitle,width:200});



    /*var openInfoWinFun = function(){

     marker.openInfoWindow(infoWindow);

     for(var cnt = 0; cnt < maxLen; cnt++){

     if(!document.getElementById("list" + cnt)){continue;}

     if(cnt == index){

     document.getElementById("list" + cnt).style.backgroundColor ="#f0f0f0";

     }else{

     document.getElementById("list" + cnt).style.backgroundColor = "#fff";

     }

     }

     }*/

    var openInfoWinFun = function(){

        marker.openInfoWindow(infoWindow);

        for(var j=0;j<5;j++){

            for(var k=0;k<20;k++){

                if(j==index && k==i){

                    $("#list"+ index +"_"+ i ).css("backgroundColor","#f0f0f0");

                }else{

                    $("#list"+ j +"_"+ k ).css("backgroundColor","#fff");

                }

            }

        }

    }

    marker.addEventListener("click", openInfoWinFun);

    return openInfoWinFun;

}



/**

 * 得到圆的内接正方形bounds

 * @param {Point} centerPoi 圆形范围的圆心

 * @param {Number} r 圆形范围的半径

 * @return 无返回值

 */

function getSquareBounds(centerPoi,r){

    var a = Math.sqrt(2) * r; //正方形边长



    mPoi = getMecator(centerPoi);

    var x0 = mPoi.x, y0 = mPoi.y;



    var x1 = x0 + a / 2 , y1 = y0 + a / 2;//东北点

    var x2 = x0 - a / 2 , y2 = y0 - a / 2;//西南点



    var ne = getPoi(new BMap.Pixel(x1, y1)), sw = getPoi(new BMap.Pixel(x2, y2));

    return new BMap.Bounds(sw, ne);



}

//根据球面坐标获得平面坐标。

function getMecator(poi){

    return mp.getMapType().getProjection().lngLatToPoint(poi);

}

//根据平面坐标获得球面坐标。

function getPoi(mecator){

    return mp.getMapType().getProjection().pointToLngLat(mecator);

}



/**

 * 定义一个标注点

 * @param title

 * @param keyword

 * @param address

 * @param distance

 * @param point

 * @param poi

 * @return

 */

function pointMarker(title,keyword, address, distance,point,poi){

    this._title=title;

    this._keyword=keyword;

    this._address=address;

    this._distance=parseInt(distance);

    this._point=point;

    this._poi=poi;

}



/**

 * 排序:对返回结果排序

 * @param pm

 * @return   lp-map-tab

 */

function sortOrder(pm,map_result,map_tab){
    var result=[];
    openInfoWinFuns = [];
    var start=0;//用于控制点击弹出信息窗口个数
    for(var i=0;i<pm.length;i++){
        //排序
        var zbcount=0;//计算周边配置个数
        var distOrder=pm[i].sort(function(r1,r2){
            if(r1._distance>r2._distance){
                return 1;
            }
            if(r1._distance<r2._distance){
                return -1;
            }
            return 0;
        });
        //遍历
        $.each(distOrder,
            function(index, value)
            {
                zbcount++;
                var key = start + 1;//i*10 + index + 1;
                var marker = addMarker(value._point,index,key);
                var openInfoWinFun = addInfoWindow(marker,value._poi,i,index);
                openInfoWinFuns.push(openInfoWinFun);
                var selected="";
                result.push('<li id="list' + i +'_'+ index + '" style="cursor: pointer;" onclick="openInfoWinFuns[' + start + ']()">');
                result.push('<span class="lp-map-s20 icons fl">'+key+'</span>');
                result.push('<span class="fl lp-map-s22 gray3">' + value._title.replace(new RegExp(value._keyword,"g"),value._keyword) + '</span>');
                result.push('<span class="lp-map-s21">'+value._distance+'米</span>');
                result.push('</li>');
                start++;//弹出窗口数叠加
            }
        );
    }
    //结果
    $("#"+map_result).html(result.join(''));
    //地图右侧切换滚动条控制
    if(start>7){
        if($(".divScrollBar")){
            $(".divScrollBar").remove();
        }
        var lpTab = document.getElementById(map_tab);
        jsScroll(lpTab, 5, 'divScrollBar');
        //$('.divScrollBar div').css('top','0');
    }else{
        if($(".divScrollBar")){
            $(".divScrollBar").remove();
        }
    }
}
/**
 * 初始化当前楼盘
 * @return
 */
function init_traffic(){
    var myCompOverlay=new ComplexCustomOverlay(pointA, bname, bprice);
    mp.addOverlay(myCompOverlay);
    //测试监听事件
    myCompOverlay.addEventListener("click", function(){
    mp.openInfoWindow(myBuildInfo(1,bid,bname,address),pointA);
});



    /*var circle = new BMap.Circle(pointA,2000,{fillColor:"white", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});

     mp.addOverlay(circle);

     var local =  new BMap.LocalSearch(mp,options);

     var bounds = getSquareBounds(circle.getCenter(),circle.getRadius());

     local.searchInBounds("公交",bounds); */



}











function search(i,local){

    mp.clearOverlays();

    init_traffic();

    //半径为1500

    var circle = new BMap.Circle(pointA,3000,{fillColor:"white", strokeWeight: 1 ,fillOpacity: 0.3, strokeOpacity: 0.3});

    mp.addOverlay(circle);

    var bounds = getSquareBounds(circle.getCenter(),circle.getRadius());

    local.searchInBounds(keyword[i],bounds);

}


//滚动条相关
var scrollMoveObj = null,
    scrollPageY = 0,
    scrollY = 0;
var scrollDivList = new Array();
var lpTab = document.getElementById("lp-map-tab");
jsScroll(lpTab, 5, 'divScrollBar');
function jsScroll(obj, w, className) {
    if (typeof(obj) == 'string') {
        obj = document.getElementById(obj);
    }
    //当内容未超出现在高度时，不添加滚动条
    if (!obj || obj.scrollHeight <= obj.clientHeight || obj.clientHeight == 0) {
        return;
    }

    obj.scrollBarWidth = w || 6;

    obj.style.overflow = 'hidden';

    obj.scrollBar = document.createElement('div');

    document.body.appendChild(obj.scrollBar);

    obj.scrollBarIndex = document.createElement('div');

    obj.scrollBar.appendChild(obj.scrollBarIndex);

    obj.scrollBar.style.position = 'absolute';

    obj.scrollBarIndex.style.position = 'absolute';

    obj.scrollBar.className = className || '';

    if (!className) {

        obj.scrollBar.style.backgroundColor = '#ddd';

        obj.scrollBarIndex.style.backgroundColor = '#aaa';

    }

    scrollDivList.push(obj);

    scrollResetSize(obj);

    //使用鼠标滚轮滚动

    obj.scrollBar.scrollDiv = obj;

    obj.scrollBarIndex.scrollDiv = obj;

    obj.onmousewheel = scrollMove;

    obj.scrollBar.onmousewheel = scrollMove;

    obj.scrollBarIndex.onmousewheel = scrollMove;

    if (obj.addEventListener) {

        obj.addEventListener('DOMMouseScroll', scrollMove, false);

    }



    //拖动滚动条滚动

    obj.scrollBarIndex.onmousedown = function(evt) {

        evt = evt || event;

        scrollPageY = evt.clientY;

        scrollY = this.scrollDiv.scrollTop;

        isScrollMove = true;

        document.body.onselectstart = function() {

            return false

        };

        scrollMoveObj = this.scrollDiv;

        if (this.scrollDiv.scrollBar.className == '') {

            this.scrollDiv.scrollBarIndex.style.backgroundColor = '#888';

        }

        return false;

    }

}
//当页面大小发生变化时，重新计算滚动条位置

window.onresize = function() {

    for (var i = 0; i < scrollDivList.length; i++) {

        scrollResetSize(scrollDivList[i]);

    }

}
//计算滚动条位置



function scrollResetSize(o) {

    if (o.scrollHeight <= o.clientHeight) {

        o.scrollTop = 0;

        o.scrollBar.style.display = 'none';

    } else {

        o.scrollBar.style.display = 'block';

    }

    var x = 0,

        y = 0;

    var p = o;

    while (p) {

        x += p.offsetLeft;

        y += p.offsetTop;

        p = p.offsetParent;

    }

    var borderTop = parseInt(o.style.borderTopWidth || 0);

    var borderBottom = parseInt(o.style.borderBottomWidth || 0);

    o.scrollBar.style.width = o.scrollBarWidth + 'px';

    o.scrollBar.style.height = o.clientHeight + 'px';

    o.scrollBar.style.top = y + borderTop + 'px';

    o.scrollBar.style.left = x + o.offsetWidth - o.scrollBarWidth + 'px';

    o.scrollBarIndex.style.width = o.scrollBarWidth + 'px';

    var h = o.clientHeight - (o.scrollHeight - o.clientHeight);

    //当滚动条滑块最小20个像素

    if (h < 20) {

        h = 20;

    }

    o.scrollBarHeight = h;

    o.scrollBarIndex.style.height = h + 'px';

    o.scrollBarIndex.style.left = '0px';

    setScrollPosition(o);

}



function setScrollPosition(o) {

    o.scrollBarIndex.style.top = (o.clientHeight - o.scrollBarHeight) * o.scrollTop / (o.scrollHeight - o.clientHeight) + 'px';

}



document.documentElement.onmousemove = function(evt) {

    if (!scrollMoveObj) return;

    evt = evt || event;

    var per = (scrollMoveObj.scrollHeight - scrollMoveObj.clientHeight) / (scrollMoveObj.clientHeight - scrollMoveObj.scrollBarHeight)

    scrollMoveObj.scrollTop = scrollY - (scrollPageY - evt.clientY) * per;

    setScrollPosition(scrollMoveObj);

}

document.documentElement.onmouseup = function(evt) {

    if (!scrollMoveObj) return;

    if (scrollMoveObj.scrollBar.className == '') {

        scrollMoveObj.scrollBarIndex.style.backgroundColor = '#aaa';

    }

    scrollMoveObj = null;

    document.body.onselectstart = function() {

        return true

    };

}



// 鼠标滚轮滚动



function scrollMove(evt) {

    var div = this.scrollDiv || this;

    if (div.scrollHeight <= div.clientHeight) return true;

    evt = evt || event;

    var b = true;

    if (evt.wheelDelta) {

        b = evt.wheelDelta > 0 ? false : true;

    } else {

        b = evt.detail < 0 ? false : true;

    }

    var step = 20;

    if (b) {

        if (div.scrollTop >= (div.scrollHeight - div.clientHeight)) return true;

        div.scrollTop += step;

    } else {

        if (div.scrollTop == 0) return true;

        div.scrollTop -= step;

    }

    setScrollPosition(div);



    if (evt.preventDefault) {

        evt.preventDefault();

    }

    return false;

}