$(document).ready(
				function(){
					var nowshowpic = 0;
					$(".rightbut")[0].onclick = you;
					$(".leftbut")[0].onclick = null;
					$(".rightbut")[0].onmousemove = youhover;
					$(".rightbut")[0].onmouseout = youpingshi;

					$(".p_xiaotu li").mouseenter(
						function(){
							$(this).css("border","1px solid #ff0700").siblings().css("border","1px solid white");
							$(".p_datu img").attr("src",$(this).children("img").attr("src"));
							$(".p_datu img").attr("alt",$(this).children("img").attr("alt"));
							$(".p_datu img").attr("title",$(this).children("img").attr("title"));
						}
					);


					function you(){
						if(!$("#p_cfzs .p_xiaotu ul").is(":animated")){
							nowshowpic++;
							if(nowshowpic == 0){
								//从按钮的颜色讨论：
								$(".leftbut").css("background-position","-68px 0px");
								$(".rightbut").css("background-position","-17px 0px");
								//从按钮监听讨论：
								$(".leftbut")[0].onclick = null;
								$(".leftbut")[0].onmousemove = null;
								$(".leftbut")[0].onmouseout = null;

								$(".rightbut")[0].onclick = you;
								$(".rightbut")[0].onmousemove = youhover;
								$(".rightbut")[0].onmouseout = youpingshi;
							}
							else if(0 < nowshowpic && nowshowpic < 4){
								//从按钮的颜色讨论：
								$(".leftbut").css("background-position","0px 0px");
								$(".rightbut").css("background-position","-17px 0px");
								//从按钮监听讨论：
								$(".leftbut")[0].onclick = zuo;
								$(".leftbut")[0].onmousemove = zuohover;
								$(".leftbut")[0].onmouseout = zuopingshi;

								$(".rightbut")[0].onclick = you;
								$(".rightbut")[0].onmousemove = youhover;
								$(".rightbut")[0].onmouseout = youpingshi;
							}
							else if(nowshowpic >= 4)
							{
								//从按钮的颜色讨论：
								$(".leftbut").css("background-position","0px 0px");
								$(".rightbut").css("background-position","-85px 0px");
								//从按钮监听讨论：
								$(".leftbut")[0].onclick = zuo;
								$(".leftbut")[0].onmousemove = zuohover;
								$(".leftbut")[0].onmouseout = zuopingshi;

								$(".rightbut")[0].onclick = null;
								$(".rightbut")[0].onmousemove = null;
								$(".rightbut")[0].onmouseout = null;
							}
							$("#p_cfzs .p_xiaotu ul").animate(
								{
									"left":nowshowpic*(-64)
								},500
							);
						}
					}

					function zuo(){
						if(!$("#p_cfzs .p_xiaotu ul").is(":animated")){
							nowshowpic--;
							if(nowshowpic == 0){
								//从按钮的颜色讨论：
								$(".leftbut").css("background-position","-68px 0px");
								$(".rightbut").css("background-position","-17px 0px");
								//从按钮监听讨论：
								$(".leftbut")[0].onclick = null;
								$(".leftbut")[0].onmousemove = null;
								$(".leftbut")[0].onmouseout = null;

								$(".rightbut")[0].onclick = you;
								$(".rightbut")[0].onmousemove = youhover;
								$(".rightbut")[0].onmouseout = youpingshi;
							}
							else if(0 < nowshowpic && nowshowpic < 4){
								//从按钮的颜色讨论：
								$(".leftbut").css("background-position","0px 0px");
								$(".rightbut").css("background-position","-17px 0px");
								//从按钮监听讨论：
								$(".leftbut")[0].onclick = zuo;
								$(".leftbut")[0].onmousemove = zuohover;
								$(".leftbut")[0].onmouseout = zuopingshi;

								$(".rightbut")[0].onclick = you;
								$(".rightbut")[0].onmousemove = youhover;
								$(".rightbut")[0].onmouseout = youpingshi;
							}
							else if(nowshowpic >= 4)
							{
								//从按钮的颜色讨论：
								$(".leftbut").css("background-position","0px 0px");
								$(".rightbut").css("background-position","-85px 0px");
								//从按钮监听讨论：
								$(".leftbut")[0].onclick = zuo;
								$(".leftbut")[0].onmousemove = zuohover;
								$(".leftbut")[0].onmouseout = zuopingshi;

								$(".rightbut")[0].onclick = null;
								$(".rightbut")[0].onmousemove = null;
								$(".rightbut")[0].onmouseout = null;
							}
							$("#p_cfzs .p_xiaotu ul").animate(
								{
									"left":nowshowpic*(-64)
								},500
							);
						}
					}

					function zuohover(){
						$(".leftbut").css("background-position","-34px 0");
					}
					function youhover(){
						$(".rightbut").css("background-position","-51px 0");
					}
					function zuopingshi(){
						$(".leftbut").css("background-position","0 0");
					}
					function youpingshi(){
						$(".rightbut").css("background-position","-17px 0");
					}

					$("#xg_close").click(function(){
						$(".xq_xgtj").hide();
					});
				}
			);