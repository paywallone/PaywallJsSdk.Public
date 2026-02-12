(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
			(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.PaywallSDK = {}));
})(this, (function (exports) { 'use strict';

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var masterpassJavascriptSdkWeb_min = {};

	var hasRequiredMasterpassJavascriptSdkWeb_min;

	function requireMasterpassJavascriptSdkWeb_min () {
		if (hasRequiredMasterpassJavascriptSdkWeb_min) return masterpassJavascriptSdkWeb_min;
		hasRequiredMasterpassJavascriptSdkWeb_min = 1;
		!function n(o,i,a){function s(e,t){if(!i[e]){if(!o[e]){var r="function"==typeof commonjsRequire&&commonjsRequire;if(!t&&r)return r(e,true);if(c)return c(e,true);throw (t=new Error("Cannot find module '"+e+"'")).code="MODULE_NOT_FOUND",t}r=i[e]={exports:{}},o[e][0].call(r.exports,function(t){return s(o[e][1][t]||t)},r,r.exports,n,o,i,a);}return i[e].exports}for(var c="function"==typeof commonjsRequire&&commonjsRequire,t=0;t<a.length;t++)s(a[t]);return s}({1:[function(t,e,r){function o(t){return (o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function i(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||false,n.configurable=true,"value"in n&&(n.writable=true),Object.defineProperty(t,function(t){t=function(t,e){if("object"!==o(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0===r)return ("string"===e?String:Number)(t);r=r.call(t,e);if("object"!==o(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return "symbol"===o(t)?t:String(t)}(n.key),n);}}Object.defineProperty(r,"__esModule",{value:true}),r.default=void 0;r.default=function(){function t(){if(!(this instanceof t))throw new TypeError("Cannot call a class as a function")}var e,r;return e=t,(r=[{key:"encrypt",value:function(t){return T.encrypt(t)}}])&&i(e.prototype,r),Object.defineProperty(e,"prototype",{writable:false}),t}();function m(t,e,r){null!=t&&("number"==typeof t?this.fromNumber(t,e,r):null==e&&"string"!=typeof t?this.fromString(t,256):this.fromString(t,e));}function g(){return new m(null)}r="Microsoft Internet Explorer"==navigator.appName?(m.prototype.am=function(t,e,r,n,o,i){for(var a=32767&e,s=e>>15;0<=--i;){var c=32767&this[t],u=this[t++]>>15,l=s*c+u*a;o=((c=a*c+((32767&l)<<15)+r[n]+(1073741823&o))>>>30)+(l>>>15)+s*u+(o>>>30),r[n++]=1073741823&c;}return o},30):"Netscape"!=navigator.appName?(m.prototype.am=function(t,e,r,n,o,i){for(;0<=--i;){var a=e*this[t++]+r[n]+o;o=Math.floor(a/67108864),r[n++]=67108863&a;}return o},26):(m.prototype.am=function(t,e,r,n,o,i){for(var a=16383&e,s=e>>14;0<=--i;){var c=16383&this[t],u=this[t++]>>14,l=s*c+u*a;o=((c=a*c+((16383&l)<<14)+r[n]+o)>>28)+(l>>14)+s*u,r[n++]=268435455&c;}return o},28),m.prototype.DB=r,m.prototype.DM=(1<<r)-1,m.prototype.DV=1<<r;m.prototype.FV=Math.pow(2,52),m.prototype.F1=52-r,m.prototype.F2=2*r-52;for(var n="0123456789abcdefghijklmnopqrstuvwxyz",c=new Array,a="0".charCodeAt(0),s=0;s<=9;++s)c[a++]=s;for(a="a".charCodeAt(0),s=10;s<36;++s)c[a++]=s;for(a="A".charCodeAt(0),s=10;s<36;++s)c[a++]=s;function u(t){return n.charAt(t)}function l(t){var e=g();return e.fromInt(t),e}function b(t){var e,r=1;return 0!=(e=t>>>16)&&(t=e,r+=16),0!=(e=t>>8)&&(t=e,r+=8),0!=(e=t>>4)&&(t=e,r+=4),0!=(e=t>>2)&&(t=e,r+=2),0!=(e=t>>1)&&(t=e,r+=1),r}function h(t){this.m=t;}function f(t){this.m=t,this.mp=t.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<t.DB-15)-1,this.mt2=2*t.t;}function p(){this.i=0,this.j=0,this.S=new Array;}h.prototype.convert=function(t){return t.s<0||0<=t.compareTo(this.m)?t.mod(this.m):t},h.prototype.revert=function(t){return t},h.prototype.reduce=function(t){t.divRemTo(this.m,null,t);},h.prototype.mulTo=function(t,e,r){t.multiplyTo(e,r),this.reduce(r);},h.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e);},f.prototype.convert=function(t){var e=g();return t.abs().dlShiftTo(this.m.t,e),e.divRemTo(this.m,null,e),t.s<0&&0<e.compareTo(m.ZERO)&&this.m.subTo(e,e),e},f.prototype.revert=function(t){var e=g();return t.copyTo(e),this.reduce(e),e},f.prototype.reduce=function(t){for(;t.t<=this.mt2;)t[t.t++]=0;for(var e=0;e<this.m.t;++e){var r=32767&t[e],n=r*this.mpl+((r*this.mph+(t[e]>>15)*this.mpl&this.um)<<15)&t.DM;for(t[r=e+this.m.t]+=this.m.am(0,n,t,e,0,this.m.t);t[r]>=t.DV;)t[r]-=t.DV,t[++r]++;}t.clamp(),t.drShiftTo(this.m.t,t),0<=t.compareTo(this.m)&&t.subTo(this.m,t);},f.prototype.mulTo=function(t,e,r){t.multiplyTo(e,r),this.reduce(r);},f.prototype.sqrTo=function(t,e){t.squareTo(e),this.reduce(e);},m.prototype.copyTo=function(t){for(var e=this.t-1;0<=e;--e)t[e]=this[e];t.t=this.t,t.s=this.s;},m.prototype.fromInt=function(t){this.t=1,this.s=t<0?-1:0,0<t?this[0]=t:t<-1?this[0]=t+this.DV:this.t=0;},m.prototype.fromString=function(t,e){var r;if(16==e)r=4;else if(8==e)r=3;else if(256==e)r=8;else if(2==e)r=1;else if(32==e)r=5;else {if(4!=e)return void this.fromRadix(t,e);r=2;}this.t=0,this.s=0;for(var n,o=t.length,i=false,a=0;0<=--o;){var s=8==r?255&t[o]:(s=o,null==(n=c[(n=t).charCodeAt(s)])?-1:n);s<0?"-"==t.charAt(o)&&(i=true):(i=false,0==a?this[this.t++]=s:a+r>this.DB?(this[this.t-1]|=(s&(1<<this.DB-a)-1)<<a,this[this.t++]=s>>this.DB-a):this[this.t-1]|=s<<a,(a+=r)>=this.DB&&(a-=this.DB));}8==r&&0!=(128&t[0])&&(this.s=-1,0<a)&&(this[this.t-1]|=(1<<this.DB-a)-1<<a),this.clamp(),i&&m.ZERO.subTo(this,this);},m.prototype.clamp=function(){for(var t=this.s&this.DM;0<this.t&&this[this.t-1]==t;)--this.t;},m.prototype.dlShiftTo=function(t,e){for(var r=this.t-1;0<=r;--r)e[r+t]=this[r];for(r=t-1;0<=r;--r)e[r]=0;e.t=this.t+t,e.s=this.s;},m.prototype.drShiftTo=function(t,e){for(var r=t;r<this.t;++r)e[r-t]=this[r];e.t=Math.max(this.t-t,0),e.s=this.s;},m.prototype.lShiftTo=function(t,e){for(var r=t%this.DB,n=this.DB-r,o=(1<<n)-1,i=Math.floor(t/this.DB),a=this.s<<r&this.DM,s=this.t-1;0<=s;--s)e[s+i+1]=this[s]>>n|a,a=(this[s]&o)<<r;for(s=i-1;0<=s;--s)e[s]=0;e[i]=a,e.t=this.t+i+1,e.s=this.s,e.clamp();},m.prototype.rShiftTo=function(t,e){e.s=this.s;var r=Math.floor(t/this.DB);if(r>=this.t)e.t=0;else {var n=t%this.DB,o=this.DB-n,i=(1<<n)-1;e[0]=this[r]>>n;for(var a=r+1;a<this.t;++a)e[a-r-1]|=(this[a]&i)<<o,e[a-r]=this[a]>>n;0<n&&(e[this.t-r-1]|=(this.s&i)<<o),e.t=this.t-r,e.clamp();}},m.prototype.subTo=function(t,e){for(var r=0,n=0,o=Math.min(t.t,this.t);r<o;)n+=this[r]-t[r],e[r++]=n&this.DM,n>>=this.DB;if(t.t<this.t){for(n-=t.s;r<this.t;)n+=this[r],e[r++]=n&this.DM,n>>=this.DB;n+=this.s;}else {for(n+=this.s;r<t.t;)n-=t[r],e[r++]=n&this.DM,n>>=this.DB;n-=t.s;}e.s=n<0?-1:0,n<-1?e[r++]=this.DV+n:0<n&&(e[r++]=n),e.t=r,e.clamp();},m.prototype.multiplyTo=function(t,e){var r=this.abs(),n=t.abs(),o=r.t;for(e.t=o+n.t;0<=--o;)e[o]=0;for(o=0;o<n.t;++o)e[o+r.t]=r.am(0,n[o],e,o,0,r.t);e.s=0,e.clamp(),this.s!=t.s&&m.ZERO.subTo(e,e);},m.prototype.squareTo=function(t){for(var e=this.abs(),r=t.t=2*e.t;0<=--r;)t[r]=0;for(r=0;r<e.t-1;++r){var n=e.am(r,e[r],t,2*r,0,1);(t[r+e.t]+=e.am(r+1,2*e[r],t,2*r+1,n,e.t-r-1))>=e.DV&&(t[r+e.t]-=e.DV,t[r+e.t+1]=1);}0<t.t&&(t[t.t-1]+=e.am(r,e[r],t,2*r,0,1)),t.s=0,t.clamp();},m.prototype.divRemTo=function(t,e,r){var n=t.abs();if(!(n.t<=0)){var o=this.abs();if(o.t<n.t)null!=e&&e.fromInt(0),null!=r&&this.copyTo(r);else {null==r&&(r=g());var i=g(),a=this.s,t=t.s,s=this.DB-b(n[n.t-1]),c=(0<s?(n.lShiftTo(s,i),o.lShiftTo(s,r)):(n.copyTo(i),o.copyTo(r)),i.t),u=i[c-1];if(0!=u){var n=u*(1<<this.F1)+(1<c?i[c-2]>>this.F2:0),l=this.FV/n,h=(1<<this.F1)/n,f=1<<this.F2,p=r.t,d=p-c,v=null==e?g():e;for(i.dlShiftTo(d,v),0<=r.compareTo(v)&&(r[r.t++]=1,r.subTo(v,r)),m.ONE.dlShiftTo(c,v),v.subTo(i,i);i.t<c;)i[i.t++]=0;for(;0<=--d;){var y=r[--p]==u?this.DM:Math.floor(r[p]*l+(r[p-1]+f)*h);if((r[p]+=i.am(0,y,r,d,0,c))<y)for(i.dlShiftTo(d,v),r.subTo(v,r);r[p]<--y;)r.subTo(v,r);}null!=e&&(r.drShiftTo(c,e),a!=t)&&m.ZERO.subTo(e,e),r.t=c,r.clamp(),0<s&&r.rShiftTo(s,r),a<0&&m.ZERO.subTo(r,r);}}}},m.prototype.invDigit=function(){var t,e;return this.t<1||0==(1&(t=this[0]))?0:0<(e=(e=(e=(e=(e=3&t)*(2-(15&t)*e)&15)*(2-(255&t)*e)&255)*(2-((65535&t)*e&65535))&65535)*(2-t*e%this.DV)%this.DV)?this.DV-e:-e},m.prototype.isEven=function(){return 0==(0<this.t?1&this[0]:this.s)},m.prototype.exp=function(t,e){if(4294967295<t||t<1)return m.ONE;var r,n=g(),o=g(),i=e.convert(this),a=b(t)-1;for(i.copyTo(n);0<=--a;)e.sqrTo(n,o),0<(t&1<<a)?e.mulTo(o,i,n):(r=n,n=o,o=r);return e.revert(n)},m.prototype.toString=function(t){if(this.s<0)return "-"+this.negate().toString(t);var e;if(16==t)e=4;else if(8==t)e=3;else if(2==t)e=1;else if(32==t)e=5;else {if(4!=t)return this.toRadix(t);e=2;}var r,n=(1<<e)-1,o=false,i="",a=this.t,s=this.DB-a*this.DB%e;if(0<a--)for(s<this.DB&&0<(r=this[a]>>s)&&(o=true,i=u(r));0<=a;)s<e?(r=(this[a]&(1<<s)-1)<<e-s,r|=this[--a]>>(s+=this.DB-e)):(r=this[a]>>(s-=e)&n,s<=0&&(s+=this.DB,--a)),(o=0<r?true:o)&&(i+=u(r));return o?i:"0"},m.prototype.negate=function(){var t=g();return m.ZERO.subTo(this,t),t},m.prototype.abs=function(){return this.s<0?this.negate():this},m.prototype.compareTo=function(t){var e=this.s-t.s;if(0!=e)return e;var r=this.t;if(0!=(e=r-t.t))return this.s<0?-e:e;for(;0<=--r;)if(0!=(e=this[r]-t[r]))return e;return 0},m.prototype.bitLength=function(){return this.t<=0?0:this.DB*(this.t-1)+b(this[this.t-1]^this.s&this.DM)},m.prototype.mod=function(t){var e=g();return this.abs().divRemTo(t,null,e),this.s<0&&0<e.compareTo(m.ZERO)&&t.subTo(e,e),e},m.prototype.modPowInt=function(t,e){return e=new(t<256||e.isEven()?h:f)(e),this.exp(t,e)},m.ZERO=l(0),m.ONE=l(1),p.prototype.init=function(t){for(var e,r,n=0;n<256;++n)this.S[n]=n;for(n=e=0;n<256;++n)e=e+this.S[n]+t[n%t.length]&255,r=this.S[n],this.S[n]=this.S[e],this.S[e]=r;this.i=0,this.j=0;},p.prototype.next=function(){var t;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,t=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=t,this.S[t+this.S[this.i]&255]};var d,v=256;function y(){var t;t=(new Date).getTime(),w[D++]^=255&t,w[D++]^=t>>8&255,w[D++]^=t>>16&255,w[D++]^=t>>24&255,v<=D&&(D-=v);}if(null==w){var w=new Array,D=0;if(window.crypto&&window.crypto.getRandomValues){var S=new Uint8Array(32);for(window.crypto.getRandomValues(S),j=0;j<32;++j)w[D++]=S[j];}if("Netscape"==navigator.appName&&navigator.appVersion<"5"&&window.crypto)for(var E=window.crypto.random(32),j=0;j<E.length;++j)w[D++]=255&E.charCodeAt(j);for(;D<v;)j=Math.floor(65536*Math.random()),w[D++]=j>>>8,w[D++]=255&j;D=0,y();}function P(){if(null==d){for(y(),(d=new p).init(w),D=0;D<w.length;++D)w[D]=0;D=0;}return d.next()}function x(){}function O(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null;}x.prototype.nextBytes=function(t){for(var e=0;e<t.length;++e)t[e]=P();},O.prototype.doPublic=function(t){return t.modPowInt(this.e,this.n)},O.prototype.setPublic=function(t,e){null!=t&&null!=e&&0<t.length&&0<e.length?(this.n=new m(t,16),this.e=parseInt(e,16)):alert("Invalid RSA public key");},O.prototype.encrypt=function(t){return null==(t=function(t,e){if(e<t.length+11)return alert("Message too long for RSA"),null;for(var r=new Array,n=t.length-1;0<=n&&0<e;){var o=t.charCodeAt(n--);o<128?r[--e]=o:127<o&&o<2048?(r[--e]=63&o|128,r[--e]=o>>6|192):(r[--e]=63&o|128,r[--e]=o>>6&63|128,r[--e]=o>>12|224);}r[--e]=0;for(var i=new x,a=new Array;2<e;){for(a[0]=0;0==a[0];)i.nextBytes(a);r[--e]=a[0];}return r[--e]=2,r[--e]=0,new m(r)}(t,this.n.bitLength()+7>>3))||null==(t=this.doPublic(t))?null:0==(1&(t=t.toString(16)).length)?t:"0"+t};var T=new O;T.setPublic("F619C53A37BAB059C583DA9AC4E2920FFC9D57E00885E82F7A0863DEAC43CE06374E45A1417DAC907C6CAC0AF1DDF1D7152192FED7A1D9255C97BC27E420E0742B95ED3C53C62995F42CB6EEDB7B1FBDD3E4F4A4AA935650DA81E763CA7074690032F6A6AF72802CC50394C2AFA5C9450A990E6F969A38571C8BC9E381125D2BEEC348AF919D7374FF10DC3E0B4367566CE929AD6EA323A475A677EB41C20B42D44E82E8A53DD52334D927394FCADF09","03");},{}],2:[function(t,e,r){Object.defineProperty(r,"__esModule",{value:true}),r.Masterpass=void 0;var n=t("./utils/request.js"),o=t("./services/verifyService.js"),i=t("./services/accountService.js"),a=t("./services/paymentService.js"),t=t("./services/creditService.js");r.Masterpass=window.Masterpass={setEndpoint:n.Rest.setEndpoint,setToken:n.Rest.setToken,setApiVersion:n.Rest.setApiVersion,setLanguage:n.Rest.setLanguage,setMerchantId:n.Rest.setMerchantId,accountService:i.AccountService,verifyService:o.VerifyService,paymentService:a.PaymentService,creditService:t.CreditService};},{"./services/accountService.js":3,"./services/creditService.js":4,"./services/paymentService.js":5,"./services/verifyService.js":6,"./utils/request.js":7}],3:[function(t,e,r){Object.defineProperty(r,"__esModule",{value:true}),r.AccountService=void 0;var n,o=t("../utils/request.js"),i=(n=t("../libs/rsa.js"))&&n.__esModule?n:{default:n},a=t("../utils/utils.js");var s={endpoint:"/account"},c="/api/Account",u="/api/Card",l="/api/RecurringOrder";r.AccountService={setEndpoint:function(t){s.endpoint=t;},addUserId:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","currentUserId","newUserId"]),o.Rest.post(s.endpoint+c+"/AddUserId",t,e);},forgotPassword:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","lastSixDigitsOfCard","userId","authenticationMethod"]),o.Rest.post(s.endpoint+c+"/ForgotPassword",t,e);},linkToMerchant:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","userId"]),o.Rest.put(s.endpoint+c+"/LinkToMerchant",t,e);},updateUserId:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","currentUserId","newUserId"]),o.Rest.patch(s.endpoint+c+"/UserId",t,e);},updateUserMsisdn:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","userId","newMsisdn"]),o.Rest.patch(s.endpoint+c+"/Msisdn",t,e);},accountAccess:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","accountKeyType","userId"]),o.Rest.get(s.endpoint+u,t,e);},addCard:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0,r=t.cardNumber.replace(/\s/g,"");if(!a.Utils.validateCard(r))throw new Error("Kart numarası geçerli değil!");var n=new i.default;t.cardNumber=n.encrypt(r),t.cvv=n.encrypt(t.cvv.replace(/\s/g,"")),t.deviceFingerPrint="",t=a.Utils.operationParameters(t,["accountKey","accountKeyType","userId","requestReferenceNumber","cardNumber","expiryDate","accountAliasName","cardHolderName","cvv","deviceFingerPrint","additionalParams"]),o.Rest.post(s.endpoint+u,t,e);},removeCard:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","cardAlias"]),o.Rest.del(s.endpoint+u,t,e);},completeRegistration:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;(t=a.Utils.operationParameters(t,["accountKey","userId","accountAliasName","isMsisdnValidatedByMerchant"])).token=FlowDirectable.token,o.Rest.post(s.endpoint+"/api/PurchaseAndRegister",t,e);},recurringOrder:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","authenticationMethod","amountLimit","requestReferenceNumber","cardAlias","productId","expiryDate"]),o.Rest.post(s.endpoint+l,t,e);},recurringOrderUpdate:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","amountLimit","requestReferenceNumber","cardAlias","productId","expiryDate"]),o.Rest.put(s.endpoint+l,t,e);},recurringOrderDelete:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","authenticationMethod","authenticationMethod","amountLimit","requestReferenceNumber","cardAlias","productId"]),o.Rest.del(s.endpoint+l,t,e);}};},{"../libs/rsa.js":1,"../utils/request.js":7,"../utils/utils.js":8}],4:[function(t,e,r){Object.defineProperty(r,"__esModule",{value:true}),r.CreditService=void 0;var n,o=t("../utils/request.js"),i=(n=t("../libs/rsa.js"))&&n.__esModule?n:{default:n},a=t("../utils/utils.js");var s={endpoint:"/credit-bff"};r.CreditService={setEndpoint:function(t){s.endpoint=t;},loanGetUrl:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0,r=new i.default;t.cvc=r.encrypt(t.cvc.replace(/\s/g,"")),t.deviceFingerPrint="",t=a.Utils.operationParameters(t,["accountKey","userId","requestReferenceNo","amount","isMsisdnValidatedByMerchant","currencyCode","orderNo","terminalGroupId","cvc","acquirerIcaNumber","loanIssuerIcaNumber","accessToken","campaingCode","basket"]),o.Rest.post(s.endpoint+"/api/Loan/geturl",t,e);},overdraftQuery:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0,r=o.FlowDirectable.uri;o.Rest.get(s.endpoint+r,t,e);}};},{"../libs/rsa.js":1,"../utils/request.js":7,"../utils/utils.js":8}],5:[function(t,e,r){Object.defineProperty(r,"__esModule",{value:true}),r.PaymentService=void 0;var n,o=t("../utils/request.js"),i=(n=t("../libs/rsa.js"))&&n.__esModule?n:{default:n},a=t("../utils/utils.js");var s={endpoint:"/payment"};r.PaymentService={setEndpoint:function(t){s.endpoint=t;},payment:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0;t=a.Utils.operationParameters(t,["accountKey","authenticationMethod","amount","requestReferenceNo","cardAlias","cvc","orderNo","installmentCount","acquirerIcaNumber","terminalGroupId","currencyCode","paymentType","secure3DModel","subMerchant","rewardList","orderDetails","orderProductsDetails","buyerDetails","billDetails","deliveryDetails","otherDetails","mokaSubDealerDetails","terminal","customParameters","additionalParams"]),o.Rest.post(s.endpoint+"/api/Payment/request",t,e);},directPayment:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0,r=t.cardNumber.replace(/\s/g,"");if(!a.Utils.validateCard(r))throw new Error("Kart numarası geçerli değil!");var n=new i.default;t.cardNumber=n.encrypt(r),t.cvc=n.encrypt(t.cvc.replace(/\s/g,"")),t.deviceFingerPrint="",t=a.Utils.operationParameters(t,["accountKey","authenticationMethod","requestReferenceNo","cardNumber","cardHolderName","expiryDate","cvc","cardAlias","amount","orderNo","terminalGroupId","currencyCode","paymentType","acquirerIcaNumber","installmentCount","subMerchant","rewardList","orderDetails","buyerDetails","otherDetails","secure3DModel","mokaSubDealerDetails","deviceFingerPrint","orderProductsDetails","billDetails","deliveryDetails","terminal","customParameters","additionalParams"]),o.Rest.post(s.endpoint+"/api/DirectPayment/request",t,e);},registerAndPurchase:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0,r=t.cardNumber.replace(/\s/g,"");if(!a.Utils.validateCard(r))throw new Error("Kart numarası geçerli değil!");var n=new i.default;t.cardNumber=n.encrypt(r),t.cvc=n.encrypt(t.cvc.replace(/\s/g,"")),t.deviceFingerPrint="",t=a.Utils.operationParameters(t,["accountKey","accountKeyType","merchantUserId","authenticationMethod","requestReferenceNo","orderNo","acquirerIcaNumber","installmentCount","cardAlias","cardNumber","expiryDate","cvc","cardHolderName","amount","deviceFingerPrint","terminalGroupId","currencyCode","paymentType","subMerchant","rewardList","orderDetails","orderProductsDetails","buyerDetails","billDetails","deliveryDetails","otherDetails","secure3DModel","terminal","isMsisdnValidatedByMerchant","mokaSubDealerDetails","customParameters","additionalParams"]),o.Rest.post(s.endpoint+"/api/RegisterAndPurchase",t,e);}};},{"../libs/rsa.js":1,"../utils/request.js":7,"../utils/utils.js":8}],6:[function(t,e,r){Object.defineProperty(r,"__esModule",{value:true}),r.VerifyService=void 0;var o=t("../utils/request.js");function T(t){return (T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function A(){A=function(){return a};var c,a={},t=Object.prototype,u=t.hasOwnProperty,l=Object.defineProperty||function(t,e,r){t[e]=r.value;},e="function"==typeof Symbol?Symbol:{},n=e.iterator||"@@iterator",r=e.asyncIterator||"@@asyncIterator",o=e.toStringTag||"@@toStringTag";function i(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:true,configurable:true,writable:true}),t[e]}try{i({},"");}catch(c){i=function(t,e,r){return t[e]=r};}function s(t,e,r,n){var o,i,a,s,e=e&&e.prototype instanceof m?e:m,e=Object.create(e.prototype),n=new x(n||[]);return l(e,"_invoke",{value:(o=t,i=r,a=n,s=f,function(t,e){if(s===d)throw new Error("Generator is already running");if(s===v){if("throw"===t)throw e;return {value:c,done:true}}for(a.method=t,a.arg=e;;){var r=a.delegate;if(r){r=function t(e,r){var n=r.method,o=e.iterator[n];if(o===c)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=c,t(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;n=h(o,e.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,y;o=n.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=c),r.delegate=null,y):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}(r,a);if(r){if(r===y)continue;return r}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(s===f)throw s=v,a.arg;a.dispatchException(a.arg);}else "return"===a.method&&a.abrupt("return",a.arg);s=d;r=h(o,i,a);if("normal"===r.type){if(s=a.done?v:p,r.arg===y)continue;return {value:r.arg,done:a.done}}"throw"===r.type&&(s=v,a.method="throw",a.arg=r.arg);}})}),e}function h(t,e,r){try{return {type:"normal",arg:t.call(e,r)}}catch(t){return {type:"throw",arg:t}}}a.wrap=s;var f="suspendedStart",p="suspendedYield",d="executing",v="completed",y={};function m(){}function g(){}function b(){}var e={},w=(i(e,n,function(){return this}),Object.getPrototypeOf),w=w&&w(w(O([]))),D=(w&&w!==t&&u.call(w,n)&&(e=w),b.prototype=m.prototype=Object.create(e));function S(t){["next","throw","return"].forEach(function(e){i(t,e,function(t){return this._invoke(e,t)});});}function E(a,s){var e;l(this,"_invoke",{value:function(r,n){function t(){return new s(function(t,e){!function e(t,r,n,o){var i,t=h(a[t],a,r);if("throw"!==t.type)return (r=(i=t.arg).value)&&"object"==T(r)&&u.call(r,"__await")?s.resolve(r.__await).then(function(t){e("next",t,n,o);},function(t){e("throw",t,n,o);}):s.resolve(r).then(function(t){i.value=t,n(i);},function(t){return e("throw",t,n,o)});o(t.arg);}(r,n,t,e);})}return e=e?e.then(t,t):t()}});}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e);}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e;}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(true);}function O(e){if(e||""===e){var r,t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return r=-1,(t=function t(){for(;++r<e.length;)if(u.call(e,r))return t.value=e[r],t.done=false,t;return t.value=c,t.done=true,t}).next=t}throw new TypeError(T(e)+" is not iterable")}return l(D,"constructor",{value:g.prototype=b,configurable:true}),l(b,"constructor",{value:g,configurable:true}),g.displayName=i(b,o,"GeneratorFunction"),a.isGeneratorFunction=function(t){t="function"==typeof t&&t.constructor;return !!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,i(t,o,"GeneratorFunction")),t.prototype=Object.create(D),t},a.awrap=function(t){return {__await:t}},S(E.prototype),i(E.prototype,r,function(){return this}),a.AsyncIterator=E,a.async=function(t,e,r,n,o){ void 0===o&&(o=Promise);var i=new E(s(t,e,r,n),o);return a.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},S(D),i(D,o,"Generator"),i(D,n,function(){return this}),i(D,"toString",function(){return "[object Generator]"}),a.keys=function(t){var e,r=Object(t),n=[];for(e in r)n.push(e);return n.reverse(),function t(){for(;n.length;){var e=n.pop();if(e in r)return t.value=e,t.done=false,t}return t.done=true,t}},a.values=O,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=c,this.done=false,this.delegate=null,this.method="next",this.arg=c,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&u.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=c);},stop:function(){this.done=true;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function t(t,e){return i.type="throw",i.arg=r,n.next=t,e&&(n.method="next",n.arg=c),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=u.call(o,"catchLoc"),s=u.call(o,"finallyLoc");if(a&&s){if(this.prev<o.catchLoc)return t(o.catchLoc,true);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,true)}else {if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&u.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}var i=(o=o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc?null:o)?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return "break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r,n,o=this.tryEntries[e];if(o.tryLoc===t)return "throw"===(r=o.completion).type&&(n=r.arg,P(o)),n}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=c),y}},a}function c(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value;}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o);}var i={endpoint:"/user-authorization"},a="/api/Otp";r.VerifyService={setEndpoint:function(t){i.endpoint=t;},verifyOtp:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=1<arguments.length?arguments[1]:void 0,r=o.FlowDirectable.uri;t.token=o.FlowDirectable.token,o.Rest.post(r,t,e);},resendOtp:function(){return n.apply(this,arguments)}};function n(){var s;return s=A().mark(function t(){var e,r,n=arguments;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e=0<n.length&&void 0!==n[0]?n[0]:{},r=1<n.length?n[1]:void 0,o.Rest.post(i.endpoint+a+"/resend",e,r);case 3:case "end":return t.stop()}},t)}),(n=function(){var t=this,a=arguments;return new Promise(function(e,r){var n=s.apply(t,a);function o(t){c(n,e,r,o,i,"next",t);}function i(t){c(n,e,r,o,i,"throw",t);}o(void 0);})}).apply(this,arguments)}},{"../utils/request.js":7}],7:[function(t,e,r){function T(t){return (T="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function A(){A=function(){return a};var c,a={},t=Object.prototype,u=t.hasOwnProperty,l=Object.defineProperty||function(t,e,r){t[e]=r.value;},e="function"==typeof Symbol?Symbol:{},n=e.iterator||"@@iterator",r=e.asyncIterator||"@@asyncIterator",o=e.toStringTag||"@@toStringTag";function i(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:true,configurable:true,writable:true}),t[e]}try{i({},"");}catch(c){i=function(t,e,r){return t[e]=r};}function s(t,e,r,n){var o,i,a,s,e=e&&e.prototype instanceof m?e:m,e=Object.create(e.prototype),n=new x(n||[]);return l(e,"_invoke",{value:(o=t,i=r,a=n,s=f,function(t,e){if(s===d)throw new Error("Generator is already running");if(s===v){if("throw"===t)throw e;return {value:c,done:true}}for(a.method=t,a.arg=e;;){var r=a.delegate;if(r){r=function t(e,r){var n=r.method,o=e.iterator[n];if(o===c)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=c,t(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),y;n=h(o,e.iterator,r.arg);if("throw"===n.type)return r.method="throw",r.arg=n.arg,r.delegate=null,y;o=n.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=c),r.delegate=null,y):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,y)}(r,a);if(r){if(r===y)continue;return r}}if("next"===a.method)a.sent=a._sent=a.arg;else if("throw"===a.method){if(s===f)throw s=v,a.arg;a.dispatchException(a.arg);}else "return"===a.method&&a.abrupt("return",a.arg);s=d;r=h(o,i,a);if("normal"===r.type){if(s=a.done?v:p,r.arg===y)continue;return {value:r.arg,done:a.done}}"throw"===r.type&&(s=v,a.method="throw",a.arg=r.arg);}})}),e}function h(t,e,r){try{return {type:"normal",arg:t.call(e,r)}}catch(t){return {type:"throw",arg:t}}}a.wrap=s;var f="suspendedStart",p="suspendedYield",d="executing",v="completed",y={};function m(){}function g(){}function b(){}var e={},w=(i(e,n,function(){return this}),Object.getPrototypeOf),w=w&&w(w(O([]))),D=(w&&w!==t&&u.call(w,n)&&(e=w),b.prototype=m.prototype=Object.create(e));function S(t){["next","throw","return"].forEach(function(e){i(t,e,function(t){return this._invoke(e,t)});});}function E(a,s){var e;l(this,"_invoke",{value:function(r,n){function t(){return new s(function(t,e){!function e(t,r,n,o){var i,t=h(a[t],a,r);if("throw"!==t.type)return (r=(i=t.arg).value)&&"object"==T(r)&&u.call(r,"__await")?s.resolve(r.__await).then(function(t){e("next",t,n,o);},function(t){e("throw",t,n,o);}):s.resolve(r).then(function(t){i.value=t,n(i);},function(t){return e("throw",t,n,o)});o(t.arg);}(r,n,t,e);})}return e=e?e.then(t,t):t()}});}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e);}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e;}function x(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(true);}function O(e){if(e||""===e){var r,t=e[n];if(t)return t.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length))return r=-1,(t=function t(){for(;++r<e.length;)if(u.call(e,r))return t.value=e[r],t.done=false,t;return t.value=c,t.done=true,t}).next=t}throw new TypeError(T(e)+" is not iterable")}return l(D,"constructor",{value:g.prototype=b,configurable:true}),l(b,"constructor",{value:g,configurable:true}),g.displayName=i(b,o,"GeneratorFunction"),a.isGeneratorFunction=function(t){t="function"==typeof t&&t.constructor;return !!t&&(t===g||"GeneratorFunction"===(t.displayName||t.name))},a.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,i(t,o,"GeneratorFunction")),t.prototype=Object.create(D),t},a.awrap=function(t){return {__await:t}},S(E.prototype),i(E.prototype,r,function(){return this}),a.AsyncIterator=E,a.async=function(t,e,r,n,o){ void 0===o&&(o=Promise);var i=new E(s(t,e,r,n),o);return a.isGeneratorFunction(e)?i:i.next().then(function(t){return t.done?t.value:i.next()})},S(D),i(D,o,"Generator"),i(D,n,function(){return this}),i(D,"toString",function(){return "[object Generator]"}),a.keys=function(t){var e,r=Object(t),n=[];for(e in r)n.push(e);return n.reverse(),function t(){for(;n.length;){var e=n.pop();if(e in r)return t.value=e,t.done=false,t}return t.done=true,t}},a.values=O,x.prototype={constructor:x,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=c,this.done=false,this.delegate=null,this.method="next",this.arg=c,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&u.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=c);},stop:function(){this.done=true;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(r){if(this.done)throw r;var n=this;function t(t,e){return i.type="throw",i.arg=r,n.next=t,e&&(n.method="next",n.arg=c),!!e}for(var e=this.tryEntries.length-1;0<=e;--e){var o=this.tryEntries[e],i=o.completion;if("root"===o.tryLoc)return t("end");if(o.tryLoc<=this.prev){var a=u.call(o,"catchLoc"),s=u.call(o,"finallyLoc");if(a&&s){if(this.prev<o.catchLoc)return t(o.catchLoc,true);if(this.prev<o.finallyLoc)return t(o.finallyLoc)}else if(a){if(this.prev<o.catchLoc)return t(o.catchLoc,true)}else {if(!s)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return t(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;0<=r;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&u.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}var i=(o=o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc?null:o)?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return "break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),P(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;0<=e;--e){var r,n,o=this.tryEntries[e];if(o.tryLoc===t)return "throw"===(r=o.completion).type&&(n=r.arg,P(o)),n}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=c),y}},a}function i(e,t){var r,n=Object.keys(e);return Object.getOwnPropertySymbols&&(r=Object.getOwnPropertySymbols(e),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)),n}function a(n){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?i(Object(o),true).forEach(function(t){var e,r;e=n,r=o[t=t],(t=function(t){t=function(t,e){if("object"!==T(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0===r)return ("string"===e?String:Number)(t);r=r.call(t,e);if("object"!==T(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}(t,"string");return "symbol"===T(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:r,enumerable:true,configurable:true,writable:true}):e[t]=r;}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(o,t));});}return n}function c(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value;}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o);}function o(s){return function(){var t=this,a=arguments;return new Promise(function(e,r){var n=s.apply(t,a);function o(t){c(n,e,r,o,i,"next",t);}function i(t){c(n,e,r,o,i,"throw",t);}o(void 0);})}}Object.defineProperty(r,"__esModule",{value:true}),r.Rest=r.FlowDirectable=void 0;var s={"Content-Type":"application/json","x-channel":"SYS","x-source-channel":"Web",Accept:"application/json"},u={endpoint:""},l={merchantId:"",sdkVersion:"1.0.4",sourceChannel:"Web"},h=r.FlowDirectable=window.FlowDirectable={uri:"",token:"",url3d:"",url3dSuccess:"",url3dFail:""};r.Rest={setToken:function(t){var e;t=null!=(e=null==(e=t.split(" "))?void 0:e[1])?e:t,s.Authorization="Bearer "+t;},setEndpoint:function(t){u.endpoint=t;},setApiVersion:function(t){s["x-api-version"]=null!=t?t:l.sdkVersion;},setLanguage:function(t){s["x-language"]=null!=t?t:"en-US";},setMerchantId:function(t){l.merchantId=t;},post:function(t,e,r){return n.apply(this,arguments)},put:function(t,e,r){return d.apply(this,arguments)},patch:function(t,e,r){return v.apply(this,arguments)},del:function(t,e,r){return p.apply(this,arguments)},get:function(t,e,r){return y.apply(this,arguments)}};function f(t,e){h.uri=t.get("content-location")||"",h.token=(null==e?void 0:e.token)||"",h.url3d=(null==e?void 0:e.url3d)||"",h.url3dSuccess=(null==e?void 0:e.url3dSuccess)||"",h.url3dFail=(null==e?void 0:e.url3dFail)||"";}function n(){return (n=o(A().mark(function t(e,r,n){var o;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=a(a({},r),l),o={method:"POST",headers:s,body:JSON.stringify(o)},t.next=4,m(u.endpoint+e,o,n);case 4:case "end":return t.stop()}},t)}))).apply(this,arguments)}function p(){return (p=o(A().mark(function t(e,r,n){var o;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=a(a({},r),l),o={method:"DELETE",headers:s,body:JSON.stringify(o)},t.next=4,m(u.endpoint+e,o,n);case 4:case "end":return t.stop()}},t)}))).apply(this,arguments)}function d(){return (d=o(A().mark(function t(e,r,n){var o;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=a(a({},r),l),o={method:"PUT",headers:s,body:JSON.stringify(o)},t.next=4,m(u.endpoint+e,o,n);case 4:case "end":return t.stop()}},t)}))).apply(this,arguments)}function v(){return (v=o(A().mark(function t(e,r,n){var o;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=a(a({},r),l),o={method:"PATCH",headers:s,body:JSON.stringify(o)},t.next=4,m(u.endpoint+e,o,n);case 4:case "end":return t.stop()}},t)}))).apply(this,arguments)}function y(){return (y=o(A().mark(function t(e,r,n){var o,i;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return o=a(a({},r),l),i={method:"GET",headers:s},t.next=4,m(u.endpoint+e+"?"+new URLSearchParams(o),i,n);case 4:case "end":return t.stop()}},t)}))).apply(this,arguments)}function m(){return g.apply(this,arguments)}function g(){return (g=o(A().mark(function t(i,e,r){var a,n;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return n=a="",t.next=4,fetch(i,e).then(function(){var e=o(A().mark(function t(e){var r,n,o;return A().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.json();case 2:return r=t.sent,a=r.statusCode,e.ok?(n=-1!==i.toLowerCase().indexOf("verify"),o=-1!==i.toLowerCase().indexOf("directpayment/request"),202==r.statusCode?(f(e.headers,r.result),r.token=h.token,r.url3d=h.url3d,r.responseCode=r.result.responseCode):200==r.statusCode&&(n||o)&&f(e.headers,r.result)):(console.error(r.exception),r.responseCode=null==(n=r.exception)?void 0:n.code,r.exception.validationErrors?(o=r.exception.validationErrors.map(function(t){return t.message}),r.description=o.join(", ")):r.description=r.exception.message),t.abrupt("return",r);case 6:case "end":return t.stop()}},t)}));return function(t){return e.apply(this,arguments)}}());case 4:n=t.sent,r&&r(a,n);case 6:case "end":return t.stop()}},t)}))).apply(this,arguments)}},{}],8:[function(t,e,r){Object.defineProperty(r,"__esModule",{value:true}),r.Utils=void 0;r.Utils=window.Utils={formDataToClassObject:function(t,e){var r,n=Object.fromEntries(t.entries()),o=Object.getOwnPropertyNames(new e),i={};for(r in n)o.includes(r)&&(i[r]=n[r]);t=new e;return Object.assign(t,i),t},formDataToJson:function(t){t=new FormData(t);return Object.fromEntries(t.entries())},dataToClassObject:function(t,e){var r,n=Object.getOwnPropertyNames(new e),o={};for(r in t)n.includes(r)&&(o[r]=t[r]);e=new e;return Object.assign(e,o),e},decodeJwt:function(t){var e=(t="Bearer "+(t=null!=(e=null==(e=t.split(" "))?void 0:e[1])?e:t)).split(".")[1].replace(/-/g,"+").replace(/_/g,"/"),t=decodeURIComponent(window.atob(e).split("").map(function(t){return "%"+("00"+t.charCodeAt(0).toString(16)).slice(-2)}).join(""));return JSON.parse(t)},validateCard:function(t){for(var e=t.length,r=1,n=0,o=e-1;0<=o;o--){var i=parseInt(t.charAt(o),10);n+=(r^=1)?2*i%10+Math.floor(2*i/10):i;}return n%10==0},operationParameters:function(t,e){for(var r=0,n=Object.keys(t);r<n.length;r++){var o=n[r];e.includes(o)||delete t[o];}return t}};},{}]},{},[2]);
		// Masterpass SDK bundled in Paywall JS SDK
		return masterpassJavascriptSdkWeb_min;
	}

	requireMasterpassJavascriptSdkWeb_min();

	/**
	 * Environment Management
	 *
	 * Centralized environment configuration for PaywallJsSdk.
	 * Maps environment names to Paywall API and Masterpass SDK URLs.
	 */
	/**
	 * Environment configuration mapping.
	 * Contains both Paywall API and Masterpass SDK URLs for each environment.
	 */
	const ENVIRONMENT_CONFIG = {
		dev: {
			paymentApiBaseUrl: 'https://dev-payment-api.itspaywall.com',
			masterpassSdkUrl: 'https://mp-test-sdk.masterpassturkiye.com',
		},
		test: {
			paymentApiBaseUrl: 'https://test-payment-api.itspaywall.com',
			masterpassSdkUrl: 'https://mp-test-sdk.masterpassturkiye.com',
		},
		prod: {
			paymentApiBaseUrl: 'https://payment-api.itspaywall.com',
			masterpassSdkUrl: 'https://mp-sdk.masterpassturkiye.com',
		},
	};
	/**
	 * Global resolved environment config (set during Init).
	 */
	let resolvedEnvironmentConfig = null;
	/**
	 * Resolves all environment configuration from environment name.
	 *
	 * @param environment - Environment name (dev, test, prod)
	 * @returns Resolved environment configuration
	 * @throws Error - If environment is invalid
	 */
	function resolveEnvironmentConfig(environment) {
		const config = ENVIRONMENT_CONFIG[environment];
		if (!config) {
			throw new Error(`Invalid environment: ${environment}. ` +
				`Must be one of: ${Object.keys(ENVIRONMENT_CONFIG).join(', ')}`);
		}
		return {
			environment,
			paymentApiBaseUrl: config.paymentApiBaseUrl,
			masterpassSdkUrl: config.masterpassSdkUrl,
		};
	}
	/**
	 * Sets the resolved environment configuration.
	 * Called during Init() to store the resolved config.
	 *
	 * @param config - Resolved environment configuration
	 * @internal
	 */
	function setResolvedEnvironmentConfig(config) {
		resolvedEnvironmentConfig = config;
	}
	/**
	 * Gets the resolved environment configuration.
	 * Returns null if Init() has not been called yet.
	 *
	 * @returns Resolved environment configuration or null
	 */
	function getResolvedEnvironmentConfig() {
		return resolvedEnvironmentConfig;
	}

	/**
	 * Configuration
	 *
	 * SDK için global konfigürasyon yönetimi.
	 * Environment, baseUrl, API key gibi temel ayarları tutar.
	 */
	let currentConfig = null;
	/**
	 * SDK Lifecycle State
	 * SDK'nın yaşam döngüsü durumunu temsil eder.
	 */
	exports.SdkLifecycleState = void 0;
	(function (SdkLifecycleState) {
		SdkLifecycleState["UNINITIALIZED"] = "UNINITIALIZED";
		SdkLifecycleState["INITIALIZED"] = "INITIALIZED";
	})(exports.SdkLifecycleState || (exports.SdkLifecycleState = {}));
	/**
	 * SDK lifecycle state'i tutan global değişken.
	 * SDK ilk yüklendiğinde UNINITIALIZED, Init() çağrıldığında INITIALIZED olur.
	 */
	let sdkLifecycleState = exports.SdkLifecycleState.UNINITIALIZED;
	/**
	 * SDK lifecycle state'ini set eder.
	 * Internal kullanım için - sadece initConfig() içinde çağrılmalı.
	 */
	function setSdkLifecycleState(state) {
		sdkLifecycleState = state;
	}
	/**
	 * SDK'nın initialize edilip edilmediğini kontrol eder.
	 * Init() çağrılmışsa true, aksi halde false döner.
	 */
	function isSdkInitialized() {
		return sdkLifecycleState === exports.SdkLifecycleState.INITIALIZED;
	}
	/**
	 * SDK'nın initialize edilip edilmediğini kontrol eder.
	 * Eğer initialize edilmemişse Error fırlatır.
	 *
	 * Bu fonksiyon tüm public SDK fonksiyonlarının EN BAŞINDA çağrılmalıdır.
	 *
	 * @throws Error - SDK initialize edilmemişse
	 */
	function assertSdkInitialized() {
		if (!isSdkInitialized()) {
			throw new Error('SDK is not initialized');
		}
	}
	/**
	 * Payment state enum.
	 * Ödeme işleminin durumunu takip etmek için kullanılır.
	 */
	var PaymentState$2;
	(function (PaymentState) {
		PaymentState["NOT_STARTED"] = "NOT_STARTED";
		PaymentState["INITIALIZING"] = "INITIALIZING";
		PaymentState["INITIALIZED"] = "INITIALIZED";
		PaymentState["PROCESSING"] = "PROCESSING";
		PaymentState["COMPLETED"] = "COMPLETED";
		PaymentState["FAILED"] = "FAILED";
	})(PaymentState$2 || (PaymentState$2 = {}));
	/**
	 * Init response'u saklamak için internal state.
	 */
	let initResponse = null;
	let internalState = {};
	/**
	 * Init response'unu saklar.
	 */
	function setInitResponse(response) {
		initResponse = response;
		internalState = {
			...(response && { lastInitResponse: response }),
			...(response.paymentId && { paymentId: response.paymentId }),
			...(response.checkoutId && { checkoutId: response.checkoutId }),
			...(response.uniqueCode && { uniqueCode: response.uniqueCode }),
			...(response.merchantUniqueCode && { merchantUniqueCode: response.merchantUniqueCode }),
		};
	}
	/**
	 * Init response'unu alır.
	 */
	function getInitResponse() {
		return initResponse;
	}
	/**
	 * Transaction ID'yi internal state'e kaydeder.
	 */
	function setTransactionId(transactionId) {
		internalState.transactionId = transactionId;
	}
	/**
	 * Masterpass session state'ini saklar.
	 */
	function setMasterpassSession(session) {
		if (session) {
			internalState.masterpassSession = session;
		}
		else {
			delete internalState.masterpassSession;
		}
	}
	/**
	 * Masterpass session state'ini alır.
	 */
	function getMasterpassSession() {
		return internalState.masterpassSession || null;
	}
	/**
	 * Masterpass session'ın oluşturulup oluşturulmadığını kontrol eder.
	 */
	function hasMasterpassSession() {
		return internalState.masterpassSession !== undefined && internalState.masterpassSession !== null;
	}
	/**
	 * Masterpass session'ın süresi dolmuş mu kontrol eder.
	 * @returns true - session yoksa veya süresi dolmuşsa
	 */
	function isMasterpassSessionExpired() {
		const session = getMasterpassSession();
		if (!session || !session.sessionId)
			return true;
		if (!session.sessionExpiryDate)
			return false; // No expiry date = assume valid
		try {
			const expiryTime = new Date(session.sessionExpiryDate).getTime();
			const now = Date.now();
			return now >= expiryTime;
		}
		catch {
			return true; // Invalid date format = expired
		}
	}
	/**
	 * Masterpass session'ın geçerli olup olmadığını kontrol eder.
	 * @returns true - session varsa ve süresi dolmamışsa
	 */
	function isSessionValid() {
		return hasMasterpassSession() && !isMasterpassSessionExpired();
	}
	/**
	 * Masterpass merchant ID'yi saklar.
	 * Merchant ID session API response'undan gelir.
	 *
	 * @param merchantId - Masterpass merchant ID (session API'den gelen)
	 * @throws Error - merchantId boş string ise
	 */
	function setMasterpassMerchantId(merchantId) {
		if (!merchantId || merchantId.trim() === '') {
			throw new Error('Masterpass merchantId cannot be empty');
		}
		internalState.masterpassMerchantId = merchantId;
	}
	/**
	 * Masterpass merchant ID'yi alır.
	 *
	 * @returns string - Masterpass merchant ID
	 * @throws Error - merchantId yoksa (session oluşturulmamışsa)
	 */
	function getMasterpassMerchantId() {
		if (!internalState.masterpassMerchantId) {
			throw new Error('Masterpass merchantId not initialized. Create session first.');
		}
		return internalState.masterpassMerchantId;
	}
	/**
	 * Masterpass token'ı saklar.
	 * Token session API response'undan gelir.
	 *
	 * @param token - Masterpass token (session API'den gelen)
	 * @throws Error - token boş string ise
	 */
	function setMasterpassToken(token) {
		if (!token || token.trim() === '') {
			throw new Error('Masterpass token cannot be empty');
		}
		internalState.masterpassToken = token;
	}
	/**
	 * Masterpass token'ı alır.
	 *
	 * @returns string - Masterpass token
	 * @throws Error - token yoksa (session oluşturulmamışsa)
	 */
	function getMasterpassToken() {
		if (!internalState.masterpassToken) {
			throw new Error('Masterpass token not initialized. Create session first.');
		}
		return internalState.masterpassToken;
	}
	/**
	 * Session ID'yi saklar.
	 * Session ID session API response'undan gelir.
	 *
	 * @param sessionId - Session ID (session API'den gelen)
	 * @throws Error - sessionId boş string ise
	 */
	function setSessionId(sessionId) {
		if (!sessionId || sessionId.trim() === '') {
			throw new Error('SessionId cannot be empty');
		}
		internalState.masterpassSessionId = sessionId;
	}
	/**
	 * Session ID'yi alır.
	 *
	 * @returns string - Session ID
	 * @throws Error - sessionId yoksa (session oluşturulmamışsa)
	 */
	function getSessionId() {
		if (!internalState.masterpassSessionId) {
			throw new Error('SessionId not initialized. Create session first.');
		}
		return internalState.masterpassSessionId;
	}
	/**
	 * Masterpass initialized flag'ini set eder.
	 *
	 * ⚠️ KRİTİK: Bu fonksiyon SADECE ensureMasterpassInitialized() içinde,
	 * Masterpass.setEndpoint/setToken/setMerchantId çağrılarından SONRA çağrılmalıdır.
	 *
	 * @param initialized - Masterpass SDK initialize edilmiş mi?
	 */
	function setMasterpassInitialized(initialized) {
		internalState.masterpassInitialized = initialized ?? false;
	}
	/**
	 * Masterpass initialized flag'ini alır.
	 *
	 * ⚠️ KRİTİK: Bu fonksiyon sadece flag'e bakar, gerçek Masterpass SDK durumunu kontrol etmez.
	 * Gerçek kontrol için ensureMasterpassInitialized() içinde window.Masterpass kontrolü yapılır.
	 *
	 * @returns boolean - Masterpass SDK initialize edilmiş mi? (flag bazlı)
	 */
	function isMasterpassInitialized() {
		return internalState.masterpassInitialized === true;
	}
	/**
	 * Masterpass payment init state'ini saklar.
	 */
	function setMasterpassPaymentInit(initData) {
		if (initData) {
			internalState.masterpassPaymentInit = initData;
		}
		else {
			delete internalState.masterpassPaymentInit;
		}
	}
	/**
	 * Provider state'i set eder.
	 *
	 * @param providerName - Provider adı (örn: 'masterpass')
	 * @param state - Provider state
	 */
	function setProviderState(providerName, state) {
		if (!internalState.providers) {
			internalState.providers = {};
		}
		internalState.providers[providerName] = state;
	}
	/**
	 * Provider state'i alır.
	 *
	 * @param providerName - Provider adı (örn: 'masterpass')
	 * @returns ProviderState | undefined
	 */
	function getProviderState(providerName) {
		return internalState.providers?.[providerName];
	}
	/**
	 * Provider'ın initialize edilip edilmediğini kontrol eder.
	 *
	 * @param providerName - Provider adı (örn: 'masterpass')
	 * @returns boolean
	 */
	function isProviderInitialized(providerName) {
		const state = getProviderState(providerName);
		return state?.initialized === true;
	}
	/**
	 * SDK için global config tutulur, default değerler set edilir.
	 * Bu fonksiyon SDK kullanılmadan önce mutlaka çağrılmalıdır.
	 *
	 * **NOT:** Bu fonksiyon sadece config'i set eder ve lifecycle state'ini INITIALIZED yapar.
	 * Network isteği yapmaz, payment init yapmaz.
	 *
	 * @param config - SDK konfigürasyonu
	 * @throws Error - Eksik veya geçersiz config parametreleri varsa
	 *
	 * @example
	 * ```typescript
	 * PaywallJsSdk.InitPaywallSdk({
	 *   environment: "test",
	 *   token: "TEMP_TOKEN",
	 *   includeMasterpassSession: true
	 * });
	 * ```
	 */
	function initConfig(config) {
		// Required field validation - ONLY environment and token
		if (!config.environment) {
			throw new Error('PaywallJsSdk.InitPaywallSdk() requires environment parameter');
		}
		if (!config.token || config.token.trim() === '') {
			throw new Error('PaywallJsSdk.InitPaywallSdk() requires token');
		}
		// Environment validation
		if (!['dev', 'test', 'prod'].includes(config.environment)) {
			throw new Error(`Invalid environment: ${config.environment}. Must be 'dev', 'test', or 'prod'`);
		}
		// Resolve environment configuration (both Paywall API and Masterpass SDK URLs)
		const resolvedEnv = resolveEnvironmentConfig(config.environment);
		const paymentApiBaseUrl = resolvedEnv.paymentApiBaseUrl;
		// Store config with resolved baseUrl
		currentConfig = {
			environment: config.environment,
			token: config.token,
			baseUrl: paymentApiBaseUrl,
			timeoutMs: config.timeoutMs ?? 10000,
			logLevel: config.logLevel ?? 'error',
			masterpass: config.masterpass,
		};
		// Store resolved environment config in global state
		setResolvedEnvironmentConfig(resolvedEnv);
		// Internal state'i resetle (yeni init için temiz başlangıç)
		// ⚠️ KRİTİK: Masterpass initialized flag'i de sıfırlanır
		// Çünkü Init() çağrıldığında Masterpass SDK henüz init edilmemiştir
		initResponse = null;
		internalState = {};
		// Token'ı internal state'e kaydet
		internalState.token = config.token;
		// SDK lifecycle state'ini INITIALIZED yap
		setSdkLifecycleState(exports.SdkLifecycleState.INITIALIZED);
	}
	/**
	 * Token'ı internal state'den alır.
	 */
	function getToken() {
		return internalState.token || null;
	}
	/**
	 * Eğer Init çağrılmadıysa, SDK kullanılamaz.
	 * Bu fonksiyon config'in initialize edilip edilmediğini kontrol eder.
	 *
	 * **NOT:** Bu fonksiyon hem config hem de lifecycle state kontrolü yapar.
	 */
	function getConfig() {
		if (!currentConfig) {
			throw new Error('PaywallJsSdk is not initialized. Call PaywallJsSdk.InitPaywallSdk() first.');
		}
		// Lifecycle state kontrolü de yap
		if (!isSdkInitialized()) {
			throw new Error('PaywallJsSdk is not initialized. Call PaywallJsSdk.InitPaywallSdk() first.');
		}
		return currentConfig;
	}
	/**
	 * SDK'nın initialize edilip edilmediğini kontrol eder.
	 *
	 * **DEPRECATED:** Bu fonksiyon sadece config kontrolü yapar.
	 * Yeni kod için `isSdkInitialized()` kullanılmalıdır.
	 *
	 * @deprecated Use `isSdkInitialized()` instead
	 */
	function isInitialized() {
		return currentConfig !== null && isSdkInitialized();
	}

	/**
	 * Global SDK Response Contract
	 *
	 * TÜM public SDK fonksiyonları bu interface'i kullanarak response döner.
	 * ASLA void dönüş yok, ASLA throw yok.
	 */
	/**
	 * Başarılı response oluşturur.
	 * providerMeta artık data objesinin içinde döner.
	 */
	function createSuccessResponse(source, data, message, providerMeta) {
		// providerMeta varsa data içine ekle
		const finalData = providerMeta
			? { ...data, providerMeta }
			: data;
		return {
			success: true,
			status: 'SUCCESS',
			source,
			...(message && { message }),
			...(finalData && { data: finalData }),
		};
	}
	/**
	 * Başarısız response oluşturur.
	 * providerMeta artık data objesinin içinde döner.
	 */
	function createFailedResponse(source, message, errorCode, providerMeta, additionalData) {
		// providerMeta varsa data içine ekle
		const finalData = providerMeta
			? { providerMeta, ...(additionalData || {}) }
			: additionalData;
		return {
			success: false,
			status: 'FAILED',
			source,
			message,
			...(errorCode && { errorCode }),
			...(finalData && { data: finalData }),
		};
	}
	/**
	 * Aksiyon gerekli response oluşturur.
	 * providerMeta artık data objesinin içinde döner.
	 */
	function createActionRequiredResponse(source, actionType, message, data, providerMeta, actionHint) {
		// providerMeta varsa data içine ekle
		const finalData = providerMeta
			? { ...data, providerMeta }
			: data;
		return {
			success: true,
			status: 'ACTION_REQUIRED',
			source,
			actionType,
			message,
			...(finalData && { data: finalData }),
			...(actionHint),
		};
	}

	/**
	 * Create a bound version of a function with a specified `this` context
	 *
	 * @param {Function} fn - The function to bind
	 * @param {*} thisArg - The value to be passed as the `this` parameter
	 * @returns {Function} A new function that will call the original function with the specified `this` context
	 */
	function bind(fn, thisArg) {
		return function wrap() {
			return fn.apply(thisArg, arguments);
		};
	}

	// utils is a library of generic helper functions non-specific to axios

	const {toString} = Object.prototype;
	const {getPrototypeOf} = Object;
	const {iterator, toStringTag} = Symbol;

	const kindOf = (cache => thing => {
		const str = toString.call(thing);
		return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
	})(Object.create(null));

	const kindOfTest = (type) => {
		type = type.toLowerCase();
		return (thing) => kindOf(thing) === type
	};

	const typeOfTest = type => thing => typeof thing === type;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 *
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	const {isArray} = Array;

	/**
	 * Determine if a value is undefined
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	const isUndefined = typeOfTest('undefined');

	/**
	 * Determine if a value is a Buffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Buffer, otherwise false
	 */
	function isBuffer(val) {
		return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
			&& isFunction$1(val.constructor.isBuffer) && val.constructor.isBuffer(val);
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	const isArrayBuffer = kindOfTest('ArrayBuffer');


	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
		let result;
		if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
			result = ArrayBuffer.isView(val);
		} else {
			result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
		}
		return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	const isString = typeOfTest('string');

	/**
	 * Determine if a value is a Function
	 *
	 * @param {*} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	const isFunction$1 = typeOfTest('function');

	/**
	 * Determine if a value is a Number
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	const isNumber = typeOfTest('number');

	/**
	 * Determine if a value is an Object
	 *
	 * @param {*} thing The value to test
	 *
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	const isObject = (thing) => thing !== null && typeof thing === 'object';

	/**
	 * Determine if a value is a Boolean
	 *
	 * @param {*} thing The value to test
	 * @returns {boolean} True if value is a Boolean, otherwise false
	 */
	const isBoolean = thing => thing === true || thing === false;

	/**
	 * Determine if a value is a plain Object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a plain Object, otherwise false
	 */
	const isPlainObject = (val) => {
		if (kindOf(val) !== 'object') {
			return false;
		}

		const prototype = getPrototypeOf(val);
		return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(toStringTag in val) && !(iterator in val);
	};

	/**
	 * Determine if a value is an empty object (safely handles Buffers)
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is an empty object, otherwise false
	 */
	const isEmptyObject = (val) => {
		// Early return for non-objects or Buffers to prevent RangeError
		if (!isObject(val) || isBuffer(val)) {
			return false;
		}

		try {
			return Object.keys(val).length === 0 && Object.getPrototypeOf(val) === Object.prototype;
		} catch (e) {
			// Fallback for any other objects that might cause RangeError with Object.keys()
			return false;
		}
	};

	/**
	 * Determine if a value is a Date
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	const isDate = kindOfTest('Date');

	/**
	 * Determine if a value is a File
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	const isFile = kindOfTest('File');

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	const isBlob = kindOfTest('Blob');

	/**
	 * Determine if a value is a FileList
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	const isFileList = kindOfTest('FileList');

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	const isStream = (val) => isObject(val) && isFunction$1(val.pipe);

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {*} thing The value to test
	 *
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	const isFormData = (thing) => {
		let kind;
		return thing && (
			(typeof FormData === 'function' && thing instanceof FormData) || (
				isFunction$1(thing.append) && (
					(kind = kindOf(thing)) === 'formdata' ||
					// detect form-data instance
					(kind === 'object' && isFunction$1(thing.toString) && thing.toString() === '[object FormData]')
				)
			)
		)
	};

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	const isURLSearchParams = kindOfTest('URLSearchParams');

	const [isReadableStream, isRequest, isResponse, isHeaders] = ['ReadableStream', 'Request', 'Response', 'Headers'].map(kindOfTest);

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 *
	 * @returns {String} The String freed of excess whitespace
	 */
	const trim = (str) => str.trim ?
		str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 *
	 * @param {Boolean} [allOwnKeys = false]
	 * @returns {any}
	 */
	function forEach(obj, fn, {allOwnKeys = false} = {}) {
		// Don't bother if no value provided
		if (obj === null || typeof obj === 'undefined') {
			return;
		}

		let i;
		let l;

		// Force an array if not already something iterable
		if (typeof obj !== 'object') {
			/*eslint no-param-reassign:0*/
			obj = [obj];
		}

		if (isArray(obj)) {
			// Iterate over array values
			for (i = 0, l = obj.length; i < l; i++) {
				fn.call(null, obj[i], i, obj);
			}
		} else {
			// Buffer check
			if (isBuffer(obj)) {
				return;
			}

			// Iterate over object keys
			const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
			const len = keys.length;
			let key;

			for (i = 0; i < len; i++) {
				key = keys[i];
				fn.call(null, obj[key], key, obj);
			}
		}
	}

	function findKey(obj, key) {
		if (isBuffer(obj)){
			return null;
		}

		key = key.toLowerCase();
		const keys = Object.keys(obj);
		let i = keys.length;
		let _key;
		while (i-- > 0) {
			_key = keys[i];
			if (key === _key.toLowerCase()) {
				return _key;
			}
		}
		return null;
	}

	const _global = (() => {
		/*eslint no-undef:0*/
		if (typeof globalThis !== "undefined") return globalThis;
		return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
	})();

	const isContextDefined = (context) => !isUndefined(context) && context !== _global;

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 *
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
		const {caseless, skipUndefined} = isContextDefined(this) && this || {};
		const result = {};
		const assignValue = (val, key) => {
			const targetKey = caseless && findKey(result, key) || key;
			if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
				result[targetKey] = merge(result[targetKey], val);
			} else if (isPlainObject(val)) {
				result[targetKey] = merge({}, val);
			} else if (isArray(val)) {
				result[targetKey] = val.slice();
			} else if (!skipUndefined || !isUndefined(val)) {
				result[targetKey] = val;
			}
		};

		for (let i = 0, l = arguments.length; i < l; i++) {
			arguments[i] && forEach(arguments[i], assignValue);
		}
		return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 *
	 * @param {Boolean} [allOwnKeys]
	 * @returns {Object} The resulting value of object a
	 */
	const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
		forEach(b, (val, key) => {
			if (thisArg && isFunction$1(val)) {
				a[key] = bind(val, thisArg);
			} else {
				a[key] = val;
			}
		}, {allOwnKeys});
		return a;
	};

	/**
	 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
	 *
	 * @param {string} content with BOM
	 *
	 * @returns {string} content value without BOM
	 */
	const stripBOM = (content) => {
		if (content.charCodeAt(0) === 0xFEFF) {
			content = content.slice(1);
		}
		return content;
	};

	/**
	 * Inherit the prototype methods from one constructor into another
	 * @param {function} constructor
	 * @param {function} superConstructor
	 * @param {object} [props]
	 * @param {object} [descriptors]
	 *
	 * @returns {void}
	 */
	const inherits = (constructor, superConstructor, props, descriptors) => {
		constructor.prototype = Object.create(superConstructor.prototype, descriptors);
		constructor.prototype.constructor = constructor;
		Object.defineProperty(constructor, 'super', {
			value: superConstructor.prototype
		});
		props && Object.assign(constructor.prototype, props);
	};

	/**
	 * Resolve object with deep prototype chain to a flat object
	 * @param {Object} sourceObj source object
	 * @param {Object} [destObj]
	 * @param {Function|Boolean} [filter]
	 * @param {Function} [propFilter]
	 *
	 * @returns {Object}
	 */
	const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
		let props;
		let i;
		let prop;
		const merged = {};

		destObj = destObj || {};
		// eslint-disable-next-line no-eq-null,eqeqeq
		if (sourceObj == null) return destObj;

		do {
			props = Object.getOwnPropertyNames(sourceObj);
			i = props.length;
			while (i-- > 0) {
				prop = props[i];
				if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
					destObj[prop] = sourceObj[prop];
					merged[prop] = true;
				}
			}
			sourceObj = filter !== false && getPrototypeOf(sourceObj);
		} while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

		return destObj;
	};

	/**
	 * Determines whether a string ends with the characters of a specified string
	 *
	 * @param {String} str
	 * @param {String} searchString
	 * @param {Number} [position= 0]
	 *
	 * @returns {boolean}
	 */
	const endsWith = (str, searchString, position) => {
		str = String(str);
		if (position === undefined || position > str.length) {
			position = str.length;
		}
		position -= searchString.length;
		const lastIndex = str.indexOf(searchString, position);
		return lastIndex !== -1 && lastIndex === position;
	};


	/**
	 * Returns new array from array like object or null if failed
	 *
	 * @param {*} [thing]
	 *
	 * @returns {?Array}
	 */
	const toArray = (thing) => {
		if (!thing) return null;
		if (isArray(thing)) return thing;
		let i = thing.length;
		if (!isNumber(i)) return null;
		const arr = new Array(i);
		while (i-- > 0) {
			arr[i] = thing[i];
		}
		return arr;
	};

	/**
	 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
	 * thing passed in is an instance of Uint8Array
	 *
	 * @param {TypedArray}
	 *
	 * @returns {Array}
	 */
		// eslint-disable-next-line func-names
	const isTypedArray = (TypedArray => {
			// eslint-disable-next-line func-names
			return thing => {
				return TypedArray && thing instanceof TypedArray;
			};
		})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

	/**
	 * For each entry in the object, call the function with the key and value.
	 *
	 * @param {Object<any, any>} obj - The object to iterate over.
	 * @param {Function} fn - The function to call for each entry.
	 *
	 * @returns {void}
	 */
	const forEachEntry = (obj, fn) => {
		const generator = obj && obj[iterator];

		const _iterator = generator.call(obj);

		let result;

		while ((result = _iterator.next()) && !result.done) {
			const pair = result.value;
			fn.call(obj, pair[0], pair[1]);
		}
	};

	/**
	 * It takes a regular expression and a string, and returns an array of all the matches
	 *
	 * @param {string} regExp - The regular expression to match against.
	 * @param {string} str - The string to search.
	 *
	 * @returns {Array<boolean>}
	 */
	const matchAll = (regExp, str) => {
		let matches;
		const arr = [];

		while ((matches = regExp.exec(str)) !== null) {
			arr.push(matches);
		}

		return arr;
	};

	/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
	const isHTMLForm = kindOfTest('HTMLFormElement');

	const toCamelCase = str => {
		return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
			function replacer(m, p1, p2) {
				return p1.toUpperCase() + p2;
			}
		);
	};

	/* Creating a function that will check if an object has a property. */
	const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

	/**
	 * Determine if a value is a RegExp object
	 *
	 * @param {*} val The value to test
	 *
	 * @returns {boolean} True if value is a RegExp object, otherwise false
	 */
	const isRegExp = kindOfTest('RegExp');

	const reduceDescriptors = (obj, reducer) => {
		const descriptors = Object.getOwnPropertyDescriptors(obj);
		const reducedDescriptors = {};

		forEach(descriptors, (descriptor, name) => {
			let ret;
			if ((ret = reducer(descriptor, name, obj)) !== false) {
				reducedDescriptors[name] = ret || descriptor;
			}
		});

		Object.defineProperties(obj, reducedDescriptors);
	};

	/**
	 * Makes all methods read-only
	 * @param {Object} obj
	 */

	const freezeMethods = (obj) => {
		reduceDescriptors(obj, (descriptor, name) => {
			// skip restricted props in strict mode
			if (isFunction$1(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
				return false;
			}

			const value = obj[name];

			if (!isFunction$1(value)) return;

			descriptor.enumerable = false;

			if ('writable' in descriptor) {
				descriptor.writable = false;
				return;
			}

			if (!descriptor.set) {
				descriptor.set = () => {
					throw Error('Can not rewrite read-only method \'' + name + '\'');
				};
			}
		});
	};

	const toObjectSet = (arrayOrString, delimiter) => {
		const obj = {};

		const define = (arr) => {
			arr.forEach(value => {
				obj[value] = true;
			});
		};

		isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

		return obj;
	};

	const noop = () => {};

	const toFiniteNumber = (value, defaultValue) => {
		return value != null && Number.isFinite(value = +value) ? value : defaultValue;
	};



	/**
	 * If the thing is a FormData object, return true, otherwise return false.
	 *
	 * @param {unknown} thing - The thing to check.
	 *
	 * @returns {boolean}
	 */
	function isSpecCompliantForm(thing) {
		return !!(thing && isFunction$1(thing.append) && thing[toStringTag] === 'FormData' && thing[iterator]);
	}

	const toJSONObject = (obj) => {
		const stack = new Array(10);

		const visit = (source, i) => {

			if (isObject(source)) {
				if (stack.indexOf(source) >= 0) {
					return;
				}

				//Buffer check
				if (isBuffer(source)) {
					return source;
				}

				if(!('toJSON' in source)) {
					stack[i] = source;
					const target = isArray(source) ? [] : {};

					forEach(source, (value, key) => {
						const reducedValue = visit(value, i + 1);
						!isUndefined(reducedValue) && (target[key] = reducedValue);
					});

					stack[i] = undefined;

					return target;
				}
			}

			return source;
		};

		return visit(obj, 0);
	};

	const isAsyncFn = kindOfTest('AsyncFunction');

	const isThenable = (thing) =>
		thing && (isObject(thing) || isFunction$1(thing)) && isFunction$1(thing.then) && isFunction$1(thing.catch);

	// original code
	// https://github.com/DigitalBrainJS/AxiosPromise/blob/16deab13710ec09779922131f3fa5954320f83ab/lib/utils.js#L11-L34

	const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
		if (setImmediateSupported) {
			return setImmediate;
		}

		return postMessageSupported ? ((token, callbacks) => {
			_global.addEventListener("message", ({source, data}) => {
				if (source === _global && data === token) {
					callbacks.length && callbacks.shift()();
				}
			}, false);

			return (cb) => {
				callbacks.push(cb);
				_global.postMessage(token, "*");
			}
		})(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
	})(
		typeof setImmediate === 'function',
		isFunction$1(_global.postMessage)
	);

	const asap = typeof queueMicrotask !== 'undefined' ?
		queueMicrotask.bind(_global) : ( typeof process !== 'undefined' && process.nextTick || _setImmediate);

	// *********************


	const isIterable = (thing) => thing != null && isFunction$1(thing[iterator]);


	var utils$1 = {
		isArray,
		isArrayBuffer,
		isBuffer,
		isFormData,
		isArrayBufferView,
		isString,
		isNumber,
		isBoolean,
		isObject,
		isPlainObject,
		isEmptyObject,
		isReadableStream,
		isRequest,
		isResponse,
		isHeaders,
		isUndefined,
		isDate,
		isFile,
		isBlob,
		isRegExp,
		isFunction: isFunction$1,
		isStream,
		isURLSearchParams,
		isTypedArray,
		isFileList,
		forEach,
		merge,
		extend,
		trim,
		stripBOM,
		inherits,
		toFlatObject,
		kindOf,
		kindOfTest,
		endsWith,
		toArray,
		forEachEntry,
		matchAll,
		isHTMLForm,
		hasOwnProperty,
		hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
		reduceDescriptors,
		freezeMethods,
		toObjectSet,
		toCamelCase,
		noop,
		toFiniteNumber,
		findKey,
		global: _global,
		isContextDefined,
		isSpecCompliantForm,
		toJSONObject,
		isAsyncFn,
		isThenable,
		setImmediate: _setImmediate,
		asap,
		isIterable
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [config] The config.
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 *
	 * @returns {Error} The created error.
	 */
	function AxiosError$1(message, code, config, request, response) {
		Error.call(this);

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, this.constructor);
		} else {
			this.stack = (new Error()).stack;
		}

		this.message = message;
		this.name = 'AxiosError';
		code && (this.code = code);
		config && (this.config = config);
		request && (this.request = request);
		if (response) {
			this.response = response;
			this.status = response.status ? response.status : null;
		}
	}

	utils$1.inherits(AxiosError$1, Error, {
		toJSON: function toJSON() {
			return {
				// Standard
				message: this.message,
				name: this.name,
				// Microsoft
				description: this.description,
				number: this.number,
				// Mozilla
				fileName: this.fileName,
				lineNumber: this.lineNumber,
				columnNumber: this.columnNumber,
				stack: this.stack,
				// Axios
				config: utils$1.toJSONObject(this.config),
				code: this.code,
				status: this.status
			};
		}
	});

	const prototype$1 = AxiosError$1.prototype;
	const descriptors = {};

	[
		'ERR_BAD_OPTION_VALUE',
		'ERR_BAD_OPTION',
		'ECONNABORTED',
		'ETIMEDOUT',
		'ERR_NETWORK',
		'ERR_FR_TOO_MANY_REDIRECTS',
		'ERR_DEPRECATED',
		'ERR_BAD_RESPONSE',
		'ERR_BAD_REQUEST',
		'ERR_CANCELED',
		'ERR_NOT_SUPPORT',
		'ERR_INVALID_URL'
		// eslint-disable-next-line func-names
	].forEach(code => {
		descriptors[code] = {value: code};
	});

	Object.defineProperties(AxiosError$1, descriptors);
	Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

	// eslint-disable-next-line func-names
	AxiosError$1.from = (error, code, config, request, response, customProps) => {
		const axiosError = Object.create(prototype$1);

		utils$1.toFlatObject(error, axiosError, function filter(obj) {
			return obj !== Error.prototype;
		}, prop => {
			return prop !== 'isAxiosError';
		});

		const msg = error && error.message ? error.message : 'Error';

		// Prefer explicit code; otherwise copy the low-level error's code (e.g. ECONNREFUSED)
		const errCode = code == null && error ? error.code : code;
		AxiosError$1.call(axiosError, msg, errCode, config, request, response);

		// Chain the original error on the standard field; non-enumerable to avoid JSON noise
		if (error && axiosError.cause == null) {
			Object.defineProperty(axiosError, 'cause', { value: error, configurable: true });
		}

		axiosError.name = (error && error.name) || 'Error';

		customProps && Object.assign(axiosError, customProps);

		return axiosError;
	};

	// eslint-disable-next-line strict
	var httpAdapter = null;

	/**
	 * Determines if the given thing is a array or js object.
	 *
	 * @param {string} thing - The object or array to be visited.
	 *
	 * @returns {boolean}
	 */
	function isVisitable(thing) {
		return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
	}

	/**
	 * It removes the brackets from the end of a string
	 *
	 * @param {string} key - The key of the parameter.
	 *
	 * @returns {string} the key without the brackets.
	 */
	function removeBrackets(key) {
		return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
	}

	/**
	 * It takes a path, a key, and a boolean, and returns a string
	 *
	 * @param {string} path - The path to the current key.
	 * @param {string} key - The key of the current object being iterated over.
	 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
	 *
	 * @returns {string} The path to the current key.
	 */
	function renderKey(path, key, dots) {
		if (!path) return key;
		return path.concat(key).map(function each(token, i) {
			// eslint-disable-next-line no-param-reassign
			token = removeBrackets(token);
			return !dots && i ? '[' + token + ']' : token;
		}).join(dots ? '.' : '');
	}

	/**
	 * If the array is an array and none of its elements are visitable, then it's a flat array.
	 *
	 * @param {Array<any>} arr - The array to check
	 *
	 * @returns {boolean}
	 */
	function isFlatArray(arr) {
		return utils$1.isArray(arr) && !arr.some(isVisitable);
	}

	const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
		return /^is[A-Z]/.test(prop);
	});

	/**
	 * Convert a data object to FormData
	 *
	 * @param {Object} obj
	 * @param {?Object} [formData]
	 * @param {?Object} [options]
	 * @param {Function} [options.visitor]
	 * @param {Boolean} [options.metaTokens = true]
	 * @param {Boolean} [options.dots = false]
	 * @param {?Boolean} [options.indexes = false]
	 *
	 * @returns {Object}
	 **/

	/**
	 * It converts an object into a FormData object
	 *
	 * @param {Object<any, any>} obj - The object to convert to form data.
	 * @param {string} formData - The FormData object to append to.
	 * @param {Object<string, any>} options
	 *
	 * @returns
	 */
	function toFormData$1(obj, formData, options) {
		if (!utils$1.isObject(obj)) {
			throw new TypeError('target must be an object');
		}

		// eslint-disable-next-line no-param-reassign
		formData = formData || new (FormData)();

		// eslint-disable-next-line no-param-reassign
		options = utils$1.toFlatObject(options, {
			metaTokens: true,
			dots: false,
			indexes: false
		}, false, function defined(option, source) {
			// eslint-disable-next-line no-eq-null,eqeqeq
			return !utils$1.isUndefined(source[option]);
		});

		const metaTokens = options.metaTokens;
		// eslint-disable-next-line no-use-before-define
		const visitor = options.visitor || defaultVisitor;
		const dots = options.dots;
		const indexes = options.indexes;
		const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
		const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

		if (!utils$1.isFunction(visitor)) {
			throw new TypeError('visitor must be a function');
		}

		function convertValue(value) {
			if (value === null) return '';

			if (utils$1.isDate(value)) {
				return value.toISOString();
			}

			if (utils$1.isBoolean(value)) {
				return value.toString();
			}

			if (!useBlob && utils$1.isBlob(value)) {
				throw new AxiosError$1('Blob is not supported. Use a Buffer instead.');
			}

			if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
				return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
			}

			return value;
		}

		/**
		 * Default visitor.
		 *
		 * @param {*} value
		 * @param {String|Number} key
		 * @param {Array<String|Number>} path
		 * @this {FormData}
		 *
		 * @returns {boolean} return true to visit the each prop of the value recursively
		 */
		function defaultVisitor(value, key, path) {
			let arr = value;

			if (value && !path && typeof value === 'object') {
				if (utils$1.endsWith(key, '{}')) {
					// eslint-disable-next-line no-param-reassign
					key = metaTokens ? key : key.slice(0, -2);
					// eslint-disable-next-line no-param-reassign
					value = JSON.stringify(value);
				} else if (
					(utils$1.isArray(value) && isFlatArray(value)) ||
					((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
					)) {
					// eslint-disable-next-line no-param-reassign
					key = removeBrackets(key);

					arr.forEach(function each(el, index) {
						!(utils$1.isUndefined(el) || el === null) && formData.append(
							// eslint-disable-next-line no-nested-ternary
							indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
							convertValue(el)
						);
					});
					return false;
				}
			}

			if (isVisitable(value)) {
				return true;
			}

			formData.append(renderKey(path, key, dots), convertValue(value));

			return false;
		}

		const stack = [];

		const exposedHelpers = Object.assign(predicates, {
			defaultVisitor,
			convertValue,
			isVisitable
		});

		function build(value, path) {
			if (utils$1.isUndefined(value)) return;

			if (stack.indexOf(value) !== -1) {
				throw Error('Circular reference detected in ' + path.join('.'));
			}

			stack.push(value);

			utils$1.forEach(value, function each(el, key) {
				const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
					formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
				);

				if (result === true) {
					build(el, path ? path.concat(key) : [key]);
				}
			});

			stack.pop();
		}

		if (!utils$1.isObject(obj)) {
			throw new TypeError('data must be an object');
		}

		build(obj);

		return formData;
	}

	/**
	 * It encodes a string by replacing all characters that are not in the unreserved set with
	 * their percent-encoded equivalents
	 *
	 * @param {string} str - The string to encode.
	 *
	 * @returns {string} The encoded string.
	 */
	function encode$1(str) {
		const charMap = {
			'!': '%21',
			"'": '%27',
			'(': '%28',
			')': '%29',
			'~': '%7E',
			'%20': '+',
			'%00': '\x00'
		};
		return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
			return charMap[match];
		});
	}

	/**
	 * It takes a params object and converts it to a FormData object
	 *
	 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
	 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
	 *
	 * @returns {void}
	 */
	function AxiosURLSearchParams(params, options) {
		this._pairs = [];

		params && toFormData$1(params, this, options);
	}

	const prototype = AxiosURLSearchParams.prototype;

	prototype.append = function append(name, value) {
		this._pairs.push([name, value]);
	};

	prototype.toString = function toString(encoder) {
		const _encode = encoder ? function(value) {
			return encoder.call(this, value, encode$1);
		} : encode$1;

		return this._pairs.map(function each(pair) {
			return _encode(pair[0]) + '=' + _encode(pair[1]);
		}, '').join('&');
	};

	/**
	 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
	 * URI encoded counterparts
	 *
	 * @param {string} val The value to be encoded.
	 *
	 * @returns {string} The encoded value.
	 */
	function encode(val) {
		return encodeURIComponent(val).
		replace(/%3A/gi, ':').
		replace(/%24/g, '$').
		replace(/%2C/gi, ',').
		replace(/%20/g, '+');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @param {?(object|Function)} options
	 *
	 * @returns {string} The formatted url
	 */
	function buildURL(url, params, options) {
		/*eslint no-param-reassign:0*/
		if (!params) {
			return url;
		}

		const _encode = options && options.encode || encode;

		if (utils$1.isFunction(options)) {
			options = {
				serialize: options
			};
		}

		const serializeFn = options && options.serialize;

		let serializedParams;

		if (serializeFn) {
			serializedParams = serializeFn(params, options);
		} else {
			serializedParams = utils$1.isURLSearchParams(params) ?
				params.toString() :
				new AxiosURLSearchParams(params, options).toString(_encode);
		}

		if (serializedParams) {
			const hashmarkIndex = url.indexOf("#");

			if (hashmarkIndex !== -1) {
				url = url.slice(0, hashmarkIndex);
			}
			url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
		}

		return url;
	}

	class InterceptorManager {
		constructor() {
			this.handlers = [];
		}

		/**
		 * Add a new interceptor to the stack
		 *
		 * @param {Function} fulfilled The function to handle `then` for a `Promise`
		 * @param {Function} rejected The function to handle `reject` for a `Promise`
		 *
		 * @return {Number} An ID used to remove interceptor later
		 */
		use(fulfilled, rejected, options) {
			this.handlers.push({
				fulfilled,
				rejected,
				synchronous: options ? options.synchronous : false,
				runWhen: options ? options.runWhen : null
			});
			return this.handlers.length - 1;
		}

		/**
		 * Remove an interceptor from the stack
		 *
		 * @param {Number} id The ID that was returned by `use`
		 *
		 * @returns {void}
		 */
		eject(id) {
			if (this.handlers[id]) {
				this.handlers[id] = null;
			}
		}

		/**
		 * Clear all interceptors from the stack
		 *
		 * @returns {void}
		 */
		clear() {
			if (this.handlers) {
				this.handlers = [];
			}
		}

		/**
		 * Iterate over all the registered interceptors
		 *
		 * This method is particularly useful for skipping over any
		 * interceptors that may have become `null` calling `eject`.
		 *
		 * @param {Function} fn The function to call for each interceptor
		 *
		 * @returns {void}
		 */
		forEach(fn) {
			utils$1.forEach(this.handlers, function forEachHandler(h) {
				if (h !== null) {
					fn(h);
				}
			});
		}
	}

	var transitionalDefaults = {
		silentJSONParsing: true,
		forcedJSONParsing: true,
		clarifyTimeoutError: false
	};

	var URLSearchParams$1 = typeof URLSearchParams !== 'undefined' ? URLSearchParams : AxiosURLSearchParams;

	var FormData$1 = typeof FormData !== 'undefined' ? FormData : null;

	var Blob$1 = typeof Blob !== 'undefined' ? Blob : null;

	var platform$1 = {
		isBrowser: true,
		classes: {
			URLSearchParams: URLSearchParams$1,
			FormData: FormData$1,
			Blob: Blob$1
		},
		protocols: ['http', 'https', 'file', 'blob', 'url', 'data']
	};

	const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

	const _navigator = typeof navigator === 'object' && navigator || undefined;

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 * nativescript
	 *  navigator.product -> 'NativeScript' or 'NS'
	 *
	 * @returns {boolean}
	 */
	const hasStandardBrowserEnv = hasBrowserEnv &&
		(!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0);

	/**
	 * Determine if we're running in a standard browser webWorker environment
	 *
	 * Although the `isStandardBrowserEnv` method indicates that
	 * `allows axios to run in a web worker`, the WebWorker will still be
	 * filtered out due to its judgment standard
	 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
	 * This leads to a problem when axios post `FormData` in webWorker
	 */
	const hasStandardBrowserWebWorkerEnv = (() => {
		return (
			typeof WorkerGlobalScope !== 'undefined' &&
			// eslint-disable-next-line no-undef
			self instanceof WorkerGlobalScope &&
			typeof self.importScripts === 'function'
		);
	})();

	const origin = hasBrowserEnv && window.location.href || 'http://localhost';

	var utils = /*#__PURE__*/Object.freeze({
		__proto__: null,
		hasBrowserEnv: hasBrowserEnv,
		hasStandardBrowserEnv: hasStandardBrowserEnv,
		hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
		navigator: _navigator,
		origin: origin
	});

	var platform = {
		...utils,
		...platform$1
	};

	function toURLEncodedForm(data, options) {
		return toFormData$1(data, new platform.classes.URLSearchParams(), {
			visitor: function(value, key, path, helpers) {
				if (platform.isNode && utils$1.isBuffer(value)) {
					this.append(key, value.toString('base64'));
					return false;
				}

				return helpers.defaultVisitor.apply(this, arguments);
			},
			...options
		});
	}

	/**
	 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
	 *
	 * @param {string} name - The name of the property to get.
	 *
	 * @returns An array of strings.
	 */
	function parsePropPath(name) {
		// foo[x][y][z]
		// foo.x.y.z
		// foo-x-y-z
		// foo x y z
		return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
			return match[0] === '[]' ? '' : match[1] || match[0];
		});
	}

	/**
	 * Convert an array to an object.
	 *
	 * @param {Array<any>} arr - The array to convert to an object.
	 *
	 * @returns An object with the same keys and values as the array.
	 */
	function arrayToObject(arr) {
		const obj = {};
		const keys = Object.keys(arr);
		let i;
		const len = keys.length;
		let key;
		for (i = 0; i < len; i++) {
			key = keys[i];
			obj[key] = arr[key];
		}
		return obj;
	}

	/**
	 * It takes a FormData object and returns a JavaScript object
	 *
	 * @param {string} formData The FormData object to convert to JSON.
	 *
	 * @returns {Object<string, any> | null} The converted object.
	 */
	function formDataToJSON(formData) {
		function buildPath(path, value, target, index) {
			let name = path[index++];

			if (name === '__proto__') return true;

			const isNumericKey = Number.isFinite(+name);
			const isLast = index >= path.length;
			name = !name && utils$1.isArray(target) ? target.length : name;

			if (isLast) {
				if (utils$1.hasOwnProp(target, name)) {
					target[name] = [target[name], value];
				} else {
					target[name] = value;
				}

				return !isNumericKey;
			}

			if (!target[name] || !utils$1.isObject(target[name])) {
				target[name] = [];
			}

			const result = buildPath(path, value, target[name], index);

			if (result && utils$1.isArray(target[name])) {
				target[name] = arrayToObject(target[name]);
			}

			return !isNumericKey;
		}

		if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
			const obj = {};

			utils$1.forEachEntry(formData, (name, value) => {
				buildPath(parsePropPath(name), value, obj, 0);
			});

			return obj;
		}

		return null;
	}

	/**
	 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
	 * of the input
	 *
	 * @param {any} rawValue - The value to be stringified.
	 * @param {Function} parser - A function that parses a string into a JavaScript object.
	 * @param {Function} encoder - A function that takes a value and returns a string.
	 *
	 * @returns {string} A stringified version of the rawValue.
	 */
	function stringifySafely(rawValue, parser, encoder) {
		if (utils$1.isString(rawValue)) {
			try {
				(parser || JSON.parse)(rawValue);
				return utils$1.trim(rawValue);
			} catch (e) {
				if (e.name !== 'SyntaxError') {
					throw e;
				}
			}
		}

		return (encoder || JSON.stringify)(rawValue);
	}

	const defaults = {

		transitional: transitionalDefaults,

		adapter: ['xhr', 'http', 'fetch'],

		transformRequest: [function transformRequest(data, headers) {
			const contentType = headers.getContentType() || '';
			const hasJSONContentType = contentType.indexOf('application/json') > -1;
			const isObjectPayload = utils$1.isObject(data);

			if (isObjectPayload && utils$1.isHTMLForm(data)) {
				data = new FormData(data);
			}

			const isFormData = utils$1.isFormData(data);

			if (isFormData) {
				return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
			}

			if (utils$1.isArrayBuffer(data) ||
				utils$1.isBuffer(data) ||
				utils$1.isStream(data) ||
				utils$1.isFile(data) ||
				utils$1.isBlob(data) ||
				utils$1.isReadableStream(data)
			) {
				return data;
			}
			if (utils$1.isArrayBufferView(data)) {
				return data.buffer;
			}
			if (utils$1.isURLSearchParams(data)) {
				headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
				return data.toString();
			}

			let isFileList;

			if (isObjectPayload) {
				if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
					return toURLEncodedForm(data, this.formSerializer).toString();
				}

				if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
					const _FormData = this.env && this.env.FormData;

					return toFormData$1(
						isFileList ? {'files[]': data} : data,
						_FormData && new _FormData(),
						this.formSerializer
					);
				}
			}

			if (isObjectPayload || hasJSONContentType ) {
				headers.setContentType('application/json', false);
				return stringifySafely(data);
			}

			return data;
		}],

		transformResponse: [function transformResponse(data) {
			const transitional = this.transitional || defaults.transitional;
			const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
			const JSONRequested = this.responseType === 'json';

			if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
				return data;
			}

			if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
				const silentJSONParsing = transitional && transitional.silentJSONParsing;
				const strictJSONParsing = !silentJSONParsing && JSONRequested;

				try {
					return JSON.parse(data, this.parseReviver);
				} catch (e) {
					if (strictJSONParsing) {
						if (e.name === 'SyntaxError') {
							throw AxiosError$1.from(e, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
						}
						throw e;
					}
				}
			}

			return data;
		}],

		/**
		 * A timeout in milliseconds to abort a request. If set to 0 (default) a
		 * timeout is not created.
		 */
		timeout: 0,

		xsrfCookieName: 'XSRF-TOKEN',
		xsrfHeaderName: 'X-XSRF-TOKEN',

		maxContentLength: -1,
		maxBodyLength: -1,

		env: {
			FormData: platform.classes.FormData,
			Blob: platform.classes.Blob
		},

		validateStatus: function validateStatus(status) {
			return status >= 200 && status < 300;
		},

		headers: {
			common: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': undefined
			}
		}
	};

	utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
		defaults.headers[method] = {};
	});

	// RawAxiosHeaders whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	const ignoreDuplicateOf = utils$1.toObjectSet([
		'age', 'authorization', 'content-length', 'content-type', 'etag',
		'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
		'last-modified', 'location', 'max-forwards', 'proxy-authorization',
		'referer', 'retry-after', 'user-agent'
	]);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} rawHeaders Headers needing to be parsed
	 *
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = rawHeaders => {
		const parsed = {};
		let key;
		let val;
		let i;

		rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
			i = line.indexOf(':');
			key = line.substring(0, i).trim().toLowerCase();
			val = line.substring(i + 1).trim();

			if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
				return;
			}

			if (key === 'set-cookie') {
				if (parsed[key]) {
					parsed[key].push(val);
				} else {
					parsed[key] = [val];
				}
			} else {
				parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
			}
		});

		return parsed;
	};

	const $internals = Symbol('internals');

	function normalizeHeader(header) {
		return header && String(header).trim().toLowerCase();
	}

	function normalizeValue(value) {
		if (value === false || value == null) {
			return value;
		}

		return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
	}

	function parseTokens(str) {
		const tokens = Object.create(null);
		const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
		let match;

		while ((match = tokensRE.exec(str))) {
			tokens[match[1]] = match[2];
		}

		return tokens;
	}

	const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

	function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
		if (utils$1.isFunction(filter)) {
			return filter.call(this, value, header);
		}

		if (isHeaderNameFilter) {
			value = header;
		}

		if (!utils$1.isString(value)) return;

		if (utils$1.isString(filter)) {
			return value.indexOf(filter) !== -1;
		}

		if (utils$1.isRegExp(filter)) {
			return filter.test(value);
		}
	}

	function formatHeader(header) {
		return header.trim()
			.toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
				return char.toUpperCase() + str;
			});
	}

	function buildAccessors(obj, header) {
		const accessorName = utils$1.toCamelCase(' ' + header);

		['get', 'set', 'has'].forEach(methodName => {
			Object.defineProperty(obj, methodName + accessorName, {
				value: function(arg1, arg2, arg3) {
					return this[methodName].call(this, header, arg1, arg2, arg3);
				},
				configurable: true
			});
		});
	}

	let AxiosHeaders$1 = class AxiosHeaders {
		constructor(headers) {
			headers && this.set(headers);
		}

		set(header, valueOrRewrite, rewrite) {
			const self = this;

			function setHeader(_value, _header, _rewrite) {
				const lHeader = normalizeHeader(_header);

				if (!lHeader) {
					throw new Error('header name must be a non-empty string');
				}

				const key = utils$1.findKey(self, lHeader);

				if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
					self[key || _header] = normalizeValue(_value);
				}
			}

			const setHeaders = (headers, _rewrite) =>
				utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

			if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
				setHeaders(header, valueOrRewrite);
			} else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
				setHeaders(parseHeaders(header), valueOrRewrite);
			} else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
				let obj = {}, dest, key;
				for (const entry of header) {
					if (!utils$1.isArray(entry)) {
						throw TypeError('Object iterator must return a key-value pair');
					}

					obj[key = entry[0]] = (dest = obj[key]) ?
						(utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]]) : entry[1];
				}

				setHeaders(obj, valueOrRewrite);
			} else {
				header != null && setHeader(valueOrRewrite, header, rewrite);
			}

			return this;
		}

		get(header, parser) {
			header = normalizeHeader(header);

			if (header) {
				const key = utils$1.findKey(this, header);

				if (key) {
					const value = this[key];

					if (!parser) {
						return value;
					}

					if (parser === true) {
						return parseTokens(value);
					}

					if (utils$1.isFunction(parser)) {
						return parser.call(this, value, key);
					}

					if (utils$1.isRegExp(parser)) {
						return parser.exec(value);
					}

					throw new TypeError('parser must be boolean|regexp|function');
				}
			}
		}

		has(header, matcher) {
			header = normalizeHeader(header);

			if (header) {
				const key = utils$1.findKey(this, header);

				return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
			}

			return false;
		}

		delete(header, matcher) {
			const self = this;
			let deleted = false;

			function deleteHeader(_header) {
				_header = normalizeHeader(_header);

				if (_header) {
					const key = utils$1.findKey(self, _header);

					if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
						delete self[key];

						deleted = true;
					}
				}
			}

			if (utils$1.isArray(header)) {
				header.forEach(deleteHeader);
			} else {
				deleteHeader(header);
			}

			return deleted;
		}

		clear(matcher) {
			const keys = Object.keys(this);
			let i = keys.length;
			let deleted = false;

			while (i--) {
				const key = keys[i];
				if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
					delete this[key];
					deleted = true;
				}
			}

			return deleted;
		}

		normalize(format) {
			const self = this;
			const headers = {};

			utils$1.forEach(this, (value, header) => {
				const key = utils$1.findKey(headers, header);

				if (key) {
					self[key] = normalizeValue(value);
					delete self[header];
					return;
				}

				const normalized = format ? formatHeader(header) : String(header).trim();

				if (normalized !== header) {
					delete self[header];
				}

				self[normalized] = normalizeValue(value);

				headers[normalized] = true;
			});

			return this;
		}

		concat(...targets) {
			return this.constructor.concat(this, ...targets);
		}

		toJSON(asStrings) {
			const obj = Object.create(null);

			utils$1.forEach(this, (value, header) => {
				value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
			});

			return obj;
		}

		[Symbol.iterator]() {
			return Object.entries(this.toJSON())[Symbol.iterator]();
		}

		toString() {
			return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
		}

		getSetCookie() {
			return this.get("set-cookie") || [];
		}

		get [Symbol.toStringTag]() {
			return 'AxiosHeaders';
		}

		static from(thing) {
			return thing instanceof this ? thing : new this(thing);
		}

		static concat(first, ...targets) {
			const computed = new this(first);

			targets.forEach((target) => computed.set(target));

			return computed;
		}

		static accessor(header) {
			const internals = this[$internals] = (this[$internals] = {
				accessors: {}
			});

			const accessors = internals.accessors;
			const prototype = this.prototype;

			function defineAccessor(_header) {
				const lHeader = normalizeHeader(_header);

				if (!accessors[lHeader]) {
					buildAccessors(prototype, _header);
					accessors[lHeader] = true;
				}
			}

			utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

			return this;
		}
	};

	AxiosHeaders$1.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

	// reserved names hotfix
	utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({value}, key) => {
		let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
		return {
			get: () => value,
			set(headerValue) {
				this[mapped] = headerValue;
			}
		}
	});

	utils$1.freezeMethods(AxiosHeaders$1);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Array|Function} fns A single function or Array of functions
	 * @param {?Object} response The response object
	 *
	 * @returns {*} The resulting transformed data
	 */
	function transformData(fns, response) {
		const config = this || defaults;
		const context = response || config;
		const headers = AxiosHeaders$1.from(context.headers);
		let data = context.data;

		utils$1.forEach(fns, function transform(fn) {
			data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
		});

		headers.normalize();

		return data;
	}

	function isCancel$1(value) {
		return !!(value && value.__CANCEL__);
	}

	/**
	 * A `CanceledError` is an object that is thrown when an operation is canceled.
	 *
	 * @param {string=} message The message.
	 * @param {Object=} config The config.
	 * @param {Object=} request The request.
	 *
	 * @returns {CanceledError} The created error.
	 */
	function CanceledError$1(message, config, request) {
		// eslint-disable-next-line no-eq-null,eqeqeq
		AxiosError$1.call(this, message == null ? 'canceled' : message, AxiosError$1.ERR_CANCELED, config, request);
		this.name = 'CanceledError';
	}

	utils$1.inherits(CanceledError$1, AxiosError$1, {
		__CANCEL__: true
	});

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 *
	 * @returns {object} The response.
	 */
	function settle(resolve, reject, response) {
		const validateStatus = response.config.validateStatus;
		if (!response.status || !validateStatus || validateStatus(response.status)) {
			resolve(response);
		} else {
			reject(new AxiosError$1(
				'Request failed with status code ' + response.status,
				[AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
				response.config,
				response.request,
				response
			));
		}
	}

	function parseProtocol(url) {
		const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
		return match && match[1] || '';
	}

	/**
	 * Calculate data maxRate
	 * @param {Number} [samplesCount= 10]
	 * @param {Number} [min= 1000]
	 * @returns {Function}
	 */
	function speedometer(samplesCount, min) {
		samplesCount = samplesCount || 10;
		const bytes = new Array(samplesCount);
		const timestamps = new Array(samplesCount);
		let head = 0;
		let tail = 0;
		let firstSampleTS;

		min = min !== undefined ? min : 1000;

		return function push(chunkLength) {
			const now = Date.now();

			const startedAt = timestamps[tail];

			if (!firstSampleTS) {
				firstSampleTS = now;
			}

			bytes[head] = chunkLength;
			timestamps[head] = now;

			let i = tail;
			let bytesCount = 0;

			while (i !== head) {
				bytesCount += bytes[i++];
				i = i % samplesCount;
			}

			head = (head + 1) % samplesCount;

			if (head === tail) {
				tail = (tail + 1) % samplesCount;
			}

			if (now - firstSampleTS < min) {
				return;
			}

			const passed = startedAt && now - startedAt;

			return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
		};
	}

	/**
	 * Throttle decorator
	 * @param {Function} fn
	 * @param {Number} freq
	 * @return {Function}
	 */
	function throttle(fn, freq) {
		let timestamp = 0;
		let threshold = 1000 / freq;
		let lastArgs;
		let timer;

		const invoke = (args, now = Date.now()) => {
			timestamp = now;
			lastArgs = null;
			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
			fn(...args);
		};

		const throttled = (...args) => {
			const now = Date.now();
			const passed = now - timestamp;
			if ( passed >= threshold) {
				invoke(args, now);
			} else {
				lastArgs = args;
				if (!timer) {
					timer = setTimeout(() => {
						timer = null;
						invoke(lastArgs);
					}, threshold - passed);
				}
			}
		};

		const flush = () => lastArgs && invoke(lastArgs);

		return [throttled, flush];
	}

	const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
		let bytesNotified = 0;
		const _speedometer = speedometer(50, 250);

		return throttle(e => {
			const loaded = e.loaded;
			const total = e.lengthComputable ? e.total : undefined;
			const progressBytes = loaded - bytesNotified;
			const rate = _speedometer(progressBytes);
			const inRange = loaded <= total;

			bytesNotified = loaded;

			const data = {
				loaded,
				total,
				progress: total ? (loaded / total) : undefined,
				bytes: progressBytes,
				rate: rate ? rate : undefined,
				estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
				event: e,
				lengthComputable: total != null,
				[isDownloadStream ? 'download' : 'upload']: true
			};

			listener(data);
		}, freq);
	};

	const progressEventDecorator = (total, throttled) => {
		const lengthComputable = total != null;

		return [(loaded) => throttled[0]({
			lengthComputable,
			total,
			loaded
		}), throttled[1]];
	};

	const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));

	var isURLSameOrigin = platform.hasStandardBrowserEnv ? ((origin, isMSIE) => (url) => {
		url = new URL(url, platform.origin);

		return (
			origin.protocol === url.protocol &&
			origin.host === url.host &&
			(isMSIE || origin.port === url.port)
		);
	})(
		new URL(platform.origin),
		platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
	) : () => true;

	var cookies = platform.hasStandardBrowserEnv ?

		// Standard browser envs support document.cookie
		{
			write(name, value, expires, path, domain, secure, sameSite) {
				if (typeof document === 'undefined') return;

				const cookie = [`${name}=${encodeURIComponent(value)}`];

				if (utils$1.isNumber(expires)) {
					cookie.push(`expires=${new Date(expires).toUTCString()}`);
				}
				if (utils$1.isString(path)) {
					cookie.push(`path=${path}`);
				}
				if (utils$1.isString(domain)) {
					cookie.push(`domain=${domain}`);
				}
				if (secure === true) {
					cookie.push('secure');
				}
				if (utils$1.isString(sameSite)) {
					cookie.push(`SameSite=${sameSite}`);
				}

				document.cookie = cookie.join('; ');
			},

			read(name) {
				if (typeof document === 'undefined') return null;
				const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
				return match ? decodeURIComponent(match[1]) : null;
			},

			remove(name) {
				this.write(name, '', Date.now() - 86400000, '/');
			}
		}

		:

		// Non-standard browser env (web workers, react-native) lack needed support.
		{
			write() {},
			read() {
				return null;
			},
			remove() {}
		};

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 *
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	function isAbsoluteURL(url) {
		// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
		// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
		// by any combination of letters, digits, plus, period, or hyphen.
		return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
	}

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 *
	 * @returns {string} The combined URL
	 */
	function combineURLs(baseURL, relativeURL) {
		return relativeURL
			? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
			: baseURL;
	}

	/**
	 * Creates a new URL by combining the baseURL with the requestedURL,
	 * only when the requestedURL is not already an absolute URL.
	 * If the requestURL is absolute, this function returns the requestedURL untouched.
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} requestedURL Absolute or relative URL to combine
	 *
	 * @returns {string} The combined full path
	 */
	function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
		let isRelativeUrl = !isAbsoluteURL(requestedURL);
		if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
			return combineURLs(baseURL, requestedURL);
		}
		return requestedURL;
	}

	const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

	/**
	 * Config-specific merge-function which creates a new config-object
	 * by merging two configuration objects together.
	 *
	 * @param {Object} config1
	 * @param {Object} config2
	 *
	 * @returns {Object} New object resulting from merging config2 to config1
	 */
	function mergeConfig$1(config1, config2) {
		// eslint-disable-next-line no-param-reassign
		config2 = config2 || {};
		const config = {};

		function getMergedValue(target, source, prop, caseless) {
			if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
				return utils$1.merge.call({caseless}, target, source);
			} else if (utils$1.isPlainObject(source)) {
				return utils$1.merge({}, source);
			} else if (utils$1.isArray(source)) {
				return source.slice();
			}
			return source;
		}

		// eslint-disable-next-line consistent-return
		function mergeDeepProperties(a, b, prop, caseless) {
			if (!utils$1.isUndefined(b)) {
				return getMergedValue(a, b, prop, caseless);
			} else if (!utils$1.isUndefined(a)) {
				return getMergedValue(undefined, a, prop, caseless);
			}
		}

		// eslint-disable-next-line consistent-return
		function valueFromConfig2(a, b) {
			if (!utils$1.isUndefined(b)) {
				return getMergedValue(undefined, b);
			}
		}

		// eslint-disable-next-line consistent-return
		function defaultToConfig2(a, b) {
			if (!utils$1.isUndefined(b)) {
				return getMergedValue(undefined, b);
			} else if (!utils$1.isUndefined(a)) {
				return getMergedValue(undefined, a);
			}
		}

		// eslint-disable-next-line consistent-return
		function mergeDirectKeys(a, b, prop) {
			if (prop in config2) {
				return getMergedValue(a, b);
			} else if (prop in config1) {
				return getMergedValue(undefined, a);
			}
		}

		const mergeMap = {
			url: valueFromConfig2,
			method: valueFromConfig2,
			data: valueFromConfig2,
			baseURL: defaultToConfig2,
			transformRequest: defaultToConfig2,
			transformResponse: defaultToConfig2,
			paramsSerializer: defaultToConfig2,
			timeout: defaultToConfig2,
			timeoutMessage: defaultToConfig2,
			withCredentials: defaultToConfig2,
			withXSRFToken: defaultToConfig2,
			adapter: defaultToConfig2,
			responseType: defaultToConfig2,
			xsrfCookieName: defaultToConfig2,
			xsrfHeaderName: defaultToConfig2,
			onUploadProgress: defaultToConfig2,
			onDownloadProgress: defaultToConfig2,
			decompress: defaultToConfig2,
			maxContentLength: defaultToConfig2,
			maxBodyLength: defaultToConfig2,
			beforeRedirect: defaultToConfig2,
			transport: defaultToConfig2,
			httpAgent: defaultToConfig2,
			httpsAgent: defaultToConfig2,
			cancelToken: defaultToConfig2,
			socketPath: defaultToConfig2,
			responseEncoding: defaultToConfig2,
			validateStatus: mergeDirectKeys,
			headers: (a, b, prop) => mergeDeepProperties(headersToObject(a), headersToObject(b), prop, true)
		};

		utils$1.forEach(Object.keys({...config1, ...config2}), function computeConfigValue(prop) {
			const merge = mergeMap[prop] || mergeDeepProperties;
			const configValue = merge(config1[prop], config2[prop], prop);
			(utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
		});

		return config;
	}

	var resolveConfig = (config) => {
		const newConfig = mergeConfig$1({}, config);

		let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth } = newConfig;

		newConfig.headers = headers = AxiosHeaders$1.from(headers);

		newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config.params, config.paramsSerializer);

		// HTTP basic authentication
		if (auth) {
			headers.set('Authorization', 'Basic ' +
				btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : ''))
			);
		}

		if (utils$1.isFormData(data)) {
			if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
				headers.setContentType(undefined); // browser handles it
			} else if (utils$1.isFunction(data.getHeaders)) {
				// Node.js FormData (like form-data package)
				const formHeaders = data.getHeaders();
				// Only set safe headers to avoid overwriting security headers
				const allowedHeaders = ['content-type', 'content-length'];
				Object.entries(formHeaders).forEach(([key, val]) => {
					if (allowedHeaders.includes(key.toLowerCase())) {
						headers.set(key, val);
					}
				});
			}
		}

		// Add xsrf header
		// This is only done if running in a standard browser environment.
		// Specifically not if we're in a web worker, or react-native.

		if (platform.hasStandardBrowserEnv) {
			withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

			if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(newConfig.url))) {
				// Add xsrf header
				const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

				if (xsrfValue) {
					headers.set(xsrfHeaderName, xsrfValue);
				}
			}
		}

		return newConfig;
	};

	const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

	var xhrAdapter = isXHRAdapterSupported && function (config) {
		return new Promise(function dispatchXhrRequest(resolve, reject) {
			const _config = resolveConfig(config);
			let requestData = _config.data;
			const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
			let {responseType, onUploadProgress, onDownloadProgress} = _config;
			let onCanceled;
			let uploadThrottled, downloadThrottled;
			let flushUpload, flushDownload;

			function done() {
				flushUpload && flushUpload(); // flush events
				flushDownload && flushDownload(); // flush events

				_config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);

				_config.signal && _config.signal.removeEventListener('abort', onCanceled);
			}

			let request = new XMLHttpRequest();

			request.open(_config.method.toUpperCase(), _config.url, true);

			// Set the request timeout in MS
			request.timeout = _config.timeout;

			function onloadend() {
				if (!request) {
					return;
				}
				// Prepare the response
				const responseHeaders = AxiosHeaders$1.from(
					'getAllResponseHeaders' in request && request.getAllResponseHeaders()
				);
				const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
					request.responseText : request.response;
				const response = {
					data: responseData,
					status: request.status,
					statusText: request.statusText,
					headers: responseHeaders,
					config,
					request
				};

				settle(function _resolve(value) {
					resolve(value);
					done();
				}, function _reject(err) {
					reject(err);
					done();
				}, response);

				// Clean up request
				request = null;
			}

			if ('onloadend' in request) {
				// Use onloadend if available
				request.onloadend = onloadend;
			} else {
				// Listen for ready state to emulate onloadend
				request.onreadystatechange = function handleLoad() {
					if (!request || request.readyState !== 4) {
						return;
					}

					// The request errored out and we didn't get a response, this will be
					// handled by onerror instead
					// With one exception: request that using file: protocol, most browsers
					// will return status as 0 even though it's a successful request
					if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
						return;
					}
					// readystate handler is calling before onerror or ontimeout handlers,
					// so we should call onloadend on the next 'tick'
					setTimeout(onloadend);
				};
			}

			// Handle browser request cancellation (as opposed to a manual cancellation)
			request.onabort = function handleAbort() {
				if (!request) {
					return;
				}

				reject(new AxiosError$1('Request aborted', AxiosError$1.ECONNABORTED, config, request));

				// Clean up request
				request = null;
			};

			// Handle low level network errors
			request.onerror = function handleError(event) {
				// Browsers deliver a ProgressEvent in XHR onerror
				// (message may be empty; when present, surface it)
				// See https://developer.mozilla.org/docs/Web/API/XMLHttpRequest/error_event
				const msg = event && event.message ? event.message : 'Network Error';
				const err = new AxiosError$1(msg, AxiosError$1.ERR_NETWORK, config, request);
				// attach the underlying event for consumers who want details
				err.event = event || null;
				reject(err);
				request = null;
			};

			// Handle timeout
			request.ontimeout = function handleTimeout() {
				let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
				const transitional = _config.transitional || transitionalDefaults;
				if (_config.timeoutErrorMessage) {
					timeoutErrorMessage = _config.timeoutErrorMessage;
				}
				reject(new AxiosError$1(
					timeoutErrorMessage,
					transitional.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
					config,
					request));

				// Clean up request
				request = null;
			};

			// Remove Content-Type if data is undefined
			requestData === undefined && requestHeaders.setContentType(null);

			// Add headers to the request
			if ('setRequestHeader' in request) {
				utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
					request.setRequestHeader(key, val);
				});
			}

			// Add withCredentials to request if needed
			if (!utils$1.isUndefined(_config.withCredentials)) {
				request.withCredentials = !!_config.withCredentials;
			}

			// Add responseType to request if needed
			if (responseType && responseType !== 'json') {
				request.responseType = _config.responseType;
			}

			// Handle progress if needed
			if (onDownloadProgress) {
				([downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true));
				request.addEventListener('progress', downloadThrottled);
			}

			// Not all browsers support upload events
			if (onUploadProgress && request.upload) {
				([uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress));

				request.upload.addEventListener('progress', uploadThrottled);

				request.upload.addEventListener('loadend', flushUpload);
			}

			if (_config.cancelToken || _config.signal) {
				// Handle cancellation
				// eslint-disable-next-line func-names
				onCanceled = cancel => {
					if (!request) {
						return;
					}
					reject(!cancel || cancel.type ? new CanceledError$1(null, config, request) : cancel);
					request.abort();
					request = null;
				};

				_config.cancelToken && _config.cancelToken.subscribe(onCanceled);
				if (_config.signal) {
					_config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
				}
			}

			const protocol = parseProtocol(_config.url);

			if (protocol && platform.protocols.indexOf(protocol) === -1) {
				reject(new AxiosError$1('Unsupported protocol ' + protocol + ':', AxiosError$1.ERR_BAD_REQUEST, config));
				return;
			}


			// Send the request
			request.send(requestData || null);
		});
	};

	const composeSignals = (signals, timeout) => {
		const {length} = (signals = signals ? signals.filter(Boolean) : []);

		if (timeout || length) {
			let controller = new AbortController();

			let aborted;

			const onabort = function (reason) {
				if (!aborted) {
					aborted = true;
					unsubscribe();
					const err = reason instanceof Error ? reason : this.reason;
					controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
				}
			};

			let timer = timeout && setTimeout(() => {
				timer = null;
				onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
			}, timeout);

			const unsubscribe = () => {
				if (signals) {
					timer && clearTimeout(timer);
					timer = null;
					signals.forEach(signal => {
						signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
					});
					signals = null;
				}
			};

			signals.forEach((signal) => signal.addEventListener('abort', onabort));

			const {signal} = controller;

			signal.unsubscribe = () => utils$1.asap(unsubscribe);

			return signal;
		}
	};

	const streamChunk = function* (chunk, chunkSize) {
		let len = chunk.byteLength;

		if (len < chunkSize) {
			yield chunk;
			return;
		}

		let pos = 0;
		let end;

		while (pos < len) {
			end = pos + chunkSize;
			yield chunk.slice(pos, end);
			pos = end;
		}
	};

	const readBytes = async function* (iterable, chunkSize) {
		for await (const chunk of readStream(iterable)) {
			yield* streamChunk(chunk, chunkSize);
		}
	};

	const readStream = async function* (stream) {
		if (stream[Symbol.asyncIterator]) {
			yield* stream;
			return;
		}

		const reader = stream.getReader();
		try {
			for (;;) {
				const {done, value} = await reader.read();
				if (done) {
					break;
				}
				yield value;
			}
		} finally {
			await reader.cancel();
		}
	};

	const trackStream = (stream, chunkSize, onProgress, onFinish) => {
		const iterator = readBytes(stream, chunkSize);

		let bytes = 0;
		let done;
		let _onFinish = (e) => {
			if (!done) {
				done = true;
				onFinish && onFinish(e);
			}
		};

		return new ReadableStream({
			async pull(controller) {
				try {
					const {done, value} = await iterator.next();

					if (done) {
						_onFinish();
						controller.close();
						return;
					}

					let len = value.byteLength;
					if (onProgress) {
						let loadedBytes = bytes += len;
						onProgress(loadedBytes);
					}
					controller.enqueue(new Uint8Array(value));
				} catch (err) {
					_onFinish(err);
					throw err;
				}
			},
			cancel(reason) {
				_onFinish(reason);
				return iterator.return();
			}
		}, {
			highWaterMark: 2
		})
	};

	const DEFAULT_CHUNK_SIZE = 64 * 1024;

	const {isFunction} = utils$1;

	const globalFetchAPI = (({Request, Response}) => ({
		Request, Response
	}))(utils$1.global);

	const {
		ReadableStream: ReadableStream$1, TextEncoder
	} = utils$1.global;


	const test = (fn, ...args) => {
		try {
			return !!fn(...args);
		} catch (e) {
			return false
		}
	};

	const factory = (env) => {
		env = utils$1.merge.call({
			skipUndefined: true
		}, globalFetchAPI, env);

		const {fetch: envFetch, Request, Response} = env;
		const isFetchSupported = envFetch ? isFunction(envFetch) : typeof fetch === 'function';
		const isRequestSupported = isFunction(Request);
		const isResponseSupported = isFunction(Response);

		if (!isFetchSupported) {
			return false;
		}

		const isReadableStreamSupported = isFetchSupported && isFunction(ReadableStream$1);

		const encodeText = isFetchSupported && (typeof TextEncoder === 'function' ?
				((encoder) => (str) => encoder.encode(str))(new TextEncoder()) :
				async (str) => new Uint8Array(await new Request(str).arrayBuffer())
		);

		const supportsRequestStream = isRequestSupported && isReadableStreamSupported && test(() => {
			let duplexAccessed = false;

			const hasContentType = new Request(platform.origin, {
				body: new ReadableStream$1(),
				method: 'POST',
				get duplex() {
					duplexAccessed = true;
					return 'half';
				},
			}).headers.has('Content-Type');

			return duplexAccessed && !hasContentType;
		});

		const supportsResponseStream = isResponseSupported && isReadableStreamSupported &&
			test(() => utils$1.isReadableStream(new Response('').body));

		const resolvers = {
			stream: supportsResponseStream && ((res) => res.body)
		};

		isFetchSupported && ((() => {
			['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
				!resolvers[type] && (resolvers[type] = (res, config) => {
					let method = res && res[type];

					if (method) {
						return method.call(res);
					}

					throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config);
				});
			});
		})());

		const getBodyLength = async (body) => {
			if (body == null) {
				return 0;
			}

			if (utils$1.isBlob(body)) {
				return body.size;
			}

			if (utils$1.isSpecCompliantForm(body)) {
				const _request = new Request(platform.origin, {
					method: 'POST',
					body,
				});
				return (await _request.arrayBuffer()).byteLength;
			}

			if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
				return body.byteLength;
			}

			if (utils$1.isURLSearchParams(body)) {
				body = body + '';
			}

			if (utils$1.isString(body)) {
				return (await encodeText(body)).byteLength;
			}
		};

		const resolveBodyLength = async (headers, body) => {
			const length = utils$1.toFiniteNumber(headers.getContentLength());

			return length == null ? getBodyLength(body) : length;
		};

		return async (config) => {
			let {
				url,
				method,
				data,
				signal,
				cancelToken,
				timeout,
				onDownloadProgress,
				onUploadProgress,
				responseType,
				headers,
				withCredentials = 'same-origin',
				fetchOptions
			} = resolveConfig(config);

			let _fetch = envFetch || fetch;

			responseType = responseType ? (responseType + '').toLowerCase() : 'text';

			let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);

			let request = null;

			const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
				composedSignal.unsubscribe();
			});

			let requestContentLength;

			try {
				if (
					onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' &&
					(requestContentLength = await resolveBodyLength(headers, data)) !== 0
				) {
					let _request = new Request(url, {
						method: 'POST',
						body: data,
						duplex: "half"
					});

					let contentTypeHeader;

					if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
						headers.setContentType(contentTypeHeader);
					}

					if (_request.body) {
						const [onProgress, flush] = progressEventDecorator(
							requestContentLength,
							progressEventReducer(asyncDecorator(onUploadProgress))
						);

						data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
					}
				}

				if (!utils$1.isString(withCredentials)) {
					withCredentials = withCredentials ? 'include' : 'omit';
				}

				// Cloudflare Workers throws when credentials are defined
				// see https://github.com/cloudflare/workerd/issues/902
				const isCredentialsSupported = isRequestSupported && "credentials" in Request.prototype;

				const resolvedOptions = {
					...fetchOptions,
					signal: composedSignal,
					method: method.toUpperCase(),
					headers: headers.normalize().toJSON(),
					body: data,
					duplex: "half",
					credentials: isCredentialsSupported ? withCredentials : undefined
				};

				request = isRequestSupported && new Request(url, resolvedOptions);

				let response = await (isRequestSupported ? _fetch(request, fetchOptions) : _fetch(url, resolvedOptions));

				const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

				if (supportsResponseStream && (onDownloadProgress || (isStreamResponse && unsubscribe))) {
					const options = {};

					['status', 'statusText', 'headers'].forEach(prop => {
						options[prop] = response[prop];
					});

					const responseContentLength = utils$1.toFiniteNumber(response.headers.get('content-length'));

					const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
						responseContentLength,
						progressEventReducer(asyncDecorator(onDownloadProgress), true)
					) || [];

					response = new Response(
						trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
							flush && flush();
							unsubscribe && unsubscribe();
						}),
						options
					);
				}

				responseType = responseType || 'text';

				let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || 'text'](response, config);

				!isStreamResponse && unsubscribe && unsubscribe();

				return await new Promise((resolve, reject) => {
					settle(resolve, reject, {
						data: responseData,
						headers: AxiosHeaders$1.from(response.headers),
						status: response.status,
						statusText: response.statusText,
						config,
						request
					});
				})
			} catch (err) {
				unsubscribe && unsubscribe();

				if (err && err.name === 'TypeError' && /Load failed|fetch/i.test(err.message)) {
					throw Object.assign(
						new AxiosError$1('Network Error', AxiosError$1.ERR_NETWORK, config, request),
						{
							cause: err.cause || err
						}
					)
				}

				throw AxiosError$1.from(err, err && err.code, config, request);
			}
		}
	};

	const seedCache = new Map();

	const getFetch = (config) => {
		let env = (config && config.env) || {};
		const {fetch, Request, Response} = env;
		const seeds = [
			Request, Response, fetch
		];

		let len = seeds.length, i = len,
			seed, target, map = seedCache;

		while (i--) {
			seed = seeds[i];
			target = map.get(seed);

			target === undefined && map.set(seed, target = (i ? new Map() : factory(env)));

			map = target;
		}

		return target;
	};

	getFetch();

	/**
	 * Known adapters mapping.
	 * Provides environment-specific adapters for Axios:
	 * - `http` for Node.js
	 * - `xhr` for browsers
	 * - `fetch` for fetch API-based requests
	 *
	 * @type {Object<string, Function|Object>}
	 */
	const knownAdapters = {
		http: httpAdapter,
		xhr: xhrAdapter,
		fetch: {
			get: getFetch,
		}
	};

	// Assign adapter names for easier debugging and identification
	utils$1.forEach(knownAdapters, (fn, value) => {
		if (fn) {
			try {
				Object.defineProperty(fn, 'name', { value });
			} catch (e) {
				// eslint-disable-next-line no-empty
			}
			Object.defineProperty(fn, 'adapterName', { value });
		}
	});

	/**
	 * Render a rejection reason string for unknown or unsupported adapters
	 *
	 * @param {string} reason
	 * @returns {string}
	 */
	const renderReason = (reason) => `- ${reason}`;

	/**
	 * Check if the adapter is resolved (function, null, or false)
	 *
	 * @param {Function|null|false} adapter
	 * @returns {boolean}
	 */
	const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

	/**
	 * Get the first suitable adapter from the provided list.
	 * Tries each adapter in order until a supported one is found.
	 * Throws an AxiosError if no adapter is suitable.
	 *
	 * @param {Array<string|Function>|string|Function} adapters - Adapter(s) by name or function.
	 * @param {Object} config - Axios request configuration
	 * @throws {AxiosError} If no suitable adapter is available
	 * @returns {Function} The resolved adapter function
	 */
	function getAdapter$1(adapters, config) {
		adapters = utils$1.isArray(adapters) ? adapters : [adapters];

		const { length } = adapters;
		let nameOrAdapter;
		let adapter;

		const rejectedReasons = {};

		for (let i = 0; i < length; i++) {
			nameOrAdapter = adapters[i];
			let id;

			adapter = nameOrAdapter;

			if (!isResolvedHandle(nameOrAdapter)) {
				adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

				if (adapter === undefined) {
					throw new AxiosError$1(`Unknown adapter '${id}'`);
				}
			}

			if (adapter && (utils$1.isFunction(adapter) || (adapter = adapter.get(config)))) {
				break;
			}

			rejectedReasons[id || '#' + i] = adapter;
		}

		if (!adapter) {
			const reasons = Object.entries(rejectedReasons)
				.map(([id, state]) => `adapter ${id} ` +
					(state === false ? 'is not supported by the environment' : 'is not available in the build')
				);

			let s = length ?
				(reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
				'as no adapter specified';

			throw new AxiosError$1(
				`There is no suitable adapter to dispatch the request ` + s,
				'ERR_NOT_SUPPORT'
			);
		}

		return adapter;
	}

	/**
	 * Exports Axios adapters and utility to resolve an adapter
	 */
	var adapters = {
		/**
		 * Resolve an adapter from a list of adapter names or functions.
		 * @type {Function}
		 */
		getAdapter: getAdapter$1,

		/**
		 * Exposes all known adapters
		 * @type {Object<string, Function|Object>}
		 */
		adapters: knownAdapters
	};

	/**
	 * Throws a `CanceledError` if cancellation has been requested.
	 *
	 * @param {Object} config The config that is to be used for the request
	 *
	 * @returns {void}
	 */
	function throwIfCancellationRequested(config) {
		if (config.cancelToken) {
			config.cancelToken.throwIfRequested();
		}

		if (config.signal && config.signal.aborted) {
			throw new CanceledError$1(null, config);
		}
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 *
	 * @returns {Promise} The Promise to be fulfilled
	 */
	function dispatchRequest(config) {
		throwIfCancellationRequested(config);

		config.headers = AxiosHeaders$1.from(config.headers);

		// Transform request data
		config.data = transformData.call(
			config,
			config.transformRequest
		);

		if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
			config.headers.setContentType('application/x-www-form-urlencoded', false);
		}

		const adapter = adapters.getAdapter(config.adapter || defaults.adapter, config);

		return adapter(config).then(function onAdapterResolution(response) {
			throwIfCancellationRequested(config);

			// Transform response data
			response.data = transformData.call(
				config,
				config.transformResponse,
				response
			);

			response.headers = AxiosHeaders$1.from(response.headers);

			return response;
		}, function onAdapterRejection(reason) {
			if (!isCancel$1(reason)) {
				throwIfCancellationRequested(config);

				// Transform response data
				if (reason && reason.response) {
					reason.response.data = transformData.call(
						config,
						config.transformResponse,
						reason.response
					);
					reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
				}
			}

			return Promise.reject(reason);
		});
	}

	const VERSION$1 = "1.13.2";

	const validators$1 = {};

	// eslint-disable-next-line func-names
	['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
		validators$1[type] = function validator(thing) {
			return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
		};
	});

	const deprecatedWarnings = {};

	/**
	 * Transitional option validator
	 *
	 * @param {function|boolean?} validator - set to false if the transitional option has been removed
	 * @param {string?} version - deprecated version / removed since version
	 * @param {string?} message - some message with additional info
	 *
	 * @returns {function}
	 */
	validators$1.transitional = function transitional(validator, version, message) {
		function formatMessage(opt, desc) {
			return '[Axios v' + VERSION$1 + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
		}

		// eslint-disable-next-line func-names
		return (value, opt, opts) => {
			if (validator === false) {
				throw new AxiosError$1(
					formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
					AxiosError$1.ERR_DEPRECATED
				);
			}

			if (version && !deprecatedWarnings[opt]) {
				deprecatedWarnings[opt] = true;
				// eslint-disable-next-line no-console
				console.warn(
					formatMessage(
						opt,
						' has been deprecated since v' + version + ' and will be removed in the near future'
					)
				);
			}

			return validator ? validator(value, opt, opts) : true;
		};
	};

	validators$1.spelling = function spelling(correctSpelling) {
		return (value, opt) => {
			// eslint-disable-next-line no-console
			console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
			return true;
		}
	};

	/**
	 * Assert object's properties type
	 *
	 * @param {object} options
	 * @param {object} schema
	 * @param {boolean?} allowUnknown
	 *
	 * @returns {object}
	 */

	function assertOptions(options, schema, allowUnknown) {
		if (typeof options !== 'object') {
			throw new AxiosError$1('options must be an object', AxiosError$1.ERR_BAD_OPTION_VALUE);
		}
		const keys = Object.keys(options);
		let i = keys.length;
		while (i-- > 0) {
			const opt = keys[i];
			const validator = schema[opt];
			if (validator) {
				const value = options[opt];
				const result = value === undefined || validator(value, opt, options);
				if (result !== true) {
					throw new AxiosError$1('option ' + opt + ' must be ' + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
				}
				continue;
			}
			if (allowUnknown !== true) {
				throw new AxiosError$1('Unknown option ' + opt, AxiosError$1.ERR_BAD_OPTION);
			}
		}
	}

	var validator = {
		assertOptions,
		validators: validators$1
	};

	const validators = validator.validators;

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 *
	 * @return {Axios} A new instance of Axios
	 */
	let Axios$1 = class Axios {
		constructor(instanceConfig) {
			this.defaults = instanceConfig || {};
			this.interceptors = {
				request: new InterceptorManager(),
				response: new InterceptorManager()
			};
		}

		/**
		 * Dispatch a request
		 *
		 * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
		 * @param {?Object} config
		 *
		 * @returns {Promise} The Promise to be fulfilled
		 */
		async request(configOrUrl, config) {
			try {
				return await this._request(configOrUrl, config);
			} catch (err) {
				if (err instanceof Error) {
					let dummy = {};

					Error.captureStackTrace ? Error.captureStackTrace(dummy) : (dummy = new Error());

					// slice off the Error: ... line
					const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';
					try {
						if (!err.stack) {
							err.stack = stack;
							// match without the 2 top stack lines
						} else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
							err.stack += '\n' + stack;
						}
					} catch (e) {
						// ignore the case where "stack" is an un-writable property
					}
				}

				throw err;
			}
		}

		_request(configOrUrl, config) {
			/*eslint no-param-reassign:0*/
			// Allow for axios('example/url'[, config]) a la fetch API
			if (typeof configOrUrl === 'string') {
				config = config || {};
				config.url = configOrUrl;
			} else {
				config = configOrUrl || {};
			}

			config = mergeConfig$1(this.defaults, config);

			const {transitional, paramsSerializer, headers} = config;

			if (transitional !== undefined) {
				validator.assertOptions(transitional, {
					silentJSONParsing: validators.transitional(validators.boolean),
					forcedJSONParsing: validators.transitional(validators.boolean),
					clarifyTimeoutError: validators.transitional(validators.boolean)
				}, false);
			}

			if (paramsSerializer != null) {
				if (utils$1.isFunction(paramsSerializer)) {
					config.paramsSerializer = {
						serialize: paramsSerializer
					};
				} else {
					validator.assertOptions(paramsSerializer, {
						encode: validators.function,
						serialize: validators.function
					}, true);
				}
			}

			// Set config.allowAbsoluteUrls
			if (config.allowAbsoluteUrls !== undefined) ; else if (this.defaults.allowAbsoluteUrls !== undefined) {
				config.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
			} else {
				config.allowAbsoluteUrls = true;
			}

			validator.assertOptions(config, {
				baseUrl: validators.spelling('baseURL'),
				withXsrfToken: validators.spelling('withXSRFToken')
			}, true);

			// Set config.method
			config.method = (config.method || this.defaults.method || 'get').toLowerCase();

			// Flatten headers
			let contextHeaders = headers && utils$1.merge(
				headers.common,
				headers[config.method]
			);

			headers && utils$1.forEach(
				['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
				(method) => {
					delete headers[method];
				}
			);

			config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

			// filter out skipped interceptors
			const requestInterceptorChain = [];
			let synchronousRequestInterceptors = true;
			this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
				if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
					return;
				}

				synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

				requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
			});

			const responseInterceptorChain = [];
			this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
				responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
			});

			let promise;
			let i = 0;
			let len;

			if (!synchronousRequestInterceptors) {
				const chain = [dispatchRequest.bind(this), undefined];
				chain.unshift(...requestInterceptorChain);
				chain.push(...responseInterceptorChain);
				len = chain.length;

				promise = Promise.resolve(config);

				while (i < len) {
					promise = promise.then(chain[i++], chain[i++]);
				}

				return promise;
			}

			len = requestInterceptorChain.length;

			let newConfig = config;

			while (i < len) {
				const onFulfilled = requestInterceptorChain[i++];
				const onRejected = requestInterceptorChain[i++];
				try {
					newConfig = onFulfilled(newConfig);
				} catch (error) {
					onRejected.call(this, error);
					break;
				}
			}

			try {
				promise = dispatchRequest.call(this, newConfig);
			} catch (error) {
				return Promise.reject(error);
			}

			i = 0;
			len = responseInterceptorChain.length;

			while (i < len) {
				promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
			}

			return promise;
		}

		getUri(config) {
			config = mergeConfig$1(this.defaults, config);
			const fullPath = buildFullPath(config.baseURL, config.url, config.allowAbsoluteUrls);
			return buildURL(fullPath, config.params, config.paramsSerializer);
		}
	};

	// Provide aliases for supported request methods
	utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
		/*eslint func-names:0*/
		Axios$1.prototype[method] = function(url, config) {
			return this.request(mergeConfig$1(config || {}, {
				method,
				url,
				data: (config || {}).data
			}));
		};
	});

	utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
		/*eslint func-names:0*/

		function generateHTTPMethod(isForm) {
			return function httpMethod(url, data, config) {
				return this.request(mergeConfig$1(config || {}, {
					method,
					headers: isForm ? {
						'Content-Type': 'multipart/form-data'
					} : {},
					url,
					data
				}));
			};
		}

		Axios$1.prototype[method] = generateHTTPMethod();

		Axios$1.prototype[method + 'Form'] = generateHTTPMethod(true);
	});

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @param {Function} executor The executor function.
	 *
	 * @returns {CancelToken}
	 */
	let CancelToken$1 = class CancelToken {
		constructor(executor) {
			if (typeof executor !== 'function') {
				throw new TypeError('executor must be a function.');
			}

			let resolvePromise;

			this.promise = new Promise(function promiseExecutor(resolve) {
				resolvePromise = resolve;
			});

			const token = this;

			// eslint-disable-next-line func-names
			this.promise.then(cancel => {
				if (!token._listeners) return;

				let i = token._listeners.length;

				while (i-- > 0) {
					token._listeners[i](cancel);
				}
				token._listeners = null;
			});

			// eslint-disable-next-line func-names
			this.promise.then = onfulfilled => {
				let _resolve;
				// eslint-disable-next-line func-names
				const promise = new Promise(resolve => {
					token.subscribe(resolve);
					_resolve = resolve;
				}).then(onfulfilled);

				promise.cancel = function reject() {
					token.unsubscribe(_resolve);
				};

				return promise;
			};

			executor(function cancel(message, config, request) {
				if (token.reason) {
					// Cancellation has already been requested
					return;
				}

				token.reason = new CanceledError$1(message, config, request);
				resolvePromise(token.reason);
			});
		}

		/**
		 * Throws a `CanceledError` if cancellation has been requested.
		 */
		throwIfRequested() {
			if (this.reason) {
				throw this.reason;
			}
		}

		/**
		 * Subscribe to the cancel signal
		 */

		subscribe(listener) {
			if (this.reason) {
				listener(this.reason);
				return;
			}

			if (this._listeners) {
				this._listeners.push(listener);
			} else {
				this._listeners = [listener];
			}
		}

		/**
		 * Unsubscribe from the cancel signal
		 */

		unsubscribe(listener) {
			if (!this._listeners) {
				return;
			}
			const index = this._listeners.indexOf(listener);
			if (index !== -1) {
				this._listeners.splice(index, 1);
			}
		}

		toAbortSignal() {
			const controller = new AbortController();

			const abort = (err) => {
				controller.abort(err);
			};

			this.subscribe(abort);

			controller.signal.unsubscribe = () => this.unsubscribe(abort);

			return controller.signal;
		}

		/**
		 * Returns an object that contains a new `CancelToken` and a function that, when called,
		 * cancels the `CancelToken`.
		 */
		static source() {
			let cancel;
			const token = new CancelToken(function executor(c) {
				cancel = c;
			});
			return {
				token,
				cancel
			};
		}
	};

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 *
	 * @returns {Function}
	 */
	function spread$1(callback) {
		return function wrap(arr) {
			return callback.apply(null, arr);
		};
	}

	/**
	 * Determines whether the payload is an error thrown by Axios
	 *
	 * @param {*} payload The value to test
	 *
	 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
	 */
	function isAxiosError$1(payload) {
		return utils$1.isObject(payload) && (payload.isAxiosError === true);
	}

	const HttpStatusCode$1 = {
		Continue: 100,
		SwitchingProtocols: 101,
		Processing: 102,
		EarlyHints: 103,
		Ok: 200,
		Created: 201,
		Accepted: 202,
		NonAuthoritativeInformation: 203,
		NoContent: 204,
		ResetContent: 205,
		PartialContent: 206,
		MultiStatus: 207,
		AlreadyReported: 208,
		ImUsed: 226,
		MultipleChoices: 300,
		MovedPermanently: 301,
		Found: 302,
		SeeOther: 303,
		NotModified: 304,
		UseProxy: 305,
		Unused: 306,
		TemporaryRedirect: 307,
		PermanentRedirect: 308,
		BadRequest: 400,
		Unauthorized: 401,
		PaymentRequired: 402,
		Forbidden: 403,
		NotFound: 404,
		MethodNotAllowed: 405,
		NotAcceptable: 406,
		ProxyAuthenticationRequired: 407,
		RequestTimeout: 408,
		Conflict: 409,
		Gone: 410,
		LengthRequired: 411,
		PreconditionFailed: 412,
		PayloadTooLarge: 413,
		UriTooLong: 414,
		UnsupportedMediaType: 415,
		RangeNotSatisfiable: 416,
		ExpectationFailed: 417,
		ImATeapot: 418,
		MisdirectedRequest: 421,
		UnprocessableEntity: 422,
		Locked: 423,
		FailedDependency: 424,
		TooEarly: 425,
		UpgradeRequired: 426,
		PreconditionRequired: 428,
		TooManyRequests: 429,
		RequestHeaderFieldsTooLarge: 431,
		UnavailableForLegalReasons: 451,
		InternalServerError: 500,
		NotImplemented: 501,
		BadGateway: 502,
		ServiceUnavailable: 503,
		GatewayTimeout: 504,
		HttpVersionNotSupported: 505,
		VariantAlsoNegotiates: 506,
		InsufficientStorage: 507,
		LoopDetected: 508,
		NotExtended: 510,
		NetworkAuthenticationRequired: 511,
		WebServerIsDown: 521,
		ConnectionTimedOut: 522,
		OriginIsUnreachable: 523,
		TimeoutOccurred: 524,
		SslHandshakeFailed: 525,
		InvalidSslCertificate: 526,
	};

	Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
		HttpStatusCode$1[value] = key;
	});

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 *
	 * @returns {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
		const context = new Axios$1(defaultConfig);
		const instance = bind(Axios$1.prototype.request, context);

		// Copy axios.prototype to instance
		utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

		// Copy context to instance
		utils$1.extend(instance, context, null, {allOwnKeys: true});

		// Factory for creating new instances
		instance.create = function create(instanceConfig) {
			return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
		};

		return instance;
	}

	// Create the default instance to be exported
	const axios = createInstance(defaults);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios$1;

	// Expose Cancel & CancelToken
	axios.CanceledError = CanceledError$1;
	axios.CancelToken = CancelToken$1;
	axios.isCancel = isCancel$1;
	axios.VERSION = VERSION$1;
	axios.toFormData = toFormData$1;

	// Expose AxiosError class
	axios.AxiosError = AxiosError$1;

	// alias for CanceledError for backward compatibility
	axios.Cancel = axios.CanceledError;

	// Expose all/spread
	axios.all = function all(promises) {
		return Promise.all(promises);
	};

	axios.spread = spread$1;

	// Expose isAxiosError
	axios.isAxiosError = isAxiosError$1;

	// Expose mergeConfig
	axios.mergeConfig = mergeConfig$1;

	axios.AxiosHeaders = AxiosHeaders$1;

	axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

	axios.getAdapter = adapters.getAdapter;

	axios.HttpStatusCode = HttpStatusCode$1;

	axios.default = axios;

	// This module is intended to unwrap Axios default export as named.
	// Keep top-level export same with static properties
	// so that it can keep same with es module or cjs
	const {
		Axios,
		AxiosError,
		CanceledError,
		isCancel,
		CancelToken,
		VERSION,
		all,
		Cancel,
		isAxiosError,
		spread,
		toFormData,
		AxiosHeaders,
		HttpStatusCode,
		formToJSON,
		getAdapter,
		mergeConfig
	} = axios;

	/**
	 * HTTP Client
	 *
	 * Axios-based HTTP client for PaywallJsSdk.
	 * Adds token to requests from request context (not auto-generated).
	 */
	let httpClientInstance = null;
	/**
	 * Token management removed.
	 *
	 * Token is now stored in config.accessToken and automatically
	 * added to all requests via HTTP client interceptor.
	 *
	 * SDK does not generate or refresh tokens.
	 * Token must be obtained from merchant backend and provided in config.
	 */
	/**
	 * Config üzerinden baseUrl, timeout ve gerekiyorsa header bilgilerini ayarla.
	 * Bu fonksiyon singleton pattern ile tek bir instance döner.
	 */
	function createHttpClient() {
		const config = getConfig();
		// Ensure baseUrl is defined (should always be resolved from environment)
		if (!config.baseUrl) {
			throw new Error('baseUrl is not set. This should not happen if Init() was called properly.');
		}
		const instance = axios.create({
			baseURL: config.baseUrl,
			timeout: config.timeoutMs ?? 10000,
		});
		instance.interceptors.request.use((request) => {
			// Set Content-Type header
			request.headers = request.headers || {};
			request.headers['Content-Type'] = 'application/json';
			// Add token from internal state
			const token = getToken();
			if (token) {
				request.headers['token'] = token;
				request.headers['Authorization'] = `Bearer ${token}`;
			}
			return request;
		});
		return instance;
	}
	/**
	 * HTTP client instance'ını döner. Singleton pattern kullanır.
	 */
	function getHttpClient() {
		if (!httpClientInstance) {
			httpClientInstance = createHttpClient();
		}
		return httpClientInstance;
	}
	/**
	 * İleride istenirse get/post/put/delete helper fonksiyonları buraya eklenebilir.
	 * POST isteği için helper fonksiyon.
	 */
	async function httpPost(url, data, config) {
		const client = getHttpClient();
		return client.post(url, data, config);
	}
	/**
	 * GET isteği için helper fonksiyon.
	 */
	async function httpGet(url, config) {
		const client = getHttpClient();
		return client.get(url, config);
	}

	/**
	 * Masterpass SDK Wrapper
	 *
	 * Masterpass JavaScript SDK'sını Promise-based hale getiren wrapper.
	 * Callback-based Masterpass SDK'yı Promise pattern'e çevirir.
	 */
	/**
	 * Masterpass SDK script'ini DOM'a yükler.
	 *
	 * @returns Promise<void> - Script yüklendiğinde resolve olur
	 * @throws Error - Script yüklenemezse reject olur
	 */
	/**
	 * Masterpass SDK'yı global scope'tan alır.
	 *
	 * @returns MasterpassGlobal - Masterpass SDK global objesi
	 * @throws Error - Masterpass SDK yüklenmemişse
	 */
	function getMasterpassSdk() {
		if (!window.Masterpass) {
			throw new Error('Masterpass SDK yüklenmedi');
		}
		return window.Masterpass;
	}
	/**
	 * Masterpass AccountService.addCard'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param params - AddCard parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassAddCard(params) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			try {
				sdk.accountService.addCard(params, (err, response) => {
					if (err) {
						// ⚠️ KRİTİK: Masterpass SDK callback'inde err bir number (statusCode) olabilir
						// Veya err bir object olabilir (error response)
						// Gerçek error response'u belirleme:
						// 1. err bir number ise → response parametresini kullan (gerçek error response orada)
						// 2. err bir object ise → err veya err.response'u kullan
						let errorResponse = null;
						let errorStatusCode = 0;
						if (typeof err === 'number') {
							// err bir statusCode (number) ise, gerçek error response'u response parametresinde
							errorStatusCode = err;
							errorResponse = response || null;
						}
						else if (err && typeof err === 'object') {
							// err bir object ise, err'in kendisi veya err.response error response'u
							errorStatusCode = err.statusCode || err.status || 0;
							errorResponse = err.response || err;
						}
						else {
							// err başka bir şey ise (string, vs.)
							errorStatusCode = 0;
							errorResponse = { message: String(err) };
						}
						reject({
							error: err,
							statusCode: errorStatusCode,
							response: errorResponse,
						});
					}
					else {
						const statusCode = response?.statusCode || 200;
						resolve({ statusCode, response });
					}
				});
			}
			catch (error) {
				reject({
					error: error instanceof Error ? error.message : String(error),
					statusCode: 0,
					response: null,
				});
			}
		});
	}
	/**
	 * Masterpass PaymentService.directPayment'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param masterpassParams - DirectPayment parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassDirectPayment(masterpassParams) {
		const sdk = getMasterpassSdk();
		// accountKey ve authenticationMethod zaten mapParamsToMasterpassSdk'de ekleniyor
		// Burada sadece Masterpass SDK çağrısı yapılıyor
		return new Promise((resolve, reject) => {
			sdk.paymentService.directPayment(masterpassParams, (err, response) => {
				if (err) {
					const is202 = err === 202
						|| err === '202'
						|| err?.statusCode === 202
						|| err?.response?.statusCode === 202
						|| (typeof err === 'object' && err !== null && 'statusCode' in err && err.statusCode === 202);
					if (is202) {
						// ⚠️ KRİTİK: 202 response'u normal response olarak resolve et
						// Eğer err direkt 202 ise, response callback'inde data olabilir
						if (err === 202 || err === '202') {
							// err direkt 202 ise, response callback'inde data var mı kontrol et
							if (response) {
								resolve({
									statusCode: 202,
									response: response,
								});
							}
							else {
								// err = 202 ama response yok - bu durumda err'i response olarak kullan
								resolve({
									statusCode: 202,
									response: { statusCode: 202, result: null },
								});
							}
						}
						else {
							// err bir object ise
							const responseData = err.response || err;
							resolve({
								statusCode: 202,
								response: responseData, // Bu responseData içinde result objesi olabilir
							});
						}
					}
					else {
						// Gerçek hata durumu
						reject(err);
					}
				}
				else {
					// response varsa direkt resolve et
					resolve(response);
				}
			});
		});
	}
	/**
	 * Masterpass PaymentService.payment'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param masterpassParams - Payment parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassPayment(masterpassParams) {
		const sdk = getMasterpassSdk();
		// accountKey ve authenticationMethod zaten mapParamsToMasterpassSdk'de ekleniyor
		// Burada sadece Masterpass SDK çağrısı yapılıyor
		return new Promise((resolve, reject) => {
			sdk.paymentService.payment(masterpassParams, (err, response) => {
				// ⚠️ KRİTİK: Masterpass SDK 200 ve 202 response'larını err olarak döndürebilir
				// 200 = SUCCESS (responseCode: "0000")
				// 202 = ACTION_REQUIRED (OTP/3D doğrulama başladı)
				// Bu durumlar hata DEĞİLDİR, normal response olarak handle edilmeli
				if (err) {
					// ⚠️ KRİTİK: Masterpass SDK 200 ve 202'yi farklı formatlarda gönderebilir:
					// 1. err === 200 veya 202 (direkt number)
					// 2. err.statusCode === 200 veya 202 (object içinde)
					// 3. err.response?.statusCode === 200 veya 202 (nested object içinde)
					// 4. err = { statusCode: 200/202, result: { ... }, ... } (direkt result içeriyor)
					// 5. err = { statusCode: 200/202, response: { statusCode: 200/202, result: { ... }, ... } } (nested)
					// err'den statusCode'u çıkar
					let errStatusCode;
					if (typeof err === 'number') {
						errStatusCode = err;
					}
					else if (err && typeof err === 'object') {
						errStatusCode = err.statusCode || err.response?.statusCode;
					}
					// 200 veya 202 ise normal response olarak resolve et
					const isSuccessOrActionRequired = errStatusCode === 200 || errStatusCode === 202;
					if (isSuccessOrActionRequired) {
						// ⚠️ KRİTİK: 200/202 response'u normal response olarak resolve et
						// Eğer err direkt number ise, response callback'inde data olabilir
						if (typeof err === 'number') {
							// err direkt 200/202 ise, response callback'inde data var mı kontrol et
							// ⚠️ KRİTİK: Masterpass SDK err olarak statusCode gönderdiğinde, gerçek response response parametresinde olabilir
							// VEYA err objesi içinde response olabilir
							if (response) {
								// response parametresi varsa onu kullan (en güvenilir)
								resolve({
									statusCode: errStatusCode,
									response: response,
								});
							}
							else {
								// err = 200/202 ama response yok - bu durumda err objesini kontrol et
								// Eğer err bir object ise (number değilse), onu response olarak kullan
								const responseData = typeof err === 'object' && err !== null ? err : { statusCode: errStatusCode, result: null };
								resolve({
									statusCode: errStatusCode,
									response: responseData,
								});
							}
						}
						else {
							// err bir object ise
							// ⚠️ KRİTİK: response parametresi varsa onu kullan (daha güncel)
							// Yoksa err.response veya err'i kullan
							const responseData = response || err.response || err;
							resolve({
								statusCode: errStatusCode,
								response: responseData, // Bu responseData içinde result objesi olabilir
							});
						}
					}
					else {
						// Gerçek hata durumu (400, 500, vs.)
						// ⚠️ KRİTİK: err bir number (statusCode) olabilir, gerçek error response'u response parametresinde
						if (typeof err === 'number') {
							reject({
								error: err,
								statusCode: err,
								response: response || null,
							});
						}
						else if (err && typeof err === 'object') {
							reject({
								error: err,
								statusCode: err.statusCode || err.response?.statusCode || 0,
								response: err.response || err,
							});
						}
						else {
							reject({
								error: err,
								statusCode: 0,
								response: null,
							});
						}
					}
				}
				else {
					// response varsa direkt resolve et
					// ⚠️ KRİTİK: response bir object ise ve statusCode içeriyorsa onu kullan
					// Masterpass SDK başarılı response'u response parametresinde döndürür
					// Format: { statusCode: 200, result: { responseCode: "0000", ... }, ... }
					const statusCode = response?.statusCode || 200;
					resolve({
						statusCode,
						response: response || { statusCode: 200 },
					});
				}
			});
		});
	}
	/**
	 * Masterpass PaymentService.registerAndPurchase'ı Promise-based hale getirir.
	 *
	 * Kart kaydedip aynı anda ödeme yapar.
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * **ÖNEMLİ:**
	 * - Bu fonksiyon hem kart kaydı hem de ödeme işlemini tek seferde yapar
	 * - directPayment ve payment fonksiyonlarının kombinasyonudur
	 * - Kart bilgileri RSA ile şifrelenir
	 *
	 * @param masterpassParams - RegisterAndPurchase parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassRegisterAndPurchase(masterpassParams) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			sdk.paymentService.registerAndPurchase(masterpassParams, (err, response) => {
				if (err) {
					let errStatusCode;
					if (typeof err === 'number') {
						errStatusCode = err;
					}
					else if (err && typeof err === 'object') {
						errStatusCode = err.statusCode || err.response?.statusCode;
					}
					const isSuccessOrActionRequired = errStatusCode === 200 || errStatusCode === 202;
					if (isSuccessOrActionRequired) {
						if (typeof err === 'number') {
							if (response) {
								resolve({
									statusCode: errStatusCode,
									response: response,
								});
							}
							else {
								const responseData = typeof err === 'object' && err !== null ? err : { statusCode: errStatusCode, result: null };
								resolve({
									statusCode: errStatusCode,
									response: responseData,
								});
							}
						}
						else {
							const responseData = response || err.response || err;
							resolve({
								statusCode: errStatusCode,
								response: responseData,
							});
						}
					}
					else {
						if (typeof err === 'number') {
							reject({
								error: err,
								statusCode: err,
								response: response || null,
							});
						}
						else if (err && typeof err === 'object') {
							reject({
								error: err,
								statusCode: err.statusCode || err.response?.statusCode || 0,
								response: err.response || err,
							});
						}
						else {
							reject({
								error: err,
								statusCode: 0,
								response: null,
							});
						}
					}
				}
				else {
					const statusCode = response?.statusCode || 200;
					resolve({
						statusCode,
						response: response || { statusCode: 200 },
					});
				}
			});
		});
	}
	/**
	 * Masterpass AccountService.linkToMerchant'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param params - LinkToMerchant parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassLinkToMerchant(params) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			try {
				sdk.accountService.linkToMerchant(params, (err, response) => {
					if (err) {
						let errorResponse = null;
						let errorStatusCode = 0;
						if (typeof err === 'number') {
							errorStatusCode = err;
							errorResponse = response || null;
						}
						else if (err && typeof err === 'object') {
							errorStatusCode = err.statusCode || err.status || 0;
							errorResponse = err.response || err;
						}
						else {
							errorStatusCode = 0;
							errorResponse = { message: String(err) };
						}
						reject({
							error: err,
							statusCode: errorStatusCode,
							response: errorResponse,
						});
					}
					else {
						const statusCode = response?.statusCode || 200;
						resolve({ statusCode, response });
					}
				});
			}
			catch (error) {
				reject({
					error: error instanceof Error ? error.message : String(error),
					statusCode: 0,
					response: null,
				});
			}
		});
	}
	/**
	 * Masterpass AccountService.removeCard'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param params - RemoveCard parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassRemoveCard(params) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			try {
				sdk.accountService.removeCard(params, (err, response) => {
					if (err) {
						let errorResponse = null;
						let errorStatusCode = 0;
						if (typeof err === 'number') {
							errorStatusCode = err;
							errorResponse = response || null;
						}
						else if (err && typeof err === 'object') {
							errorStatusCode = err.statusCode || err.status || 0;
							errorResponse = err.response || err;
						}
						else {
							errorStatusCode = 0;
							errorResponse = { message: String(err) };
						}
						reject({
							error: err,
							statusCode: errorStatusCode,
							response: errorResponse,
						});
					}
					else {
						const statusCode = response?.statusCode || 200;
						resolve({ statusCode, response });
					}
				});
			}
			catch (error) {
				reject({
					error: error instanceof Error ? error.message : String(error),
					statusCode: 0,
					response: null,
				});
			}
		});
	}
	/**
	 * Masterpass VerifyService.verifyOtp'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param params - VerifyOtp parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassVerifyOtp(params) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			try {
				sdk.verifyService.verifyOtp(params, (err, response) => {
					if (err) {
						// 200 ve 202 response'larını normal response olarak handle et
						let errStatusCode;
						if (typeof err === 'number') {
							errStatusCode = err;
						}
						else if (err && typeof err === 'object') {
							errStatusCode = err.statusCode || err.response?.statusCode;
						}
						const isSuccessOrActionRequired = errStatusCode === 200 || errStatusCode === 202;
						if (isSuccessOrActionRequired) {
							if (typeof err === 'number') {
								if (response) {
									resolve({
										statusCode: errStatusCode,
										response: response,
									});
								}
								else {
									const responseData = typeof err === 'object' && err !== null ? err : { statusCode: errStatusCode, result: null };
									resolve({
										statusCode: errStatusCode,
										response: responseData,
									});
								}
							}
							else {
								const responseData = response || err.response || err;
								resolve({
									statusCode: errStatusCode,
									response: responseData,
								});
							}
						}
						else {
							// Gerçek hata durumu
							let errorResponse = null;
							let errorStatusCode = 0;
							if (typeof err === 'number') {
								errorStatusCode = err;
								errorResponse = response || null;
							}
							else if (err && typeof err === 'object') {
								errorStatusCode = err.statusCode || err.status || 0;
								errorResponse = err.response || err;
							}
							else {
								errorStatusCode = 0;
								errorResponse = { message: String(err) };
							}
							reject({
								error: err,
								statusCode: errorStatusCode,
								response: errorResponse,
							});
						}
					}
					else {
						const statusCode = response?.statusCode || 200;
						resolve({ statusCode, response });
					}
				});
			}
			catch (error) {
				reject({
					error: error instanceof Error ? error.message : String(error),
					statusCode: 0,
					response: null,
				});
			}
		});
	}
	/**
	 * Masterpass VerifyService.resendOtp'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param params - ResendOtp parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassResendOtp(params) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			try {
				sdk.verifyService.resendOtp(params, (err, response) => {
					if (err) {
						// 200 ve 202 response'larını normal response olarak handle et
						let errStatusCode;
						if (typeof err === 'number') {
							errStatusCode = err;
						}
						else if (err && typeof err === 'object') {
							errStatusCode = err.statusCode || err.response?.statusCode;
						}
						const isSuccessOrActionRequired = errStatusCode === 200 || errStatusCode === 202;
						if (isSuccessOrActionRequired) {
							if (typeof err === 'number') {
								if (response) {
									resolve({
										statusCode: errStatusCode,
										response: response,
									});
								}
								else {
									const responseData = typeof err === 'object' && err !== null ? err : { statusCode: errStatusCode, result: null };
									resolve({
										statusCode: errStatusCode,
										response: responseData,
									});
								}
							}
							else {
								const responseData = response || err.response || err;
								resolve({
									statusCode: errStatusCode,
									response: responseData,
								});
							}
						}
						else {
							// Gerçek hata durumu
							let errorResponse = null;
							let errorStatusCode = 0;
							if (typeof err === 'number') {
								errorStatusCode = err;
								errorResponse = response || null;
							}
							else if (err && typeof err === 'object') {
								errorStatusCode = err.statusCode || err.status || 0;
								errorResponse = err.response || err;
							}
							else {
								errorStatusCode = 0;
								errorResponse = { message: String(err) };
							}
							reject({
								error: err,
								statusCode: errorStatusCode,
								response: errorResponse,
							});
						}
					}
					else {
						const statusCode = response?.statusCode || 200;
						resolve({ statusCode, response });
					}
				});
			}
			catch (error) {
				reject({
					error: error instanceof Error ? error.message : String(error),
					statusCode: 0,
					response: null,
				});
			}
		});
	}
	/**
	 * Masterpass AccountService.accountAccess'ı Promise-based hale getirir.
	 *
	 * Gerçek Masterpass SDK çağrısı yapar.
	 *
	 * @param params - AccountAccess parametreleri
	 * @returns Promise<{ statusCode: number; response: any }>
	 */
	async function masterpassAccountAccess(params) {
		const sdk = getMasterpassSdk();
		return new Promise((resolve, reject) => {
			try {
				sdk.accountService.accountAccess(params, (err, response) => {
					if (err) {
						// 401 (Unauthorized) response'u normal response olarak handle et (OTP gerekiyor)
						let errStatusCode;
						if (typeof err === 'number') {
							errStatusCode = err;
						}
						else if (err && typeof err === 'object') {
							errStatusCode = err.statusCode || err.response?.statusCode;
						}
						// 401 = ACTION_REQUIRED (OTP gerekiyor)
						if (errStatusCode === 401) {
							if (typeof err === 'number') {
								if (response) {
									resolve({
										statusCode: 401,
										response: response,
									});
								}
								else {
									const responseData = typeof err === 'object' && err !== null ? err : { statusCode: 401, result: null };
									resolve({
										statusCode: 401,
										response: responseData,
									});
								}
							}
							else {
								const responseData = response || err.response || err;
								resolve({
									statusCode: 401,
									response: responseData,
								});
							}
						}
						else {
							// Gerçek hata durumu
							let errorResponse = null;
							let errorStatusCode = 0;
							if (typeof err === 'number') {
								errorStatusCode = err;
								errorResponse = response || null;
							}
							else if (err && typeof err === 'object') {
								errorStatusCode = err.statusCode || err.status || 0;
								errorResponse = err.response || err;
							}
							else {
								errorStatusCode = 0;
								errorResponse = { message: String(err) };
							}
							reject({
								error: err,
								statusCode: errorStatusCode,
								response: errorResponse,
							});
						}
					}
					else {
						const statusCode = response?.statusCode || 200;
						resolve({ statusCode, response });
					}
				});
			}
			catch (error) {
				reject({
					error: error instanceof Error ? error.message : String(error),
					statusCode: 0,
					response: null,
				});
			}
		});
	}

	// Centralized SDK Messages - All messages in English
	const SDK_MESSAGES = {
		// SDK Initialization
		SDK_NOT_INITIALIZED: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before using this function.',
		ENVIRONMENT_NOT_RESOLVED: 'Environment not resolved. Make sure Init() was called successfully.',
		INVALID_TOKEN: 'Token is required and cannot be empty.',
		INVALID_TOKEN_FORMAT: 'Token must be in GUID format. Please provide a valid token.',
		// Session
		SESSION_NOT_STARTED: 'Session must be started first. Use PaywallJsSdk.InitPaywallSdk with includeMasterpassSession: true.',
		SESSION_NOT_CREATED: 'Masterpass session must be created before calling this operation. Use PaywallJsSdk.InitPaywallSdk with includeMasterpassSession: true.',
		MISSING_SESSION_ID: 'Session ID is missing. Use PaywallJsSdk.InitPaywallSdk with includeMasterpassSession: true to create a session.',
		MISSING_REFERENCE_CODE: 'referenceCode is required and cannot be empty. Please provide a valid reference code.',
		MISSING_USER_ID: 'userId is required and cannot be empty. Please provide a valid user ID.',
		MISSING_USER_PHONE: 'userPhone is required and cannot be empty. Please provide a valid phone number.',
		// Provider
		PROVIDER_NOT_INITIALIZED: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before this operation.',
		MISSING_TOKEN: 'MasterpassToken not found in session state. Make sure session was started successfully.',
		SDK_NOT_LOADED: 'Masterpass SDK not loaded.',
		API_MISMATCH: 'Masterpass SDK API mismatch: expected accountService.addCard.',
		BROWSER_REQUIRED: 'This operation requires browser environment. Please try in a browser.',
		// Card Operations - Validation
		MISSING_USER_ID_CARD: 'User ID is missing. Please provide a valid user ID.',
		MISSING_ACCOUNT_KEY: 'Account key (phone number or email) is missing. Please provide a phone number or email address.',
		MISSING_CARD_ALIAS: 'Card alias name is missing. Please provide a name for the card (e.g., "My Card").',
		MISSING_CARD_HOLDER_NAME: 'Card holder name is missing. Please provide the name on the card.',
		MISSING_CARD_NUMBER: 'Card number is missing. Please provide a 13-19 digit card number.',
		INVALID_CARD_NUMBER_FORMAT: (length) => `Card number format is invalid. Entered card number: ${length} digits. Please provide a 13-19 digit card number.`,
		MISSING_EXPIRY_DATE: 'Card expiry date is missing. Please provide in MMYY format (e.g., 1226).',
		INVALID_EXPIRY_DATE_FORMAT: (value) => `Card expiry date format is invalid. Entered value: "${value}". Please provide in MMYY format (e.g., 1226 - December 2026).`,
		MISSING_CVV: 'CVV code is missing. Please provide the 3 or 4 digit CVV code from the back of your card.',
		INVALID_CVV_FORMAT: (value) => `CVV code format is invalid. Entered value: "${value}". Please provide a 3 or 4 digit CVV code.`,
		MISSING_REQUEST_REFERENCE_NUMBER: 'Request reference number is missing. Please provide a unique reference number.',
		// Card Operations - Errors
		INVALID_ACCOUNT_KEY: 'Account key (phone number or email) is invalid. Please provide a valid phone number or email address.',
		CARD_ALREADY_EXISTS: 'This card is already registered. Please try adding a different card.',
		INVALID_CARD_NUMBER: 'Card number is invalid. Please check your 16-digit card number.',
		INVALID_CARD_INFO: 'Card information is invalid. Please check card number, expiry date, and CVV code.',
		INVALID_EXPIRY_DATE: 'Card expiry date is invalid. Please provide in MMYY format (e.g., 1226).',
		INVALID_CVV: 'CVV code is invalid. Please provide the 3-digit CVV code from the back of your card.',
		MISSING_FIELD: (field) => `Missing information: ${field}. Please fill in all required fields.`,
		ADD_CARD_FAILED: 'Card addition failed. Please check your information and try again.',
		ADD_CARD_FAILED_WITH_CODE: (code) => `Card addition failed. Error code: ${code}`,
		// Payment Operations - Validation
		MISSING_PAYMENT_DETAIL: 'Payment details are missing. Please provide amount, currencyId, merchantUniqueCode, trackingCode, successUrl, failUrl, and clientIp.',
		INVALID_AMOUNT: (amount) => `Payment amount is invalid. Entered value: ${amount}. Please provide an amount greater than 0.`,
		INVALID_CURRENCY_ID: (currencyId) => `Currency ID is invalid. Entered value: ${currencyId}. Please provide a valid currency ID (e.g., 949 TRY, 840 USD).`,
		MISSING_MERCHANT_UNIQUE_CODE: 'Merchant unique code is missing. Please provide a unique code for your merchant.',
		MISSING_TRACKING_CODE: 'Tracking code is missing. Please provide a unique tracking code for this payment.',
		MISSING_SUCCESS_URL: 'Success redirect URL is missing. Please provide the URL to redirect to when payment is successful.',
		MISSING_FAIL_URL: 'Fail redirect URL is missing. Please provide the URL to redirect to when payment fails.',
		MISSING_CLIENT_IP: 'Client IP address is missing. Please provide the customer\'s IP address.',
		MISSING_CARD_ALIAS_REGISTERED: 'Card alias is missing. Please provide a valid card alias for the registered card.',
		MISSING_CARD_NUMBER_MANUAL: 'Card number is missing. Please provide a 13-19 digit card number.',
		MISSING_EXPIRY_DATE_MANUAL: 'Card expiry date is missing. Please provide in MMYY format (e.g., 1226 - December 2026).',
		MISSING_CVV_MANUAL: 'CVV code is missing. Please provide a valid CVV code.',
		MISSING_OWNER_NAME: 'Card holder name is missing. Please provide the name on the card.',
		MISSING_MASTERPASS_REQUEST_BODY: 'Masterpass request body not found in Paywall response. Payment cannot be started. Please ensure your Paywall backend is working correctly.',
		// Payment Operations - Status
		PAYMENT_COMPLETED: 'Payment completed successfully.',
		PAYMENT_INIT_SUCCESS: 'Payment initialization completed successfully.',
		PAYMENT_INIT_FAILED: 'Payment initialization failed. Please check your information and try again.',
		PAYMENT_INIT_FAILED_WITH_ERROR: (error) => `Payment initialization failed: ${error}. Please check your information and try again.`,
		// Success Messages
		SESSION_CREATED_SUCCESS: 'Masterpass session created successfully.',
		CARD_ADDED_SUCCESS: 'Card added successfully.',
		SESSION_CREATION_FAILED: (error) => `Masterpass session creation failed: ${error}`,
		// Action Required
		BANK_OTP_REQUIRED: 'Bank OTP verification is required. Please enter the OTP code sent by your bank. OTP verification is handled by merchant backend.',
		MASTERPASS_OTP_REQUIRED: 'Masterpass OTP verification is required. Please enter the OTP code sent by Masterpass.',
		THREE_D_REQUIRED: '3D Secure verification is required. You will be redirected to the 3D Secure screen.',
		ACTION_REQUIRED: 'Action required.',
		// Action Hints
		ACTION_HINT_OTP_CARD: 'Please verify the OTP sent to your phone to complete card registration.',
		ACTION_HINT_3D_CARD: 'Please complete 3D Secure verification to continue.',
		ACTION_HINT_OTP_PAYMENT: 'Please verify the OTP sent to your phone to complete the payment.',
		ACTION_HINT_3D_PAYMENT: 'Please complete 3D Secure verification to continue.',
		ACTION_HINT_COMMIT_PAYMENT: 'Please commit the payment.',
		ACTION_HINT_START_SESSION: 'Please start a new session.',
		// General Errors
		UNKNOWN_ERROR: 'An unknown error occurred. Please try again.',
		OPERATION_FAILED: 'Operation failed. Please check your information and try again.',
		// Session Expiry
		SESSION_EXPIRED: 'Masterpass session not found or expired.',
		SESSION_EXPIRED_ACTION_HINT: 'Please start a new session.',
	};
	// Helper function to get messages with type safety
	function getMessage(key, ...args) {
		const message = SDK_MESSAGES[key];
		if (typeof message === 'function') {
			return message(...args);
		}
		return message;
	}

	// Masterpass Error Code Map - English error messages
	const MASTERPASS_ERROR_MAP = {
		"OTP_IS_NOT_VALID": {
			code: 4001,
			message: "OTP code is invalid. Please enter the correct OTP code."
		},
		"ACCOUNT_NOT_LINKED_TO_MERCHANT": {
			code: 4002,
			message: "Account is not linked to merchant. Please link your account to the merchant."
		},
		"USER_NOT_FOUND": {
			code: 4003,
			message: "User not found. Please provide valid user information."
		},
		"CARD_ALREADY_EXISTS": {
			code: 4004,
			message: SDK_MESSAGES.CARD_ALREADY_EXISTS
		},
		"MERCHANT_USER_ID_ALREADY_IN_USE": {
			code: 4005,
			message: "User ID is already in use. Please use a different user ID."
		},
		"FRAUD_DETECTED_DUE_TO_REPETITIVE_DELETION": {
			code: 4006,
			message: "Transaction rejected for security reasons. Repetitive deletion operations detected."
		},
		"INVALID_ACCOUNT_KEY_IN_TOKEN": {
			code: 4007,
			message: SDK_MESSAGES.INVALID_ACCOUNT_KEY
		},
		"INVALID_CARD_NUMBER": {
			code: 4008,
			message: SDK_MESSAGES.INVALID_CARD_NUMBER
		},
		"INVALID_EXPIRY_DATE": {
			code: 4009,
			message: SDK_MESSAGES.INVALID_EXPIRY_DATE
		},
		"INVALID_CVV": {
			code: 4010,
			message: SDK_MESSAGES.INVALID_CVV
		},
		"MISSING_CARD_ALIAS": {
			code: 4011,
			message: SDK_MESSAGES.MISSING_CARD_ALIAS
		},
		"MISSING_CARD_HOLDER_NAME": {
			code: 4012,
			message: SDK_MESSAGES.MISSING_CARD_HOLDER_NAME
		},
		"5008": {
			code: 5008,
			message: SDK_MESSAGES.BANK_OTP_REQUIRED
		},
		"5001": {
			code: 5001,
			message: SDK_MESSAGES.MASTERPASS_OTP_REQUIRED
		},
		"5010": {
			code: 5010,
			message: SDK_MESSAGES.THREE_D_REQUIRED
		}
	};

	/**
	 * Card Masking Utilities
	 *
	 * Kart numarasını güvenli bir şekilde maskeler.
	 * PCI-DSS uyumlu - tam kart numarası asla loglanmaz.
	 */
	/**
	 * Kart numarasını maskeler.
	 * Format: first6 + "******" + last4
	 * Örnek: "460345******1234"
	 */
	function maskCardNumber(cardNumber) {
		if (!cardNumber || cardNumber.length < 10) {
			return '******';
		}
		const first6 = cardNumber.slice(0, 6);
		const last4 = cardNumber.slice(-4);
		return `${first6}******${last4}`;
	}
	/**
	 * Kart numarasını yeni formatta maskeler (BIN****LAST4).
	 * Format: first8 + "****" + last4
	 * Örnek: "55287912****0008"
	 */
	function maskCardNumberNewFormat(cardNumber) {
		if (!cardNumber || cardNumber.length < 12) {
			return '****';
		}
		const first8 = cardNumber.slice(0, 8); // BIN (ilk 8 karakter)
		const last4 = cardNumber.slice(-4); // Son 4 karakter
		return `${first8}****${last4}`;
	}
	/**
	 * Kart numarasından first8 alır.
	 */
	function getFirst8(cardNumber) {
		if (!cardNumber || cardNumber.length < 8) {
			return '';
		}
		return cardNumber.slice(0, 8);
	}
	/**
	 * Kart numarasından last4 alır.
	 */
	function getLast4(cardNumber) {
		if (!cardNumber || cardNumber.length < 4) {
			return '';
		}
		return cardNumber.slice(-4);
	}
	/**
	 * Request payload'ını maskeler (debug log için).
	 * cardNumber, cvv gibi hassas alanları maskeler.
	 */
	function maskRequestPayload(payload) {
		const masked = { ...payload };
		if (masked.cardNumber) {
			masked.cardNumber = maskCardNumber(masked.cardNumber);
		}
		if (masked.cvv) {
			masked.cvv = '***';
		}
		if (masked.cvc) {
			masked.cvc = '***';
		}
		if (masked.expiryDate) {
			// Expiry date'i kısmen maskeler (sadece ay gösterilir, yıl maskelenir)
			masked.expiryDate = masked.expiryDate.length === 4
				? `${masked.expiryDate.slice(0, 2)}**`
				: '****';
		}
		return masked;
	}

	/**
	 * Masterpass SDK Availability Checker
	 *
	 * ⚠️ ÖNEMLİ: Masterpass SDK artık bundle içine gömülüdür.
	 * Runtime'da script yükleme YOK - bundle yüklendiğinde window.Masterpass otomatik mevcut olur.
	 *
	 * Bu fonksiyon sadece window.Masterpass'ın mevcut olup olmadığını kontrol eder.
	 */
	/**
	 * Masterpass SDK'nın mevcut olup olmadığını kontrol eder.
	 *
	 * ⚠️ NOT: Bu fonksiyon script yüklemez, sadece kontrol eder.
	 * Masterpass SDK bundle içine gömülüdür ve bundle yüklendiğinde otomatik olarak mevcut olur.
	 *
	 * @returns Promise<void> - window.Masterpass mevcutsa resolve olur
	 * @throws Error - window.Masterpass mevcut değilse
	 */
	function loadMasterpassSdk() {
		// Browser environment kontrolü
		if (typeof window === 'undefined') {
			return Promise.reject(new Error('Masterpass SDK requires browser environment'));
		}
		// window.Masterpass bundle içinden gelir, kontrol et
		if (window.Masterpass) {
			return Promise.resolve();
		}
		// window.Masterpass yoksa - bu bundle'ın düzgün yüklenmediği anlamına gelir
		return Promise.reject(new Error('Masterpass SDK not found in bundle. Make sure you are using the latest Paywall JS SDK build.'));
	}

	/**
	 * Masterpass SDK initializer.
	 */
	/**
	 * Initializes Masterpass SDK.
	 * @throws Error if window.Masterpass is not available, token or merchantId is missing, or API mismatch
	 */
	async function ensureMasterpassInitialized() {
		// Browser environment kontrolü (en başta)
		if (typeof window === 'undefined') {
			throw new Error('Masterpass SDK initialization requires browser environment');
		}
		// Flag kontrolü - eğer flag true ise, gerçek durumu da kontrol et
		if (isMasterpassInitialized()) {
			// Flag true ama gerçek durumu kontrol et
			const Masterpass = window.Masterpass;
			if (Masterpass && typeof Masterpass.setEndpoint === 'function') {
				return;
			}
			else {
				// Flag true ama Masterpass SDK gerçekten yüklenmemiş - flag'i sıfırla ve devam et
				setMasterpassInitialized(false);
			}
		}
		await loadMasterpassSdk();
		// 2. window.Masterpass kontrolü
		const Masterpass = window.Masterpass;
		if (!Masterpass) {
			throw new Error('Masterpass SDK not loaded.');
		}
		// 3. Token ve MerchantId'yi internal state'ten al
		const token = getMasterpassToken();
		const merchantId = getMasterpassMerchantId();
		// 4. Environment'a göre endpoint belirle
		const envConfig = getResolvedEnvironmentConfig();
		if (!envConfig) {
			throw new Error('Environment not resolved. Make sure Init() was called successfully.');
		}
		let endpoint;
		if (envConfig.environment === 'prod') {
			endpoint = 'https://mp-sdk.masterpassturkiye.com';
		}
		else {
			// dev veya test
			endpoint = 'https://mp-test-sdk.masterpassturkiye.com';
		}
		// 5. Masterpass SDK API kontrolü
		if (typeof Masterpass.setEndpoint !== 'function') {
			throw new Error('Masterpass SDK API mismatch: expected setEndpoint/setToken/setMerchantId.');
		}
		if (typeof Masterpass.setToken !== 'function') {
			throw new Error('Masterpass SDK API mismatch: expected setEndpoint/setToken/setMerchantId.');
		}
		if (typeof Masterpass.setMerchantId !== 'function') {
			throw new Error('Masterpass SDK API mismatch: expected setEndpoint/setToken/setMerchantId.');
		}
		// 6. Masterpass SDK'yı initialize et
		Masterpass.setEndpoint(endpoint);
		Masterpass.setToken(token);
		Masterpass.setMerchantId(merchantId);
		// 7. Initialized flag'ini set et (SADECE burada, yukarıdaki adımlar başarılı olduktan sonra)
		setMasterpassInitialized(true);
	}

	/**
	 * Debug Logger Utility
	 *
	 * Structured debug logging for SDK flow tracking.
	 * Only logs when logLevel === 'debug'.
	 */
	/**
	 * Creates a structured debug log entry.
	 * Only logs when logLevel === 'debug'.
	 *
	 * @param config - SDK config (for logLevel check)
	 * @param entry - Debug log entry
	 */
	function logDebugFlow(config, entry) {
		if (config.logLevel !== 'debug') {
			return;
		}
		const fullEntry = {
			...entry,
			timestamp: new Date().toISOString(),
		};
		// Mask sensitive data (cardNumber, cvv, token, etc.)
		maskSensitiveData(fullEntry);
	}
	/**
	 * Masks sensitive data in debug logs.
	 */
	function maskSensitiveData(entry) {
		const masked = { ...entry };
		// Mask requestPayload
		if (masked.requestPayload) {
			masked.requestPayload = maskObject(masked.requestPayload);
		}
		// Mask rawProviderResponse
		if (masked.rawProviderResponse) {
			masked.rawProviderResponse = maskObject(masked.rawProviderResponse);
		}
		// Mask normalizedSdkResponse
		if (masked.normalizedSdkResponse) {
			masked.normalizedSdkResponse = maskObject(masked.normalizedSdkResponse);
		}
		return masked;
	}
	/**
	 * Masks sensitive fields in an object.
	 */
	function maskObject(obj) {
		if (!obj || typeof obj !== 'object') {
			return obj;
		}
		const sensitiveFields = [
			'cardNumber',
			'cvv',
			'cvc',
			'token',
			'masterpassToken',
			'accessToken',
			'authorization',
			'password',
			'pin',
		];
		const masked = Array.isArray(obj) ? [...obj] : { ...obj };
		for (const key in masked) {
			if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
				if (typeof masked[key] === 'string' && masked[key].length > 0) {
					masked[key] = '***MASKED***';
				}
			}
			else if (typeof masked[key] === 'object' && masked[key] !== null) {
				masked[key] = maskObject(masked[key]);
			}
		}
		return masked;
	}

	/**
	 * Validation Utilities for Paywall JS SDK
	 * Provides validation functions for session, headers, card data, payment details, etc.
	 */
	/**
	 * Validates card alias (required when saving card to Masterpass)
	 */
	function validateCardAlias(alias, isSaveCardEnabled) {
		if (!alias || alias.trim() === '') {
			return {
				valid: false,
				errorCode: 'ALIAS_REQUIRED',
				field: 'cardAlias',
				message: 'Card alias must be filled to save card.',
			};
		}
		return { valid: true };
	}
	/**
	 * Creates a failed response from validation result
	 */
	function createValidationFailedResponse(validationResult, source = 'SDK') {
		return createFailedResponse(source, validationResult.message || 'Validation failed.', validationResult.errorCode, undefined, validationResult.field ? { field: validationResult.field } : undefined);
	}

	// Ödeme durumu enum'u
	exports.PaymentState = void 0;
	(function (PaymentState) {
		PaymentState["CREATED"] = "CREATED";
		PaymentState["STARTED"] = "STARTED";
		PaymentState["SUCCESS"] = "SUCCESS";
		PaymentState["FAILED"] = "FAILED";
	})(exports.PaymentState || (exports.PaymentState = {}));
	// Ödeme akış tipi enum'u
	exports.PaymentFlowType = void 0;
	(function (PaymentFlowType) {
		PaymentFlowType["NON_SECURE"] = "NON_SECURE";
		PaymentFlowType["THREE_D_SECURE"] = "THREE_D_SECURE";
	})(exports.PaymentFlowType || (exports.PaymentFlowType = {}));
	function mapMasterpassError(response) {
		const code = response?.exception?.code ||
			response?.result?.responseCode ||
			response?.responseCode ||
			response?.statusCode;
		if (!code) {
			return null;
		}
		const codeString = String(code);
		if (codeString === '5001' || codeString === '5010') {
			return null;
		}
		if (MASTERPASS_ERROR_MAP[codeString]) {
			return MASTERPASS_ERROR_MAP[codeString];
		}
		if (response?.exception?.code) {
			const exceptionCodeString = String(response.exception.code);
			if (exceptionCodeString === '5001' || exceptionCodeString === '5010') {
				return null;
			}
			if (MASTERPASS_ERROR_MAP[exceptionCodeString]) {
				return MASTERPASS_ERROR_MAP[exceptionCodeString];
			}
		}
		if (response?.exception?.message) {
			const exceptionMsg = String(response.exception.message).toUpperCase();
			for (const [key, value] of Object.entries(MASTERPASS_ERROR_MAP)) {
				if (key === '5001' || key === '5010') {
					continue;
				}
				if (exceptionMsg.includes(key)) {
					return value;
				}
			}
		}
		return null;
	}
	/**
	 * Ödeme kaynağı enum'u.
	 * UI'dan gelen payment source bilgisine göre belirlenir.
	 */
	exports.PaymentSource = void 0;
	(function (PaymentSource) {
		/**
		 * Kayıtlı kart ile ödeme.
		 * cardAlias dolu, cardNumber Masterpass alias/token formatı.
		 */
		PaymentSource["REGISTERED_CARD"] = "REGISTERED_CARD";
		/**
		 * Manuel kart ile ödeme.
		 * cardAlias boş, cardNumber gerçek PAN.
		 */
		PaymentSource["MANUAL_CARD"] = "MANUAL_CARD";
	})(exports.PaymentSource || (exports.PaymentSource = {}));
	/**
	 * Payment type enum'u.
	 * mark-as-started çağrısında kullanılır.
	 */
	exports.PaymentType = void 0;
	(function (PaymentType) {
		/**
		 * Non-Secure ödeme (3D Secure gerektirmez).
		 */
		PaymentType[PaymentType["NonSecure"] = 1] = "NonSecure";
		/**
		 * 3D Secure ödeme.
		 */
		PaymentType[PaymentType["ThreeDSecure"] = 2] = "ThreeDSecure";
		/**
		 * OTP ödeme.
		 */
		PaymentType[PaymentType["Otp"] = 3] = "Otp";
	})(exports.PaymentType || (exports.PaymentType = {}));
	function getPlainCardForMasterpass(cardData) {
		const cardNumberPlain = (cardData.cardNumber ?? '').toString().replace(/\s/g, '');
		let cvvPlain = '';
		if (cardData.cvv != null && String(cardData.cvv).trim().length > 0) {
			cvvPlain = String(cardData.cvv).trim();
		}
		else if (cardData.cvc != null && String(cardData.cvc).trim().length > 0) {
			cvvPlain = String(cardData.cvc).trim();
		}
		const expiry = (cardData.expiryDate ?? '').toString().replace(/\s/g, '');
		const expiryYYMM = expiry.length >= 4 ? `${expiry.substring(2, 4)}${expiry.substring(0, 2)}` : '';
		const cardHolderNamePlain = (cardData.cardHolderName ?? cardData.ownerName ?? '').toString().trim();
		const cardAliasPlain = (cardData.cardAlias ?? '').toString().trim();
		return {
			cardNumberPlain,
			cvvPlain,
			expiryYYMM,
			cardHolderNamePlain,
			cardAliasPlain,
		};
	}
	/**
	 * Payload içinde placeholder string'leri plain değerlerle değiştirir.
	 * DEFENSIVE: undefined/null alanlarda replace veya string işlemi ASLA yapılmaz.
	 */
	function replacePlaceholdersInPayload(obj, replacements) {
		if (obj == null)
			return;
		if (Array.isArray(obj)) {
			for (let i = 0; i < obj.length; i++) {
				const v = obj[i];
				if (v == null)
					continue;
				if (typeof v === 'string' && replacements[v] !== undefined) {
					obj[i] = replacements[v];
				}
				else if (typeof v === 'object') {
					replacePlaceholdersInPayload(v, replacements);
				}
			}
			return;
		}
		if (typeof obj === 'object') {
			for (const key of Object.keys(obj)) {
				const v = obj[key];
				if (v == null)
					continue;
				if (typeof v === 'string' && replacements[v] !== undefined) {
					obj[key] = replacements[v];
				}
				else if (typeof v === 'object') {
					replacePlaceholdersInPayload(v, replacements);
				}
			}
		}
	}
	/**
	 * Masterpass ödeme request builder.
	 * KRİTİK: SDK içinde cardNumber / cvv / expiryDate ASLA şifrelenmez.
	 * Şifreleme SADECE Masterpass / VPOS tarafında yapılır.
	 * Body formatı: { cardNumber: "PLAIN", cvv: "123", expiryDate: "YYMM" } (plain string).
	 */
	function buildMasterpassPayload(masterpassRequestBody, cardData, paymentSource, metadata) {
		const payload = JSON.parse(JSON.stringify(masterpassRequestBody));
		if (metadata) {
			if (metadata.paymentId)
				payload.paymentId = metadata.paymentId;
			if (metadata.masterpassPaymentId)
				payload.masterpassPaymentId = metadata.masterpassPaymentId;
			if (metadata.activityId)
				payload.activityId = metadata.activityId;
			if (metadata.uniqueCode)
				payload.uniqueCode = metadata.uniqueCode;
		}
		const plain = getPlainCardForMasterpass(cardData);
		const securityCodePlain = plain.cvvPlain;
		payload.cvv = securityCodePlain;
		payload.cvc = securityCodePlain;
		if (paymentSource === exports.PaymentSource.REGISTERED_CARD) {
			if (plain.cardAliasPlain)
				payload.cardAlias = plain.cardAliasPlain;
			if (plain.cardNumberPlain)
				payload.cardNumber = plain.cardNumberPlain;
			if (plain.cardHolderNamePlain)
				payload.cardHolderName = plain.cardHolderNamePlain;
		}
		if (paymentSource === exports.PaymentSource.MANUAL_CARD) {
			if (plain.cardNumberPlain)
				payload.cardNumber = plain.cardNumberPlain;
			if (plain.expiryYYMM)
				payload.expiryDate = plain.expiryYYMM;
			if (plain.cardHolderNamePlain)
				payload.cardHolderName = plain.cardHolderNamePlain;
			if (payload.cardAlias)
				delete payload.cardAlias;
		}
		const session = getMasterpassSession();
		if (session?.masterpassTerminalGroupId) {
			payload.terminalGroupId = session.masterpassTerminalGroupId;
		}
		const replacements = {};
		replacements['%CVV_REPLACE%'] = securityCodePlain;
		if (plain.cardNumberPlain)
			replacements['%CARD_NUMBER_REPLACE%'] = plain.cardNumberPlain;
		if (plain.expiryYYMM)
			replacements['%EXPIRY_DATE_REPLACE%'] = plain.expiryYYMM;
		if (plain.cardHolderNamePlain)
			replacements['%CARD_HOLDER_NAME_REPLACE%'] = plain.cardHolderNamePlain;
		if (plain.cardAliasPlain)
			replacements['%CARD_ALIAS_REPLACE%'] = plain.cardAliasPlain;
		replacePlaceholdersInPayload(payload, replacements);
		return payload;
	}
	/**
	 * Paywall backend'e mark-as-started çağrısı yapar.
	 *
	 * **Lifecycle:**
	 * - Bu fonksiyon Masterpass SDK çağrısı başarıyla response döndüğü anda çağrılır
	 * - Payment state'i Paywall backend'de "started" olarak işaretlenir
	 * - Backend ödeme lifecycle'ını takip edebilir
	 *
	 * **Neden Gereklidir:**
	 * - Paywall backend ödeme durumunu takip eder
	 * - Webhook ve polling mekanizmaları için gerekli
	 * - Final state belirleme için backend'e bilgi sağlar
	 *
	 * **Endpoint:**
	 * POST /api/paywall/masterpass/by/sdk/payment/mark-as-started
	 *
	 * **Header:**
	 * Authorization: Bearer {tempToken}
	 *
	 * **Body:**
	 * - MasterpassPaymentId: Masterpass payment ID
	 * - PaymentType: NonSecure:1, 3D:2, Otp:3
	 * - ThreeDAddress: 3D Secure URL (varsa)
	 * - MasterpassOrderId: Masterpass order ID (varsa)
	 *
	 * @param params - Mark-as-started parametreleri
	 * @param tempToken - TempToken (merchant backend'den gelen)
	 * @returns Promise<void>
	 */
	/**
	 * Paywall backend'e mark-as-started çağrısı yapar.
	 *
	 * **LIFECYCLE:**
	 * - Bu fonksiyon Masterpass SDK çağrısı başarıyla response döndüğü anda çağrılır
	 * - Payment state'i Paywall backend'de "started" olarak işaretlenir
	 * - Backend ödeme lifecycle'ını takip edebilir
	 *
	 * **TOKEN MANTIĞI:**
	 * - Token config.accessToken'dan otomatik alınır
	 * - SDK token üretmez, refresh etmez
	 *
	 * **NEDEN GEREKLİDİR:**
	 * - Paywall backend ödeme durumunu takip eder
	 * - Webhook ve polling mekanizmaları için gerekli
	 * - Final state belirleme için backend'e bilgi sağlar
	 *
	 * **ENDPOINT:**
	 * POST /api/paywall/masterpass/by/sdk/payment/mark-as-started
	 *
	 * **HEADER:**
	 * Authorization: Bearer {accessToken} (config'den otomatik)
	 * Content-Type: application/json
	 *
	 * **BODY:**
	 * - MasterpassPaymentId: Masterpass payment ID
	 * - PaymentType: NonSecure:1, 3D:2, Otp:3
	 * - ThreeDAddress: 3D Secure URL (varsa)
	 * - MasterpassOrderId: Masterpass order ID (varsa)
	 *
	 * @param params - Mark-as-started parametreleri
	 * @returns Promise<void>
	 */
	/**
	 * Payment mark endpoint'ine istek atar.
	 *
	 * **Endpoint:** POST /api/paywall/masterpass/by/sdk/payment/mark
	 *
	 * **Request Body:**
	 * - MasterpassPaymentId: Masterpass payment ID (optional)
	 * - PaymentType: 1 (NonSecure) | 2 (3D) | 3 (Otp)
	 * - PaymentStatus: 1 (Started) | 2 (Unsuccessful)
	 * - ThreeDAddress: 3D Secure URL (optional)
	 * - MasterpassOrderId: Masterpass order ID (optional)
	 * - ErrorCode: Masterpass error code (optional)
	 * - ErrorMessage: Masterpass error message (optional)
	 * - Response: Masterpass response'unun stringify edilmiş hali
	 *
	 * **PaymentStatus Mantığı:**
	 * - 1 (Started): Akış devam ediyor (SUCCESS veya ACTION_REQUIRED)
	 * - 2 (Unsuccessful): Masterpass'den işlem başarısız oldu (FAILED)
	 */
	async function markAsStarted(params) {
		getConfig();
		try {
			const envConfig = getResolvedEnvironmentConfig();
			if (!envConfig) {
				throw new Error('Environment not resolved. Make sure Init() was called successfully.');
			}
			let errorCode;
			let errorMessage;
			let masterpassPaymentToken;
			let actualResponseCode = params.responseCode;
			if (params.masterpassResponse) {
				const mpResponse = params.masterpassResponse.response || params.masterpassResponse;
				const mpResult = mpResponse?.result || mpResponse;
				if (!actualResponseCode) {
					actualResponseCode = mpResponse?.result?.responseCode
						|| mpResult?.responseCode
						|| mpResponse?.responseCode;
				}
				// Öncelik sırası: mpResult.token > mpResponse.token > params.masterpassResponse.response.token
				masterpassPaymentToken = mpResult?.token
					|| mpResponse?.token
					|| params.masterpassResponse.response?.token
					|| undefined;
				if (params.paymentStatus === 'FAILED') {
					errorCode = mpResult?.responseCode
						|| mpResponse?.responseCode
						|| mpResponse?.statusCode?.toString()
						|| 'UNKNOWN';
				}
				if (params.paymentStatus === 'FAILED') {
					errorMessage = mpResult?.description
						|| mpResponse?.description
						|| mpResult?.message
						|| mpResponse?.message
						|| 'Masterpass payment failed';
				}
			}
			let paymentStatusValue;
			if (params.paymentStatus === 'FAILED') {
				paymentStatusValue = 2;
			}
			else if (params.paymentStatus === 'SUCCESS' && actualResponseCode === '0000') {
				paymentStatusValue = 3;
			}
			else {
				paymentStatusValue = 1;
			}
			let responseString;
			if (params.masterpassResponse) {
				try {
					responseString = JSON.stringify(params.masterpassResponse.response || params.masterpassResponse);
				}
				catch (stringifyError) {
				}
			}
			const requestBody = {
				...(params.masterpassPaymentId && { MasterpassPaymentId: params.masterpassPaymentId }),
				PaymentType: params.paymentType,
				PaymentStatus: paymentStatusValue,
				...(masterpassPaymentToken && { MasterpassPaymentToken: masterpassPaymentToken }),
				...(params.threeDAddress && { ThreeDAddress: params.threeDAddress }),
				...(params.masterpassOrderId && { MasterpassOrderId: params.masterpassOrderId }),
				...(errorCode && { ErrorCode: errorCode }),
				...(errorMessage && { ErrorMessage: errorMessage }),
				...(responseString && { Response: responseString }),
			};
			const markUrl = `${envConfig.paymentApiBaseUrl}/api/paywall/masterpass/by/sdk/payment/mark`;
			await httpPost(markUrl, requestBody);
		}
		catch (error) {
			error instanceof Error ? error.message : String(error);
		}
	}
	/**
	 * Masterpass SDK'yı çağırır.
	 * Payment source'a göre doğru Masterpass SDK fonksiyonunu kullanır.
	 *
	 * **Lifecycle:**
	 * - Bu fonksiyon buildMasterpassPayload() sonrası çağrılır
	 * - Paywall masterpass payment/init yapılmış olmalı
	 * - MasterpassRequestBody alınmış ve replace edilmiş olmalı
	 *
	 * **Masterpass SDK Fonksiyonları:**
	 * - REGISTERED_CARD: Masterpass.payWithRegisteredCard() kullanılır
	 *   → Kayıtlı kart ile ödeme için optimize edilmiş fonksiyon
	 *   → cardAlias ve cardNumber (Masterpass alias/token) kullanılır
	 *
	 * - MANUAL_CARD: Masterpass.startPayment() kullanılır
	 *   → Yeni kart ile ödeme için optimize edilmiş fonksiyon
	 *   → Gerçek PAN, expiryDate ve cvv kullanılır
	 *
	 * **PCI-DSS UYUM:**
	 * - Kart bilgileri sadece Masterpass SDK'ya iletilir
	 * - Paywall'a geri gönderilmez
	 * - SDK state'inde tutulmaz
	 *
	 * @param payload - Replace edilmiş Masterpass payload
	 * @param paymentSource - Payment source (REGISTERED_CARD veya MANUAL_CARD)
	 * @returns Masterpass SDK response
	 */
	async function callMasterpassSdk(payload, paymentSource) {
		// SDK lifecycle guard
		assertSdkInitialized();
		if (typeof window === 'undefined') {
			throw new Error('Masterpass SDK requires browser environment');
		}
		const session = getMasterpassSession();
		if (!session || !session.masterpassToken) {
			throw new Error('Masterpass not initialized. Create session first.');
		}
		if (!isMasterpassInitialized()) {
			await ensureMasterpassInitialized();
		}
		const Masterpass = window.Masterpass;
		if (!Masterpass) {
			throw new Error('Masterpass not initialized. Create session first.');
		}
		if (paymentSource === exports.PaymentSource.REGISTERED_CARD) {
			return await masterpassPayment(payload);
		}
		else if (paymentSource === exports.PaymentSource.MANUAL_CARD) {
			return await masterpassDirectPayment(payload);
		}
		else {
			throw new Error(`Invalid payment source: ${paymentSource}`);
		}
	}
	// Payment init işlemi (POST /api/paywall/masterpass/by/sdk/payment/init)
	async function initPayment(params) {
		// SDK lifecycle guard - EN BAŞTA kontrol
		assertSdkInitialized();
		if (!isSessionValid()) {
			return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.SESSION_EXPIRED_ACTION_HINT });
		}
		const session = getMasterpassSession();
		if (!session || !session.masterpassToken) {
			return createFailedResponse('SDK', 'Masterpass session is invalid. MasterpassToken is missing. Please create a new session.', 'INVALID_SESSION');
		}
		if (!isMasterpassInitialized()) {
			await ensureMasterpassInitialized();
		}
		if (typeof window !== 'undefined') {
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', 'Masterpass SDK is not loaded. Please ensure Masterpass SDK is properly initialized.', 'SDK_NOT_LOADED');
			}
		}
		if (!params.sessionId || params.sessionId.trim() === '') {
			return createFailedResponse('SDK', SDK_MESSAGES.MISSING_SESSION_ID, 'MISSING_SESSION_ID');
		}
		const config = getConfig();
		try {
			const envConfig = getResolvedEnvironmentConfig();
			if (!envConfig) {
				throw new Error('Environment not resolved. Make sure Init() was called successfully.');
			}
			if (!params.paymentDetail) {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_PAYMENT_DETAIL, 'MISSING_PAYMENT_DETAIL');
			}
			if (!params.paymentDetail.amount || params.paymentDetail.amount <= 0) {
				return createFailedResponse('SDK', getMessage('INVALID_AMOUNT', params.paymentDetail.amount), 'INVALID_AMOUNT');
			}
			if (!params.paymentDetail.currencyId || params.paymentDetail.currencyId <= 0) {
				return createFailedResponse('SDK', getMessage('INVALID_CURRENCY_ID', params.paymentDetail.currencyId), 'INVALID_CURRENCY_ID');
			}
			if (!params.paymentDetail.merchantUniqueCode || params.paymentDetail.merchantUniqueCode.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_MERCHANT_UNIQUE_CODE, 'MISSING_MERCHANT_UNIQUE_CODE');
			}
			if (!params.paymentDetail.trackingCode || params.paymentDetail.trackingCode.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TRACKING_CODE, 'MISSING_TRACKING_CODE');
			}
			if (!params.paymentDetail.successUrl || params.paymentDetail.successUrl.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_SUCCESS_URL, 'MISSING_SUCCESS_URL');
			}
			if (!params.paymentDetail.failUrl || params.paymentDetail.failUrl.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_FAIL_URL, 'MISSING_FAIL_URL');
			}
			if (!params.paymentDetail.clientIp || params.paymentDetail.clientIp.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CLIENT_IP, 'MISSING_CLIENT_IP');
			}
			const card = params.card ?? {};
			const cardData = params.cardData ?? {};
			if (params.saveCard === true && params.paymentSource === exports.PaymentSource.MANUAL_CARD) {
				const aliasValidation = validateCardAlias(cardData.cardAlias || card.cardAlias, true);
				if (!aliasValidation.valid) {
					return createValidationFailedResponse(aliasValidation, 'SDK');
				}
			}
			if (params.paymentSource === exports.PaymentSource.REGISTERED_CARD) {
				if (!cardData.cardAlias && !card.cardAlias) {
					return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CARD_ALIAS_REGISTERED, 'MISSING_CARD_ALIAS', undefined, { field: 'cardAlias' });
				}
			}
			else if (params.paymentSource === exports.PaymentSource.MANUAL_CARD) {
				if (!cardData.cardNumber || cardData.cardNumber.trim() === '') {
					return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CARD_NUMBER_MANUAL, 'MISSING_CARD_NUMBER');
				}
				const cardNumberClean = (cardData.cardNumber ?? '').replace(/\s/g, '');
				if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
					return createFailedResponse('SDK', getMessage('INVALID_CARD_NUMBER_FORMAT', cardNumberClean.length), 'INVALID_CARD_NUMBER_FORMAT');
				}
				if (!cardData.expiryDate || cardData.expiryDate.trim() === '') {
					return createFailedResponse('SDK', SDK_MESSAGES.MISSING_EXPIRY_DATE_MANUAL, 'MISSING_EXPIRY_DATE');
				}
				if (!/^\d{4}$/.test(cardData.expiryDate)) {
					return createFailedResponse('SDK', getMessage('INVALID_EXPIRY_DATE_FORMAT', cardData.expiryDate), 'INVALID_EXPIRY_DATE_FORMAT');
				}
				if (!cardData.cvv || cardData.cvv.trim() === '') {
					return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CVV_MANUAL, 'MISSING_CVV');
				}
				if (!/^\d{3,4}$/.test(cardData.cvv)) {
					return createFailedResponse('SDK', getMessage('INVALID_CVV_FORMAT', cardData.cvv), 'INVALID_CVV_FORMAT');
				}
				const ownerNameCheck = cardData.cardHolderName || cardData.ownerName || card.ownerName;
				if (!ownerNameCheck || ownerNameCheck.trim() === '') {
					return createFailedResponse('SDK', SDK_MESSAGES.MISSING_OWNER_NAME, 'MISSING_OWNER_NAME');
				}
			}
			let cardBin;
			if (cardData.cardNumber && cardData.cardNumber.length >= 6) {
				cardBin = cardData.cardNumber.substring(0, 6);
			}
			else if (card.cardBin) {
				cardBin = card.cardBin;
			}
			let cardMasked;
			if (cardData.cardNumber && cardData.cardNumber.length >= 10) {
				const first6 = cardData.cardNumber.substring(0, 6);
				const last4 = cardData.cardNumber.substring(cardData.cardNumber.length - 4);
				cardMasked = `${first6}******${last4}`;
			}
			else if (card.cardMasked) {
				cardMasked = card.cardMasked;
			}
			let ownerName;
			if (params.paymentSource === exports.PaymentSource.MANUAL_CARD) {
				ownerName = cardData.cardHolderName || cardData.ownerName || card.ownerName;
			}
			else {
				ownerName = cardData.cardHolderName || cardData.ownerName || card.ownerName;
				if (!ownerName && (cardData.cardAlias || card.cardAlias)) {
					ownerName = cardData.cardAlias || card.cardAlias;
				}
			}
			const isSavedCard = params.paymentSource === exports.PaymentSource.REGISTERED_CARD;
			const requestBody = {
				SessionId: params.sessionId,
				Force3D: params.force3D ?? false,
				PaymentDetail: {
					Amount: params.paymentDetail.amount,
					CurrencyId: params.paymentDetail.currencyId,
					MerchantUniqueCode: params.paymentDetail.merchantUniqueCode,
					TrackingCode: params.paymentDetail.trackingCode,
					MerchantSuccessBackUrl: params.paymentDetail.successUrl,
					MerchantFailBackUrl: params.paymentDetail.failUrl,
					ClientIP: params.paymentDetail.clientIp,
					Installment: params.paymentDetail.installment,
					ChannelId: params.paymentDetail.channelId ?? 0,
					TagId: params.paymentDetail.tagId ?? 0,
				},
				Card: {
					IsSavedCard: isSavedCard,
					...(cardBin && { CardBin: cardBin }),
					...(cardMasked && { CardMasked: cardMasked }),
					...(ownerName && { OwnerName: ownerName }),
					...(card.cardAlias && { CardAlias: card.cardAlias }),
				},
				...(params.customer && { Customer: params.customer }),
				Products: params.products,
			};
			const initUrl = `${envConfig.paymentApiBaseUrl}/api/paywall/masterpass/by/sdk/payment/init`;
			logDebugFlow(config, {
				functionName: 'initPayment',
				stepName: 'paywall-init-request',
				requestPayload: requestBody,
			});
			const response = await httpPost(initUrl, requestBody);
			const responseData = response.data || response;
			const body = responseData.Body || responseData.body || responseData;
			if (responseData.Result !== true) {
				const errorMessage = responseData.Message || responseData.message || 'Paywall payment init failed';
				return createFailedResponse('PAYWALL', errorMessage, responseData.ErrorCode?.toString() || 'PAYWALL_INIT_FAILED', {
					httpStatus: response.status || 200,
					responseCode: responseData.ErrorCode?.toString() || 'PAYWALL_INIT_FAILED',
					raw: responseData,
				});
			}
			logDebugFlow(config, {
				functionName: 'initPayment',
				stepName: 'paywall-init-response',
				rawProviderResponse: responseData,
			});
			if (body.Session && body.Session.SessionRenewed === true && body.Session.SessionId) {
				const currentSession = getMasterpassSession();
				if (currentSession) {
					setMasterpassSession({
						...currentSession,
						sessionId: body.Session.SessionId,
					});
				}
			}
			const paywallMetadata = body.Masterpass?.Paywall;
			const paymentId = paywallMetadata?.PaymentId;
			const masterpassPaymentId = paywallMetadata?.MasterpassPaymentId;
			const activityId = paywallMetadata?.ActivityId;
			const uniqueCode = paywallMetadata?.UniqueCode;
			const merchantUniqueCode = paywallMetadata?.MerchantUniqueKey; // MerchantUniqueKey → merchantUniqueCode
			const masterpassReturnQueryString = paywallMetadata?.MasterpassReturnQueryString;
			const masterpassRequestBody = body.Masterpass?.MasterpassRequestBody || null;
			if (!masterpassRequestBody) {
				return createFailedResponse('PAYWALL', SDK_MESSAGES.MISSING_MASTERPASS_REQUEST_BODY, 'MISSING_MASTERPASS_REQUEST_BODY');
			}
			const paymentInitData = {
				masterpassRequestBody,
			};
			if (paymentId !== undefined) {
				paymentInitData.paymentId = paymentId;
			}
			if (masterpassPaymentId !== undefined) {
				paymentInitData.masterpassPaymentId = masterpassPaymentId;
			}
			if (activityId !== undefined) {
				paymentInitData.activityId = activityId;
			}
			if (uniqueCode !== undefined) {
				paymentInitData.uniqueCode = uniqueCode;
			}
			if (merchantUniqueCode !== undefined) {
				paymentInitData.merchantUniqueCode = merchantUniqueCode;
			}
			setMasterpassPaymentInit(paymentInitData);
			//
			//
			// - Kart bilgileri (cardNumber, cvv, expiryDate) ASLA Paywall'a geri gönderilmez
			// - SDK state'inde, loglarda veya storage'da tutulmaz
			// - Sadece local function scope içinde yaşar ve Masterpass SDK'ya iletilir
			//
			// - SDK 3D callback dinlemez
			// - redirectUrl / htmlContent merchant'a döndürülür
			// - SDK iframe, popup veya redirect açmaz
			// - Merchant UI bu URL'i kendisi açar
			// - 3D sonucu Paywall backend tarafından finalize edilir
			//
			// - SDK SUCCESS / FAIL kararını tek başına vermez
			// - Final state Paywall backend tarafından belirlenir
			// - Önerilen yöntem: Webhook → Merchant Backend
			// - Status endpoint yok, webhook kullanılmalı
			// Masterpass SDK ödeme başlatmak için bu payload'a ihtiyaç duyar
			// Bu payload Masterpass SDK'nın beklediği formatta olmalı
			//
			// KULLANICI SENARYOSU:
			// - Paywall init başarılı → MasterpassRequestBody alındı
			// - SDK otomatik olarak Masterpass.paymentService.directPayment() veya payment() çağırır
			// - MasterpassRequestBody payload'a kart bilgileri eklenerek Masterpass SDK'ya gönderilir
			let mpResult = null;
			let paymentType;
			let paymentStatus;
			let actionType;
			let threeDAddress;
			let masterpassOrderId;
			let description;
			let otpToken;
			let nextActionHint;
			let masterpassResponse;
			let responseCode = '';
			if (paymentInitData.masterpassRequestBody && typeof window !== 'undefined') {
				try {
					if (!params.paymentSource) {
						throw new Error('Payment source is required. Must be REGISTERED_CARD or MANUAL_CARD.');
					}
					if (params.paymentSource === exports.PaymentSource.REGISTERED_CARD) {
						if (!params.cardData.cardAlias && !params.cardData.cardNumber) {
							throw new Error('cardAlias or cardNumber is required for REGISTERED_CARD payment source.');
						}
					}
					else if (params.paymentSource === exports.PaymentSource.MANUAL_CARD) {
						if (!params.cardData.cardNumber) {
							throw new Error('cardNumber is required for MANUAL_CARD payment source.');
						}
						if (!params.cardData.expiryDate) {
							throw new Error('expiryDate is required for MANUAL_CARD payment source.');
						}
						if (!params.cardData.cvv) {
							throw new Error('cvv is required for MANUAL_CARD payment source.');
						}
					}
					const masterpassPayload = buildMasterpassPayload(paymentInitData.masterpassRequestBody, params.cardData, params.paymentSource, {
						...(paymentInitData.paymentId !== undefined && { paymentId: paymentInitData.paymentId }),
						...(paymentInitData.masterpassPaymentId !== undefined && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
						...(paymentInitData.activityId !== undefined && { activityId: paymentInitData.activityId }),
						...(paymentInitData.uniqueCode !== undefined && { uniqueCode: paymentInitData.uniqueCode }),
					});
					const securityCodeInit = (masterpassPayload.cvv ?? params.cardData?.cvv ?? params.cardData?.cvc ?? '').toString().trim();
					masterpassPayload.cvv = securityCodeInit;
					masterpassPayload.cvc = securityCodeInit;
					logDebugFlow(config, {
						functionName: 'initPayment',
						stepName: 'masterpass-payload-built',
						requestPayload: masterpassPayload,
					});
					logDebugFlow(config, {
						functionName: 'initPayment',
						stepName: 'masterpass-sdk-call',
						requestPayload: masterpassPayload,
						metadata: {
							paymentSource: params.paymentSource,
						},
					});
					masterpassResponse = await callMasterpassSdk(masterpassPayload, params.paymentSource);
					logDebugFlow(config, {
						functionName: 'initPayment',
						stepName: 'masterpass-sdk-response',
						rawProviderResponse: masterpassResponse,
					});
					const mpResponse = masterpassResponse.response || masterpassResponse;
					mpResult = mpResponse?.result || mpResponse;
					responseCode = mpResponse?.result?.responseCode
						|| mpResult?.responseCode
						|| mpResponse?.responseCode
						|| '';
					masterpassOrderId = mpResult?.retrievalReferenceNumber
						|| mpResult?.orderId
						|| mpResponse?.orderId
						|| mpResponse?.retrievalReferenceNumber;
					if (responseCode === '0000') {
						paymentStatus = 'SUCCESS';
						paymentType = exports.PaymentType.NonSecure;
						description = SDK_MESSAGES.PAYMENT_COMPLETED;
						// Add commit hint for successful payment
						nextActionHint = SDK_MESSAGES.ACTION_HINT_COMMIT_PAYMENT;
					}
					else if (responseCode === '5001') {
						paymentStatus = 'ACTION_REQUIRED';
						actionType = 'BANK_OTP';
						paymentType = exports.PaymentType.Otp;
						otpToken = mpResult?.token || mpResponse?.token;
						description = SDK_MESSAGES.BANK_OTP_REQUIRED;
					}
					else if (responseCode === '5010') {
						// responseCode 5010 → 3D Secure doğrulama gerekiyor
						// token varsa, bu token 3D formunda kullanılır (url3d içinde token var)
						// Dokümantasyon: "url3d: responsecode 5010 dönmüşse yani doğrulama 3d ile gerçekleşecekse doğrulama formunu elde etmek için kullanılacak url bilgisi"
						paymentStatus = 'ACTION_REQUIRED';
						actionType = '3D';
						paymentType = exports.PaymentType.ThreeDSecure;
						let baseUrl3d = mpResult?.url3d || mpResponse?.url3d || mpResult?.htmlContent;
						if (baseUrl3d && masterpassReturnQueryString) {
							const separator = baseUrl3d.includes('?') ? '&' : '?';
							threeDAddress = `${baseUrl3d}${separator}${(masterpassReturnQueryString ?? '').replace(/^[?&]/, '')}`;
						}
						else {
							threeDAddress = baseUrl3d;
						}
						description = SDK_MESSAGES.THREE_D_REQUIRED;
						// url3dSuccess ve url3dFail'e de MasterpassReturnQueryString ekle
						let finalUrl3dSuccess;
						let finalUrl3dFail;
						if (mpResult?.url3dSuccess) {
							if (masterpassReturnQueryString) {
								const separator = mpResult.url3dSuccess.includes('?') ? '&' : '?';
								finalUrl3dSuccess = `${mpResult.url3dSuccess}${separator}${(masterpassReturnQueryString ?? '').replace(/^[?&]/, '')}`;
							}
							else {
								finalUrl3dSuccess = mpResult.url3dSuccess;
							}
						}
						if (mpResult?.url3dFail) {
							if (masterpassReturnQueryString) {
								const separator = mpResult.url3dFail.includes('?') ? '&' : '?';
								finalUrl3dFail = `${mpResult.url3dFail}${separator}${(masterpassReturnQueryString ?? '').replace(/^[?&]/, '')}`;
							}
							else {
								finalUrl3dFail = mpResult.url3dFail;
							}
						}
						// FlowDirectable objesini set et (Masterpass SDK için - 3D callback için)
						const session = getMasterpassSession();
						window.FlowDirectable = {
							uri: mpResponse?.contentLocation || '',
							token: mpResult?.token || session?.masterpassToken,
							url3d: threeDAddress,
							url3dSuccess: finalUrl3dSuccess,
							url3dFail: finalUrl3dFail,
						};
					}
					else {
						paymentStatus = 'FAILED';
						const mappedError = mapMasterpassError(mpResponse);
						if (mappedError) {
							description = mappedError.message;
						}
						else {
							description = `Payment failed. Masterpass response code: ${responseCode || 'UNKNOWN'}. Please check your information and try again.`;
						}
					}
					// Debug log: Response normalization tamamlandı
					logDebugFlow(config, {
						functionName: 'initPayment',
						stepName: 'response-normalized',
						normalizedSdkResponse: {
							status: paymentStatus,
							actionType: actionType,
							paymentType: paymentType,
							hasThreeDAddress: !!threeDAddress,
							hasOtpToken: !!otpToken,
							hasMasterpassOrderId: !!masterpassOrderId,
							description: description,
							...(actionType === 'BANK_OTP' && {
								note: 'OTP_REQUIRED - handled by merchant backend. SDK does NOT verify OTP.',
							}),
						},
					});
					try {
						await markAsStarted({
							...(paymentInitData.masterpassPaymentId && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
							paymentType: paymentType,
							paymentStatus: paymentStatus,
							...(threeDAddress ? { threeDAddress } : {}),
							...(masterpassOrderId && { masterpassOrderId }),
							...(masterpassResponse && { masterpassResponse }),
							responseCode: responseCode,
						});
					}
					catch (markError) {
					}
				}
				catch (error) {
					// { statusCode: 403, response: masterpassResponse }
					// masterpassResponse = { statusCode: 403, message: "Forbidden", exception: { code: "AUTHENTICATION_FAILED", message: "AUTHENTICATION_FAILED", ... } }
					let masterpassResponse = error?.response || null;
					if (!masterpassResponse && error && typeof error === 'object') {
						masterpassResponse = error;
					}
					const exception = masterpassResponse?.exception;
					const exceptionMessage = exception?.message;
					const exceptionCode = exception?.code;
					let errorStatusCode;
					if (typeof error === 'number') {
						errorStatusCode = error;
					}
					else if (error && typeof error === 'object') {
						errorStatusCode = error.statusCode || masterpassResponse?.statusCode;
					}
					const is200Or202 = errorStatusCode === 200 || errorStatusCode === 202
						|| error === 200 || error === '200'
						|| error === 202 || error === '202'
						|| (typeof error === 'object' && error !== null && ('statusCode' in error && (error.statusCode === 200 || error.statusCode === 202)));
					if (is200Or202) {
						let errorResponse;
						if (typeof error === 'number') {
							// error direkt 200/202 ise, response callback'inde data olabilir
							// Ama catch bloğunda response yok, bu yüzden error objesini kontrol et
							errorResponse = { statusCode: errorStatusCode };
						}
						else if (error && typeof error === 'object') {
							errorResponse = error.response || error;
						}
						else {
							errorResponse = { statusCode: errorStatusCode || 200 };
						}
						// Response'u normalize et
						const mpResponse = errorResponse;
						const mpResult = mpResponse?.result || mpResponse;
						const responseCode = mpResponse?.result?.responseCode
							|| mpResult?.responseCode
							|| mpResponse?.responseCode
							|| 'UNKNOWN';
						// retrievalReferenceNumber → masterpassOrderId
						const fallbackMasterpassOrderId = mpResult?.retrievalReferenceNumber
							|| mpResult?.orderId
							|| mpResponse?.orderId
							|| mpResponse?.retrievalReferenceNumber;
						// responseCode'a göre status belirle
						let fallbackStatus = 'FAILED';
						let fallbackActionType;
						let fallbackPaymentType;
						let fallbackDescription = 'Masterpass payment requires action';
						let fallbackNextActionHint;
						if (responseCode === '0000') {
							fallbackStatus = 'SUCCESS';
							fallbackPaymentType = exports.PaymentType.NonSecure;
							fallbackDescription = mpResult?.description || mpResponse?.description || SDK_MESSAGES.PAYMENT_COMPLETED;
							// Add commit hint for successful payment
							fallbackNextActionHint = SDK_MESSAGES.ACTION_HINT_COMMIT_PAYMENT;
						}
						else if (responseCode === '5001') {
							fallbackStatus = 'ACTION_REQUIRED';
							fallbackActionType = 'BANK_OTP';
							fallbackPaymentType = exports.PaymentType.Otp;
							fallbackDescription = mpResult?.description || mpResponse?.description || 'Bank OTP verification required';
						}
						else if (responseCode === '5010') {
							fallbackStatus = 'ACTION_REQUIRED';
							fallbackActionType = '3D';
							fallbackPaymentType = exports.PaymentType.ThreeDSecure;
							fallbackDescription = mpResult?.description || mpResponse?.description || '3D Secure authentication required';
						}
						if (fallbackPaymentType) {
							try {
								await markAsStarted({
									...(paymentInitData.masterpassPaymentId && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
									paymentType: fallbackPaymentType,
									paymentStatus: fallbackStatus,
									...(fallbackActionType === '3D' && mpResult?.url3d && { threeDAddress: mpResult.url3d }),
									...(fallbackMasterpassOrderId && { masterpassOrderId: fallbackMasterpassOrderId }),
									masterpassResponse: {
										statusCode: errorStatusCode || 200,
										response: errorResponse,
									},
									responseCode: responseCode,
								});
							}
							catch (markError) {
							}
						}
						const fallbackProviderMeta = {
							httpStatus: errorStatusCode || 200,
							responseCode: responseCode,
							raw: errorResponse,
						};
						const fallbackResult = {
							sessionId: params.sessionId,
							status: fallbackStatus,
							...(fallbackActionType && { actionType: fallbackActionType }),
							message: fallbackDescription,
							description: fallbackDescription,
							...(fallbackActionType === 'BANK_OTP' && mpResult?.token && { token: mpResult.token }),
							...(fallbackActionType === 'BANK_OTP' && mpResult?.retrievalReferenceNumber && { retrievalReferenceNumber: mpResult.retrievalReferenceNumber }),
							...(fallbackActionType === '3D' && (mpResult?.url3d || mpResponse?.url3d) && { redirectUrl: mpResult?.url3d || mpResponse?.url3d }),
							...(fallbackActionType === '3D' && mpResult?.retrievalReferenceNumber && { retrievalReferenceNumber: mpResult.retrievalReferenceNumber }),
							...(params.paymentDetail.successUrl && { successUrl: params.paymentDetail.successUrl }),
							...(params.paymentDetail.failUrl && { failUrl: params.paymentDetail.failUrl }),
							...(paymentInitData.paymentId !== undefined && { paymentId: paymentInitData.paymentId }),
							...(paymentInitData.masterpassPaymentId && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
							...(paymentInitData.activityId !== undefined && { activityId: paymentInitData.activityId }),
							...(paymentInitData.uniqueCode && { uniqueCode: paymentInitData.uniqueCode }),
						};
						if (fallbackStatus === 'SUCCESS') {
							return createSuccessResponse('MASTERPASS', fallbackResult, fallbackDescription, fallbackProviderMeta);
						}
						else if (fallbackStatus === 'ACTION_REQUIRED' && fallbackActionType) {
							return createActionRequiredResponse('MASTERPASS', fallbackActionType, fallbackDescription, fallbackResult, fallbackProviderMeta);
						}
						else {
							return createFailedResponse('MASTERPASS', fallbackDescription, fallbackProviderMeta?.responseCode || 'MASTERPASS_ERROR', fallbackProviderMeta);
						}
					}
					// Exception bilgilerini kullanarak anlamlı mesaj oluştur
					let errorMessage;
					let errorCode;
					// Önce error map'ten anlaşılır mesaj al
					const mappedError = mapMasterpassError(masterpassResponse);
					if (mappedError) {
						errorMessage = mappedError.message;
						errorCode = String(mappedError.code);
					}
					else if (exceptionMessage) {
						// Exception message'ı kullan (AUTHENTICATION_FAILED gibi)
						errorMessage = exceptionMessage;
						errorCode = String(exceptionCode || masterpassResponse?.statusCode || 'MASTERPASS_ERROR');
					}
					else if (exceptionCode) {
						errorMessage = exceptionCode;
						errorCode = String(exceptionCode);
					}
					else if (masterpassResponse?.message && typeof masterpassResponse.message === 'string') {
						errorMessage = masterpassResponse.message;
						errorCode = String(masterpassResponse.statusCode || 'MASTERPASS_ERROR');
					}
					else if (error instanceof Error) {
						errorMessage = error.message;
						errorCode = 'MASTERPASS_ERROR';
					}
					else {
						errorMessage = SDK_MESSAGES.PAYMENT_INIT_FAILED;
						errorCode = 'MASTERPASS_ERROR';
					}
					return createFailedResponse('MASTERPASS', errorMessage, errorCode, {
						httpStatus: errorStatusCode || masterpassResponse?.statusCode || 0,
						responseCode: errorCode,
						...(config.logLevel === 'debug' && { raw: masterpassResponse || error }),
					});
				}
			}
			else {
				const errorMsg = SDK_MESSAGES.MISSING_MASTERPASS_REQUEST_BODY;
				return createFailedResponse('PAYWALL', errorMsg, 'MISSING_MASTERPASS_REQUEST_BODY');
			}
			// Merchant sadece normalize edilmiş SDK response'unu görür
			// Masked card bilgilerini oluştur (eğer cardNumber varsa)
			let maskedCard;
			if (params.cardData.cardNumber && params.cardData.cardNumber.length >= 12) {
				const bin = getFirst8(params.cardData.cardNumber); // İlk 8 karakter (BIN)
				const last4 = getLast4(params.cardData.cardNumber); // Son 4 karakter
				const masked = maskCardNumberNewFormat(params.cardData.cardNumber); // Yeni format: BIN****LAST4
				maskedCard = {
					bin,
					last4,
					masked,
				};
			}
			// Final response oluştur
			// Eğer Masterpass çağrısı yapılmadıysa (MasterpassRequestBody yok), default değerler kullanılır
			// OTP doğrulaması merchant backend tarafından yapılır, SDK bu sürecin dışındadır
			// Merchant'ın verdiği success ve fail URL'lerini olduğu gibi döndür (ekleme yapma)
			// Sadece threeDAddress'e masterpassReturnQueryString eklenir
			const merchantSuccessUrl = params.paymentDetail.successUrl;
			const merchantFailUrl = params.paymentDetail.failUrl;
			// Merchant root response'unda sadece httpStatus ve responseCode görünür
			// Raw response detayları providerMeta.raw altında saklanır (debug amaçlı)
			const providerMeta = {
				httpStatus: masterpassResponse?.statusCode || 0,
				responseCode: responseCode || 'UNKNOWN',
				raw: masterpassResponse || null, // Raw Masterpass response (debug için - merchant root'unda görünmez)
			};
			// Sadece gerekli alanlar merchant root response'unda görünür
			// Gereksiz debug alanları providerMeta.raw altında saklanır
			const merchantResult = {
				sessionId: params.sessionId,
				status: paymentStatus || 'FAILED',
				...(actionType && { actionType }),
				...(description && { message: description }),
				...(nextActionHint && { nextActionHint }),
				...(otpToken && { token: otpToken }),
				...(masterpassOrderId && { retrievalReferenceNumber: masterpassOrderId }),
				...(threeDAddress && { redirectUrl: threeDAddress }),
				...(merchantSuccessUrl && { successUrl: merchantSuccessUrl }),
				...(merchantFailUrl && { failUrl: merchantFailUrl }),
				...(paymentInitData.paymentId !== undefined && { paymentId: paymentInitData.paymentId }),
				...(paymentInitData.masterpassPaymentId && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
				...(paymentInitData.activityId !== undefined && { activityId: paymentInitData.activityId }),
				...(paymentInitData.uniqueCode && { uniqueCode: paymentInitData.uniqueCode }),
				...(paymentInitData.merchantUniqueCode && { merchantUniqueCode: paymentInitData.merchantUniqueCode }),
				...(maskedCard && { maskedCard }),
				providerMeta,
			};
			logDebugFlow(config, {
				functionName: 'initPayment',
				stepName: 'merchant-response',
				normalizedSdkResponse: merchantResult,
				...(merchantResult.actionType === 'BANK_OTP' && {
					metadata: {
						note: 'OTP_REQUIRED - handled by merchant backend. SDK does NOT verify OTP.',
						merchantResponsibility: 'Merchant must: 1) Show OTP UI, 2) Send OTP to merchant backend, 3) Merchant backend verifies OTP with Paywall backend',
					},
				}),
			});
			if (paymentStatus === 'SUCCESS') {
				return createSuccessResponse('PAYWALL', merchantResult, description || SDK_MESSAGES.PAYMENT_INIT_SUCCESS, providerMeta);
			}
			else if (paymentStatus === 'ACTION_REQUIRED' && actionType) {
				return createActionRequiredResponse('MASTERPASS', actionType, description || 'Action required', merchantResult, providerMeta);
			}
			else {
				return createFailedResponse('MASTERPASS', description || SDK_MESSAGES.PAYMENT_INIT_FAILED, providerMeta?.responseCode || 'PAYMENT_INIT_FAILED', providerMeta);
			}
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			return createFailedResponse('MASTERPASS', getMessage('PAYMENT_INIT_FAILED_WITH_ERROR', errorMessage), 'SDK_ERROR', {
				responseCode: 'SDK_ERROR',
				raw: error,
			});
		}
	}
	/**
	 * Masterpass registerAndPurchase işlemi.
	 *
	 * Kart kaydedip aynı anda ödeme yapar.
	 *
	 * **ÖNEMLİ:**
	 * - Bu fonksiyon hem kart kaydı hem de ödeme işlemini tek seferde yapar
	 * - Paywall init çağrısı yapmaz, direkt Masterpass SDK'ya gider
	 * - Kart bilgileri RSA ile şifrelenir
	 *
	 * **LIFECYCLE:**
	 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk)
	 * - Masterpass session mevcut olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
	 *
	 * **PCI-DSS UYUM:**
	 * - Kart bilgileri sadece Masterpass SDK'ya iletilir
	 * - Paywall'a geri gönderilmez
	 * - SDK state'inde tutulmaz
	 *
	 * @param params - RegisterAndPurchase parametreleri
	 * @returns Promise<SdkResponse<MasterpassPaymentInitResult>> - RegisterAndPurchase sonucu
	 *
	 * @example
	 * ```typescript
	 * // SDK + Masterpass session ile init
	 * const initResult = await PaywallJsSdk.InitPaywallSdk({
	 *   environment: 'test',
	 *   token: 'TEMP_TOKEN_FROM_MERCHANT_BACKEND',
	 *   includeMasterpassSession: true,
	 * });
	 * if (!initResult.success || !initResult.data?.hasMasterpassSession) return;
	 * const sessionId = initResult.data.body?.Masterpass?.SessionId;
	 *
	 * // Kart kaydedip ödeme yap
	 * const result = await PaywallJsSdk.payment.registerAndPurchase({
	 *   sessionId,
	 *   accountKey: '+905551234567',
	 *   accountKeyType: 'Msisdn',
	 *   merchantUserId: 'USER_001',
	 *   paymentDetail: {
	 *     amount: 100.0,
	 *     currencyId: 949,
	 *     merchantUniqueCode: 'MERCHANT-001',
	 *     trackingCode: 'TRACK-001',
	 *     successUrl: 'https://merchant.com/success',
	 *     failUrl: 'https://merchant.com/fail',
	 *     clientIp: '192.168.1.1',
	 *     installment: 1
	 *   },
	 *   cardData: {
	 *     cardNumber: '4603451234567890',
	 *     cardHolderName: 'John Doe',
	 *     expiryDate: '1226',
	 *     cvv: '123'
	 *   },
	 *   products: [
	 *     {
	 *       productId: 'PROD-001',
	 *       productName: 'Product 1',
	 *       productAmount: 100.0
	 *     }
	 *   ]
	 * });
	 * ```
	 */
	async function registerAndPurchase(params) {
		// SDK lifecycle guard - EN BAŞTA kontrol
		assertSdkInitialized();
		if (!isSessionValid()) {
			return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.SESSION_EXPIRED_ACTION_HINT });
		}
		const session = getMasterpassSession();
		if (!session || !session.masterpassToken) {
			return createFailedResponse('SDK', 'Masterpass session is invalid. MasterpassToken is missing. Please create a new session.', 'INVALID_SESSION');
		}
		if (!isMasterpassInitialized()) {
			await ensureMasterpassInitialized();
		}
		if (typeof window !== 'undefined') {
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', 'Masterpass SDK is not loaded. Please ensure Masterpass SDK is properly initialized.', 'SDK_NOT_LOADED');
			}
		}
		if (!params.sessionId || params.sessionId.trim() === '') {
			return createFailedResponse('SDK', SDK_MESSAGES.MISSING_SESSION_ID, 'MISSING_SESSION_ID');
		}
		const config = getConfig();
		try {
			const envConfig = getResolvedEnvironmentConfig();
			if (!envConfig) {
				throw new Error('Environment not resolved. Make sure Init() was called successfully.');
			}
			// Validation
			if (!params.paymentDetail) {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_PAYMENT_DETAIL, 'MISSING_PAYMENT_DETAIL');
			}
			if (!params.paymentDetail.amount || params.paymentDetail.amount <= 0) {
				return createFailedResponse('SDK', getMessage('INVALID_AMOUNT', params.paymentDetail.amount), 'INVALID_AMOUNT');
			}
			if (!params.cardData || !params.cardData.cardNumber || !params.cardData.cardHolderName || !params.cardData.expiryDate || !params.cardData.cvv) {
				return createFailedResponse('SDK', 'Card data is required. cardNumber, cardHolderName, expiryDate, and cvv must be provided.', 'MISSING_CARD_DATA');
			}
			// cardAlias zorunlu kontrolü (registerAndPurchase için kart kaydı yapılacağı için alias gereklidir)
			if (!params.cardData.cardAlias || params.cardData.cardAlias.trim() === '') {
				return createFailedResponse('SDK', 'cardAlias is required for registerAndPurchase. Please provide a card alias for card registration.', 'MISSING_CARD_ALIAS');
			}
			// Card validation
			const cardNumberClean = (params.cardData.cardNumber ?? '').replace(/\s/g, '');
			if (cardNumberClean.length < 13 || cardNumberClean.length > 19) {
				return createFailedResponse('SDK', getMessage('INVALID_CARD_NUMBER_FORMAT', cardNumberClean.length), 'INVALID_CARD_NUMBER_FORMAT');
			}
			if (!/^\d{4}$/.test(params.cardData.expiryDate)) {
				return createFailedResponse('SDK', getMessage('INVALID_EXPIRY_DATE_FORMAT', params.cardData.expiryDate), 'INVALID_EXPIRY_DATE_FORMAT');
			}
			if (!/^\d{3,4}$/.test(params.cardData.cvv)) {
				return createFailedResponse('SDK', getMessage('INVALID_CVV_FORMAT', params.cardData.cvv), 'INVALID_CVV_FORMAT');
			}
			// Card bin ve masked hesapla
			let cardBin;
			if (cardNumberClean.length >= 6) {
				cardBin = cardNumberClean.substring(0, 6);
			}
			let cardMasked;
			if (cardNumberClean.length >= 10) {
				const first6 = cardNumberClean.substring(0, 6);
				const last4 = cardNumberClean.substring(cardNumberClean.length - 4);
				cardMasked = `${first6}******${last4}`;
			}
			// Paywall init request body oluştur
			const requestBody = {
				SessionId: params.sessionId,
				Force3D: params.force3D ?? false,
				PaymentDetail: {
					Amount: params.paymentDetail.amount,
					CurrencyId: params.paymentDetail.currencyId,
					MerchantUniqueCode: params.paymentDetail.merchantUniqueCode,
					TrackingCode: params.paymentDetail.trackingCode,
					MerchantSuccessBackUrl: params.paymentDetail.successUrl,
					MerchantFailBackUrl: params.paymentDetail.failUrl,
					ClientIP: params.paymentDetail.clientIp,
					Installment: params.paymentDetail.installment,
					ChannelId: params.paymentDetail.channelId ?? 0,
					TagId: params.paymentDetail.tagId ?? 0,
				},
				Card: {
					IsSavedCard: false, // registerAndPurchase için yeni kart
					...(cardBin && { CardBin: cardBin }),
					...(cardMasked && { CardMasked: cardMasked }),
					...(params.cardData.cardHolderName && { OwnerName: params.cardData.cardHolderName }),
					CardAlias: params.cardData.cardAlias, // registerAndPurchase için cardAlias zorunlu
				},
				...(params.customer && { Customer: params.customer }),
				Products: params.products,
			};
			// Paywall init çağrısı
			const initUrl = `${envConfig.paymentApiBaseUrl}/api/paywall/masterpass/by/sdk/payment/init`;
			logDebugFlow(config, {
				functionName: 'registerAndPurchase',
				stepName: 'paywall-init-request',
				requestPayload: requestBody,
			});
			const response = await httpPost(initUrl, requestBody);
			const responseData = response.data || response;
			const body = responseData.Body || responseData.body || responseData;
			if (responseData.Result !== true) {
				const errorMessage = responseData.Message || responseData.message || 'Paywall payment init failed';
				return createFailedResponse('PAYWALL', errorMessage, responseData.ErrorCode?.toString() || 'PAYWALL_INIT_FAILED', {
					httpStatus: response.status || 200,
					responseCode: responseData.ErrorCode?.toString() || 'PAYWALL_INIT_FAILED',
					raw: responseData,
				});
			}
			logDebugFlow(config, {
				functionName: 'registerAndPurchase',
				stepName: 'paywall-init-response',
				rawProviderResponse: responseData,
			});
			// Session renewal kontrolü
			if (body.Session && body.Session.SessionRenewed === true && body.Session.SessionId) {
				const currentSession = getMasterpassSession();
				if (currentSession) {
					setMasterpassSession({
						...currentSession,
						sessionId: body.Session.SessionId,
					});
				}
			}
			const paywallMetadata = body.Masterpass?.Paywall;
			const paymentId = paywallMetadata?.PaymentId;
			const masterpassPaymentId = paywallMetadata?.MasterpassPaymentId;
			const activityId = paywallMetadata?.ActivityId;
			const uniqueCode = paywallMetadata?.UniqueCode;
			const merchantUniqueCode = paywallMetadata?.MerchantUniqueKey;
			const masterpassReturnQueryString = paywallMetadata?.MasterpassReturnQueryString;
			const masterpassRequestBody = body.Masterpass?.MasterpassRequestBody || null;
			if (!masterpassRequestBody) {
				return createFailedResponse('PAYWALL', SDK_MESSAGES.MISSING_MASTERPASS_REQUEST_BODY, 'MISSING_MASTERPASS_REQUEST_BODY');
			}
			const paymentInitData = {
				masterpassRequestBody,
			};
			if (paymentId !== undefined) {
				paymentInitData.paymentId = paymentId;
			}
			if (masterpassPaymentId) {
				paymentInitData.masterpassPaymentId = masterpassPaymentId;
			}
			if (activityId !== undefined) {
				paymentInitData.activityId = activityId;
			}
			if (uniqueCode) {
				paymentInitData.uniqueCode = uniqueCode;
			}
			if (merchantUniqueCode) {
				paymentInitData.merchantUniqueCode = merchantUniqueCode;
			}
			if (masterpassReturnQueryString) {
				paymentInitData.masterpassReturnQueryString = masterpassReturnQueryString;
			}
			// MasterpassRequestBody'i registerAndPurchase için hazırla
			// registerAndPurchase için özel alanlar ekle
			const registerAndPurchasePayload = buildMasterpassPayload(masterpassRequestBody, {
					cardNumber: params.cardData.cardNumber,
					cardHolderName: params.cardData.cardHolderName,
					expiryDate: params.cardData.expiryDate,
					cvv: params.cardData.cvv,
					cardAlias: params.cardData.cardAlias, // registerAndPurchase için zorunlu
				}, exports.PaymentSource.MANUAL_CARD, // registerAndPurchase için MANUAL_CARD kullan
				{
					...(paymentInitData.paymentId !== undefined && { paymentId: paymentInitData.paymentId }),
					...(paymentInitData.masterpassPaymentId !== undefined && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
					...(paymentInitData.activityId !== undefined && { activityId: paymentInitData.activityId }),
					...(paymentInitData.uniqueCode !== undefined && { uniqueCode: paymentInitData.uniqueCode }),
				});
			registerAndPurchasePayload.cardAlias = params.cardData.cardAlias;
			registerAndPurchasePayload.accountKey = params.accountKey;
			registerAndPurchasePayload.accountKeyType = params.accountKeyType;
			registerAndPurchasePayload.merchantUserId = params.merchantUserId;
			registerAndPurchasePayload.isMsisdnValidatedByMerchant = params.isMsisdnValidatedByMerchant ?? true;
			const securityCode = (registerAndPurchasePayload.cvv ?? params.cardData.cvv ?? params.cardData.cvc ?? '').toString().trim();
			registerAndPurchasePayload.cvv = securityCode;
			registerAndPurchasePayload.cvc = securityCode;
			logDebugFlow(config, {
				functionName: 'registerAndPurchase',
				stepName: 'masterpass-payload-built',
				requestPayload: registerAndPurchasePayload,
			});
			// Masterpass SDK çağrısı
			let masterpassResponse;
			try {
				masterpassResponse = await masterpassRegisterAndPurchase(registerAndPurchasePayload);
			}
			catch (error) {
				const errorStatusCode = error?.statusCode || 0;
				const errorResponse = error?.response || error;
				return createFailedResponse('MASTERPASS', errorResponse?.exception?.message || errorResponse?.message || 'Masterpass registerAndPurchase failed', errorResponse?.exception?.code || String(errorStatusCode) || 'MASTERPASS_ERROR', {
					httpStatus: errorStatusCode,
					responseCode: errorResponse?.exception?.code || String(errorStatusCode),
					raw: errorResponse,
				});
			}
			logDebugFlow(config, {
				functionName: 'registerAndPurchase',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: masterpassResponse,
			});
			// Response mapping (initPayment ile aynı mantık)
			const mpResponse = masterpassResponse.response || masterpassResponse;
			const mpResult = mpResponse?.result || mpResponse;
			const statusCode = masterpassResponse.statusCode || mpResponse?.statusCode || 0;
			const responseCode = mpResponse?.result?.responseCode
				|| mpResult?.responseCode
				|| mpResponse?.responseCode
				|| 'UNKNOWN';
			const masterpassOrderId = mpResult?.retrievalReferenceNumber
				|| mpResult?.orderId
				|| mpResponse?.orderId
				|| mpResponse?.retrievalReferenceNumber;
			// Status mapping
			let paymentStatus = 'FAILED';
			let actionType;
			let paymentType;
			let description = 'Payment failed';
			let otpToken;
			let threeDAddress;
			let nextActionHint;
			if (responseCode === '0000') {
				paymentStatus = 'SUCCESS';
				paymentType = exports.PaymentType.NonSecure;
				description = SDK_MESSAGES.PAYMENT_COMPLETED;
				nextActionHint = SDK_MESSAGES.ACTION_HINT_COMMIT_PAYMENT;
			}
			else if (responseCode === '5001') {
				paymentStatus = 'ACTION_REQUIRED';
				actionType = 'BANK_OTP';
				paymentType = exports.PaymentType.Otp;
				otpToken = mpResult?.token || mpResponse?.token;
				description = SDK_MESSAGES.BANK_OTP_REQUIRED;
			}
			else if (responseCode === '5010') {
				// responseCode 5010 → 3D Secure doğrulama gerekiyor
				// token varsa, bu token 3D formunda kullanılır (url3d içinde token var)
				// Dokümantasyon: "url3d: responsecode 5010 dönmüşse yani doğrulama 3d ile gerçekleşecekse doğrulama formunu elde etmek için kullanılacak url bilgisi"
				paymentStatus = 'ACTION_REQUIRED';
				actionType = '3D';
				paymentType = exports.PaymentType.ThreeDSecure;
				let baseUrl3d = mpResult?.url3d || mpResponse?.url3d || mpResult?.htmlContent;
				if (baseUrl3d && paymentInitData.masterpassReturnQueryString) {
					const separator = baseUrl3d.includes('?') ? '&' : '?';
					threeDAddress = `${baseUrl3d}${separator}${(paymentInitData.masterpassReturnQueryString ?? '').replace(/^[?&]/, '')}`;
				}
				else {
					threeDAddress = baseUrl3d;
				}
				description = SDK_MESSAGES.THREE_D_REQUIRED;
				// FlowDirectable objesini set et (Masterpass SDK için - 3D callback için)
				const session = getMasterpassSession();
				window.FlowDirectable = {
					uri: mpResponse?.contentLocation || '',
					token: mpResult?.token || session?.masterpassToken,
					url3d: threeDAddress,
					url3dSuccess: mpResult?.url3dSuccess,
					url3dFail: mpResult?.url3dFail,
				};
			}
			else {
				paymentStatus = 'FAILED';
				const mappedError = mapMasterpassError(mpResponse);
				if (mappedError) {
					description = mappedError.message;
				}
				else {
					description = `Payment failed. Masterpass response code: ${responseCode || 'UNKNOWN'}. Please check your information and try again.`;
				}
			}
			logDebugFlow(config, {
				functionName: 'registerAndPurchase',
				stepName: 'response-normalized',
				normalizedSdkResponse: {
					status: paymentStatus,
					actionType: actionType,
					paymentType: paymentType,
					hasThreeDAddress: !!threeDAddress,
					hasOtpToken: !!otpToken,
					hasMasterpassOrderId: !!masterpassOrderId,
					description: description,
				},
			});
			// markAsStarted çağrısı
			try {
				await markAsStarted({
					...(paymentInitData.masterpassPaymentId && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
					paymentType: paymentType,
					paymentStatus: paymentStatus,
					...(threeDAddress ? { threeDAddress } : {}),
					...(masterpassOrderId && { masterpassOrderId }),
					masterpassResponse: masterpassResponse,
					responseCode: responseCode,
				});
			}
			catch (markError) {
				// markAsStarted hatası ödeme akışını durdurmaz, sadece log'lanır
			}
			// Provider meta oluştur
			const providerMeta = {
				httpStatus: statusCode,
				responseCode: responseCode,
				...(config.logLevel === 'debug' && { raw: mpResponse }),
			};
			// Result oluştur
			const result = {
				sessionId: params.sessionId,
				status: paymentStatus,
				...(actionType && { actionType }),
				...(description && { message: description }),
				...(nextActionHint && { nextActionHint }),
				...(otpToken && { token: otpToken }),
				...(masterpassOrderId && { retrievalReferenceNumber: masterpassOrderId }),
				...(threeDAddress && { redirectUrl: threeDAddress }),
				...(params.paymentDetail.successUrl && { successUrl: params.paymentDetail.successUrl }),
				...(params.paymentDetail.failUrl && { failUrl: params.paymentDetail.failUrl }),
				...(paymentInitData.paymentId !== undefined && { paymentId: paymentInitData.paymentId }),
				...(paymentInitData.masterpassPaymentId && { masterpassPaymentId: paymentInitData.masterpassPaymentId }),
				...(paymentInitData.activityId !== undefined && { activityId: paymentInitData.activityId }),
				...(paymentInitData.uniqueCode && { uniqueCode: paymentInitData.uniqueCode }),
			};
			if (paymentStatus === 'SUCCESS') {
				return createSuccessResponse('PAYWALL', result, description, providerMeta);
			}
			else if (paymentStatus === 'ACTION_REQUIRED' && actionType) {
				return createActionRequiredResponse('MASTERPASS', actionType, description, result, providerMeta);
			}
			else {
				return createFailedResponse('MASTERPASS', description, responseCode || 'PAYMENT_FAILED', providerMeta);
			}
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			return createFailedResponse('MASTERPASS', getMessage('PAYMENT_INIT_FAILED_WITH_ERROR', errorMessage), 'SDK_ERROR', {
				responseCode: 'SDK_ERROR',
				raw: error,
			});
		}
	}
	/**
	 * Payment status result interface.
	 * Final payment state bilgisini içerir.
	 */
	/**
	 * ⚠️ DEPRECATED: getPaymentStatus() fonksiyonu kaldırıldı.
	 *
	 * Backend'de GET /api/paywall/masterpass/by/sdk/payment/status/{masterpassPaymentId} endpoint'i yok.
	 *
	 * Gerçek akış:
	 * 1. Paywall init
	 * 2. Masterpass.paymentService.payment()
	 * 3. Paywall payment/mark-as-started (POST)
	 * 4. DONE
	 *
	 * Payment status bilgisi webhook veya merchant backend tarafından yönetilir.
	 */
	/**
	 * Masterpass ile kart ekleme işlemi.
	 *
	 * Bu fonksiyon Masterpass SDK'nın AccountService.addCard metodunu kullanarak
	 * kart ekleme işlemini gerçekleştirir. Callback-based Masterpass SDK'yı
	 * Promise-based hale getirir ve unified result formatı döndürür.
	 *
	 * Akış:
	 * 1. Parametreleri Masterpass SDK formatına map eder
	 * 2. Masterpass SDK AccountService.addCard'ı çağırır
	 * 3. Response'u unified format'a çevirir
	 * 4. Sonucu döndürür
	 *
	 * @param params - Kart ekleme parametreleri
	 * @returns Promise<MasterpassResponse<MasterpassAddCardResult>> - Unified kart ekleme sonucu
	 *
	 * @throws Error - SDK initialize edilmemişse veya Masterpass SDK yüklenmemişse
	 *
	 * @example
	 * ```typescript
	 * const result = await PaywallJsSdk.ExternalService.Masterpass.AddCard({
	 *   userId: "USER_001",
	 *   accountKey: "ACC001",
	 *   accountKeyType: "MSISDN",
	 *   cardNumber: "4111111111111111",
	 *   expiryDate: "1226",
	 *   cvv: "123",
	 *   cardHolderName: "John Doe",
	 *   accountAliasName: "My Card",
	 *   requestReferenceNumber: "REQ-001"
	 * });
	 *
	 * if (result.success && result.data) {
	 *   console.log(result.data.maskedPan); // "**** **** **** 1111"
	 *   console.log(result.data.bin);       // "411111"
	 *   console.log(result.data.last4);     // "1111"
	 * }
	 * ```
	 */
	async function addCard(params) {
		if (!isInitialized()) {
			return createFailedResponse('SDK', 'PaywallJsSdk is not initialized. Call PaywallJsSdk.InitPaywallSdk() first.', 'SDK_NOT_INITIALIZED');
		}
		if (!hasMasterpassSession()) {
			return createFailedResponse('SDK', SDK_MESSAGES.SESSION_NOT_CREATED, 'SESSION_NOT_CREATED');
		}
		getConfig();
		try {
			// Request reference number generate et (eğer verilmemişse)
			const requestReferenceNumber = params.requestReferenceNumber ||
				`REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
			// Expiry date'i YYMM formatına çevir (backend YYMM bekliyor, MMYY değil)
			// Legacy support: expiryDate varsa kullan (MMYY formatında geliyor), yoksa expireMonth + expireYear'dan oluştur
			let expiryDate;
			if (params.expiryDate) {
				// expiryDate MMYY formatında geliyor, YYMM'ye çevir
				const mm = params.expiryDate.substring(0, 2); // İlk 2 karakter (ay)
				const yy = params.expiryDate.substring(2, 4); // Son 2 karakter (yıl)
				expiryDate = `${yy}${mm}`; // YYMM formatına çevir
			}
			else if (params.expireMonth && params.expireYear) {
				const expireMonth = params.expireMonth.padStart(2, '0');
				const expireYear = params.expireYear.length === 2 ? params.expireYear : params.expireYear.slice(-2);
				// Backend YYMM formatı bekliyor (MMYY değil)
				expiryDate = `${expireYear}${expireMonth}`; // YYMM formatı
			}
			else {
				throw new Error('Either expiryDate or expireMonth + expireYear must be provided');
			}
			// Masterpass SDK parametrelerini hazırla
			// NOT: Kart datası (cardNumber, cvv, expiry) sadece Masterpass'e gidecek, Paywall'a gitmeyecek
			const masterpassParams = {
				accountKey: params.accountKey || params.phoneNumber,
				accountKeyType: params.accountKeyType || 'MSISDN',
				...(params.customerId && { userId: params.customerId }),
				...(params.userId && { userId: params.userId }), // Legacy support
				...(params.cardAlias && { accountAliasName: params.cardAlias }),
				...(params.accountAliasName && { accountAliasName: params.accountAliasName }), // Legacy support
				requestReferenceNumber,
				cardNumber: params.cardNumber,
				expiryDate,
				cvv: params.cvv,
				...(params.cardHolderName && { cardHolderName: params.cardHolderName }),
				...(params.deviceFingerPrint && { deviceFingerPrint: params.deviceFingerPrint }),
				...(params.additionalParams && { additionalParams: params.additionalParams }),
			};
			// Debug log - masked request (PAN/CVV ASLA loglanmaz)
			const maskedRequest = maskRequestPayload({
				...masterpassParams,
				last4: params.cardNumber.slice(-4),
				cardAlias: params.cardAlias,
				phoneNumber: params.phoneNumber,
				accountKey: params.accountKey ? '***' : undefined,
			});
			const { statusCode, response } = await masterpassAddCard(masterpassParams);
			const mappedError = mapMasterpassError(response);
			if (mappedError) {
				return createFailedResponse('MASTERPASS', mappedError.message || SDK_MESSAGES.ADD_CARD_FAILED, String(mappedError.code), {
					httpStatus: statusCode || 400,
					responseCode: String(mappedError.code),
					raw: response
				});
			}
			if (statusCode === 200 && response) {
				const maskedPan = response.maskedPan || `**** **** **** ${params.cardNumber.slice(-4)}`;
				const bin = params.cardNumber.slice(0, 6);
				const last4 = params.cardNumber.slice(-4);
				const result = {
					success: true,
					responseCode: response.responseCode,
					token: response.token || response.cardAlias,
					maskedPan,
					bin,
					last4,
					transactionId: response.transactionId || response.requestReferenceNumber,
				};
				return createSuccessResponse('MASTERPASS', result, SDK_MESSAGES.CARD_ADDED_SUCCESS, {
					httpStatus: statusCode,
					responseCode: response.responseCode,
					raw: response
				});
			}
			else {
				return createFailedResponse('MASTERPASS', response?.message || 'Masterpass add card failed', response?.responseCode || 'UNKNOWN_ERROR', {
					httpStatus: statusCode || 400,
					responseCode: response?.responseCode || 'UNKNOWN_ERROR',
					raw: response
				});
			}
		}
		catch (error) {
			const errorResponse = error;
			const mappedError = mapMasterpassError(errorResponse?.response || errorResponse);
			if (mappedError) {
				return createFailedResponse('MASTERPASS', mappedError.message || SDK_MESSAGES.ADD_CARD_FAILED, String(mappedError.code), {
					httpStatus: errorResponse?.statusCode || 400,
					responseCode: String(mappedError.code),
					raw: errorResponse
				});
			}
			const errorMessage = error instanceof Error ? error.message : String(error);
			return createFailedResponse('MASTERPASS', `Masterpass add card failed: ${errorMessage}`, 'SDK_ERROR', {
				httpStatus: errorResponse?.statusCode || 400,
				responseCode: 'SDK_ERROR',
				raw: error
			});
		}
	}
	/**
	 * Masterpass ile ödeme sürecini başlatır.
	 *
	 * Bu fonksiyon Masterpass SDK'nın PaymentService.directPayment veya PaymentService.payment
	 * metodunu kullanarak ödeme işlemini gerçekleştirir. NonSecure ve 3D Secure akışlarını destekler.
	 *
	 * Akış:
	 * 1. Parametreleri Masterpass SDK formatına map eder
	 * 2. FlowType'a göre secure3DModel parametresini ayarlar
	 * 3. Masterpass SDK directPayment veya payment metodunu çağırır
	 * 4. Response'u unified PaymentResult formatına çevirir
	 * 5. 3D Secure ise redirectUrl ve token döndürür
	 * 6. NonSecure ise direkt SUCCESS/FAILED döndürür
	 *
	 * @param params - Ödeme başlatma parametreleri
	 * @returns Promise<MasterpassResponse<PaymentResult>> - Unified ödeme sonucu
	 *
	 * @throws Error - SDK initialize edilmemişse veya Masterpass SDK yüklenmemişse
	 *
	 * @example
	 * ```typescript
	 * // 3D Secure ödeme
	 * const result = await PaywallJsSdk.ExternalService.Masterpass.StartPayment({
	 *   merchantId: "M10001",
	 *   paymentReference: "ORDER-55",
	 *   amount: 199.90,
	 *   currency: "TRY",
	 *   maskedPan: "**** **** **** 1212",
	 *   bin: "460345",
	 *   last4: "1212",
	 *   token: "MASTERPASS_TOKEN",
	 *   customer: {
	 *     referenceId: "USER_001"
	 *   },
	 *   masterpassOptions: {
	 *     threeDSecure: true
	 *   }
	 * });
	 *
	 * if (result.success && result.data) {
	 *   if (result.data.state === "STARTED" && result.data.redirectUrl) {
	 *     // 3D Secure redirect
	 *     window.location.href = result.data.redirectUrl;
	 *   }
	 * }
	 * ```
	 */
	async function startPayment(params) {
		// SDK lifecycle guard - EN BAŞTA kontrol
		assertSdkInitialized();
		// Masterpass session guard - session oluşturulmamışsa hata fırlat
		if (!hasMasterpassSession()) {
			throw new Error(SDK_MESSAGES.SESSION_NOT_CREATED);
		}
		// Token is now obtained from SDK config, no validation needed here
		const config = getConfig();
		// Token config.accessToken'dan otomatik alınır
		try {
			// Payment init kontrolü - payment.initMaskedPayment çağrılmadan StartPayment istenirse hata fırlat
			const initResponse = getInitResponse();
			if (!initResponse || !initResponse.paymentId) {
				throw new Error('Payment must be initialized via PaywallJsSdk.payment.initMaskedPayment() before StartPayment. ' +
					'Please call payment.initMaskedPayment() first.');
			}
			// Guard: Session state var mı?
			const session = getMasterpassSession();
			if (!session || !session.masterpassToken) {
				throw new Error('Masterpass not initialized. Create session first.');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (typeof window !== 'undefined') {
				const Masterpass = window.Masterpass;
				if (!Masterpass) {
					throw new Error('Masterpass not initialized. Create session first.');
				}
			}
			try {
				// Init'ten gelen referansları al
				const paymentId = params.paymentId || initResponse.paymentId;
				const checkoutId = params.checkoutId || initResponse.checkoutId;
				const uniqueCode = params.uniqueCode || initResponse.uniqueCode;
				const merchantUniqueCode = params.merchantUniqueCode || initResponse.merchantUniqueCode;
				// 🔵 AŞAMA 1 — Paywall PaymentInit Call (SDK içinden otomatik tetiklenecek)
				// Masterpass'e gitmeden önce Paywall'a ödeme başlangıç kaydı geçilecek
				let transactionId;
				try {
					// Masked card number oluştur (eğer cardNumber varsa)
					let maskedPan = '';
					let expireMonth = '';
					let expireYear = '';
					if (params.cardNumber) {
						const first6 = params.cardNumber.slice(0, 6);
						const last4 = params.cardNumber.slice(-4);
						maskedPan = `${first6}******${last4}`;
						expireMonth = params.expireMonth || '';
						expireYear = params.expireYear || '';
					}
					const paymentInitPayload = {
						paymentId,
						checkoutId,
						uniqueCode,
						merchantUniqueCode,
						amount: params.amount,
						currency: params.currency,
						...(maskedPan && { maskedPan }),
						...(expireMonth && { expireMonth }),
						...(expireYear && { expireYear }),
					};
					// DEPRECATED: Bu endpoint artık kullanılmıyor, initPayment() kullanılmalı
					const paymentInitUrl = `${config.baseUrl}/checkout/masterpass/payment/init`;
					const paymentInitResponse = await httpPost(paymentInitUrl, paymentInitPayload);
					const paymentInitData = paymentInitResponse.data || paymentInitResponse;
					transactionId = paymentInitData.transactionId;
					// Transaction ID'yi internal state'e kaydet
					if (transactionId) {
						setTransactionId(transactionId);
					}
				}
				catch (error) {
					// PaymentInit hatası ödeme akışını durdurmaz, sadece log'lanır
					const errorMessage = error instanceof Error ? error.message : String(error);
				}
				// 🔵 AŞAMA 2 — Masterpass Payment (Gerçek PAN + CVV sadece Buraya Gidecek)
				// secure3DModel mapping
				// threeDSecure === true → "3D"
				// threeDSecure === false → "NON_SECURE"
				const secure3DModel = params.threeDSecure === true ? '3D' : 'NON_SECURE';
				// FlowType belirleme
				const flowType = params.threeDSecure
					? exports.PaymentFlowType.THREE_D_SECURE
					: exports.PaymentFlowType.NON_SECURE;
				// Masterpass SDK parametrelerini hazırla
				// NOT: Kart datası (cardNumber, cvv, expiry) sadece Masterpass'e gidecek, Paywall'a gitmeyecek
				const masterpassParams = {
					amount: params.amount,
					currencyCode: params.currency,
					secure3DModel,
					authenticationMethod: params.threeDSecure ? 'THREE_D_SECURE' : 'NON_SECURE',
					...(params.customer?.referenceId && { accountKey: params.customer.referenceId }),
					...(params.order?.orderId && { orderNo: params.order.orderId }),
					...(params.paymentReference && { requestReferenceNo: params.paymentReference }),
					...(params.installment && { installmentCount: params.installment }),
					// Init'ten gelen referanslar Masterpass'e de gönderilebilir
					...(uniqueCode && { uniqueCode }),
					...(merchantUniqueCode && { merchantUniqueCode }),
				};
				// Eğer cardAlias varsa (kayıtlı kart), payment() metodunu kullan
				// Eğer cardNumber varsa (yeni kart), directPayment() metodunu kullan
				let masterpassResponse;
				if (params.cardAlias && params.cardAlias !== '') {
					// Kayıtlı kart ile ödeme - Masterpass.paymentService.payment()
					masterpassParams.cardAlias = params.cardAlias;
					masterpassParams.cvv = '';
					masterpassParams.cvc = '';
					masterpassResponse = await masterpassPayment(masterpassParams);
				}
				else if (params.cardNumber && params.expireMonth && params.expireYear && params.cvv) {
					const expiryMMYY = (params.expireMonth ?? '').toString().padStart(2, '0') +
						((params.expireYear ?? '').length === 2 ? (params.expireYear ?? '') : (params.expireYear ?? '').slice(-2));
					const plain = getPlainCardForMasterpass({
						cardNumber: params.cardNumber,
						expiryDate: expiryMMYY,
						cvv: params.cvv,
						...(params.cvc != null && params.cvc !== '' && { cvc: params.cvc }),
					});
					masterpassParams.cardNumber = plain.cardNumberPlain;
					masterpassParams.expiryDate = plain.expiryYYMM;
					masterpassParams.cvv = plain.cvvPlain;
					masterpassParams.cvc = plain.cvvPlain;
					masterpassResponse = await masterpassDirectPayment(masterpassParams);
				}
				else {
					throw new Error('Either cardAlias or cardNumber with expiry and cvv must be provided');
				}
				// Debug log - masked request params (PAN/CVV ASLA loglanmaz)
				const safeParams = maskRequestPayload({
					...masterpassParams,
					last4: params.cardNumber ? params.cardNumber.slice(-4) : undefined,
				});
				// Hata kontrolü - merkezi error mapping
				const mappedError = mapMasterpassError(masterpassResponse.response);
				if (mappedError) {
					const errorResult = {
						success: false,
						flowType: flowType === exports.PaymentFlowType.THREE_D_SECURE ? 'THREE_D_SECURE' : 'NON_SECURE',
						statusCode: masterpassResponse.statusCode,
						responseCode: String(mappedError.code),
						...(paymentId && { paymentId }),
						...(checkoutId && { checkoutId }),
						...(uniqueCode && { uniqueCode }),
						...(merchantUniqueCode && { merchantUniqueCode }),
					};
					return {
						success: false,
						errorCode: String(mappedError.code),
						errorMessage: mappedError.message,
						data: errorResult,
					};
				}
				// Response'u unified formatına çevir
				// FlowType mapping: statusCode === 200 → NON_SECURE, statusCode === 202 → THREE_D_SECURE
				const finalFlowType = masterpassResponse.statusCode === 202
					? exports.PaymentFlowType.THREE_D_SECURE
					: exports.PaymentFlowType.NON_SECURE;
				// Masterpass response'unu parse et
				const mpResponse = masterpassResponse.response;
				const result = mpResponse?.result || mpResponse;
				const responseCode = mpResponse?.responseCode || result?.responseCode || '';
				const token = result?.token || mpResponse?.token || '';
				const url3d = result?.url3d;
				const url3dSuccess = result?.url3dSuccess;
				const url3dFail = result?.url3dFail;
				// Unified result oluştur
				const unifiedResult = {
					success: masterpassResponse.statusCode === 200 || masterpassResponse.statusCode === 202,
					flowType: finalFlowType === exports.PaymentFlowType.THREE_D_SECURE ? 'THREE_D_SECURE' : 'NON_SECURE',
					statusCode: masterpassResponse.statusCode,
					...(url3d && { url3d }),
					...(url3dSuccess && { url3dSuccess }),
					...(url3dFail && { url3dFail }),
					...(token && { token }),
					...(responseCode && { responseCode }),
					paymentId,
					...(checkoutId && { checkoutId }),
					...(uniqueCode && { uniqueCode }),
					...(merchantUniqueCode && { merchantUniqueCode }),
					...(transactionId && { transactionId }),
				};
				// FlowDirectable objesini set et (Masterpass SDK için - 3D için)
				if (typeof window !== 'undefined' && masterpassResponse.statusCode === 202) {
					window.FlowDirectable = {
						uri: mpResponse?.contentLocation || '',
						token,
						url3d,
						url3dSuccess,
						url3dFail,
					};
				}
				// 🔵 AŞAMA 3 — Masterpass Sonrası Paywall Push CALL (SDK içinden otomatik)
				// statusCode === 200 → NON-SECURE AKIŞ (SUCCESS)
				// statusCode === 202 → 3D SECURE AKIŞI (STARTED)
				if (masterpassResponse.statusCode === 200 || masterpassResponse.statusCode === 202) {
					try {
						// Masked card number oluştur (eğer cardNumber varsa)
						let maskedPan = '';
						if (params.cardNumber) {
							const first6 = params.cardNumber.slice(0, 6);
							const last4 = params.cardNumber.slice(-4);
							maskedPan = `${first6}******${last4}`;
						}
						if (masterpassResponse.statusCode === 200) {
							// 💚 NON-SECURE AKIŞ (statusCode 200)
							const successPayload = {
								paymentId,
								...(transactionId && { transactionId }),
								status: 'SUCCESS',
								...(token && { token }),
								...(responseCode && { responseCode }),
								...(maskedPan && { maskedPan }),
							};
							const completeEndpoint = `${config.baseUrl}/checkout/masterpass/payment/complete`;
							httpPost(completeEndpoint, successPayload).catch(() => { });
						}
						else if (masterpassResponse.statusCode === 202) {
							// 🔵 3D SECURE AKIŞI (statusCode 202)
							const startedPayload = {
								paymentId,
								...(transactionId && { transactionId }),
								status: 'THREE_D_STARTED',
								...(url3d && { url3d }),
								...(token && { token }),
							};
							const startedEndpoint = `${config.baseUrl}/checkout/masterpass/payment/started`;
							httpPost(startedEndpoint, startedPayload).catch(() => { });
						}
					}
					catch (error) {
						// Push hatası ödeme akışını etkilemez
					}
				}
				return {
					success: unifiedResult.success,
					data: unifiedResult,
					...(!unifiedResult.success && {
						errorCode: responseCode || 'UNKNOWN_ERROR',
						errorMessage: 'masterpass.errors.unknown',
					}),
				};
			}
			catch (error) {
				// Network hatası veya Masterpass SDK hatası
				const errorResponse = error;
				const mappedError = mapMasterpassError(errorResponse?.response || errorResponse);
				// FlowType belirleme
				const flowType = params.threeDSecure
					? exports.PaymentFlowType.THREE_D_SECURE
					: exports.PaymentFlowType.NON_SECURE;
				const errorMessageText = error instanceof Error ? error.message : String(error);
				// Init'ten gelen referansları al
				const initResponse = getInitResponse();
				const paymentId = params.paymentId || initResponse?.paymentId;
				const checkoutId = params.checkoutId || initResponse?.checkoutId;
				const uniqueCode = params.uniqueCode || initResponse?.uniqueCode;
				const merchantUniqueCode = params.merchantUniqueCode || initResponse?.merchantUniqueCode;
				const errorResult = {
					success: false,
					flowType: flowType === exports.PaymentFlowType.THREE_D_SECURE ? 'THREE_D_SECURE' : 'NON_SECURE',
					statusCode: 0,
					responseCode: 'SDK_ERROR',
					...(paymentId && { paymentId }),
					...(checkoutId && { checkoutId }),
					...(uniqueCode && { uniqueCode }),
					...(merchantUniqueCode && { merchantUniqueCode }),
				};
				return {
					success: false,
					errorCode: 'SDK_ERROR',
					errorMessage: 'masterpass.errors.unknown',
					data: errorResult,
				};
			}
		}
		catch (error) {
			// ⚠️ KRİTİK: ASLA throw ETME, her zaman response döndür
			// Bu catch bloğu sadece beklenmeyen hatalar için
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const exception = masterpassResponse?.exception;
			const exceptionMessage = exception?.message;
			const exceptionCode = exception?.code;
			let errorMessage;
			let errorCode;
			const mappedError = mapMasterpassError(masterpassResponse);
			if (mappedError) {
				errorMessage = mappedError.message;
				errorCode = String(mappedError.code);
			}
			else if (exceptionMessage) {
				errorMessage = exceptionMessage;
				errorCode = String(exceptionCode || masterpassResponse?.statusCode || 'MASTERPASS_ERROR');
			}
			else if (exceptionCode) {
				errorMessage = exceptionCode;
				errorCode = String(exceptionCode);
			}
			else if (error instanceof Error) {
				errorMessage = error.message;
				errorCode = 'MASTERPASS_ERROR';
			}
			else {
				errorMessage = SDK_MESSAGES.PAYMENT_INIT_FAILED;
				errorCode = 'MASTERPASS_ERROR';
			}
			const errorResult = {
				success: false,
				flowType: 'NON_SECURE',
				statusCode: masterpassResponse?.statusCode || 0,
				responseCode: errorCode,
			};
			return {
				success: false,
				errorCode: errorCode,
				errorMessage: errorMessage,
				data: errorResult,
			};
		}
	}

	/**
	 * Masterpass Provider Init - INTERNAL IMPLEMENTATION
	 *
	 * ⚠️ INTERNAL USE ONLY - DO NOT EXPORT
	 *
	 * Masterpass provider'ını initialize eder.
	 * Session'a bağlı olmadan çalışır.
	 *
	 * Bu fonksiyon gerçek Masterpass SDK init logic'ini içerir.
	 * External API tarafından çağrılır.
	 */
	/**
	 * Masterpass provider'ını initialize eder - INTERNAL IMPLEMENTATION.
	 *
	 * ⚠️ INTERNAL USE ONLY
	 *
	 * Bu fonksiyon:
	 * - Mevcut Masterpass SDK init logic'ini içerir
	 * - setEndpoint / setToken / setMerchantId çağrılarını yapar
	 * - SDK state'ini günceller
	 * - Gerçek işi yapan TEK YER burasıdır
	 * - Session state'inden MasterpassToken ve MasterpassMerchantId alır
	 *
	 * External API tarafından çağrılır, merchant tarafından DOĞRUDAN çağrılmamalıdır.
	 *
	 * @returns Promise<SdkResponse> - Init sonucu
	 *
	 * @internal
	 */
	async function initMasterpassProviderInternal() {
		// ⚠️ KRİTİK: ASLA throw ETME, her zaman response döndür
		// ⚠️ INTERNAL IMPLEMENTATION: Bu fonksiyon external API tarafından çağrılır
		// Guard kontrolü external API'de yapılır, burada sadece gerçek init logic var
		try {
			// Browser environment kontrolü
			if (typeof window === 'undefined') {
				return {
					success: false,
					status: 'FAILED',
					source: 'SDK',
					message: 'Masterpass SDK initialization requires browser environment',
					data: {
						masterpassSdkInitialized: false,
					},
				};
			}
			// Session state'inden MasterpassToken ve MasterpassMerchantId al
			const masterpassToken = getMasterpassToken();
			const masterpassMerchantId = getMasterpassMerchantId();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return {
					success: false,
					status: 'FAILED',
					source: 'SDK',
					message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
					data: {
						masterpassSdkInitialized: false,
					},
				};
			}
			if (!masterpassMerchantId || masterpassMerchantId.trim() === '') {
				return {
					success: false,
					status: 'FAILED',
					source: 'SDK',
					message: 'MasterpassMerchantId not found in session state. Make sure session was started successfully.',
					data: {
						masterpassSdkInitialized: false,
					},
				};
			}
			// 4. Masterpass SDK'nın bundle içinde mevcut olup olmadığını kontrol et
			await loadMasterpassSdk();
			// 5. window.Masterpass kontrolü
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return {
					success: false,
					status: 'FAILED',
					source: 'SDK',
					message: 'Masterpass SDK not loaded',
					data: {
						masterpassSdkInitialized: false,
					},
				};
			}
			// 6. Environment'a göre endpoint belirle
			const envConfig = getResolvedEnvironmentConfig();
			if (!envConfig) {
				return {
					success: false,
					status: 'FAILED',
					source: 'SDK',
					message: 'Environment not resolved. Make sure Init() was called successfully.',
					data: {
						masterpassSdkInitialized: false,
					},
				};
			}
			let endpoint;
			if (envConfig.environment === 'prod') {
				endpoint = 'https://mp-sdk.masterpassturkiye.com';
			}
			else {
				// dev veya test
				endpoint = 'https://mp-test-sdk.masterpassturkiye.com';
			}
			// 7. Masterpass SDK API kontrolü
			if (typeof Masterpass.setEndpoint !== 'function' ||
				typeof Masterpass.setToken !== 'function' ||
				typeof Masterpass.setMerchantId !== 'function') {
				return {
					success: false,
					status: 'FAILED',
					source: 'SDK',
					message: 'Masterpass SDK API mismatch: expected setEndpoint/setToken/setMerchantId.',
					data: {
						masterpassSdkInitialized: false,
					},
				};
			}
			// Masterpass SDK'yı initialize et (mevcut logic'i kullan)
			// Token ve merchantId session state'inden alınır
			Masterpass.setEndpoint(endpoint);
			Masterpass.setToken(masterpassToken);
			Masterpass.setMerchantId(masterpassMerchantId);
			// 9. Provider state'i set et
			setProviderState('masterpass', { initialized: true });
			// 10. Başarılı response döndür
			return {
				success: true,
				status: 'SUCCESS',
				source: 'SDK',
				message: 'Masterpass provider initialized successfully',
				data: {
					masterpassSdkInitialized: true,
				},
			};
		}
		catch (error) {
			// Hata durumunda FAILED response döndür (throw ETME)
			const errorMessage = error instanceof Error ? error.message : String(error);
			return createFailedResponse('SDK', `Masterpass provider initialization failed: ${errorMessage}`, 'MASTERPASS_PROVIDER_INIT_ERROR', {
				responseCode: 'MASTERPASS_PROVIDER_INIT_ERROR',
				raw: error,
			}, { masterpassSdkInitialized: false });
		}
	}

	/**
	 * ResponseCode Mapping - TEK KAYNAK
	 *
	 * Masterpass responseCode'larını SDK status ve actionType'a map eder.
	 * Bu mapping TÜM SDK'da TEK KAYNAK olarak kullanılır.
	 *
	 * ⚠️ KRİTİK: Bu mapping değiştirilirse TÜM SDK etkilenir.
	 */
	/**
	 * ResponseCode'u SDK status ve actionType'a map eder.
	 *
	 * Mapping:
	 * - "0000" → SUCCESS, NONE
	 * - "5001" → ACTION_REQUIRED, BANK_OTP
	 * - "5008" → ACTION_REQUIRED, MASTERPASS_OTP
	 * - "5010" → ACTION_REQUIRED, THREE_D
	 * - diğer → FAILED, NONE
	 *
	 * @param responseCode - Masterpass responseCode
	 * @returns SDK status ve actionType
	 */
	function mapResponseCodeToSdkStatus(responseCode) {
		const code = String(responseCode || '').trim();
		if (code === '0000') {
			return {
				status: 'SUCCESS',
				actionType: 'NONE',
			};
		}
		if (code === '5001') {
			return {
				status: 'ACTION_REQUIRED',
				actionType: 'BANK_OTP',
			};
		}
		if (code === '5008') {
			return {
				status: 'ACTION_REQUIRED',
				actionType: 'MASTERPASS_OTP',
			};
		}
		if (code === '5010') {
			return {
				status: 'ACTION_REQUIRED',
				actionType: 'THREE_D',
			};
		}
		// Diğer tüm durumlar FAILED
		return {
			status: 'FAILED',
			actionType: 'NONE',
		};
	}

	/**
	 * Internal Masterpass card registration implementation.
	 * @internal
	 */
	function formatExceptionMessage(message, code) {
		const msg = message.toUpperCase();
		if (msg.includes('INVALID_ACCOUNT_KEY') || msg.includes('ACCOUNT_KEY_IN_TOKEN')) {
			return SDK_MESSAGES.INVALID_ACCOUNT_KEY;
		}
		if (msg.includes('CARD_ALREADY_EXISTS') || msg.includes('ALREADY_EXISTS')) {
			return SDK_MESSAGES.CARD_ALREADY_EXISTS;
		}
		if (msg.includes('INVALID_CARD') || msg.includes('CARD_NUMBER')) {
			return SDK_MESSAGES.INVALID_CARD_NUMBER;
		}
		if (msg.includes('INVALID_EXPIRY') || msg.includes('EXPIRY_DATE')) {
			return SDK_MESSAGES.INVALID_EXPIRY_DATE;
		}
		if (msg.includes('INVALID_CVV') || msg.includes('CVV')) {
			return SDK_MESSAGES.INVALID_CVV;
		}
		if (msg.includes('MISSING') || msg.includes('REQUIRED')) {
			return getMessage('MISSING_FIELD', message);
		}
		return message || SDK_MESSAGES.ADD_CARD_FAILED;
	}
	function formatExceptionCode(code) {
		const codeUpper = code.toUpperCase();
		if (codeUpper.includes('INVALID_ACCOUNT_KEY') || codeUpper.includes('ACCOUNT_KEY_IN_TOKEN')) {
			return SDK_MESSAGES.INVALID_ACCOUNT_KEY;
		}
		if (codeUpper.includes('CARD_ALREADY_EXISTS')) {
			return SDK_MESSAGES.CARD_ALREADY_EXISTS;
		}
		if (codeUpper.includes('INVALID_CARD')) {
			return SDK_MESSAGES.INVALID_CARD_INFO;
		}
		return getMessage('ADD_CARD_FAILED_WITH_CODE', code);
	}
	/**
	 * Internal card registration implementation.
	 * @internal
	 */
	async function addCardInternal(params) {
		try {
			const config = getConfig();
			if (!isSessionValid()) {
				return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.ACTION_HINT_START_SESSION });
			}
			if (typeof window === 'undefined') {
				return createFailedResponse('SDK', SDK_MESSAGES.BROWSER_REQUIRED, 'BROWSER_REQUIRED');
			}
			const masterpassToken = getMasterpassToken();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TOKEN, 'MISSING_TOKEN');
			}
			if (!params.userId || params.userId.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_USER_ID_CARD, 'MISSING_USER_ID');
			}
			if (!params.accountKey || params.accountKey.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_ACCOUNT_KEY, 'MISSING_ACCOUNT_KEY');
			}
			if (!params.accountAliasName || params.accountAliasName.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CARD_ALIAS, 'MISSING_CARD_ALIAS');
			}
			if (!params.cardHolderName || params.cardHolderName.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CARD_HOLDER_NAME, 'MISSING_CARD_HOLDER_NAME');
			}
			if (!params.cardNumber || params.cardNumber.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CARD_NUMBER, 'MISSING_CARD_NUMBER');
			}
			const cardNumberLength = (params.cardNumber ?? '').toString().replace(/\s/g, '').length;
			if (cardNumberLength < 13 || cardNumberLength > 19) {
				return createFailedResponse('SDK', getMessage('INVALID_CARD_NUMBER_FORMAT', cardNumberLength), 'INVALID_CARD_NUMBER_FORMAT');
			}
			if (!params.expiryDate || params.expiryDate.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_EXPIRY_DATE, 'MISSING_EXPIRY_DATE');
			}
			if (!/^\d{4}$/.test(params.expiryDate)) {
				return createFailedResponse('SDK', getMessage('INVALID_EXPIRY_DATE_FORMAT', params.expiryDate), 'INVALID_EXPIRY_DATE_FORMAT');
			}
			if (!params.cvv || params.cvv.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_CVV, 'MISSING_CVV');
			}
			if (!/^\d{3,4}$/.test(params.cvv)) {
				return createFailedResponse('SDK', getMessage('INVALID_CVV_FORMAT', params.cvv), 'INVALID_CVV_FORMAT');
			}
			if (!params.requestReferenceNumber || params.requestReferenceNumber.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_REQUEST_REFERENCE_NUMBER, 'MISSING_REQUEST_REFERENCE_NUMBER');
			}
			await loadMasterpassSdk();
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', 'Masterpass SDK not loaded', 'SDK_NOT_LOADED');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (!Masterpass.accountService || typeof Masterpass.accountService.addCard !== 'function') {
				return createFailedResponse('SDK', 'Masterpass SDK API mismatch: expected accountService.addCard.', 'API_MISMATCH');
			}
			// Masterpass'e sadece plain (ham) kart bilgisi; SDK şifreleme YAPMAZ
			const cardNumberPlain = (params.cardNumber ?? '').toString().replace(/\s/g, '');
			const exp = (params.expiryDate ?? '').toString();
			const mm = exp.substring(0, 2);
			const yy = exp.substring(2, 4);
			const expiryDateYYMM = `${yy}${mm}`;
			const masterpassParams = {
				token: masterpassToken,
				userId: params.userId,
				accountKey: params.accountKey,
				accountKeyType: params.accountKeyType || 'Msisdn',
				accountAliasName: params.accountAliasName,
				cardHolderName: params.cardHolderName,
				cardNumber: cardNumberPlain,
				expiryDate: expiryDateYYMM,
				cvv: params.cvv,
				requestReferenceNumber: params.requestReferenceNumber,
			};
			const maskedRequest = maskRequestPayload({
				...masterpassParams,
				token: '***',
				cardNumber: '***',
				cvv: '***',
			});
			logDebugFlow(config, {
				functionName: 'addCard',
				stepName: 'masterpass-sdk-request',
				requestPayload: maskedRequest,
			});
			let statusCode;
			let response;
			try {
				const result = await masterpassAddCard(masterpassParams);
				statusCode = result.statusCode;
				response = result.response;
			}
			catch (error) {
				statusCode = error?.statusCode || 400;
				response = error?.response || error;
				if (!response && error && typeof error === 'object') {
					response = error;
				}
			}
			logDebugFlow(config, {
				functionName: 'addCard',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: response,
			});
			const mpResponse = response || {};
			const mpResult = mpResponse?.result || mpResponse;
			if ((statusCode !== 200 && statusCode !== 202) || mpResponse?.exception) {
				const exception = mpResponse?.exception;
				const exceptionMessage = exception?.message;
				const exceptionCode = exception?.code;
				const exceptionDetails = exception?.details;
				if (exception && (exceptionMessage || exceptionCode)) {
					const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
					const mappedError = mapMasterpassError(mpResponse);
					let finalMessage;
					let finalCode;
					if (mappedError) {
						finalMessage = mappedError.message;
						finalCode = String(mappedError.code);
					}
					else if (exceptionMessage) {
						finalMessage = formatExceptionMessage(exceptionMessage, exceptionCode);
						finalCode = exceptionCode || (statusCode ? String(statusCode) : 'MASTERPASS_ERROR');
					}
					else if (exceptionCode) {
						finalMessage = formatExceptionCode(exceptionCode);
						finalCode = exceptionCode;
					}
					else {
						finalMessage = SDK_MESSAGES.ADD_CARD_FAILED;
						finalCode = statusCode ? String(statusCode) : 'MASTERPASS_ERROR';
					}
					const errorResponse = createFailedResponse('MASTERPASS', finalMessage, finalCode, {
						httpStatus: statusCode || 400,
						responseCode: finalCode,
						...(config.logLevel === 'debug' && { raw: mpResponse }),
					});
					const errorData = {};
					if (sessionId) {
						errorData.sessionId = sessionId;
					}
					if (exceptionCode) {
						errorData.errorCode = exceptionCode;
					}
					if (exceptionDetails) {
						errorData.errorDetails = exceptionDetails;
					}
					if (Object.keys(errorData).length > 0) {
						errorResponse.data = errorData;
					}
					logDebugFlow(config, {
						functionName: 'addCard',
						stepName: 'normalized-sdk-response',
						normalizedSdkResponse: errorResponse,
					});
					return errorResponse;
				}
			}
			const responseCode = mpResult?.responseCode
				|| mpResponse?.responseCode
				|| (statusCode ? String(statusCode) : '');
			const statusMapping = mapResponseCodeToSdkStatus(responseCode);
			// Eğer ACTION_REQUIRED ise, mapMasterpassError'ı atla (bunlar hata değil)
			// Sadece gerçek hata durumlarında mapMasterpassError kullan
			if (statusMapping.status !== 'ACTION_REQUIRED') {
				const mappedError = mapMasterpassError(mpResponse);
				if (mappedError) {
					const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
					const errorResponse = createFailedResponse('MASTERPASS', mappedError.message, String(mappedError.code), {
						httpStatus: statusCode || 400,
						responseCode: String(mappedError.code),
						...(config.logLevel === 'debug' && { raw: mpResponse }),
					});
					if (sessionId) {
						errorResponse.data = { sessionId };
					}
					logDebugFlow(config, {
						functionName: 'addCard',
						stepName: 'normalized-sdk-response',
						normalizedSdkResponse: errorResponse,
					});
					return errorResponse;
				}
			}
			if (statusMapping.status === 'SUCCESS') {
				// ✅ SUCCESS: Kart başarıyla eklendi
				const maskedPan = mpResult?.maskedPan || `**** **** **** ${params.cardNumber.slice(-4)}`;
				const bin = params.cardNumber.slice(0, 6);
				const last4 = params.cardNumber.slice(-4);
				const maskedCard = maskCardNumberNewFormat(params.cardNumber);
				const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
				const successResponse = createSuccessResponse('MASTERPASS', {
					...(sessionId && { sessionId }),
					cardAlias: mpResult?.cardAlias || mpResult?.accountAliasName || params.accountAliasName,
					maskedCard,
					token: mpResult?.token || mpResult?.cardAlias,
				}, SDK_MESSAGES.CARD_ADDED_SUCCESS, {
					httpStatus: statusCode || 200,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'addCard',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: successResponse,
				});
				return successResponse;
			}
			else if (statusMapping.status === 'ACTION_REQUIRED' && statusMapping.actionType === 'BANK_OTP') {
				const otpToken = mpResult?.token || mpResponse?.token;
				const retrievalReferenceNumber = mpResult?.retrievalReferenceNumber || mpResponse?.retrievalReferenceNumber;
				const description = SDK_MESSAGES.BANK_OTP_REQUIRED;
				const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'BANK_OTP', description, {
					...(sessionId && { sessionId }),
					token: otpToken,
					...(retrievalReferenceNumber && { retrievalReferenceNumber }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'addCard',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else if (statusMapping.status === 'ACTION_REQUIRED' && statusMapping.actionType === 'THREE_D') {
				const url3d = mpResult?.url3d || mpResponse?.url3d;
				const retrievalReferenceNumber = mpResult?.retrievalReferenceNumber || mpResponse?.retrievalReferenceNumber;
				const description = SDK_MESSAGES.THREE_D_REQUIRED;
				const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', '3D', description, {
					...(sessionId && { sessionId }),
					token: mpResult?.token,
					...(retrievalReferenceNumber && { retrievalReferenceNumber }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'addCard',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
					metadata: {
						note: '3D_REQUIRED - SDK does NOT redirect. Merchant UI must handle redirect.',
						hasUrl3d: !!url3d,
					},
				});
				return actionRequiredResponse;
			}
			else {
				const mappedError = mapMasterpassError(mpResponse);
				const rawMessage = mpResult?.description || mpResponse?.description || '';
				const errorMessage = mappedError
					? mappedError.message
					: (rawMessage || SDK_MESSAGES.ADD_CARD_FAILED);
				const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
				const failedResponse = createFailedResponse('MASTERPASS', errorMessage, mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'), {
					httpStatus: statusCode || 400,
					responseCode: mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'),
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				if (sessionId) {
					failedResponse.data = { sessionId };
				}
				logDebugFlow(config, {
					functionName: 'addCard',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
		}
		catch (error) {
			const config = getConfig();
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const exception = masterpassResponse?.exception;
			const exceptionMessage = exception?.message;
			const exceptionCode = exception?.code;
			const exceptionDetails = exception?.details;
			let errorMessage;
			let errorCode;
			const mappedError = mapMasterpassError(masterpassResponse);
			if (mappedError) {
				errorMessage = mappedError.message;
				errorCode = String(mappedError.code);
			}
			else if (exceptionMessage) {
				errorMessage = formatExceptionMessage(exceptionMessage);
				errorCode = String(exceptionCode || masterpassResponse?.statusCode || 'MASTERPASS_ERROR');
			}
			else if (exceptionCode) {
				errorMessage = formatExceptionCode(exceptionCode);
				errorCode = String(exceptionCode);
			}
			else if (masterpassResponse?.message && typeof masterpassResponse.message === 'string') {
				errorMessage = formatExceptionMessage(masterpassResponse.message);
				errorCode = String(masterpassResponse.statusCode || 'MASTERPASS_ERROR');
			}
			else {
				errorMessage = SDK_MESSAGES.ADD_CARD_FAILED;
				errorCode = 'SDK_ERROR';
			}
			if (exceptionCode) {
				errorCode = String(exceptionCode);
			}
			const httpStatus = error?.statusCode || masterpassResponse?.statusCode || 400;
			const sessionId = getSessionId() || getMasterpassSession()?.sessionId;
			const errorResponse = createFailedResponse('MASTERPASS', errorMessage, errorCode, {
				httpStatus: httpStatus,
				responseCode: errorCode,
				...(config.logLevel === 'debug' && { raw: masterpassResponse }),
			});
			// Data'ya detaylı bilgileri ekle
			const errorData = {};
			if (sessionId) {
				errorData.sessionId = sessionId;
			}
			if (exceptionCode) {
				errorData.errorCode = exceptionCode;
			}
			if (exceptionDetails) {
				errorData.errorDetails = exceptionDetails;
			}
			if (Object.keys(errorData).length > 0) {
				errorResponse.data = errorData;
			}
			logDebugFlow(config, {
				functionName: 'addCard',
				stepName: 'error-handling',
				normalizedSdkResponse: errorResponse,
				rawProviderResponse: masterpassResponse,
			});
			return errorResponse;
		}
	}

	/**
	 * Internal Masterpass merchant link/unlink and OTP implementation.
	 * @internal
	 */
	/**
	 * Internal merchant link implementation.
	 * @internal
	 */
	async function linkMerchantInternal(params) {
		try {
			const config = getConfig();
			if (!isSessionValid()) {
				return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.ACTION_HINT_START_SESSION });
			}
			if (typeof window === 'undefined') {
				return createFailedResponse('SDK', SDK_MESSAGES.BROWSER_REQUIRED, 'BROWSER_REQUIRED');
			}
			const masterpassToken = getMasterpassToken();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TOKEN, 'MISSING_TOKEN');
			}
			if (!isProviderInitialized('masterpass')) {
				return createFailedResponse('SDK', SDK_MESSAGES.PROVIDER_NOT_INITIALIZED, 'PROVIDER_NOT_INITIALIZED');
			}
			if (!params.accountKey || params.accountKey.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_ACCOUNT_KEY, 'MISSING_ACCOUNT_KEY');
			}
			await loadMasterpassSdk();
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', SDK_MESSAGES.SDK_NOT_LOADED, 'SDK_NOT_LOADED');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (!Masterpass.accountService || typeof Masterpass.accountService.linkToMerchant !== 'function') {
				return createFailedResponse('SDK', 'Masterpass SDK API mismatch: expected accountService.linkToMerchant.', 'API_MISMATCH');
			}
			const masterpassParams = {
				token: masterpassToken,
				accountKey: params.accountKey,
			};
			logDebugFlow(config, {
				functionName: 'linkMerchant',
				stepName: 'masterpass-sdk-request',
				requestPayload: { ...masterpassParams, token: '***' },
			});
			let statusCode;
			let response;
			try {
				const result = await masterpassLinkToMerchant(masterpassParams);
				statusCode = result.statusCode;
				response = result.response;
			}
			catch (error) {
				statusCode = error?.statusCode || 400;
				response = error?.response || error;
				if (!response && error && typeof error === 'object') {
					response = error;
				}
			}
			logDebugFlow(config, {
				functionName: 'linkMerchant',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: response,
			});
			const mpResponse = response || {};
			const mpResult = mpResponse?.result || mpResponse;
			const responseCode = mpResult?.responseCode
				|| mpResponse?.responseCode
				|| (statusCode ? String(statusCode) : '');
			// Exception handling
			if ((statusCode !== 200 && statusCode !== 202) || mpResponse?.exception) {
				const exception = mpResponse?.exception;
				const exceptionMessage = exception?.message;
				const exceptionCode = exception?.code;
				if (exception && (exceptionMessage || exceptionCode)) {
					const mappedError = mapMasterpassError(mpResponse);
					const finalMessage = mappedError
						? mappedError.message
						: (exceptionMessage || SDK_MESSAGES.OPERATION_FAILED);
					const finalCode = mappedError
						? String(mappedError.code)
						: (exceptionCode || (statusCode ? String(statusCode) : 'MASTERPASS_ERROR'));
					return createFailedResponse('MASTERPASS', finalMessage, finalCode, {
						httpStatus: statusCode || 400,
						responseCode: finalCode,
						...(config.logLevel === 'debug' && { raw: mpResponse }),
					});
				}
			}
			const statusMapping = mapResponseCodeToSdkStatus(responseCode);
			// Response code bazlı state machine
			if (responseCode === '0000') {
				// SUCCESS: Account başarıyla linklenmiş
				const successResponse = createSuccessResponse('MASTERPASS', {
					isAccountLinked: true,
					...(mpResult?.cards && { cards: mpResult.cards }),
					...(mpResult?.accountInformation && { accountInformation: mpResult.accountInformation }),
					...(mpResult?.token && { token: mpResult.token }),
				}, 'Account linked successfully', {
					httpStatus: statusCode || 200,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'linkMerchant',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: successResponse,
				});
				return successResponse;
			}
			else if (responseCode === '5008') {
				// ACTION_REQUIRED: Masterpass OTP REQUIRED
				const otpToken = mpResult?.token || mpResponse?.token;
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'MASTERPASS_OTP', SDK_MESSAGES.MASTERPASS_OTP_REQUIRED, {
					...(otpToken && { token: otpToken }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'linkMerchant',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else if (responseCode === '5001') {
				// ACTION_REQUIRED: BANK OTP REQUIRED
				const otpToken = mpResult?.token || mpResponse?.token;
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'BANK_OTP', SDK_MESSAGES.BANK_OTP_REQUIRED, {
					...(otpToken && { token: otpToken }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'linkMerchant',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else {
				// FAILED: Diğer durumlar
				const mappedError = mapMasterpassError(mpResponse);
				const rawMessage = mpResult?.description || mpResponse?.description || '';
				const errorMessage = mappedError
					? mappedError.message
					: (rawMessage || SDK_MESSAGES.OPERATION_FAILED);
				const failedResponse = createFailedResponse('MASTERPASS', errorMessage, mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'), {
					httpStatus: statusCode || 400,
					responseCode: mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'),
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'linkMerchant',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
		}
		catch (error) {
			const config = getConfig();
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const mappedError = mapMasterpassError(masterpassResponse);
			const errorMessage = mappedError
				? mappedError.message
				: (masterpassResponse?.message || SDK_MESSAGES.OPERATION_FAILED);
			const errorCode = mappedError
				? String(mappedError.code)
				: (masterpassResponse?.statusCode ? String(masterpassResponse.statusCode) : 'SDK_ERROR');
			const httpStatus = error?.statusCode || masterpassResponse?.statusCode || 400;
			const errorResponse = createFailedResponse('MASTERPASS', errorMessage, errorCode, {
				httpStatus: httpStatus,
				responseCode: errorCode,
				...(config.logLevel === 'debug' && { raw: masterpassResponse }),
			});
			logDebugFlow(config, {
				functionName: 'linkMerchant',
				stepName: 'error-handling',
				normalizedSdkResponse: errorResponse,
				rawProviderResponse: masterpassResponse,
			});
			return errorResponse;
		}
	}
	/**
	 * Internal OTP verify implementation.
	 * @internal
	 */
	async function verifyOtpInternal(params) {
		try {
			const config = getConfig();
			if (!isSessionValid()) {
				return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.ACTION_HINT_START_SESSION });
			}
			if (typeof window === 'undefined') {
				return createFailedResponse('SDK', SDK_MESSAGES.BROWSER_REQUIRED, 'BROWSER_REQUIRED');
			}
			const masterpassToken = getMasterpassToken();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TOKEN, 'MISSING_TOKEN');
			}
			if (!isProviderInitialized('masterpass')) {
				return createFailedResponse('SDK', SDK_MESSAGES.PROVIDER_NOT_INITIALIZED, 'PROVIDER_NOT_INITIALIZED');
			}
			if (!params.otpCode || params.otpCode.trim() === '') {
				return createFailedResponse('MASTERPASS', 'OTP code is required', 'MISSING_OTP_CODE', undefined, { field: 'otp' });
			}
			await loadMasterpassSdk();
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', SDK_MESSAGES.SDK_NOT_LOADED, 'SDK_NOT_LOADED');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (!Masterpass.verifyService || typeof Masterpass.verifyService.verifyOtp !== 'function') {
				return createFailedResponse('SDK', 'Masterpass SDK API mismatch: expected verifyService.verifyOtp.', 'API_MISMATCH');
			}
			const masterpassParams = {
				token: masterpassToken,
				otpCode: params.otpCode,
			};
			logDebugFlow(config, {
				functionName: 'verifyOtp',
				stepName: 'masterpass-sdk-request',
				requestPayload: { ...masterpassParams, token: '***', otpCode: '***' },
			});
			let statusCode;
			let response;
			try {
				const result = await masterpassVerifyOtp(masterpassParams);
				statusCode = result.statusCode;
				response = result.response;
			}
			catch (error) {
				statusCode = error?.statusCode || 400;
				response = error?.response || error;
				if (!response && error && typeof error === 'object') {
					response = error;
				}
			}
			logDebugFlow(config, {
				functionName: 'verifyOtp',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: response,
			});
			const mpResponse = response || {};
			const mpResult = mpResponse?.result || mpResponse;
			const responseCode = mpResult?.responseCode
				|| mpResponse?.responseCode
				|| (statusCode ? String(statusCode) : '');
			// OTP_IS_NOT_VALID kontrolü (responseCode veya exception içinde olabilir)
			if (mpResponse?.exception?.code === 'OTP_IS_NOT_VALID' ||
				responseCode === 'OTP_IS_NOT_VALID' ||
				mpResult?.responseCode === 'OTP_IS_NOT_VALID') {
				return createFailedResponse('MASTERPASS', 'OTP code is not valid', 'OTP_IS_NOT_VALID', {
					httpStatus: statusCode || 400,
					responseCode: 'OTP_IS_NOT_VALID',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				}, { isVerified: false, field: 'otp' });
			}
			// Exception handling
			if ((statusCode !== 200 && statusCode !== 202) || mpResponse?.exception) {
				const exception = mpResponse?.exception;
				const exceptionMessage = exception?.message;
				const exceptionCode = exception?.code;
				if (exception && (exceptionMessage || exceptionCode)) {
					const mappedError = mapMasterpassError(mpResponse);
					const finalMessage = mappedError
						? mappedError.message
						: (exceptionMessage || SDK_MESSAGES.OPERATION_FAILED);
					const finalCode = mappedError
						? String(mappedError.code)
						: (exceptionCode || (statusCode ? String(statusCode) : 'MASTERPASS_ERROR'));
					return createFailedResponse('MASTERPASS', finalMessage, finalCode, {
						httpStatus: statusCode || 400,
						responseCode: finalCode,
						...(config.logLevel === 'debug' && { raw: mpResponse }),
					}, { isVerified: false });
				}
			}
			// Response code bazlı state machine
			if (responseCode === '0000') {
				// SUCCESS: OTP doğrulandı
				const newToken = mpResult?.token || mpResponse?.token;
				// Token güncelle (eğer yeni token varsa)
				if (newToken && newToken !== masterpassToken) {
					setMasterpassToken(newToken);
				}
				const successResponse = createSuccessResponse('MASTERPASS', {
					isVerified: true,
					token: newToken || masterpassToken,
					...(mpResult?.terminalGroupId && { terminalGroupId: mpResult.terminalGroupId }),
					...(mpResult?.maskedCard && { maskedCard: mpResult.maskedCard }),
					...(mpResult?.cardUniqueNumber && { cardUniqueNumber: mpResult.cardUniqueNumber }),
					...(mpResult?.retrievalReferenceNumber && { retrievalReferenceNumber: mpResult.retrievalReferenceNumber }),
				}, 'OTP verified successfully', {
					httpStatus: statusCode || 200,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'verifyOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: successResponse,
				});
				return successResponse;
			}
			else if (responseCode === '5008') {
				// ACTION_REQUIRED: Masterpass OTP REQUIRED (yeni OTP gerekiyor)
				const otpToken = mpResult?.token || mpResponse?.token;
				// Token güncelle (eğer yeni token varsa)
				if (otpToken && otpToken !== masterpassToken) {
					setMasterpassToken(otpToken);
				}
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'MASTERPASS_OTP', SDK_MESSAGES.MASTERPASS_OTP_REQUIRED, {
					isVerified: false,
					...(otpToken && { token: otpToken }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'verifyOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else if (responseCode === '5001') {
				// ACTION_REQUIRED: BANK OTP REQUIRED
				const otpToken = mpResult?.token || mpResponse?.token;
				// Token güncelle (eğer yeni token varsa)
				if (otpToken && otpToken !== masterpassToken) {
					setMasterpassToken(otpToken);
				}
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'BANK_OTP', SDK_MESSAGES.BANK_OTP_REQUIRED, {
					isVerified: false,
					...(otpToken && { token: otpToken }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'verifyOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else {
				// FAILED: Diğer durumlar
				const mappedError = mapMasterpassError(mpResponse);
				const rawMessage = mpResult?.description || mpResponse?.description || '';
				const errorMessage = mappedError
					? mappedError.message
					: (rawMessage || SDK_MESSAGES.OPERATION_FAILED);
				const failedResponse = createFailedResponse('MASTERPASS', errorMessage, mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'), {
					httpStatus: statusCode || 400,
					responseCode: mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'),
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				}, { isVerified: false });
				logDebugFlow(config, {
					functionName: 'verifyOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
		}
		catch (error) {
			const config = getConfig();
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const mappedError = mapMasterpassError(masterpassResponse);
			const errorMessage = mappedError
				? mappedError.message
				: (masterpassResponse?.message || SDK_MESSAGES.OPERATION_FAILED);
			const errorCode = mappedError
				? String(mappedError.code)
				: (masterpassResponse?.statusCode ? String(masterpassResponse.statusCode) : 'SDK_ERROR');
			const httpStatus = error?.statusCode || masterpassResponse?.statusCode || 400;
			const errorResponse = createFailedResponse('MASTERPASS', errorMessage, errorCode, {
				httpStatus: httpStatus,
				responseCode: errorCode,
				...(config.logLevel === 'debug' && { raw: masterpassResponse }),
			}, { isVerified: false });
			logDebugFlow(config, {
				functionName: 'verifyOtp',
				stepName: 'error-handling',
				normalizedSdkResponse: errorResponse,
				rawProviderResponse: masterpassResponse,
			});
			return errorResponse;
		}
	}
	/**
	 * Internal OTP resend implementation.
	 * @internal
	 */
	async function resendOtpInternal() {
		try {
			const config = getConfig();
			if (!isSessionValid()) {
				return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.ACTION_HINT_START_SESSION });
			}
			if (typeof window === 'undefined') {
				return createFailedResponse('SDK', SDK_MESSAGES.BROWSER_REQUIRED, 'BROWSER_REQUIRED');
			}
			const masterpassToken = getMasterpassToken();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TOKEN, 'MISSING_TOKEN');
			}
			if (!isProviderInitialized('masterpass')) {
				return createFailedResponse('SDK', SDK_MESSAGES.PROVIDER_NOT_INITIALIZED, 'PROVIDER_NOT_INITIALIZED');
			}
			await loadMasterpassSdk();
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', SDK_MESSAGES.SDK_NOT_LOADED, 'SDK_NOT_LOADED');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (!Masterpass.verifyService || typeof Masterpass.verifyService.resendOtp !== 'function') {
				return createFailedResponse('SDK', 'Masterpass SDK API mismatch: expected verifyService.resendOtp.', 'API_MISMATCH');
			}
			const masterpassParams = {
				token: masterpassToken,
			};
			logDebugFlow(config, {
				functionName: 'resendOtp',
				stepName: 'masterpass-sdk-request',
				requestPayload: { ...masterpassParams, token: '***' },
			});
			let statusCode;
			let response;
			try {
				const result = await masterpassResendOtp(masterpassParams);
				statusCode = result.statusCode;
				response = result.response;
			}
			catch (error) {
				statusCode = error?.statusCode || 400;
				response = error?.response || error;
				if (!response && error && typeof error === 'object') {
					response = error;
				}
			}
			logDebugFlow(config, {
				functionName: 'resendOtp',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: response,
			});
			const mpResponse = response || {};
			const mpResult = mpResponse?.result || mpResponse;
			const responseCode = mpResult?.responseCode
				|| mpResponse?.responseCode
				|| (statusCode ? String(statusCode) : '');
			// TOKEN_ALREADY_USED kontrolü
			if (mpResponse?.exception?.code === 'TOKEN_ALREADY_USED' ||
				responseCode === 'TOKEN_ALREADY_USED' ||
				mpResult?.responseCode === 'TOKEN_ALREADY_USED') {
				return createFailedResponse('MASTERPASS', 'Token already used', 'TOKEN_ALREADY_USED', {
					httpStatus: statusCode || 400,
					responseCode: 'TOKEN_ALREADY_USED',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
			}
			// Exception handling
			if ((statusCode !== 200 && statusCode !== 202) || mpResponse?.exception) {
				const exception = mpResponse?.exception;
				const exceptionMessage = exception?.message;
				const exceptionCode = exception?.code;
				if (exception && (exceptionMessage || exceptionCode)) {
					const mappedError = mapMasterpassError(mpResponse);
					const finalMessage = mappedError
						? mappedError.message
						: (exceptionMessage || SDK_MESSAGES.OPERATION_FAILED);
					const finalCode = mappedError
						? String(mappedError.code)
						: (exceptionCode || (statusCode ? String(statusCode) : 'MASTERPASS_ERROR'));
					return createFailedResponse('MASTERPASS', finalMessage, finalCode, {
						httpStatus: statusCode || 400,
						responseCode: finalCode,
						...(config.logLevel === 'debug' && { raw: mpResponse }),
					});
				}
			}
			// Response code bazlı state machine
			// 5001 veya 5008 → timer reset (SDK sadece state döner)
			if (responseCode === '5001' || responseCode === '5008') {
				const actionType = responseCode === '5008' ? 'MASTERPASS_OTP' : 'BANK_OTP';
				const otpToken = mpResult?.token || mpResponse?.token;
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', actionType, `OTP resent. ${actionType === 'MASTERPASS_OTP' ? SDK_MESSAGES.MASTERPASS_OTP_REQUIRED : SDK_MESSAGES.BANK_OTP_REQUIRED}`, {
					...(otpToken && { token: otpToken }),
				}, {
					httpStatus: statusCode || 202,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'resendOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else if (responseCode === '0000') {
				// SUCCESS: OTP resend başarılı
				const successResponse = createSuccessResponse('MASTERPASS', {
					success: true,
				}, 'OTP resent successfully', {
					httpStatus: statusCode || 200,
					responseCode: responseCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'resendOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: successResponse,
				});
				return successResponse;
			}
			else {
				// FAILED: Diğer durumlar
				const mappedError = mapMasterpassError(mpResponse);
				const rawMessage = mpResult?.description || mpResponse?.description || '';
				const errorMessage = mappedError
					? mappedError.message
					: (rawMessage || SDK_MESSAGES.OPERATION_FAILED);
				const failedResponse = createFailedResponse('MASTERPASS', errorMessage, mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'), {
					httpStatus: statusCode || 400,
					responseCode: mappedError ? String(mappedError.code) : (responseCode || 'UNKNOWN_ERROR'),
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'resendOtp',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
		}
		catch (error) {
			const config = getConfig();
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const mappedError = mapMasterpassError(masterpassResponse);
			const errorMessage = mappedError
				? mappedError.message
				: (masterpassResponse?.message || SDK_MESSAGES.OPERATION_FAILED);
			const errorCode = mappedError
				? String(mappedError.code)
				: (masterpassResponse?.statusCode ? String(masterpassResponse.statusCode) : 'SDK_ERROR');
			const httpStatus = error?.statusCode || masterpassResponse?.statusCode || 400;
			const errorResponse = createFailedResponse('MASTERPASS', errorMessage, errorCode, {
				httpStatus: httpStatus,
				responseCode: errorCode,
				...(config.logLevel === 'debug' && { raw: masterpassResponse }),
			});
			logDebugFlow(config, {
				functionName: 'resendOtp',
				stepName: 'error-handling',
				normalizedSdkResponse: errorResponse,
				rawProviderResponse: masterpassResponse,
			});
			return errorResponse;
		}
	}
	/**
	 * Internal get card list (account access) implementation.
	 * @internal
	 */
	async function getCardListInternal(params) {
		try {
			const config = getConfig();
			if (!isSessionValid()) {
				return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.ACTION_HINT_START_SESSION });
			}
			if (typeof window === 'undefined') {
				return createFailedResponse('SDK', SDK_MESSAGES.BROWSER_REQUIRED, 'BROWSER_REQUIRED');
			}
			const masterpassToken = getMasterpassToken();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TOKEN, 'MISSING_TOKEN');
			}
			if (!isProviderInitialized('masterpass')) {
				return createFailedResponse('SDK', SDK_MESSAGES.PROVIDER_NOT_INITIALIZED, 'PROVIDER_NOT_INITIALIZED');
			}
			if (!params.accountKey || params.accountKey.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_ACCOUNT_KEY, 'MISSING_ACCOUNT_KEY');
			}
			// userId ZORUNLU - Masterpass account access için gerekli
			if (!params.userId || params.userId.trim() === '') {
				return createFailedResponse('SDK', 'userId is required for Masterpass account access', 'MISSING_USER_ID');
			}
			await loadMasterpassSdk();
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', SDK_MESSAGES.SDK_NOT_LOADED, 'SDK_NOT_LOADED');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (!Masterpass.accountService || typeof Masterpass.accountService.accountAccess !== 'function') {
				return createFailedResponse('SDK', 'Masterpass SDK API mismatch: expected accountService.accountAccess.', 'API_MISMATCH');
			}
			const masterpassParams = {
				token: masterpassToken,
				accountKey: params.accountKey,
				accountKeyType: params.accountKeyType || 'Msisdn',
				userId: params.userId, // ZORUNLU - fallback yapılmaz
			};
			logDebugFlow(config, {
				functionName: 'getCardList',
				stepName: 'masterpass-sdk-request',
				requestPayload: { ...masterpassParams, token: '***' },
			});
			let statusCode;
			let response;
			try {
				const result = await masterpassAccountAccess(masterpassParams);
				statusCode = result.statusCode;
				response = result.response;
			}
			catch (error) {
				statusCode = error?.statusCode || 400;
				response = error?.response || error;
				if (!response && error && typeof error === 'object') {
					response = error;
				}
			}
			logDebugFlow(config, {
				functionName: 'getCardList',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: response,
			});
			const mpResponse = response || {};
			const mpResult = mpResponse?.result || mpResponse;
			// Response normalization - statusCode bazlı
			if (statusCode === 200 && mpResult?.accountInformation?.isAccountLinked === true) {
				// SUCCESS: Account linked ve kartlar var
				const successResponse = createSuccessResponse('MASTERPASS', {
					cards: mpResult?.cards || [],
					accountInformation: mpResult?.accountInformation || {},
				}, 'Cards fetched successfully', {
					httpStatus: statusCode,
					responseCode: '0000',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'getCardList',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: successResponse,
				});
				return successResponse;
			}
			else if (statusCode === 401) {
				// ACTION_REQUIRED: OTP GEREKİYOR
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'MASTERPASS_OTP', 'OTP verification required', {
					...(mpResult?.token && { token: mpResult.token }),
				}, {
					httpStatus: statusCode,
					responseCode: '401',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'getCardList',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else if (mpResponse?.exception?.code === 'ACCOUNT_NOT_LINKED_TO_MERCHANT') {
				// ACTION_REQUIRED: MERCHANT LINK GEREKİYOR
				const actionRequiredResponse = createActionRequiredResponse('MASTERPASS', 'MERCHANT_LINK_REQUIRED', 'Account is not linked to merchant', {}, {
					httpStatus: statusCode || 400,
					responseCode: 'ACCOUNT_NOT_LINKED_TO_MERCHANT',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'getCardList',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: actionRequiredResponse,
				});
				return actionRequiredResponse;
			}
			else if (mpResponse?.exception?.code === 'USER_NOT_FOUND') {
				// FAILED: USER NOT FOUND
				const failedResponse = createFailedResponse('MASTERPASS', 'User not found', 'USER_NOT_FOUND', {
					httpStatus: statusCode || 404,
					responseCode: 'USER_NOT_FOUND',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'getCardList',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
			else {
				// FAILED: DİĞER TÜM HATALAR
				const exception = mpResponse?.exception;
				const exceptionMessage = exception?.message || 'Masterpass error';
				const exceptionCode = exception?.code || 'UNKNOWN_ERROR';
				const mappedError = mapMasterpassError(mpResponse);
				const finalMessage = mappedError
					? mappedError.message
					: exceptionMessage;
				const finalCode = mappedError
					? String(mappedError.code)
					: exceptionCode;
				const failedResponse = createFailedResponse('MASTERPASS', finalMessage, finalCode, {
					httpStatus: statusCode || 400,
					responseCode: finalCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'getCardList',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
		}
		catch (error) {
			const config = getConfig();
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const mappedError = mapMasterpassError(masterpassResponse);
			const errorMessage = mappedError
				? mappedError.message
				: (masterpassResponse?.message || SDK_MESSAGES.OPERATION_FAILED);
			const errorCode = mappedError
				? String(mappedError.code)
				: (masterpassResponse?.statusCode ? String(masterpassResponse.statusCode) : 'SDK_ERROR');
			const httpStatus = error?.statusCode || masterpassResponse?.statusCode || 400;
			const errorResponse = createFailedResponse('MASTERPASS', errorMessage, errorCode, {
				httpStatus: httpStatus,
				responseCode: errorCode,
				...(config.logLevel === 'debug' && { raw: masterpassResponse }),
			});
			logDebugFlow(config, {
				functionName: 'getCardList',
				stepName: 'error-handling',
				normalizedSdkResponse: errorResponse,
				rawProviderResponse: masterpassResponse,
			});
			return errorResponse;
		}
	}
	/**
	 * Internal delete card implementation.
	 * @internal
	 */
	async function deleteCardInternal(params) {
		try {
			const config = getConfig();
			if (!isSessionValid()) {
				return createFailedResponse('SDK', SDK_MESSAGES.SESSION_EXPIRED, 'SESSION_EXPIRED', undefined, { actionHint: SDK_MESSAGES.ACTION_HINT_START_SESSION });
			}
			if (typeof window === 'undefined') {
				return createFailedResponse('SDK', SDK_MESSAGES.BROWSER_REQUIRED, 'BROWSER_REQUIRED');
			}
			const masterpassToken = getMasterpassToken();
			if (!masterpassToken || masterpassToken.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_TOKEN, 'MISSING_TOKEN');
			}
			if (!isProviderInitialized('masterpass')) {
				return createFailedResponse('SDK', SDK_MESSAGES.PROVIDER_NOT_INITIALIZED, 'PROVIDER_NOT_INITIALIZED');
			}
			if (!params.accountKey || params.accountKey.trim() === '') {
				return createFailedResponse('SDK', SDK_MESSAGES.MISSING_ACCOUNT_KEY, 'MISSING_ACCOUNT_KEY');
			}
			if (!params.cardAlias || params.cardAlias.trim() === '') {
				return createFailedResponse('SDK', 'Card alias is required', 'MISSING_CARD_ALIAS');
			}
			await loadMasterpassSdk();
			const Masterpass = window.Masterpass;
			if (!Masterpass) {
				return createFailedResponse('SDK', SDK_MESSAGES.SDK_NOT_LOADED, 'SDK_NOT_LOADED');
			}
			if (!isMasterpassInitialized()) {
				await ensureMasterpassInitialized();
			}
			if (!Masterpass.accountService || typeof Masterpass.accountService.removeCard !== 'function') {
				return createFailedResponse('SDK', 'Masterpass SDK API mismatch: expected accountService.removeCard.', 'API_MISMATCH');
			}
			const masterpassParams = {
				token: masterpassToken,
				accountKey: params.accountKey,
				cardAlias: params.cardAlias,
			};
			logDebugFlow(config, {
				functionName: 'deleteCard',
				stepName: 'masterpass-sdk-request',
				requestPayload: { ...masterpassParams, token: '***' },
			});
			let statusCode;
			let response;
			try {
				const result = await masterpassRemoveCard(masterpassParams);
				statusCode = result.statusCode;
				response = result.response;
			}
			catch (error) {
				statusCode = error?.statusCode || 400;
				response = error?.response || error;
				if (!response && error && typeof error === 'object') {
					response = error;
				}
			}
			logDebugFlow(config, {
				functionName: 'deleteCard',
				stepName: 'masterpass-sdk-response',
				rawProviderResponse: response,
			});
			const mpResponse = response || {};
			const mpResult = mpResponse?.result || mpResponse;
			const responseCode = mpResult?.responseCode
				|| mpResponse?.responseCode
				|| (statusCode ? String(statusCode) : '');
			// Response normalization - statusCode bazlı
			if (statusCode === 200) {
				// SUCCESS: Card deleted
				const successResponse = createSuccessResponse('MASTERPASS', {
					success: true,
				}, 'Card deleted successfully', {
					httpStatus: statusCode,
					responseCode: responseCode || '0000',
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'deleteCard',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: successResponse,
				});
				return successResponse;
			}
			else {
				// FAILED: Diğer durumlar
				const exception = mpResponse?.exception;
				const exceptionMessage = exception?.message || 'Card delete failed';
				const exceptionCode = exception?.code || 'DELETE_FAILED';
				const mappedError = mapMasterpassError(mpResponse);
				const finalMessage = mappedError
					? mappedError.message
					: exceptionMessage;
				const finalCode = mappedError
					? String(mappedError.code)
					: exceptionCode;
				const failedResponse = createFailedResponse('MASTERPASS', finalMessage, finalCode, {
					httpStatus: statusCode || 400,
					responseCode: finalCode,
					...(config.logLevel === 'debug' && { raw: mpResponse }),
				});
				logDebugFlow(config, {
					functionName: 'deleteCard',
					stepName: 'normalized-sdk-response',
					normalizedSdkResponse: failedResponse,
				});
				return failedResponse;
			}
		}
		catch (error) {
			const config = getConfig();
			let masterpassResponse = error?.response || null;
			if (!masterpassResponse && error && typeof error === 'object') {
				masterpassResponse = error;
			}
			const mappedError = mapMasterpassError(masterpassResponse);
			const errorMessage = mappedError
				? mappedError.message
				: (masterpassResponse?.message || SDK_MESSAGES.OPERATION_FAILED);
			const errorCode = mappedError
				? String(mappedError.code)
				: (masterpassResponse?.statusCode ? String(masterpassResponse.statusCode) : 'SDK_ERROR');
			const httpStatus = error?.statusCode || masterpassResponse?.statusCode || 400;
			const errorResponse = createFailedResponse('MASTERPASS', errorMessage, errorCode, {
				httpStatus: httpStatus,
				responseCode: errorCode,
				...(config.logLevel === 'debug' && { raw: masterpassResponse }),
			});
			logDebugFlow(config, {
				functionName: 'deleteCard',
				stepName: 'error-handling',
				normalizedSdkResponse: errorResponse,
				rawProviderResponse: masterpassResponse,
			});
			return errorResponse;
		}
	}

	/**
	 * Event Bus
	 *
	 * Provides a pub/sub mechanism for SDK events.
	 * Allows modules to communicate without tight coupling.
	 *
	 * TODO: Implement event bus with type-safe event handling
	 * TODO: Add event filtering and wildcard support
	 * TODO: Add event history/replay capability
	 * TODO: Add max listeners limit
	 */
	class EventBusImpl {
		constructor() {
			this.listeners = new Map();
		}
		on(event, callback) {
			if (!this.listeners.has(event)) {
				this.listeners.set(event, new Set());
			}
			this.listeners.get(event).add(callback);
			// Unsubscribe function
			return () => {
				this.listeners.get(event)?.delete(callback);
			};
		}
		once(event, callback) {
			const wrappedCallback = (data) => {
				callback(data);
				this.off(event, wrappedCallback);
			};
			return this.on(event, wrappedCallback);
		}
		off(event, callback) {
			if (!callback) {
				this.listeners.delete(event);
				return;
			}
			this.listeners.get(event)?.delete(callback);
		}
		emit(event, data) {
			const callbacks = this.listeners.get(event);
			if (callbacks) {
				callbacks.forEach((callback) => {
					try {
						callback(data);
					}
					catch (error) {
						// Event callback hatalarını yakala ama akışı bozma
						// Silent fail - no console output in production
					}
				});
			}
		}
		removeAllListeners(event) {
			if (event) {
				this.listeners.delete(event);
			}
			else {
				this.listeners.clear();
			}
		}
	}
	// Singleton event bus instance
	let eventBusInstance = null;
	/**
	 * Event bus instance'ını döner. Singleton pattern kullanır.
	 */
	function getEventBus() {
		if (!eventBusInstance) {
			eventBusInstance = new EventBusImpl();
		}
		return eventBusInstance;
	}

	/**
	 * Unified payment module.
	 */
	exports.PaymentStatus = void 0;
	(function (PaymentStatus) {
		PaymentStatus["STARTED"] = "STARTED";
		PaymentStatus["SUCCESS"] = "SUCCESS";
		PaymentStatus["FAILED"] = "FAILED";
	})(exports.PaymentStatus || (exports.PaymentStatus = {}));
	exports.PaymentStatusCode = void 0;
	(function (PaymentStatusCode) {
		PaymentStatusCode[PaymentStatusCode["STARTED"] = 1] = "STARTED";
		PaymentStatusCode[PaymentStatusCode["SUCCESS"] = 2] = "SUCCESS";
		PaymentStatusCode[PaymentStatusCode["FAILED"] = 3] = "FAILED";
	})(exports.PaymentStatusCode || (exports.PaymentStatusCode = {}));
	/**
	 * Posts unified payment result to backend.
	 */
	async function pushTransactionToBackend(unified, params) {
		try {
			const config = getConfig();
			const backendUrl = config.backendEndpointUrl || 'http://localhost:5000';
			const pushUrl = `${backendUrl}/payment/push-transaction`;
			if (!backendUrl) ;
			const status = unified.flowType === 'NON_SECURE' ? 'SUCCESS' : 'STARTED';
			const payload = {
				paymentReference: params.paymentReference,
				merchantId: params.merchantId,
				amount: params.amount,
				currency: params.currency,
				maskedPan: unified.maskedPan,
				bin: unified.bin,
				last4: unified.last4,
				expiryDate: unified.expiryDate,
				masterpassToken: unified.masterpassToken,
				flowType: unified.flowType,
				responseCode: unified.responseCode,
				redirectUrl: unified.url3d ?? null,
				status,
			};
			const response = await fetch(pushUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			if (!response.ok) {
				return null;
			}
			const responseData = await response.json().catch(() => ({}));
			return {
				paywallUniqueCode: responseData.paywallUniqueCode || '',
			};
		}
		catch (error) {
			return null;
		}
	}
	function mapBackendResponseToMasterpassSdk(backendResponse) {
		return {
			accountKey: backendResponse.accountKey,
			requestReferenceNo: backendResponse.requestReferenceNo,
			cardNumber: backendResponse.cardNumber,
			expiryDate: backendResponse.expiryDate,
			cvc: backendResponse.cvc,
			amount: backendResponse.amount,
			currencyCode: backendResponse.currencyCode,
			orderNo: backendResponse.orderNo,
			terminalGroupId: backendResponse.terminalGroupId,
			authenticationMethod: backendResponse.authenticationMethod,
			secure3DModel: backendResponse.secure3DModel,
			...(backendResponse.orderDetails && { ...backendResponse.orderDetails }),
			...(backendResponse.orderProductsDetails && { ...backendResponse.orderProductsDetails }),
			...(backendResponse.billDetails && { ...backendResponse.billDetails }),
			...(backendResponse.deliveryDetails && { ...backendResponse.deliveryDetails }),
			...(backendResponse.buyerDetails && { ...backendResponse.buyerDetails }),
			...(backendResponse.otherDetails && { ...backendResponse.otherDetails }),
		};
	}
	/**
	 * Masterpass SDK response'unu unified result formatına map eder.
	 *
	 * @param masterpassResponse - Masterpass SDK response
	 * @param flowType - Payment flow type
	 * @param paymentReference - Payment reference
	 * @returns PaywallPaymentResult - Unified result
	 */
	/**
	 * Masterpass SDK response'unu unified result formatına map eder.
	 *
	 * @param masterpassResponse - Masterpass SDK response
	 * @param params - Payment parametreleri (maskedPan, bin, last4, expiryDate için)
	 * @returns PaywallPaymentResult - Unified result
	 */
	function mapMasterpassSdkResponseToUnified(masterpassResponse, params) {
		const mp = masterpassResponse.response;
		const result = mp?.result || mp;
		const unified = {
			flowType: (masterpassResponse.statusCode === 202 ? 'THREE_D_SECURE' : 'NON_SECURE'),
			responseCode: mp?.responseCode || '',
			masterpassToken: result?.token || '',
			url3d: result?.url3d,
			url3dSuccess: result?.url3dSuccess,
			url3dFail: result?.url3dFail,
			maskedPan: params.maskedPan,
			bin: params.bin,
			last4: params.last4,
			expiryDate: params.expiryDate,
		};
		// FlowDirectable objesini set et (Masterpass SDK için)
		if (typeof window !== 'undefined' && masterpassResponse.statusCode === 202) {
			window.FlowDirectable = {
				uri: mp?.contentLocation || '',
				token: result?.token,
				url3d: result?.url3d,
				url3dSuccess: result?.url3dSuccess,
				url3dFail: result?.url3dFail,
			};
		}
		return unified;
	}
	async function startUnifiedPayment(params) {
		assertSdkInitialized();
		if (!params.tempToken || params.tempToken.trim() === '') {
			throw new Error('TempToken is required. ' +
				'Token must be obtained from merchant backend and provided as parameter. ' +
				'SDK does not generate tokens.');
		}
		const config = getConfig();
		try {
			if (!params.amount || params.amount <= 0) {
				throw new Error('amount must be greater than 0');
			}
			if (!params.currency) {
				throw new Error('currency is required');
			}
			if (!params.maskedPan || !params.bin || !params.last4 || !params.expiryDate) {
				throw new Error('maskedPan, bin, last4, and expiryDate are required');
			}
			if (!params.paymentReference) {
				throw new Error('paymentReference is required');
			}
			const backendUrl = config.backendEndpointUrl || 'http://localhost:5000';
			const paymentStartUrl = `${backendUrl}/checkout/payment/start`;
			let backendResponse;
			try {
				const response = await httpPost(paymentStartUrl, {
					amount: params.amount,
					currency: params.currency,
					maskedPan: params.maskedPan,
					bin: params.bin,
					last4: params.last4,
					expiryDate: params.expiryDate,
					paymentReference: params.paymentReference,
					merchantId: params.merchantId,
					customer: params.customer,
					order: params.order,
					masterpassOptions: params.masterpassOptions,
				});
				backendResponse = response.data;
			}
			catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				throw new Error(`Backend payment start failed: ${errorMessage}`);
			}
			const masterpassParams = mapBackendResponseToMasterpassSdk(backendResponse);
			const secure3DModel = params.masterpassOptions?.threeDSecure === true ? '3D' : 'NON_SECURE';
			masterpassParams.secure3DModel = secure3DModel;
			let masterpassResponse;
			try {
				if (secure3DModel === '3D') {
					masterpassResponse = await masterpassPayment(masterpassParams);
				}
				else {
					masterpassResponse = await masterpassDirectPayment(masterpassParams);
				}
				const mappedError = mapMasterpassError(masterpassResponse.response);
				if (mappedError) {
					return {
						status: 'FAILED',
						flowType: 'NON_SECURE',
						paywallUniqueCode: '',
						masterpassToken: '',
						maskedPan: params.maskedPan,
						bin: params.bin,
						last4: params.last4,
						expiryDate: params.expiryDate,
						responseCode: String(mappedError.code),
					};
				}
			}
			catch (error) {
				const errorResponse = error;
				const mappedError = mapMasterpassError(errorResponse?.response || errorResponse);
				if (mappedError) {
					return {
						status: 'FAILED',
						flowType: 'NON_SECURE',
						paywallUniqueCode: '',
						masterpassToken: '',
						maskedPan: params.maskedPan,
						bin: params.bin,
						last4: params.last4,
						expiryDate: params.expiryDate,
						responseCode: String(mappedError.code),
					};
				}
				throw new Error(`Masterpass payment failed: ${error instanceof Error ? error.message : String(error)}`);
			}
			const unified = mapMasterpassSdkResponseToUnified(masterpassResponse, {
				maskedPan: params.maskedPan,
				bin: params.bin,
				last4: params.last4,
				expiryDate: params.expiryDate,
			});
			const pushResult = await pushTransactionToBackend(unified, {
				paymentReference: params.paymentReference,
				merchantId: params.merchantId || '', // Backward compatibility - deprecated
				amount: params.amount,
				currency: params.currency,
			});
			const finalResult = {
				status: unified.flowType === 'NON_SECURE' ? 'SUCCESS' : 'STARTED',
				flowType: unified.flowType,
				paywallUniqueCode: pushResult?.paywallUniqueCode || '',
				masterpassToken: unified.masterpassToken,
				...(unified.url3d && { redirectUrl: unified.url3d }),
				maskedPan: unified.maskedPan,
				bin: unified.bin,
				last4: unified.last4,
				expiryDate: unified.expiryDate,
				responseCode: unified.responseCode,
			};
			// Event emit
			try {
				const eventBus = getEventBus();
				if (finalResult.status === 'SUCCESS') {
					eventBus.emit('PaymentSuccess', {
						flowType: finalResult.flowType,
						paywallUniqueCode: finalResult.paywallUniqueCode,
					});
				}
				else if (finalResult.status === 'STARTED') {
					eventBus.emit('PaymentStarted', {
						flowType: finalResult.flowType,
						paywallUniqueCode: finalResult.paywallUniqueCode,
						redirectUrl: finalResult.redirectUrl,
					});
				}
			}
			catch {
				// Event emit hatası ödeme akışını etkilemez
			}
			return finalResult;
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Payment start failed: ${errorMessage}`);
		}
	}
	/**
	 * Polls 3D Secure payment result from backend.
	 */
	async function poll3DResult$1(params) {
		const config = getConfig();
		if (!config.backendEndpointUrl) {
			throw new Error('backendEndpointUrl is not configured. Cannot poll 3D result.');
		}
		const backendUrl = `${config.backendEndpointUrl}/final-state/${params.paywallUniqueCode}`;
		try {
			const response = await httpGet(backendUrl);
			if (response.status !== 200) {
				throw new Error(`Backend returned status ${response.status}`);
			}
			const backendData = response.data;
			const status = backendData.status === 'SUCCESS' ? 'SUCCESS' : 'STARTED';
			const flowType = backendData.flowType === 'THREE_D_SECURE' ? 'THREE_D_SECURE' : 'NON_SECURE';
			const result = {
				status,
				flowType,
				paywallUniqueCode: backendData.paywallUniqueCode,
				masterpassToken: backendData.masterpassToken || '',
				maskedPan: backendData.maskedPan || '',
				bin: backendData.bin || '',
				last4: backendData.last4 || '',
				expiryDate: backendData.expiryDate || '',
				responseCode: backendData.responseCode || '',
				...(backendData.redirectUrl && { redirectUrl: backendData.redirectUrl }),
			};
			// Event emit
			try {
				const eventBus = getEventBus();
				if (status === 'SUCCESS') {
					eventBus.emit('PaymentSuccess', {
						flowType,
						paywallUniqueCode: result.paywallUniqueCode,
					});
				}
			}
			catch {
				// Event emit hatası ödeme akışını etkilemez
			}
			// Log seviyesi config'ten kontrol edilir
			return result;
		}
		catch (error) {
			// Network hatası veya backend hatası
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Failed to poll 3D result: ${errorMessage}`);
		}
	}

	/**
	 * Masterpass Model
	 *
	 * Masterpass PSP için tüm tipler, enums ve interfaces.
	 */
	/**
	 * Ödeme durumu enum'u.
	 * Ödeme işleminin farklı aşamalarını temsil eder.
	 * Masterpass layer için kullanılır, unified layer'da PaymentStatus kullanılır.
	 */
	exports.PaymentStateV2 = void 0;
	(function (PaymentState) {
		PaymentState["CREATED"] = "CREATED";
		PaymentState["STARTED"] = "STARTED";
		PaymentState["SUCCESS"] = "SUCCESS";
		PaymentState["FAILED"] = "FAILED";
	})(exports.PaymentStateV2 || (exports.PaymentStateV2 = {}));
	/**
	 * Ödeme akış tipi enum'u.
	 * Ödeme işleminin hangi akışla yapılacağını belirler.
	 * Flow type yönetimini daha sade ve scalable hale getirmek için kullanılır.
	 */
	exports.PaymentFlowTypeV2 = void 0;
	(function (PaymentFlowType) {
		PaymentFlowType["NON_SECURE"] = "NON_SECURE";
		PaymentFlowType["THREE_D_SECURE"] = "THREE_D_SECURE";
	})(exports.PaymentFlowTypeV2 || (exports.PaymentFlowTypeV2 = {}));
	/**
	 * Masterpass API response code enum'u.
	 * Masterpass API'den dönen response code'ları temsil eder.
	 */
	exports.MasterpassResponseCode = void 0;
	(function (MasterpassResponseCode) {
		MasterpassResponseCode["SUCCESS"] = "00";
		MasterpassResponseCode["PENDING"] = "01";
		MasterpassResponseCode["FAILED"] = "99";
		MasterpassResponseCode["INVALID_REQUEST"] = "10";
		MasterpassResponseCode["AUTHENTICATION_FAILED"] = "20";
		MasterpassResponseCode["INSUFFICIENT_FUNDS"] = "30";
		MasterpassResponseCode["CARD_NOT_SUPPORTED"] = "40";
		MasterpassResponseCode["TIMEOUT"] = "50";
	})(exports.MasterpassResponseCode || (exports.MasterpassResponseCode = {}));

	/**
	 * Payment Polling Module
	 *
	 * 3D Secure ödeme sonuçlarını backend'den poll eden modül.
	 * Interval ile tekrar tekrar istek yaparak final state'i bekler.
	 */
	/**
	 * Backend response'u unified PaywallPaymentResult formatına map eder.
	 *
	 * @param backendData - Backend'den gelen response data
	 * @returns PaywallPaymentResult - Unified result formatı
	 */
	function mapBackendResponseToUnified(backendData) {
		// Backend status'u unified PaymentStatus'e map et
		let status;
		let statusCode;
		if (backendData.status === 'SUCCESS') {
			status = exports.PaymentStatus.SUCCESS;
			statusCode = exports.PaymentStatusCode.SUCCESS;
		}
		else if (backendData.status === 'FAILED') {
			status = exports.PaymentStatus.FAILED;
			statusCode = exports.PaymentStatusCode.FAILED;
		}
		else {
			// STARTED veya PENDING durumları
			status = exports.PaymentStatus.STARTED;
			statusCode = exports.PaymentStatusCode.STARTED;
		}
		// Backend flowType'ı PaymentFlowType'a map et
		const flowType = backendData.flowType === 'THREE_D_SECURE'
			? exports.PaymentFlowTypeV2.THREE_D_SECURE
			: exports.PaymentFlowTypeV2.NON_SECURE;
		// Unified result oluştur
		const result = {
			status: (status === exports.PaymentStatus.SUCCESS ? 'SUCCESS' : status === exports.PaymentStatus.FAILED ? 'FAILED' : 'STARTED'),
			statusCode: String(statusCode),
			flowType,
			// 3D poll sonucunda redirectUrl atlanır (artık yönlendirme yok)
			psp: backendData.psp,
			paymentReference: backendData.paymentReference,
			paywallUniqueCode: backendData.paywallUniqueCode,
			...(backendData.masterpassTransactionId && {
				masterpassTransactionId: backendData.masterpassTransactionId,
			}),
			...(backendData.errorMessage && { errorMessage: backendData.errorMessage }),
			...(backendData.maskedPan && { maskedPan: backendData.maskedPan }),
			...(backendData.bin && { bin: backendData.bin }),
			...(backendData.last4 && { last4: backendData.last4 }),
		};
		return result;
	}
	/**
	 * Tek bir polling isteği yapar.
	 *
	 * @param paywallUniqueCode - Paywall unique code
	 * @returns PaywallPaymentResult | null - Result veya null (hata durumunda)
	 */
	async function pollOnce(paywallUniqueCode) {
		const config = getConfig();
		if (!config.backendEndpointUrl) {
			throw new Error('backendEndpointUrl is not configured. Cannot poll 3D result.');
		}
		const backendUrl = `${config.backendEndpointUrl}/final-state/${paywallUniqueCode}`;
		try {
			const response = await httpGet(backendUrl);
			if (response.status !== 200) {
				// Non-200 response, retry için null döndür
				return null;
			}
			return mapBackendResponseToUnified(response.data);
		}
		catch (error) {
			// Network hatası veya diğer hatalar, retry için null döndür
			return null;
		}
	}
	/**
	 * 3D Secure ödeme sonucunu backend'den poll eder.
	 *
	 * Bu fonksiyon interval ile tekrar tekrar backend'e istek yaparak
	 * final state'i bekler. maxAttempts aşılırsa FAILED döndürür.
	 *
	 * Kullanım Senaryosu:
	 * 1. Kullanıcı `payment.start()` ile 3D Secure ödeme başlatır
	 * 2. `result.status === "STARTED"` ve `result.redirectUrl` dolu olur
	 * 3. Kullanıcı `redirectUrl`'e yönlendirilir ve 3D doğrulama yapar
	 * 4. Backend 3D sonucunu işler ve final state'i hazırlar
	 * 5. Bu fonksiyon ile backend'den final state poll edilir (interval ile)
	 *
	 * @param params - Poll parametreleri
	 * @param params.paywallUniqueCode - Paywall tarafından üretilen unique referans
	 * @param params.intervalMs - Polling interval süresi (ms), default: 2000ms
	 * @param params.maxAttempts - Maksimum deneme sayısı, default: 20
	 * @returns Promise<PaywallPaymentResult> - Unified payment result
	 *
	 * @example
	 * ```typescript
	 * // 3D Secure ödeme başlat
	 * const startResult = await PaywallJsSdk.payment.start({
	 *   // ... payment params
	 *   masterpassOptions: { threeDSecure: true }
	 * });
	 *
	 * // Eğer STARTED ise, kullanıcıyı redirectUrl'e yönlendir
	 * if (startResult.status === "STARTED" && startResult.redirectUrl) {
	 *   window.location.href = startResult.redirectUrl;
	 * }
	 *
	 * // 3D doğrulama sonrası, backend'den sonucu poll et (interval ile)
	 * const finalResult = await PaywallJsSdk.payment.poll3DResult({
	 *   paywallUniqueCode: startResult.paywallUniqueCode,
	 *   intervalMs: 2000,  // Her 2 saniyede bir kontrol et
	 *   maxAttempts: 20,   // Maksimum 20 deneme (40 saniye)
	 * });
	 *
	 * // Final result: SUCCESS, FAILED veya STARTED (hala pending)
	 * console.log(finalResult.status);
	 * ```
	 */
	async function poll3DResult(params) {
		const { paywallUniqueCode, intervalMs = 2000, maxAttempts = 20 } = params;
		const config = getConfig();
		if (!config.backendEndpointUrl) {
			throw new Error('backendEndpointUrl is not configured. Cannot poll 3D result.');
		}
		let attempt = 0;
		while (attempt < maxAttempts) {
			attempt++;
			// Polling isteği yap
			const result = await pollOnce(paywallUniqueCode);
			if (result) {
				// Başarılı response alındı
				const isFinalState = result.status === 'SUCCESS' ||
					result.status === 'FAILED';
				if (isFinalState) {
					// Final state (SUCCESS veya FAILED), polling'i durdur
					return result;
				}
			}
			if (attempt < maxAttempts) {
				await new Promise(resolve => setTimeout(resolve, intervalMs));
			}
		}
		// maxAttempts aşıldı, FAILED döndür
		// Timeout durumu için FAILED result döndür
		const timeoutResult = {
			status: 'FAILED',
			statusCode: String(exports.PaymentStatusCode.FAILED),
			flowType: exports.PaymentFlowTypeV2.THREE_D_SECURE,
			psp: 'MASTERPASS',
			paymentReference: '', // Backend'den alınamadı
			paywallUniqueCode,
			errorMessage: `Polling timeout: Maximum attempts (${maxAttempts}) exceeded`,
		};
		return timeoutResult;
	}

	/**
	 * Transaction Record Model
	 *
	 * PaywallJsSdk unified payment result'larını DB'ye kaydetmek için kullanılan model.
	 * Backend bu modeli kullanarak transactions tablosuna insert yapar.
	 * UI, raporlama ve reconciliation bu veriyi okur.
	 */
	/**
	 * PaywallPaymentResult'dan TransactionRecord'a mapping helper fonksiyonu
	 *
	 * @param result - PaywallPaymentResult
	 * @param params - MasterpassStartPaymentParams (amount, currency, installment, bin, last4, maskedPan için)
	 * @returns TransactionRecord
	 */
	function mapPaymentResultToTransactionRecord(result, params) {
		return {
			paymentReference: result.paymentReference,
			paywallUniqueCode: result.paywallUniqueCode,
			psp: result.psp,
			status: result.status,
			statusCode: result.statusCode,
			flowType: result.flowType,
			amount: params.amount,
			currency: params.currency,
			installmentCount: params.installment ?? null,
			bin: params.bin || null,
			last4: params.last4 || null,
			maskedPan: params.maskedPan || null,
			masterpassTransactionId: result.masterpassTransactionId ?? null,
			errorMessage: result.errorMessage ?? null,
		};
	}
	/**
	 * TEST SCENARIOS (Yorum)
	 *
	 * Case 1: 3D STARTED
	 * {
	 *   paymentReference: 'PAY-12345',
	 *   paywallUniqueCode: 'UNIQUE-001',
	 *   psp: 'MASTERPASS',
	 *   status: PaymentStatus.STARTED,
	 *   statusCode: PaymentStatusCode.STARTED,
	 *   flowType: PaymentFlowType.THREE_D_SECURE,
	 *   amount: 100.00,
	 *   currency: 'TRY',
	 *   installmentCount: 1,
	 *   bin: '460345',
	 *   last4: '1234',
	 *   maskedPan: '**** **** **** 1234',
	 *   masterpassTransactionId: 'MP-TXN-001',
	 *   errorMessage: null
	 * }
	 *
	 * Case 2: 3D SUCCESS
	 * {
	 *   paymentReference: 'PAY-12345',
	 *   paywallUniqueCode: 'UNIQUE-001',
	 *   psp: 'MASTERPASS',
	 *   status: PaymentStatus.SUCCESS,
	 *   statusCode: PaymentStatusCode.SUCCESS,
	 *   flowType: PaymentFlowType.THREE_D_SECURE,
	 *   amount: 100.00,
	 *   currency: 'TRY',
	 *   installmentCount: 1,
	 *   bin: '460345',
	 *   last4: '1234',
	 *   maskedPan: '**** **** **** 1234',
	 *   masterpassTransactionId: 'MP-TXN-001',
	 *   errorMessage: null
	 * }
	 *
	 * Case 3: 3D FAILED
	 * {
	 *   paymentReference: 'PAY-12345',
	 *   paywallUniqueCode: 'UNIQUE-001',
	 *   psp: 'MASTERPASS',
	 *   status: PaymentStatus.FAILED,
	 *   statusCode: PaymentStatusCode.FAILED,
	 *   flowType: PaymentFlowType.THREE_D_SECURE,
	 *   amount: 100.00,
	 *   currency: 'TRY',
	 *   installmentCount: 1,
	 *   bin: '460345',
	 *   last4: '1234',
	 *   maskedPan: '**** **** **** 1234',
	 *   masterpassTransactionId: 'MP-TXN-001',
	 *   errorMessage: '3D Secure authentication failed'
	 * }
	 *
	 * Case 4: NS SUCCESS (NonSecure Success)
	 * {
	 *   paymentReference: 'PAY-12346',
	 *   paywallUniqueCode: 'UNIQUE-002',
	 *   psp: 'MASTERPASS',
	 *   status: PaymentStatus.SUCCESS,
	 *   statusCode: PaymentStatusCode.SUCCESS,
	 *   flowType: PaymentFlowType.NON_SECURE,
	 *   amount: 200.00,
	 *   currency: 'TRY',
	 *   installmentCount: null,
	 *   bin: '460345',
	 *   last4: '5678',
	 *   maskedPan: '**** **** **** 5678',
	 *   masterpassTransactionId: 'MP-TXN-002',
	 *   errorMessage: null
	 * }
	 *
	 * Case 5: NS FAILED (NonSecure Failed)
	 * {
	 *   paymentReference: 'PAY-12347',
	 *   paywallUniqueCode: 'UNIQUE-003',
	 *   psp: 'MASTERPASS',
	 *   status: PaymentStatus.FAILED,
	 *   statusCode: PaymentStatusCode.FAILED,
	 *   flowType: PaymentFlowType.NON_SECURE,
	 *   amount: 150.00,
	 *   currency: 'TRY',
	 *   installmentCount: null,
	 *   bin: '460345',
	 *   last4: '9012',
	 *   maskedPan: '**** **** **** 9012',
	 *   masterpassTransactionId: 'MP-TXN-003',
	 *   errorMessage: 'Insufficient funds'
	 * }
	 */

		// Paywall ödeme orkestrasyon sistemi için JavaScript SDK
		// Masterpass SDK bundle içine gömülüdür
	const InternalService = {
			CardTokenization: (async () => {
				throw new Error('InternalService.CardTokenization is not implemented yet.');
			}),
		};
	// Masked payment init işlemi (DEPRECATED)
	async function initMaskedPaymentInternal(initParams, config) {
		try {
			const first6 = initParams.card.first8.slice(0, 6);
			const maskedCardNumber = `${first6}******${initParams.card.last4}`;
			const payload = {
				amount: initParams.amount,
				currency: initParams.currency,
				checkoutId: initParams.checkoutId,
				saleId: initParams.saleId,
				orderId: initParams.orderId,
				merchantId: initParams.merchantId || config.merchantId,
				terminalGroupId: initParams.terminalGroupId,
				// Masked card bilgileri (sadece bunlar gönderilir)
				maskedCardNumber,
				first8: initParams.card.first8,
				last4: initParams.card.last4,
				...(initParams.card.expireMonth && { expireMonth: initParams.card.expireMonth }),
				...(initParams.card.expireYear && { expireYear: initParams.card.expireYear }),
			};
			const maskedPayload = maskRequestPayload(payload);
			// Paywall'a POST isteği gönder (token HTTP client tarafından otomatik eklenir)
			// DEPRECATED: Bu endpoint artık kullanılmıyor, payment.init() kullanılmalı
			const initUrl = `${config.baseUrl}/checkout/payment/init`;
			const response = await httpPost(initUrl, payload);
			// Response'u parse et
			const responseData = response.data || response;
			const initResponseData = {
				success: true,
				status: responseData.status || responseData.state || 'CREATED',
				...(responseData.paymentId && { paymentId: responseData.paymentId }),
				...(responseData.checkoutId && { checkoutId: responseData.checkoutId }),
				...(responseData.uniqueCode && { uniqueCode: responseData.uniqueCode }),
				...(responseData.merchantUniqueCode && { merchantUniqueCode: responseData.merchantUniqueCode }),
				// Diğer meta alanları da ekle
				...(responseData.saleId && { saleId: responseData.saleId }),
				...(responseData.orderId && { orderId: responseData.orderId }),
			};
			// Response'u sakla (internal state)
			setInitResponse(initResponseData);
			return initResponseData;
		}
		catch (error) {
			const errorMessage = error instanceof Error ? error.message : String(error);
			throw new Error(`Payment init failed: ${errorMessage}`);
		}
	}
	/**
	 * Internal SDK implementation.
	 *
	 * ⚠️ INTERNAL USE ONLY - DO NOT EXPORT
	 *
	 * Bu obje SDK'nın internal implementation'ını içerir.
	 * Merchant tarafından DOĞRUDAN kullanılmamalıdır.
	 *
	 * @internal
	 */
	const _internal = {
		providers: {
			masterpass: {
				/**
				 * Masterpass provider init - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK init logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				init: () => initMasterpassProviderInternal(), // Parametresiz çağrı - token ve merchantId session state'inden alınır
				/**
				 * Masterpass provider add card - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK addCard logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				addCard: (params) => addCardInternal(params),
				/**
				 * Masterpass provider link merchant - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK linkToMerchant logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				linkMerchant: (params) => linkMerchantInternal(params),
				/**
				 * Masterpass provider verify OTP - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK verifyOtp logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				verifyOtp: (params) => verifyOtpInternal(params),
				/**
				 * Masterpass provider resend OTP - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK resendOtp logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				resendOtp: () => resendOtpInternal(),
				/**
				 * Masterpass provider get card list - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK accountAccess logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				getCardList: (params) => getCardListInternal(params),
				/**
				 * Masterpass provider delete card - INTERNAL IMPLEMENTATION.
				 *
				 * Gerçek Masterpass SDK removeCard logic'ini içerir.
				 * External API tarafından çağrılır.
				 *
				 * @internal
				 */
				deleteCard: (params) => deleteCardInternal(params),
			},
		},
	};
	/**
	 * PaywallJsSdk ana nesnesi.
	 * Tüm SDK fonksiyonlarına bu nesne üzerinden erişilir.
	 */
	const PaywallJsSdk = {
		/**
		 * Paywall SDK initialization (temptoken verify + optional Masterpass session).
		 *
		 * Backend'den alınan temptoken ile GET api/paywall/temptoken/sdk/verify çağrılır;
		 * cevaba göre SDK init edilir, includeMasterpassSession true ise Masterpass session state set edilir.
		 *
		 * @param config - environment, token (temptoken), includeMasterpassSession
		 * @returns SdkResponse - sdkInitialized, hasMasterpassSession, body (verify cevabı)
		 *
		 * @example
		 * ```typescript
		 * const result = await PaywallJsSdk.InitPaywallSdk({
		 *   environment: 'test',
		 *   token: 'TEMP_TOKEN_FROM_MERCHANT_BACKEND',
		 *   includeMasterpassSession: true,
		 * });
		 * ```
		 */
		async InitPaywallSdk(config) {
			try {
				if (!config.token || config.token.trim() === '') {
					return createFailedResponse('SDK', 'Token is required and cannot be empty. Please provide a valid temp token.', 'MISSING_TOKEN', undefined, {
						data: {
							environment: config.environment,
							sdkInitialized: false,
							hasMasterpassSession: false,
						},
					});
				}
				if (typeof config.includeMasterpassSession !== 'boolean') {
					return createFailedResponse('SDK', 'includeMasterpassSession is required and must be a boolean.', 'MISSING_INCLUDE_MASTERPASS_SESSION', undefined, {
						data: {
							environment: config.environment,
							sdkInitialized: false,
							hasMasterpassSession: false,
						},
					});
				}
				if (!config.environment || !['dev', 'test', 'prod'].includes(config.environment)) {
					return createFailedResponse('SDK', `Invalid environment: ${config.environment}. Must be 'dev', 'test', or 'prod'.`, 'INVALID_ENVIRONMENT', undefined, {
						data: {
							environment: config.environment,
							sdkInitialized: false,
							hasMasterpassSession: false,
						},
					});
				}
				const envConfig = resolveEnvironmentConfig(config.environment);
				const verifyUrl = `${envConfig.paymentApiBaseUrl}/api/paywall/temptoken/sdk/verify`;
				const response = await axios.get(verifyUrl, {
					headers: {
						token: config.token.trim(),
						includeMasterpassSession: String(config.includeMasterpassSession),
					},
					timeout: 10000,
				});
				const data = response.data;
				const body = data?.Body ?? data?.body;
				if (!body?.Token) {
					return createFailedResponse('PAYWALL', 'Verify response missing Body.Token.', 'VERIFY_RESPONSE_INVALID', undefined, {
						data: {
							environment: config.environment,
							sdkInitialized: false,
							hasMasterpassSession: false,
						},
					});
				}
				const masterpassValue = body.Masterpass ?? body.masterpass;
				if (config.includeMasterpassSession && (masterpassValue === null || masterpassValue === undefined)) {
					return createFailedResponse('PAYWALL', 'Could not init due to Masterpass object is null.', 'MASTERPASS_OBJECT_NULL', undefined, {
						data: {
							environment: config.environment,
							sdkInitialized: false,
							hasMasterpassSession: false,
						},
					});
				}
				const fullConfig = {
					environment: config.environment,
					token: body.Token.trim(),
				};
				initConfig(fullConfig);
				let hasMasterpassSessionResult = false;
				const masterpass = masterpassValue;
				if (masterpass?.SessionId && masterpass?.MasterpassToken) {
					setMasterpassSession({
						sessionId: masterpass.SessionId,
						sessionExpiryDate: masterpass.SessionExpiryDate ?? '',
						masterpassToken: masterpass.MasterpassToken,
						...(masterpass.MasterpassTerminalGroupId && { masterpassTerminalGroupId: masterpass.MasterpassTerminalGroupId }),
					});
					setSessionId(masterpass.SessionId);
					setMasterpassToken(masterpass.MasterpassToken);
					if (masterpass.MasterpassMerchantId) {
						setMasterpassMerchantId(masterpass.MasterpassMerchantId);
					}
					hasMasterpassSessionResult = true;
				}
				const responseBody = {
					...(body.TempTokenId !== undefined && { TempTokenId: body.TempTokenId }),
					...(body.Token && { Token: body.Token }),
					...(body.ExpiryDateTime !== undefined && { ExpiryDateTime: body.ExpiryDateTime }),
					...(body.Scope && { Scope: body.Scope }),
					...(hasMasterpassSessionResult && masterpass && {
						Masterpass: {
							...(masterpass.SessionId && { SessionId: masterpass.SessionId }),
							...(masterpass.SessionExpiryDate !== undefined && { SessionExpiryDate: masterpass.SessionExpiryDate }),
							...(masterpass.MasterpassToken && { MasterpassToken: masterpass.MasterpassToken }),
							...(masterpass.MasterpassMerchantId && { MasterpassMerchantId: masterpass.MasterpassMerchantId }),
							...(masterpass.MasterpassTerminalGroupId && { MasterpassTerminalGroupId: masterpass.MasterpassTerminalGroupId }),
							...(masterpass.UserId && { UserId: masterpass.UserId }),
							...(masterpass.UserPhone && { UserPhone: masterpass.UserPhone }),
							...(typeof masterpass.IsProd === 'boolean' && { IsProd: masterpass.IsProd }),
							...(typeof masterpass.IsTest === 'boolean' && { IsTest: masterpass.IsTest }),
							...(typeof masterpass.IsUat === 'boolean' && { IsUat: masterpass.IsUat }),
						},
					}),
				};
				return createSuccessResponse('SDK', {
					environment: config.environment,
					sdkInitialized: true,
					hasMasterpassSession: hasMasterpassSessionResult,
					body: responseBody,
				}, 'SDK initialized with Masterpass token verify successfully');
			}
			catch (error) {
				const errorMessage = error instanceof Error ? error.message : String(error);
				const axiosErr = error;
				const providerMeta = {
					...(axiosErr.response?.status != null && { httpStatus: axiosErr.response.status }),
					raw: axiosErr.response?.data ?? error,
				};
				return createFailedResponse('SDK', `InitPaywallSdk failed: ${errorMessage}`, 'INIT_WITH_MASTERPASS_TOKEN_ERROR', providerMeta, {
					data: {
						environment: config.environment,
						sdkInitialized: false,
						hasMasterpassSession: false,
					},
				});
			}
		},
		/**
		 * Unified payment giriş noktası.
		 * Şimdilik sadece Masterpass'e yönleniyor, ileride başka PSP'ler eklenebilir.
		 */
		payment: {
			/**
			 * Paywall tarafında "Ödeme oluşturuldu" (CREATED) kaydı açmak için kullanılır.
			 * Masked kart bilgisi ve ödeme tutarı ile payment init endpoint'ine istek atar (DEPRECATED).
			 *
			 * **NOT:**
			 * - Açık kart numarası (PAN) ve CVV bu fonksiyona VERİLMEMELİDİR.
			 * - Bu fonksiyon çağrılmadan önce mutlaka `PaywallJsSdk.InitPaywallSdk(config)` çağrılmış olmalıdır.
			 * - Sadece masked kart bilgileri kabul edilir: `first8`, `last4`, `expireMonth`, `expireYear`
			 *
			 * **PCI-DSS UYUM:**
			 * - `cardNumber`, `cvv`, `expiryDate` (tek string) gibi açık kart datası ASLA Paywall'a gönderilmez.
			 * - Sadece `maskedCardNumber`, `first8`, `last4`, `expireMonth`, `expireYear` gönderilir.
			 *
			 * @param initParams - Masked card info ve ödeme bilgileri
			 * @returns Promise<InitResponse> - Init response (paymentId, checkoutId, uniqueCode vb.)
			 * @throws Error - SDK initialize edilmemişse veya HTTP isteği başarısız olursa
			 *
			 * @example
			 * ```typescript
			 * // Önce SDK'yı initialize et
			 * await PaywallJsSdk.InitPaywallSdk(config);
			 *
			 * // Sonra masked payment init yap
			 * const initResponse = await PaywallJsSdk.payment.initMaskedPayment({
			 *   amount: 100.0,
			 *   currency: "TRY",
			 *   checkoutId: "CHECKOUT-001",
			 *   card: {
			 *     first8: "46034512",  // İlk 8 hane
			 *     last4: "1234",       // Son 4 hane
			 *     expireMonth: "12",   // MM formatında
			 *     expireYear: "26"     // YY formatında
			 *   }
			 * });
			 *
			 * console.log(initResponse.uniqueCode); // "PW-UNIQUE-CODE"
			 * ```
			 */
			/**
			 * @deprecated This function is deprecated. Use PaywallJsSdk.payment.init() instead.
			 * This function will be removed in a future version.
			 */
			initMaskedPayment: async (initParams) => {
				// SDK lifecycle guard - EN BAŞTA kontrol
				assertSdkInitialized();
				// Config al (assertSdkInitialized geçtiyse config de var)
				const config = getConfig();
				return await initMaskedPaymentInternal(initParams, config);
			},
			/**
			 * Payment init işlemi.
			 *
			 * **LIFECYCLE:**
			 * - Bu fonksiyon merchant tarafından manuel olarak çağrılır
			 * - Session oluşturulduktan sonra çalışır
			 * - assertSdkInitialized() kontrolü yapılır
			 *
			 * **TOKEN MANTIĞI:**
			 * - Token config.accessToken'dan otomatik alınır
			 * - SDK token üretmez, refresh etmez
			 *
			 * **ENDPOINT:**
			 * POST /api/paywall/masterpass/by/sdk/payment/init
			 *
			 * **HEADER:**
			 * Authorization: Bearer {accessToken} (config'den otomatik)
			 * Content-Type: application/json
			 *
			 * @param params - Payment init parametreleri
			 * @returns Promise<MasterpassPaymentInitResult> - Payment init sonucu
			 *
			 * @throws Error - SDK initialize edilmemişse veya session yoksa
			 *
			 * @example
			 * ```typescript
			 * // SDK + Masterpass session ile init
			 * const initResult = await PaywallJsSdk.InitPaywallSdk({
			 *   environment: 'test',
			 *   token: 'TEMP_TOKEN_FROM_MERCHANT_BACKEND',
			 *   includeMasterpassSession: true,
			 * });
			 * const sessionId = initResult.data?.body?.Masterpass?.SessionId;
			 *
			 * // Payment init yap
			 * const paymentInitResult = await PaywallJsSdk.payment.init({
			 *   sessionId,
			 *   paymentSource: PaymentSource.MANUAL_CARD,
			 *   force3D: false,
			 *   paymentDetail: {
			 *     amount: 100.0,
			 *     currencyId: 949,
			 *     merchantUniqueCode: 'MERCHANT-001',
			 *     trackingCode: 'TRACK-001',
			 *     successUrl: 'https://merchant.com/success',
			 *     failUrl: 'https://merchant.com/fail',
			 *     clientIp: '192.168.1.1',
			 *     installment: 1
			 *   },
			 *   card: {
			 *     cardBin: '460345',
			 *     cardMasked: '**** **** **** 1234'
			 *   },
			 *   cardData: {
			 *     cardNumber: '4603451234567890',
			 *     expiryDate: '1226',
			 *     cvv: '123'
			 *   },
			 *   products: [
			 *     {
			 *       productId: 'PROD-001',
			 *       productName: 'Product 1',
			 *       productAmount: 100.0
			 *     }
			 *   ]
			 * });
			 *
			 * if (paymentInitResult.threeDAddress) {
			 *   // 3D Secure redirect (SDK otomatik redirect yapmaz)
			 *   window.location.href = paymentInitResult.threeDAddress;
			 * }
			 * ```
			 */
			init: initPayment,
			/**
			 * Kayıtlı kart ile ödeme init işlemi.
			 *
			 * **LIFECYCLE:**
			 * - Bu fonksiyon merchant tarafından manuel olarak çağrılır
			 * - Session oluşturulduktan sonra çalışır
			 * - assertSdkInitialized() kontrolü yapılır
			 *
			 * **KAYITLI KART BİLGİLERİ:**
			 * - alias: Kart alias'ı (Masterpass'tan alınan)
			 * - maskedCard: Kartın maskeli numarası (örn: "460345******1234")
			 * - cardBin: Kartın BIN numarası (ilk 6 hane)
			 * - cardHolderName: Kart sahibi adı
			 *
			 * **TOKEN MANTIĞI:**
			 * - Token config.accessToken'dan otomatik alınır
			 * - SDK token üretmez, refresh etmez
			 *
			 * **ENDPOINT:**
			 * POST /api/paywall/masterpass/by/sdk/payment/init
			 *
			 * **HEADER:**
			 * Authorization: Bearer {accessToken} (config'den otomatik)
			 * Content-Type: application/json
			 *
			 * @param params - Kayıtlı kart ödeme init parametreleri
			 * @returns Promise<MasterpassPaymentInitResult> - Payment init sonucu
			 *
			 * @throws Error - SDK initialize edilmemişse veya session yoksa
			 *
			 * @example
			 * ```typescript
			 * // SDK + Masterpass session ile init
			 * const initResult = await PaywallJsSdk.InitPaywallSdk({
			 *   environment: 'test',
			 *   token: 'TEMP_TOKEN_FROM_MERCHANT_BACKEND',
			 *   includeMasterpassSession: true,
			 * });
			 * const sessionId = initResult.data?.body?.Masterpass?.SessionId;
			 *
			 * // Kayıtlı kart ile ödeme init yap
			 * const paymentInitResult = await PaywallJsSdk.payment.initWithRegisteredCard({
			 *   sessionId,
			 *   alias: 'CARD_ALIAS_123',
			 *   maskedCard: '460345******1234',
			 *   cardBin: '460345',
			 *   cardHolderName: 'John Doe',
			 *   force3D: false,
			 *   paymentDetail: {
			 *     amount: 100.0,
			 *     currencyId: 949,
			 *     merchantUniqueCode: 'MERCHANT-001',
			 *     trackingCode: 'TRACK-001',
			 *     successUrl: 'https://merchant.com/success',
			 *     failUrl: 'https://merchant.com/fail',
			 *     clientIp: '192.168.1.1',
			 *     installment: 1
			 *   },
			 *   products: [
			 *     {
			 *       productId: 'PROD-001',
			 *       productName: 'Product 1',
			 *       productAmount: 100.0
			 *     }
			 *   ]
			 * });
			 *
			 * if (paymentInitResult.threeDAddress) {
			 *   window.location.href = paymentInitResult.threeDAddress;
			 * }
			 * ```
			 */
			initWithRegisteredCard: async (params) => {
				// SDK lifecycle guard - EN BAŞTA kontrol
				assertSdkInitialized();
				// Kayıtlı kart için payment.init'i PaymentSource.REGISTERED_CARD ile çağır
				const response = await initPayment({
					sessionId: params.sessionId,
					paymentSource: exports.PaymentSource.REGISTERED_CARD,
					force3D: params.force3D ?? false,
					paymentDetail: params.paymentDetail,
					card: {
						cardAlias: params.alias,
						cardMasked: params.maskedCard,
						cardBin: params.cardBin,
					},
					cardData: {
						cardAlias: params.alias,
						cardNumber: params.alias, // Kayıtlı kart için alias aynı zamanda cardNumber olarak kullanılır (Masterpass alias/token formatı)
						cardHolderName: params.cardHolderName,
					},
					...(params.customer && { customer: params.customer }),
					products: params.products,
				});
				// SdkResponse'dan data'yı extract et
				if (!response.success || !response.data) {
					throw new Error(response.message || 'Payment initialization failed');
				}
				return response.data;
			},
			/**
			 * Masterpass payment init işlemi (deprecated).
			 *
			 * **DEPRECATED:** Use `payment.init()` instead.
			 *
			 * @deprecated Use payment.init() instead
			 */
			initMasterpassPayment: initPayment, // Deprecated, use init() instead
			registerAndPurchase: async (params) => {
				// SDK lifecycle guard - EN BAŞTA kontrol
				assertSdkInitialized();
				return await registerAndPurchase(params);
			},
			start: startUnifiedPayment,
			poll3DResult: poll3DResult, // Polling version (interval ile tekrar tekrar deneme)
			poll3DResultSingle: poll3DResult$1, // Single request version (backward compatibility)
		},
		/**
		 * External servisler için modül.
		 * Masterpass, Stripe, PayPal gibi dış servislerin entegrasyonları burada yer alır.
		 */
		ExternalService: {
			Masterpass: {
				AddCard: (params) => {
					return addCard(params);
				},
				/**
				 * **@internal @deprecated**
				 *
				 * Bu fonksiyon internal kullanım içindir ve deprecated'dir.
				 * Production'da `payment.init()` kullanılmalıdır.
				 *
				 * @deprecated Use `payment.init()` instead
				 * @internal
				 */
				StartPayment: (params) => {
					return startPayment(params);
				},
			},
		},
		/**
		 * Provider initialization modülü.
		 * Her provider'ın init fonksiyonları burada yer alır.
		 */
		providers: {
			/**
			 * Masterpass provider initialization - EXTERNAL API.
			 *
			 * **LIFECYCLE:**
			 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
			 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
			 * - Session'dan SONRA çağrılmalıdır
			 * - Merchant tarafından manuel olarak çağrılır
			 *
			 * **TOKEN & MERCHANT ID:**
			 * - Token ve merchantId parametre olarak VERİLMEZ
			 * - Session state'inden otomatik alınır (MasterpassToken, MasterpassMerchantId)
			 * - Session başlatılmadan çağrılırsa FAILED response döner
			 *
			 * **IMPLEMENTATION:**
			 * - Bu fonksiyon sadece guard + delegation yapar
			 * - Gerçek init logic internal katmanda (_internal.providers.masterpass.init)
			 *
			 * @returns Promise<SdkResponse> - Init sonucu
			 *
			 * @example
			 * ```typescript
			 * // 1) SDK core init
			 * await PaywallJsSdk.InitPaywallSdk({
			 *   environment: 'test',
			 *   token: 'TOKEN_FROM_MERCHANT_BACKEND',
			 * });
			 *
			 * // 2) Session başlat (MasterpassToken ve MasterpassMerchantId session'dan gelir)
			 * await PaywallJsSdk.InitPaywallSdk({
			 *   referenceCode: 'REF-001',
			 *   userId: 'USER_001',
			 *   userPhone: '+905551234567',
			 * });
			 *
			 * // 3) Masterpass provider init (parametre YOK - session'dan alınır)
			 * const providerInitResult = await PaywallJsSdk.providers.masterpass.init();
			 *
			 * if (providerInitResult.success) {
			 *   console.log('Masterpass provider initialized');
			 * }
			 * ```
			 */
			masterpass: {
				init: async () => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before provider init.',
							data: {
								masterpassSdkInitialized: false,
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before provider init.',
							data: {
								masterpassSdkInitialized: false,
							},
						};
					}
					// Guard: Session state'inde MasterpassToken ve MasterpassMerchantId var mı?
					const session = getMasterpassSession();
					if (!session || !session.masterpassToken) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							data: {
								masterpassSdkInitialized: false,
							},
						};
					}
					const masterpassToken = getMasterpassToken();
					const masterpassMerchantId = getMasterpassMerchantId();
					if (!masterpassToken || !masterpassMerchantId) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken or MasterpassMerchantId not found in session state. Make sure session was started successfully.',
							data: {
								masterpassSdkInitialized: false,
							},
						};
					}
					// Delegation: Internal implementation'ı çağır (session state'inden bilgileri alır)
					return _internal.providers.masterpass.init();
				},
				/**
				 * Masterpass provider add card - EXTERNAL API.
				 *
				 * **LIFECYCLE:**
				 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
				 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
				 * - Masterpass provider init edilmiş olmalıdır (PaywallJsSdk.providers.masterpass.init() çağrılmış olmalı)
				 * - Merchant tarafından manuel olarak çağrılır
				 *
				 * **TOKEN:**
				 * - Token parametre olarak VERİLMEZ
				 * - Session state'inden otomatik alınır (MasterpassToken)
				 * - Session başlatılmadan çağrılırsa FAILED response döner
				 *
				 * **IMPLEMENTATION:**
				 * - Bu fonksiyon sadece guard + delegation yapar
				 * - Gerçek addCard logic internal katmanda (_internal.providers.masterpass.addCard)
				 *
				 * **OTP & 3D:**
				 * - SDK OTP doğrulaması YAPMAZ
				 * - SDK 3D redirect YAPMAZ
				 * - SDK sadece state döner (ACTION_REQUIRED + actionType)
				 * - OTP doğrulaması ve 3D redirect merchant backend tarafından yapılır
				 *
				 * @param params - Kart ekleme parametreleri
				 * @returns Promise<SdkResponse> - Add card sonucu
				 *
				 * @example
				 * ```typescript
				 * // 1) SDK core init
				 * await PaywallJsSdk.InitPaywallSdk({
				 *   environment: 'test',
				 *   token: 'TOKEN_FROM_MERCHANT_BACKEND',
				 * });
				 *
				 * // 2) Session başlat
				 * await PaywallJsSdk.InitPaywallSdk({
				 *   referenceCode: 'REF-001',
				 *   userId: 'USER_001',
				 *   userPhone: '+905551234567',
				 * });
				 *
				 * // 3) Masterpass provider init
				 * await PaywallJsSdk.providers.masterpass.init();
				 *
				 * // 4) Kart ekle
				 * const addCardResult = await PaywallJsSdk.providers.masterpass.addCard({
				 *   userId: 'USER_001',
				 *   accountKey: '905551234567',
				 *   accountKeyType: 'Msisdn',
				 *   accountAliasName: 'My Card',
				 *   cardHolderName: 'John Doe',
				 *   cardNumber: '4111111111111111',
				 *   expiryDate: '1226', // MMYY formatında
				 *   cvv: '123',
				 *   requestReferenceNumber: 'REQ-001',
				 * });
				 *
				 * if (addCardResult.success) {
				 *   console.log('Card added successfully');
				 *   console.log(addCardResult.data?.cardAlias);
				 *   console.log(addCardResult.data?.maskedCard);
				 * } else if (addCardResult.status === 'ACTION_REQUIRED') {
				 *   if (addCardResult.actionType === 'BANK_OTP') {
				 *     // OTP gerekiyor - merchant backend'e gönder
				 *     console.log('OTP required:', addCardResult.data?.token);
				 *   } else if (addCardResult.actionType === 'THREE_D') {
				 *     // 3D gerekiyor - merchant UI redirect yapmalı
				 *     console.log('3D required:', addCardResult.data?.token);
				 *   }
				 * }
				 * ```
				 */
				addCard: async (params) => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before addCard.',
							providerMeta: {
								provider: 'SDK',
								httpStatus: 0,
								responseCode: 'SDK_NOT_INITIALIZED',
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before addCard.',
							providerMeta: {
								provider: 'SDK',
								httpStatus: 0,
								responseCode: 'SESSION_NOT_STARTED',
							},
						};
					}
					// Guard: Session state'inde MasterpassToken var mı?
					const masterpassToken = getMasterpassToken();
					if (!masterpassToken || masterpassToken.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							providerMeta: {
								provider: 'SDK',
								httpStatus: 0,
								responseCode: 'MISSING_TOKEN',
							},
						};
					}
					// Guard: Masterpass provider init edilmiş mi?
					if (!isProviderInitialized('masterpass')) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before addCard.',
							providerMeta: {
								provider: 'SDK',
								httpStatus: 0,
								responseCode: 'PROVIDER_NOT_INITIALIZED',
							},
						};
					}
					// Delegation: Internal implementation'ı çağır
					return _internal.providers.masterpass.addCard(params);
				},
				/**
				 * Masterpass provider link merchant - EXTERNAL API.
				 *
				 * **LIFECYCLE:**
				 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
				 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
				 * - Masterpass provider init edilmiş olmalıdır (PaywallJsSdk.providers.masterpass.init() çağrılmış olmalı)
				 * - Merchant tarafından manuel olarak çağrılır
				 *
				 * **TOKEN:**
				 * - Token parametre olarak VERİLMEZ
				 * - Session state'inden otomatik alınır (MasterpassToken)
				 *
				 * **OTP:**
				 * - SDK OTP doğrulaması YAPMAZ
				 * - SDK sadece state döner (ACTION_REQUIRED + actionType)
				 * - OTP doğrulaması merchant tarafından yapılır
				 *
				 * @param params - Merchant link parametreleri
				 * @returns Promise<SdkResponse> - Link merchant sonucu
				 *
				 * @example
				 * ```typescript
				 * const linkResult = await PaywallJsSdk.providers.masterpass.linkMerchant({
				 *   accountKey: '905551234567'
				 * });
				 *
				 * if (linkResult.success) {
				 *   console.log('Account linked successfully');
				 * } else if (linkResult.status === 'ACTION_REQUIRED') {
				 *   if (linkResult.actionType === 'MASTERPASS_OTP') {
				 *     // Masterpass OTP gerekiyor
				 *     console.log('OTP required:', linkResult.data?.token);
				 *   } else if (linkResult.actionType === 'BANK_OTP') {
				 *     // Bank OTP gerekiyor
				 *     console.log('Bank OTP required:', linkResult.data?.token);
				 *   }
				 * }
				 * ```
				 */
				linkMerchant: async (params) => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before linkMerchant.',
							providerMeta: {
								responseCode: 'SDK_NOT_INITIALIZED',
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before linkMerchant.',
							providerMeta: {
								responseCode: 'SESSION_NOT_STARTED',
							},
						};
					}
					// Guard: Session state'inde MasterpassToken var mı?
					const masterpassToken = getMasterpassToken();
					if (!masterpassToken || masterpassToken.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							providerMeta: {
								responseCode: 'MISSING_TOKEN',
							},
						};
					}
					// Guard: Masterpass provider init edilmiş mi?
					if (!isProviderInitialized('masterpass')) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before linkMerchant.',
							providerMeta: {
								responseCode: 'PROVIDER_NOT_INITIALIZED',
							},
						};
					}
					// Delegation: Internal implementation'ı çağır
					return _internal.providers.masterpass.linkMerchant(params);
				},
				/**
				 * Masterpass provider verify OTP - EXTERNAL API.
				 *
				 * **LIFECYCLE:**
				 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
				 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
				 * - Masterpass provider init edilmiş olmalıdır (PaywallJsSdk.providers.masterpass.init() çağrılmış olmalı)
				 * - Merchant tarafından manuel olarak çağrılır
				 *
				 * **TOKEN:**
				 * - Token parametre olarak VERİLMEZ
				 * - Session state'inden otomatik alınır (MasterpassToken)
				 * - OTP verify sonrası gelen token otomatik güncellenir
				 *
				 * @param params - OTP verify parametreleri
				 * @returns Promise<SdkResponse> - Verify OTP sonucu
				 *
				 * @example
				 * ```typescript
				 * const verifyResult = await PaywallJsSdk.providers.masterpass.verifyOtp({
				 *   otpCode: '123456'
				 * });
				 *
				 * if (verifyResult.success) {
				 *   console.log('OTP verified successfully');
				 *   console.log('Token:', verifyResult.data?.token);
				 * } else if (verifyResult.status === 'ACTION_REQUIRED') {
				 *   // Yeni OTP gerekiyor
				 *   console.log('New OTP required:', verifyResult.actionType);
				 * }
				 * ```
				 */
				verifyOtp: async (params) => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before verifyOtp.',
							providerMeta: {
								responseCode: 'SDK_NOT_INITIALIZED',
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before verifyOtp.',
							providerMeta: {
								responseCode: 'SESSION_NOT_STARTED',
							},
						};
					}
					// Guard: Session state'inde MasterpassToken var mı?
					const masterpassToken = getMasterpassToken();
					if (!masterpassToken || masterpassToken.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							providerMeta: {
								responseCode: 'MISSING_TOKEN',
							},
						};
					}
					// Guard: Masterpass provider init edilmiş mi?
					if (!isProviderInitialized('masterpass')) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before verifyOtp.',
							providerMeta: {
								responseCode: 'PROVIDER_NOT_INITIALIZED',
							},
						};
					}
					// Delegation: Internal implementation'ı çağır
					return _internal.providers.masterpass.verifyOtp(params);
				},
				/**
				 * Masterpass provider resend OTP - EXTERNAL API.
				 *
				 * **LIFECYCLE:**
				 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
				 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
				 * - Masterpass provider init edilmiş olmalıdır (PaywallJsSdk.providers.masterpass.init() çağrılmış olmalı)
				 * - Merchant tarafından manuel olarak çağrılır
				 *
				 * **TOKEN:**
				 * - Token parametre olarak VERİLMEZ
				 * - Session state'inden otomatik alınır (MasterpassToken)
				 *
				 * **TIMER:**
				 * - SDK timer reset YAPMAZ
				 * - SDK sadece state döner
				 * - Timer merchant sorumluluğundadır
				 *
				 * @returns Promise<SdkResponse> - Resend OTP sonucu
				 *
				 * @example
				 * ```typescript
				 * const resendResult = await PaywallJsSdk.providers.masterpass.resendOtp();
				 *
				 * if (resendResult.success) {
				 *   console.log('OTP resent successfully');
				 *   // Timer'ı reset et (merchant sorumluluğu)
				 * } else if (resendResult.status === 'ACTION_REQUIRED') {
				 *   // OTP resend edildi, yeni OTP gerekiyor
				 *   console.log('OTP resent, new OTP required:', resendResult.actionType);
				 * }
				 * ```
				 */
				resendOtp: async () => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before resendOtp.',
							providerMeta: {
								responseCode: 'SDK_NOT_INITIALIZED',
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before resendOtp.',
							providerMeta: {
								responseCode: 'SESSION_NOT_STARTED',
							},
						};
					}
					// Guard: Session state'inde MasterpassToken var mı?
					const masterpassToken = getMasterpassToken();
					if (!masterpassToken || masterpassToken.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							providerMeta: {
								responseCode: 'MISSING_TOKEN',
							},
						};
					}
					// Guard: Masterpass provider init edilmiş mi?
					if (!isProviderInitialized('masterpass')) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before resendOtp.',
							providerMeta: {
								responseCode: 'PROVIDER_NOT_INITIALIZED',
							},
						};
					}
					// Delegation: Internal implementation'ı çağır
					return _internal.providers.masterpass.resendOtp();
				},
				/**
				 * Masterpass provider get card list - EXTERNAL API.
				 *
				 * **LIFECYCLE:**
				 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
				 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
				 * - Masterpass provider init edilmiş olmalıdır (PaywallJsSdk.providers.masterpass.init() çağrılmış olmalı)
				 * - Merchant tarafından manuel olarak çağrılır
				 *
				 * **TOKEN:**
				 * - Token parametre olarak VERİLMEZ
				 * - Session state'inden otomatik alınır (MasterpassToken)
				 *
				 * **RESPONSE:**
				 * - SUCCESS: statusCode === 200 && isAccountLinked === true
				 * - ACTION_REQUIRED (OTP): statusCode === 401
				 * - ACTION_REQUIRED (MERCHANT_LINK): exception.code === 'ACCOUNT_NOT_LINKED_TO_MERCHANT'
				 * - FAILED: Diğer durumlar
				 *
				 * @param params - Get card list parametreleri
				 * @returns Promise<SdkResponse> - Get card list sonucu
				 *
				 * @example
				 * ```typescript
				 * const cardListResult = await PaywallJsSdk.providers.masterpass.getCardList({
				 *   accountKey: '905551234567',
				 *   accountKeyType: 'Msisdn',
				 *   userId: 'USER_001'
				 * });
				 *
				 * if (cardListResult.success) {
				 *   console.log('Cards:', cardListResult.data?.cards);
				 * } else if (cardListResult.status === 'ACTION_REQUIRED') {
				 *   if (cardListResult.actionType === 'MASTERPASS_OTP') {
				 *     // OTP gerekiyor
				 *   } else if (cardListResult.actionType === 'MERCHANT_LINK_REQUIRED') {
				 *     // Merchant link gerekiyor
				 *     await PaywallJsSdk.providers.masterpass.linkMerchant({ accountKey: '905551234567' });
				 *   }
				 * }
				 * ```
				 */
				getCardList: async (params) => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before getCardList.',
							providerMeta: {
								responseCode: 'SDK_NOT_INITIALIZED',
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before getCardList.',
							providerMeta: {
								responseCode: 'SESSION_NOT_STARTED',
							},
						};
					}
					// Guard: Session state'inde MasterpassToken var mı?
					const masterpassToken = getMasterpassToken();
					if (!masterpassToken || masterpassToken.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							providerMeta: {
								responseCode: 'MISSING_TOKEN',
							},
						};
					}
					// Guard: Masterpass provider init edilmiş mi?
					if (!isProviderInitialized('masterpass')) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before getCardList.',
							providerMeta: {
								responseCode: 'PROVIDER_NOT_INITIALIZED',
							},
						};
					}
					// Guard: userId zorunlu
					if (!params.userId || params.userId.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'userId is required for Masterpass account access',
							providerMeta: {
								responseCode: 'MISSING_USER_ID',
							},
						};
					}
					// Delegation: Internal implementation'ı çağır
					return _internal.providers.masterpass.getCardList(params);
				},
				/**
				 * Masterpass provider delete card - EXTERNAL API.
				 *
				 * **LIFECYCLE:**
				 * - SDK core init edilmiş olmalıdır (PaywallJsSdk.InitPaywallSdk() çağrılmış olmalı)
				 * - Session BAŞLATILMIŞ olmalıdır (InitPaywallSdk ile includeMasterpassSession: true kullanılmış olmalı)
				 * - Masterpass provider init edilmiş olmalıdır (PaywallJsSdk.providers.masterpass.init() çağrılmış olmalı)
				 * - Merchant tarafından manuel olarak çağrılır
				 *
				 * **TOKEN:**
				 * - Token parametre olarak VERİLMEZ
				 * - Session state'inden otomatik alınır (MasterpassToken)
				 *
				 * **UNLINK:**
				 * - SDK kart sayısına bakmaz
				 * - SDK "son kart mı?" kontrolü yapmaz
				 * - SDK unlink otomatik çağırmaz
				 * - Merchant isterse unlinkMerchant çağrısını AYRI yapar
				 *
				 * @param params - Delete card parametreleri
				 * @returns Promise<SdkResponse> - Delete card sonucu
				 *
				 * @example
				 * ```typescript
				 * const deleteResult = await PaywallJsSdk.providers.masterpass.deleteCard({
				 *   accountKey: '905551234567',
				 *   cardAlias: 'CARD_ALIAS_123'
				 * });
				 *
				 * if (deleteResult.success) {
				 *   console.log('Card deleted successfully');
				 *   // Merchant isterse unlinkMerchant çağrısını AYRI yapar
				 * }
				 * ```
				 */
				deleteCard: async (params) => {
					// EXTERNAL API: Sadece guard + delegation
					// Guard: SDK core init kontrolü
					if (!isSdkInitialized()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'SDK core must be initialized first. Call PaywallJsSdk.InitPaywallSdk() before deleteCard.',
							providerMeta: {
								responseCode: 'SDK_NOT_INITIALIZED',
							},
						};
					}
					// Guard: Session başlatılmış mı?
					if (!hasMasterpassSession()) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Session must be started first. Use InitPaywallSdk with includeMasterpassSession: true before deleteCard.',
							providerMeta: {
								responseCode: 'SESSION_NOT_STARTED',
							},
						};
					}
					// Guard: Session state'inde MasterpassToken var mı?
					const masterpassToken = getMasterpassToken();
					if (!masterpassToken || masterpassToken.trim() === '') {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'MasterpassToken not found in session state. Make sure session was started successfully.',
							providerMeta: {
								responseCode: 'MISSING_TOKEN',
							},
						};
					}
					// Guard: Masterpass provider init edilmiş mi?
					if (!isProviderInitialized('masterpass')) {
						return {
							success: false,
							status: 'FAILED',
							source: 'SDK',
							message: 'Masterpass provider must be initialized first. Call PaywallJsSdk.providers.masterpass.init() before deleteCard.',
							providerMeta: {
								responseCode: 'PROVIDER_NOT_INITIALIZED',
							},
						};
					}
					// Delegation: Internal implementation'ı çağır
					return _internal.providers.masterpass.deleteCard(params);
				},
			},
		},
		/**
		 * Paywall'un kendi internal servisleri.
		 * Kart tokenizasyonu, internal ödeme akışları gibi fonksiyonlar burada yer alır.
		 */
		InternalService,
		/**
		 * Utility fonksiyonları.
		 */
		utils: {
			// Utility functions will be added here if needed
		},
	};

	exports.PaywallJsSdk = PaywallJsSdk;
	exports.default = PaywallJsSdk;
	exports.initMaskedPaymentInternal = initMaskedPaymentInternal;
	exports.mapPaymentResultToTransactionRecord = mapPaymentResultToTransactionRecord;
	exports.poll3DResult = poll3DResult;
	exports.poll3DResultSingle = poll3DResult$1;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.umd.js.map
