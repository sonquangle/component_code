$("#tab-first").on("mousemove", function() {
	
	if ($("#tab-first").find("#username").val().trim() != "") {
		$("#tab-first").find("#username").addClass("has-val");
	} 
	if ($("#tab-first").find("#password").val().trim() != "") {
		$("#tab-first").find("#password").addClass("has-val");
	}
	
});
$(".container-login100").on("mousemove",function() {
	
		if ($(this).val().trim() != "") {
			$(this).addClass("has-val");
		}
		
		
	
});
var list ;
let toast = new ToastClass();
$("#tab-first").on("keyup",".input100",function(){
	
	if (event.keyCode == 13 || event.which == 13) {
		  $('#login').click();
		  };
});
$("#tab-first").on("click", "#login", function() {
	let userData = {
		username : $("#username").val(),
		password : $("#password").val(),
	};

	$.ajax({
		contentType : "application/json",
		type : "POST",
		url : "/login",
		data : JSON.stringify(userData),
		statusCode : {
			200 : function(data) {
				if (data === "Success") {
					noti = "Đăng nhập thành công !";
					toast.showSuccess({
						text : noti,
						duration : 1000,
						onHide : function() {
						},
					});

					location.href = "/";
				} else if (data === "Admin") {
					noti = "Đăng nhập thành công !";
					toast.showSuccess({
						text : noti,
						duration : 1000,
						onHide : function() {
						},
					});
					nextPrev(1);
					$.ajax({
						contentType : "application/json",
						type : "GET",
						url : "/get-orgs",
						statusCode:{
							200: function(data){
								list = data;
								
								 $("#orgId").empty();
								 $("#clientId").empty();
							        var option = "<option value = '0' >Toàn bộ tổ chức </option>";
						            $("#orgId").append(option);
						            var option2="<option value ='0' > Toàn bộ doanh nghiệp </option>";
						            $("#clientId").append(option2);
							        data.forEach(function(item, i) {
							            var option = "<option value = '" + item.orgDto.orgId + "' >" + item.orgDto.name +  "</option>";
							            $("#orgId").append(option);
							            var client = item.clientDtos;
							            
							            client.forEach(function(item2,x){
							            	var option2="<option value= '" + item2.clientId+"' >" + item2.firstname +" "+item2.lastname+"</option>";
							            	$("#clientId").append(option2);
							            });
							        });
							}
						}
					});
					if(getCookie("orgId") != null && getCookie("orgId") != ""){
						 $("#orgId").empty();
						 $("#clientId").empty();
					        var option = "<option value = '0' >Toàn bộ tổ chức </option>";
				            $("#orgId").append(option);
				            var option2="<option value ='0' > Toàn bộ doanh nghiệp </option>";
				            $("#clientId").append(option2);
					        list.forEach(function(item, i) {
					            if(getCookie("orgId") == item.orgDto.orgId){
					            	var option = "<option value = '" + item.orgDto.orgId + "' selected='selected' >" + item.orgDto.name +  "</option>";
					 	            $("#orgId").append(option);
					            	var client = item.clientDtos;
					            	client.forEach(function(item2,x){
					            		var option2="<option value= '" + item2.clientId+"' >" + item2.firstname +" "+item2.lastname+"</option>";
					            		$("#clientId").append(option2);
					            	});
					            }else{
					            	var option = "<option value = '" + item.orgDto.orgId + "'  >" + item.orgDto.name +  "</option>";
					 	           
					            }
					        });
					};
				} else {
					noti = "Đăng nhập thất bại !";
					toast.show({
						text : noti,
						duration : 1000,
						onHide : function() {
						},
					});
				}
			},
		},
	});
});

 $(document).ready(function(){
	
	
 });

var currentTab = 0;
showTab(currentTab);

function showTab(n) {
	var x = document.getElementsByClassName("tab");
	x[n].style.display = "block";
	if (n == 0) {
		$("#tab-first").load("/js/dataLogin.html #tab-first");
		
		$("#img-background").attr("style",
				"background-image: url('img/bg-01.jpg')");
	
	} else {
		$("#tab-second").load("/js/dataLogin.html #tab-second");

		$("#img-background").attr("style",
				"background-image: url('img/login.jpg')");
	}
	if (n == x.length - 1) {
		// document.getElementById("nextBtn").innerHTML = "Submit";
	} else {
		// document.getElementById("nextBtn").innerHTML = "Next";
	}
	
	// fixStepIndicator(n);
}


	setTimeout(function(){
		$('#tab-first').find('#username').focus();
	
			 $('#tab-first').find('.input100').addClass("has-val");
		
		}, 400);
	
	
$("#tab-second").on("click", "#prevBtn", function() {
	nextPrev(-1);
});

function nextPrev(n) {
	var x = document.getElementsByClassName("tab");
	if (n == 1 && !validateForm())
		return false;
	x[currentTab].style.display = "none";
	currentTab = currentTab + n;
	if (currentTab >= x.length) {
		document.getElementById("orderStatusForm").submit();
		return false;
	}
	showTab(currentTab);
}

function validateForm() {
	var x, y, i, valid = true;
	x = document.getElementsByClassName("tab");
	y = x[currentTab].getElementsByTagName("input");
	for (i = 0; i < y.length; i++) {
		if (y[i].value == "") {
			y[i].className += " invalid";
			valid = false;
		}
	}
	// if (valid) {
	// document.getElementsByClassName("step")[currentTab].className += "
	// finish";
	// }
	return valid;
}
$(document).ready(function() {
	$("#tab-second").on("change", "#orgId", function() {
        var orgId = $("#orgId").val();
        if(orgId != '0'){
    	 $("#orgId").empty();
		 $("#clientId").empty();
	        var option = "<option value = '0' >Toàn bộ tổ chức </option>";
            $("#orgId").append(option);
            var option2="<option value ='0' > Toàn bộ doanh nghiệp </option>";
            $("#clientId").append(option2);
	        list.forEach(function(item, i) {
	            if(orgId == item.orgDto.orgId){
	            	var option = "<option value = '" + item.orgDto.orgId + "' selected='selected' >" + item.orgDto.name +  "</option>";
	 	            $("#orgId").append(option);
	            	var client = item.clientDtos;
	            	client.forEach(function(item2,x){
	            		var option2="<option value= '" + item2.clientId+"' >" + item2.firstname +" "+item2.lastname+"</option>";
	            		$("#clientId").append(option2);
	            	});
	            }else{
	            	var option = "<option value = '" + item.orgDto.orgId + "'  >" + item.orgDto.name +  "</option>";
	 	            $("#orgId").append(option);
	            }
	        });
        }
    });
});

$(document).ready(function() {
	$("#tab-second").on("change", "#clientId", function() {
        var clientId = $("#clientId").val();
        var orgId = 0;
      
        		$("#orgId").empty();
        		$("#clientId").empty();
        		var option = "<option value = '0' >Toàn bộ tổ chức </option>";
        		$("#orgId").append(option);
        		var option2="<option value ='0' > Toàn bộ doanh nghiệp </option>";
        		$("#clientId").append(option2);
        		list.forEach(function(item, i) {
        			var client = item.clientDtos;
        			client.forEach(function(item2,x){
        				if(clientId == item2.clientId){
        					orgId = item2.orgId;
        				}
        			});
        			if(orgId == item.orgDto.orgId){
        				var option = "<option value = '" + item.orgDto.orgId + "' selected='selected' >" + item.orgDto.name +  "</option>";
        				$("#orgId").append(option);
        				var client = item.clientDtos;
        				client.forEach(function(item2,x){
        					if(clientId==item2.clientId){
        						var option2="<option value= '" + item2.clientId+"' selected='selected'>" + item2.firstname +" "+item2.lastname+"</option>";
        						$("#clientId").append(option2);
        					}else{
        						var option2="<option value= '" + item2.clientId+"' >" + item2.firstname +" "+item2.lastname+"</option>";
        						$("#clientId").append(option2);
        					}
        				});
        			}else{
        				var option = "<option value = '" + item.orgDto.orgId + "'  >" + item.orgDto.name +  "</option>";
	 	    	       $("#orgId").append(option);
        			}
        		});

    });
});


function loginAdmin(){
	 var clientId = $("#clientId").val();
	 var orgId = $("#orgId").val();
	 document.cookie = "clientId="+clientId;
	 document.cookie = "orgId="+orgId;
	 location.href="/";
	 
}

