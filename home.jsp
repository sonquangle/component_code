<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!DOCTYPE html>
<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta charset="ISO-8859-1">
    <title>Trang chủ</title>
    <link rel="stylesheet" href="<%=request.getContextPath()%>/css/trangchu.min.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/js/owl2/owl.carousel.css">
    <link rel="stylesheet" href="<%=request.getContextPath()%>/js/owl2/owl.theme.default.css">
</head>

<body class="bg">
    <spring:eval expression="@environment.getProperty('tmdt.product.image')" var="productImageUrl" />
    <spring:eval expression="@environment.getProperty('tmdt.product.image_category')" var="productCategoryUrl" />
    <div class="container padding-01">
        <div class="row form-group form-banner">
            <span id="clientCode" style="display: none;">${clientCode}</span>
            <div class="col-lg-9 category-ani--rightleft">
                <div id="myCarousel" class="carousel slide" data-ride="carousel">
                    <ol id="carousel-banner" class="carousel-indicators">
                        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    </ol>
                    <div id="carousel-items" class="carousel-inner">
                        <div class="item active banner-default">
                            <a>
                                <img id="img-banner" class="banner-type1-img"></a>
                        </div>
                    </div>
                    <a class="left carousel-control" href="#myCarousel" data-slide="prev"> <span
                            class="glyphicon glyphicon-chevron-left"></span>
                    </a> <a class="right carousel-control" href="#myCarousel" data-slide="next"> <span
                            class="glyphicon glyphicon-chevron-right"></span>
                    </a>
                </div>
            </div>
            <div id="smallBanner" class="col-lg-3 flex-row category-ani--leftright">
                <a id="banner-type2--01">
                    <img class="banner-type2--img">
                </a>
                <a id="banner-type2--02">
                    <img class="banner-type2--img" style="margin-top: 8px">
                </a>
                <a id="banner-type2--03">
                    <img class="banner-type2--img" style="margin-top: 10px">
                </a>
            </div>
        </div>
        <h4 id="hidden-mb" class="title">DANH MỤC NGÀNH HÀNG</h4>

        <div class="row form-danhmuc">
            <c:forEach var="cate" items="${categoryLv1s}" begin="0" end="11" varStatus="index">
                <div class="col-sm-1">
                    <!-- <a href="#" onclick="getMenuLv2(${cate.getProductCategoryId()})"> -->
                    <a href="/danhmucsanpham?id=${cate.getProductCategoryId()}">
                        <img src="${productCategoryUrl}${cate.getImageThumbnail()}" class="img-category--lv1">
                        <br />
                        <div class="caption">
                            <p class="text-align">${cate.getName()}</p>
                        </div>
                    </a>
                </div>
            </c:forEach>
        </div>
        <div>
            <h4 class="form-head-items">
                <span class="title">TÌM KIẾM HÀNG ĐẦU</span> <a class="title-small" href=#> <i
                        class="fa fa-angle-double-right" aria-hidden="true"></i>Xem Thêm
                </a>
            </h4>
            <div id="myCarouselbanchay" class="carousel slide form-timkiem" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarouselbanchay" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarouselbanchay" data-slide-to="1"></li>
                </ol>
                <div class="carousel-inner san-pham">
                    <div class="item active">
                        <div class="row">
                            <div>
                                <c:forEach var="pro" items="${products}" begin="0" end="5">
                                    <div class="col-xs-4 col-md-2 col-align--item">
                                        <a href="/chitietsanpham?id=${pro.getProductId()}" class="col-align--itemsmall">
                                            <img src="${productImageUrl}${pro.getImageThumbnail()}"
                                                class="img-top--search hidden-mb">
                                            <div class="zoom hidden-lg search-top--align">
                                                <img src="${productImageUrl}${pro.getImageThumbnail()}"
                                                    class="img-responsive" style="margin:auto">

                                            </div>
                                            <h4 class="title-hot">${pro.getName()}</h4>
                                            <c:if test="${pro.getRate().toString().equals('0')}">
                                                <span class="ribbon-label-top">TOP 1</span>
                                            </c:if>
                                            <div class="display-flex">
                                                <div class="display-flex-hot">
                                                    <c:choose>
                                                        <c:when
                                                            test="${not empty pro.getDiscountPercent() && !pro.getDiscountPercent().equals('0')}">
                                                            <span class="price-hot-sale">
                                                                <fmt:formatNumber type="number" pattern="###,###"
                                                                    value="${pro.getPriceNew()}" /> đ
                                                            </span>
                                                        </c:when>
                                                        <c:otherwise>
                                                            <span class="price-hot-sale">
                                                                <fmt:formatNumber type="number" pattern="###,###"
                                                                    value="${pro.getPrice()}" /> đ
                                                            </span>
                                                        </c:otherwise>
                                                    </c:choose>
                                                </div>
                                            </div>
                                            <div class="display-flex-hot">
                                                <c:if
                                                    test="${not empty pro.getDiscountPercent() && !pro.getDiscountPercent().equals('0')}">
                                                    <span class="price-hot-original">
                                                        <fmt:formatNumber type="number" pattern="###,###"
                                                            value="${pro.getPrice()}" />
                                                        đ
                                                    </span>
                                                </c:if>
                                            </div>
                                        </a>
                                    </div>
                                </c:forEach>
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div class="row">
                            <c:forEach var="pro" items="${products}" begin="6" end="11">
                                <div class="col-xs-4 col-md-2 col-align--item">
                                    <a href="chitietsanpham?id=${pro.getProductId()}" class="col-align--itemsmall">
                                        <img src="${productImageUrl}${pro.getImageThumbnail()}"
                                            class="img-top--search hidden-mb">
                                        <div class="hidden-lg zoom search-top--align">
                                            <img src="${productImageUrl}${pro.getImageThumbnail()}"
                                                class="img-responsive" style="margin:auto">
                                        </div>
                                        <h4 class="title-hot">${pro.getName()}</h4>
                                        <c:if test="${pro.getRate().toString().equals('0')}">
                                            <span class="ribbon-label-top">TOP 1</span>
                                        </c:if>
                                        <div class="display-flex">
                                            <div class="display-flex-hot">
                                                <c:choose>
                                                    <c:when
                                                        test="${not empty pro.getDiscountPercent() && !pro.getDiscountPercent().equals('0')}">
                                                        <span class="price-hot-sale">
                                                            <fmt:formatNumber type="number" pattern="###,###"
                                                                value="${pro.getPriceNew()}" /> đ
                                                        </span>
                                                    </c:when>
                                                    <c:otherwise>
                                                        <span class="price-hot-sale">
                                                            <fmt:formatNumber type="number" pattern="###,###"
                                                                value="${pro.getPrice()}" /> đ
                                                        </span>
                                                    </c:otherwise>
                                                </c:choose>
                                            </div>
                                        </div>
                                        <div class="display-flex-hot">
                                            <c:if
                                                test="${not empty pro.getDiscountPercent() && !pro.getDiscountPercent().equals('0')}">
                                                <span class="price-hot-original">
                                                    <fmt:formatNumber type="number" pattern="###,###"
                                                        value="${pro.getPrice()}" /> đ
                                                </span>
                                            </c:if>
                                        </div>
                                    </a>
                                </div>
                            </c:forEach>
                        </div>
                    </div>
                </div>
                <a class="left carousel-control" href="#myCarouselbanchay" data-slide="prev"> <span
                        class="glyphicon glyphicon-chevron-left"></span> <span class="sr-only">Previous</span>
                </a> <a class="right carousel-control" href="#myCarouselbanchay" data-slide="next"> <span
                        class="glyphicon glyphicon-chevron-right"></span> <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <div id="home-category" class="none">

        </div>

        <h4>
            <span class="title">GỢI Ý CHO BẠN</span>
        </h4>
        <div id="app" class="none">
            <div class="row form-goiy">
                <div class="category-ani--opacity" v-for="product in products" :key="product.productId">

                    <div class="col-xs-6 col-lg-2 form-goiysp">
                        <div class="row form-img--big">
                            <div class="form-img--slide">
                                <div :class="'mySlides_' + product.productId" style="position:relative">
                                    <div v-if="product.isHasCounter == 'Y'">
                                        <div class="ribbon-label-bottom hidden-mb">
                                            <span class="text-ribbon">Hàng Có Sẵn</span>
                                        </div>
                                    </div>
                                    <span v-if="product.discountPercent !== 0" class="ribbon-label-top-4th">-
                                        {{ product.discountPercent }}%</span>
                                    <a class="hidden-mb" :href="'chitietsanpham?id=' + product.productId">
                                        <div :id="'imgThumb_' + product.productId" class="tile" data-scale="1.15"
                                            :data-image="imageUrl + product.imageThumbnail">
                                            <%--                                            <img :src="imageUrl + product.imageThumbnail"--%>
                                            <%--                                                 class="img-responsive">--%>
                                        </div>
                                    </a>
                                    <a class="form-zoom hidden-lg" :href="'chitietsanpham?id=' + product.productId">
                                        <div class="zoom">
                                            <img :src="imageUrl + product.imageThumbnail" class="img-responsive">
                                        </div>
                                    </a>
                                </div>
                                <div class="img-row--slide hidden-mb">
                                    <div :id="'carouselSmall_' + product.productId" class="carousel slide carouselSmall"
                                        data-ride="carousel" data-interval="false">
                                        <div class="carousel-inner">
                                            <template v-if="product.attributeSetInstanceDtos.length <= 5">
                                                <div class="item active">
                                                    <div v-for="asi in product.attributeSetInstanceDtos"
                                                        :key="asi.attributeSetInstanceId">
                                                        <div class="column" v-if="asi.imageThumbnail !== null">
                                                            <a :href="'chitietsanpham?id=' + product.productId">
                                                                <img class="demo cursor img-column-small"
                                                                    :src="imageUrl + asi.imageThumbnail"
                                                                    @mouseover="changeAttr(product.productId, asi.price, asi.priceNew, asi.imageThumbnail)"
                                                                    alt="">
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="item active">
                                                    <div v-for="(asi, index) in product.attributeSetInstanceDtos"
                                                        :key="asi.attributeSetInstanceId">
                                                        <template v-if="index >= 0 && index <= 4">
                                                            <div class="column" v-if="asi.imageThumbnail !== null">
                                                                <a :href="'chitietsanpham?id=' + product.productId">
                                                                    <img class="demo cursor img-column-small"
                                                                        :src="imageUrl + asi.imageThumbnail"
                                                                        @mouseover="changeAttr(product.productId, asi.price, asi.priceNew, asi.imageThumbnail)"
                                                                        alt="">
                                                                </a>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </div>
                                                <div class="item">
                                                    <div v-for="(asi, index) in product.attributeSetInstanceDtos"
                                                        :key="asi.attributeSetInstanceId">
                                                        <template v-if="index >= 5 && index <= 9">
                                                            <div class="column">
                                                                <a :href="'chitietsanpham?id=' + product.productId">
                                                                    <img class="demo cursor img-column-small"
                                                                        :src="imageUrl + asi.imageThumbnail"
                                                                        @mouseover="changeAttr(product.productId, asi.price, asi.priceNew, asi.imageThumbnail)"
                                                                        alt="">
                                                                </a>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </template>
                                            <div v-if="product.attributeSetInstanceDtos.length > 5">
                                                <a class="left carousel-control"
                                                    :href="'#carouselSmall_' + product.productId" data-slide="prev">
                                                    <span
                                                        class="glyphicon glyphicon-chevron-left btn-carousel--color"></span>
                                                    <span class="sr-only">Previous</span>
                                                </a>
                                                <a class="right carousel-control"
                                                    :href="'#carouselSmall_' + product.productId" data-slide="next">
                                                    <span
                                                        class="glyphicon glyphicon-chevron-right btn-carousel--color"></span>
                                                    <span class="sr-only">Next</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="caption">
                                <a style="color: black;" :href="'chitietsanpham?id=' + product.productId">
                                    <h4 class="title-hot">{{ product.name }}</h4>
                                    <div class="display-flex-hot" style="margin:5px 0;">
                                        <span :id="'original_' + product.productId" v-if="product.discountPercent !== 0"
                                            class="price-hot-sale">{{ product.priceNew.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }}</span>
                                        <span :id="'sale_' + product.productId" v-else
                                            class="price-hot-sale">{{ product.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }}</span>
                                    </div>
                                </a>
                            </div>
                            <div class="display-flex-hot">
                                <span :id="'sale_' + product.productId" v-if="product.discountPercent !== 0"
                                    class="price-hot-original">{{ product.price.toLocaleString('vi-VN', {style: 'currency',currency: 'VND'}) }}</span>
                            </div>
                            <div class="display-flex-hot">
                                <span class="font-star">
                                    <span class="starRateHome"><span
                                            :style="'width:' + product.rate * 20 + '%'"></span></span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button-moreinfo-align" v-if="available">
                <button class="button-moreinfo btn-more--align" @click="getMore(size, page + 1)">
                    Xem thêm
                </button>
            </div>
            <div class="anchor_suggest">
                <a id="partner" class='title' style='margin-top: 10px'></a>
                <div class="owl-carousel">

                </div>
                <div class="hidden-lg">
                    <br />
                    <br />
                    <br />
                    <br />
                </div>

            </div>
        </div>
    </div>

    <script src="<%=request.getContextPath()%>/js/moreandmore.js"></script>
    <script src="<%=request.getContextPath()%>/js/buttonOpenClose.js"></script>
    <script src="<%=request.getContextPath()%>/js/image-zoom.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/CategoryHomeAjax.js"></script>
    <script src="<%=request.getContextPath()%>/js/ChangeImghome.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/owl2/owl.carousel.min.js"></script>
    <script src="<%=request.getContextPath()%>/js/owl2/owl.autoplay.min.js"></script>
    <script type="module" src="<%=request.getContextPath()%>/js/homeVue.js"></script>


</body>

</html>