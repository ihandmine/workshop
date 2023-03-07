$(document).ready(
				function(){
					//在程序运行的时候，只让第1个li显示，其余隐藏。
					$("#sz_lunbo #sz_tupian ul li").eq(0).show().siblings().hide();
					//将有多少张图片存入变量
					var picamount = $("#sz_lunbo #sz_tupian ul li").length;	
					//利用循环语句，添加小圆点。让小圆点的个数，和图片个数一样多。
					for(var i = 0 ; i < picamount ; i++){
						$("#sz_lunbo #sz_xiaoyuandian ul").append("<li></li>");
					}
					//设置信号量，表示当前显示图片的id
					var nowshowpic = 0 ; 
					//这是设置自动滚动的时间间隔的 ↓ 
					var jiangeshijian = 3500;
					//调用设置小圆点函数，使初始状态，第一个小圆点是蓝色
					shezhixiaoyuandian(0);
					shezhilianjie(0);

					//让页面每2000毫秒自动轮播
					var mytimer = window.setInterval(
						function(){
							$("#sz_lunbo #sz_anniu .you").trigger("click");
						},jiangeshijian);

					//给右边按钮添加事件监听
					$("#sz_lunbo #sz_anniu .you").click(
						function(){
							if(!$("#sz_zhezhao").is(":animated")){
								//折腾信号量，如果不是最后一张，就加1。否则变成0
								//不用改 ↓ 
								if(nowshowpic != picamount - 1){
									nowshowpic ++ ;
								}else{
									nowshowpic = 0;
								}
								huantu(nowshowpic);
								shezhixiaoyuandian(nowshowpic);
								shezhilianjie(nowshowpic);
							}
						}
					);

					//给左边按钮添加事件监听
					$("#sz_lunbo #sz_sz_anniu .zuo").click(
						function(){
							if(!$("#sz_zhezhao").is(":animated")){
								//折腾信号量，如果不是最后一张，就加1。否则变成0
								//不用改 ↓ 
								if(nowshowpic != 0){
									nowshowpic -- ;
								}else{
									nowshowpic = picamount - 1;
								}
								huantu(nowshowpic);
								shezhixiaoyuandian(nowshowpic);
								shezhilianjie(nowshowpic);
							}
						}
					);

					$("#sz_lunbo #sz_xiaoyuandian ul li").click(
						function(){
							if(!$("#sz_zhezhao").is(":animated")){
								//让信号量的值变为自己的值
									nowshowpic = $(this).index();
								//调用换图函数
									huantu(nowshowpic);
								//调用设置小圆点函数
									shezhixiaoyuandian(nowshowpic);
								//调用设置连接函数
									shezhilianjie(nowshowpic);
							}
						}
					);

					//当鼠标进入遮罩层的时候，停止自动滚动
					$("#sz_zhezhao,#sz_xiaoyuandian,#sz_anniu").mouseover(
						function(){
							window.clearInterval(mytimer);
							console.log("表已经停止")
						}
					);

					//当鼠标离开遮罩层的时候，开始自动滚动
					$("#sz_zhezhao,#sz_xiaoyuandian,#sz_anniu").mouseout(
						function(){
							window.clearInterval(mytimer);	//设表先关原则
							mytimer = window.setInterval(
								function(){
								$("#sz_lunbo #sz_anniu .you").trigger("click");
								},jiangeshijian);
							console.log("表已经开始")
						}
					);

					//这是设置小圆点函数，功能就是根据指定的num，来让第num个小圆点变蓝。其余变白。
					function shezhixiaoyuandian(num){
						//只让第num个li有cur，其余没有cur
						$("#sz_lunbo #sz_xiaoyuandian ul li").eq(num).addClass("cur").siblings().removeClass("cur");
					}
					
					//这是设置连接的函数，功能是让遮罩上的猫腻a标签的href，等于当前图片a的href
					function shezhilianjie(num){
						// 不用改 ↓
						$("#sz_lunbo #sz_zhezhao a").attr("href",$("#sz_tupian ul li").eq(num).children("a").attr("href"));
					}
					
					//这是换图函数，功能就是根据指定的num，来呼吸切换图片
					function huantu(num){
						$("#sz_lunbo #sz_zhezhao").animate(
							{
								"opacity":0.3
							},500,
							function(){
								$("#sz_lunbo #sz_tupian ul li").eq(num).show().siblings().hide();
							}
						).animate(
							{
								"opacity":0
							},500
						);
					}
				}
			);