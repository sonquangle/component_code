var ValueArray = [];
var orderArray = [];
var ObjectArray = [];
var numb = {};
$(document).ready(function () {
  $("body").addClass("collapse-leftbar");
  let a = $(document).height() - 200;
  $(".order-left--item").css("height", a - 20);
  $(".form-order--main").css("height", a - 50);
});
function myFunctionsearch() {
  if (event.keyCode == 13 || event.which == 13) {
    event.preventDefault();
  }

  var input, filter, ul, li, labelname, labelsku, i, txtName, txtSKU;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName("li");
  for (let i = 0; i < li.length; i++) {
    li[i].id = "";
    labelname = li[i].getElementsByTagName("label")[1];
    txtName = labelname.textContent || labelname.innerHTML;
    labelsku = li[i].getElementsByTagName("label")[2];
    txtSKU = labelsku.textContent || labelsku.innerHTML;
    if (txtName.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      li[i].id = 1;
    } else if (txtSKU.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
      li[i].id = 1;
    } else {
      li[i].style.display = "none";
    }
    if (event.keyCode == 13 || event.which == 13) {
      event.preventDefault();
      $("li#1:first").click();
      break;
    }
  }
}
function convert(price) {
  var newprice = Math.ceil(price).toString();
  for (let i = 1; i <= price.toString().length / 3; i++) {
    let x = 3 * i;
    newprice = newprice.replace(/(\d+)(\d{3})/, "$1" + "." + "$2");
  }
  return newprice;
}

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

function CheckInput(valueInput, IdInput) {
  let b = Number.isInteger(Number(valueInput));
  let d = $("#stock-" + IdInput).text();
  if (b == false || Number(valueInput) < 0) {
    changeNumber(1, IdInput);
  } else if (Number(valueInput) > d) {
    changeNumber(d, IdInput);
  } else {
    changeNumber(valueInput, IdInput);
  }
  Tinhtong();
}

function Tinhtong() {
  var totalSum = 0;
  for (let i = 0; i < orderArray.length; i++) {
    let a = Number($("#total-" + orderArray[i]).attr("value"));
    totalSum += Number($("#total-" + orderArray[i]).attr("value"));
  }
  $("#final-payment").text(convert(totalSum) + "đ");
}
function TotalSum(obj) {
  for (let i = 0; i < orderArray.length; i++) {
    obj.a += Number($("#total-" + orderArray[i]).attr("value"));
  }
  //$("#final-payment").text(convert(totalSum) + "đ");
}
//tính lại tổng sau khi thay đổi
function totalVoucherFee() {
  let objOrigin = { a: 0 };
  let total = 0;
  TotalSum(objOrigin);
  if ($("[id^='customer_info']").css("display") !== "none") {
    total = objOrigin.a + shipFeeValue - discountPrice;
  } else {
    total = objOrigin.a - discountPrice;
  }
  if (total == objOrigin.a) {
    $("p.price-origin").css("display", "none");
  } else {
    $("p.price-origin").text($("#final-payment").text());
    $("p.price-origin").css("display", "block");
  }
  $("#modal-total")
    .find("#final-payment")
    .text(convert(total) + "đ");
}

function btndelete(clicked_id) {
  remove(clicked_id);
  Tinhtong();
}
function remove(id) {
  orderArray.splice(orderArray.indexOf(id), 1);
  ObjectArray.splice(ObjectArray.indexOf(id), 1);
  // ObjectArray;
  // var a=ObjectArray.indexOf(id);
  // var b=$("#amount-" + id).val();
  $("#amount-" + id)
    .parents("div.form-row.form-order")
    .remove();
}
function deleteAll() {
  for (let i = 0; i < orderArray.length; ) {
    $("#amount-" + orderArray[i])
      .parents("div.form-row.form-order")
      .remove();
    orderArray.splice(0, 1);
    ObjectArray.splice(0, 1);
  }
}
function changeNumber(idnumber, clid) {
  var totalNumber = idnumber * $("#origin-" + clid).attr("value");
  $("#total-" + clid).attr("value", totalNumber);
  $("#amount-" + clid).val(idnumber);
  $("#total-" + clid).text(convert(totalNumber) + "đ");
}
function btnplus(clicked_id) {
  var indexNumber = Number($("#amount-" + clicked_id).val());
  let d = $("#stock-" + clicked_id).text();
  if (indexNumber >= d) {
    $("#amount-" + indexNumber).val(d);
  } else {
    indexNumber += 1;
    CheckInput(indexNumber, clicked_id);
    changeNumber(indexNumber, clicked_id);
    Tinhtong();
  }
}
function btnminus(clicked_id) {
  var indexNumber = Number($("#amount-" + clicked_id).val());
  if (indexNumber < 2) {
    remove(clicked_id);
  } else {
    indexNumber -= 1;
    CheckInput(indexNumber, clicked_id);
    changeNumber(indexNumber, clicked_id);
  }
  Tinhtong();
}

function create(
  img,
  lbName,
  lbSku,
  lbAttri01,
  lbAttri02,
  lbStock,
  lbPrice,
  lbPriceNew,
  lbValPrice,
  lbValPriceNew,
  productId,
  proId,
  attrId
) {
  var divParent = document.createElement("div");
  $(divParent)
    .addClass("form-row form-order")
    .appendTo($("#createnode"))
    .attr("id", "listSku");
  var div1 = document.createElement("div");
  $(div1).addClass("form-order-01").appendTo(divParent);
  var ImgNode = document.createElement("img");
  $(ImgNode).attr("src", img).addClass("img-order--product").appendTo(div1);
  var div2 = document.createElement("div");
  $(div2).addClass("form-order-04 flex-row").appendTo(divParent);
  var pName = document.createElement("p");
  $(pName).addClass("form-name").appendTo(div2).append(lbName);
  var pHidden = document.createElement("p");
  $(pHidden).attr("hidden", "hidden");
  $(pHidden)
    .appendTo(div2)
    .html(
      '<label id="proID-' +
        productId +
        '">' +
        proId +
        "</label>" +
        '<label id="attrId-' +
        productId +
        '">' +
        attrId +
        "</label>"
    );
  var pSku = document.createElement("p");
  $(pSku).addClass("form-sku").appendTo(div2).html("SKU: ");
  var spanSku = document.createElement("span");
  $(spanSku).appendTo(pSku).append(lbSku).attr("id", "itemSku");
  var pAttri01 = document.createElement("label");
  $(pAttri01).appendTo(div2).append(lbAttri01);
  var pAttri02 = document.createElement("label");
  $(pAttri02).appendTo(div2).append(lbAttri02);
  var pStock = document.createElement("label");
  $(pStock).appendTo(div2).html("Số lượng : ");
  var spanSku = document.createElement("span");
  $(spanSku)
    .appendTo(pStock)
    .append(lbStock)
    .attr("id", "stock-" + productId);
  if (lbPrice == lbPriceNew) {
    var pPriceNew = document.createElement("label");
    $(pPriceNew)
      .addClass("form-price")
      .appendTo(div2)
      .append(lbPriceNew)
      .attr("id", "origin-" + productId)
      .attr("value", lbValPrice);
  } else if (lbPriceNew == 0) {
    var pPriceNew = document.createElement("label");
    $(pPriceNew)
      .addClass("form-price")
      .appendTo(div2)
      .append(lbPrice)
      .attr("id", "origin-" + productId)
      .attr("value", lbValPrice);
  } else if (
    lbValPrice !== lbValPriceNew &&
    $("#order-modal").hasClass("show") == false
  ) {
    var pPrice = document.createElement("label");
    $(pPrice)
      .addClass("form-priceNew")
      .appendTo(div2)
      .append(lbPrice)
      .attr("id", "sale-" + productId)
      .attr("value", lbValPrice);
    var pPriceNew = document.createElement("label");
    $(pPriceNew)
      .addClass("form-price")
      .appendTo(div2)
      .append(lbPriceNew)
      .attr("id", "origin-" + productId)
      .attr("value", lbValPriceNew);
  } else {
    var pPrice = document.createElement("label");
    $(pPrice)
      .addClass("form-priceNew")
      .appendTo(div2)
      .append(lbPrice)
      .attr("id", "sale-" + productId)
      .attr("value", lbValPrice);
    var pPriceNew = document.createElement("label");
    $(pPriceNew)
      .addClass("form-price")
      .appendTo(div2)
      .append(lbPriceNew)
      .attr("id", "origin-" + productId)
      .attr("value", lbValPrice);
  }
  var div3 = document.createElement("div");
  $(div3).addClass("form-order-02").appendTo(divParent);
  var pPrice = document.createElement("p");
  if (lbPriceNew == 0) {
    $(pPrice)
      .appendTo(div3)
      .append(lbPrice)
      .attr("id", "total-" + productId)
      .attr("value", lbValPrice)
      .addClass("total-payment");
  } else if (
    lbValPrice !== lbValPriceNew &&
    $("#order-modal").hasClass("show") == false
  ) {
    $(pPrice)
      .appendTo(div3)
      .append(lbPriceNew)
      .attr("id", "total-" + productId)
      .attr("value", lbValPriceNew)
      .addClass("total-payment");
  } else {
    $(pPrice)
      .appendTo(div3)
      .append(lbPriceNew)
      .attr("id", "total-" + productId)
      .attr("value", lbValPrice)
      .addClass("total-payment");
  }

  var div4 = document.createElement("div");
  $(div4).addClass("form-order-03").appendTo(divParent);
  var inputNumber = document.createElement("input");
  $(inputNumber)
    .appendTo(div4)
    .attr("type", "text")
    .attr("value", "1")
    .attr(
      "style",
      "width:100%;border:none;margin-bottom: 10px;text-align: center;"
    )
    .attr("id", "amount-" + productId)
    .attr("onkeyup", "CheckInput(this.value,this.id.substring(7))")
    .attr("onkeypress", "return event.charCode >= 48 && event.charCode <= 57");
  var div5 = document.createElement("div");
  $(div5).addClass("form-order-05 flex-row").appendTo(divParent);
  // $(div5).html('<button class="button-noborder--blue btn-align--order"
  // type="button"><i class="fa
  // fa-chevron-up"aria-hidden="true"></i></button><button
  // class="button-noborder--red btn-align--order" type="button"><i class="fa
  // fa-chevron-down" aria-hidden="true"></i></button>');
  var btnPlus = document.createElement("button");
  $(btnPlus)
    .addClass("button-noborder--blue btn-align--order")
    .attr("id", productId)
    .attr("onclick", "btnplus(this.id)")
    .appendTo(div5);
  var iPlus = document.createElement("i");
  $(iPlus)
    .addClass("fa fa-chevron-up")
    .attr("aria-hidden", "true")
    .appendTo(btnPlus);
  var btnMinus = document.createElement("button");
  $(btnMinus)
    .addClass("button-noborder--red btn-align--order")
    .attr("id", productId)
    .attr("onclick", "btnminus(this.id)")
    .appendTo(div5);
  var iMinus = document.createElement("i");
  $(iMinus)
    .addClass("fa fa-chevron-down")
    .attr("aria-hidden", "true")
    .appendTo(btnMinus);
  var btnDelete = document.createElement("button");
  $(btnDelete)
    .addClass("button-noborder--red btn-align--order")
    .attr("id", productId)
    .appendTo(div5)
    .attr("onclick", "showConfirm(this.id)");
  var iDelete = document.createElement("i");
  $(iDelete)
    .addClass("fa fa-trash")
    .attr("aria-hidden", "true")
    .appendTo(btnDelete);
  $("#createnode").animate(
    { scrollTop: $("#createnode").get(0).scrollHeight },
    2000
  );
}

$("ul#orderUL").on("click", "li", function () {
  var img = $(this).find("#avatar-item").attr("src");
  var lbName = $(this).find("#label-item-name").text();
  var lbSku = $(this).find("#label-item-SKU").text();
  var lbAttri01 = $(this).find("#label-item-attri-01").text();
  var lbAttri02 = $(this).find("#label-item-attri-02").text();
  var lbStock = $(this).find("#label-item-stock").text();
  var lbPrice = $(this).find("#label-item-price").text();
  var lbPriceNew = $(this).find("#label-item-priceNew").text();
  var lbValPrice = $(this).find("#label-item-price").attr("value");
  var lbValPriceNew = $(this).find("#label-item-priceNew").attr("value");
  var productId = lbSku;

  var pos = lbSku.search(lbSkuParent);
  if (pos !== -1) {
    attrId = lbSku.replace(lbSkuParent, "");
  } else {
    attrId = lbSku;
  }
  if (isNaN(lbStock) == false) {
    CheckList(
      img,
      lbName,
      lbSku,
      lbAttri01,
      lbAttri02,
      lbStock,
      lbPrice,
      lbPriceNew,
      lbValPrice,
      lbValPriceNew,
      productId,
      proId,
      attrId
    );
  }
  // $("#order-modal").modal("hide");
});
function CheckList(
  img,
  lbName,
  lbSku,
  lbAttri01,
  lbAttri02,
  lbStock,
  lbPrice,
  lbPriceNew,
  lbValPrice,
  lbValPriceNew,
  productId,
  proId,
  attrId
) {
  if (orderArray.length == 0) {
    create(
      img,
      lbName,
      lbSku,
      lbAttri01,
      lbAttri02,
      lbStock,
      lbPrice,
      lbPriceNew,
      lbValPrice,
      lbValPriceNew,
      productId,
      proId,
      attrId
    );
    orderArray.push(productId);
  } else {
    for (let i = 0; i < orderArray.length; ) {
      if (productId == orderArray[i]) {
        let d = Number(lbStock);
        var numb = Number($("#amount-" + productId).val());
        if (numb >= d) {
          $("#amount-" + numb).val(d);
          break;
        } else {
          numb += 1;
          changeNumber(numb, productId);
          break;
        }
      } else {
        if (lbSku !== orderArray[i] && i < orderArray.length - 1) {
          i++;
        } else {
          create(
            img,
            lbName,
            lbSku,
            lbAttri01,
            lbAttri02,
            lbStock,
            lbPrice,
            lbPriceNew,
            lbValPrice,
            lbValPriceNew,
            productId,
            proId,
            attrId
          );
          orderArray.push(productId);
          break;
        }
      }
    }
  }
  $("#order-modal").modal("hide");
  Tinhtong();
}
var attrId, proId, lbSkuParent;
$("ul#myUL").on("click", "li",  function () {
  var img = $(this).find("#avatar-item").attr("src");
  var lbName = $(this).find("#label-item-name").text();
  var lbSku = $(this).find("#label-item-SKU").text();
  var lbAttri01 = $(this).find("#label-item-attri-01").text();
  var lbAttri02 = $(this).find("#label-item-attri-02").text();
  var lbStock = $(this).find("#label-item-stock").text();
  var lbPrice = $(this).find("#label-item-price").text();
  var lbPriceNew = $(this).find("#label-item-priceNew").text();
  var lbValPriceNew = $(this).find("#label-item-priceNew").attr("value");
  var lbValPrice = $(this).find("#label-item-price").attr("value");
  var productId = $(this).find("#label-product-id").text();
  var itemModal = "";
  lbSkuParent = lbSku;
  if (lbSku === "null") {
    lbSku = "SKU: ";
  }

  if (isNaN(lbStock) == false) {
     $.ajax({
      contentType: "application/json",
      type: "GET",
      async:false,
      url: "/product/findBySku?productId=" + productId,
      statusCode: {
        200: function (data) {
          var product = data[0];
          attrId =
            product.attributeSetInstanceModels[0].attributeSetInstanceDto
              .attributeSetInstanceId;
          proId = product.productDto.productId;
          //console.log(data);
          //var product = data[0];
          //console.log(product);
          if (product.attributeSetInstanceModels.length === 2) {
            lbSku =
              lbSku +
              product.attributeSetInstanceModels[1].attributeSetInstanceDto
                .attributeSetInstanceId;

            for (
              let t = 0;
              t <
              product.attributeSetInstanceModels[1].attributeInstancesDtos
                .length;
              t++
            ) {
              if (t === 0) {
                lbAttri =
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t
                  ].attributeName +
                  " : " +
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t
                  ].name;
              }
              if (
                t > 0 &&
                product.attributeSetInstanceModels[1].attributeInstancesDtos[t]
                  .attributeName !==
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t - 1
                  ].attributeName
              ) {
                lbAttri2 =
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t
                  ].attributeName +
                  " : " +
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t
                  ].name;
              }
              if (
                t > 0 &&
                product.attributeSetInstanceModels[1].attributeInstancesDtos[t]
                  .attributeName ===
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t - 1
                  ].attributeName
              ) {
                lbAttri =
                  lbAttri +
                  " - " +
                  product.attributeSetInstanceModels[1].attributeInstancesDtos[
                    t
                  ].name;
              }
              lbStock =
                product.attributeSetInstanceModels[1].attributeSetInstanceDto
                  .qty;
            }

            lbValPrice =
              product.attributeSetInstanceModels[1].attributeSetInstanceDto
                .price;
            lbPrice = convert(lbValPrice) + "đ";
            lbValPriceNew =
              product.attributeSetInstanceModels[1].attributeSetInstanceDto
                .priceNew;
            lbPriceNew = convert(lbValPriceNew) + "đ";
            // CheckList(
            //   img,
            //   lbName,
            //   lbSku,
            //   lbAttri01,
            //   lbAttri02,
            //   lbStock,
            //   lbPrice,
            //   lbValPrice,
            //   productId,
            //   proId,
            //   attrId
            // );
          } else {
            for (
              let i = 1;
              i < product.attributeSetInstanceModels.length;
              i++
            ) {
              itemModal =
                itemModal +
                '<li class="display-flex modal-body--item" ><img src="' +
                img +
                '" class="img-order--att" id="avatar-item">' +
                '<div class="flex-row"><label id="label-item-name">' +
                lbName +
                "</label> ";
              // itemModal= itemModal+'<label id="label-item-proId" hidden=
              // "hidden">' +product.productDto.productId+'</label>' + '<label
              // id="label-item-attrId" hidden= "hidden">' +
              // product.attributeSetInstanceModels[i].attributeSetInstanceDto.attributeSetInstanceId+'</label>';
              for (
                let t = 0;
                t <
                product.attributeSetInstanceModels[i].attributeInstancesDtos
                  .length;
                t++
              ) {
                if (t === 0) {
                  itemModal =
                    itemModal +
                    '<label id="label-item-attri-01">' +
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t].attributeName +
                    " : " +
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t].name;
                }
                if (
                  t > 0 &&
                  product.attributeSetInstanceModels[i].attributeInstancesDtos[
                    t
                  ].attributeName !==
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t - 1].attributeName
                ) {
                  itemModal =
                    itemModal +
                    '</label><label id="label-item-attri-02">' +
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t].attributeName +
                    " : " +
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t].name;
                }
                if (
                  t > 0 &&
                  product.attributeSetInstanceModels[i].attributeInstancesDtos[
                    t
                  ].attributeName ===
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t - 1].attributeName
                ) {
                  itemModal =
                    itemModal +
                    " - " +
                    product.attributeSetInstanceModels[i]
                      .attributeInstancesDtos[t].name;
                }
              }
              lbStock =
                product.attributeSetInstanceModels[i].attributeSetInstanceDto
                  .qty;
              if (lbStock < 1) {
                lbStock = "<span style='color:red'> Hết hàng</span>";
              }
              itemModal = itemModal + "</label>";
              itemModal =
                itemModal +
                '<label class="order--SKU">SKU: <span id="label-item-SKU">' +
                lbSku +
                product.attributeSetInstanceModels[i].attributeSetInstanceDto
                  .attributeSetInstanceId +
                "</span></label>" +
                '<label>Số lượng : <span  id="label-item-stock">' +
                lbStock +
                "</span></label>";
              if (
                product.attributeSetInstanceModels[i].attributeSetInstanceDto
                  .price ==
                product.attributeSetInstanceModels[i].attributeSetInstanceDto
                  .priceNew
              ) {
                itemModal =
                  itemModal +
                  '<label id="label-item-price" style="text-decoration: line-through;color:#ccc;font-size:15px;display:none"' +
                  'value="' +
                  product.attributeSetInstanceModels[i].attributeSetInstanceDto
                    .priceNew +
                  '"' +
                  ">" +
                  convert(
                    product.attributeSetInstanceModels[i]
                      .attributeSetInstanceDto.price
                  ) +
                  "đ" +
                  '</label><label id="label-item-priceNew"' +
                  'value="' +
                  product.attributeSetInstanceModels[i].attributeSetInstanceDto
                    .price +
                  '"' +
                  ">" +
                  convert(
                    product.attributeSetInstanceModels[i]
                      .attributeSetInstanceDto.priceNew
                  ) +
                  "đ" +
                  "</label>" +
                  "</div></li>";
              } else {
                itemModal =
                  itemModal +
                  '<label id="label-item-price" style="text-decoration: line-through;color:#ccc;font-size:15px;"' +
                  'value="' +
                  product.attributeSetInstanceModels[i].attributeSetInstanceDto
                    .priceNew +
                  '"' +
                  ">" +
                  convert(
                    product.attributeSetInstanceModels[i]
                      .attributeSetInstanceDto.price
                  ) +
                  "đ" +
                  '</label><label id="label-item-priceNew"' +
                  'value="' +
                  product.attributeSetInstanceModels[i].attributeSetInstanceDto
                    .price +
                  '"' +
                  ">" +
                  convert(
                    product.attributeSetInstanceModels[i]
                      .attributeSetInstanceDto.priceNew
                  ) +
                  "đ" +
                  "</label>" +
                  "</div></li>";
              }
            }
          }
        },
      },
    });
    if (itemModal.length > 0 && $("#order-modal").hasClass("show") == false) {
      $("ul#orderUL").html("");
      $("ul#orderUL").html(itemModal);
      $("#order-modal").modal("show");
    } else {
      $("#order-modal").modal("hide");
      // ObjectArray.push(proId+','+attrId+','+lbStock.substring(10));
      CheckList(
        img,
        lbName,
        lbSku,
        lbAttri01,
        lbAttri02,
        lbStock,
        lbPrice,
        lbPriceNew,
        lbValPrice,
        lbValPriceNew,
        productId,
        proId,
        attrId
      );
    }
  }
});

let confirm = new ConfirmClass();
confirm.onShow = function () {};
confirm.onHide = function () {};

function showConfirm(clicked_id) {
  confirm.show({
    title: "Thông báo",
    content: "Bạn có muốn xóa không ?",
    btns: [
      {
        callback: function (instance) {
          btndelete(clicked_id);
          instance.close = true;
        },
      },
      {
        text: "Không, cảm ơn !",
        callback: function () {},
      },
    ],
    onShow: function () {},
  });
}

function btnDeleteAll() {
  deleteAll();
  Tinhtong();
}
function showConfirmDelete() {
  confirm.show({
    title: "Thông báo",
    content: "Bạn có muốn xóa tất cả không ?",
    btns: [
      {
        callback: function (instance) {
          btnDeleteAll();
          instance.close = true;
        },
      },
      {
        text: "Không, cảm ơn !",
        callback: function () {},
      },
    ],
    onShow: function () {},
  });
}
function showConfirmPrint() {
  confirm.show({
    title: "Thông báo",
    content: "Bạn có muốn in hóa đơn không ?",
    btns: [
      {
        callback: function (instance) {
          window.open("print");
          instance.close = true;
        },
      },
      {
        text: "Không, cảm ơn !",
        callback: function () {},
      },
    ],
    onShow: function () {},
  });
}
let toast = new ToastClass();
// toast.onShow = function () {

// };
// toast.onHide = function () {

// };

var result = "Tạo đơn hàng thất bại";
var showresult = "Vui lòng chọn sản phẩm";
var obj;
function showToast() {
  let abc = $("#modal-total").find("#final-payment").text();
  if (abc == "0đ") {
    toast.show({
      text: showresult,
      duration: 1000,
      onHide: function () {},
    });
  } else {
    //get element
    let orderLineDto_obj = [];
    for (let i = 0; i < orderArray.length; i++) {
      let object = {
        attributeSetInstanceId: $("#attrId-" + orderArray[i]).text(),
        productId: $("#proID-" + orderArray[i]).text(),
        qtyordered: $("#amount-" + orderArray[i]).val(),
      };
      orderLineDto_obj.push(object);
    }
    //let clientRefId_obj = getCookie("clientId");
    //let createdby_obj = getCookie("createdby");
    let paymentRule = $("#orderDocstatus option:selected").val();
    let discountCode_obj = "";
    if ($("#confirm-voucher").hasClass("success")) {
      discountCode_obj = $("#confirm-voucher").val();
    }
    let nameCustomer_obj = $("#customer-name").val();
    let phoneCustomer_obj = $("#customer-phone").val();
    let noteCustomer_obj = $("#customer_note").val();
    let provinceId_obj = $("#select_city option:selected").val();
    let districtId_obj = $("#select_district option:selected").val();
    let wardId_obj = $("#select_village option:selected").val();
    let province_obj = $("#select_city option:selected").text();
    let district_obj = $("#select_district option:selected").text();
    let ward_obj = $("#select_village option:selected").text();
    //đóng gói
    if ($("[id^='customer_info']").css("display") == "none") {
      nameCustomer_obj = "";
      phoneCustomer_obj = "";
      noteCustomer_obj = "";
      provinceId_obj = "";
      districtId_obj = "";
      wardId_obj = "";
      province_obj = "";
      district_obj = "";
      ward_obj = "";
    }
    let objInfo = {
      discountCode: discountCode_obj,
      carrierPlanId: carrierPlanId_obj,
      orderLineDto: orderLineDto_obj,
      fromToAddressModel: {
        toName: nameCustomer_obj,
        toTel: phoneCustomer_obj,
        toAddress: noteCustomer_obj,
        toProvinceId: provinceId_obj,
        toDistrictId: districtId_obj,
        toWardId: wardId_obj,
        toProvince: province_obj,
        toDistrict: district_obj,
        toWard: ward_obj,
      },
    };
    toast.show({
      loading: true,
      onShow: function () {
        setTimeout( function () {
          try {
             $.ajax({
              url: "/order/create?paymentRule=" + paymentRule,
              type: "POST",
              dataType: "json",
              async:false,
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify(objInfo),
              statusCode: {
                200: function (data) {
                  result = "Tạo đơn hàng thành công";
                  //console.log(result);
                },
              },
              error: function (data) {
                result = "Tạo đơn hàng thất bại";
              },
            });
          } catch (e) {
            console.log(e);
          }
          btnDeleteAll();
          if (result == "Tạo đơn hàng thành công") {
            toast.showSuccess({
              text: result,
              duration: 1500,
              onHide: function () {},
            });
          } else {
            toast.show({
              text: result,
              duration: 1500,
              onHide: function () {},
            });
          }
          location.reload();
        }, 100);
      },
    });
  }
}

function createBill() {
  $("p.price-origin").css("display", "none");
  $("#billUL").html($("#createnode").html());
  $("#modal-total").html($("#UlTotal").html());
  $("#modal-bill").find('[id^="amount"]').remove();
  $("#modal-bill").find('[id^="stock"]').remove();
  $("#modal-bill").find('[class^="button-noborder"]').remove();
  if ($("[id^='customer_info']").css("display") !== "none") {
    updateCheckShip();
  }
}
$("#confirm-voucher").change(function () {
  addVoucher();
});
function shipper() {
  $("#shipper_info").css("display", "none");
  $("[id^='customer_info']").css("display", "flex");
}
function shipperBack() {
  $("#shipper_info").css("display", "block");
  $("[id^='customer_info']").css("display", "none");
  totalVoucherFee();
}
//gọi ajax lấy giảm giá
var discountPrice = 0;
function addVoucher() {
  let e = $("#confirm-voucher").val();
  let totalSum = { a: 0 };
  TotalSum(totalSum);
  var noti = "Mã áp dụng không thành công ";

  $.ajax({
    url: urlApi + "code/validate?code=" + e + "&orderAmount=" + totalSum.a,
    type: "GET",
    dataType: "json",
    async: false,
    contentType: "application/json; charset=utf-8",
    statusCode: {
      302: function (data) {
        discountPrice = data.responseJSON.data.totalDiscount;
        //totalSum.a = totalSum.a - data.responseJSON.data.totalDiscount;
        totalVoucherFee();
        $("#confirm-voucher").addClass("success");
        noti = "Mã áp dụng thành công";
        toast.showSuccess({
          text: noti,
          duration: 1000,
          onHide: function () {},
        });
        //$("p.price-origin").css("display", "block");
        //return totalSum.a;
      },
      204: function (data) {
        discountPrice = 0;
        totalVoucherFee();
        noti = "Mã áp dụng không thành công";
        $("#confirm-voucher").removeClass("success");
        // $("p.price-origin").css("display", "none");
        toast.show({
          text: noti,
          duration: 1000,
          onHide: function () {},
        });
      },
    },
  });
}
$("#confirm-voucher").change(function () {
  $("#confirm-voucher").removeClass("success");
});
function changeMoney() {
  var totalSum = { a: 0 };
  TotalSum(totalSum);
  var b = $("#receiveMoney").val() - totalSum.a;
  if (b > 0) {
    $("#changeMoney").text(convert(b) + "đ");
  } else {
    $("#changeMoney").text("");
  }
}

function triggleFieldset() {
  let a = $("#orderDocstatus option:selected").val();
  if (a == "CASH-ON-DELIVERY") {
    $("fieldset").prop("disabled", true);
  } else {
    $("fieldset").prop("disabled", false);
  }
}

function activeModal2nd() {
  $("#bill-modal").modal("hide");
  $("#customer-modal").modal("show");
}
function backCustomer() {
  $("#customer-modal").modal("hide");
  $("#bill-modal").modal("show");
}
function activeModal3rd() {
  $("#add-new-customer").modal("show");
}
function disactiveModal2nd() {
  $("#customer-modal").modal("hide");
}
function disactiveModal3rd() {
  $("#add-new-customer").modal("hide");
}
$("#myInput").keypress(function (event) {
  if (event.keyCode == 13 || event.which == 13) {
    event.preventDefault();
  }
});

function createCustomer() {
  var aObj = { a: "" };
  var bObj = { b: "" };
  let e = $("#select_city option:selected").val();
  let f = $("#select_district option:selected").val();
  let g = $("#select_village option:selected").val();
  let h = $("#customer_note").val();
  check_confirm(aObj);
  check_name(bObj);
  if (
    aObj.a == "checked" &&
    bObj.b == "checked" &&
    isNaN(e) == false &&
    isNaN(f) == false &&
    isNaN(g) == false &&
    h.length > 10 &&
    h.length < 1000
  ) {
    let c = $("#customer-name").val();
    let d = $("#customer-phone").val();
    $("#customer-name--receive").text(c);
    $("#customer-phone--receive").text(d);
    $("#customer-name--id").text($("#select_city option:selected").text());
    $("#customer-modal").modal("hide");
    $("#bill-modal").modal("show");
    updateCheckShip();
  } else {
    let showalert = "Vui lòng điền chính xác thông tin giao hàng !";
    toast.show({
      text: showalert,
      duration: 1000,
      onHide: function () {},
    });
  }
}
function updateCheckShip() {
  //đóng gói thông tin gọi ajax
  let f = $("#select_district option:selected").val();
  let objTotal = [];
  for (let i = 0; i < orderArray.length; i++) {
    let objQty = {
      productId: Number($("#proID-" + orderArray[i]).text()),
      qty: Number($("#amount-" + orderArray[i]).val()),
    };
    objTotal.push(objQty);
  }
  let objFee = {
    shopId: 328,
    productFees: objTotal,
    fromToAddressModel: { toDistrictId: Number(f) },
  };
  //console.log(objFee);
  //gọi ajax lấy thông tin ship
  toast.show({
    loading: true,
    onShow: function () {
      setTimeout(function () {
        let resultship = "Vui lòng thử lại !";
        try {
          $.ajax({
            url: urlApi + "shipment/fee",
            type: "POST",
            async: false,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(objFee),
            statusCode: {
              200: function (data) {
                resultship = "Xin mời lựa chọn đơn vị vận chuyển phù hợp";
                $("#dvvc").html("");
                let a = data.data;
                for (let i = 0; i < a.length; i++) {
                  for (let j = 0; j < a[i].carrierPlanDtos.length; j++) {
                    let e = convert(a[i].carrierPlanDtos[j].fee);
                    $("#dvvc").append(
                      "<div><input onclick='shipFee(" +
                        a[i].carrierPlanDtos[j].fee +
                        "," +
                        a[i].carrierPlanDtos[j].carrierPlanId +
                        ")' type='radio' name='shipper' value='" +
                        a[i].carrierPlanDtos[j].fee +
                        "'><span style='display:inline-block;width:300px;padding-left:10px' >" +
                        a[i].carrierPlanDtos[j].description +
                        ":" +
                        "</span><span style='color:#e41b1b'>" +
                        e +
                        "đ</span></div>"
                    );
                  }
                }
                $("#dvvc").append(
                  "<div><input type='radio' name='shipper' onclick='shipFee(0)'><label style='padding-left:10px'>Không chọn</label></div>"
                );
              },
            },
            error: function (data) {
              console.log(data);
            },
          });
        } catch (e) {
          console.log(e);
        }
        if (resultship == "Xin mời lựa chọn đơn vị vận chuyển phù hợp") {
          toast.showSuccess({
            text: resultship,
            duration: 1000,
            onHide: function () {},
          });
        } else {
          toast.show({
            text: resultship,
            duration: 1000,
            onHide: function () {},
          });
        }
      }, 100);
    },
  });
}
//change radio button ship fee
var carrierPlanId_obj = 0;
var shipFeeValue = 0;
function shipFee(value, carrier) {
  carrierPlanId_obj = carrier;
  shipFeeValue = value;
  totalVoucherFee();
}

function check_name(bObj) {
  let name = $("#customer-name").val();
  if (name.length < 5) {
    html = "Vui lòng điền tên tối thiểu 5 ký tự";
    document.getElementById("confirm-result--name").innerHTML = html;
    $("#name-result").css("display", "block");
  } else {
    html = "";
    document.getElementById("confirm-result--name").innerHTML = html;
    $("#name-result").css("display", "none");
    bObj.b = "checked";
  }
}
function check_confirm(aObj) {
  var confirm = $("#customer-phone").val();
  var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
  if (vnf_regex.test(confirm) == false) {
    html = "Vui lòng điền chính xác số điện thoại";
    document.getElementById("confirm-result--phone").innerHTML = html;
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
  var vnf_regex = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/gm;
  if (vnf_regex.test(confirm) == false) {
    html = "Vui lòng điền chính xác địa chỉ email";
    document.getElementById("confirm-result--email").innerHTML = html;
    $("#email-result").css("display", "block");
  } else {
    html = "";
    document.getElementById("confirm-result--email").innerHTML = html;
    $("#email-result").css("display", "none");
    bObj.b = "checked";
  }
}
function barcode() {
  if ($("#bar-check").is(":checked")) {
    $("#myInput").focus();
  }
}
//call ajax địa chỉ ship

$(document).ready(function () {
  try {
    $.ajax({
      url: urlApi + "nationals",
      type: "GET",
      dataType: "JSON",
      statusCode: {
        200: function (data) {
          for (let i = 0; i < data.data.length; i++) {
            $("#vietnam").append(
              "<option value='" +
                data.data[i].nationalId +
                "'>" +
                data.data[i].name +
                " (Mặc Định) </option>"
            );
          }
        },
      },
      error: function (data) {
        console.log(data);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
$("#vietnam").on("select2:select", function (e) {
  try {
    $.ajax({
      url: urlApi + "provinces?nationalId=" + e.params.data.id,
      type: "GET",
      dataType: "JSON",
      statusCode: {
        200: function (data) {
          $("#select_city").html("");
          $("#select_city").html(`<option >Chọn Tỉnh/thành phố</option>`);
          for (let i = 0; i < data.data.length; i++) {
            $("#select_city").append(
              "<option value='" +
                data.data[i].provinceId +
                "'>" +
                data.data[i].name +
                "</option>"
            );
          }
        },
      },
      error: function (data) {
        console.log(data);
      },
    });
  } catch (e) {
    console.log(e);
  }
});

$("#select_city").on("select2:select", function (e) {
  try {
    $.ajax({
      url: urlApi + "districts?provinceId=" + e.params.data.id,
      type: "GET",
      dataType: "JSON",
      statusCode: {
        200: function (data) {
          $("#select_district").html("");
          $("#select_district").html(`<option >Chọn TP/quận huyện</option>`);
          for (let i = 0; i < data.data.length; i++) {
            $("#select_district").append(
              "<option value='" +
                data.data[i].districtId +
                "'>" +
                data.data[i].name +
                "</option>"
            );
          }
        },
      },
      error: function (data) {
        console.log(data);
      },
    });
  } catch (e) {
    console.log(e);
  }
});

$("#select_district").on("select2:select", function (e) {
  try {
    $.ajax({
      url: urlApi + "wards?districtId=" + e.params.data.id,
      type: "GET",
      dataType: "JSON",
      statusCode: {
        200: function (data) {
          $("#select_village").html("");
          $("#select_village").html(`<option >Chọn Xã/phường</option>`);
          for (let i = 0; i < data.data.length; i++) {
            $("#select_village").append(
              "<option value='" +
                data.data[i].wardId +
                "'>" +
                data.data[i].name +
                "</option>"
            );
          }
        },
      },
      error: function (data) {
        console.log(data);
      },
    });
  } catch (e) {
    console.log(e);
  }
});
