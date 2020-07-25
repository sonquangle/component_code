<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<header id="hidden-mb" class="bg-header">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-4 avatar-content--align">
                <a href="/"> <img id="clientAva" class="img-responsive img-align">
                </a> <label id="clientName" class="brand-name" style="padding:0 0 0 10px;margin: 0;"></label>
                <a class="hidden-lg">
                    <div>
                        <img id="budget_res" src="<%=request.getContextPath()%>/images/trangchu/econometrics.png"
                            width="40" height="40"></div>
                </a>
            </div>
            <div class="form-search col-xs-6 col-lg-4 col-md-4 hidden-mb">

            </div>
            <div class="hidden-lg">

            </div>
            <div class="col-xs-5 col-lg-4 col-md-4 budget">
                <div class="dropdown" style="padding-top: 10px;">
                    <img id="budget_project" src="<%=request.getContextPath()%>/images/trangchu/econometrics.png"
                        width="40" height="40">
                    <div class="dropdown-content dropdown-menu-right" style="z-index:1000">
                        <ul id="finance" class="bg-gold">

                        </ul>
                    </div>
                </div>
                <div>
                    <div id="orderNo" class="list-header">
                        <i class="fa fa-rocket fa-lg" aria-hidden="true"></i>
                        Tra Mã Vận Đơn
                    </div>
                    <li id="searchNo" class="search-order" style="display: none;margin-top: 13px;">
                        <button id="btnSearchOrder" class="button-search-default">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                        <input id="searchOrder" type="text" placeholder="Tra cứu vận đơn." class="form-control"
                            style="width:170px;margin:0 10px 0 10px">
                    </li>
                </div>


                <div class="list-header"><a href="http://192.168.1.12:8060/"><i class="fa fa-btc fa-lg"
                            aria-hidden="true"></i> Kênh người
                        bán</a></div>
            </div>
        </div>
        <div id="authentication">
            <nav class="navbar navbar-inverse" data-spy="affix" data-offset-top="125">
                <div class="container-fluid">
                    <ul class="nav navbar-nav" id="myTopnav">
                        <li class="dropdown">
                            <a class="dropdown-toggle color" data-toggle="dropdown" href="#">Danh mục <span
                                    class="caret"></span></a>
                            <ul class="dropdown-menu main-menu">
                                <c:forEach var="catelv1" items="${categoryLv1s}">
                                    <li class="dropdown-submenu">
                                        <a class="menu1" tabindex="-1"
                                            href="/danhmucsanpham?id=${catelv1.getProductCategoryId()}">${catelv1.getName()}</a>
                                        <div class="dropdown-menu-2nd">
                                            <div class=" menu-block">
                                                <c:forEach var="catelv2" items="${catelv1.getCategoryLv2()}">
                                                    <ul class="menu-block--list">
                                                        <a class="" tabindex="-1"
                                                            href="/danhmucsanpham?id=${catelv2.getProductCategoryId()}"><Strong>${catelv2.getName()}</Strong></a>
                                                        <c:forEach var="catelv3" items="${catelv2.getCategoryLv3()}">
                                                            <li>
                                                                <a class="" tabindex="-1"
                                                                    href="/danhmucsanpham?id=${catelv3.getProductCategoryId()}">${catelv3.getName()}</a>
                                                            </li>
                                                        </c:forEach>
                                                    </ul>
                                                </c:forEach>
                                            </div>
                                        </div>
                                    </li>
                                </c:forEach>
                            </ul>

                        </li>
                        <!-- search list -->
                        <li><a href="/gioithieu" class="color">Giới thiệu</a></li>
                        <li><a class=" color" href="/tonghop">Tổng hợp</a></li>
                        <li><a class=" color" href="/hoatdongtintuc">Hoạt Động</a></li>
                        <li id='allClient' class="dropdown none"><a class="dropdown-toggle color" data-toggle="dropdown"
                                href="#">Liên kết
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu" id="myUL">
                                <input type="text" id="myInput" onkeyup="myFunctionsearch()"
                                    placeholder="Tìm kiếm...">
                            </ul>
                        </li>
                        <li>
                            <div class="search-form">
                                <button class="button-search-default" onclick="searchProductBtn()">
                                    <i class="glyphicon glyphicon-search"></i>
                                </button>
                                <input id="searchForm" onkeypress="searchProduct(event)" type="text"
                                    placeholder="Tìm kiếm sản phẩm ..." class="form-control">
                            </div>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">

                        <c:if test="${cookie.ACCESS_TOKEN == null || cookie.ACCESS_TOKEN == ''}">
                            <li>
                                <a href="#" class="color" data-toggle="modal" data-target="#modalLogin" id="Login">
                                    <i class="fa fa-sign-in fa-lg" aria-hidden="true"></i>
                                    Đăng Nhập
                                </a>
                            </li>
                        </c:if>
                        <c:if test="${cookie.ACCESS_TOKEN != null && cookie.ACCESS_TOKEN != ''}">
                            <li class="dropdown">
                                <a id="userInformation" class="dropdown-toggle color" data-toggle="dropdown">
                                    <img style="width:20px;height:20px;border-radius:50%">
                                    <span></span>
                                </a>
                                <ul id="account" class="dropdown-menu dropdown-account dropdown-menu-right">
                                    <li><a id="user" href="/user">Tài khoản của tôi</a></li>
                                    <li><a href='/user/order'>Đơn mua hàng</a></li>
                                    <li><a href="#" onclick="logout()" class="font-logout">Đăng xuất</a></li>
                                </ul>
                            </li>
                        </c:if>
                        <li>
                            <a href="/cart" class="color" style="position: relative;">
                                <i class="fa fa-shopping-basket fa-lg rotateCart" style="font-size: 22px;
                                " aria-hidden="true"></i>
                                <cart-effect :number="totalCartMini"></cart-effect>
                                <span> Giỏ Hàng </span>
                            </a>
                        </li>
                    </ul>

                </div>

            </nav>
            <div id="forgotPw" class="modal fade" role="dialog">
                <div class="modal-dialog">
                    <!-- Modal content-->
                    <div class="modal-content" style="width:300px">
                        <div class="modal-header">
                            <h4 class="modal-title">Quên Mật Khẩu</h4>
                        </div>
                        <div v-if="!modalRefreshPassword" class="modal-body">
                            <p>Vui lòng cung cấp email hoặc số điện thoại đăng nhập để lấy lại mật khẩu.</p>
                            <input v-model="formLogin.username" type="text"
                                placeholder="Nhập Email hoặc số điện thoại" class="form-control"
                                style="margin:10px 0;width:270px" required>
                            <el-button class="button-none button-login" :loading="loadingBtn"
                                v-on:click="refreshPassword">
                                <span style="font-size:medium;">Gửi Đi</span>
                            </el-button>
                        </div>

                        <div v-else class="modal-body">
                            <el-form :rules="rulesResetPassword" :model="formResetPassword" ref="formResetPassword">
                                <p>Kiểm tra mail để lấy mã xác nhận<br />Mã xác nhận có hiệu lực trong vòng 15 phút</p>
                                <el-form-item prop="code">
                                    <el-input v-model.number="formResetPassword.code" type="code" autocomplete="number"
                                        placeholder="Nhập mã xác nhận"></el-input>
                                </el-form-item>
                                <el-form-item prop="password" style="position: relative;">
                                    <el-input id="newPw" v-model="formResetPassword.password" type="password"
                                        placeholder="Nhập mật khẩu mới"></el-input>
                                    <span class="newPw" style="position: absolute;right: 10px;"
                                        onclick="seePassword('newPw')">
                                        <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                                    </span>
                                </el-form-item>
                                <br />
                                <el-form-item prop="rePassword" style="position: relative;">
                                    <el-input id="rePw" v-model="formResetPassword.rePassword" type="password"
                                        placeholder="Nhập lại mật khẩu"></el-input>
                                    <span class="rePw" style="position: absolute;right: 10px;"
                                        onclick="seePassword('rePw')">
                                        <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                                    </span>
                                </el-form-item>
                                <br />
                                <el-button class="button-none button-login" :loading="loadingBtn"
                                    v-on:click="subRefreshPassword">
                                    <span style="font-size:medium;">Đổi mật khẩu</span>
                                </el-button>
                            </el-form>
                        </div>

                    </div>

                </div>
            </div>
            <div class="modal" id="modalLogin" role="dialog">
                <div class="modal-dialog">
                    <button type="button" class="btn position-x" data-dismiss="modal">X</button>
                    <div class="modal-content">
                        <div class="modal-body">
                            <div v-if="modalAuthentication">
                                <div class="tab">
                                    <button class="tablinks" onclick="openCity(event, 'login')" id="defaultOpen">Đăng
                                        Nhập
                                    </button>
                                    <button class="tablinks" onclick="openCity(event, 'register')">Tạo Tài
                                        Khoản
                                    </button>
                                </div>
                                <form v-on:submit="subLogin" id="login" class="tabcontent">
                                    <div class="flex-row">
                                        <div class="display-flex-login">
                                            <span>Email/SĐT</span>
                                            <span class="flex-spacer"></span>
                                            <input v-model="formLogin.username" type="text"
                                                placeholder="Nhập Email hoặc số điện thoại" autocomplete="username"
                                                class="form-control login-width" required>
                                        </div>
                                        <div class="display-flex-login">
                                            <span>Mật khẩu</span>
                                            <span class="flex-spacer"></span>
                                            <div style="position: relative;">
                                                <input id="inputPw" v-model="formLogin.password" type="password"
                                                    placeholder="Nhập Mật Khẩu" autocomplete="password"
                                                    class="form-control login-width">
                                                <span class="inputPw" style="position: absolute;right: 10px;top: 5px;"
                                                    onclick="seePassword('inputPw')">
                                                    <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                                                </span>
                                            </div>

                                        </div>
                                        <div class="flex-row form-forgot">
                                            <a id="forgotpassword">Quên mật khẩu | Trợ giúp </a>
                                            <el-button native-type="submit" :loading="loadingBtn"
                                                class="button-none button-login">
                                                <span style="font-size:medium;">Đăng Nhập</span>
                                            </el-button>
                                            <button type="button" class="button-none button-fb"
                                                v-on:click="loginFacebook">
                                                <span class="hidden-small" style="font-size:medium;">
                                                    Đăng nhập bằng Facebook
                                                </span>
                                                <span class="hidden-mb hidden-lg small" style="font-size:medium;">
                                                    Facebook
                                                </span>
                                            </button>
                                            <button type="button" class="button-none button-gg"
                                                v-on:click="loginGoogle">
                                                <span class="hidden-small" style="font-size:medium;">
                                                    Đăng nhập bằng Google</span>
                                                <span class="hidden-mb hidden-lg small"
                                                    style="font-size:medium;">Google</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <div class="flex-row">
                                    <form id="register" v-on:submit="subRegister" action="#" class="tabcontent">
                                        <div class="display-flex-login">
                                            <span style="font-size: 14px;">Họ tên</span>
                                            <span class="flex-spacer"></span>
                                            <input v-model="fullname" type="text" placeholder="Nhập họ tên của bạn"
                                                class="form-control login-width" required>
                                        </div>
                                        <div class="flex-row">
                                            <div class="display-flex-login">
                                                <span>SĐT</span>
                                                <span class="flex-spacer"></span>
                                                <input id="customer-phone" v-model="phone" type="text"
                                                    placeholder="Nhập số điện thoại"
                                                    onkeypress='return event.charCode >= 48 && event.charCode <= 57'
                                                    class="form-control login-width" required
                                                    onkeyup="check_phone(this.id)">
                                            </div>
                                            <div id="phone-result" class="alert-required">
                                                <label id="confirm-result--phone">
                                                </label>
                                            </div>
                                        </div>
                                        <div class="flex-row">
                                            <div class="display-flex-login">
                                                <span>Email</span>
                                                <span class="flex-spacer"></span>
                                                <input id="customer-email" v-model="email" type="email"
                                                    placeholder="Nhập địa chỉ email" class="form-control login-width"
                                                    required autocomplete="username" onkeyup="check_mail(this.id)">
                                            </div>
                                            <div id="email-result" class="alert-required">
                                                <label id="confirm-result--email">
                                                </label>
                                            </div>
                                        </div>
                                        <div class="flex-row">
                                            <div class="display-flex-login">
                                                <span>Mật khẩu</span>
                                                <span class="flex-spacer"></span>

                                                <div style="position: relative;">
                                                    <input id="customer-pw" v-model="password" type="password"
                                                        placeholder="Nhập mật khẩu" class="form-control login-width"
                                                        required autocomplete="password" onkeyup="check_pw(this.id)">
                                                    <span class="customer-pw"
                                                        style="position: absolute;right: 10px;top: 5px;"
                                                        onclick="seePassword('customer-pw')">
                                                        <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                                                    </span>
                                                </div>


                                            </div>
                                            <div id="pw-result" class="alert-required">
                                                <label id="confirm-result--pw">
                                                </label>
                                            </div>
                                        </div>
                                        <div class="flex-row">
                                            <div class="display-flex-login">
                                                <span>Nhập Lại MK</span>
                                                <span class="flex-spacer"></span>

                                                <div style="position: relative;">
                                                    <input id="customer-repw" type="password"
                                                        placeholder="Nhập lại mật khẩu"
                                                        class="form-control login-width" required
                                                        autocomplete="password" onkeyup="check_repw(this.id)">
                                                    <span class="customer-repw"
                                                        style="position: absolute;right: 10px;top: 5px;"
                                                        onclick="seePassword('customer-repw')">
                                                        <i class="fa fa-eye fa-lg" aria-hidden="true"></i>
                                                    </span>
                                                </div>

                                            </div>
                                            <div id="repw-result" class="alert-required">
                                                <label id="confirm-result--repw">
                                                </label>
                                            </div>
                                        </div>
                                        <div id="createCustomer" class="flex-row form-forgot">
                                            <el-button id="btn-submit" native-type="submit" :loading="loadingBtn"
                                                class="button-none button-login">
                                                <span style="font-size:medium;">Tạo tài khoản</span>
                                            </el-button>
                                            <span style="font-size: 12px;">Khi bạn nhấn Đăng ký, bạn đã đồng
                                                ý
                                                thực hiện mọi giao dịch mua bán theo điều kiện sử dụng và
                                                chính
                                                sách của Anttech. Xem <a href="/dieukhoan" target="_blank">Điều khoản
                                                    dịch vụ</a> và <a href="/chinhsach" target="_blank">Chính sách bảo
                                                    mật</a></span>
                                        </div>
                                    </form>
                                </div>

                            </div>
                            <div v-if="!modalAuthentication">
                                <div class="flex-row">
                                    <form v-on:submit="subCode" action="#">
                                        <div class="display-flex-login">
                                            <span>Mã xác nhận </span>
                                            <span class="flex-spacer"></span>
                                            <input v-model="code" type="text" placeholder="Nhập mã"
                                                class="form-control login-width" required>
                                        </div>
                                        <div class="display-flex-login">
                                            <span class="flex-spacer"></span>
                                            <a href="#" v-on:click="refreshCode">
                                                <i class="fa fa-repeat" aria-hidden="true"></i>
                                                Gửi lại mã
                                            </a>
                                        </div>
                                        <div class="flex-row form-forgot" style="margin-top:20px">
                                            <span style="font-size: 10px;">Một email vừa được gửi đến bạn,
                                                kiểm tra mail và nhập mã vào đây.</span>
                                            <el-button native-type="submit" :loading="loadingBtn"
                                                class="button-none button-login">
                                                <span style="font-size:medium;">Xác nhận</span>
                                            </el-button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- chi tiet san pham, phan zoom image, change image when click attribute -->
    <div id="detailItem" class="col-sm-5 col-md-5" style="margin-top:20px">
        <c:if test="${pro.getIsHasCounter()=='Y'}">
            <span class="ribbon-label-top-5th"></span>
        </c:if>
        <c:choose>
            <c:when test="${not empty productImage}">
                <c:forEach var="img" items="${productImage}">
                    <div class="mySlides">
                        <div class="tile" data-scale="1.5" data-image="${productImageUrl}${img.getName()}">
                        </div>
                        <div class="tile-mb zoom">
                            <img src="${productImageUrl}${img.getName()}" class="img-responsive">
                        </div>
                    </div>
                </c:forEach>
            </c:when>
            <c:otherwise>
                <div class="mySlides">
                    <div class="tile" data-scale="1.5"
                        data-image="${productImageUrl}${pro.getImageThumbnail()}">
                    </div>
                    <div class="tile-mb zoom">
                        <img src="${productImageUrl}${pro.getImageThumbnail()}" class="img-responsive">
                    </div>
                </div>
            </c:otherwise>
        </c:choose>
        <div id="bonusSlide" class="mySlides">
            <div id="bonusSlideImg" class="tile" data-scale="1.5"
                data-image="${productImageUrl}${pro.getImageThumbnail()}"></div>
            <div class="tile-mb tile-bonus zoom">
                <img src="${productImageUrl}${pro.getImageThumbnail()}" class="img-responsive">
            </div>
        </div>
        <c:if test="${productImage.size() != 0 && productImage.size() != 1}">
            <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" onclick="plusSlides(1)">&#10095;</a>
        </c:if>
        <div class="row" style="padding: 10px 15px 0 15px;">
            <c:choose>
                <c:when test="${not empty productImage}">
                    <c:forEach var="img" items="${productImage}" varStatus="index">
                        <div class="column">
                            <img class="demo cursor img-slide--small" src="${productImageUrl}${img.getName()}"
                                onclick="currentSlide(${index.count})" alt="">
                        </div>
                    </c:forEach>
                </c:when>
                <c:otherwise>
                    <div class="column">
                        <img class="demo cursor img-slide--small"
                            src="${productImageUrl}${pro.getImageThumbnail()}" onclick="currentSlide(1)" alt="">
                    </div>
                </c:otherwise>
            </c:choose>
        </div>
    </div>

</header>
<script>
    //search in navbar
function myFunctionsearch() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
//get cookie 
function getCookie(cname) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
//convert number to price
function convert(price) {
  price.a = String(Number(price.a));
  for (let i = 1; i <= price.a.length / 3; i++) {
    let x = 3 * i;
    price.a = price.a.replace(/(\d+)(\d{3})/, "$1" + "." + "$2");
  }
}
//see password
function seePassword(id) {
  var x = document.getElementById(id);
  if (x.type === "password") {
    x.type = "text";
    $("." + id).html(
      "<i class='fa fa-eye-slash fa-lg' aria-hidden='true'></i>"
    );
  } else {
    x.type = "password";
    $("." + id).html("<i class='fa fa-eye fa-lg' aria-hidden='true'></i>");
  }
}
$(".owl-carousel").append(
          "<div id='partner_" +
            clientpartner[i].partnerId +
            "' class='item'><img src='" +
            urlApi +
            "image/partner/" +
            clientpartner[i].thumbnail +
            "' alt='Owl Image' class='owl-height'></div>"
        );
      
      $(".owl-carousel").owlCarousel({
        items: 4,
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
      });

      //go to top
      $("#myBtn").click(function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });

  //slideshow
  var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n, s) {
  showSlides(slideIndex = n, s);
}

function showSlides(n, s) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
} 


  //zoom image
  $(document).ready(function () {
    $(".tile")
      // tile mouse actions
      .on("mouseover", function () {
        $(this)
          .children(".photo")
          .css({ transform: "scale(" + $(this).attr("data-scale") + ")" });
      })
      .on("mouseout", function () {
        $(this).children(".photo").css({ transform: "scale(1)" });
      })
      .on("mousemove", function (e) {
        $(this)
          .children(".photo")
          .css({
            "transform-origin":
              ((e.pageX - $(this).offset().left) / $(this).width()) * 100 +
              "% " +
              ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +
              "%",
          });
      })
      // tiles set up
      .each(function () {
        $(this)
          // add a photo container
          .append('<div class="photo"></div>')
          // set up a background image for each tile based on data-image attribute
          .children(".photo")
          .css({ "background-image": "url(" + $(this).data("image") + ")" });
      });
  });
//validate password
  function check_pw() {
  var html = "";
  var vnf_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  var newpw = $("#newpw").val();
  if (newpw !== "") {
    if (vnf_regex.test(newpw) == false) {
      html =
        "Mật khẩu phải dài từ 8-16 kí tự, bao gồm 1 chữ hoa và 1 chữ thường";
      document.getElementById("result").innerHTML = html;
    } else {
      html = "";
      document.getElementById("result").innerHTML = html;
    }
  } else {
    html = "Vui lòng không để trống";
    document.getElementById("result").innerHTML = html;
  }
}

function re_check_pw() {
  var repw = $("#repw").val();
  var newpw = $("#newpw").val();
  if (repw != newpw) {
    html = "Mật khẩu và Mật khẩu xác nhận không giống nhau";
    document.getElementById("re-result").innerHTML = html;
  } else {
    html = "";
    document.getElementById("re-result").innerHTML = html;
  }
}

function check_confirm() {
  var confirm = $("#confirm").val();
  var vnf_regex = /^[0-9]{6}$/;
  if (vnf_regex.test(confirm) == false) {
    html = "Mã xác minh phải gồm 6 chữ số";
    document.getElementById("confirm-result").innerHTML = html;
  } else {
    html = "";
    document.getElementById("confirm-result").innerHTML = html;
  }
}

function check_phone(aObj) {
  var confirm = $("#customer-phone").val();
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (vnf_regex.test(confirm) == false) {
    html = "Vui lòng điền chính xác số điện thoại";
    $("#confirm-result--phone").html(html);
    $("#phone-result").css("display", "block");
  } else {
    html = "";
    document.getElementById("confirm-result--phone").innerHTML = html;
    $("#phone-result").css("display", "none");
    aObj.a = "checked";
  }
}
function check_mail(bObj) {
  var confirm = $("#customer-email").val();
  var vnf_regex =/^([0-9_]@{8,32})$/gm;
  if (vnf_regex.test(confirm) == false) {
    html = "Vui lòng điền chính xác địa chỉ email";
    $("#confirm-result--email").html(html);
    $("#email-result").css("display", "block");
  } else {
    html = "";
    document.getElementById("confirm-result--email").innerHTML = html;
    $("#email-result").css("display", "none");
    bObj.b = "checked";
  }
}//date range picker

var start = moment().subtract(29, "days");
  var end = moment();

  function cb(start, end) {
    $("#reportrange span").html(
      start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY")
    );
    changeDate();
  }
  $("#reportrange").daterangepicker(
    {
      startDate: start,
      endDate: end,
      ranges: {
        "Hôm nay": [moment(), moment().add(1, "days")],
        "Hôm qua": [moment().subtract(1, "days"), moment()],
        "Tuần trước": [moment().subtract(6, "days"), moment()],
        "Tháng này": [moment().startOf("month"), moment().endOf("month")],
        "Tháng trước": [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
      },
    },
    cb
  );
</script>
<style>

</style>