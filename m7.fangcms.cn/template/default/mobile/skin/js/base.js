/*开始加载动画*/
var load_start = function(){
    document.getElementById('loading1').style.display='block';
};
/*关闭加载动画*/
var load_stop = function(){
    document.getElementById("loading1").style.display="none";
};

// /********************* 返回上一页 **********************/.
var hisReferrer = document.referrer.indexOf('eju')>-1 && document.referrer.indexOf('sims')==-1;
if(hisReferrer){
    $(".headBox .back, .headBox .iback").attr("href", "javascript:void\(0\);");
}
$(".headBox .back, .headBox .iback").tap(function(event){
    if(hisReferrer){
        window.history.back();
    }
    event.preventDefault();//阻止默认行为
})
$(".back404").tap(function(event){
    window.history.back();
    event.preventDefault();//阻止默认行为
})


/**
 * 列表页条件筛选请求
 * @param url
 * @param json
 * @returns {boolean}
 */
function ajaxListCondition(url,json){
    if(url == '' || url == undefined){
        alert('请求异常');
        return false;
    }
    $.ajax({
        type : 'post',
        url  : url,
        data : json,
        success:function(msg){
            location.href = msg;
        },
        error:function(){
            alert('网络错误');
        }
    })
}


/********************* 打开、关闭nav **********************/
var switchNav = function(){
    $(".headBox .nav").on("click",function(event){
            $("#nav").animate({
            display:'block',
        }, 200, 'ease-out');
        $("#nav>div.navCon").animate({
            transform: "translate3d(0,0,0)",
        }, 200, 'ease-out');
        // return false;
        $("body").addClass('modal-open')
        event.preventDefault();//阻止默认行为
    })
    //关闭
    $("#nav .close,#nav .mask,#nav .navIcon").click(function(event){

        $("#nav>div.navCon").animate({
            transform: "translate3d(0,0,0)"
        }, 200, 'ease-out');
        setTimeout(function(){
            document.getElementById('nav').style.display='none'

        },200);
        $("body").removeClass('modal-open')
        event.preventDefault();//阻止默认行为

    })
}

/********************* 搜索事件 **********************/
$(".searchWrapCon .tab li a").tap(function(){
    var type = $(this).data('type');
    var $li = $('#' + type + 'HotSearCon');
    $li.addClass("focus").siblings(".focus").removeClass("focus");

    if(!$li.length){
        $(".hotSearch").hide();
        $(".history").css('margin-top','0.2rem')
    }else{
        $(".hotSearch").show();
        $(".history").css('margin-top',0)
    }
});


var searchWrap = function(){
    $(".iSearchLink,.serchIcon").click(function(e){
        setTimeout(function(){
            $(".searchWrapBox").show()
            $("body").addClass("modal-open")
        },100);
        e.preventDefault();
        return false;
    });

    var val = $(".searchWrapBox .formBox input").val();
    //获得焦点
    // $(".searchWrapBox .formBox input").on('focus',function(){
    //     if(val=="请输入关键词进行搜索" || val==""){
    //         $(this).val("");
    //         console.log(val)
    //     }
    // });
    //实时监听input

    $(".searchWrapBox .tab li a").tap(function(){
        $(this).parent("li").addClass("foucs").siblings().removeClass("foucs");
        var bodyAttr = $('body').attr('data')
        if(bodyAttr=='officeBody'){
            var now = $(this).parents("li").index();
            switch (now){
                case 0:
                    focusIndex  =   'szoffice';
                    break;
                case 1:
                    focusIndex  =   'szoffice';
                    break;
                case 2:
                    focusIndex  =   'lp';
                    break;
            }
        }else{
            focusIndex = $(this).parents("li").index();
            if(typeof focusIndex22!="undefined"){
                focusIndex = focusIndex22;
            }
        }
    });
    //keyup的兼容性处理2.4
    var bind_name = 'input';

    if (navigator.userAgent.indexOf("msie") != -1){
        bind_name = 'propertychange';
    }//（此处是为了兼容ie）
    if(navigator.userAgent.match(/android/i) == "android") {
        bind_name = "keyup";
    }

    //取消搜索页面
    $(".searchWrapBox .formBox .cancel").click(function(){
        $(".searchWrapBox").hide();
        $("body").removeClass("modal-open");
    });

    //搜索历史
    var historyLi = $(".searchWrapCon .history .historyUl li:not(.notHistoty)");
    var historyUl = $(".searchWrapCon .history .historyUl");
    var notHistoty = $(".searchWrapCon .history .historyUl li.notHistoty")
    var cancelEmpty = $(".searchWrapBox .MessageBox .btn .cancel");
    var sureEmpty = $(".searchWrapBox .MessageBox .btn .sure");
    cancelEmpty.click(function(){
        // $(".MessageBox").animate({
        //     display:'none',
        // }, 500, 'ease-out');
        $(".MessageBox").css({"display":"none"})
    });
    sureEmpty.tap(function(){
        var historyLi = $(".searchWrapCon .history .historyUl li:not(.notHistoty)");
        var historyUl = $(".searchWrapCon .history .historyUl");
        historyLi.remove();
        notHistoty.show();
        $(".MessageBox").animate({
            display:'none',
        }, 500, 'ease-out');
        $(".searchWrapBox .history .empty").hide();
    })
    //如果没有搜索历史就显示暂无记录
    if (historyLi.length>0){
        notHistoty.hide();
    }else{
        notHistoty.show();
        var hisLi = '<li class="notHistoty">\n' +
            '                        暂无搜索历史记录\n' +
            '                    </li>'
        historyUl.html(hisLi)
    }

}




/********************* icon左右模块对齐  中间模块居中 **********************/
var justCenter = function(num2){


    if(num2=='justify'){
        var justList2 = $('#'+num2).find('li');
        var justLast2 = $('#'+num2).find('li:nth-of-type(4n)');
        var justLsDiv2 = $('#'+num2).find('li div,li a');
        justList2.css({ 'float':'left' , 'text-align':'left' });
        justLast2.css({'text-align':'right'});
        justLsDiv2.css({'text-align ':'center' , 'display':'inline-block'});
        // var justWid2 = $('#'+num2).width();
        var justWid2 = $("#"+num2)[0].getBoundingClientRect().width
        // var justLiLastWid = $('#'+num).find('li:last-child div').width();
        var last = $("#"+num2)[0].children.length-1;
        var justLiLastWid2 = $("#"+num2)[0].children[last].getBoundingClientRect().width;
        justList2.width( (justWid2 -justLiLastWid2) / (4-1)  );
        justLast2.width(justLiLastWid2);

    }


}

/********************* 返回顶部 **********************/
function goTop(acceleration, time) {
    acceleration = acceleration || 0.1;
    time = time || 16;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    if (document.documentElement) {
        x1 = document.documentElement.scrollLeft || 0;
        y1 = document.documentElement.scrollTop || 0;
    }
    if (document.body) {
        x2 = document.body.scrollLeft || 0;
        y2 = document.body.scrollTop || 0;
    }
    var x3 = window.scrollX || 0;
    var y3 = window.scrollY || 0;
// 滚动条到页面顶部的水平距离
    var x = Math.max(x1, Math.max(x2, x3));
// 滚动条到页面顶部的垂直距离
    var y = Math.max(y1, Math.max(y2, y3));
// 滚动距离 = 目前距离 / 速度, 因为距离原来越小, 速度是大于 1 的数, 所以滚动距离会越来越小
    var speed = 1 + acceleration;
    window.scrollTo(Math.floor(x / speed), Math.floor(y / speed));
// 如果距离不为零, 继续调用迭代本函数
    if (x > 0 || y > 0) {
        var invokeFunction = "goTop(" + acceleration + ", " + time + ")";
        window.setTimeout(invokeFunction, time);
    }
}
$("#goToUp").tap(function() {
    //$("body").scrollTop(0);
    //window.scrollTo(0,0);
    // goTop();
    $(window).scrollTop("0");
});
$(window).scroll(function(){
    var _top=$(window).scrollTop();
    if(_top>200){
        $("#goToUp").show();
    }else{
        $("#goToUp").hide();
    }
})

/**************************** 分享组件 ***************************/
var share = function(){
    /* 获取当前环境：
    系统环境： iOS Android PC
    浏览器环境 微信内置浏览器、QQ内置浏览器、正常浏览器
    是否app内打开
*/
    var ua = navigator.userAgent.toLowerCase(); //获取浏览器标识并转换为小写
    // alert(ua)
    var curConfig = {
        isiOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //是否苹果
        isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1, //是否安卓
        isPC: isPC(), //是否PC
        isWeiXin: ua.match(/MicroMessenger/i) == "micromessenger", //是否微信
        isQQ: ua.indexOf(' qq/') > -1, //是否QQ
        isDingtalk: ua.indexOf('dingtalk') > -1, //钉钉
        isWeibo: ua.indexOf('weibo') > -1, //微博
        isUC: ua.indexOf('ucbrowser') > -1, //uc
        isBaiduapp: ua.indexOf('baiduboxapp') > -1, //微博
        isApp: ua.indexOf('isApp') > -1, //是否某个应用
        isChrome:ua.indexOf('chrome')>-1,//chrome浏览器
        isXiaoMi:ua.indexOf('xiaomi')>-1,//小米浏览器
    };

    function isPC() {
        var Agents = new Array("android", "iphone", "symbianOS", "windows phone", "ipad", "ipod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (ua.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    var nativeShare = new NativeShare()
    var title = $('title').html()
    var logo = $('#logo').attr('logo')
    var description = $('meta[name="description"]').attr('content')
    var shareData = {
        title: title,
        desc: description,
        // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
        link: window.location.href,
        icon: logo,
        // 不要过于依赖以下两个回调，很多浏览器是不支持的
        success: function() {
            // alert('success')
        },
        fail: function() {
            alert('fail')
        }
    }
    nativeShare.setShareData(shareData);
    function setTitle(title) {
        nativeShare.setShareData({
            title: title,
        })
    }


    $(".headBox .share").tap(function(){
        try {
            nativeShare.call("command");
            if(curConfig.isWeiXin || curConfig.isDingtalk || curConfig.isWeibo){
                $(".sharePageBpx .share-1").show();
            }
            // if(curConfig.isUC || curConfig.isAndroid){
            //     $(".sharePageBpx .share-3").show();
            // }
        } catch (err) {
            // 如果不支持，你可以在这里做降级处理
            if(curConfig.isWeiXin || curConfig.isDingtalk || curConfig.isWeibo){
                $(".sharePageBpx .share-1").show();
            }else{
                $(".sharePageBpx .share-3").show();
            }

        }
    });

    $("#shareBtn").click(function(e){
        try {
            nativeShare.call("command");
            if(curConfig.isWeiXin || curConfig.isDingtalk || curConfig.isWeibo){
                $(".sharePageBpx .share-1").show();
            }
            if(curConfig.isUC || curConfig.isAndroid){
                $(".sharePageBpx .share-3").show();
            }
        } catch (err) {
            // 如果不支持，你可以在这里做降级处理
            if(curConfig.isWeiXin || curConfig.isDingtalk || curConfig.isWeibo){
                $(".sharePageBpx .share-1").show();
            }else{
                $(".sharePageBpx .share-3").show();
            }

        }
    });

    $(".sharePageBpx>div.share .share-btn").tap(function(event){
        $(this).parents(".share").hide();
        event.stopPropagation();//阻止默认行为

    })


}


/********************* 头部滑动 **********************/
var headFixBox = function(){
    var deBanner = $(".deBanner");
    if( deBanner.length==0||deBanner==null){
        var h = 200;
    }else{
        var h = deBanner.height();
    }
    var headBoxH = $(".headBox").height()
    $(window).scroll(function(){
        var top=$(window).scrollTop() || document.documentElement.scrollTop || document.body.scrollTop;

        if(top>headBoxH){
            $(".headBox").addClass("headFixBox")
        }else{
            $(".headBox").removeClass("headFixBox");
        }
        if(top>h){
            $(".headBox").css("background-color","rgba(248,248,248,1)")
        }else{
            var op = top/h * 1;
            $(".headBox").css("background-color","rgba(248,248,248,"+op+")")
        }
    })
}
var titleFixBox = function(){
    var rdeBanner = $(".rheadFixBox");
    var rheadBoxH = $(".rheadBox").height();
    $(window).scroll(function(){
        var top=$(window).scrollTop() || document.documentElement.scrollTop || document.body.scrollTop;
        if(top>rheadBoxH){
            $(".rheadBox").addClass("rheadFixBox");
            if($(".newsSelectBox").length==1){
                $(".newsSelectBox").addClass("fix");
            }
        }else{
            $(".rheadBox").removeClass("rheadFixBox");
            if($(".newsSelectBox").length==1){
                $(".newsSelectBox").removeClass("fix");
            }
        }
    })
}
var rheadFixBox = function(){

}


/********************* ad **********************/
var adSwiper = function () {
    adSwiper = new Swiper('.adBox', {
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
        },
        loop : true,

    })
}
var footFixA = function () {
    var mainH = $("main").height();
    var headH = $("header").height();
    var botFixNavBoxH = $(".botFixNavBox").height();
    var wH = $(window).height();
    var w = wH-mainH-headH
    if ((mainH + headH) < wH) {
        $("footer").before("<div class='aa' style='height: "+w+"px;visibility: hidden'>s</div>")
    }
}
var footFixList = function () {
    var huiWrapH = document.getElementById("refreshContainer").outerHeight();
    var headH = $("header").height();
    var wH = $(window).height();

}
