var dheadFixBox = function(){

    var deBanner = $(".deBanner");
    if( deBanner.length==0||deBanner==null){
        var h = 200;
    }else{
        var h = deBanner.height();
    }
    var headBoxH = $(".dheadFixBox").height();

    function top(){
        var top=$(window).scrollTop() || document.documentElement.scrollTop || document.body.scrollTop;
        if(top>headBoxH){
            $(".dheadFixBox").hide()

        }else{
            $(".dheadFixBox").show()
        }
        // if(top>h){
        //     $(".headBox").css("background-color","rgba(248,248,248,1)")
        // }else{
        //     var op = top/h * 1;
        //     $(".headBox").css("background-color","rgba(248,248,248,"+op+")")
        // }
    }
    top();
    $(window).scroll(function(){
        top()
    })
}

// 展开查看全部楼盘信息
var fullLpInfo = function(){
    var sumCon = $(".baseInfoLP");
    var sumConP = $(".baseInfoLP .unfold .txt");
    var unfold = $(".baseInfoLP .unfold");
    // 超过6行显示省略号
    var rowNum=Math.round(sumConP.height()/parseFloat(sumConP.css('line-height')));
    if(rowNum<=6){
        unfold.hide();
        sumCon.css({"margin-bottom": "0.3rem","height":sumConP.height()});
    }else{
        unfold.show();
    }

    unfold.click(function(){
        if(sumCon.hasClass('fullLpInfo')){
            sumCon.removeClass("fullLpInfo");
        }else{
            sumCon.addClass('fullLpInfo');
        }
    });

}

// 点击查看更多
var fullText2 = function(){
    var baseInfoLP = $(".baseInfoLP")
    var sumCon = $(".baseInfoLP .baseInfo2");
    var sumConP = $(".baseInfoLP .baseInfo2 li");
    var sumConIntroduce = $(".baseInfoLP .baseInfo2 li.introduce").height();
    var unfold = $(".baseInfoLP .unfold");
    var unfoldH = unfold.height()
    var sumConPW = parseFloat($(".baseInfoLP .baseInfo2 li").css('margin-top'))*2;
    // 超过6行显示省略号
    var rowNum=Math.round((sumCon.height()-sumConIntroduce)/(parseFloat(sumConP.css('line-height'))+sumConPW));
    if(rowNum<=6){
        unfold.hide();
        baseInfoLP.css({"height":sumCon.height()});
    }else{
        unfold.show();
    }
    //
    unfold.tap(function(){
        if(sumCon.hasClass('fullText')){
            sumCon.removeClass("fullText");
        }else{
            sumCon.addClass('fullText');
        }
    });

}

/********************* 相册2 **********************/

var abstractSwiper2 = function(){

    var photoTabsUl = $(".atlasesBox2 .photoTabs ul");
    var viewBox = $(".viewBox");
    var view = $(".viewBox .view")
    var photoArr = photo; //图片总
    var photoN = photoName;
    // 详情初始轮播图
    var photoHtml = '';
    var photoImgTotal = [];
    for (var i = 0; i < photoArr.length; i++){
        // photoHtml+='<li class="swiper-slide">\n' +
        //     '            <img src="'+photoArr[i].img+'" alt="">\n' +
        //     '       </li>'
        photoImgTotal.push(photoArr[i].img)
    }

    // 详情各个类型图片
    function photoNImg(idx){
        var photoImgTotal2 = [];
        for (var i = 0; i < photoN[idx].img.length; i++){
            photoImgTotal2.push(photoN[idx].img[i])
        }
        return photoImgTotal2;

    }
    photoNImg(1)

    // 详情photoTabs
    var photoTabsH ='';
    for(var i = 0; i < photoN.length; i++){

        if(i==0){
            photoTabsH+='<li class="focus" data-val="'+(photoN[i].val)+'">'+photoN[i].name+'  ('+photoN[i].count+')</li>'
        }else{
            if(photoN[i].count!=0){
                photoTabsH+='<li class="" data-val="'+(photoN[i].val+1)+'">'+photoN[i].name+'  ('+photoN[i].count+')</li>'
            }


        }


    }
    photoTabsUl.html(photoTabsH);//全部
    // photoTabsUl总宽度
    var widths=0;
    for(var i=0;i<photoN.length;i++){
        widths+=$('.photoTabs li').eq(i).width();
    }
    photoTabsUl.css('width',widths+2)


    // banner
    var bannerSwiper = new Swiper('.deBannerSwiper', {
        // loop : true,
        pagination: {
            el: '.numTips .swiper-pagination',
            type: 'fraction',
        },
        virtual: {
            slides: photoImgTotal,
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img src="'+slide+'" onerror="javascript:this.src=\'/template/default/mobile/skin/images/none_pic.jpg\'"></li>';
            },
        },
        on: {
            tap:function(){
                view.eq(0).addClass('isVisible').siblings('.view').removeClass('isVisible');
                photoTabsUl.find('li').eq(0).addClass('focus').siblings('li').removeClass('focus');

                var index = bannerSwiper.activeIndex;
                viewSwiper.slideTo(index);
                setTimeout(function () {
                    $(".atlasesBox").addClass("isVisible");
                }, 250);
            }
        }
    })
    //所有swiper
    var viewSwiper = new Swiper('.atlasesBox .view0 .swiper-container', {
        on:{
            slideChangeTransitionStart: function() {
                updateNavPosition()
            }
        },
        pagination: {
            el: '.ab-swiper-pagination2',
            type: 'fraction',
        },
        virtual: {
            slides: photoImgTotal,
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        }
    })
    // 各个类型Swiper



    var viewSwiper1 = new Swiper('.atlasesBox .view1 .swiper-container', {
        pagination: {
            el: '.ab-swiper-pagination31',
            type: 'fraction',
        },
        virtual: {
            slides: photoNImg(1),
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        },
        // virtual: true,
        // init: false,
    })
    var viewSwiper2 = new Swiper('.atlasesBox .view2 .swiper-container', {
        pagination: {
            el: '.ab-swiper-pagination32',
            type: 'fraction',
        },
        virtual: {
            slides: photoNImg(2),
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        },
        // virtual: true,
        // init: false,
    })
    var viewSwiper3 = new Swiper('.atlasesBox .view3 .swiper-container', {
        pagination: {
            el: '.ab-swiper-pagination33',
            type: 'fraction',
        },
        virtual: {
            slides: photoNImg(3),
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        },
        // virtual: true,
        // init: false,
    })
    var viewSwiper4 = new Swiper('.atlasesBox .view4 .swiper-container', {
        pagination: {
            el: '.ab-swiper-pagination34',
            type: 'fraction',
        },
        virtual: {
            slides: photoNImg(4),
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        },
        // virtual: true,
        // init: false,
    })
    var viewSwiper5 = new Swiper('.atlasesBox .view5 .swiper-container', {
        pagination: {
            el: '.ab-swiper-pagination35',
            type: 'fraction',
        },
        virtual: {
            slides: photoNImg(5),
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        },
        // virtual: true,
        // init: false,
    })
    var viewSwiper6 = new Swiper('.atlasesBox .view6 .swiper-container', {
        pagination: {
            el: '.ab-swiper-pagination36',
            type: 'fraction',
        },
        virtual: {
            slides: photoNImg(6),
            renderSlide:function(slide, index){
                return '<li class="swiper-slide" data-index="'+index+'"><img data-id="'+index+'" src="'+slide+'" onerror="javascript:this.src=\'slide/images/none_pic.jpg\'"></li>';
            },
        },
        // virtual: true,
        // init: false,
    })



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
                previewSwiper.slideTo(activeNav.index() - thumbsPerNav)
            } else {
                previewSwiper.slideTo(activeNav.index())
            }
        }
    }
    // $(".deBanner .pic ul li").tap(function(){
    //     $(".atlasesBox").addClass("isVisible");
    // })
    // 返回详情
    $(".atlasesBox .backUp").tap(function(){
        // var index = $(".atlasesBox .preview .swiper-container .active-nav").index();
        var index = viewSwiper.activeIndex;
        bannerSwiper.slideTo(index);
        setTimeout(function () {
            $(".atlasesBox").removeClass("isVisible");
            view.removeClass("isVisible");
        }, 250);
    })
    //点击查看大图
    // $(".deBanner .pic").find(".swiper-wrapper li").on("click", function (event) {
    //     var index = $(this).index();
    //     viewSwiper.slideTo(index);
    //     setTimeout(function () {
    //         $(".atlasesBox").addClass("isVisible");
    //     }, 250);
    // });
    // photoTabs事件
    $(".photoTabs").find("li").on("click", function (event) {
        // var index = $(this).index();
        var index = $(this).attr('data-val');
        var headText = $(".atlasesBox2 .headBox h2")

        if(index==0){
            headText.text(titleText)
            $(this).addClass('focus').siblings('li').removeClass('focus');
            view.eq(0).addClass('isVisible').siblings('.view').removeClass('isVisible');
            // $(".viewBox").find('view').eq(index).css({'visibility':'visible'}).siblings('view').css({'visibility':'hidden'})
            // $(".view2").css({'visibility':'hidden'})
        }else{
            if(photoN[index].img.length!=0){
                headText.text(titleText+'（'+photoN[index].name+'）')
                $(this).addClass('focus').siblings('li').removeClass('focus');
                view.eq(index).addClass('isVisible').siblings('.view').removeClass('isVisible');
            }else{

            }
        }



    })

}

/********************* 预约看房 **********************/
var inp = $('.appointmentBox form input');
var $sub = $('.appointmentBox form button.sub');
var telReg = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;//手机正则
var numReg = /^[1-9]\d*$|^0$/;
function dialog(type) {
    //type=1:成功 type=2:提交失败 type=3:服务器出错
    var type = arguments[0]?arguments[0]:1;
    var _this = $('.megDialog')
    _this.show();
    if(type==1){
        _this.addClass('megSuusen').removeClass('megFail')
        _this.find('h4').text('预约成功');
        _this.find('.fail').text('请耐心等待客服联系哈');
    }else if(type==2){
        _this.removeClass('megSuusen').addClass('megFail')
        _this.find('h4').text('信息提交失败');
        _this.find('.fail').text('请重新提交');
    }else if(type==3){
        _this.removeClass('megSuusen').addClass('megFail')
        _this.find('h4').text('服务器出错');
        _this.find('.fail').text('请重新提交');
    }else if(type==4){
        _this.removeClass('megSuusen megFail')
        _this.find('h4').text('请勿频繁提交');
        _this.find('.fail').text('您已成功提交，请勿频繁提交');
    }

    $(".megDialog").next('.maskBox').show();
    return false;
}
$(".appointmentBox").append('<div class="verifyTipsBox center"><p class="verifyTips ">手机号码格式有误，请重新输入</p></div> ');
var verifyTipsBox = $(".verifyTipsBox");
var verifyTips = $(".verifyTipsBox .verifyTips");
/************ 设置自动消失事件 *************/
function dieAway(){
    verifyTipsBox.show();

    setTimeout(function(){
        $(".verifyTipsBox").animate({
            opacity:'0',
            // display:'none',
        }, 300, 'ease-out');
    },1000);
    $(".verifyTipsBox").css({"opacity":"1"})
    setTimeout(function () {
        verifyTipsBox.hide();
    },4000)
}



$(".megDialog p.btn").tap(function(){
    var _this = $('.megDialog')
    _this.hide();
    $(".megDialog").next('.maskBox').hide();
    window.location.reload();
})


