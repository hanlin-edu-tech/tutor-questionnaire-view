var app=function(){"use strict";function e(){}function n(e){return e()}function t(){return Object.create(null)}function i(e){e.forEach(n)}function o(e){return"function"==typeof e}function s(e,n){return e!=e?n==n:e!==n||e&&"object"==typeof e||"function"==typeof e}function u(e,n){e.appendChild(n)}function r(e,n,t){e.insertBefore(n,t||null)}function c(e){e.parentNode.removeChild(e)}function l(e,n){for(let t=0;t<e.length;t+=1)e[t]&&e[t].d(n)}function d(e){return document.createElement(e)}function a(e){return document.createTextNode(e)}function f(){return a(" ")}function m(){return a("")}function p(e,n,t,i){return e.addEventListener(n,t,i),()=>e.removeEventListener(n,t,i)}function h(e,n,t){null==t?e.removeAttribute(n):e.setAttribute(n,t)}function q(e,n){n=""+n,e.data!==n&&(e.data=n)}function x(e,n){(null!=n||e.value)&&(e.value=n)}function g(e,n,t,i){e.style.setProperty(n,t,i?"important":"")}let v;function $(e){v=e}function _(e){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(e)}const w=[],y=[],b=[],j=[],k=Promise.resolve();let E=!1;function B(e){b.push(e)}function O(){const e=new Set;do{for(;w.length;){const e=w.shift();$(e),M(e.$$)}for(;y.length;)y.pop()();for(let n=0;n<b.length;n+=1){const t=b[n];e.has(t)||(t(),e.add(t))}b.length=0}while(w.length);for(;j.length;)j.pop()();E=!1}function M(e){e.fragment&&(e.update(e.dirty),i(e.before_update),e.fragment.p(e.dirty,e.ctx),e.dirty=null,e.after_update.forEach(B))}const C=new Set;let L;function N(){L={r:0,c:[],p:L}}function A(){L.r||i(L.c),L=L.p}function I(e,n){e&&e.i&&(C.delete(e),e.i(n))}function U(e,n,t,i){if(e&&e.o){if(C.has(e))return;C.add(e),L.c.push(()=>{C.delete(e),i&&(t&&e.d(1),i())}),e.o(n)}}const F="undefined"!=typeof window?window:global;function S(e,t,s){const{fragment:u,on_mount:r,on_destroy:c,after_update:l}=e.$$;u.m(t,s),B(()=>{const t=r.map(n).filter(o);c?c.push(...t):i(t),e.$$.on_mount=[]}),l.forEach(B)}function T(e,n){e.$$.fragment&&(i(e.$$.on_destroy),e.$$.fragment.d(n),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={})}function D(e,n){e.$$.dirty||(w.push(e),E||(E=!0,k.then(O)),e.$$.dirty=t()),e.$$.dirty[n]=!0}function P(n,o,s,u,r,c){const l=v;$(n);const d=o.props||{},a=n.$$={fragment:null,ctx:null,props:c,update:e,not_equal:r,bound:t(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(l?l.$$.context:[]),callbacks:t(),dirty:null};let f=!1;var m;a.ctx=s?s(n,d,(e,t,i=t)=>(a.ctx&&r(a.ctx[e],a.ctx[e]=i)&&(a.bound[e]&&a.bound[e](i),f&&D(n,e)),t)):d,a.update(),f=!0,i(a.before_update),a.fragment=u(a.ctx),o.target&&(o.hydrate?a.fragment.l((m=o.target,Array.from(m.childNodes))):a.fragment.c(),o.intro&&I(n.$$.fragment),S(n,o.target,o.anchor),O()),$(l)}class z{$destroy(){T(this,1),this.$destroy=e}$on(e,n){const t=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return t.push(n),()=>{const e=t.indexOf(n);-1!==e&&t.splice(e,1)}}$set(){}}function H(e,n,t){const i=Object.create(e);return i.o=n[t],i.j=t,i}function J(e,n,t){const i=Object.create(e);return i.o=n[t],i.j=t,i}function G(e){var n,t,i,o,s,l,m,g,v,$,_,w,y,b,j,k,E=e.index+1+"",B=e.question.topic+"",O=!0===e.question.required&&R();return{c(){n=d("div"),t=d("div"),i=a(E),o=a(". "),s=a(B),l=f(),O&&O.c(),m=f(),g=d("div"),v=a("*請填寫這個欄位*"),_=f(),w=d("div"),y=d("textarea"),h(t,"class","form-topic"),h(g,"class","form-must hide"),h(g,"id",$="must"+e.index),h(y,"placeholder","請填入文字"),h(y,"name",b="qa"+e.index),h(y,"data-subject-answer","500"),h(w,"class","form-item"),h(n,"class","form-group"),h(n,"id",j="q"+e.index),k=p(y,"input",e.textarea_input_handler)},m(c,d){r(c,n,d),u(n,t),u(t,i),u(t,o),u(t,s),u(t,l),O&&O.m(t,null),u(n,m),u(n,g),u(g,v),u(n,_),u(n,w),u(w,y),x(y,e.questions[e.index].answer)},p(e,o){e.index&&E!==(E=o.index+1+"")&&q(i,E),e.question&&B!==(B=o.question.topic+"")&&q(s,B),!0===o.question.required?O||((O=R()).c(),O.m(t,null)):O&&(O.d(1),O=null),e.index&&$!==($="must"+o.index)&&h(g,"id",$),(e.questions||e.index)&&x(y,o.questions[o.index].answer),e.index&&b!==(b="qa"+o.index)&&h(y,"name",b),e.index&&j!==(j="q"+o.index)&&h(n,"id",j)},d(e){e&&c(n),O&&O.d(),k()}}}function K(e){var n,t,i,o,s,m,p,x,v,$,_,w,y,b,j,k,E,B=e.index+1+"",O=e.question.topic+"",M=!0===e.question.required&&V();let C=e.question.options,L=[];for(let n=0;n<C.length;n+=1)L[n]=W(H(e,C,n));return{c(){n=d("div"),t=d("div"),i=d("div"),o=a(B),s=a(". "),m=a(O),p=f(),M&&M.c(),x=f(),(v=d("div")).innerHTML='<div class="multiple-text">複選</div>',$=f(),_=d("div"),w=a("*請填寫這個欄位*"),b=f(),j=d("div");for(let e=0;e<L.length;e+=1)L[e].c();h(i,"class","form-topic"),h(v,"class","multiple"),g(t,"display","flex"),h(_,"class","form-must hide"),h(_,"id",y="must"+e.index),h(j,"class","form-item"),h(j,"id",k="multi"+e.index),h(n,"class","form-group"),h(n,"id",E="q"+e.index)},m(e,c){r(e,n,c),u(n,t),u(t,i),u(i,o),u(i,s),u(i,m),u(i,p),M&&M.m(i,null),u(t,x),u(t,v),u(n,$),u(n,_),u(_,w),u(n,b),u(n,j);for(let e=0;e<L.length;e+=1)L[e].m(j,null)},p(e,t){if(e.index&&B!==(B=t.index+1+"")&&q(o,B),e.question&&O!==(O=t.question.topic+"")&&q(m,O),!0===t.question.required?M||((M=V()).c(),M.m(i,null)):M&&(M.d(1),M=null),e.index&&y!==(y="must"+t.index)&&h(_,"id",y),e.index||e.question||e.questions){let n;for(C=t.question.options,n=0;n<C.length;n+=1){const i=H(t,C,n);L[n]?L[n].p(e,i):(L[n]=W(i),L[n].c(),L[n].m(j,null))}for(;n<L.length;n+=1)L[n].d(1);L.length=C.length}e.index&&k!==(k="multi"+t.index)&&h(j,"id",k),e.index&&E!==(E="q"+t.index)&&h(n,"id",E)},d(e){e&&c(n),M&&M.d(),l(L,e)}}}function Q(e){var n,t,i,o,s,m,p,x,g,v,$,_,w,y=e.index+1+"",b=e.question.topic+"",j=!0===e.question.required&&X();let k=e.question.options,E=[];for(let n=0;n<k.length;n+=1)E[n]=Y(J(e,k,n));return{c(){n=d("div"),t=d("div"),i=a(y),o=a(". "),s=a(b),m=f(),j&&j.c(),p=f(),x=d("div"),g=a("*請填寫這個欄位*"),$=f(),_=d("div");for(let e=0;e<E.length;e+=1)E[e].c();h(t,"class","form-topic"),h(x,"class","form-must hide"),h(x,"id",v="must"+e.index),h(_,"class","form-item"),h(n,"class","form-group"),h(n,"id",w="q"+e.index)},m(e,c){r(e,n,c),u(n,t),u(t,i),u(t,o),u(t,s),u(t,m),j&&j.m(t,null),u(n,p),u(n,x),u(x,g),u(n,$),u(n,_);for(let e=0;e<E.length;e+=1)E[e].m(_,null)},p(e,o){if(e.index&&y!==(y=o.index+1+"")&&q(i,y),e.question&&b!==(b=o.question.topic+"")&&q(s,b),!0===o.question.required?j||((j=X()).c(),j.m(t,null)):j&&(j.d(1),j=null),e.index&&v!==(v="must"+o.index)&&h(x,"id",v),e.index||e.question||e.questions){let n;for(k=o.question.options,n=0;n<k.length;n+=1){const t=J(o,k,n);E[n]?E[n].p(e,t):(E[n]=Y(t),E[n].c(),E[n].m(_,null))}for(;n<E.length;n+=1)E[n].d(1);E.length=k.length}e.index&&w!==(w="q"+o.index)&&h(n,"id",w)},d(e){e&&c(n),j&&j.d(),l(E,e)}}}function R(e){var n;return{c(){(n=d("span")).textContent="*",g(n,"color","#F28121")},m(e,t){r(e,n,t)},d(e){e&&c(n)}}}function V(e){var n;return{c(){(n=d("span")).textContent="*",g(n,"color","#F28121")},m(e,t){r(e,n,t)},d(e){e&&c(n)}}}function W(e){var n,t,i,o,s,l,m,x,g,v,$,_=e.o+"";return{c(){n=d("div"),t=d("input"),l=f(),m=d("label"),x=a(_),v=f(),e.$$binding_groups[0].push(t),h(t,"id",i="q"+e.index+"o"+e.j),h(t,"type","checkbox"),h(t,"name",o="multi"+e.index),t.__value=s=e.o,t.value=t.__value,h(m,"for",g="q"+e.index+"o"+e.j),h(n,"class","control"),$=p(t,"change",e.input_change_handler_1)},m(i,o){r(i,n,o),u(n,t),t.checked=~e.questions[e.index].answer.indexOf(t.__value),u(n,l),u(n,m),u(m,x),u(n,v)},p(e,n){(e.questions||e.index)&&(t.checked=~n.questions[n.index].answer.indexOf(t.__value)),e.index&&i!==(i="q"+n.index+"o"+n.j)&&h(t,"id",i),e.index&&o!==(o="multi"+n.index)&&h(t,"name",o),e.question&&s!==(s=n.o)&&(t.__value=s),t.value=t.__value,e.question&&_!==(_=n.o+"")&&q(x,_),e.index&&g!==(g="q"+n.index+"o"+n.j)&&h(m,"for",g)},d(i){i&&c(n),e.$$binding_groups[0].splice(e.$$binding_groups[0].indexOf(t),1),$()}}}function X(e){var n;return{c(){(n=d("span")).textContent="*",g(n,"color","#F28121")},m(e,t){r(e,n,t)},d(e){e&&c(n)}}}function Y(e){var n,t,i,o,s,l,m,x,g,v,$,_=e.o+"";return{c(){n=d("div"),t=d("input"),l=f(),m=d("label"),x=a(_),v=f(),e.$$binding_groups[0].push(t),h(t,"id",i="q"+e.index+"o"+e.j),h(t,"type","radio"),h(t,"name",o="single"+e.index),t.__value=s=e.o,t.value=t.__value,h(m,"for",g="q"+e.index+"o"+e.j),h(n,"class","control"),$=p(t,"change",e.input_change_handler)},m(i,o){r(i,n,o),u(n,t),t.checked=t.__value===e.questions[e.index].answer,u(n,l),u(n,m),u(m,x),u(n,v)},p(e,n){(e.questions||e.index)&&(t.checked=t.__value===n.questions[n.index].answer),e.index&&i!==(i="q"+n.index+"o"+n.j)&&h(t,"id",i),e.index&&o!==(o="single"+n.index)&&h(t,"name",o),e.question&&s!==(s=n.o)&&(t.__value=s),t.value=t.__value,e.question&&_!==(_=n.o+"")&&q(x,_),e.index&&g!==(g="q"+n.index+"o"+n.j)&&h(m,"for",g)},d(i){i&&c(n),e.$$binding_groups[0].splice(e.$$binding_groups[0].indexOf(t),1),$()}}}function Z(n){var t;function i(e,n){return"單選題"===n.question.type?Q:"多選題"===n.question.type?K:G}var o=i(0,n),s=o(n);return{c(){s.c(),t=m()},m(e,n){s.m(e,n),r(e,t,n)},p(e,n){o===(o=i(0,n))&&s?s.p(e,n):(s.d(1),(s=o(n))&&(s.c(),s.m(t.parentNode,t)))},i:e,o:e,d(e){s.d(e),e&&c(t)}}}function ee(e,n,t){let{questions:i,question:o,index:s}=n;const u=[[]];return e.$set=(e=>{"questions"in e&&t("questions",i=e.questions),"question"in e&&t("question",o=e.question),"index"in e&&t("index",s=e.index)}),{questions:i,question:o,index:s,input_change_handler:function(){i[s].answer=this.__value,t("questions",i),t("index",s)},input_change_handler_1:function(){i[s].answer=function(e){const n=[];for(let t=0;t<e.length;t+=1)e[t].checked&&n.push(e[t].__value);return n}(u[0]),t("questions",i),t("index",s)},textarea_input_handler:function(){i[s].answer=this.value,t("questions",i),t("index",s)},$$binding_groups:u}}class ne extends z{constructor(e){super(),P(this,e,ee,Z,s,["questions","question","index"])}}const{document:te}=F;function ie(e,n,t){const i=Object.create(e);return i.q=n[t],i.i=t,i}function oe(n){return{c(){te.title="問卷"},m:e,d:e}}function se(n){return te.title=n.template.name,{c:e,m:e,d:e}}function ue(n){var t;return{c(){t=a("loading")},m(e,n){r(e,t,n)},p:e,i:e,o:e,d(e){e&&c(t)}}}function re(e){var n,t,i,o,s,x,v,$,_,w,y,b,j,k,E,B,O,M=e.template.name+"",C=e.template.description+"";let L=e.template.questions,F=[];for(let n=0;n<L.length;n+=1)F[n]=ce(ie(e,L,n));const S=e=>U(F[e],1,1,()=>{F[e]=null});var T=!0===e.success&&le(e);return{c(){n=d("div"),t=d("div"),i=d("div"),o=a(M),s=f(),x=d("div"),v=a(C),$=f(),_=d("form"),w=d("div");for(let e=0;e<F.length;e+=1)F[e].c();y=f(),b=d("div"),(j=d("div")).textContent="送出",k=f(),T&&T.c(),E=m(),h(i,"class","form-title"),h(x,"class","form-content"),h(t,"class","alert"),h(w,"class","form-body"),h(j,"class","btn-send"),h(b,"class","row-btn"),g(b,"margin-bottom","10px"),h(_,"action",""),h(_,"id","form"),h(n,"class","container svelte-g34jtt"),O=p(j,"click",e.submit)},m(e,c){r(e,n,c),u(n,t),u(t,i),u(i,o),u(t,s),u(t,x),u(x,v),u(n,$),u(n,_),u(_,w);for(let e=0;e<F.length;e+=1)F[e].m(w,null);u(_,y),u(_,b),u(b,j),r(e,k,c),T&&T.m(e,c),r(e,E,c),B=!0},p(e,n){if(B&&!e.template||M===(M=n.template.name+"")||q(o,M),B&&!e.template||C===(C=n.template.description+"")||q(v,C),e.template||e.questions){let t;for(L=n.template.questions,t=0;t<L.length;t+=1){const i=ie(n,L,t);F[t]?(F[t].p(e,i),I(F[t],1)):(F[t]=ce(i),F[t].c(),I(F[t],1),F[t].m(w,null))}for(N(),t=L.length;t<F.length;t+=1)S(t);A()}!0===n.success?T?T.p(e,n):((T=le(n)).c(),T.m(E.parentNode,E)):T&&(T.d(1),T=null)},i(e){if(!B){for(let e=0;e<L.length;e+=1)I(F[e]);B=!0}},o(e){F=F.filter(Boolean);for(let e=0;e<F.length;e+=1)U(F[e]);B=!1},d(e){e&&c(n),l(F,e),e&&c(k),T&&T.d(e),e&&c(E),O()}}}function ce(e){var n,t=new ne({props:{question:e.q,index:e.i,questions:e.questions}});return{c(){t.$$.fragment.c()},m(e,i){S(t,e,i),n=!0},p(e,n){var i={};e.template&&(i.question=n.q),t.$set(i)},i(e){n||(I(t.$$.fragment,e),n=!0)},o(e){U(t.$$.fragment,e),n=!1},d(e){T(t,e)}}}function le(e){var n,t,i,o,s,l,a=e.template.finishMsg&&de(e);return{c(){n=d("div"),t=d("div"),i=d("div"),o=f(),(s=d("div")).textContent="送出成功",l=f(),a&&a.c(),h(i,"class","success-banner"),h(s,"class","success-text"),h(t,"class","modal-body"),h(n,"class","modal-success")},m(e,c){r(e,n,c),u(n,t),u(t,i),u(t,o),u(t,s),u(t,l),a&&a.m(t,null)},p(e,n){n.template.finishMsg?a?a.p(e,n):((a=de(n)).c(),a.m(t,null)):a&&(a.d(1),a=null)},d(e){e&&c(n),a&&a.d()}}}function de(e){var n,t,i=e.template.finishMsg+"";return{c(){n=d("div"),t=a(i),h(n,"class","success-content")},m(e,i){r(e,n,i),u(n,t)},p(e,n){e.template&&i!==(i=n.template.finishMsg+"")&&q(t,i)},d(e){e&&c(n)}}}function ae(e){var n,t,i,o,s,l;function a(e,n){return n.template?se:oe}var p=a(0,e),q=p(e),x=[re,ue],g=[];function v(e,n){return n.template?0:1}return o=v(0,e),s=g[o]=x[o](e),{c(){q.c(),n=m(),t=f(),i=d("div"),s.c(),h(i,"id","main"),h(i,"class","svelte-g34jtt")},m(e,s){q.m(te.head,null),u(te.head,n),r(e,t,s),r(e,i,s),g[o].m(i,null),l=!0},p(e,t){p!==(p=a(0,t))&&(q.d(1),(q=p(t))&&(q.c(),q.m(n.parentNode,n)));var u=o;(o=v(0,t))===u?g[o].p(e,t):(N(),U(g[u],1,1,()=>{g[u]=null}),A(),(s=g[o])||(s=g[o]=x[o](t)).c(),I(s,1),s.m(i,null))},i(e){l||(I(s),l=!0)},o(e){U(s),l=!1},d(e){q.d(e),c(n),e&&(c(t),c(i)),g[o].d()}}}function fe(e){document.getElementById("q"+e).classList.add("invalid"),document.getElementById("must"+e).classList.remove("hide")}function me(e,n,t){let i,o,s={started:null,finished:null,questions:[],template:"",finishMsg:"",callBackUrl:""},u=new Array;const r=window.location.search.substring(4,window.location.search.length);return _(async()=>{if("http:"===window.location.protocol){const e=window.location.href.split(":")[1];window.location.href=`https:${e}`}const e=window.location.hostname;let n="";"www.ehanlin.com.tw"===e&&(n="/tutor-questionnaire"),await fetch(`https://${e}${n}/questionnaire/templates/${r}`).then(e=>e.json()).then(e=>{s.started=new Date,s.template=r,s.callBackUrl=e.callBackUrl,s.finishMsg=e.finishMsg,t("template",i=e);const n=e.questions.length;for(let t=0;t<n;t++)u.push({topic:e.questions[t].topic,answer:"",required:e.questions[t].required,type:e.questions[t].type,options:e.questions[t].options})})}),{template:i,questions:u,success:o,submit:function(){if(!function(){let e=!0;return u.forEach((n,t)=>{document.getElementById("q"+t).classList.remove("invalid"),document.getElementById("must"+t).classList.add("hide"),!0===n.required&&("問答題"===n.type&&""===n.answer.trim()?(fe(t),e=!1):"多選題"===n.type&&0===n.answer.length?(fe(t),e=!1):""===n.answer&&(fe(t),e=!1))}),e}())return t("success",o=!1),!1;s.finished=new Date,s.questions=u,u.forEach(e=>{Array.isArray(e.answer)||(e.answer=[e.answer])});const e=window.location.hostname;let n="";"www.ehanlin.com.tw"===e&&(n="/tutor-questionnaire"),fetch(`https://${e}${n}/questionnaire/questionnaire/create?templateId=${r}`,{method:"post",body:JSON.stringify(s),headers:{"content-type":"application/json"},credentials:"include"}).then(function(e){e.ok&&(t("success",o=!0),""!==s.callBackUrl.trim()&&setTimeout(()=>{window.location.href=s.callBackUrl},700))})}}}return new class extends z{constructor(e){super(),P(this,e,me,ae,s,[])}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
