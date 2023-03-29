$(function(){$("#area").change(function(){
	$.get("/cf-gettown.html",{aid:$('#area').val()},
			function(data){
				$('#town option').remove();
				$('#town').append(data);
			}
	);
});
	$("#tj").click(function(){
		var semUrl = window.location.href;
		var name=$("#name").val();
		var tel=$("#tel").val();
		var area=$("#area").val();
		var town=$("#town").val();
		var cftype=$("#cftype").val();
		var demandType=$("#demandType").val();
		if (name=='' || name=='请输入您的称呼')
		{
			$("#name").focus();
			alert("请输入您的称呼");
			return false;

		}
		if (tel=='' || tel=='请输入您的手机号码')
		{
			$("#tel").focus();
			alert("请输入您的手机号码");
			return false;

		}
		if(!$("#tel").val().match(/^(0\d{2,3}-\d{7,8})|(1[3456789]\d{9})$/)){
			alert('号码格式不正确');
			$('#tel').focus();
			return false;
		}
		if (area=='0')
		{
			$("#area").focus();
			alert("请选择区");
			return false;

		}


		$.get("/cf-demand.html",{name:name,tel:tel,area:area,town:town,cftype:cftype,semUrl:semUrl,demandType:demandType},
				function(data){
					alert(data);
					$("#tel").val("");
					$("#name").val("");

				}
		);


	});
	$("#area1").change(function(){
		$.get("/cf-gettown.html",{aid:$('#area1').val()},
				function(data){
					$('#town1 option').remove();
					$('#town1').append(data);
				}
		);
	})
	$("#tj1").click(function(){
		var semUrl = window.location.href;
		var name=$("#name1").val();
		var tel=$("#tel1").val();
		var area=$("#area1").val();
		var town=$("#town1").val();
		var cftype=$("#cftype").val();
        var demandType=$("#demandType").val();
		if (name=='' || name=='请输入您的称呼')
		{
			$("#name1").focus();
			alert("请输入您的称呼");
			return false;

		}
		if (tel=='' || tel=='请输入您的手机号码')
		{
			$("#tel1").focus();
			alert("请输入您的手机号码");
			return false;

		}
		if(!$("#tel1").val().match(/^(0\d{2,3}-\d{7,8})|(1[3456789]\d{9})$/)){
			alert('号码格式不正确');
			$('#tel1').focus();
			return false;
		}
		if (area=='0')
		{
			$("#area1").focus();
			alert("请选择区");
			return false;

		}


		$.get("/cf-demand.html",{name:name,tel:tel,area:area,town:town,cftype:cftype,semUrl:semUrl,demandType:demandType},
				function(data){
					alert(data);
					$("#tel1").val("");
					$("#name1").val("");

				}
		);
	})

	var flag = "top";
	function DY_scroll(img,prev,next,speed,or,num,ad){
		var wraper;
		var prev = $(prev);
		var next = $(next);
		var img = $(img).find('ul');
		var h = img.find('li').outerHeight(true);
		var s = speed;
		function nextclick(){
			img.animate({'margin-top':-h},function(){
				img.find("li:lt("+num+")").appendTo(img);
				img.css({'margin-top':0});
			});
			flag = "top";
		};
		function prevclick(){
			img.find('li:last').prependTo(img);
			img.css({'margin-top':-h});
			img.animate({'margin-top':0});
			flag = "bottom";
		};
		next.click(function(){
			img.animate({'margin-top':-h},function(){
				img.find("li:lt("+num+")").appendTo(img);
				img.css({'margin-top':0});
			});
			flag = "top";
		});
		prev.click(function(){
			img.find("li:lt("+num+")").prependTo(img);
			img.css({'margin-top':-h});
			img.animate({'margin-top':0});
			flag = "bottom";
		});
		if (or == true){
			ad = setInterval(function() { flag == "top" ? next.click() : prev.click()},s*1500);
			img.hover(function(){clearInterval(ad);},function(){ad = setInterval(function() {flag == "top" ? next.click() : prev.click()},s*1500);});
		}
	}

	$(document).ready(function(){
		DY_scroll('.yzcfauto','.yzcf_prev','.yzcf_next',2,true,4,'ad1');
		DY_scroll('.jjr_ppic','.jjr_prev','.jjr_next',2,true,3,'ad2');
		DY_scroll('.xzlauto','.xzl_prev','.xzl_next',2,true,4,'ad3');
	})

})
