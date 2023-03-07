$(document).ready(function(){
		$("#rm_li ul li").mouseenter(function(){
			$(this).addClass("borred");
			$(this).css("background","#f8f8f8");
			$(this).children().last().show();
		});
		$("#rm_li ul li").mouseleave(function(){
			$(this).removeClass("borred");
			$(this).css("background","#fff");
			$(this).children().last().hide();
		});
			var sz_shuq = document.querySelector(".sz_shuq")
			var w_wid = ($(window).width()-1000)/2;
			if(w_wid > 150){
				if(w_wid > 150){
					var sq_left = w_wid - 145;
					if ($(".sz_shuq").width()<135) {
						$(".sz_shuq").css("left",sq_left+"px");
					}else if (140<$(".sz_shuq").width() && $(".sz_shuq").width()<180) {
						var $sidebar = $(".sz_shuq");
						var sq_left = w_wid - ($sidebar.hasClass("col-3") ? 180 : 165);
						$(".sz_shuq").css("left",sq_left+"px");
					}else{
						sq_left = w_wid - 205;
						sz_shuq.style.setProperty("left",sq_left+"px",'important');
					}
				}
			}
			$(".sz_shuq").show('fast');
			$(window).scroll(
				function(){
					var mytop = $(window).scrollTop();
					if(mytop <150){
						$('.ad_bq').css('top',193);
					}
					else{
						$('.ad_bq').css('top',30);
					}
					if(mytop < 300){
						$(".sz_shuq").show('fast');
					}
					
				}
			);
			$(window).scroll(function(){
				var mytop = $(window).scrollTop();
				var left = ($(window).width()-1000)/2;
				if(mytop>350){
					  $('#stop').addClass('stop');
					  $('#stop').css('left',left);
					  $('.tab_cf').removeClass('mt13');
				}
				else{
					$('#stop').removeClass('stop');
					$('.tab_cf').addClass('mt13');
				}
				
			
			});

		$(".sq_hd").click(function(){
			$(".sq_bd").show('normal');
		});
		$(".sq_ft").click(function(){
			$(".sq_bd").hide('normal');
		});

		$(".zs_sqxl").click(function(){
			$(this).siblings(".dnone").toggle();
			if($(this).hasClass("zs_zhanshi")){
				$(this).removeClass("zs_zhanshi");
				$(this).addClass("bgzs");
				$(".zujin").removeClass("borno");
			}else if($(this).hasClass("bgzs")){
				$(this).removeClass("bgzs");
				$(this).addClass("zs_zhanshi");
				$(".zujin").addClass("borno");
			}
		});

		$(".tab_tit .tt1").click(function(){
			$(this).addClass("bg_rjt");
			$(this).siblings().removeClass("bg_rjt");
			$(".tm1").show();
			$(".tm2").hide();
		});
		$(".tab_tit .tt2").click(function(){
			$(this).addClass("bg_rjt");
			$(this).siblings().removeClass("bg_rjt");
			$(".tm2").show();
			$(".tm1").hide();
		});

		$(".r_xpic li").mouseenter(function(){
			$(this).children().first().css("opacity","0.8");
			$(this).children().css("color","#e03b36");
		});
		$(".r_xpic li").mouseleave(function(){
			$(this).children().first().css("opacity","1");
			$(this).children().css("color","#494949");
		});

		$(".xq_szcf li").mouseenter(function(){
			$(this).children().first().css("opacity","0.8");
			$(this).children().css("color","#e03b36");
		});
		$(".xq_szcf li").mouseleave(function(){
			$(this).children().first().css("opacity","1");
			$(this).children().css("color","#494949");
		});

		$(".lei_li li").mouseenter(function(){
			$(this).children().first().css("opacity","0.8");
			$(this).children().css("color","#e03b36");
		});
		$(".lei_li li").mouseleave(function(){
			$(this).children().first().css("opacity","1");
			$(this).children().css("color","#494949");
		});

		$(".lp_bt li").mouseenter(function(){
			$(this).children().first().css("background","#f7f7f7");
			$(this).children().next().hide();
		});
		$(".lp_bt li").mouseleave(function(){
			$(this).children().first().css("background","white");
			$(this).children().next().hide();
		});

		$(".ic_lb").click(function(){
			$(this).addClass("ic_lb01");
			$(".ic_dt").removeClass("ic_dt01");
			$(".ic_bt").removeClass("ic_bt01");
			$(".lp_lb").show();
			$(".lp_bt").hide();
			$(".lp_dt").hide();
		});
		$(".ic_dt").click(function(){
			$(this).addClass("ic_dt01");
			$(".ic_lb").removeClass("ic_lb01");
			$(".ic_bt").removeClass("ic_bt01");
			$(".lp_dt").show();
			$(".lp_bt").hide();
			$(".lp_lb").hide();
		});
		$(".ic_bt").click(function(){
			$(this).addClass("ic_bt01");
			$(".ic_dt").removeClass("ic_dt01");
			$(".ic_lb").removeClass("ic_lb01");
			$(".lp_bt").show();
			$(".lp_lb").hide();
			$(".lp_dt").hide();
		});

		$(".lp_lb li").mouseenter(function(){
			$(this).css("background","#f5f5f5");		
		});
		$(".lp_lb li").mouseleave(function(){
			$(this).css("background","white");		
		});


		$(".ct_yzyq li").last().css("border-bottom","none");
		$(".lastli02 li").last().css("border-bottom","none");
		$(".lastli01 li").last().css("border-bottom","none");

		$(".ct_yzyq li").mouseenter(function(){
			$(this).addClass("libor").siblings().removeClass("libor");
		});

		$(".zxtj_tuw").last().css("padding-right","0px");

		$(".cfjx_nav span").mouseenter(function(){
			$(this).addClass("jxlx_line").siblings().removeClass("jxlx_line");
		});
		$(".ct_cfjx").mouseenter(function(){
			$("#cfjx").show();
			$("#xplx").hide();
		});
		$(".ct_xplx").mouseenter(function(){
			$("#xplx").show();
			$("#cfjx").hide();
		});

		$(".re_zq span").click(function(){
			$(this).addClass("gray_jt").siblings().removeClass("gray_jt");
		});


		$("#b_rmcs").click(function(){
			$(".bot_rmcs").hide();
			$(".m_l_r12").show();
			$(".hot_ck").hide();
		});
		$("#b_zqzd").click(function(){
			$(".bot_rmcs").show();
			$(".m_l_r12").hide();
			$(".hot_ck").hide();
		});
    	$("#b_ck").click(function(){
    	    $(".hot_ck").show();
    	    $(".bot_rmcs").hide();
    	    $(".m_l_r12").hide();
    	});
		$(".ct_yzyq ul li").mouseenter(function(){
			$(".tuwen").hide(); $(".tuwen").eq($(this).index()).show(); 
		 });
		
		$(".tuwen").first().css("display","block");

		$(".li_new li").mouseenter(function(){
			$(this).children().css("color","#e03b36");
			$(".icon_ptu").css("color","white");
		});
		$(".li_new li").mouseleave(function(){
			$(this).children().css("color","#808080");
			$(this).children().next().css("color","#444");
			$(this).children().last().css("color","#444");
			$(".icon_ptu").css("color","white");
		});

		$(".sz_shuq").mouseenter(function(){
			$(".sq_topclose").show();
		});
		$(".sz_shuq").mouseleave(function(){
			$(".sq_topclose").hide();
		});
		$(".sq_topclose").click(function(){
			$(".sz_shuq").hide();
		});

		$(".jjr_ppic li").mouseenter(function(){
			$(this).children().css("color","#e03b36");
		});
		$(".jjr_ppic li").mouseleave(function(){
			$(this).children().css("color","#666");
		});

		$(".yzcf_all").mouseenter(function(){
			$(".pic_sfxf").show();
		});
		$(".yzcf_all").mouseleave(function(){
			$(".pic_sfxf").hide();
		});

		$(".xzl_all").mouseenter(function(){
			$(".pic_sfxf1").show();
		});
		$(".xzl_all").mouseleave(function(){
			$(".pic_sfxf1").hide();
		});

		$(".pic_sfxf").mouseenter(function(){
			$(this).css("opacity",0.6);
		});
		$(".pic_sfxf").mouseleave(function(){
			$(this).css("opacity",0.35);
		});
	}
);