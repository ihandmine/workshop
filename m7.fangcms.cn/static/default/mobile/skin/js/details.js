// var baseInforWid = function(){
//     var baseLi = $(".baseInfoBox .baseInfo li");
//     var widArr =[];
//     //循环所有baseli的width
//     for(var i=0;i<baseLi.length;i++){
//         var wid = baseLi[i].children[0].offsetWidth;
//         widArr.push(wid)
//     }
//     //拿到baseli的最大宽度
//     function getMax(widArr){
//         for(var i=0,max=widArr[0];i<widArr.length;widArr[i]>max&&(max=widArr[i]),i++);
//         return max;
//     }
//
//     baseLi.find('span').css({'width':parseInt(getMax(widArr)+1)+"px"});
//
// }
// 2.4/
var baseInforWid = function(){
    var baseLi = $(".baseInfoBox .baseInfo li");
    var baseLiOneW = $(".baseInfoBox .baseInfo li span:first-of-type").css('margin-right');
    // var screenW= window.screen.width;
    var baseInfo2W = $(".baseInfo2").width();
    var widArr =[];
    //循环所有baseli的width
    for(var i=0;i<baseLi.length;i++){
        var wid = baseLi[i].children[0].offsetWidth;
        widArr.push(wid)
    }
    //拿到baseli的最大宽度
    function getMax(widArr){
        for(var i=0,max=widArr[0];i<widArr.length;widArr[i]>max&&(max=widArr[i]),i++);
        return max;
    }

    baseLi.find('span:first-of-type').css({'width':parseInt(getMax(widArr)+1)+"px"});
    baseLi.find('span:last-of-type').css({'max-width':baseInfo2W-parseInt(getMax(widArr)+2+parseInt(baseLiOneW))+"px"});

}
var baseInforWid2 = function(){
    var baseLi = $(".baseInfoBox .baseInfo li");
    var widArr =[];
    //循环所有baseli的width
    for(var i=0;i<baseLi.length;i++){
        var wid = baseLi[i].children[0].offsetWidth;
        widArr.push(wid)
    }
    //拿到baseli的最大宽度
    function getMax(widArr){
        for(var i=0,max=widArr[0];i<widArr.length;widArr[i]>max&&(max=widArr[i]),i++);
        return max;
    }

    baseLi.find('span').css({'width':parseInt(getMax(widArr)+1)+"px"});

}
/********************* 相册 **********************/
// 2.4
var abstractSwiper = function(){
    var bannerSwiper = new Swiper('.deBannerSwiper', {
        // loop : true,
        pagination: {
            el: '.numTips .swiper-pagination',
            type: 'fraction',
        },
    })

    var viewSwiper = new Swiper('.atlasesBox .view .swiper-container', {
        on:{
            slideChangeTransitionStart: function() {
                updateNavPosition()
            }
        },
        pagination: {
            el: '.ab-swiper-pagination',
            // type: 'bullets',
            type: 'fraction',
            // type : 'progressbar',
            //type : 'custom',
            // currentClass : 'a-pagination-current',
        },
    })

    // $('.view .arrow-left,.preview .arrow-left').on('click', function(e) {
    //     e.preventDefault()
    //     if (viewSwiper.activeIndex == 0) {
    //         viewSwiper.slideTo(viewSwiper.slides.length - 1, 1000);
    //         return
    //     }
    //     viewSwiper.slidePrev()
    // })
    // $('.view .arrow-right,.preview .arrow-right').on('click', function(e) {
    //     e.preventDefault()
    //     if (viewSwiper.activeIndex == viewSwiper.slides.length - 1) {
    //         viewSwiper.slideTo(0, 1000);
    //         return
    //     }
    //     viewSwiper.slideNext()
    // })

    var previewSwiper = new Swiper('.atlasesBox .preview .swiper-container', {
        //visibilityFullFit: true,
        slidesPerView: 'auto',
        // allowTouchMove: false,
        on:{
            tap: function() {
                viewSwiper.slideTo(previewSwiper.clickedIndex)
            }
        }

    })


    function updateNavPosition() {
        $('.preview .active-nav').removeClass('active-nav')
        var activeNav = $('.preview .swiper-slide').eq(viewSwiper.activeIndex).addClass('active-nav');

        if (!activeNav.hasClass('swiper-slide-visible')) {
            if (activeNav.index() > previewSwiper.activeIndex) {
                var thumbsPerNav = Math.floor(previewSwiper.width / activeNav.width()) - 1;

                // console.log(activeNav.index())
                previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                previewSwiper.slideTo(activeNav.index())
            }
        }
    }
    // $(".deBanner .pic ul li").tap(function(){
    //     $(".atlasesBox").addClass("isVisible");
    // })
    $(".atlasesBox .backUp").tap(function(){
        var index = $(".atlasesBox .preview .swiper-container .active-nav").index();
        bannerSwiper.slideTo(index);
        setTimeout(function () {
            $(".atlasesBox").removeClass("isVisible");
        }, 250);
    })
    //点击查看大图
    $(".deBanner .pic").find(".swiper-wrapper li").on("click", function (event) {
        var index = $(this).index();
        viewSwiper.slideTo(index);
        setTimeout(function () {
            $(".atlasesBox").addClass("isVisible");
        }, 250);
    });

}

/********************* 头部滑动 **********************/
var headFixBox = function(){
    var deBanner = $(".deBanner");
    var h = deBanner.height();
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

/********************* 查看全文 **********************/
// var fullText = function(){
//
//
//     //将字符串拆成字符，并存到数组中
//     String.prototype.strToCharsCH = function(){
//         var chars = new Array();
//         for (var i = 0; i < this.length; i++){
//             chars[i] = [this.substr(i, 1), this.isCHS(i)];
//         }
//         String.prototype.charsArray = chars;
//         return chars;
//     };
//     //判断某个字符是否是汉字
//     String.prototype.isCHS = function(i){
//         if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
//             return true;
//         else
//             return false;
//     };
//     //截取字符串（从start字节到end字节）
//     String.prototype.subCHString = function(start, end){
//         var len = 0;
//         var str = "";
//         this.strToCharsCH();
//         for (var i = 0; i < this.length; i++) {
//             if(this.charsArray[i][1])
//                 len += 2;
//             else
//                 len++;
//             if (end < len)
//                 return str;
//             else if (start < len)
//                 str += this.charsArray[i][0];
//         }
//         return str;
//     };
//     //截取字符串（从start字节截取length个字节）
//     String.prototype.subCHStr = function(start, length){
//         return this.subCHString(start, start + length);
//     };
//
//
//     var sumCon = $(".sumBox .sumCon");
//     var sumConP = $(".sumBox .sumCon p");
// // sumCon.css({height:'4.1rem'});
//     var unfold = $(".sumBox .sumCon .unfold");
//     // 超过6行显示省略号
//     // var rowNum=Math.round(sumConP.height()/parseFloat(sumConP.css('line-height')));
//     // // console.log("当前有"+rowNum+"行");
//     // if(rowNum<6){
//     //     unfold.hide();
//     //     sumCon.css("padding-bottom","0.3rem")
//     // }else{
//     //     unfold.show();
//     // }
//     String.prototype.len = function()
//     {
//         return this.replace(/[^\x00-\xff]/g, "xx").length;
//     }
//     var sumConPText = sumConP.text();
//     if(sumConPText.len()<250){
//         unfold.hide();
//         sumCon.css("padding-bottom","0.3rem");
//     }else{
//         // sumConPText.subCHStr(0,249)+"..."
//         var newText = sumConPText.subCHStr(0,247)+"..."
//         sumConP.html(newText)
//     }
//
//     unfold.tap(function(){
//         if(sumCon.hasClass('fullText')){
//             sumCon.removeClass("fullText");
//             var newText = sumConPText.subCHStr(0,247)+"..."
//             sumConP.html(newText)
//         }else{
//             sumConP.html(sumConPText)
//             sumCon.addClass('fullText');
//         }
//     });
//
// }
//     2.4
var fullText = function(){
    var sumCon = $(".sumBox .sumCon");
    var sumConP = $(".sumBox .sumCon .txt");
    var unfold = $(".sumBox .sumCon .unfold");
    // console.log(sumCon.height()-unfold.height(),sumConP.height());

    // 超过6行显示省略号
    var rowNum=Math.round(sumConP.height()/parseFloat(sumConP.css('line-height')));
    if(rowNum<=6){
        unfold.hide();
        sumCon.css({"margin-bottom": "0.3rem","height":sumConP.height()});
    }else{
        unfold.show();
    }

    unfold.tap(function(){
        if(sumCon.hasClass('fullText')){
            sumCon.removeClass("fullText");
        }else{
            sumCon.addClass('fullText');
        }
    });

}
/********************* 房源信息切换 **********************/
var dheadFixApp = function(){
    $(window).scroll(function(){
        var top=$(window).scrollTop() || document.documentElement.scrollTop || document.body.scrollTop;
        var h = $('header').height();
        if(top>h){
            $(".openApp").show()
        }else{
            $(".openApp").hide();
        }

    })
}

function tabSwiper (){
    var tabSwiper = new Swiper('.tabSwiperBox .tabSwiper', {
        pagination: {
            el: '.swiper-pagination',
        },
        // loop : true,
    });
}

function initTabSwiper() {
    var $tabSwiperTit = $('.tabSwiperBox .tabTit a');
    var $tabSwiper = $('.tabSwiperBox .tabSwiper')
    $tabSwiperTit.click(function(){
        var index = $(this).index()
        $(this).addClass("focus").siblings().removeClass("focus");
        $tabSwiper.eq(index).addClass("focus").siblings().removeClass("focus");
        console.log(index);
		if(index==1){
            $('.tabSwiperBox .tabSwiper li').addClass('w50')
        }else{
            $('.tabSwiperBox .tabSwiper li').removeClass('w50')
        }
        
    })
}