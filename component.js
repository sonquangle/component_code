window.AlertClass = AlertClass;
window.ConfirmClass = ConfirmClass;
window.ToastClass = ToastClass;


window.onload = function(){
  let componentStyle = document.createElement('style');
  let componentStyleHtml = '.component_mask{' +
    'position: fixed;z-index: 9998;width: 100%;height: 100%;top: 0;left: 0;' +
    'background: rgba(0,0,0,.3);}' +
    '.component_toast {' +
    'position: relative;top: 30%;margin: 0 auto;min-width: 200px;width: 50%;max-width: 300px;' +
    'padding: 10px;background: #fff;text-align: center;border-radius: 5px;}' +
    '.component_dialog {' +
    'position: fixed;z-index: 9999;min-width: 300px;top: 50%;left: 50%;' +
    '-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);background-color: #fafafc;' +
    'text-align: center;border-radius: 3px;}' +
    '.component_dialog_confirm .component_dialog .component_dialog_hd {' +
    'padding: 1.2em 20px .5em}' +
    '.component_dialog_confirm .component_dialog .component_dialog_bd {' +
    'text-align: left}' +
    '.component_dialog_hd {' +
    'padding: 1.2em 20px .5em;}' +
    '.component_dialog_title {' +
    'font-weight: 400;font-size: 17px;}' +
    '.component_dialog_bd {' +
    'padding: 0 20px;font-size: 15px;color: #888;word-wrap: break-word;word-break: break-all;}' +
    '.component_dialog_ft {' +
    'position: relative;line-height: 42px;margin-top: 20px;font-size: 17px;display: -webkit-box;' +
    'display: -webkit-flex;display: -ms-flexbox;display: flex;}' +
    '.component_dialog_ft .component_btn {' +
    'display: block;-webkit-box-flex: 1;-webkit-flex: 1;-ms-flex: 1;flex: 1;color: #999;' +
    'text-decoration: none;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);border-left: 1px solid #d5d5d6;}' +
    '.component_dialog_ft .component_btn:first-child{border: none;}'+
    '.component_dialog_ft .component_btn:active {' +
    'background-color: #eee;}' +
    '.component_dialog_ft:after {content: " ";position: absolute;left: 0;top: 0;width: 100%;' +
    'height: 1px;border-top: 1px solid #d5d5d6;color: #d5d5d6;-webkit-transform-origin: 0 0;' +
    'transform-origin: 0 0;-webkit-transform: scaleY(.5);transform: scaleY(.5)}' +
    '.component_dialog_ft .confirm{' +
    'color: #3cc51f;}'+
    '.component_dialog_ft .cancel{' +
    'color: #E42626;}'+
    '.component_btn_dialog.default {color: #353535}.component_btn_dialog.primary {color: #0bb20c}';
  componentStyle.innerHTML = componentStyleHtml;
  document.body.appendChild(componentStyle);
};


function ToastClass () {}

ToastClass.prototype.show = function (options) {
  if (this.instance) {
    this.hide ();
  }
  ToastClass.instance = this;
  let text = options.text || 'Đang Gửi Dữ Liệu...';
  let duration = options.duration;
  this.showFn = options.onShow;
  this.hideFn = options.onHide;
  let loading = options.loading;

  let toast = document.createElement ('div');
  let innerHTMLArr = ['<div class="component_mask"><div class="component_toast">'];
  if (loading) {
    innerHTMLArr.push('<div><img src="<%=request.getContextPath()%>/images/trangchu/waiting.gif" ' +
      'width="26%" /></div>');
  }
  innerHTMLArr.push('<div style="font-size: 20px;margin:20px;color:red;"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ' + text + '</div></div></div>');
  toast.innerHTML = innerHTMLArr.join ('');
  document.body.appendChild (toast);

  this.showFn && this.showFn();
 
  this.onShow && this.onShow();

  this.instance = toast;

  if (duration) {
    setTimeout (function () {
      ToastClass.instance.hide ();
    }, duration);
  }

};

ToastClass.prototype.showSuccess = function (options) {
  if (this.instance) {
    this.hide ();
  }
  ToastClass.instance = this;
  let text = options.text || 'Đang Gửi Dữ Liệu...';
  let duration = options.duration;
  this.showFn = options.onShow;
  this.hideFn = options.onHide;
  let loading = options.loading;

  let toast = document.createElement ('div');
  let innerHTMLArr = ['<div class="component_mask"><div class="component_toast">'];
  if (loading) {
    innerHTMLArr.push('<div><img src="<%=request.getContextPath()%>/images/trangchu/waiting.gif" ' +
      'width="26%" /></div>');
  }
  innerHTMLArr.push('<div style="font-size: 20px;margin:20px;color:#4caf50;"><i class="fa fa-check" aria-hidden="true"></i> ' + text + '</div></div></div>');
  toast.innerHTML = innerHTMLArr.join ('');
  document.body.appendChild (toast);

  this.showFn && this.showFn();
 
  this.onShow && this.onShow();

  this.instance = toast;

  if (duration) {
    setTimeout (function () {
      ToastClass.instance.hide ();
    }, duration);
  }

};

ToastClass.prototype.hide = function () {
  let instance = this.instance;
  if (instance && instance.parentNode) {
    instance.parentNode.removeChild(instance);
  }

  this.hideFn && this.hideFn();
  this.onHide && this.onHide();
};


function ConfirmClass () {}

ConfirmClass.prototype.show = function (options) {
  if (this.instance) {
    this.hide ();
  }
  let defaultBtns = [{text: 'Có', class: 'confirm'}, {text: 'Hủy', class: 'cancel'}];
  ConfirmClass.instance = this;
  let title = options.title || '';
  let content = options.content || '';
  this.hideFn = options.onHide;
  this.showFn = options.onShow;
  this.close = true;

  if(!!options.btns){
    let tempBtns = options.btns.slice(0, 2);
    defaultBtns.forEach(function(v, i){
      tempBtns[i] = tempBtns[i] || v;
      for(let j in v){
        tempBtns[i][j] = tempBtns[i][j] || v[j];
      }
    });
    this.btns = tempBtns.concat(options.btns.slice(2));
  }else{
    this.btns = defaultBtns;
  }

  let confirm = document.createElement ('div');
  let btnHtml = '';
  this.btns.forEach(function (v, i){
    btnHtml += '<a class="component_btn '+ (v.class||'') +'" style="cursor: pointer;" onclick="ConfirmClass.btnClick('+ i +', event)">'+ (v.text||'Có') +'</a>'
  });
  confirm.innerHTML = ['<div class="component_mask">',
    '<div class="component_dialog" id="ConfirmClass_ComfirmArea">',
    '<div class="component_dialog_hd"><strong class="component_dialog_title">' + title + '</strong></div>',
    '<div class="component_dialog_bd">' + content + '</div>',
    '<div class="component_dialog_ft">',
    btnHtml,
    '</div></div></div>'].join ('');

  document.body.appendChild (confirm);

  this.showFn && this.showFn();
  this.onShow && this.onShow();

  this.instance = confirm;

};

ConfirmClass.btnClick = function (index){
  let instance = ConfirmClass.instance;
  if (typeof instance.btns[index].callback === 'function') {
    instance.btns[index].callback(instance);
  }
  if (instance.close) {
    instance.hide();
  }else{
    instance.close = true;
  }

};

ConfirmClass.prototype.hide = function () {
  let instance = this.instance;
  if (instance && instance.parentNode) {
    instance.parentNode.removeChild(instance);
  }

  this.hideFn && this.hideFn();
  this.onHide && this.onHide();
};

function AlertClass () {}


AlertClass.prototype.show = function (options) {
  if (this.instance) {
    this.hide ();
  }
  AlertClass.instance = this;
  let title = options.title || '';
  let content = options.content || '';
  let btnText = options.btnText || 'Có';
  this.hideFn = options.onHide;
  this.showFn = options.onShow;

  let alert = document.createElement ('div');
  alert.innerHTML = ['<div class="component_mask">',
    '<div class="component_dialog">',
    '<div class="component_dialog_hd"><strong class="component_dialog_title">'+title+'</strong></div>',
    '<div class="component_dialog_bd">'+content+'</div>',
    '<div class="component_dialog_ft">',
    '<a class="component_btn component_btn_dialog primary" onclick="AlertClass.btnClick()">'+btnText+'</a>',
    '</div></div></div>'].join('');

  document.body.appendChild (alert);

  this.showFn && this.showFn();
  this.onShow && this.onShow();

  this.instance = alert;
};

AlertClass.btnClick = function (){
  let instance = AlertClass.instance;
  instance.hide();
};

AlertClass.prototype.hide = function () {
  let instance = this.instance;
  if (instance && instance.parentNode) {
    instance.parentNode.removeChild(instance);
  }
  this.hideFn && this.hideFn();
  this.onHide && this.onHide();
};
