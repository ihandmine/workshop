
			
$(function(){

	
			$(".nav ul li").mouseenter(
						function(){
							
							 $(this).children("a").css("background","yellow");
						}
					);
					
					$(".nav ul li").mouseleave(
						function(){
							
							 $(this).children("a").css("background","");
						}
					);
		});

		


			
	
function getCookie(name){
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg)){
				return (arr[2]);
			}else{
				return null;
			}
		}
		var _cookie=getCookie('visit_mode');
		var run=0;
	var rtime;
	function time(){
		ChangeCity(0);
		clearTimeout(rtime);
	}
	function ChangeCity(show){
		$("#popwindow").css("position","absolute");
		$("#popwindow").css("top",40);
		if($.browser.msie)
			$("#popwindow").css("left",20);
		else
			$("#popwindow").css("left",20);
		if(show==1){
			$("#popwindow").slideDown("normal",function(){run=0});
		}else{
			$("#popwindow").slideUp("normal",function(){run=0});
		}
	}

	 function xiaoshi(obj) {
            obj.value = "";
        }
        function xianshi(obj, message) {
            if (obj.value == null || obj.value == "")
                obj.value = message;
        }

        /*
        导航条.显示函数
        */
        function block_show(id,isHome) {
            var list = document.getElementsByClassName("n_ejmenu FR");
            for(var i=0,j = list.length;i < j;i++ ){
                list[i].style.display = "none";
            }
            if (!isHome) {
                document.getElementById(id).style.display = "block";
                document.getElementById("line").style.display = "none";
            }
            else {
                document.getElementById("line").style.display = "block";
            }
        }

        function SelText(obj) {
            document.getElementById("ct_input").value = obj.innerHTML;
            document.getElementById("s_xlmenu").style.display = "none";
        }

        function xiala(id,isShow) {
            var _disply = "none";
            if(isShow)
                _disply = "block";
            document.getElementById(id).style.display = _disply;
        }
		function xiala1(){
            document.getElementById("ywhz").style.background="url(/template/default/pc/skin/images/zs_topnavlibg2.jpg) no-repeat center";
            document.getElementById("jtxl").style.display="block";
        }
        function xiala2(){
            document.getElementById("ywhz").style.background="url(/template/default/pc/skin/images/zs_topnavlibg1.jpg) no-repeat center";
            document.getElementById("jtxl").style.display="none";
        }
		function nav_show(obj){
           $(obj).find(".xl").css("display","block");
        }
	function nav_hide(obj){
            $(obj).find(".xl").css("display","none");
        }
		
$(document).ready(function(){
	
	
			

				var wid=$("#cd").parent().width();
				$("#cd").width(wid);
				var wid2=$("#cd2").parent().width();
				$("#cd2").width(wid2);
				var wid3=$("#cd3").parent().width();
				$("#cd3").width(wid3);

				var wid=$("#cd").parent().width();
				$("#cd").width(wid);
				var wid2=$("#cd2").parent().width();
				$("#cd2").width(wid2);
				var wid3=$("#cd3").parent().width();
				$("#cd3").width(wid3);

				//头部结束




			
					//厂房列表
      

	}
);

