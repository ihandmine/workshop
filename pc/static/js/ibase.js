/**
 * Created by huangrunfeng on 2017/12/18.
 */


var downMenuTimeIndex = 0;

/********************************* 快捷方式鼠标事件 ********************************/
$(".shortcut ul li,.baseDetaBox .share,.shortcut .w1190 li.club").mouseenter(function(){
    clearTimeout(downMenuTimeIndex);
    $(this).find("p,div.shadow8px,.shorJoin").show();
}).mouseleave(function(){
    $this = $(this);
    downMenuTimeIndex = setTimeout(function () {
        $this.find("p,div.shadow8px,.shorJoin").hide();
    }, 500);
});

/********************* head搜索 ******************** */
$(".searchType,.searTypeList").mouseenter(function(){
    $(".searTypeList").show()
}).mouseleave(function(){
    $(".searTypeList").hide()
});

var aa=$(".searTypeList li a");
aa.click(function(){
   //console.log($(this).text());
    $(".searTypeList").hide();
    $(".searchType").html($(this).text()+"<i class='icon_arrow'></i>");
});





/********************* banner轮播 ******************** */
var indexBanner = function(){
		bannerListFn(
			/*=======================
			 调用方法：
			 传递参数方法如下：
			 对象1：banner最大容器====================必填
			 对象2：banner======>按钮父容器============必填
			 对象3，4：banner====>左右按钮对象名===========必填
			 对象5：banner滚动时间==================>可选项=======>默认为2000
			 对象6：是否需要自动轮播需要==========true============不需要false:必填
			 =============================*/
			$(".bigBanner"),
			$(".bigBannerList"),
			$(".leftBtn"),
			$(".rightBtn"),
			5000,
			true
		);

    function bannerListFn(a,b,c,d,e,f){
        var $bannerCover = $('.bannerCover');
        var $bannerMaxWapDom=a;
        var windowWidth=$(window).width();
        //var windowWidth=1920;
        var timeShow=0;
        var array=0;
        var timeOff=0;
        $(".bannerCoverShow").hide();

        var imgPos=$bannerMaxWapDom.find("ul.bannerPic").find("li");

        var cloneOne=imgPos.first().clone();
        $bannerMaxWapDom.find("ul.bannerPic").append(cloneOne);
        $bannerMaxWapDom.find("ul.bannerPic li").width(windowWidth);
        var liWidth=imgPos.width();
        var liLength=$bannerMaxWapDom.find("ul.bannerPic li").length;
        $bannerMaxWapDom.find("ul.bannerPic").width(liWidth*(liLength+1));

        var $imgBtnList=b;

        setTimeout(function(i){
            timeShow++;
            (timeShow == 1) ? $bannerMaxWapDom.find("ul.bannerPic").fadeIn() : $bannerMaxWapDom.find("ul.bannerPic").hide();
        },20);

        (e === undefined) ? e=2000 : e=e;

        function imgListBtn (){

            for (var i=0; i < liLength-1; i++ ){
                $imgBtnList.append("<span></span>");
            }

            $imgBtnList.children().eq(0).addClass("focus");

            $imgBtnList.children().click(function(){
                var index=$(this).index();
                array=index;
                bannerImgList(index);
                $imgBtnList.children().eq(array).addClass("focus").siblings().removeClass("focus");

            });

        }

        imgListBtn();

        function bannerImgList(a){
            $bannerMaxWapDom.find("ul.bannerPic").animate({left: -a*windowWidth},400)
            if(a==0){
                $(".bannerCoverShow").hide();
            }else{
                $(".bannerCoverShow").show();
            }
        }

        function setTime(){
            timeOff=setInterval(function(){
                array++;
                move();
            },e)
        }

        (f) ? setTime() : setTime;

        c.stop(true).click(function(){
            array--;
            move();
        });

        d.stop(true).click(function(){
            array++;
            move();
        });

        function move(){
            if (array == liLength){
                $bannerMaxWapDom.find("ul.bannerPic").css({left:0});
                array=1;
            }

            if (array == -1){
                $bannerMaxWapDom.find("ul.bannerPic").css({left:-liWidth*(liLength-1)});
                array=liLength-2
            }
            //设置隐藏表单提交框
            if(array==0||array==1||array==2||array==3){
                $(".bannerCoverShow").hide();
            }else{
                $(".bannerCoverShow").show();
            }

            $bannerMaxWapDom.find("ul.bannerPic").stop(true).animate({
                left:-array*liWidth
            });

            (array == liLength-1) ? $imgBtnList.children().eq(0).addClass("focus").siblings().removeClass("focus") : $imgBtnList.children().eq(array).addClass("focus").siblings().removeClass("focus");


        }

        $bannerMaxWapDom.hover(function(){
            clearInterval(timeOff);
        },function(){(f) ? setTime() : setTime;});
        $bannerCover.hover(function(){
            clearInterval(timeOff);
        },function(){(f) ? setTime() : setTime;});


    }
}

function initLNav() {
    $("#LNav").on("mouseenter", ".flNav-section-tabnav li", function (e) {
        var $this = $(this),
            selector = $this.data("target");

        $this.addClass("active").siblings(".active").removeClass("active");
        $(selector).addClass("active").siblings(".active").removeClass("active");
        $("#LNav .flNav-section-tab-more.active").removeClass("active").fadeOut();
    })

    $("#LNav").on("click", ".flNav-section-tab-btn", function (e) {
        var $this = $(this),
            isOpen = $this.is(".is-open");


        $("#LNav .flNav-section-tab-more.active").removeClass("active").fadeOut();

        if(isOpen) {
            $this.parents(".flNav-section-tab-content-preview").siblings(".flNav-section-tab-more").addClass("active").fadeIn();
        }
    })
}

$(function () {
    initLNav();
})