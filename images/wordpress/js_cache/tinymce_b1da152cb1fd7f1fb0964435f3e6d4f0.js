var tinyMCEPreInit = { settings : { themes : "advanced", plugins : "safari,inlinepopups,autosave,spellchecker,paste,wordpress,media,fullscreen,wpeditimage", languages : "en", debug : false }, base : "http://www.worldolio.com/derek/wordpress/wp-includes/js/tinymce", suffix : "", query : "ver=311" };tinyMCEPreInit.start = function() {
	var t = this, each = tinymce.each, s = t.settings, sl = tinymce.ScriptLoader, ln = s.languages, th = s.themes;

	function load(u, sp) {
		var o;

		if (!sp)
			u = t.base + u;

		o = {url : u, state : 2};
		sl.queue.push(o);
		sl.lookup[o.url] = o;
	};

	sl.markDone(t.base + '/langs/' + ln + '.js');

	load('/themes/' + th + '/editor_template' + t.suffix + '.js');
	sl.markDone(t.base + '/themes/' + th + '/langs/' + ln + '.js');
	sl.markDone(t.base + '/themes/' + th + '/langs/' + ln + '_dlg.js');

	each(s.plugins.split(','), function(n) {
		if (n && n.charAt(0) != '-') {
			load('/plugins/' + n + '/editor_plugin' + t.suffix + '.js');

			sl.markDone(t.base + '/plugins/' + n + '/langs/' + ln + '.js');
			sl.markDone(t.base + '/plugins/' + n + '/langs/' + ln + '_dlg.js');
		}
	});
};
tinyMCEPreInit.load_ext = function(url,lang) {
	var sl = tinymce.ScriptLoader;

	sl.markDone(url + '/langs/' + lang + '.js');
	sl.markDone(url + '/langs/' + lang + '_dlg.js');
};
var tinymce={majorVersion:'3',minorVersion:'1.1',releaseDate:'2008-06-25',_init:function(){var t=this,d=document,w=window,na=navigator,ua=na.userAgent,i,nl,n,base,p,v;t.isOpera=w.opera&&opera.buildNumber;t.isWebKit=/WebKit/.test(ua);t.isOldWebKit=t.isWebKit&&!w.getSelection().getRangeAt;t.isIE=!t.isWebKit&&!t.isOpera&&(/MSIE/gi).test(ua)&&(/Explorer/gi).test(na.appName);t.isIE6=t.isIE&&/MSIE [56]/.test(ua);t.isGecko=!t.isWebKit&&/Gecko/.test(ua);t.isMac=ua.indexOf('Mac')!=-1;if(w.tinyMCEPreInit){t.suffix=tinyMCEPreInit.suffix;t.baseURL=tinyMCEPreInit.base;t.query=tinyMCEPreInit.query;return;}t.suffix='';nl=d.getElementsByTagName('base');for(i=0;i<nl.length;i++){if(v=nl[i].href){if(/^https?:\/\/[^\/]+$/.test(v))v+='/';base=v?v.match(/.*\//)[0]:'';}}function getBase(n){if(n.src&&/tiny_mce(|_dev|_src|_gzip|_jquery|_prototype).js/.test(n.src)){if(/_(src|dev)\.js/g.test(n.src))t.suffix='_src';if((p=n.src.indexOf('?'))!=-1)t.query=n.src.substring(p+1);t.baseURL=n.src.substring(0,n.src.lastIndexOf('/'));if(base&&t.baseURL.indexOf('://')==-1)t.baseURL=base+t.baseURL;return t.baseURL;}return null;};nl=d.getElementsByTagName('script');for(i=0;i<nl.length;i++){if(getBase(nl[i]))return;}n=d.getElementsByTagName('head')[0];if(n){nl=n.getElementsByTagName('script');for(i=0;i<nl.length;i++){if(getBase(nl[i]))return;}}return;},is:function(o,t){var n=typeof(o);if(!t)return n!='undefined';if(t=='array'&&(o instanceof Array))return true;return n==t;},each:function(o,cb,s){var n,l;if(!o)return 0;s=s||o;if(typeof(o.length)!='undefined'){for(n=0,l=o.length;n<l;n++){if(cb.call(s,o[n],n,o)===false)return 0;}}else{for(n in o){if(o.hasOwnProperty(n)){if(cb.call(s,o[n],n,o)===false)return 0;}}}return 1;},map:function(a,f){var o=[];tinymce.each(a,function(v){o.push(f(v));});return o;},grep:function(a,f){var o=[];tinymce.each(a,function(v){if(!f||f(v))o.push(v);});return o;},inArray:function(a,v){var i,l;if(a){for(i=0,l=a.length;i<l;i++){if(a[i]===v)return i;}}return-1;},extend:function(o,e){var i,a=arguments;for(i=1;i<a.length;i++){e=a[i];tinymce.each(e,function(v,n){if(typeof(v)!=='undefined')o[n]=v;});}return o;},trim:function(s){return(s?''+s:'').replace(/^\s*|\s*$/g,'');},create:function(s,p){var t=this,sp,ns,cn,scn,c,de=0;s=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(s);cn=s[3].match(/(^|\.)(\w+)$/i)[2];ns=t.createNS(s[3].replace(/\.\w+$/,''));if(ns[cn])return;if(s[2]=='static'){ns[cn]=p;if(this.onCreate)this.onCreate(s[2],s[3],ns[cn]);return;}if(!p[cn]){p[cn]=function(){};de=1;}ns[cn]=p[cn];t.extend(ns[cn].prototype,p);if(s[5]){sp=t.resolve(s[5]).prototype;scn=s[5].match(/\.(\w+)$/i)[1];c=ns[cn];if(de){ns[cn]=function(){return sp[scn].apply(this,arguments);};}else{ns[cn]=function(){this.parent=sp[scn];return c.apply(this,arguments);};}ns[cn].prototype[cn]=ns[cn];t.each(sp,function(f,n){ns[cn].prototype[n]=sp[n];});t.each(p,function(f,n){if(sp[n]){ns[cn].prototype[n]=function(){this.parent=sp[n];return f.apply(this,arguments);};}else{if(n!=cn)ns[cn].prototype[n]=f;}});}t.each(p['static'],function(f,n){ns[cn][n]=f;});if(this.onCreate)this.onCreate(s[2],s[3],ns[cn].prototype);},walk:function(o,f,n,s){s=s||this;if(o){if(n)o=o[n];tinymce.each(o,function(o,i){if(f.call(s,o,i,n)===false)return false;tinymce.walk(o,f,n,s);});}},createNS:function(n,o){var i,v;o=o||window;n=n.split('.');for(i=0;i<n.length;i++){v=n[i];if(!o[v])o[v]={};o=o[v];}return o;},resolve:function(n,o){var i,l;o=o||window;n=n.split('.');for(i=0,l=n.length;i<l;i++){o=o[n[i]];if(!o)break;}return o;},addUnload:function(f,s){var t=this,w=window;f={func:f,scope:s||this};if(!t.unloads){function unload(){var li=t.unloads,o,n;if(li){for(n in li){o=li[n];if(o&&o.func)o.func.call(o.scope,1);}if(w.detachEvent){w.detachEvent('onbeforeunload',fakeUnload);w.detachEvent('onunload',unload);}else if(w.removeEventListener)w.removeEventListener('unload',unload,false);t.unloads=o=li=w=unload=null;if(window.CollectGarbage)window.CollectGarbage();}};function fakeUnload(){var d=document;if(d.readyState=='interactive'){function stop(){d.detachEvent('onstop',stop);unload();d=null;};d.attachEvent('onstop',stop);window.setTimeout(function(){d.detachEvent('onstop',stop);},0);}};if(w.attachEvent){w.attachEvent('onunload',unload);w.attachEvent('onbeforeunload',fakeUnload);}else if(w.addEventListener)w.addEventListener('unload',unload,false);t.unloads=[f];}else t.unloads.push(f);return f;},removeUnload:function(f){var u=this.unloads,r=null;tinymce.each(u,function(o,i){if(o&&o.func==f){u.splice(i,1);r=f;return false;}});return r;},explode:function(s,d){return s?tinymce.map(s.split(d||','),tinymce.trim):s;},_addVer:function(u){var v;if(!this.query)return u;v=(u.indexOf('?')==-1?'?':'&')+this.query;if(u.indexOf('#')==-1)return u+v;return u.replace('#',v+'#');}};window.tinymce=tinymce;tinymce._init();tinymce.create('tinymce.util.Dispatcher',{scope:null,listeners:null,Dispatcher:function(s){this.scope=s||this;this.listeners=[];},add:function(cb,s){this.listeners.push({cb:cb,scope:s||this.scope});return cb;},addToTop:function(cb,s){this.listeners.unshift({cb:cb,scope:s||this.scope});return cb;},remove:function(cb){var l=this.listeners,o=null;tinymce.each(l,function(c,i){if(cb==c.cb){o=cb;l.splice(i,1);return false;}});return o;},dispatch:function(){var s,a=arguments,i,li=this.listeners,c;for(i=0;i<li.length;i++){c=li[i];s=c.cb.apply(c.scope,a);if(s===false)break;}return s;}});(function(){var each=tinymce.each;tinymce.create('tinymce.util.URI',{URI:function(u,s){var t=this,o,a,b;s=t.settings=s||{};if(/^(mailto|news|javascript|about):/i.test(u)||/^\s*#/.test(u)){t.source=u;return;}if(u.indexOf('/')===0&&u.indexOf('//')!==0)u=(s.base_uri?s.base_uri.protocol||'http':'http')+'://mce_host'+u;if(u.indexOf('://')===-1&&u.indexOf('//')!==0)u=(s.base_uri.protocol||'http')+'://mce_host'+t.toAbsPath(s.base_uri.path,u);u=u.replace(/@@/g,'(mce_at)');u=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(u);each(["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],function(v,i){var s=u[i];if(s)s=s.replace(/\(mce_at\)/g,'@@');t[v]=s;});if(b=s.base_uri){if(!t.protocol)t.protocol=b.protocol;if(!t.userInfo)t.userInfo=b.userInfo;if(!t.port&&t.host=='mce_host')t.port=b.port;if(!t.host||t.host=='mce_host')t.host=b.host;t.source='';}},setPath:function(p){var t=this;p=/^(.*?)\/?(\w+)?$/.exec(p);t.path=p[0];t.directory=p[1];t.file=p[2];t.source='';t.getURI();},toRelative:function(u){var t=this,o;u=new tinymce.util.URI(u,{base_uri:t});if((u.host!='mce_host'&&t.host!=u.host&&u.host)||t.port!=u.port||t.protocol!=u.protocol)return u.getURI();o=t.toRelPath(t.path,u.path);if(u.query)o+='?'+u.query;if(u.anchor)o+='#'+u.anchor;return o;},toAbsolute:function(u,nh){var u=new tinymce.util.URI(u,{base_uri:this});return u.getURI(this.host==u.host?nh:0);},toRelPath:function(base,path){var items,bp=0,out='',i;base=base.substring(0,base.lastIndexOf('/'));base=base.split('/');items=path.split('/');if(base.length>=items.length){for(i=0;i<base.length;i++){if(i>=items.length||base[i]!=items[i]){bp=i+1;break;}}}if(base.length<items.length){for(i=0;i<items.length;i++){if(i>=base.length||base[i]!=items[i]){bp=i+1;break;}}}if(bp==1)return path;for(i=0;i<base.length-(bp-1);i++)out+="../";for(i=bp-1;i<items.length;i++){if(i!=bp-1)out+="/"+items[i];else out+=items[i];}return out;},toAbsPath:function(base,path){var i,nb=0,o=[];base=base.split('/');path=path.split('/');each(base,function(k){if(k)o.push(k);});base=o;for(i=path.length-1,o=[];i>=0;i--){if(path[i].length==0||path[i]==".")continue;if(path[i]=='..'){nb++;continue;}if(nb>0){nb--;continue;}o.push(path[i]);}i=base.length-nb;if(i<=0)return'/'+o.reverse().join('/');return'/'+base.slice(0,i).join('/')+'/'+o.reverse().join('/');},getURI:function(nh){var s,t=this;if(!t.source||nh){s='';if(!nh){if(t.protocol)s+=t.protocol+'://';if(t.userInfo)s+=t.userInfo+'@';if(t.host)s+=t.host;if(t.port)s+=':'+t.port;}if(t.path)s+=t.path;if(t.query)s+='?'+t.query;if(t.anchor)s+='#'+t.anchor;t.source=s;}return t.source;}});})();(function(){var each=tinymce.each;tinymce.create('static tinymce.util.Cookie',{getHash:function(n){var v=this.get(n),h;if(v){each(v.split('&'),function(v){v=v.split('=');h=h||{};h[unescape(v[0])]=unescape(v[1]);});}return h;},setHash:function(n,v,e,p,d,s){var o='';each(v,function(v,k){o+=(!o?'':'&')+escape(k)+'='+escape(v);});this.set(n,o,e,p,d,s);},get:function(n){var c=document.cookie,e,p=n+"=",b;if(!c)return;b=c.indexOf("; "+p);if(b==-1){b=c.indexOf(p);if(b!=0)return null;}else b+=2;e=c.indexOf(";",b);if(e==-1)e=c.length;return unescape(c.substring(b+p.length,e));},set:function(n,v,e,p,d,s){document.cookie=n+"="+escape(v)+((e)?"; expires="+e.toGMTString():"")+((p)?"; path="+escape(p):"")+((d)?"; domain="+d:"")+((s)?"; secure":"");},remove:function(n,p){var d=new Date();d.setTime(d.getTime()-1000);this.set(n,'',d,p,d);}});})();tinymce.create('static tinymce.util.JSON',{serialize:function(o){var i,v,s=tinymce.util.JSON.serialize,t;if(o==null)return'null';t=typeof o;if(t=='string'){v='\bb\tt\nn\ff\rr\""\'\'\\\\';return'"'+o.replace(/([\u0080-\uFFFF\x00-\x1f\"\'])/g,function(a,b){i=v.indexOf(b);if(i+1)return'\\'+v.charAt(i+1);a=b.charCodeAt().toString(16);return'\\u'+'0000'.substring(a.length)+a;})+'"';}if(t=='object'){if(o instanceof Array){for(i=0,v='[';i<o.length;i++)v+=(i>0?',':'')+s(o[i]);return v+']';}v='{';for(i in o)v+=typeof o[i]!='function'?(v.length>1?',"':'"')+i+'":'+s(o[i]):'';return v+'}';}return''+o;},parse:function(s){try{return eval('('+s+')');}catch(ex){}}});tinymce.create('static tinymce.util.XHR',{send:function(o){var x,t,w=window,c=0;o.scope=o.scope||this;o.success_scope=o.success_scope||o.scope;o.error_scope=o.error_scope||o.scope;o.async=o.async===false?false:true;o.data=o.data||'';function get(s){x=0;try{x=new ActiveXObject(s);}catch(ex){}return x;};x=w.XMLHttpRequest?new XMLHttpRequest():get('Microsoft.XMLHTTP')||get('Msxml2.XMLHTTP');if(x){if(x.overrideMimeType)x.overrideMimeType(o.content_type);x.open(o.type||(o.data?'POST':'GET'),o.url,o.async);if(o.content_type)x.setRequestHeader('Content-Type',o.content_type);x.send(o.data);function ready(){if(!o.async||x.readyState==4||c++>10000){if(o.success&&c<10000&&x.status==200)o.success.call(o.success_scope,''+x.responseText,x,o);else if(o.error)o.error.call(o.error_scope,c>10000?'TIMED_OUT':'GENERAL',x,o);x=null;}else w.setTimeout(ready,10);};if(!o.async)return ready();t=w.setTimeout(ready,10);}}});(function(){var extend=tinymce.extend,JSON=tinymce.util.JSON,XHR=tinymce.util.XHR;tinymce.create('tinymce.util.JSONRequest',{JSONRequest:function(s){this.settings=extend({},s);this.count=0;},send:function(o){var ecb=o.error,scb=o.success;o=extend(this.settings,o);o.success=function(c,x){c=JSON.parse(c);if(typeof(c)=='undefined'){c={error:'JSON Parse error.'};}if(c.error)ecb.call(o.error_scope||o.scope,c.error,x);else scb.call(o.success_scope||o.scope,c.result);};o.error=function(ty,x){ecb.call(o.error_scope||o.scope,ty,x);};o.data=JSON.serialize({id:o.id||'c'+(this.count++),method:o.method,params:o.params});o.content_type='application/json';XHR.send(o);},'static':{sendRPC:function(o){return new tinymce.util.JSONRequest().send(o);}}});}());(function(){var each=tinymce.each,is=tinymce.is;var isWebKit=tinymce.isWebKit,isIE=tinymce.isIE;tinymce.create('tinymce.dom.DOMUtils',{doc:null,root:null,files:null,listeners:{},pixelStyles:/^(top|left|bottom|right|width|height|borderWidth)$/,cache:{},idPattern:/^#[\w]+$/,elmPattern:/^[\w_*]+$/,elmClassPattern:/^([\w_]*)\.([\w_]+)$/,DOMUtils:function(d,s){var t=this;t.doc=d;t.win=window;t.files={};t.cssFlicker=false;t.counter=0;t.boxModel=!tinymce.isIE||d.compatMode=="CSS1Compat";t.stdMode=d.documentMode===8;this.settings=s=tinymce.extend({keep_values:false,hex_colors:1,process_html:1},s);if(tinymce.isIE6){try{d.execCommand('BackgroundImageCache',false,true);}catch(e){t.cssFlicker=true;}}tinymce.addUnload(t.destroy,t);},getRoot:function(){var t=this,s=t.settings;return(s&&t.get(s.root_element))||t.doc.body;},getViewPort:function(w){var d,b;w=!w?this.win:w;d=w.document;b=this.boxModel?d.documentElement:d.body;return{x:w.pageXOffset||b.scrollLeft,y:w.pageYOffset||b.scrollTop,w:w.innerWidth||b.clientWidth,h:w.innerHeight||b.clientHeight};},getRect:function(e){var p,t=this,w,h;e=t.get(e);p=t.getPos(e);w=t.getStyle(e,'width');h=t.getStyle(e,'height');if(w.indexOf('px')===-1)w=0;if(h.indexOf('px')===-1)h=0;return{x:p.x,y:p.y,w:parseInt(w)||e.offsetWidth||e.clientWidth,h:parseInt(h)||e.offsetHeight||e.clientHeight};},getParent:function(n,f,r){var na,se=this.settings;n=this.get(n);if(se.strict_root)r=r||this.getRoot();if(is(f,'string')){na=f.toUpperCase();f=function(n){var s=false;if(n.nodeType==1&&na==='*'){s=true;return false;}each(na.split(','),function(v){if(n.nodeType==1&&((se.strict&&n.nodeName.toUpperCase()==v)||n.nodeName.toUpperCase()==v)){s=true;return false;}});return s;};}while(n){if(n==r)return null;if(f(n))return n;n=n.parentNode;}return null;},get:function(e){var n;if(e&&this.doc&&typeof(e)=='string'){n=e;e=this.doc.getElementById(e);if(e&&e.id!==n)return this.doc.getElementsByName(n)[1];}return e;},select:function(pa,s){var t=this,cs,c,pl,o=[],x,i,l,n;s=t.get(s)||t.doc;if(s.querySelectorAll){if(s!=t.doc){i=s.id;s.id='_mc_tmp';pa='#_mc_tmp '+pa;}l=tinymce.grep(s.querySelectorAll(pa));s.id=i;return l;}if(t.settings.strict){function get(s,n){return s.getElementsByTagName(n.toLowerCase());};}else{function get(s,n){return s.getElementsByTagName(n);};}if(t.elmPattern.test(pa)){x=get(s,pa);for(i=0,l=x.length;i<l;i++)o.push(x[i]);return o;}if(t.elmClassPattern.test(pa)){pl=t.elmClassPattern.exec(pa);x=get(s,pl[1]||'*');c=' '+pl[2]+' ';for(i=0,l=x.length;i<l;i++){n=x[i];if(n.className&&(' '+n.className+' ').indexOf(c)!==-1)o.push(n);}return o;}function collect(n){if(!n.mce_save){n.mce_save=1;o.push(n);}};function collectIE(n){if(!n.getAttribute('mce_save')){n.setAttribute('mce_save','1');o.push(n);}};function find(n,f,r){var i,l,nl=get(r,n);for(i=0,l=nl.length;i<l;i++)f(nl[i]);};each(pa.split(','),function(v,i){v=tinymce.trim(v);if(t.elmPattern.test(v)){each(get(s,v),function(n){collect(n);});return;}if(t.elmClassPattern.test(v)){x=t.elmClassPattern.exec(v);each(get(s,x[1]),function(n){if(t.hasClass(n,x[2]))collect(n);});return;}if(!(cs=t.cache[pa])){cs='x=(function(cf, s) {';pl=v.split(' ');each(pl,function(v){var p=/^([\w\\*]+)?(?:#([\w\\]+))?(?:\.([\w\\\.]+))?(?:\[\@([\w\\]+)([\^\$\*!]?=)([\w\\]+)\])?(?:\:([\w\\]+))?/i.exec(v);p[1]=p[1]||'*';cs+='find("'+p[1]+'", function(n) {';if(p[2])cs+='if (n.id !== "'+p[2]+'") return;';if(p[3]){cs+='var c = " " + n.className + " ";';cs+='if (';c='';each(p[3].split('.'),function(v){if(v)c+=(c?'||':'')+'c.indexOf(" '+v+' ") === -1';});cs+=c+') return;';}});cs+='cf(n);';for(i=pl.length-1;i>=0;i--)cs+='}, '+(i?'n':'s')+');';cs+='})';t.cache[pa]=cs=eval(cs);}cs(isIE?collectIE:collect,s);});each(o,function(n){if(isIE)n.removeAttribute('mce_save');else delete n.mce_save;});return o;},add:function(p,n,a,h,c){var t=this;return this.run(p,function(p){var e,k;e=is(n,'string')?t.doc.createElement(n):n;if(a){for(k in a){if(a.hasOwnProperty(k)&&!is(a[k],'object'))t.setAttrib(e,k,''+a[k]);}if(a.style&&!is(a.style,'string')){each(a.style,function(v,n){t.setStyle(e,n,v);});}}if(h){if(h.nodeType)e.appendChild(h);else t.setHTML(e,h);}return!c?p.appendChild(e):e;});},create:function(n,a,h){return this.add(this.doc.createElement(n),n,a,h,1);},createHTML:function(n,a,h){var o='',t=this,k;o+='<'+n;for(k in a){if(a.hasOwnProperty(k))o+=' '+k+'="'+t.encode(a[k])+'"';}if(tinymce.is(h))return o+'>'+h+'</'+n+'>';return o+' />';},remove:function(n,k){return this.run(n,function(n){var p,g;p=n.parentNode;if(!p)return null;if(k){each(n.childNodes,function(c){p.insertBefore(c.cloneNode(true),n);});}return p.removeChild(n);});},setStyle:function(n,na,v){var t=this;return t.run(n,function(e){var s,i;s=e.style;na=na.replace(/-(\D)/g,function(a,b){return b.toUpperCase();});if(t.pixelStyles.test(na)&&(tinymce.is(v,'number')||/^[\-0-9\.]+$/.test(v)))v+='px';switch(na){case'opacity':if(isIE){s.filter=v===''?'':"alpha(opacity="+(v*100)+")";if(!n.currentStyle||!n.currentStyle.hasLayout)s.display='inline-block';}s[na]=s['-moz-opacity']=s['-khtml-opacity']=v||'';break;case'float':isIE?s.styleFloat=v:s.cssFloat=v;break;default:s[na]=v||'';}if(t.settings.update_styles)t.setAttrib(e,'mce_style');});},getStyle:function(n,na,c){n=this.get(n);if(!n)return false;if(this.doc.defaultView&&c){na=na.replace(/[A-Z]/g,function(a){return'-'+a;});try{return this.doc.defaultView.getComputedStyle(n,null).getPropertyValue(na);}catch(ex){return null;}}na=na.replace(/-(\D)/g,function(a,b){return b.toUpperCase();});if(na=='float')na=isIE?'styleFloat':'cssFloat';if(n.currentStyle&&c)return n.currentStyle[na];return n.style[na];},setStyles:function(e,o){var t=this,s=t.settings,ol;ol=s.update_styles;s.update_styles=0;each(o,function(v,n){t.setStyle(e,n,v);});s.update_styles=ol;if(s.update_styles)t.setAttrib(e,s.cssText);},setAttrib:function(e,n,v){var t=this;if(t.settings.strict)n=n.toLowerCase();return this.run(e,function(e){var s=t.settings;switch(n){case"style":if(s.keep_values){if(v&&!t._isRes(v))e.setAttribute('mce_style',v,2);else e.removeAttribute('mce_style',2);}e.style.cssText=v;break;case"class":e.className=v||'';break;case"src":case"href":if(s.keep_values){if(s.url_converter)v=s.url_converter.call(s.url_converter_scope||t,v,n,e);t.setAttrib(e,'mce_'+n,v,2);}break;case"shape":e.setAttribute('mce_style',v);break;}if(is(v)&&v!==null&&v.length!==0)e.setAttribute(n,''+v,2);else e.removeAttribute(n,2);});},setAttribs:function(e,o){var t=this;return this.run(e,function(e){each(o,function(v,n){t.setAttrib(e,n,v);});});},getAttrib:function(e,n,dv){var v,t=this;e=t.get(e);if(!e||e.nodeType!==1)return false;if(!is(dv))dv="";if(/^(src|href|style|coords|shape)$/.test(n)){v=e.getAttribute("mce_"+n);if(v)return v;}v=e.getAttribute(n,2);if(!v){switch(n){case'class':v=e.className;break;default:if(isIE&&n==='name'&&e.nodeName==='A'){v=e.name;break;}v=e.attributes[n];v=v&&is(v.nodeValue)?v.nodeValue:v;}}switch(n){case'style':v=v||e.style.cssText;if(v){v=t.serializeStyle(t.parseStyle(v));if(t.settings.keep_values&&!t._isRes(v))e.setAttribute('mce_style',v);}break;}if(isWebKit&&n==="class"&&v)v=v.replace(/(apple|webkit)\-[a-z\-]+/gi,'');if(isIE){switch(n){case'rowspan':case'colspan':if(v===1)v='';break;case'size':if(v==='+0')v='';break;case'hspace':if(v===-1)v='';break;case'maxlength':case'tabindex':if(v===32768||v===2147483647)v='';break;case'noshade':if(v===65535)return'noshade';break;case'shape':v=v.toLowerCase();break;default:if(n.indexOf('on')===0&&v)v=(''+v).replace(/^function\s+anonymous\(\)\s+\{\s+(.*)\s+\}$/,'$1');}}return(v&&v!='')?''+v:dv;},getPos:function(n){var t=this,x=0,y=0,e,d=t.doc,r;n=t.get(n);if(n&&isIE){n=n.getBoundingClientRect();e=t.boxModel?d.documentElement:d.body;x=t.getStyle(t.select('html')[0],'borderWidth');x=(x=='medium'||t.boxModel&&!t.isIE6)&&2||x;n.top+=t.win.self!=t.win.top?2:0;return{x:n.left+e.scrollLeft-x,y:n.top+e.scrollTop-x};}r=n;while(r){x+=r.offsetLeft||0;y+=r.offsetTop||0;r=r.offsetParent;}r=n;while(r){if(!/^table-row|inline.*/i.test(t.getStyle(r,"display",1))){x-=r.scrollLeft||0;y-=r.scrollTop||0;}r=r.parentNode;if(r==d.body)break;}return{x:x,y:y};},parseStyle:function(st){var t=this,s=t.settings,o={};if(!st)return o;function compress(p,s,ot){var t,r,b,l;t=o[p+'-top'+s];if(!t)return;r=o[p+'-right'+s];if(t!=r)return;b=o[p+'-bottom'+s];if(r!=b)return;l=o[p+'-left'+s];if(b!=l)return;o[ot]=l;delete o[p+'-top'+s];delete o[p+'-right'+s];delete o[p+'-bottom'+s];delete o[p+'-left'+s];};function compress2(ta,a,b,c){var t;t=o[a];if(!t)return;t=o[b];if(!t)return;t=o[c];if(!t)return;o[ta]=o[a]+' '+o[b]+' '+o[c];delete o[a];delete o[b];delete o[c];};st=st.replace(/&(#?[a-z0-9]+);/g,'&$1_MCE_SEMI_');each(st.split(';'),function(v){var sv,ur=[];if(v){v=v.replace(/_MCE_SEMI_/g,';');v=v.replace(/url\([^\)]+\)/g,function(v){ur.push(v);return'url('+ur.length+')';});v=v.split(':');sv=tinymce.trim(v[1]);sv=sv.replace(/url\(([^\)]+)\)/g,function(a,b){return ur[parseInt(b)-1];});sv=sv.replace(/rgb\([^\)]+\)/g,function(v){return t.toHex(v);});if(s.url_converter){sv=sv.replace(/url\([\'\"]?([^\)\'\"]+)[\'\"]?\)/g,function(x,c){return'url('+s.url_converter.call(s.url_converter_scope||t,t.decode(c),'style',null)+')';});}o[tinymce.trim(v[0]).toLowerCase()]=sv;}});compress("border","","border");compress("border","-width","border-width");compress("border","-color","border-color");compress("border","-style","border-style");compress("padding","","padding");compress("margin","","margin");compress2('border','border-width','border-style','border-color');if(isIE){if(o.border=='medium none')o.border='';}return o;},serializeStyle:function(o){var s='';each(o,function(v,k){if(k&&v){if(tinymce.isGecko&&k.indexOf('-moz-')===0)return;switch(k){case'color':case'background-color':v=v.toLowerCase();break;}s+=(s?' ':'')+k+': '+v+';';}});return s;},loadCSS:function(u){var t=this,d=t.doc;if(!u)u='';each(u.split(','),function(u){if(t.files[u])return;t.files[u]=true;t.add(t.select('head')[0],'link',{rel:'stylesheet',href:tinymce._addVer(u)});});},addClass:function(e,c){return this.run(e,function(e){var o;if(!c)return 0;if(this.hasClass(e,c))return e.className;o=this.removeClass(e,c);return e.className=(o!=''?(o+' '):'')+c;});},removeClass:function(e,c){var t=this,re;return t.run(e,function(e){var v;if(t.hasClass(e,c)){if(!re)re=new RegExp("(^|\\s+)"+c+"(\\s+|$)","g");v=e.className.replace(re,' ');return e.className=tinymce.trim(v!=' '?v:'');}return e.className;});},hasClass:function(n,c){n=this.get(n);if(!n||!c)return false;return(' '+n.className+' ').indexOf(' '+c+' ')!==-1;},show:function(e){return this.setStyle(e,'display','block');},hide:function(e){return this.setStyle(e,'display','none');},isHidden:function(e){e=this.get(e);return e.style.display=='none'||this.getStyle(e,'display')=='none';},uniqueId:function(p){return(!p?'mce_':p)+(this.counter++);},setHTML:function(e,h){var t=this;return this.run(e,function(e){var x,i,nl,n,p,x;h=t.processHTML(h);if(isIE){function set(){try{e.innerHTML='<br />'+h;e.removeChild(e.firstChild);}catch(ex){while(e.firstChild)e.firstChild.removeNode();x=t.create('div');x.innerHTML='<br />'+h;each(x.childNodes,function(n,i){if(i)e.appendChild(n);});}};if(t.settings.fix_ie_paragraphs)h=h.replace(/<p><\/p>|<p([^>]+)><\/p>|<p[^\/+]\/>/gi,'<p$1 mce_keep="true">&nbsp;</p>');set();if(t.settings.fix_ie_paragraphs){nl=e.getElementsByTagName("p");for(i=nl.length-1,x=0;i>=0;i--){n=nl[i];if(!n.hasChildNodes()){if(!n.mce_keep){x=1;break;}n.removeAttribute('mce_keep');}}}if(x){h=h.replace(/<p([^>]+)>|<p>/g,'<div$1 mce_tmp="1">');h=h.replace(/<\/p>/g,'</div>');set();if(t.settings.fix_ie_paragraphs){nl=e.getElementsByTagName("DIV");for(i=nl.length-1;i>=0;i--){n=nl[i];if(n.mce_tmp){p=t.doc.createElement('p');n.cloneNode(false).outerHTML.replace(/([a-z0-9\-_]+)=/gi,function(a,b){var v;if(b!=='mce_tmp'){v=n.getAttribute(b);if(!v&&b==='class')v=n.className;p.setAttribute(b,v);}});for(x=0;x<n.childNodes.length;x++)p.appendChild(n.childNodes[x].cloneNode(true));n.swapNode(p);}}}}}else e.innerHTML=h;return h;});},processHTML:function(h){var t=this,s=t.settings;if(!s.process_html)return h;if(tinymce.isGecko){h=h.replace(/<(\/?)strong>|<strong( [^>]+)>/gi,'<$1b$2>');h=h.replace(/<(\/?)em>|<em( [^>]+)>/gi,'<$1i$2>');}else if(isIE)h=h.replace(/&apos;/g,'&#39;');h=h.replace(/<a( )([^>]+)\/>|<a\/>/gi,'<a$1$2></a>');if(s.keep_values){if(/<script|style/.test(h)){function trim(s){s=s.replace(/^[\r\n]*|[\r\n]*$/g,'');s=s.replace(/^\s*(\/\/\s*<!--|\/\/\s*<\[CDATA\[|<!--|<\[CDATA\[)[\r\n]*/g,'');s=s.replace(/\s*(\/\/\s*\]\]>|\/\/\s*-->|\]\]>|-->)\s*$/g,'');return s;};h=h.replace(/<script([^>]+|)>([\s\S]*?)<\/script>/g,function(v,a,b){b=trim(b);if(!a)a=' type="text/javascript"';if(b)b='<!--\n'+b+'\n// -->';return'<mce:script'+a+'>'+b+'</mce:script>';});h=h.replace(/<style([^>]+|)>([\s\S]*?)<\/style>/g,function(v,a,b){b=trim(b);return'<mce:style'+a+'><!--\n'+b+'\n--></mce:style><style'+a+' mce_bogus="1">'+b+'</style>';});}h=h.replace(/<([\w:]+) [^>]*(src|href|style|shape|coords)[^>]*>/gi,function(a,n){function handle(m,b,c){var u=c;if(a.indexOf('mce_'+b)!=-1)return m;if(b=='style'){if(t._isRes(c))return m;if(s.hex_colors){u=u.replace(/rgb\([^\)]+\)/g,function(v){return t.toHex(v);});}if(s.url_converter){u=u.replace(/url\([\'\"]?([^\)\'\"]+)\)/g,function(x,c){return'url('+t.encode(s.url_converter.call(s.url_converter_scope||t,t.decode(c),b,n))+')';});}}else if(b!='coords'&&b!='shape'){if(s.url_converter)u=t.encode(s.url_converter.call(s.url_converter_scope||t,t.decode(c),b,n));}return' '+b+'="'+c+'" mce_'+b+'="'+u+'"';};a=a.replace(/ (src|href|style|coords|shape)=[\"]([^\"]+)[\"]/gi,handle);a=a.replace(/ (src|href|style|coords|shape)=[\']([^\']+)[\']/gi,handle);return a.replace(/ (src|href|style|coords|shape)=([^\s\"\'>]+)/gi,handle);});}return h;},getOuterHTML:function(e){var d;e=this.get(e);if(!e)return null;if(isIE)return e.outerHTML;d=(e.ownerDocument||this.doc).createElement("body");d.appendChild(e.cloneNode(true));return d.innerHTML;},setOuterHTML:function(e,h,d){var t=this;return this.run(e,function(e){var n,tp;e=t.get(e);d=d||e.ownerDocument||t.doc;if(isIE&&e.nodeType==1)e.outerHTML=h;else{tp=d.createElement("body");tp.innerHTML=h;n=tp.lastChild;while(n){t.insertAfter(n.cloneNode(true),e);n=n.previousSibling;}t.remove(e);}});},decode:function(s){var e;if(/&[^;]+;/.test(s)){e=this.doc.createElement("div");e.innerHTML=s;return!e.firstChild?s:e.firstChild.nodeValue;}return s;},encode:function(s){return s?(''+s).replace(/[<>&\"]/g,function(c,b){switch(c){case'&':return'&amp;';case'"':return'&quot;';case'<':return'&lt;';case'>':return'&gt;';}return c;}):s;},insertAfter:function(n,r){var t=this;r=t.get(r);return this.run(n,function(n){var p,ns;p=r.parentNode;ns=r.nextSibling;if(ns)p.insertBefore(n,ns);else p.appendChild(n);return n;});},isBlock:function(n){if(n.nodeType&&n.nodeType!==1)return false;n=n.nodeName||n;return/^(H[1-6]|HR|P|DIV|ADDRESS|PRE|FORM|TABLE|LI|OL|UL|TD|CAPTION|BLOCKQUOTE|CENTER|DL|DT|DD|DIR|FIELDSET|NOSCRIPT|NOFRAMES|MENU|ISINDEX|SAMP)$/.test(n);},replace:function(n,o,k){if(is(o,'array'))n=n.cloneNode(true);return this.run(o,function(o){if(k){each(o.childNodes,function(c){n.appendChild(c.cloneNode(true));});}return o.parentNode.replaceChild(n,o);});},toHex:function(s){var c=/^\s*rgb\s*?\(\s*?([0-9]+)\s*?,\s*?([0-9]+)\s*?,\s*?([0-9]+)\s*?\)\s*$/i.exec(s);function hex(s){s=parseInt(s).toString(16);return s.length>1?s:'0'+s;};if(c){s='#'+hex(c[1])+hex(c[2])+hex(c[3]);return s;}return s;},getClasses:function(){var t=this,cl=[],i,lo={},f=t.settings.class_filter,ov;if(t.classes)return t.classes;function addClasses(s){each(s.imports,function(r){addClasses(r);});each(s.cssRules||s.rules,function(r){switch(r.type||1){case 1:if(r.selectorText){each(r.selectorText.split(','),function(v){v=v.replace(/^\s*|\s*$|^\s\./g,"");if(/\.mce/.test(v)||!/\.[\w\-]+$/.test(v))return;ov=v;v=v.replace(/.*\.([a-z0-9_\-]+).*/i,'$1');if(f&&!(v=f(v,ov)))return;if(!lo[v]){cl.push({'class':v});lo[v]=1;}});}break;case 3:addClasses(r.styleSheet);break;}});};try{each(t.doc.styleSheets,addClasses);}catch(ex){}if(cl.length>0)t.classes=cl;return cl;},run:function(e,f,s){var t=this,o;if(t.doc&&typeof(e)==='string')e=t.doc.getElementById(e);if(!e)return false;s=s||this;if(!e.nodeType&&(e.length||e.length===0)){o=[];each(e,function(e,i){if(e){if(typeof(e)=='string')e=t.doc.getElementById(e);o.push(f.call(s,e,i));}});return o;}return f.call(s,e);},getAttribs:function(n){var o;n=this.get(n);if(!n)return[];if(isIE){o=[];if(n.nodeName=='OBJECT')return n.attributes;n.cloneNode(false).outerHTML.replace(/([a-z0-9\:\-_]+)=/gi,function(a,b){o.push({specified:1,nodeName:b});});return o;}return n.attributes;},destroy:function(s){var t=this;t.win=t.doc=t.root=null;if(!s)tinymce.removeUnload(t.destroy);},_isRes:function(c){return/^(top|left|bottom|right|width|height)/i.test(c)||/;\s*(top|left|bottom|right|width|height)/i.test(c);}});tinymce.DOM=new tinymce.dom.DOMUtils(document,{process_html:0});})();(function(){var each=tinymce.each,DOM=tinymce.DOM,isIE=tinymce.isIE,isWebKit=tinymce.isWebKit,Event;tinymce.create('static tinymce.dom.Event',{inits:[],events:[],add:function(o,n,f,s){var cb,t=this,el=t.events,r;if(o&&o instanceof Array){r=[];each(o,function(o){o=DOM.get(o);r.push(t.add(o,n,f,s));});return r;}o=DOM.get(o);if(!o)return;cb=function(e){e=e||window.event;if(e&&!e.target&&isIE)e.target=e.srcElement;if(!s)return f(e);return f.call(s,e);};if(n=='unload'){tinymce.unloads.unshift({func:cb});return cb;}if(n=='init'){if(t.domLoaded)cb();else t.inits.push(cb);return cb;}el.push({obj:o,name:n,func:f,cfunc:cb,scope:s});t._add(o,n,cb);return f;},remove:function(o,n,f){var t=this,a=t.events,s=false,r;if(o&&o instanceof Array){r=[];each(o,function(o){o=DOM.get(o);r.push(t.remove(o,n,f));});return r;}o=DOM.get(o);each(a,function(e,i){if(e.obj==o&&e.name==n&&(!f||(e.func==f||e.cfunc==f))){a.splice(i,1);t._remove(o,n,e.cfunc);s=true;return false;}});return s;},clear:function(o){var t=this,a=t.events,i,e;if(o){o=DOM.get(o);for(i=a.length-1;i>=0;i--){e=a[i];if(e.obj===o){t._remove(e.obj,e.name,e.cfunc);e.obj=e.cfunc=null;a.splice(i,1);}}}},cancel:function(e){if(!e)return false;this.stop(e);return this.prevent(e);},stop:function(e){if(e.stopPropagation)e.stopPropagation();else e.cancelBubble=true;return false;},prevent:function(e){if(e.preventDefault)e.preventDefault();else e.returnValue=false;return false;},_unload:function(){var t=Event;each(t.events,function(e,i){t._remove(e.obj,e.name,e.cfunc);e.obj=e.cfunc=null;});t.events=[];t=null;},_add:function(o,n,f){if(o.attachEvent)o.attachEvent('on'+n,f);else if(o.addEventListener)o.addEventListener(n,f,false);else o['on'+n]=f;},_remove:function(o,n,f){if(o){try{if(o.detachEvent)o.detachEvent('on'+n,f);else if(o.removeEventListener)o.removeEventListener(n,f,false);else o['on'+n]=null;}catch(ex){}}},_pageInit:function(){var e=Event;e._remove(window,'DOMContentLoaded',e._pageInit);e.domLoaded=true;each(e.inits,function(c){c();});e.inits=[];},_wait:function(){var t;if(window.tinyMCE_GZ&&tinyMCE_GZ.loaded){Event.domLoaded=1;return;}if(isIE&&document.location.protocol!='https:'){document.write('<script id=__ie_onload defer src=\'javascript:""\';><\/script>');DOM.get("__ie_onload").onreadystatechange=function(){if(this.readyState=="complete"){Event._pageInit();DOM.get("__ie_onload").onreadystatechange=null;}};}else{Event._add(window,'DOMContentLoaded',Event._pageInit,Event);if(isIE||isWebKit){t=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(t);Event._pageInit();}},10);}}}});Event=tinymce.dom.Event;Event._wait();tinymce.addUnload(Event._unload);})();(function(){var each=tinymce.each;tinymce.create('tinymce.dom.Element',{Element:function(id,s){var t=this,dom,el;s=s||{};t.id=id;t.dom=dom=s.dom||tinymce.DOM;t.settings=s;if(!tinymce.isIE)el=t.dom.get(t.id);each(['getPos','getRect','getParent','add','setStyle','getStyle','setStyles','setAttrib','setAttribs','getAttrib','addClass','removeClass','hasClass','getOuterHTML','setOuterHTML','remove','show','hide','isHidden','setHTML','get'],function(k){t[k]=function(){var a=arguments,o;if(tinymce.isOpera){a=[id];each(arguments,function(v){a.push(v);});}else Array.prototype.unshift.call(a,el||id);o=dom[k].apply(dom,a);t.update(k);return o;};});},on:function(n,f,s){return tinymce.dom.Event.add(this.id,n,f,s);},getXY:function(){return{x:parseInt(this.getStyle('left')),y:parseInt(this.getStyle('top'))};},getSize:function(){var n=this.dom.get(this.id);return{w:parseInt(this.getStyle('width')||n.clientWidth),h:parseInt(this.getStyle('height')||n.clientHeight)};},moveTo:function(x,y){this.setStyles({left:x,top:y});},moveBy:function(x,y){var p=this.getXY();this.moveTo(p.x+x,p.y+y);},resizeTo:function(w,h){this.setStyles({width:w,height:h});},resizeBy:function(w,h){var s=this.getSize();this.resizeTo(s.w+w,s.h+h);},update:function(k){var t=this,b,dom=t.dom;if(tinymce.isIE6&&t.settings.blocker){k=k||'';if(k.indexOf('get')===0||k.indexOf('has')===0||k.indexOf('is')===0)return;if(k=='remove'){dom.remove(t.blocker);return;}if(!t.blocker){t.blocker=dom.uniqueId();b=dom.add(t.settings.container||dom.getRoot(),'iframe',{id:t.blocker,style:'position:absolute;',frameBorder:0,src:'javascript:""'});dom.setStyle(b,'opacity',0);}else b=dom.get(t.blocker);dom.setStyle(b,'left',t.getStyle('left',1));dom.setStyle(b,'top',t.getStyle('top',1));dom.setStyle(b,'width',t.getStyle('width',1));dom.setStyle(b,'height',t.getStyle('height',1));dom.setStyle(b,'display',t.getStyle('display',1));dom.setStyle(b,'zIndex',parseInt(t.getStyle('zIndex',1)||0)-1);}}});})();(function(){function trimNl(s){return s.replace(/[\n\r]+/g,'');};var is=tinymce.is,isIE=tinymce.isIE,each=tinymce.each;tinymce.create('tinymce.dom.Selection',{Selection:function(dom,win,serializer){var t=this;t.dom=dom;t.win=win;t.serializer=serializer;tinymce.addUnload(t.destroy,t);},getContent:function(s){var t=this,r=t.getRng(),e=t.dom.create("body"),se=t.getSel(),wb,wa,n;s=s||{};wb=wa='';s.get=true;s.format=s.format||'html';if(s.format=='text')return t.isCollapsed()?'':(r.text||(se.toString?se.toString():''));if(r.cloneContents){n=r.cloneContents();if(n)e.appendChild(n);}else if(is(r.item)||is(r.htmlText))e.innerHTML=r.item?r.item(0).outerHTML:r.htmlText;else e.innerHTML=r.toString();if(/^\s/.test(e.innerHTML))wb=' ';if(/\s+$/.test(e.innerHTML))wa=' ';s.getInner=true;return t.isCollapsed()?'':wb+t.serializer.serialize(e,s)+wa;},setContent:function(h,s){var t=this,r=t.getRng(),d=t.win.document;s=s||{format:'html'};s.set=true;h=t.dom.processHTML(h);if(r.insertNode){if(tinymce.isGecko&&h.indexOf('<')==-1){r.deleteContents();r.insertNode(t.getRng().createContextualFragment(h+'<span id="__caret">_</span>'));t.select(t.dom.get('__caret'));t.getRng().deleteContents();return;}try{if(d.queryCommandEnabled('InsertHTML'))return d.execCommand('InsertHTML',false,h);}catch(ex){r.deleteContents();r.insertNode(t.getRng().createContextualFragment(h));}}else{if(r.item){d.execCommand('Delete',false,null);r=t.getRng();}r.pasteHTML(h);}},getStart:function(){var t=this,r=t.getRng(),e;if(isIE){if(r.item)return r.item(0);r=r.duplicate();r.collapse(1);e=r.parentElement();if(e&&e.nodeName=='BODY')return e.firstChild;return e;}else{e=r.startContainer;if(e.nodeName=='BODY')return e.firstChild;return t.dom.getParent(e,function(n){return n.nodeType==1;});}},getEnd:function(){var t=this,r=t.getRng(),e;if(isIE){if(r.item)return r.item(0);r=r.duplicate();r.collapse(0);e=r.parentElement();if(e&&e.nodeName=='BODY')return e.lastChild;return e;}else{e=r.endContainer;if(e.nodeName=='BODY')return e.lastChild;return t.dom.getParent(e,function(n){return n.nodeType==1;});}},getBookmark:function(si){var t=this,r=t.getRng(),tr,sx,sy,vp=t.dom.getViewPort(t.win),e,sp,bp,le,c=-0xFFFFFF,s,ro=t.dom.getRoot(),wb=0,wa=0,nv;sx=vp.x;sy=vp.y;if(si=='simple')return{rng:r,scrollX:sx,scrollY:sy};if(isIE){if(r.item){e=r.item(0);each(t.dom.select(e.nodeName),function(n,i){if(e==n){sp=i;return false;}});return{tag:e.nodeName,index:sp,scrollX:sx,scrollY:sy};}tr=t.dom.doc.body.createTextRange();tr.moveToElementText(ro);tr.collapse(true);bp=Math.abs(tr.move('character',c));tr=r.duplicate();tr.collapse(true);sp=Math.abs(tr.move('character',c));tr=r.duplicate();tr.collapse(false);le=Math.abs(tr.move('character',c))-sp;return{start:sp-bp,length:le,scrollX:sx,scrollY:sy};}e=t.getNode();s=t.getSel();if(!s)return null;if(e&&e.nodeName=='IMG'){return{scrollX:sx,scrollY:sy};}function getPos(r,sn,en){var w=t.dom.doc.createTreeWalker(r,NodeFilter.SHOW_TEXT,null,false),n,p=0,d={};while((n=w.nextNode())!=null){if(n==sn)d.start=p;if(n==en){d.end=p;return d;}p+=trimNl(n.nodeValue||'').length;}return null;};if(s.anchorNode==s.focusNode&&s.anchorOffset==s.focusOffset){e=getPos(ro,s.anchorNode,s.focusNode);if(!e)return{scrollX:sx,scrollY:sy};trimNl(s.anchorNode.nodeValue||'').replace(/^\s+/,function(a){wb=a.length;});return{start:Math.max(e.start+s.anchorOffset-wb,0),end:Math.max(e.end+s.focusOffset-wb,0),scrollX:sx,scrollY:sy,beg:s.anchorOffset-wb==0};}else{e=getPos(ro,r.startContainer,r.endContainer);if(!e)return{scrollX:sx,scrollY:sy};return{start:Math.max(e.start+r.startOffset-wb,0),end:Math.max(e.end+r.endOffset-wa,0),scrollX:sx,scrollY:sy,beg:r.startOffset-wb==0};}},moveToBookmark:function(b){var t=this,r=t.getRng(),s=t.getSel(),ro=t.dom.getRoot(),sd,nvl,nv;function getPos(r,sp,ep){var w=t.dom.doc.createTreeWalker(r,NodeFilter.SHOW_TEXT,null,false),n,p=0,d={},o,v,wa,wb;while((n=w.nextNode())!=null){wa=wb=0;nv=n.nodeValue||'';nvl=trimNl(nv).length;p+=nvl;if(p>=sp&&!d.startNode){o=sp-(p-nvl);if(b.beg&&o>=nvl)continue;d.startNode=n;d.startOffset=o+wb;}if(p>=ep){d.endNode=n;d.endOffset=ep-(p-nvl)+wb;return d;}}return null;};if(!b)return false;t.win.scrollTo(b.scrollX,b.scrollY);if(isIE){if(r=b.rng){try{r.select();}catch(ex){}return true;}t.win.focus();if(b.tag){r=ro.createControlRange();each(t.dom.select(b.tag),function(n,i){if(i==b.index)r.addElement(n);});}else{try{if(b.start<0)return true;r=s.createRange();r.moveToElementText(ro);r.collapse(true);r.moveStart('character',b.start);r.moveEnd('character',b.length);}catch(ex2){return true;}}try{r.select();}catch(ex){}return true;}if(!s)return false;if(b.rng){s.removeAllRanges();s.addRange(b.rng);}else{if(is(b.start)&&is(b.end)){try{sd=getPos(ro,b.start,b.end);if(sd){r=t.dom.doc.createRange();r.setStart(sd.startNode,sd.startOffset);r.setEnd(sd.endNode,sd.endOffset);s.removeAllRanges();s.addRange(r);}if(!tinymce.isOpera)t.win.focus();}catch(ex){}}}},select:function(n,c){var t=this,r=t.getRng(),s=t.getSel(),b,fn,ln,d=t.win.document;function first(n){return n?d.createTreeWalker(n,NodeFilter.SHOW_TEXT,null,false).nextNode():null;};function last(n){var c,o,w;if(!n)return null;w=d.createTreeWalker(n,NodeFilter.SHOW_TEXT,null,false);while(c=w.nextNode())o=c;return o;};if(isIE){try{b=d.body;if(/^(IMG|TABLE)$/.test(n.nodeName)){r=b.createControlRange();r.addElement(n);}else{r=b.createTextRange();r.moveToElementText(n);}r.select();}catch(ex){}}else{if(c){fn=first(n);ln=last(n);if(fn&&ln){r=d.createRange();r.setStart(fn,0);r.setEnd(ln,ln.nodeValue.length);}else r.selectNode(n);}else r.selectNode(n);t.setRng(r);}return n;},isCollapsed:function(){var t=this,r=t.getRng(),s=t.getSel();if(!r||r.item)return false;return!s||r.boundingWidth==0||s.isCollapsed;},collapse:function(b){var t=this,r=t.getRng(),n;if(r.item){n=r.item(0);r=this.win.document.body.createTextRange();r.moveToElementText(n);}r.collapse(!!b);t.setRng(r);},getSel:function(){var t=this,w=this.win;return w.getSelection?w.getSelection():w.document.selection;},getRng:function(){var t=this,s=t.getSel(),r;try{if(s)r=s.rangeCount>0?s.getRangeAt(0):(s.createRange?s.createRange():t.win.document.createRange());}catch(ex){}if(!r)r=isIE?t.win.document.body.createTextRange():t.win.document.createRange();return r;},setRng:function(r){var s;if(!isIE){s=this.getSel();if(s){s.removeAllRanges();s.addRange(r);}}else{try{r.select();}catch(ex){}}},setNode:function(n){var t=this;t.setContent(t.dom.getOuterHTML(n));return n;},getNode:function(){var t=this,r=t.getRng(),s=t.getSel(),e;if(!isIE){if(!r)return t.dom.getRoot();e=r.commonAncestorContainer;if(!r.collapsed){if(tinymce.isWebKit&&s.anchorNode&&s.anchorNode.nodeType==1)return s.anchorNode.childNodes[s.anchorOffset];if(r.startContainer==r.endContainer){if(r.startOffset-r.endOffset<2){if(r.startContainer.hasChildNodes())e=r.startContainer.childNodes[r.startOffset];}}}return t.dom.getParent(e,function(n){return n.nodeType==1;});}return r.item?r.item(0):r.parentElement();},destroy:function(s){var t=this;t.win=null;if(!s)tinymce.removeUnload(t.destroy);}});})();(function(){tinymce.create('tinymce.dom.XMLWriter',{node:null,XMLWriter:function(s){function getXML(){var i=document.implementation;if(!i||!i.createDocument){try{return new ActiveXObject('MSXML2.DOMDocument');}catch(ex){}try{return new ActiveXObject('Microsoft.XmlDom');}catch(ex){}}else return i.createDocument('','',null);};this.doc=getXML();this.valid=tinymce.isOpera||tinymce.isWebKit;this.reset();},reset:function(){var t=this,d=t.doc;if(d.firstChild)d.removeChild(d.firstChild);t.node=d.appendChild(d.createElement("html"));},writeStartElement:function(n){var t=this;t.node=t.node.appendChild(t.doc.createElement(n));},writeAttribute:function(n,v){if(this.valid)v=v.replace(/>/g,'%MCGT%');this.node.setAttribute(n,v);},writeEndElement:function(){this.node=this.node.parentNode;},writeFullEndElement:function(){var t=this,n=t.node;n.appendChild(t.doc.createTextNode(""));t.node=n.parentNode;},writeText:function(v){if(this.valid)v=v.replace(/>/g,'%MCGT%');this.node.appendChild(this.doc.createTextNode(v));},writeCDATA:function(v){this.node.appendChild(this.doc.createCDATA(v));},writeComment:function(v){this.node.appendChild(this.doc.createComment(v.replace(/\-\-/g,' ')));},getContent:function(){var h;h=this.doc.xml||new XMLSerializer().serializeToString(this.doc);h=h.replace(/<\?[^?]+\?>|<html>|<\/html>|<html\/>|<!DOCTYPE[^>]+>/g,'');h=h.replace(/ ?\/>/g,' />');if(this.valid)h=h.replace(/\%MCGT%/g,'&gt;');return h;}});})();(function(){tinymce.create('tinymce.dom.StringWriter',{str:null,tags:null,count:0,settings:null,indent:null,StringWriter:function(s){this.settings=tinymce.extend({indent_char:' ',indentation:1},s);this.reset();},reset:function(){this.indent='';this.str="";this.tags=[];this.count=0;},writeStartElement:function(n){this._writeAttributesEnd();this.writeRaw('<'+n);this.tags.push(n);this.inAttr=true;this.count++;this.elementCount=this.count;},writeAttribute:function(n,v){var t=this;t.writeRaw(" "+t.encode(n)+'="'+t.encode(v)+'"');},writeEndElement:function(){var n;if(this.tags.length>0){n=this.tags.pop();if(this._writeAttributesEnd(1))this.writeRaw('</'+n+'>');if(this.settings.indentation>0)this.writeRaw('\n');}},writeFullEndElement:function(){if(this.tags.length>0){this._writeAttributesEnd();this.writeRaw('</'+this.tags.pop()+'>');if(this.settings.indentation>0)this.writeRaw('\n');}},writeText:function(v){this._writeAttributesEnd();this.writeRaw(this.encode(v));this.count++;},writeCDATA:function(v){this._writeAttributesEnd();this.writeRaw('<![CDATA['+v+']]>');this.count++;},writeComment:function(v){this._writeAttributesEnd();this.writeRaw('<!-- '+v+'-->');this.count++;},writeRaw:function(v){this.str+=v;},encode:function(s){return s.replace(/[<>&"]/g,function(v){switch(v){case'<':return'&lt;';case'>':return'&gt;';case'&':return'&amp;';case'"':return'&quot;';}return v;});},getContent:function(){return this.str;},_writeAttributesEnd:function(s){if(!this.inAttr)return;this.inAttr=false;if(s&&this.elementCount==this.count){this.writeRaw(' />');return false;}this.writeRaw('>');return true;}});})();(function(){var extend=tinymce.extend,each=tinymce.each,Dispatcher=tinymce.util.Dispatcher,isIE=tinymce.isIE,isGecko=tinymce.isGecko;function getIEAtts(n){var o=[];if(n.nodeName=='OBJECT')return n.attributes;n.cloneNode(false).outerHTML.replace(/([a-z0-9\:\-_]+)=/gi,function(a,b){o.push({specified:1,nodeName:b});});return o;};function wildcardToRE(s){return s.replace(/([?+*])/g,'.$1');};tinymce.create('tinymce.dom.Serializer',{Serializer:function(s){var t=this;t.key=0;t.onPreProcess=new Dispatcher(t);t.onPostProcess=new Dispatcher(t);if(tinymce.relaxedDomain&&tinymce.isGecko){t.writer=new tinymce.dom.StringWriter();}else{try{t.writer=new tinymce.dom.XMLWriter();}catch(ex){t.writer=new tinymce.dom.StringWriter();}}t.settings=s=extend({dom:tinymce.DOM,valid_nodes:0,node_filter:0,attr_filter:0,invalid_attrs:/^(mce_|_moz_)/,closed:/(br|hr|input|meta|img|link|param)/,entity_encoding:'named',entities:'160,nbsp,161,iexcl,162,cent,163,pound,164,curren,165,yen,166,brvbar,167,sect,168,uml,169,copy,170,ordf,171,laquo,172,not,173,shy,174,reg,175,macr,176,deg,177,plusmn,178,sup2,179,sup3,180,acute,181,micro,182,para,183,middot,184,cedil,185,sup1,186,ordm,187,raquo,188,frac14,189,frac12,190,frac34,191,iquest,192,Agrave,193,Aacute,194,Acirc,195,Atilde,196,Auml,197,Aring,198,AElig,199,Ccedil,200,Egrave,201,Eacute,202,Ecirc,203,Euml,204,Igrave,205,Iacute,206,Icirc,207,Iuml,208,ETH,209,Ntilde,210,Ograve,211,Oacute,212,Ocirc,213,Otilde,214,Ouml,215,times,216,Oslash,217,Ugrave,218,Uacute,219,Ucirc,220,Uuml,221,Yacute,222,THORN,223,szlig,224,agrave,225,aacute,226,acirc,227,atilde,228,auml,229,aring,230,aelig,231,ccedil,232,egrave,233,eacute,234,ecirc,235,euml,236,igrave,237,iacute,238,icirc,239,iuml,240,eth,241,ntilde,242,ograve,243,oacute,244,ocirc,245,otilde,246,ouml,247,divide,248,oslash,249,ugrave,250,uacute,251,ucirc,252,uuml,253,yacute,254,thorn,255,yuml,402,fnof,913,Alpha,914,Beta,915,Gamma,916,Delta,917,Epsilon,918,Zeta,919,Eta,920,Theta,921,Iota,922,Kappa,923,Lambda,924,Mu,925,Nu,926,Xi,927,Omicron,928,Pi,929,Rho,931,Sigma,932,Tau,933,Upsilon,934,Phi,935,Chi,936,Psi,937,Omega,945,alpha,946,beta,947,gamma,948,delta,949,epsilon,950,zeta,951,eta,952,theta,953,iota,954,kappa,955,lambda,956,mu,957,nu,958,xi,959,omicron,960,pi,961,rho,962,sigmaf,963,sigma,964,tau,965,upsilon,966,phi,967,chi,968,psi,969,omega,977,thetasym,978,upsih,982,piv,8226,bull,8230,hellip,8242,prime,8243,Prime,8254,oline,8260,frasl,8472,weierp,8465,image,8476,real,8482,trade,8501,alefsym,8592,larr,8593,uarr,8594,rarr,8595,darr,8596,harr,8629,crarr,8656,lArr,8657,uArr,8658,rArr,8659,dArr,8660,hArr,8704,forall,8706,part,8707,exist,8709,empty,8711,nabla,8712,isin,8713,notin,8715,ni,8719,prod,8721,sum,8722,minus,8727,lowast,8730,radic,8733,prop,8734,infin,8736,ang,8743,and,8744,or,8745,cap,8746,cup,8747,int,8756,there4,8764,sim,8773,cong,8776,asymp,8800,ne,8801,equiv,8804,le,8805,ge,8834,sub,8835,sup,8836,nsub,8838,sube,8839,supe,8853,oplus,8855,otimes,8869,perp,8901,sdot,8968,lceil,8969,rceil,8970,lfloor,8971,rfloor,9001,lang,9002,rang,9674,loz,9824,spades,9827,clubs,9829,hearts,9830,diams,338,OElig,339,oelig,352,Scaron,353,scaron,376,Yuml,710,circ,732,tilde,8194,ensp,8195,emsp,8201,thinsp,8204,zwnj,8205,zwj,8206,lrm,8207,rlm,8211,ndash,8212,mdash,8216,lsquo,8217,rsquo,8218,sbquo,8220,ldquo,8221,rdquo,8222,bdquo,8224,dagger,8225,Dagger,8240,permil,8249,lsaquo,8250,rsaquo,8364,euro',valid_elements:'*[*]',extended_valid_elements:0,valid_child_elements:0,invalid_elements:0,fix_table_elements:0,fix_list_elements:true,fix_content_duplication:true,convert_fonts_to_spans:false,font_size_classes:0,font_size_style_values:0,apply_source_formatting:0,indent_mode:'simple',indent_char:'\t',indent_levels:1,remove_linebreaks:1},s);t.dom=s.dom;if(s.fix_list_elements){t.onPreProcess.add(function(se,o){var nl,x,a=['ol','ul'],i,n,p,r=/^(OL|UL)$/,np;function prevNode(e,n){var a=n.split(','),i;while((e=e.previousSibling)!=null){for(i=0;i<a.length;i++){if(e.nodeName==a[i])return e;}}return null;};for(x=0;x<a.length;x++){nl=t.dom.select(a[x],o.node);for(i=0;i<nl.length;i++){n=nl[i];p=n.parentNode;if(r.test(p.nodeName)){np=prevNode(n,'LI');if(!np){np=t.dom.create('li');np.innerHTML='&nbsp;';np.appendChild(n);p.insertBefore(np,p.firstChild);}else np.appendChild(n);}}}});}if(s.fix_table_elements){t.onPreProcess.add(function(se,o){each(t.dom.select('table',o.node),function(e){var pa=t.dom.getParent(e,'H1,H2,H3,H4,H5,H6,P'),pa2,n,tm,pl=[],i,ns;if(pa){pa2=pa.cloneNode(false);pl.push(e);for(n=e;n=n.parentNode;){pl.push(n);if(n==pa)break;}tm=pa2;for(i=pl.length-1;i>=0;i--){if(i==pl.length-1){while(ns=pl[i-1].nextSibling)tm.appendChild(ns.parentNode.removeChild(ns));}else{n=pl[i].cloneNode(false);if(i!=0){while(ns=pl[i-1].nextSibling)n.appendChild(ns.parentNode.removeChild(ns));}tm=tm.appendChild(n);}}e=t.dom.insertAfter(e.parentNode.removeChild(e),pa);t.dom.insertAfter(e,pa);t.dom.insertAfter(pa2,e);}});});}},setEntities:function(s){var t=this,a,i,l={},re='',v;if(t.entityLookup)return;a=s.split(',');for(i=0;i<a.length;i+=2){v=a[i];if(v==34||v==38||v==60||v==62)continue;l[String.fromCharCode(a[i])]=a[i+1];v=parseInt(a[i]).toString(16);re+='\\u'+'0000'.substring(v.length)+v;}if(!re){t.settings.entity_encoding='raw';return;}t.entitiesRE=new RegExp('['+re+']','g');t.entityLookup=l;},setValidChildRules:function(s){this.childRules=null;this.addValidChildRules(s);},addValidChildRules:function(s){var t=this,inst,intr,bloc;if(!s)return;inst='A|BR|SPAN|BDO|MAP|OBJECT|IMG|TT|I|B|BIG|SMALL|EM|STRONG|DFN|CODE|Q|SAMP|KBD|VAR|CITE|ABBR|ACRONYM|SUB|SUP|#text|#comment';intr='A|BR|SPAN|BDO|OBJECT|APPLET|IMG|MAP|IFRAME|TT|I|B|U|S|STRIKE|BIG|SMALL|FONT|BASEFONT|EM|STRONG|DFN|CODE|Q|SAMP|KBD|VAR|CITE|ABBR|ACRONYM|SUB|SUP|INPUT|SELECT|TEXTAREA|LABEL|BUTTON|#text|#comment';bloc='H[1-6]|P|DIV|ADDRESS|PRE|FORM|TABLE|LI|OL|UL|TD|CAPTION|BLOCKQUOTE|CENTER|DL|DT|DD|DIR|FIELDSET|FORM|NOSCRIPT|NOFRAMES|MENU|ISINDEX|SAMP';each(s.split(','),function(s){var p=s.split(/\[|\]/),re;s='';each(p[1].split('|'),function(v){if(s)s+='|';switch(v){case'%itrans':v=intr;break;case'%itrans_na':v=intr.substring(2);break;case'%istrict':v=inst;break;case'%istrict_na':v=inst.substring(2);break;case'%btrans':v=bloc;break;case'%bstrict':v=bloc;break;}s+=v;});re=new RegExp('^('+s.toLowerCase()+')$','i');each(p[0].split('/'),function(s){t.childRules=t.childRules||{};t.childRules[s]=re;});});s='';each(t.childRules,function(v,k){if(s)s+='|';s+=k;});t.parentElementsRE=new RegExp('^('+s.toLowerCase()+')$','i');},setRules:function(s){var t=this;t._setup();t.rules={};t.wildRules=[];t.validElements={};return t.addRules(s);},addRules:function(s){var t=this,dr;if(!s)return;t._setup();each(s.split(','),function(s){var p=s.split(/\[|\]/),tn=p[0].split('/'),ra,at,wat,va=[];if(dr)at=tinymce.extend([],dr.attribs);if(p.length>1){each(p[1].split('|'),function(s){var ar={},i;at=at||[];s=s.replace(/::/g,'~');s=/^([!\-])?([\w*.?~_\-]+|)([=:<])?(.+)?$/.exec(s);s[2]=s[2].replace(/~/g,':');if(s[1]=='!'){ra=ra||[];ra.push(s[2]);}if(s[1]=='-'){for(i=0;i<at.length;i++){if(at[i].name==s[2]){at.splice(i,1);return;}}}switch(s[3]){case'=':ar.defaultVal=s[4]||'';break;case':':ar.forcedVal=s[4];break;case'<':ar.validVals=s[4].split('?');break;}if(/[*.?]/.test(s[2])){wat=wat||[];ar.nameRE=new RegExp('^'+wildcardToRE(s[2])+'$');wat.push(ar);}else{ar.name=s[2];at.push(ar);}va.push(s[2]);});}each(tn,function(s,i){var pr=s.charAt(0),x=1,ru={};if(dr){if(dr.noEmpty)ru.noEmpty=dr.noEmpty;if(dr.fullEnd)ru.fullEnd=dr.fullEnd;if(dr.padd)ru.padd=dr.padd;}switch(pr){case'-':ru.noEmpty=true;break;case'+':ru.fullEnd=true;break;case'#':ru.padd=true;break;default:x=0;}tn[i]=s=s.substring(x);t.validElements[s]=1;if(/[*.?]/.test(tn[0])){ru.nameRE=new RegExp('^'+wildcardToRE(tn[0])+'$');t.wildRules=t.wildRules||{};t.wildRules.push(ru);}else{ru.name=tn[0];if(tn[0]=='@')dr=ru;t.rules[s]=ru;}ru.attribs=at;if(ra)ru.requiredAttribs=ra;if(wat){s='';each(va,function(v){if(s)s+='|';s+='('+wildcardToRE(v)+')';});ru.validAttribsRE=new RegExp('^'+s.toLowerCase()+'$');ru.wildAttribs=wat;}});});s='';each(t.validElements,function(v,k){if(s)s+='|';if(k!='@')s+=k;});t.validElementsRE=new RegExp('^('+wildcardToRE(s.toLowerCase())+')$');},findRule:function(n){var t=this,rl=t.rules,i,r;t._setup();r=rl[n];if(r)return r;rl=t.wildRules;for(i=0;i<rl.length;i++){if(rl[i].nameRE.test(n))return rl[i];}return null;},findAttribRule:function(ru,n){var i,wa=ru.wildAttribs;for(i=0;i<wa.length;i++){if(wa[i].nameRE.test(n))return wa[i];}return null;},serialize:function(n,o){var h,t=this;t._setup();o=o||{};o.format=o.format||'html';t.processObj=o;n=n.cloneNode(true);t.key=''+(parseInt(t.key)+1);if(!o.no_events){o.node=n;t.onPreProcess.dispatch(t,o);}t.writer.reset();t._serializeNode(n,o.getInner);o.content=t.writer.getContent();if(!o.no_events)t.onPostProcess.dispatch(t,o);t._postProcess(o);o.node=null;return tinymce.trim(o.content);},_postProcess:function(o){var t=this,s=t.settings,h=o.content,sc=[],p;if(o.format=='html'){p=t._protect({content:h,patterns:[{pattern:/(<script[^>]*>)(.*?)(<\/script>)/g},{pattern:/(<style[^>]*>)(.*?)(<\/style>)/g},{pattern:/(<pre[^>]*>)(.*?)(<\/pre>)/g,encode:1}]});h=p.content;if(s.entity_encoding!=='raw')h=t._encode(h);if(!o.set){h=h.replace(/<p>\s+<\/p>|<p([^>]+)>\s+<\/p>/g,s.entity_encoding=='numeric'?'<p$1>&#160;</p>':'<p$1>&nbsp;</p>');if(s.remove_linebreaks){h=h.replace(/\r?\n|\r/g,' ');h=h.replace(/(<[^>]+>)\s+/g,'$1 ');h=h.replace(/\s+(<\/[^>]+>)/g,' $1');h=h.replace(/<(p|h[1-6]|blockquote|hr|div|table|tbody|tr|td|body|head|html|title|meta|style|pre|script|link|object) ([^>]+)>\s+/g,'<$1 $2>');h=h.replace(/<(p|h[1-6]|blockquote|hr|div|table|tbody|tr|td|body|head|html|title|meta|style|pre|script|link|object)>\s+/g,'<$1>');h=h.replace(/\s+<\/(p|h[1-6]|blockquote|hr|div|table|tbody|tr|td|body|head|html|title|meta|style|pre|script|link|object)>/g,'</$1>');}if(s.apply_source_formatting&&s.indent_mode=='simple'){h=h.replace(/<(\/?)(ul|hr|table|meta|link|tbody|tr|object|body|head|html|map)(|[^>]+)>\s*/g,'\n<$1$2$3>\n');h=h.replace(/\s*<(p|h[1-6]|blockquote|div|title|style|pre|script|td|li|area)(|[^>]+)>/g,'\n<$1$2>');h=h.replace(/<\/(p|h[1-6]|blockquote|div|title|style|pre|script|td|li)>\s*/g,'</$1>\n');h=h.replace(/\n\n/g,'\n');}}h=t._unprotect(h,p);if(s.entity_encoding=='raw')h=h.replace(/<p>&nbsp;<\/p>|<p([^>]+)>&nbsp;<\/p>/g,'<p$1>\u00a0</p>');}o.content=h;},_serializeNode:function(n,inn){var t=this,s=t.settings,w=t.writer,hc,el,cn,i,l,a,at,no,v,nn,ru,ar,iv;if(!s.node_filter||s.node_filter(n)){switch(n.nodeType){case 1:if(n.hasAttribute?n.hasAttribute('mce_bogus'):n.getAttribute('mce_bogus'))return;iv=false;hc=n.hasChildNodes();nn=n.getAttribute('mce_name')||n.nodeName.toLowerCase();if(isIE){if(n.scopeName!=='HTML'&&n.scopeName!=='html')nn=n.scopeName+':'+nn;}if(nn.indexOf('mce:')===0)nn=nn.substring(4);if(!t.validElementsRE.test(nn)||(t.invalidElementsRE&&t.invalidElementsRE.test(nn))||inn){iv=true;break;}if(isIE){if(s.fix_content_duplication){if(n.mce_serialized==t.key)return;n.mce_serialized=t.key;}if(nn.charAt(0)=='/')nn=nn.substring(1);}else if(isGecko){if(n.nodeName==='BR'&&n.getAttribute('type')=='_moz')return;}if(t.childRules){if(t.parentElementsRE.test(t.elementName)){if(!t.childRules[t.elementName].test(nn)){iv=true;break;}}t.elementName=nn;}ru=t.findRule(nn);nn=ru.name||nn;if((!hc&&ru.noEmpty)||(isIE&&!nn)){iv=true;break;}if(ru.requiredAttribs){a=ru.requiredAttribs;for(i=a.length-1;i>=0;i--){if(this.dom.getAttrib(n,a[i])!=='')break;}if(i==-1){iv=true;break;}}w.writeStartElement(nn);if(ru.attribs){for(i=0,at=ru.attribs,l=at.length;i<l;i++){a=at[i];v=t._getAttrib(n,a);if(v!==null)w.writeAttribute(a.name,v);}}if(ru.validAttribsRE){at=isIE?getIEAtts(n):n.attributes;for(i=at.length-1;i>-1;i--){no=at[i];if(no.specified){a=no.nodeName.toLowerCase();if(s.invalid_attrs.test(a)||!ru.validAttribsRE.test(a))continue;ar=t.findAttribRule(ru,a);v=t._getAttrib(n,ar,a);if(v!==null)w.writeAttribute(a,v);}}}if(!hc&&ru.padd)w.writeText('\u00a0');break;case 3:if(t.childRules&&t.parentElementsRE.test(t.elementName)){if(!t.childRules[t.elementName].test(n.nodeName))return;}return w.writeText(n.nodeValue);case 4:return w.writeCDATA(n.nodeValue);case 8:return w.writeComment(n.nodeValue);}}else if(n.nodeType==1)hc=n.hasChildNodes();if(hc){cn=n.firstChild;while(cn){t._serializeNode(cn);t.elementName=nn;cn=cn.nextSibling;}}if(!iv){if(hc||!s.closed.test(nn))w.writeFullEndElement();else w.writeEndElement();}},_protect:function(o){var t=this;o.items=o.items||[];function enc(s){return s.replace(/[\r\n\\]/g,function(c){if(c==='\n')return'\\n';else if(c==='\\')return'\\\\';return'\\r';});};function dec(s){return s.replace(/\\[\\rn]/g,function(c){if(c==='\\n')return'\n';else if(c==='\\\\')return'\\';return'\r';});};each(o.patterns,function(p){o.content=dec(enc(o.content).replace(p.pattern,function(x,a,b,c){b=dec(b);if(p.encode)b=t._encode(b);o.items.push(b);return a+'<!--mce:'+(o.items.length-1)+'-->'+c;}));});return o;},_unprotect:function(h,o){h=h.replace(/\<!--mce:([0-9]+)--\>/g,function(a,b){return o.items[parseInt(b)];});o.items=[];return h;},_encode:function(h){var t=this,s=t.settings,l;if(s.entity_encoding!=='raw'){if(s.entity_encoding.indexOf('named')!=-1){t.setEntities(s.entities);l=t.entityLookup;h=h.replace(t.entitiesRE,function(a){var v;if(v=l[a])a='&'+v+';';return a;});}if(s.entity_encoding.indexOf('numeric')!=-1){h=h.replace(/[\u007E-\uFFFF]/g,function(a){return'&#'+a.charCodeAt(0)+';';});}}return h;},_setup:function(){var t=this,s=this.settings;if(t.done)return;t.done=1;t.setRules(s.valid_elements);t.addRules(s.extended_valid_elements);t.addValidChildRules(s.valid_child_elements);if(s.invalid_elements)t.invalidElementsRE=new RegExp('^('+wildcardToRE(s.invalid_elements.replace(/,/g,'|').toLowerCase())+')$');if(s.attrib_value_filter)t.attribValueFilter=s.attribValueFilter;},_getAttrib:function(n,a,na){var i,v;na=na||a.name;if(a.forcedVal&&(v=a.forcedVal)){if(v==='{$uid}')return this.dom.uniqueId();return v;}v=this.dom.getAttrib(n,na);switch(na){case'rowspan':case'colspan':if(v=='1')v='';break;}if(this.attribValueFilter)v=this.attribValueFilter(na,v,n);if(a.validVals){for(i=a.validVals.length-1;i>=0;i--){if(v==a.validVals[i])break;}if(i==-1)return null;}if(v===''&&typeof(a.defaultVal)!='undefined'){v=a.defaultVal;if(v==='{$uid}')return this.dom.uniqueId();return v;}else{if(na=='class'&&this.processObj.get)v=v.replace(/\s?mceItem\w+\s?/g,'');}if(v==='')return null;return v;}});})();(function(){var each=tinymce.each;tinymce.create('tinymce.dom.ScriptLoader',{ScriptLoader:function(s){this.settings=s||{};this.queue=[];this.lookup={};},isDone:function(u){return this.lookup[u]?this.lookup[u].state==2:0;},markDone:function(u){this.lookup[u]={state:2,url:u};},add:function(u,cb,s,pr){var t=this,lo=t.lookup,o;if(o=lo[u]){if(cb&&o.state==2)cb.call(s||this);return o;}o={state:0,url:u,func:cb,scope:s||this};if(pr)t.queue.unshift(o);else t.queue.push(o);lo[u]=o;return o;},load:function(u,cb,s){var t=this,o;if(o=t.lookup[u]){if(cb&&o.state==2)cb.call(s||t);return o;}function loadScript(u){if(tinymce.dom.Event.domLoaded||t.settings.strict_mode){tinymce.util.XHR.send({url:tinymce._addVer(u),error:t.settings.error,async:false,success:function(co){t.eval(co);}});}else document.write('<script type="text/javascript" src="'+tinymce._addVer(u)+'"></script>');};if(!tinymce.is(u,'string')){each(u,function(u){loadScript(u);});if(cb)cb.call(s||t);}else{loadScript(u);if(cb)cb.call(s||t);}},loadQueue:function(cb,s){var t=this;if(!t.queueLoading){t.queueLoading=1;t.queueCallbacks=[];t.loadScripts(t.queue,function(){t.queueLoading=0;if(cb)cb.call(s||t);each(t.queueCallbacks,function(o){o.func.call(o.scope);});});}else if(cb)t.queueCallbacks.push({func:cb,scope:s||t});},eval:function(co){var w=window;if(!w.execScript){try{eval.call(w,co);}catch(ex){eval(co,w);}}else w.execScript(co);},loadScripts:function(sc,cb,s){var t=this,lo=t.lookup;function done(o){o.state=2;if(o.func)o.func.call(o.scope||t);};function allDone(){var l;l=sc.length;each(sc,function(o){o=lo[o.url];if(o.state===2){done(o);l--;}else load(o);});if(l===0&&cb){cb.call(s||t);cb=0;}};function load(o){if(o.state>0)return;o.state=1;tinymce.util.XHR.send({url:o.url,error:t.settings.error,success:function(co){t.eval(co);done(o);allDone();}});};each(sc,function(o){var u=o.url;if(!lo[u]){lo[u]=o;t.queue.push(o);}else o=lo[u];if(o.state>0)return;if(!tinymce.dom.Event.domLoaded&&!t.settings.strict_mode){var ix,ol='';if(cb||o.func){o.state=1;ix=tinymce.dom.ScriptLoader._addOnLoad(function(){done(o);allDone();});if(tinymce.isIE)ol=' onreadystatechange="';else ol=' onload="';ol+='tinymce.dom.ScriptLoader._onLoad(this,\''+u+'\','+ix+');"';}document.write('<script type="text/javascript" src="'+tinymce._addVer(u)+'"'+ol+'></script>');if(!o.func)done(o);}else load(o);});allDone();},'static':{_addOnLoad:function(f){var t=this;t._funcs=t._funcs||[];t._funcs.push(f);return t._funcs.length-1;},_onLoad:function(e,u,ix){if(!tinymce.isIE||e.readyState=='complete')this._funcs[ix].call(this);}}});tinymce.ScriptLoader=new tinymce.dom.ScriptLoader();})();(function(){var DOM=tinymce.DOM,is=tinymce.is;tinymce.create('tinymce.ui.Control',{Control:function(id,s){this.id=id;this.settings=s=s||{};this.rendered=false;this.onRender=new tinymce.util.Dispatcher(this);this.classPrefix='';this.scope=s.scope||this;this.disabled=0;this.active=0;},setDisabled:function(s){var e;if(s!=this.disabled){e=DOM.get(this.id);if(e&&this.settings.unavailable_prefix){if(s){this.prevTitle=e.title;e.title=this.settings.unavailable_prefix+": "+e.title;}else e.title=this.prevTitle;}this.setState('Disabled',s);this.setState('Enabled',!s);this.disabled=s;}},isDisabled:function(){return this.disabled;},setActive:function(s){if(s!=this.active){this.setState('Active',s);this.active=s;}},isActive:function(){return this.active;},setState:function(c,s){var n=DOM.get(this.id);c=this.classPrefix+c;if(s)DOM.addClass(n,c);else DOM.removeClass(n,c);},isRendered:function(){return this.rendered;},renderHTML:function(){},renderTo:function(n){DOM.setHTML(n,this.renderHTML());},postRender:function(){var t=this,b;if(is(t.disabled)){b=t.disabled;t.disabled=-1;t.setDisabled(b);}if(is(t.active)){b=t.active;t.active=-1;t.setActive(b);}},remove:function(){DOM.remove(this.id);this.destroy();},destroy:function(){tinymce.dom.Event.clear(this.id);}});})();tinymce.create('tinymce.ui.Container:tinymce.ui.Control',{Container:function(id,s){this.parent(id,s);this.controls=[];this.lookup={};},add:function(c){this.lookup[c.id]=c;this.controls.push(c);return c;},get:function(n){return this.lookup[n];}});tinymce.create('tinymce.ui.Separator:tinymce.ui.Control',{Separator:function(id,s){this.parent(id,s);this.classPrefix='mceSeparator';},renderHTML:function(){return tinymce.DOM.createHTML('span',{'class':this.classPrefix});}});(function(){var is=tinymce.is,DOM=tinymce.DOM,each=tinymce.each,walk=tinymce.walk;tinymce.create('tinymce.ui.MenuItem:tinymce.ui.Control',{MenuItem:function(id,s){this.parent(id,s);this.classPrefix='mceMenuItem';},setSelected:function(s){this.setState('Selected',s);this.selected=s;},isSelected:function(){return this.selected;},postRender:function(){var t=this;t.parent();if(is(t.selected))t.setSelected(t.selected);}});})();(function(){var is=tinymce.is,DOM=tinymce.DOM,each=tinymce.each,walk=tinymce.walk;tinymce.create('tinymce.ui.Menu:tinymce.ui.MenuItem',{Menu:function(id,s){var t=this;t.parent(id,s);t.items={};t.collapsed=false;t.menuCount=0;t.onAddItem=new tinymce.util.Dispatcher(this);},expand:function(d){var t=this;if(d){walk(t,function(o){if(o.expand)o.expand();},'items',t);}t.collapsed=false;},collapse:function(d){var t=this;if(d){walk(t,function(o){if(o.collapse)o.collapse();},'items',t);}t.collapsed=true;},isCollapsed:function(){return this.collapsed;},add:function(o){if(!o.settings)o=new tinymce.ui.MenuItem(o.id||DOM.uniqueId(),o);this.onAddItem.dispatch(this,o);return this.items[o.id]=o;},addSeparator:function(){return this.add({separator:true});},addMenu:function(o){if(!o.collapse)o=this.createMenu(o);this.menuCount++;return this.add(o);},hasMenus:function(){return this.menuCount!==0;},remove:function(o){delete this.items[o.id];},removeAll:function(){var t=this;walk(t,function(o){if(o.removeAll)o.removeAll();else o.remove();o.destroy();},'items',t);t.items={};},createMenu:function(o){var m=new tinymce.ui.Menu(o.id||DOM.uniqueId(),o);m.onAddItem.add(this.onAddItem.dispatch,this.onAddItem);return m;}});})();(function(){var is=tinymce.is,DOM=tinymce.DOM,each=tinymce.each,Event=tinymce.dom.Event,Element=tinymce.dom.Element;tinymce.create('tinymce.ui.DropMenu:tinymce.ui.Menu',{DropMenu:function(id,s){s=s||{};s.container=s.container||DOM.doc.body;s.offset_x=s.offset_x||0;s.offset_y=s.offset_y||0;s.vp_offset_x=s.vp_offset_x||0;s.vp_offset_y=s.vp_offset_y||0;if(is(s.icons)&&!s.icons)s['class']+=' mceNoIcons';this.parent(id,s);this.onShowMenu=new tinymce.util.Dispatcher(this);this.onHideMenu=new tinymce.util.Dispatcher(this);this.classPrefix='mceMenu';},createMenu:function(s){var t=this,cs=t.settings,m;s.container=s.container||cs.container;s.parent=t;s.constrain=s.constrain||cs.constrain;s['class']=s['class']||cs['class'];s.vp_offset_x=s.vp_offset_x||cs.vp_offset_x;s.vp_offset_y=s.vp_offset_y||cs.vp_offset_y;m=new tinymce.ui.DropMenu(s.id||DOM.uniqueId(),s);m.onAddItem.add(t.onAddItem.dispatch,t.onAddItem);return m;},update:function(){var t=this,s=t.settings,tb=DOM.get('menu_'+t.id+'_tbl'),co=DOM.get('menu_'+t.id+'_co'),tw,th;tw=s.max_width?Math.min(tb.clientWidth,s.max_width):tb.clientWidth;th=s.max_height?Math.min(tb.clientHeight,s.max_height):tb.clientHeight;if(!DOM.boxModel)t.element.setStyles({width:tw+2,height:th+2});else t.element.setStyles({width:tw,height:th});if(s.max_width)DOM.setStyle(co,'width',tw);if(s.max_height){DOM.setStyle(co,'height',th);if(tb.clientHeight<s.max_height)DOM.setStyle(co,'overflow','hidden');}},showMenu:function(x,y,px){var t=this,s=t.settings,co,vp=DOM.getViewPort(),w,h,mx,my,ot=2,dm,tb,cp=t.classPrefix;t.collapse(1);if(t.isMenuVisible)return;if(!t.rendered){co=DOM.add(t.settings.container,t.renderNode());each(t.items,function(o){o.postRender();});t.element=new Element('menu_'+t.id,{blocker:1,container:s.container});}else co=DOM.get('menu_'+t.id);if(!tinymce.isOpera)DOM.setStyles(co,{left:-0xFFFF,top:-0xFFFF});DOM.show(co);t.update();x+=s.offset_x||0;y+=s.offset_y||0;vp.w-=4;vp.h-=4;if(s.constrain){w=co.clientWidth-ot;h=co.clientHeight-ot;mx=vp.x+vp.w;my=vp.y+vp.h;if((x+s.vp_offset_x+w)>mx)x=px?px-w:Math.max(0,(mx-s.vp_offset_x)-w);if((y+s.vp_offset_y+h)>my)y=Math.max(0,(my-s.vp_offset_y)-h);}DOM.setStyles(co,{left:x,top:y});t.element.update();t.isMenuVisible=1;t.mouseClickFunc=Event.add(co,'click',function(e){var m;e=e.target;if(e&&(e=DOM.getParent(e,'TR'))&&!DOM.hasClass(e,cp+'ItemSub')){m=t.items[e.id];if(m.isDisabled())return;dm=t;while(dm){if(dm.hideMenu)dm.hideMenu();dm=dm.settings.parent;}if(m.settings.onclick)m.settings.onclick(e);return Event.cancel(e);}});if(t.hasMenus()){t.mouseOverFunc=Event.add(co,'mouseover',function(e){var m,r,mi;e=e.target;if(e&&(e=DOM.getParent(e,'TR'))){m=t.items[e.id];if(t.lastMenu)t.lastMenu.collapse(1);if(m.isDisabled())return;if(e&&DOM.hasClass(e,cp+'ItemSub')){r=DOM.getRect(e);m.showMenu((r.x+r.w-ot),r.y-ot,r.x);t.lastMenu=m;DOM.addClass(DOM.get(m.id).firstChild,cp+'ItemActive');}}});}t.onShowMenu.dispatch(t);if(s.keyboard_focus){Event.add(co,'keydown',t._keyHandler,t);DOM.select('a','menu_'+t.id)[0].focus();t._focusIdx=0;}},hideMenu:function(c){var t=this,co=DOM.get('menu_'+t.id),e;if(!t.isMenuVisible)return;Event.remove(co,'mouseover',t.mouseOverFunc);Event.remove(co,'click',t.mouseClickFunc);Event.remove(co,'keydown',t._keyHandler);DOM.hide(co);t.isMenuVisible=0;if(!c)t.collapse(1);if(t.element)t.element.hide();if(e=DOM.get(t.id))DOM.removeClass(e.firstChild,t.classPrefix+'ItemActive');t.onHideMenu.dispatch(t);},add:function(o){var t=this,co;o=t.parent(o);if(t.isRendered&&(co=DOM.get('menu_'+t.id)))t._add(DOM.select('tbody',co)[0],o);return o;},collapse:function(d){this.parent(d);this.hideMenu(1);},remove:function(o){DOM.remove(o.id);this.destroy();return this.parent(o);},destroy:function(){var t=this,co=DOM.get('menu_'+t.id);Event.remove(co,'mouseover',t.mouseOverFunc);Event.remove(co,'click',t.mouseClickFunc);if(t.element)t.element.remove();DOM.remove(co);},renderNode:function(){var t=this,s=t.settings,n,tb,co,w;w=DOM.create('div',{id:'menu_'+t.id,'class':s['class'],'style':'position:absolute;left:0;top:0;z-index:200000'});co=DOM.add(w,'div',{id:'menu_'+t.id+'_co','class':t.classPrefix+(s['class']?' '+s['class']:'')});t.element=new Element('menu_'+t.id,{blocker:1,container:s.container});if(s.menu_line)DOM.add(co,'span',{'class':t.classPrefix+'Line'});n=DOM.add(co,'table',{id:'menu_'+t.id+'_tbl',border:0,cellPadding:0,cellSpacing:0});tb=DOM.add(n,'tbody');each(t.items,function(o){t._add(tb,o);});t.rendered=true;return w;},_keyHandler:function(e){var t=this,kc=e.keyCode;function focus(d){var i=t._focusIdx+d,e=DOM.select('a','menu_'+t.id)[i];if(e){t._focusIdx=i;e.focus();}};switch(kc){case 38:focus(-1);return;case 40:focus(1);return;case 13:return;case 27:return this.hideMenu();}},_add:function(tb,o){var n,s=o.settings,a,ro,it,cp=this.classPrefix;if(s.separator){ro=DOM.add(tb,'tr',{id:o.id,'class':cp+'ItemSeparator'});DOM.add(ro,'td',{'class':cp+'ItemSeparator'});if(n=ro.previousSibling)DOM.addClass(n,'mceLast');return;}n=ro=DOM.add(tb,'tr',{id:o.id,'class':cp+'Item '+cp+'ItemEnabled'});n=it=DOM.add(n,'td');n=a=DOM.add(n,'a',{href:'javascript:;',onclick:"return false;",onmousedown:'return false;'});DOM.addClass(it,s['class']);DOM.add(n,'span',{'class':'mceIcon'+(s.icon?' mce_'+s.icon:'')});n=DOM.add(n,s.element||'span',{'class':'mceText',title:o.settings.title},o.settings.title);if(o.settings.style)DOM.setAttrib(n,'style',o.settings.style);if(tb.childNodes.length==1)DOM.addClass(ro,'mceFirst');if((n=ro.previousSibling)&&DOM.hasClass(n,cp+'ItemSeparator'))DOM.addClass(ro,'mceFirst');if(o.collapse)DOM.addClass(ro,cp+'ItemSub');if(n=ro.previousSibling)DOM.removeClass(n,'mceLast');DOM.addClass(ro,'mceLast');}});})();(function(){var DOM=tinymce.DOM;tinymce.create('tinymce.ui.Button:tinymce.ui.Control',{Button:function(id,s){this.parent(id,s);this.classPrefix='mceButton';},renderHTML:function(){var cp=this.classPrefix,s=this.settings,h,l;l=DOM.encode(s.label||'');h='<a id="'+this.id+'" href="javascript:;" class="'+cp+' '+cp+'Enabled '+s['class']+(l?' '+cp+'Labeled':'')+'" onmousedown="return false;" onclick="return false;" title="'+DOM.encode(s.title)+'">';if(s.image)h+='<img class="mceIcon" src="'+s.image+'" />'+l+'</a>';else h+='<span class="mceIcon '+s['class']+'"></span>'+(l?'<span class="'+cp+'Label">'+l+'</span>':'')+'</a>';return h;},postRender:function(){var t=this,s=t.settings;tinymce.dom.Event.add(t.id,'click',function(e){if(!t.isDisabled())return s.onclick.call(s.scope,e);});}});})();(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,each=tinymce.each,Dispatcher=tinymce.util.Dispatcher;tinymce.create('tinymce.ui.ListBox:tinymce.ui.Control',{ListBox:function(id,s){var t=this;t.parent(id,s);t.items=[];t.onChange=new Dispatcher(t);t.onPostRender=new Dispatcher(t);t.onAdd=new Dispatcher(t);t.onRenderMenu=new tinymce.util.Dispatcher(this);t.classPrefix='mceListBox';},select:function(v){var t=this,e,fv;if(v!=t.selectedValue){e=DOM.get(t.id+'_text');t.selectedValue=v;each(t.items,function(o){if(o.value==v){DOM.setHTML(e,DOM.encode(o.title));fv=1;return false;}});if(!fv){DOM.setHTML(e,DOM.encode(t.settings.title));DOM.addClass(e,'mceTitle');e=0;return;}else DOM.removeClass(e,'mceTitle');}e=0;},add:function(n,v,o){var t=this;o=o||{};o=tinymce.extend(o,{title:n,value:v});t.items.push(o);t.onAdd.dispatch(t,o);},getLength:function(){return this.items.length;},renderHTML:function(){var h='',t=this,s=t.settings,cp=t.classPrefix;h='<table id="'+t.id+'" cellpadding="0" cellspacing="0" class="'+cp+' '+cp+'Enabled'+(s['class']?(' '+s['class']):'')+'"><tbody><tr>';h+='<td>'+DOM.createHTML('a',{id:t.id+'_text',href:'javascript:;','class':'mceText',onclick:"return false;",onmousedown:'return false;'},DOM.encode(t.settings.title))+'</td>';h+='<td>'+DOM.createHTML('a',{id:t.id+'_open',tabindex:-1,href:'javascript:;','class':'mceOpen',onclick:"return false;",onmousedown:'return false;'},'<span></span>')+'</td>';h+='</tr></tbody></table>';return h;},showMenu:function(){var t=this,p1,p2,e=DOM.get(this.id),m;if(t.isDisabled()||t.items.length==0)return;if(t.menu&&t.menu.isMenuVisible)return t.hideMenu();if(!t.isMenuRendered){t.renderMenu();t.isMenuRendered=true;}p1=DOM.getPos(this.settings.menu_container);p2=DOM.getPos(e);m=t.menu;m.settings.offset_x=p2.x;m.settings.offset_y=p2.y;m.settings.keyboard_focus=!tinymce.isOpera;if(t.oldID)m.items[t.oldID].setSelected(0);each(t.items,function(o){if(o.value===t.selectedValue){m.items[o.id].setSelected(1);t.oldID=o.id;}});m.showMenu(0,e.clientHeight);Event.add(DOM.doc,'mousedown',t.hideMenu,t);DOM.addClass(t.id,t.classPrefix+'Selected');},hideMenu:function(e){var t=this;if(e&&e.type=="mousedown"&&(e.target.id==t.id+'_text'||e.target.id==t.id+'_open'))return;if(!e||!DOM.getParent(e.target,function(n){return DOM.hasClass(n,'mceMenu');})){DOM.removeClass(t.id,t.classPrefix+'Selected');Event.remove(DOM.doc,'mousedown',t.hideMenu,t);if(t.menu)t.menu.hideMenu();}},renderMenu:function(){var t=this,m;m=t.settings.control_manager.createDropMenu(t.id+'_menu',{menu_line:1,'class':t.classPrefix+'Menu mceNoIcons',max_width:150,max_height:150});m.onHideMenu.add(t.hideMenu,t);m.add({title:t.settings.title,'class':'mceMenuItemTitle',onclick:function(){if(t.settings.onselect('')!==false)t.select('');}});each(t.items,function(o){o.id=DOM.uniqueId();o.onclick=function(){if(t.settings.onselect(o.value)!==false)t.select(o.value);};m.add(o);});t.onRenderMenu.dispatch(t,m);t.menu=m;},postRender:function(){var t=this,cp=t.classPrefix;Event.add(t.id,'click',t.showMenu,t);Event.add(t.id+'_text','focus',function(e){if(!t._focused){t.keyDownHandler=Event.add(t.id+'_text','keydown',function(e){var idx=-1,v,kc=e.keyCode;each(t.items,function(v,i){if(t.selectedValue==v.value)idx=i;});if(kc==38)v=t.items[idx-1];else if(kc==40)v=t.items[idx+1];else if(kc==13){v=t.selectedValue;t.selectedValue=null;t.settings.onselect(v);return Event.cancel(e);}if(v){t.hideMenu();t.select(v.value);}});}t._focused=1;});Event.add(t.id+'_text','blur',function(){Event.remove(t.id+'_text','keydown',t.keyDownHandler);t._focused=0;});if(tinymce.isIE6||!DOM.boxModel){Event.add(t.id,'mouseover',function(){if(!DOM.hasClass(t.id,cp+'Disabled'))DOM.addClass(t.id,cp+'Hover');});Event.add(t.id,'mouseout',function(){if(!DOM.hasClass(t.id,cp+'Disabled'))DOM.removeClass(t.id,cp+'Hover');});}t.onPostRender.dispatch(t,DOM.get(t.id));},destroy:function(){this.parent();Event.clear(this.id+'_text');}});})();(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,each=tinymce.each,Dispatcher=tinymce.util.Dispatcher;tinymce.create('tinymce.ui.NativeListBox:tinymce.ui.ListBox',{NativeListBox:function(id,s){this.parent(id,s);this.classPrefix='mceNativeListBox';},setDisabled:function(s){DOM.get(this.id).disabled=s;},isDisabled:function(){return DOM.get(this.id).disabled;},select:function(v){var e=DOM.get(this.id),ol=e.options;v=''+(v||'');e.selectedIndex=0;each(ol,function(o,i){if(o.value==v){e.selectedIndex=i;return false;}});},add:function(n,v,a){var o,t=this;a=a||{};a.value=v;if(t.isRendered())DOM.add(DOM.get(this.id),'option',a,n);o={title:n,value:v,attribs:a};t.items.push(o);t.onAdd.dispatch(t,o);},getLength:function(){return DOM.get(this.id).options.length-1;},renderHTML:function(){var h,t=this;h=DOM.createHTML('option',{value:''},'-- '+t.settings.title+' --');each(t.items,function(it){h+=DOM.createHTML('option',{value:it.value},it.title);});h=DOM.createHTML('select',{id:t.id,'class':'mceNativeListBox'},h);return h;},postRender:function(){var t=this,ch;t.rendered=true;function onChange(e){var v=e.target.options[e.target.selectedIndex].value;t.onChange.dispatch(t,v);if(t.settings.onselect)t.settings.onselect(v);};Event.add(t.id,'change',onChange);Event.add(t.id,'keydown',function(e){var bf;Event.remove(t.id,'change',ch);bf=Event.add(t.id,'blur',function(){Event.add(t.id,'change',onChange);Event.remove(t.id,'blur',bf);});if(e.keyCode==13||e.keyCode==32){onChange(e);return Event.cancel(e);}});t.onPostRender.dispatch(t,DOM.get(t.id));}});})();(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,each=tinymce.each;tinymce.create('tinymce.ui.MenuButton:tinymce.ui.Button',{MenuButton:function(id,s){this.parent(id,s);this.onRenderMenu=new tinymce.util.Dispatcher(this);s.menu_container=s.menu_container||DOM.doc.body;},showMenu:function(){var t=this,p1,p2,e=DOM.get(t.id),m;if(t.isDisabled())return;if(!t.isMenuRendered){t.renderMenu();t.isMenuRendered=true;}if(t.isMenuVisible)return t.hideMenu();p1=DOM.getPos(t.settings.menu_container);p2=DOM.getPos(e);m=t.menu;m.settings.offset_x=p2.x;m.settings.offset_y=p2.y;m.settings.vp_offset_x=p2.x;m.settings.vp_offset_y=p2.y;m.settings.keyboard_focus=t._focused;m.showMenu(0,e.clientHeight);Event.add(DOM.doc,'mousedown',t.hideMenu,t);t.setState('Selected',1);t.isMenuVisible=1;},renderMenu:function(){var t=this,m;m=t.settings.control_manager.createDropMenu(t.id+'_menu',{menu_line:1,'class':this.classPrefix+'Menu',icons:t.settings.icons});m.onHideMenu.add(t.hideMenu,t);t.onRenderMenu.dispatch(t,m);t.menu=m;},hideMenu:function(e){var t=this;if(e&&e.type=="mousedown"&&DOM.getParent(e.target,function(e){return e.id===t.id||e.id===t.id+'_open';}))return;if(!e||!DOM.getParent(e.target,function(n){return DOM.hasClass(n,'mceMenu');})){t.setState('Selected',0);Event.remove(DOM.doc,'mousedown',t.hideMenu,t);if(t.menu)t.menu.hideMenu();}t.isMenuVisible=0;},postRender:function(){var t=this,s=t.settings;Event.add(t.id,'click',function(){if(!t.isDisabled()){if(s.onclick)s.onclick(t.value);t.showMenu();}});}});})();(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,each=tinymce.each;tinymce.create('tinymce.ui.SplitButton:tinymce.ui.MenuButton',{SplitButton:function(id,s){this.parent(id,s);this.classPrefix='mceSplitButton';},renderHTML:function(){var h,t=this,s=t.settings,h1;h='<tbody><tr>';if(s.image)h1=DOM.createHTML('img ',{src:s.image,'class':'mceAction '+s['class']});else h1=DOM.createHTML('span',{'class':'mceAction '+s['class']},'');h+='<td>'+DOM.createHTML('a',{id:t.id+'_action',href:'javascript:;','class':'mceAction '+s['class'],onclick:"return false;",onmousedown:'return false;',title:s.title},h1)+'</td>';h1=DOM.createHTML('span',{'class':'mceOpen '+s['class']});h+='<td>'+DOM.createHTML('a',{id:t.id+'_open',href:'javascript:;','class':'mceOpen '+s['class'],onclick:"return false;",onmousedown:'return false;',title:s.title},h1)+'</td>';h+='</tr></tbody>';return DOM.createHTML('table',{id:t.id,'class':'mceSplitButton mceSplitButtonEnabled '+s['class'],cellpadding:'0',cellspacing:'0',onmousedown:'return false;',title:s.title},h);},postRender:function(){var t=this,s=t.settings;if(s.onclick){Event.add(t.id+'_action','click',function(){if(!t.isDisabled())s.onclick(t.value);});}Event.add(t.id+'_open','click',t.showMenu,t);Event.add(t.id+'_open','focus',function(){t._focused=1;});Event.add(t.id+'_open','blur',function(){t._focused=0;});if(tinymce.isIE6||!DOM.boxModel){Event.add(t.id,'mouseover',function(){if(!DOM.hasClass(t.id,'mceSplitButtonDisabled'))DOM.addClass(t.id,'mceSplitButtonHover');});Event.add(t.id,'mouseout',function(){if(!DOM.hasClass(t.id,'mceSplitButtonDisabled'))DOM.removeClass(t.id,'mceSplitButtonHover');});}},destroy:function(){this.parent();Event.clear(this.id+'_action');Event.clear(this.id+'_open');}});})();(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,is=tinymce.is,each=tinymce.each;tinymce.create('tinymce.ui.ColorSplitButton:tinymce.ui.SplitButton',{ColorSplitButton:function(id,s){var t=this;t.parent(id,s);t.settings=s=tinymce.extend({colors:'000000,993300,333300,003300,003366,000080,333399,333333,800000,FF6600,808000,008000,008080,0000FF,666699,808080,FF0000,FF9900,99CC00,339966,33CCCC,3366FF,800080,999999,FF00FF,FFCC00,FFFF00,00FF00,00FFFF,00CCFF,993366,C0C0C0,FF99CC,FFCC99,FFFF99,CCFFCC,CCFFFF,99CCFF,CC99FF,FFFFFF',grid_width:8,default_color:'#888888'},t.settings);t.onShowMenu=new tinymce.util.Dispatcher(t);t.onHideMenu=new tinymce.util.Dispatcher(t);t.value=s.default_color;},showMenu:function(){var t=this,r,p,e,p2;if(t.isDisabled())return;if(!t.isMenuRendered){t.renderMenu();t.isMenuRendered=true;}if(t.isMenuVisible)return t.hideMenu();e=DOM.get(t.id);DOM.show(t.id+'_menu');DOM.addClass(e,'mceSplitButtonSelected');p2=DOM.getPos(e);DOM.setStyles(t.id+'_menu',{left:p2.x,top:p2.y+e.clientHeight,zIndex:200000});e=0;Event.add(DOM.doc,'mousedown',t.hideMenu,t);if(t._focused){t._keyHandler=Event.add(t.id+'_menu','keydown',function(e){if(e.keyCode==27)t.hideMenu();});DOM.select('a',t.id+'_menu')[0].focus();}t.onShowMenu.dispatch(t);t.isMenuVisible=1;},hideMenu:function(e){var t=this;if(e&&e.type=="mousedown"&&DOM.getParent(e.target,function(e){return e.id===t.id+'_open';}))return;if(!e||!DOM.getParent(e.target,function(n){return DOM.hasClass(n,'mceSplitButtonMenu');})){DOM.removeClass(t.id,'mceSplitButtonSelected');Event.remove(DOM.doc,'mousedown',t.hideMenu,t);Event.remove(t.id+'_menu','keydown',t._keyHandler);DOM.hide(t.id+'_menu');}t.onHideMenu.dispatch(t);t.isMenuVisible=0;},renderMenu:function(){var t=this,m,i=0,s=t.settings,n,tb,tr,w;w=DOM.add(s.menu_container,'div',{id:t.id+'_menu','class':s['menu_class']+' '+s['class'],style:'position:absolute;left:0;top:-1000px;'});m=DOM.add(w,'div',{'class':s['class']+' mceSplitButtonMenu'});DOM.add(m,'span',{'class':'mceMenuLine'});n=DOM.add(m,'table',{'class':'mceColorSplitMenu'});tb=DOM.add(n,'tbody');i=0;each(is(s.colors,'array')?s.colors:s.colors.split(','),function(c){c=c.replace(/^#/,'');if(!i--){tr=DOM.add(tb,'tr');i=s.grid_width-1;}n=DOM.add(tr,'td');n=DOM.add(n,'a',{href:'javascript:;',style:{backgroundColor:'#'+c},mce_color:'#'+c});});if(s.more_colors_func){n=DOM.add(tb,'tr');n=DOM.add(n,'td',{colspan:s.grid_width,'class':'mceMoreColors'});n=DOM.add(n,'a',{id:t.id+'_more',href:'javascript:;',onclick:'return false;','class':'mceMoreColors'},s.more_colors_title);Event.add(n,'click',function(e){s.more_colors_func.call(s.more_colors_scope||this);return Event.cancel(e);});}DOM.addClass(m,'mceColorSplitMenu');Event.add(t.id+'_menu','click',function(e){var c;e=e.target;if(e.nodeName=='A'&&(c=e.getAttribute('mce_color')))t.setColor(c);return Event.cancel(e);});return w;},setColor:function(c){var t=this;DOM.setStyle(t.id+'_preview','backgroundColor',c);t.value=c;t.hideMenu();t.settings.onselect(c);},postRender:function(){var t=this,id=t.id;t.parent();DOM.add(id+'_action','div',{id:id+'_preview','class':'mceColorPreview'});},destroy:function(){this.parent();Event.clear(this.id+'_menu');Event.clear(this.id+'_more');DOM.remove(this.id+'_menu');}});})();tinymce.create('tinymce.ui.Toolbar:tinymce.ui.Container',{renderHTML:function(){var t=this,h='',c,co,dom=tinymce.DOM,s=t.settings,i,pr,nx,cl;cl=t.controls;for(i=0;i<cl.length;i++){co=cl[i];pr=cl[i-1];nx=cl[i+1];if(i===0){c='mceToolbarStart';if(co.Button)c+=' mceToolbarStartButton';else if(co.SplitButton)c+=' mceToolbarStartSplitButton';else if(co.ListBox)c+=' mceToolbarStartListBox';h+=dom.createHTML('td',{'class':c},dom.createHTML('span',null,'<!-- IE -->'));}if(pr&&co.ListBox){if(pr.Button||pr.SplitButton)h+=dom.createHTML('td',{'class':'mceToolbarEnd'},dom.createHTML('span',null,'<!-- IE -->'));}if(dom.stdMode)h+='<td style="position: relative">'+co.renderHTML()+'</td>';else h+='<td>'+co.renderHTML()+'</td>';if(nx&&co.ListBox){if(nx.Button||nx.SplitButton)h+=dom.createHTML('td',{'class':'mceToolbarStart'},dom.createHTML('span',null,'<!-- IE -->'));}}c='mceToolbarEnd';if(co.Button)c+=' mceToolbarEndButton';else if(co.SplitButton)c+=' mceToolbarEndSplitButton';else if(co.ListBox)c+=' mceToolbarEndListBox';h+=dom.createHTML('td',{'class':c},dom.createHTML('span',null,'<!-- IE -->'));return dom.createHTML('table',{id:t.id,'class':'mceToolbar'+(s['class']?' '+s['class']:''),cellpadding:'0',cellspacing:'0',align:t.settings.align||''},'<tbody><tr>'+h+'</tr></tbody>');}});(function(){var Dispatcher=tinymce.util.Dispatcher,each=tinymce.each;tinymce.create('tinymce.AddOnManager',{items:[],urls:{},lookup:{},onAdd:new Dispatcher(this),get:function(n){return this.lookup[n];},requireLangPack:function(n){var u,s;if(tinymce.EditorManager.settings){u=this.urls[n]+'/langs/'+tinymce.EditorManager.settings.language+'.js';s=tinymce.EditorManager.settings;if(s){if(!tinymce.dom.Event.domLoaded&&!s.strict_mode)tinymce.ScriptLoader.load(u);else tinymce.ScriptLoader.add(u);}}},add:function(id,o){this.items.push(o);this.lookup[id]=o;this.onAdd.dispatch(this,id,o);return o;},load:function(n,u,cb,s){var t=this;if(t.urls[n])return;if(u.indexOf('/')!=0&&u.indexOf('://')==-1)u=tinymce.baseURL+'/'+u;t.urls[n]=u.substring(0,u.lastIndexOf('/'));tinymce.ScriptLoader.add(u,cb,s);}});tinymce.PluginManager=new tinymce.AddOnManager();tinymce.ThemeManager=new tinymce.AddOnManager();}());(function(){var each=tinymce.each,extend=tinymce.extend,DOM=tinymce.DOM,Event=tinymce.dom.Event,ThemeManager=tinymce.ThemeManager,PluginManager=tinymce.PluginManager,explode=tinymce.explode;tinymce.create('static tinymce.EditorManager',{editors:{},i18n:{},activeEditor:null,preInit:function(){var t=this,lo=window.location;tinymce.documentBaseURL=lo.href.replace(/[\?#].*$/,'').replace(/[\/\\][^\/]+$/,'');if(!/[\/\\]$/.test(tinymce.documentBaseURL))tinymce.documentBaseURL+='/';tinymce.baseURL=new tinymce.util.URI(tinymce.documentBaseURL).toAbsolute(tinymce.baseURL);tinymce.EditorManager.baseURI=new tinymce.util.URI(tinymce.baseURL);if(tinymce.EditorManager.baseURI.host!=lo.hostname&&lo.hostname)document.domain=tinymce.relaxedDomain=lo.hostname.replace(/.*\.(.+\..+)$/,'$1');t.onBeforeUnload=new tinymce.util.Dispatcher(t);Event.add(window,'beforeunload',function(e){t.onBeforeUnload.dispatch(t,e);});},init:function(s){var t=this,pl,sl=tinymce.ScriptLoader,c,e;function execCallback(se,n,s){var f=se[n];if(!f)return;if(tinymce.is(f,'string')){s=f.replace(/\.\w+$/,'');s=s?tinymce.resolve(s):0;f=tinymce.resolve(f);}return f.apply(s||this,Array.prototype.slice.call(arguments,2));};s=extend({theme:"simple",language:"en",strict_loading_mode:document.contentType=='application/xhtml+xml'},s);t.settings=s;if(!Event.domLoaded&&!s.strict_loading_mode){if(s.language)sl.add(tinymce.baseURL+'/langs/'+s.language+'.js');if(s.theme&&s.theme.charAt(0)!='-'&&!ThemeManager.urls[s.theme])ThemeManager.load(s.theme,'themes/'+s.theme+'/editor_template'+tinymce.suffix+'.js');if(s.plugins){pl=explode(s.plugins);if(tinymce.inArray(pl,'compat2x')!=-1)PluginManager.load('compat2x','plugins/compat2x/editor_plugin'+tinymce.suffix+'.js');each(pl,function(v){if(v&&v.charAt(0)!='-'&&!PluginManager.urls[v]){if(!tinymce.isWebKit&&v=='safari')return;PluginManager.load(v,'plugins/'+v+'/editor_plugin'+tinymce.suffix+'.js');}});}sl.loadQueue();}Event.add(document,'init',function(){var l,co;execCallback(s,'onpageload');if(s.browsers){l=false;each(explode(s.browsers),function(v){switch(v){case'ie':case'msie':if(tinymce.isIE)l=true;break;case'gecko':if(tinymce.isGecko)l=true;break;case'safari':case'webkit':if(tinymce.isWebKit)l=true;break;case'opera':if(tinymce.isOpera)l=true;break;}});if(!l)return;}switch(s.mode){case"exact":l=s.elements||'';if(l.length>0){each(explode(l),function(v){if(DOM.get(v))new tinymce.Editor(v,s).render(1);else{c=0;each(document.forms,function(f){each(f.elements,function(e){if(e.name===v){v='mce_editor_'+c;DOM.setAttrib(e,'id',v);new tinymce.Editor(v,s).render(1);}});});}});}break;case"textareas":case"specific_textareas":function hasClass(n,c){return c.constructor===RegExp?c.test(n.className):DOM.hasClass(n,c);};each(DOM.select('textarea'),function(v){if(s.editor_deselector&&hasClass(v,s.editor_deselector))return;if(!s.editor_selector||hasClass(v,s.editor_selector)){e=DOM.get(v.name);if(!v.id&&!e)v.id=v.name;if(!v.id||t.get(v.id))v.id=DOM.uniqueId();new tinymce.Editor(v.id,s).render(1);}});break;}if(s.oninit){l=co=0;each(t.editors,function(ed){co++;if(!ed.initialized){ed.onInit.add(function(){l++;if(l==co)execCallback(s,'oninit');});}else l++;if(l==co)execCallback(s,'oninit');});}});},get:function(id){return this.editors[id];},getInstanceById:function(id){return this.get(id);},add:function(e){this.editors[e.id]=e;this._setActive(e);return e;},remove:function(e){var t=this;if(!t.editors[e.id])return null;delete t.editors[e.id];if(t.activeEditor==e){each(t.editors,function(e){t._setActive(e);return false;});}e.destroy();return e;},execCommand:function(c,u,v){var t=this,ed=t.get(v),w;switch(c){case"mceFocus":ed.focus();return true;case"mceAddEditor":case"mceAddControl":if(!t.get(v))new tinymce.Editor(v,t.settings).render();return true;case"mceAddFrameControl":w=v.window;w.tinyMCE=tinyMCE;w.tinymce=tinymce;tinymce.DOM.doc=w.document;tinymce.DOM.win=w;ed=new tinymce.Editor(v.element_id,v);ed.render();if(tinymce.isIE){function clr(){ed.destroy();w.detachEvent('onunload',clr);w=w.tinyMCE=w.tinymce=null;};w.attachEvent('onunload',clr);}v.page_window=null;return true;case"mceRemoveEditor":case"mceRemoveControl":ed.remove();return true;case'mceToggleEditor':if(!ed){t.execCommand('mceAddControl',0,v);return true;}if(ed.isHidden())ed.show();else ed.hide();return true;}if(t.activeEditor)return t.activeEditor.execCommand(c,u,v);return false;},execInstanceCommand:function(id,c,u,v){var ed=this.get(id);if(ed)return ed.execCommand(c,u,v);return false;},triggerSave:function(){each(this.editors,function(e){e.save();});},addI18n:function(p,o){var lo,i18n=this.i18n;if(!tinymce.is(p,'string')){each(p,function(o,lc){each(o,function(o,g){each(o,function(o,k){if(g==='common')i18n[lc+'.'+k]=o;else i18n[lc+'.'+g+'.'+k]=o;});});});}else{each(o,function(o,k){i18n[p+'.'+k]=o;});}},_setActive:function(e){this.selectedInstance=this.activeEditor=e;}});tinymce.EditorManager.preInit();})();var tinyMCE=window.tinyMCE=tinymce.EditorManager;(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,extend=tinymce.extend,Dispatcher=tinymce.util.Dispatcher;var each=tinymce.each,isGecko=tinymce.isGecko,isIE=tinymce.isIE,isWebKit=tinymce.isWebKit;var is=tinymce.is,ThemeManager=tinymce.ThemeManager,PluginManager=tinymce.PluginManager,EditorManager=tinymce.EditorManager;var inArray=tinymce.inArray,grep=tinymce.grep,explode=tinymce.explode;tinymce.create('tinymce.Editor',{Editor:function(id,s){var t=this;t.id=t.editorId=id;t.execCommands={};t.queryStateCommands={};t.queryValueCommands={};t.plugins={};each(['onPreInit','onBeforeRenderUI','onPostRender','onInit','onRemove','onActivate','onDeactivate','onClick','onEvent','onMouseUp','onMouseDown','onDblClick','onKeyDown','onKeyUp','onKeyPress','onContextMenu','onSubmit','onReset','onPaste','onPreProcess','onPostProcess','onBeforeSetContent','onBeforeGetContent','onSetContent','onGetContent','onLoadContent','onSaveContent','onNodeChange','onChange','onBeforeExecCommand','onExecCommand','onUndo','onRedo','onVisualAid','onSetProgressState'],function(e){t[e]=new Dispatcher(t);});t.settings=s=extend({id:id,language:'en',docs_language:'en',theme:'simple',skin:'default',delta_width:0,delta_height:0,popup_css:'',plugins:'',document_base_url:tinymce.documentBaseURL,add_form_submit_trigger:1,submit_patch:1,add_unload_trigger:1,convert_urls:1,relative_urls:1,remove_script_host:1,table_inline_editing:0,object_resizing:1,cleanup:1,accessibility_focus:1,custom_shortcuts:1,custom_undo_redo_keyboard_shortcuts:1,custom_undo_redo_restore_selection:1,custom_undo_redo:1,doctype:'<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">',visual_table_class:'mceItemTable',visual:1,inline_styles:true,convert_fonts_to_spans:true,font_size_style_values:'xx-small,x-small,small,medium,large,x-large,xx-large',apply_source_formatting:1,directionality:'ltr',forced_root_block:'p',valid_elements:'@[id|class|style|title|dir<ltr?rtl|lang|xml::lang|onclick|ondblclick|onmousedown|onmouseup|onmouseover|onmousemove|onmouseout|onkeypress|onkeydown|onkeyup],a[rel|rev|charset|hreflang|tabindex|accesskey|type|name|href|target|title|class|onfocus|onblur],strong/b,em/i,strike,u,#p[align],-ol[type|compact],-ul[type|compact],-li,br,img[longdesc|usemap|src|border|alt=|title|hspace|vspace|width|height|align],-sub,-sup,-blockquote[cite],-table[border=0|cellspacing|cellpadding|width|frame|rules|height|align|summary|bgcolor|background|bordercolor],-tr[rowspan|width|height|align|valign|bgcolor|background|bordercolor],tbody,thead,tfoot,#td[colspan|rowspan|width|height|align|valign|bgcolor|background|bordercolor|scope],#th[colspan|rowspan|width|height|align|valign|scope],caption,-div,-span,-code,-pre,address,-h1,-h2,-h3,-h4,-h5,-h6,hr[size|noshade],-font[face|size|color],dd,dl,dt,cite,abbr,acronym,del[datetime|cite],ins[datetime|cite],object[classid|width|height|codebase|*],param[name|value],embed[type|width|height|src|*],script[src|type],map[name],area[shape|coords|href|alt|target],bdo,button,col[align|char|charoff|span|valign|width],colgroup[align|char|charoff|span|valign|width],dfn,fieldset,form[action|accept|accept-charset|enctype|method],input[accept|alt|checked|disabled|maxlength|name|readonly|size|src|type|value|tabindex|accesskey],kbd,label[for],legend,noscript,optgroup[label|disabled],option[disabled|label|selected|value],q[cite],samp,select[disabled|multiple|name|size],small,textarea[cols|rows|disabled|name|readonly],tt,var,big',hidden_input:1,padd_empty_editor:1,render_ui:1,init_theme:1,force_p_newlines:1,indentation:'30px'},s);t.documentBaseURI=new tinymce.util.URI(s.document_base_url||tinymce.documentBaseURL,{base_uri:tinyMCE.baseURI});t.baseURI=EditorManager.baseURI;t.execCallback('setup',t);},render:function(nst){var t=this,s=t.settings,id=t.id,sl=tinymce.ScriptLoader;if(!Event.domLoaded){Event.add(document,'init',function(){t.render();});return;}if(!nst){s.strict_loading_mode=1;tinyMCE.settings=s;}if(!t.getElement())return;if(s.strict_loading_mode){sl.settings.strict_mode=s.strict_loading_mode;tinymce.DOM.settings.strict=1;}if(!/TEXTAREA|INPUT/i.test(t.getElement().nodeName)&&s.hidden_input&&DOM.getParent(id,'form'))DOM.insertAfter(DOM.create('input',{type:'hidden',name:id}),id);t.windowManager=new tinymce.WindowManager(t);if(s.encoding=='xml'){t.onGetContent.add(function(ed,o){if(o.save)o.content=DOM.encode(o.content);});}if(s.add_form_submit_trigger){t.onSubmit.addToTop(function(){if(t.initialized){t.save();t.isNotDirty=1;}});}if(s.add_unload_trigger&&!s.ask){t._beforeUnload=tinyMCE.onBeforeUnload.add(function(){if(t.initialized&&!t.destroyed&&!t.isHidden())t.save({format:'raw',no_events:true});});}tinymce.addUnload(t.destroy,t);if(s.submit_patch){t.onBeforeRenderUI.add(function(){var n=t.getElement().form;if(!n)return;if(n._mceOldSubmit)return;if(!n.submit.nodeType&&!n.submit.length){t.formElement=n;n._mceOldSubmit=n.submit;n.submit=function(){EditorManager.triggerSave();t.isNotDirty=1;return this._mceOldSubmit(this);};}n=null;});}function loadScripts(){if(s.language)sl.add(tinymce.baseURL+'/langs/'+s.language+'.js');if(s.theme.charAt(0)!='-'&&!ThemeManager.urls[s.theme])ThemeManager.load(s.theme,'themes/'+s.theme+'/editor_template'+tinymce.suffix+'.js');each(explode(s.plugins),function(p){if(p&&p.charAt(0)!='-'&&!PluginManager.urls[p]){if(!isWebKit&&p=='safari')return;PluginManager.load(p,'plugins/'+p+'/editor_plugin'+tinymce.suffix+'.js');}});sl.loadQueue(function(){if(s.ask){function ask(){window.setTimeout(function(){Event.remove(t.id,'focus',ask);t.windowManager.confirm(t.getLang('edit_confirm'),function(s){if(s)t.init();});},0);};Event.add(t.id,'focus',ask);return;}if(!t.removed)t.init();});};if(s.plugins.indexOf('compat2x')!=-1){PluginManager.load('compat2x','plugins/compat2x/editor_plugin'+tinymce.suffix+'.js');sl.loadQueue(loadScripts);}else loadScripts();},init:function(){var n,t=this,s=t.settings,w,h,e=t.getElement(),o,ti,u,bi,bc,re;EditorManager.add(t);s.theme=s.theme.replace(/-/,'');o=ThemeManager.get(s.theme);t.theme=new o();if(t.theme.init&&s.init_theme)t.theme.init(t,ThemeManager.urls[s.theme]||tinymce.documentBaseURL.replace(/\/$/,''));each(explode(s.plugins.replace(/\-/g,'')),function(p){var c=PluginManager.get(p),u=PluginManager.urls[p]||tinymce.documentBaseURL.replace(/\/$/,''),po;if(c){po=new c(t,u);t.plugins[p]=po;if(po.init)po.init(t,u);}});if(s.popup_css)s.popup_css=t.documentBaseURI.toAbsolute(s.popup_css);else s.popup_css=t.baseURI.toAbsolute("themes/"+s.theme+"/skins/"+s.skin+"/dialog.css");if(s.popup_css_add)s.popup_css+=','+t.documentBaseURI.toAbsolute(s.popup_css_add);t.controlManager=new tinymce.ControlManager(t);t.undoManager=new tinymce.UndoManager(t);t.undoManager.onAdd.add(function(um,l){if(!l.initial)return t.onChange.dispatch(t,l,um);});t.undoManager.onUndo.add(function(um,l){return t.onUndo.dispatch(t,l,um);});t.undoManager.onRedo.add(function(um,l){return t.onRedo.dispatch(t,l,um);});if(s.custom_undo_redo){t.onExecCommand.add(function(ed,cmd,ui,val,a){if(cmd!='Undo'&&cmd!='Redo'&&cmd!='mceRepaint'&&(!a||!a.skip_undo))t.undoManager.add();});}t.onExecCommand.add(function(ed,c){if(!/^(FontName|FontSize)$/.test(c))t.nodeChanged();});if(isGecko){function repaint(a,o){if(!o||!o.initial)t.execCommand('mceRepaint');};t.onUndo.add(repaint);t.onRedo.add(repaint);t.onSetContent.add(repaint);}t.onBeforeRenderUI.dispatch(t,t.controlManager);if(s.render_ui){w=s.width||e.style.width||e.offsetWidth;h=s.height||e.style.height||e.offsetHeight;t.orgDisplay=e.style.display;re=/^[0-9\.]+(|px)$/i;if(re.test(''+w))w=Math.max(parseInt(w)+(o.deltaWidth||0),100);if(re.test(''+h))h=Math.max(parseInt(h)+(o.deltaHeight||0),100);o=t.theme.renderUI({targetNode:e,width:w,height:h,deltaWidth:s.delta_width,deltaHeight:s.delta_height});t.editorContainer=o.editorContainer;}DOM.setStyles(o.sizeContainer||o.editorContainer,{width:w,height:h});h=(o.iframeHeight||h)+((h+'').indexOf('%')==-1?(o.deltaHeight||0):'');if(h<100)h=100;t.iframeHTML=s.doctype+'<html><head xmlns="http://www.w3.org/1999/xhtml"><base href="'+t.documentBaseURI.getURI()+'" />';t.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />';if(tinymce.relaxedDomain)t.iframeHTML+='<script type="text/javascript">document.domain = "'+tinymce.relaxedDomain+'";</script>';bi=s.body_id||'tinymce';if(bi.indexOf('=')!=-1){bi=t.getParam('body_id','','hash');bi=bi[t.id]||bi;}bc=s.body_class||'';if(bc.indexOf('=')!=-1){bc=t.getParam('body_class','','hash');bc=bc[t.id]||'';}t.iframeHTML+='</head><body id="'+bi+'" class="mceContentBody '+bc+'"></body></html>';if(tinymce.relaxedDomain){if(isIE||(tinymce.isOpera&&parseFloat(opera.version())>=9.5))u='javascript:(function(){document.open();document.domain="'+document.domain+'";var ed = window.parent.tinyMCE.get("'+t.id+'");document.write(ed.iframeHTML);document.close();ed.setupIframe();})()';else if(tinymce.isOpera)u='javascript:(function(){document.open();document.domain="'+document.domain+'";document.close();ed.setupIframe();})()';}n=DOM.add(o.iframeContainer,'iframe',{id:t.id+"_ifr",src:u||'javascript:""',frameBorder:'0',style:{width:'100%',height:h}});t.contentAreaContainer=o.iframeContainer;DOM.get(o.editorContainer).style.display=t.orgDisplay;DOM.get(t.id).style.display='none';if(tinymce.isOldWebKit){Event.add(n,'load',t.setupIframe,t);n.src=tinymce.baseURL+'/plugins/safari/blank.htm';}else{if(!isIE||!tinymce.relaxedDomain)t.setupIframe();e=n=o=null;}},setupIframe:function(){var t=this,s=t.settings,e=DOM.get(t.id),d=t.getDoc(),h,b;if(!isIE||!tinymce.relaxedDomain){d.open();d.write(t.iframeHTML);d.close();}if(!isIE){try{d.designMode='On';}catch(ex){}}if(isIE){b=t.getBody();DOM.hide(b);b.contentEditable=true;DOM.show(b);}t.dom=new tinymce.DOM.DOMUtils(t.getDoc(),{keep_values:true,url_converter:t.convertURL,url_converter_scope:t,hex_colors:s.force_hex_style_colors,class_filter:s.class_filter,update_styles:1,fix_ie_paragraphs:1});t.serializer=new tinymce.dom.Serializer({entity_encoding:s.entity_encoding,entities:s.entities,valid_elements:s.verify_html===false?'*[*]':s.valid_elements,extended_valid_elements:s.extended_valid_elements,valid_child_elements:s.valid_child_elements,invalid_elements:s.invalid_elements,fix_table_elements:s.fix_table_elements,fix_list_elements:s.fix_list_elements,fix_content_duplication:s.fix_content_duplication,convert_fonts_to_spans:s.convert_fonts_to_spans,font_size_classes:s.font_size_classes,font_size_style_values:s.font_size_style_values,apply_source_formatting:s.apply_source_formatting,remove_linebreaks:s.remove_linebreaks,dom:t.dom});t.selection=new tinymce.dom.Selection(t.dom,t.getWin(),t.serializer);t.forceBlocks=new tinymce.ForceBlocks(t,{forced_root_block:s.forced_root_block});t.editorCommands=new tinymce.EditorCommands(t);t.serializer.onPreProcess.add(function(se,o){return t.onPreProcess.dispatch(t,o,se);});t.serializer.onPostProcess.add(function(se,o){return t.onPostProcess.dispatch(t,o,se);});t.onPreInit.dispatch(t);if(!s.gecko_spellcheck)t.getBody().spellcheck=0;t._addEvents();t.controlManager.onPostRender.dispatch(t,t.controlManager);t.onPostRender.dispatch(t);if(s.directionality)t.getBody().dir=s.directionality;if(s.nowrap)t.getBody().style.whiteSpace="nowrap";if(s.auto_resize)t.onNodeChange.add(t.resizeToContent,t);if(s.custom_elements){function handleCustom(ed,o){each(explode(s.custom_elements),function(v){var n;if(v.indexOf('~')===0){v=v.substring(1);n='span';}else n='div';o.content=o.content.replace(new RegExp('<('+v+')([^>]*)>','g'),'<'+n+' mce_name="$1"$2>');o.content=o.content.replace(new RegExp('</('+v+')>','g'),'</'+n+'>');});};t.onBeforeSetContent.add(handleCustom);t.onPostProcess.add(function(ed,o){if(o.set)handleCustom(ed,o)});}if(s.handle_node_change_callback){t.onNodeChange.add(function(ed,cm,n){t.execCallback('handle_node_change_callback',t.id,n,-1,-1,true,t.selection.isCollapsed());});}if(s.save_callback){t.onSaveContent.add(function(ed,o){var h=t.execCallback('save_callback',t.id,o.content,t.getBody());if(h)o.content=h;});}if(s.onchange_callback){t.onChange.add(function(ed,l){t.execCallback('onchange_callback',t,l);});}if(s.convert_newlines_to_brs){t.onBeforeSetContent.add(function(ed,o){if(o.initial)o.content=o.content.replace(/\r?\n/g,'<br />');});}if(s.fix_nesting&&isIE){t.onBeforeSetContent.add(function(ed,o){o.content=t._fixNesting(o.content);});}if(s.preformatted){t.onPostProcess.add(function(ed,o){o.content=o.content.replace(/^\s*<pre.*?>/,'');o.content=o.content.replace(/<\/pre>\s*$/,'');if(o.set)o.content='<pre class="mceItemHidden">'+o.content+'</pre>';});}if(s.verify_css_classes){t.serializer.attribValueFilter=function(n,v){var s,cl;if(n=='class'){if(!t.classesRE){cl=t.dom.getClasses();if(cl.length>0){s='';each(cl,function(o){s+=(s?'|':'')+o['class'];});t.classesRE=new RegExp('('+s+')','gi');}}return!t.classesRE||/(\bmceItem\w+\b|\bmceTemp\w+\b)/g.test(v)||t.classesRE.test(v)?v:'';}return v;};}if(s.convert_fonts_to_spans)t._convertFonts();if(s.inline_styles)t._convertInlineElements();if(s.cleanup_callback){t.onBeforeSetContent.add(function(ed,o){o.content=t.execCallback('cleanup_callback','insert_to_editor',o.content,o);});t.onPreProcess.add(function(ed,o){if(o.set)t.execCallback('cleanup_callback','insert_to_editor_dom',o.node,o);if(o.get)t.execCallback('cleanup_callback','get_from_editor_dom',o.node,o);});t.onPostProcess.add(function(ed,o){if(o.set)o.content=t.execCallback('cleanup_callback','insert_to_editor',o.content,o);if(o.get)o.content=t.execCallback('cleanup_callback','get_from_editor',o.content,o);});}if(s.save_callback){t.onGetContent.add(function(ed,o){if(o.save)o.content=t.execCallback('save_callback',t.id,o.content,t.getBody());});}if(s.handle_event_callback){t.onEvent.add(function(ed,e,o){if(t.execCallback('handle_event_callback',e,ed,o)===false)Event.cancel(e);});}t.onSetContent.add(function(){t.addVisual(t.getBody());});if(s.padd_empty_editor){t.onPostProcess.add(function(ed,o){o.content=o.content.replace(/^(<p>(&nbsp;|&#160;|\s|\u00a0|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,'');});}if(isGecko){try{d.designMode='Off';d.designMode='On';}catch(ex){}}setTimeout(function(){if(t.removed)return;t.load({initial:true,format:(s.cleanup_on_startup?'html':'raw')});t.startContent=t.getContent({format:'raw'});t.undoManager.add({initial:true});t.initialized=true;t.onInit.dispatch(t);t.execCallback('setupcontent_callback',t.id,t.getBody(),t.getDoc());t.execCallback('init_instance_callback',t);t.focus(true);t.nodeChanged({initial:1});if(s.content_css){tinymce.each(explode(s.content_css),function(u){t.dom.loadCSS(t.documentBaseURI.toAbsolute(u));});}if(s.auto_focus){setTimeout(function(){var ed=EditorManager.get(s.auto_focus);ed.selection.select(ed.getBody(),1);ed.selection.collapse(1);ed.getWin().focus();},100);}},1);e=null;},focus:function(sf){var oed,t=this,ce=t.settings.content_editable;if(!sf){if(!ce&&(!isIE||t.selection.getNode().ownerDocument!=t.getDoc()))t.getWin().focus();}if(EditorManager.activeEditor!=t){if((oed=EditorManager.activeEditor)!=null)oed.onDeactivate.dispatch(oed,t);t.onActivate.dispatch(t,oed);}EditorManager._setActive(t);},execCallback:function(n){var t=this,f=t.settings[n],s;if(!f)return;if(t.callbackLookup&&(s=t.callbackLookup[n])){f=s.func;s=s.scope;}if(is(f,'string')){s=f.replace(/\.\w+$/,'');s=s?tinymce.resolve(s):0;f=tinymce.resolve(f);t.callbackLookup=t.callbackLookup||{};t.callbackLookup[n]={func:f,scope:s};}return f.apply(s||t,Array.prototype.slice.call(arguments,1));},translate:function(s){var c=this.settings.language,i18n=EditorManager.i18n;if(!s)return'';return i18n[c+'.'+s]||s.replace(/{\#([^}]+)\}/g,function(a,b){return i18n[c+'.'+b]||'{#'+b+'}';});},getLang:function(n,dv){return EditorManager.i18n[this.settings.language+'.'+n]||(is(dv)?dv:'{#'+n+'}');},getParam:function(n,dv,ty){var tr=tinymce.trim,v=is(this.settings[n])?this.settings[n]:dv,o;if(ty==='hash'){o={};if(is(v,'string')){each(v.indexOf('=')>0?v.split(/[;,](?![^=;,]*(?:[;,]|$))/):v.split(','),function(v){v=v.split('=');if(v.length>1)o[tr(v[0])]=tr(v[1]);else o[tr(v[0])]=tr(v);});}else o=v;return o;}return v;},nodeChanged:function(o){var t=this,s=t.selection,n=s.getNode()||t.getBody();if(t.initialized){t.onNodeChange.dispatch(t,o?o.controlManager||t.controlManager:t.controlManager,isIE&&n.ownerDocument!=t.getDoc()?t.getBody():n,s.isCollapsed(),o);}},addButton:function(n,s){var t=this;t.buttons=t.buttons||{};t.buttons[n]=s;},addCommand:function(n,f,s){this.execCommands[n]={func:f,scope:s||this};},addQueryStateHandler:function(n,f,s){this.queryStateCommands[n]={func:f,scope:s||this};},addQueryValueHandler:function(n,f,s){this.queryValueCommands[n]={func:f,scope:s||this};},addShortcut:function(pa,desc,cmd_func,sc){var t=this,c;if(!t.settings.custom_shortcuts)return false;t.shortcuts=t.shortcuts||{};if(is(cmd_func,'string')){c=cmd_func;cmd_func=function(){t.execCommand(c,false,null);};}if(is(cmd_func,'object')){c=cmd_func;cmd_func=function(){t.execCommand(c[0],c[1],c[2]);};}each(explode(pa),function(pa){var o={func:cmd_func,scope:sc||this,desc:desc,alt:false,ctrl:false,shift:false};each(explode(pa,'+'),function(v){switch(v){case'alt':case'ctrl':case'shift':o[v]=true;break;default:o.charCode=v.charCodeAt(0);o.keyCode=v.toUpperCase().charCodeAt(0);}});t.shortcuts[(o.ctrl?'ctrl':'')+','+(o.alt?'alt':'')+','+(o.shift?'shift':'')+','+o.keyCode]=o;});return true;},execCommand:function(cmd,ui,val,a){var t=this,s=0,o,st;if(!/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint|SelectAll)$/.test(cmd)&&(!a||!a.skip_focus))t.focus();o={};t.onBeforeExecCommand.dispatch(t,cmd,ui,val,o);if(o.terminate)return false;if(t.execCallback('execcommand_callback',t.id,t.selection.getNode(),cmd,ui,val)){t.onExecCommand.dispatch(t,cmd,ui,val,a);return true;}if(o=t.execCommands[cmd]){st=o.func.call(o.scope,ui,val);if(st!==true){t.onExecCommand.dispatch(t,cmd,ui,val,a);return st;}}each(t.plugins,function(p){if(p.execCommand&&p.execCommand(cmd,ui,val)){t.onExecCommand.dispatch(t,cmd,ui,val,a);s=1;return false;}});if(s)return true;if(t.theme.execCommand&&t.theme.execCommand(cmd,ui,val)){t.onExecCommand.dispatch(t,cmd,ui,val,a);return true;}if(t.editorCommands.execCommand(cmd,ui,val)){t.onExecCommand.dispatch(t,cmd,ui,val,a);return true;}t.getDoc().execCommand(cmd,ui,val);t.onExecCommand.dispatch(t,cmd,ui,val,a);},queryCommandState:function(c){var t=this,o,s;if(t._isHidden())return;if(o=t.queryStateCommands[c]){s=o.func.call(o.scope);if(s!==true)return s;}o=t.editorCommands.queryCommandState(c);if(o!==-1)return o;try{return this.getDoc().queryCommandState(c);}catch(ex){}},queryCommandValue:function(c){var t=this,o,s;if(t._isHidden())return;if(o=t.queryValueCommands[c]){s=o.func.call(o.scope);if(s!==true)return s;}o=t.editorCommands.queryCommandValue(c);if(is(o))return o;try{return this.getDoc().queryCommandValue(c);}catch(ex){}},show:function(){var t=this;DOM.show(t.getContainer());DOM.hide(t.id);t.load();},hide:function(){var t=this,d=t.getDoc();if(isIE&&d)d.execCommand('SelectAll');t.save();DOM.hide(t.getContainer());DOM.setStyle(t.id,'display',t.orgDisplay);},isHidden:function(){return!DOM.isHidden(this.id);},setProgressState:function(b,ti,o){this.onSetProgressState.dispatch(this,b,ti,o);return b;},resizeToContent:function(){var t=this;DOM.setStyle(t.id+"_ifr",'height',t.getBody().scrollHeight);},load:function(o){var t=this,e=t.getElement(),h;o=o||{};o.load=true;h=t.setContent(is(e.value)?e.value:e.innerHTML,o);o.element=e;if(!o.no_events)t.onLoadContent.dispatch(t,o);o.element=e=null;return h;},save:function(o){var t=this,e=t.getElement(),h,f;if(!t.initialized)return;o=o||{};o.save=true;if(!o.no_events){t.undoManager.typing=0;t.undoManager.add();}o.element=e;h=o.content=t.getContent(o);if(!o.no_events)t.onSaveContent.dispatch(t,o);h=o.content;if(!/TEXTAREA|INPUT/i.test(e.nodeName)){e.innerHTML=h;if(f=DOM.getParent(t.id,'form')){each(f.elements,function(e){if(e.name==t.id){e.value=h;return false;}});}}else e.value=h;o.element=e=null;return h;},setContent:function(h,o){var t=this;o=o||{};o.format=o.format||'html';o.set=true;o.content=h;if(!o.no_events)t.onBeforeSetContent.dispatch(t,o);if(!tinymce.isIE&&(h.length===0||/^\s+$/.test(h))){o.content=t.dom.setHTML(t.getBody(),'<br mce_bogus="1" />');o.format='raw';}o.content=t.dom.setHTML(t.getBody(),tinymce.trim(o.content));if(o.format!='raw'&&t.settings.cleanup){o.getInner=true;o.content=t.dom.setHTML(t.getBody(),t.serializer.serialize(t.getBody(),o));}if(!o.no_events)t.onSetContent.dispatch(t,o);return o.content;},getContent:function(o){var t=this,h;o=o||{};o.format=o.format||'html';o.get=true;if(!o.no_events)t.onBeforeGetContent.dispatch(t,o);if(o.format!='raw'&&t.settings.cleanup){o.getInner=true;h=t.serializer.serialize(t.getBody(),o);}else h=t.getBody().innerHTML;h=h.replace(/^\s*|\s*$/g,'');o.content=h;if(!o.no_events)t.onGetContent.dispatch(t,o);return o.content;},isDirty:function(){var t=this;return tinymce.trim(t.startContent)!=tinymce.trim(t.getContent({format:'raw',no_events:1}))&&!t.isNotDirty;},getContainer:function(){var t=this;if(!t.container)t.container=DOM.get(t.editorContainer||t.id+'_parent');return t.container;},getContentAreaContainer:function(){return this.contentAreaContainer;},getElement:function(){return DOM.get(this.settings.content_element||this.id);},getWin:function(){var t=this,e;if(!t.contentWindow){e=DOM.get(t.id+"_ifr");if(e)t.contentWindow=e.contentWindow;}return t.contentWindow;},getDoc:function(){var t=this,w;if(!t.contentDocument){w=t.getWin();if(w)t.contentDocument=w.document;}return t.contentDocument;},getBody:function(){return this.bodyElement||this.getDoc().body;},convertURL:function(u,n,e){var t=this,s=t.settings;if(s.urlconverter_callback)return t.execCallback('urlconverter_callback',u,e,true,n);if(!s.convert_urls||(e&&e.nodeName=='LINK')||u.indexOf('file:')===0)return u;if(s.relative_urls)return t.documentBaseURI.toRelative(u);u=t.documentBaseURI.toAbsolute(u,s.remove_script_host);return u;},addVisual:function(e){var t=this,s=t.settings;e=e||t.getBody();if(!is(t.hasVisual))t.hasVisual=s.visual;each(t.dom.select('table,a',e),function(e){var v;switch(e.nodeName){case'TABLE':v=t.dom.getAttrib(e,'border');if(!v||v=='0'){if(t.hasVisual)t.dom.addClass(e,s.visual_table_class);else t.dom.removeClass(e,s.visual_table_class);}return;case'A':v=t.dom.getAttrib(e,'name');if(v){if(t.hasVisual)t.dom.addClass(e,'mceItemAnchor');else t.dom.removeClass(e,'mceItemAnchor');}return;}});t.onVisualAid.dispatch(t,e,t.hasVisual);},remove:function(){var t=this,e=t.getContainer();t.removed=1;t.hide();t.execCallback('remove_instance_callback',t);t.onRemove.dispatch(t);t.onExecCommand.listeners=[];EditorManager.remove(t);DOM.remove(e);},destroy:function(s){var t=this;if(t.destroyed)return;if(!s){tinymce.removeUnload(t.destroy);tinyMCE.onBeforeUnload.remove(t._beforeUnload);if(t.theme.destroy)t.theme.destroy();t.controlManager.destroy();t.selection.destroy();t.dom.destroy();if(!t.settings.content_editable){Event.clear(t.getWin());Event.clear(t.getDoc());}Event.clear(t.getBody());Event.clear(t.formElement);}if(t.formElement){t.formElement.submit=t.formElement._mceOldSubmit;t.formElement._mceOldSubmit=null;}t.contentAreaContainer=t.formElement=t.container=t.settings.content_element=t.bodyElement=t.contentDocument=t.contentWindow=null;if(t.selection)t.selection=t.selection.win=t.selection.dom=t.selection.dom.doc=null;t.destroyed=1;},_addEvents:function(){var t=this,i,s=t.settings,lo={mouseup:'onMouseUp',mousedown:'onMouseDown',click:'onClick',keyup:'onKeyUp',keydown:'onKeyDown',keypress:'onKeyPress',submit:'onSubmit',reset:'onReset',contextmenu:'onContextMenu',dblclick:'onDblClick',paste:'onPaste'};function eventHandler(e,o){var ty=e.type;if(t.removed)return;if(t.onEvent.dispatch(t,e,o)!==false){t[lo[e.fakeType||e.type]].dispatch(t,e,o);}};each(lo,function(v,k){switch(k){case'contextmenu':if(tinymce.isOpera){Event.add(t.getBody(),'mousedown',function(e){if(e.ctrlKey){e.fakeType='contextmenu';eventHandler(e);}});}else Event.add(t.getBody(),k,eventHandler);break;case'paste':Event.add(t.getBody(),k,function(e){var tx,h,el,r;if(e.clipboardData)tx=e.clipboardData.getData('text/plain');else if(tinymce.isIE)tx=t.getWin().clipboardData.getData('Text');eventHandler(e,{text:tx,html:h});});break;case'submit':case'reset':Event.add(t.getElement().form||DOM.getParent(t.id,'form'),k,eventHandler);break;default:Event.add(s.content_editable?t.getBody():t.getDoc(),k,eventHandler);}});Event.add(s.content_editable?t.getBody():(isGecko?t.getDoc():t.getWin()),'focus',function(e){t.focus(true);});if(tinymce.isGecko){Event.add(t.getDoc(),'DOMNodeInserted',function(e){var v;e=e.target;if(e.nodeType===1&&e.nodeName==='IMG'&&(v=e.getAttribute('mce_src')))e.src=t.documentBaseURI.toAbsolute(v);});}if(isGecko){function setOpts(){var t=this,d=t.getDoc(),s=t.settings;if(isGecko){if(t._isHidden()){try{if(!s.content_editable)d.designMode='On';}catch(ex){}}try{d.execCommand("styleWithCSS",0,false);}catch(ex){if(!t._isHidden())try{d.execCommand("useCSS",0,true);}catch(ex){}}if(!s.table_inline_editing)try{d.execCommand('enableInlineTableEditing',false,false);}catch(ex){}if(!s.object_resizing)try{d.execCommand('enableObjectResizing',false,false);}catch(ex){}}};t.onBeforeExecCommand.add(setOpts);t.onMouseDown.add(setOpts);}t.onMouseUp.add(t.nodeChanged);t.onClick.add(t.nodeChanged);t.onKeyUp.add(function(ed,e){if((e.keyCode>=33&&e.keyCode<=36)||(e.keyCode>=37&&e.keyCode<=40)||e.keyCode==13||e.keyCode==45||e.keyCode==46||e.keyCode==8||e.ctrlKey)t.nodeChanged();});t.onReset.add(function(){t.setContent(t.startContent,{format:'raw'});});if(t.getParam('tab_focus')){function tabCancel(ed,e){if(e.keyCode===9)return Event.cancel(e);};function tabHandler(ed,e){var x,i,f,el,v;function find(d){f=DOM.getParent(ed.id,'form');el=f.elements;if(f){each(el,function(e,i){if(e.id==ed.id){x=i;return false;}});if(d>0){for(i=x+1;i<el.length;i++){if(el[i].type!='hidden')return el[i];}}else{for(i=x-1;i>=0;i--){if(el[i].type!='hidden')return el[i];}}}return null;};if(e.keyCode===9){v=explode(ed.getParam('tab_focus'));if(v.length==1){v[1]=v[0];v[0]=':prev';}if(e.shiftKey){if(v[0]==':prev')el=find(-1);else el=DOM.get(v[0]);}else{if(v[1]==':next')el=find(1);else el=DOM.get(v[1]);}if(el){if(ed=EditorManager.get(el.id||el.name))ed.focus();else window.setTimeout(function(){window.focus();el.focus();},10);return Event.cancel(e);}}};t.onKeyUp.add(tabCancel);if(isGecko){t.onKeyPress.add(tabHandler);t.onKeyDown.add(tabCancel);}else t.onKeyDown.add(tabHandler);}if(s.custom_shortcuts){if(s.custom_undo_redo_keyboard_shortcuts){t.addShortcut('ctrl+z',t.getLang('undo_desc'),'Undo');t.addShortcut('ctrl+y',t.getLang('redo_desc'),'Redo');}if(isGecko){t.addShortcut('ctrl+b',t.getLang('bold_desc'),'Bold');t.addShortcut('ctrl+i',t.getLang('italic_desc'),'Italic');t.addShortcut('ctrl+u',t.getLang('underline_desc'),'Underline');}for(i=1;i<=6;i++)t.addShortcut('ctrl+'+i,'',['FormatBlock',false,'<h'+i+'>']);t.addShortcut('ctrl+7','',['FormatBlock',false,'<p>']);t.addShortcut('ctrl+8','',['FormatBlock',false,'<div>']);t.addShortcut('ctrl+9','',['FormatBlock',false,'<address>']);function find(e){var v=null;if(!e.altKey&&!e.ctrlKey&&!e.metaKey)return v;each(t.shortcuts,function(o){if(o.ctrl!=e.ctrlKey&&(!tinymce.isMac||o.ctrl==e.metaKey))return;if(o.alt!=e.altKey)return;if(o.shift!=e.shiftKey)return;if(e.keyCode==o.keyCode||(e.charCode&&e.charCode==o.charCode)){v=o;return false;}});return v;};t.onKeyUp.add(function(ed,e){var o=find(e);if(o)return Event.cancel(e);});t.onKeyPress.add(function(ed,e){var o=find(e);if(o)return Event.cancel(e);});t.onKeyDown.add(function(ed,e){var o=find(e);if(o){o.func.call(o.scope);return Event.cancel(e);}});}if(tinymce.isIE){Event.add(t.getDoc(),'controlselect',function(e){var re=t.resizeInfo,cb;e=e.target;if(e.nodeName!=='IMG')return;if(re)Event.remove(re.node,re.ev,re.cb);if(!t.dom.hasClass(e,'mceItemNoResize')){ev='resizeend';cb=Event.add(e,ev,function(e){var v;e=e.target;if(v=t.dom.getStyle(e,'width')){t.dom.setAttrib(e,'width',v.replace(/[^0-9%]+/g,''));t.dom.setStyle(e,'width','');}if(v=t.dom.getStyle(e,'height')){t.dom.setAttrib(e,'height',v.replace(/[^0-9%]+/g,''));t.dom.setStyle(e,'height','');}});}else{ev='resizestart';cb=Event.add(e,'resizestart',Event.cancel,Event);}re=t.resizeInfo={node:e,ev:ev,cb:cb};});t.onKeyDown.add(function(ed,e){switch(e.keyCode){case 8:if(t.selection.getRng().item){t.selection.getRng().item(0).removeNode();return Event.cancel(e);}}});}if(tinymce.isOpera){t.onClick.add(function(ed,e){Event.prevent(e);});}if(s.custom_undo_redo){function addUndo(){t.undoManager.typing=0;t.undoManager.add();};if(tinymce.isIE){Event.add(t.getWin(),'blur',function(e){var n;if(t.selection){n=t.selection.getNode();if(!t.removed&&n.ownerDocument&&n.ownerDocument!=t.getDoc())addUndo();}});}else{Event.add(t.getDoc(),'blur',function(){if(t.selection&&!t.removed)addUndo();});}t.onMouseDown.add(addUndo);t.onKeyUp.add(function(ed,e){if((e.keyCode>=33&&e.keyCode<=36)||(e.keyCode>=37&&e.keyCode<=40)||e.keyCode==13||e.keyCode==45||e.ctrlKey){t.undoManager.typing=0;t.undoManager.add();}});t.onKeyDown.add(function(ed,e){if((e.keyCode>=33&&e.keyCode<=36)||(e.keyCode>=37&&e.keyCode<=40)||e.keyCode==13||e.keyCode==45){if(t.undoManager.typing){t.undoManager.add();t.undoManager.typing=0;}return;}if(!t.undoManager.typing){t.undoManager.add();t.undoManager.typing=1;}});}},_convertInlineElements:function(){var t=this,s=t.settings,dom=t.dom,v,e,na,st,sp;function convert(ed,o){if(!s.inline_styles)return;if(o.get){each(t.dom.select('table,u,strike',o.node),function(n){switch(n.nodeName){case'TABLE':if(v=dom.getAttrib(n,'height')){dom.setStyle(n,'height',v);dom.setAttrib(n,'height','');}break;case'U':case'STRIKE':n.style.textDecoration=n.nodeName=='U'?'underline':'line-through';dom.setAttrib(n,'mce_style','');dom.setAttrib(n,'mce_name','span');break;}});}else if(o.set){each(t.dom.select('table,span',o.node).reverse(),function(n){if(n.nodeName=='TABLE'){if(v=dom.getStyle(n,'height'))dom.setAttrib(n,'height',v.replace(/[^0-9%]+/g,''));}else{if(n.style.textDecoration=='underline')na='u';else if(n.style.textDecoration=='line-through')na='strike';else na='';if(na){n.style.textDecoration='';dom.setAttrib(n,'mce_style','');e=dom.create(na,{style:dom.getAttrib(n,'style')});dom.replace(e,n,1);}}});}};t.onPreProcess.add(convert);if(!s.cleanup_on_startup){t.onSetContent.add(function(ed,o){if(o.initial)convert(t,{node:t.getBody(),set:1});});}},_convertFonts:function(){var t=this,s=t.settings,dom=t.dom,fz,fzn,sl,cl;if(!s.inline_styles)return;fz=[8,10,12,14,18,24,36];fzn=['xx-small','x-small','small','medium','large','x-large','xx-large'];if(sl=s.font_size_style_values)sl=explode(sl);if(cl=s.font_size_classes)cl=explode(cl);function convertToFonts(no){var n,f,nl,x,i,v,st;if(tinymce.isWebKit||!s.inline_styles)return;nl=t.dom.select('span',no);for(x=nl.length-1;x>=0;x--){n=nl[x];f=dom.create('font',{color:dom.toHex(dom.getStyle(n,'color')),face:dom.getStyle(n,'fontFamily'),style:dom.getAttrib(n,'style'),'class':dom.getAttrib(n,'class')});st=f.style;if(st.color||st.fontFamily){st.color=st.fontFamily='';dom.setAttrib(f,'mce_style','');}if(sl){i=inArray(sl,dom.getStyle(n,'fontSize'));if(i!=-1){dom.setAttrib(f,'size',''+(i+1||1));}}else if(cl){i=inArray(cl,dom.getAttrib(n,'class'));v=dom.getStyle(n,'fontSize');if(i==-1&&v.indexOf('pt')>0)i=inArray(fz,parseInt(v));if(i==-1)i=inArray(fzn,v);if(i!=-1){dom.setAttrib(f,'size',''+(i+1||1));f.style.fontSize='';}}if(f.color||f.face||f.size){f.style.fontFamily='';dom.setAttrib(f,'mce_style','');dom.replace(f,n,1);}f=n=null;}};t.onSetContent.add(function(ed,o){convertToFonts(ed.getBody());});t.onPreProcess.add(function(ed,o){var n,sp,nl,x;if(!s.inline_styles)return;if(o.get){nl=t.dom.select('font',o.node);for(x=nl.length-1;x>=0;x--){n=nl[x];sp=dom.create('span',{style:dom.getAttrib(n,'style'),'class':dom.getAttrib(n,'class')});dom.setStyles(sp,{fontFamily:dom.getAttrib(n,'face'),color:dom.getAttrib(n,'color'),backgroundColor:n.style.backgroundColor});if(n.size){if(sl)dom.setStyle(sp,'fontSize',sl[parseInt(n.size)-1]);else dom.setAttrib(sp,'class',cl[parseInt(n.size)-1]);}dom.setAttrib(sp,'mce_style','');dom.replace(sp,n,1);}}});},_isHidden:function(){var s;if(!isGecko)return 0;s=this.selection.getSel();return(!s||!s.rangeCount||s.rangeCount==0);},_fixNesting:function(s){var d=[],i;s=s.replace(/<(\/)?([^\s>]+)[^>]*?>/g,function(a,b,c){var e;if(b==='/'){if(!d.length)return'';if(c!==d[d.length-1].tag){for(i=d.length-1;i>=0;i--){if(d[i].tag===c){d[i].close=1;break;}}return'';}else{d.pop();if(d.length&&d[d.length-1].close){a=a+'</'+d[d.length-1].tag+'>';d.pop();}}}else{if(/^(br|hr|input|meta|img|link|param)$/i.test(c))return a;if(/\/>$/.test(a))return a;d.push({tag:c});}return a;});for(i=d.length-1;i>=0;i--)s+='</'+d[i].tag+'>';return s;}});})();(function(){var each=tinymce.each,isIE=tinymce.isIE,isGecko=tinymce.isGecko,isOpera=tinymce.isOpera,isWebKit=tinymce.isWebKit;tinymce.create('tinymce.EditorCommands',{EditorCommands:function(ed){this.editor=ed;},execCommand:function(cmd,ui,val){var t=this,ed=t.editor,f;switch(cmd){case'Cut':case'Copy':case'Paste':try{ed.getDoc().execCommand(cmd,ui,val);}catch(ex){if(isGecko){ed.windowManager.confirm(ed.getLang('clipboard_msg'),function(s){if(s)window.open('http://www.mozilla.org/editor/midasdemo/securityprefs.html','mceExternal');});}else ed.windowManager.alert(ed.getLang('clipboard_no_support'));}return true;case'mceResetDesignMode':case'mceBeginUndoLevel':return true;case'unlink':t.UnLink();return true;case'JustifyLeft':case'JustifyCenter':case'JustifyRight':case'JustifyFull':t.mceJustify(cmd,cmd.substring(7).toLowerCase());return true;case'mceEndUndoLevel':case'mceAddUndoLevel':ed.undoManager.add();return true;default:f=this[cmd];if(f){f.call(this,ui,val);return true;}}return false;},Indent:function(){var ed=this.editor,d=ed.dom,s=ed.selection,e,iv,iu;iv=ed.settings.indentation;iu=/[a-z%]+$/i.exec(iv);iv=parseInt(iv);if(ed.settings.inline_styles&&(!this.queryStateInsertUnorderedList()&&!this.queryStateInsertOrderedList())){each(this._getSelectedBlocks(),function(e){d.setStyle(e,'paddingLeft',(parseInt(e.style.paddingLeft||0)+iv)+iu);});return;}ed.getDoc().execCommand('Indent',false,null);if(isIE){d.getParent(s.getNode(),function(n){if(n.nodeName=='BLOCKQUOTE'){n.dir=n.style.cssText='';}});}},Outdent:function(){var ed=this.editor,d=ed.dom,s=ed.selection,e,v,iv,iu;iv=ed.settings.indentation;iu=/[a-z%]+$/i.exec(iv);iv=parseInt(iv);if(ed.settings.inline_styles&&(!this.queryStateInsertUnorderedList()&&!this.queryStateInsertOrderedList())){each(this._getSelectedBlocks(),function(e){v=Math.max(0,parseInt(e.style.paddingLeft||0)-iv);d.setStyle(e,'paddingLeft',v?v+iu:'');});return;}ed.getDoc().execCommand('Outdent',false,null);},mceSetAttribute:function(u,v){var ed=this.editor,d=ed.dom,e;if(e=d.getParent(ed.selection.getNode(),d.isBlock))d.setAttrib(e,v.name,v.value);},mceSetContent:function(u,v){this.editor.setContent(v);},mceToggleVisualAid:function(){var ed=this.editor;ed.hasVisual=!ed.hasVisual;ed.addVisual();},mceReplaceContent:function(u,v){var s=this.editor.selection;s.setContent(v.replace(/\{\$selection\}/g,s.getContent({format:'text'})));},mceInsertLink:function(u,v){var ed=this.editor,s=ed.selection,e=ed.dom.getParent(s.getNode(),'A');if(tinymce.is(v,'string'))v={href:v};function set(e){each(v,function(v,k){ed.dom.setAttrib(e,k,v);});};if(!e){ed.execCommand('CreateLink',false,'javascript:mctmp(0);');each(ed.dom.select('a'),function(e){if(e.href=='javascript:mctmp(0);')set(e);});}else{if(v.href)set(e);else ed.dom.remove(e,1);}},UnLink:function(){var ed=this.editor,s=ed.selection;if(s.isCollapsed())s.select(s.getNode());ed.getDoc().execCommand('unlink',false,null);s.collapse(0);},FontName:function(u,v){var t=this,ed=t.editor,s=ed.selection,e;if(!v){if(s.isCollapsed())s.select(s.getNode());t.RemoveFormat();}else ed.getDoc().execCommand('FontName',false,v);},FontSize:function(u,v){var ed=this.editor,s=ed.settings,fz=tinymce.explode(s.font_size_style_values),fzc=tinymce.explode(s.font_size_classes),h,bm;each(ed.dom.select('font'),function(e){e.style.fontSize='';});ed.getDoc().execCommand('FontSize',false,v);if(s.inline_styles){each(ed.dom.select('font'),function(e){if(e.parentNode.nodeName=='FONT'&&e.size==e.parentNode.size){if(!bm)bm=ed.selection.getBookmark();ed.dom.remove(e,1);return;}if(v=e.size){if(fzc&&fzc.length>0)ed.dom.setAttrib(e,'class',fzc[parseInt(v)-1]);else ed.dom.setStyle(e,'fontSize',fz[parseInt(v)-1]);}});}ed.selection.moveToBookmark(bm);},queryCommandValue:function(c){var f=this['queryValue'+c];if(f)return f.call(this,c);return false;},queryCommandState:function(cmd){var f;switch(cmd){case'JustifyLeft':case'JustifyCenter':case'JustifyRight':case'JustifyFull':return this.queryStateJustify(cmd,cmd.substring(7).toLowerCase());default:if(f=this['queryState'+cmd])return f.call(this,cmd);}return-1;},_queryState:function(c){try{return this.editor.getDoc().queryCommandState(c);}catch(ex){}},_queryVal:function(c){try{return this.editor.getDoc().queryCommandValue(c);}catch(ex){}},queryValueFontSize:function(){var ed=this.editor,v=0,p;if(isOpera||isWebKit){if(p=ed.dom.getParent(ed.selection.getNode(),'FONT'))v=p.size;return v;}return this._queryVal('FontSize');},queryValueFontName:function(){var ed=this.editor,v=0,p;if(p=ed.dom.getParent(ed.selection.getNode(),'FONT'))v=p.face;if(!v)v=this._queryVal('FontName');return v;},mceJustify:function(c,v){var ed=this.editor,se=ed.selection,n=se.getNode(),nn=n.nodeName,bl,nb,dom=ed.dom,rm;if(ed.settings.inline_styles&&this.queryStateJustify(c,v))rm=1;bl=dom.getParent(n,ed.dom.isBlock);if(nn=='IMG'){if(v=='full')return;if(rm){if(v=='center')dom.setStyle(bl||n.parentNode,'textAlign','');dom.setStyle(n,'float','');this.mceRepaint();return;}if(v=='center'){if(bl&&/^(TD|TH)$/.test(bl.nodeName))bl=0;if(!bl||bl.childNodes.length>1){nb=dom.create('p');nb.appendChild(n.cloneNode(false));if(bl)dom.insertAfter(nb,bl);else dom.insertAfter(nb,n);dom.remove(n);n=nb.firstChild;bl=nb;}dom.setStyle(bl,'textAlign',v);dom.setStyle(n,'float','');}else{dom.setStyle(n,'float',v);dom.setStyle(bl||n.parentNode,'textAlign','');}this.mceRepaint();return;}if(ed.settings.inline_styles&&ed.settings.forced_root_block){if(rm)v='';each(this._getSelectedBlocks(dom.getParent(se.getStart(),dom.isBlock),dom.getParent(se.getEnd(),dom.isBlock)),function(e){dom.setAttrib(e,'align','');dom.setStyle(e,'textAlign',v=='full'?'justify':v);});return;}else if(!rm)ed.getDoc().execCommand(c,false,null);if(ed.settings.inline_styles){if(rm){dom.getParent(ed.selection.getNode(),function(n){if(n.style&&n.style.textAlign)dom.setStyle(n,'textAlign','');});return;}each(dom.select('*'),function(n){var v=n.align;if(v){if(v=='full')v='justify';dom.setStyle(n,'textAlign',v);dom.setAttrib(n,'align','');}});}},mceSetCSSClass:function(u,v){this.mceSetStyleInfo(0,{command:'setattrib',name:'class',value:v});},getSelectedElement:function(){var t=this,ed=t.editor,dom=ed.dom,se=ed.selection,r=se.getRng(),r1,r2,sc,ec,so,eo,e,sp,ep,re;if(se.isCollapsed()||r.item)return se.getNode();re=ed.settings.merge_styles_invalid_parents;if(tinymce.is(re,'string'))re=new RegExp(re,'i');if(isIE){r1=r.duplicate();r1.collapse(true);sc=r1.parentElement();r2=r.duplicate();r2.collapse(false);ec=r2.parentElement();if(sc!=ec){r1.move('character',1);sc=r1.parentElement();}if(sc==ec){r1=r.duplicate();r1.moveToElementText(sc);if(r1.compareEndPoints('StartToStart',r)==0&&r1.compareEndPoints('EndToEnd',r)==0)return re&&re.test(sc.nodeName)?null:sc;}}else{function getParent(n){return dom.getParent(n,function(n){return n.nodeType==1;});};sc=r.startContainer;ec=r.endContainer;so=r.startOffset;eo=r.endOffset;if(!r.collapsed){if(sc==ec){if(so-eo<2){if(sc.hasChildNodes()){sp=sc.childNodes[so];return re&&re.test(sp.nodeName)?null:sp;}}}}if(sc.nodeType!=3||ec.nodeType!=3)return null;if(so==0){sp=getParent(sc);if(sp&&sp.firstChild!=sc)sp=null;}if(so==sc.nodeValue.length){e=sc.nextSibling;if(e&&e.nodeType==1)sp=sc.nextSibling;}if(eo==0){e=ec.previousSibling;if(e&&e.nodeType==1)ep=e;}if(eo==ec.nodeValue.length){ep=getParent(ec);if(ep&&ep.lastChild!=ec)ep=null;}if(sp==ep)return re&&sp&&re.test(sp.nodeName)?null:sp;}return null;},InsertHorizontalRule:function(){if(isGecko||isIE)this.editor.selection.setContent('<hr />');else this.editor.getDoc().execCommand('InsertHorizontalRule',false,'');},RemoveFormat:function(){var t=this,ed=t.editor,s=ed.selection,b;if(isWebKit)s.setContent(s.getContent({format:'raw'}).replace(/(<(span|b|i|strong|em|strike) [^>]+>|<(span|b|i|strong|em|strike)>|<\/(span|b|i|strong|em|strike)>|)/g,''),{format:'raw'});else ed.getDoc().execCommand('RemoveFormat',false,null);t.mceSetStyleInfo(0,{command:'removeformat'});ed.addVisual();},mceSetStyleInfo:function(u,v){var t=this,ed=t.editor,d=ed.getDoc(),dom=ed.dom,e,b,s=ed.selection,nn=v.wrapper||'span',b=s.getBookmark(),re;function set(n,e){if(n.nodeType==1){switch(v.command){case'setattrib':return dom.setAttrib(n,v.name,v.value);case'setstyle':return dom.setStyle(n,v.name,v.value);case'removeformat':return dom.setAttrib(n,'class','');}}};re=ed.settings.merge_styles_invalid_parents;if(tinymce.is(re,'string'))re=new RegExp(re,'i');if(e=t.getSelectedElement())set(e,1);else{d.execCommand('FontName',false,'__');each(isWebKit?dom.select('span'):dom.select('font'),function(n){var sp,e;if(dom.getAttrib(n,'face')=='__'||n.style.fontFamily==='__'){sp=dom.create(nn,{mce_new:'1'});set(sp);each(n.childNodes,function(n){sp.appendChild(n.cloneNode(true));});dom.replace(sp,n);}});}each(dom.select(nn).reverse(),function(n){var p=n.parentNode;if(!dom.getAttrib(n,'mce_new')){p=dom.getParent(n,function(n){return n.nodeType==1&&dom.getAttrib(n,'mce_new');});if(p)dom.remove(n,1);}});each(dom.select(nn).reverse(),function(n){var p=n.parentNode;if(!p||!dom.getAttrib(n,'mce_new'))return;if(p.nodeName==nn.toUpperCase()&&p.childNodes.length==1)return dom.remove(p,1);if(n.nodeType==1&&(!re||!re.test(p.nodeName))&&p.childNodes.length==1){set(p);dom.setAttrib(n,'class','');}});each(dom.select(nn).reverse(),function(n){if(dom.getAttrib(n,'mce_new')||(dom.getAttribs(n).length<=1&&n.className==='')){if(!dom.getAttrib(n,'class')&&!dom.getAttrib(n,'style'))return dom.remove(n,1);dom.setAttrib(n,'mce_new','');}});s.moveToBookmark(b);},queryStateJustify:function(c,v){var ed=this.editor,n=ed.selection.getNode(),dom=ed.dom;if(n&&n.nodeName=='IMG'){if(dom.getStyle(n,'float')==v)return 1;return n.parentNode.style.textAlign==v;}n=dom.getParent(ed.selection.getStart(),function(n){return n.nodeType==1&&n.style.textAlign;});if(v=='full')v='justify';if(ed.settings.inline_styles)return(n&&n.style.textAlign==v);return this._queryState(c);},HiliteColor:function(ui,val){var t=this,ed=t.editor,d=ed.getDoc();function set(s){if(!isGecko)return;try{d.execCommand("styleWithCSS",0,s);}catch(ex){d.execCommand("useCSS",0,!s);}};if(isGecko||isOpera){set(true);d.execCommand('hilitecolor',false,val);set(false);}else d.execCommand('BackColor',false,val);},Undo:function(){var ed=this.editor;if(ed.settings.custom_undo_redo){ed.undoManager.undo();ed.nodeChanged();}else ed.getDoc().execCommand('Undo',false,null);},Redo:function(){var ed=this.editor;if(ed.settings.custom_undo_redo){ed.undoManager.redo();ed.nodeChanged();}else ed.getDoc().execCommand('Redo',false,null);},FormatBlock:function(ui,val){var t=this,ed=t.editor,s=ed.selection,dom=ed.dom,bl,nb,b;function isBlock(n){return/^(P|DIV|H[1-6]|ADDRESS|BLOCKQUOTE|PRE)$/.test(n.nodeName);};bl=dom.getParent(s.getNode(),function(n){return isBlock(n);});if(bl){if((isIE&&isBlock(bl.parentNode))||bl.nodeName=='DIV'){nb=ed.dom.create(val);each(dom.getAttribs(bl),function(v){dom.setAttrib(nb,v.nodeName,dom.getAttrib(bl,v.nodeName));});b=s.getBookmark();dom.replace(nb,bl,1);s.moveToBookmark(b);ed.nodeChanged();return;}}val=ed.settings.forced_root_block?(val||'<p>'):val;if(val.indexOf('<')==-1)val='<'+val+'>';if(tinymce.isGecko)val=val.replace(/<(div|blockquote|code|dt|dd|dl|samp)>/gi,'$1');ed.getDoc().execCommand('FormatBlock',false,val);},mceCleanup:function(){var ed=this.editor,s=ed.selection,b=s.getBookmark();ed.setContent(ed.getContent());s.moveToBookmark(b);},mceRemoveNode:function(ui,val){var ed=this.editor,s=ed.selection,b,n=val||s.getNode();if(n==ed.getBody())return;b=s.getBookmark();ed.dom.remove(n,1);s.moveToBookmark(b);ed.nodeChanged();},mceSelectNodeDepth:function(ui,val){var ed=this.editor,s=ed.selection,c=0;ed.dom.getParent(s.getNode(),function(n){if(n.nodeType==1&&c++==val){s.select(n);ed.nodeChanged();return false;}},ed.getBody());},mceSelectNode:function(u,v){this.editor.selection.select(v);},mceInsertContent:function(ui,val){this.editor.selection.setContent(val);},mceInsertRawHTML:function(ui,val){var ed=this.editor;ed.selection.setContent('tiny_mce_marker');ed.setContent(ed.getContent().replace(/tiny_mce_marker/g,val));},mceRepaint:function(){var s,b,e=this.editor;if(tinymce.isGecko){try{s=e.selection;b=s.getBookmark(true);if(s.getSel())s.getSel().selectAllChildren(e.getBody());s.collapse(true);s.moveToBookmark(b);}catch(ex){}}},queryStateUnderline:function(){var ed=this.editor,n=ed.selection.getNode();if(n&&n.nodeName=='A')return false;return this._queryState('Underline');},queryStateOutdent:function(){var ed=this.editor,n;if(ed.settings.inline_styles){if((n=ed.dom.getParent(ed.selection.getStart(),ed.dom.isBlock))&&parseInt(n.style.paddingLeft)>0)return true;if((n=ed.dom.getParent(ed.selection.getEnd(),ed.dom.isBlock))&&parseInt(n.style.paddingLeft)>0)return true;}else return!!ed.dom.getParent(ed.selection.getNode(),'BLOCKQUOTE');return this.queryStateInsertUnorderedList()||this.queryStateInsertOrderedList();},queryStateInsertUnorderedList:function(){return this.editor.dom.getParent(this.editor.selection.getNode(),'UL');},queryStateInsertOrderedList:function(){return this.editor.dom.getParent(this.editor.selection.getNode(),'OL');},queryStatemceBlockQuote:function(){return!!this.editor.dom.getParent(this.editor.selection.getStart(),function(n){return n.nodeName==='BLOCKQUOTE';});},mceBlockQuote:function(){var t=this,ed=t.editor,s=ed.selection,dom=ed.dom,sb,eb,n,bm,bq,r,bq2,i,nl;function getBQ(e){return dom.getParent(e,function(n){return n.nodeName==='BLOCKQUOTE';});};sb=dom.getParent(s.getStart(),dom.isBlock);eb=dom.getParent(s.getEnd(),dom.isBlock);if(bq=getBQ(sb)){if(sb!=eb||sb.childNodes.length>1||(sb.childNodes.length==1&&sb.firstChild.nodeName!='BR'))bm=s.getBookmark();if(getBQ(eb)){bq2=bq.cloneNode(false);while(n=eb.nextSibling)bq2.appendChild(n.parentNode.removeChild(n));}if(bq2)dom.insertAfter(bq2,bq);nl=t._getSelectedBlocks(sb,eb);for(i=nl.length-1;i>=0;i--){dom.insertAfter(nl[i],bq);}if(/^\s*$/.test(bq.innerHTML))dom.remove(bq,1);if(bq2&&/^\s*$/.test(bq2.innerHTML))dom.remove(bq2,1);if(!bm){if(!isIE){r=ed.getDoc().createRange();r.setStart(sb,0);r.setEnd(sb,0);s.setRng(r);}else{s.select(sb);s.collapse(0);if(dom.getParent(s.getStart(),dom.isBlock)!=sb){r=s.getRng();r.move('character',-1);r.select();}}}else t.editor.selection.moveToBookmark(bm);return;}if(isIE&&!sb&&!eb){t.editor.getDoc().execCommand('Indent');n=getBQ(s.getNode());n.style.margin=n.dir='';return;}if(!sb||!eb)return;if(sb!=eb||sb.childNodes.length>1||(sb.childNodes.length==1&&sb.firstChild.nodeName!='BR'))bm=s.getBookmark();each(t._getSelectedBlocks(getBQ(s.getStart()),getBQ(s.getEnd())),function(e){if(e.nodeName=='BLOCKQUOTE'&&!bq){bq=e;return;}if(!bq){bq=dom.create('blockquote');e.parentNode.insertBefore(bq,e);}if(e.nodeName=='BLOCKQUOTE'&&bq){n=e.firstChild;while(n){bq.appendChild(n.cloneNode(true));n=n.nextSibling;}dom.remove(e);return;}bq.appendChild(dom.remove(e));});if(!bm){if(!isIE){r=ed.getDoc().createRange();r.setStart(sb,0);r.setEnd(sb,0);s.setRng(r);}else{s.select(sb);s.collapse(1);}}else s.moveToBookmark(bm);},_getSelectedBlocks:function(st,en){var ed=this.editor,dom=ed.dom,s=ed.selection,sb,eb,n,bl=[];sb=dom.getParent(st||s.getStart(),dom.isBlock);eb=dom.getParent(en||s.getEnd(),dom.isBlock);if(sb)bl.push(sb);if(sb&&eb&&sb!=eb){n=sb;while((n=n.nextSibling)&&n!=eb){if(dom.isBlock(n))bl.push(n);}}if(eb&&sb!=eb)bl.push(eb);return bl;}});})();tinymce.create('tinymce.UndoManager',{index:0,data:null,typing:0,UndoManager:function(ed){var t=this,Dispatcher=tinymce.util.Dispatcher;t.editor=ed;t.data=[];t.onAdd=new Dispatcher(this);t.onUndo=new Dispatcher(this);t.onRedo=new Dispatcher(this);},add:function(l){var t=this,i,ed=t.editor,b,s=ed.settings,la;l=l||{};l.content=l.content||ed.getContent({format:'raw',no_events:1});l.content=l.content.replace(/^\s*|\s*$/g,'');la=t.data[t.index>0&&(t.index==0||t.index==t.data.length)?t.index-1:t.index];if(!l.initial&&la&&l.content==la.content)return null;if(s.custom_undo_redo_levels){if(t.data.length>s.custom_undo_redo_levels){for(i=0;i<t.data.length-1;i++)t.data[i]=t.data[i+1];t.data.length--;t.index=t.data.length;}}if(s.custom_undo_redo_restore_selection&&!l.initial)l.bookmark=b=l.bookmark||ed.selection.getBookmark();if(t.index<t.data.length)t.index++;if(t.data.length===0&&!l.initial)return null;t.data.length=t.index+1;t.data[t.index++]=l;if(l.initial)t.index=0;if(t.data.length==2&&t.data[0].initial)t.data[0].bookmark=b;t.onAdd.dispatch(t,l);ed.isNotDirty=0;return l;},undo:function(){var t=this,ed=t.editor,l=l,i;if(t.typing){t.add();t.typing=0;}if(t.index>0){if(t.index==t.data.length&&t.index>1){i=t.index;t.typing=0;if(!t.add())t.index=i;--t.index;}l=t.data[--t.index];ed.setContent(l.content,{format:'raw'});ed.selection.moveToBookmark(l.bookmark);t.onUndo.dispatch(t,l);}return l;},redo:function(){var t=this,ed=t.editor,l=null;if(t.index<t.data.length-1){l=t.data[++t.index];ed.setContent(l.content,{format:'raw'});ed.selection.moveToBookmark(l.bookmark);t.onRedo.dispatch(t,l);}return l;},clear:function(){var t=this;t.data=[];t.index=0;t.typing=0;t.add({initial:true});},hasUndo:function(){return this.index!=0||this.typing;},hasRedo:function(){return this.index<this.data.length-1;}});(function(){var Event,isIE,isGecko,isOpera,each,extend;Event=tinymce.dom.Event;isIE=tinymce.isIE;isGecko=tinymce.isGecko;isOpera=tinymce.isOpera;each=tinymce.each;extend=tinymce.extend;tinymce.create('tinymce.ForceBlocks',{ForceBlocks:function(ed){var t=this,s=ed.settings,elm;t.editor=ed;t.dom=ed.dom;elm=(s.forced_root_block||'p').toLowerCase();s.element=elm.toUpperCase();ed.onPreInit.add(t.setup,t);t.reOpera=new RegExp('(\\u00a0|&#160;|&nbsp;)<\/'+elm+'>','gi');t.rePadd=new RegExp('<p( )([^>]+)><\\\/p>|<p( )([^>]+)\\\/>|<p( )([^>]+)>\\s+<\\\/p>|<p><\\\/p>|<p\\\/>|<p>\\s+<\\\/p>'.replace(/p/g,elm),'gi');t.reNbsp2BR1=new RegExp('<p( )([^>]+)>[\\s\\u00a0]+<\\\/p>|<p>[\\s\\u00a0]+<\\\/p>'.replace(/p/g,elm),'gi');t.reNbsp2BR2=new RegExp('<p( )([^>]+)>(&nbsp;|&#160;)<\\\/p>|<p>(&nbsp;|&#160;)<\\\/p>'.replace(/p/g,elm),'gi');t.reBR2Nbsp=new RegExp('<p( )([^>]+)>\\s*<br \\\/>\\s*<\\\/p>|<p>\\s*<br \\\/>\\s*<\\\/p>'.replace(/p/g,elm),'gi');t.reTrailBr=new RegExp('\\s*<br \\/>\\s*<\\\/p>'.replace(/p/g,elm),'gi');function padd(ed,o){if(isOpera)o.content=o.content.replace(t.reOpera,'</'+elm+'>');o.content=o.content.replace(t.rePadd,'<'+elm+'$1$2$3$4$5$6>\u00a0</'+elm+'>');if(!isIE&&!isOpera&&o.set){o.content=o.content.replace(t.reNbsp2BR1,'<'+elm+'$1$2><br /></'+elm+'>');o.content=o.content.replace(t.reNbsp2BR2,'<'+elm+'$1$2><br /></'+elm+'>');}else{o.content=o.content.replace(t.reBR2Nbsp,'<'+elm+'$1$2>\u00a0</'+elm+'>');o.content=o.content.replace(t.reTrailBr,'</'+elm+'>');}};ed.onBeforeSetContent.add(padd);ed.onPostProcess.add(padd);if(s.forced_root_block){ed.onInit.add(t.forceRoots,t);ed.onSetContent.add(t.forceRoots,t);ed.onBeforeGetContent.add(t.forceRoots,t);}},setup:function(){var t=this,ed=t.editor,s=ed.settings;if(s.forced_root_block){ed.onKeyUp.add(t.forceRoots,t);ed.onPreProcess.add(t.forceRoots,t);}if(s.force_br_newlines){if(isIE){ed.onKeyPress.add(function(ed,e){var n,s=ed.selection;if(e.keyCode==13&&s.getNode().nodeName!='LI'){s.setContent('<br id="__" /> ',{format:'raw'});n=ed.dom.get('__');n.removeAttribute('id');s.select(n);s.collapse();return Event.cancel(e);}});}return;}if(!isIE&&s.force_p_newlines){ed.onKeyPress.add(function(ed,e){if(e.keyCode==13&&!e.shiftKey){if(!t.insertPara(e))Event.cancel(e);}});if(isGecko){ed.onKeyDown.add(function(ed,e){if((e.keyCode==8||e.keyCode==46)&&!e.shiftKey)t.backspaceDelete(e,e.keyCode==8);});}}function ren(rn,na){var ne=ed.dom.create(na);each(rn.attributes,function(a){if(a.specified&&a.nodeValue)ne.setAttribute(a.nodeName.toLowerCase(),a.nodeValue);});each(rn.childNodes,function(n){ne.appendChild(n.cloneNode(true));});rn.parentNode.replaceChild(ne,rn);return ne;};if(isIE&&s.element!='P'){ed.onKeyPress.add(function(ed,e){t.lastElm=ed.selection.getNode().nodeName;});ed.onKeyUp.add(function(ed,e){var bl,sel=ed.selection,n=sel.getNode(),b=ed.getBody();if(b.childNodes.length===1&&n.nodeName=='P'){n=ren(n,s.element);sel.select(n);sel.collapse();ed.nodeChanged();}else if(e.keyCode==13&&!e.shiftKey&&t.lastElm!='P'){bl=ed.dom.getParent(n,'P');if(bl){ren(bl,s.element);ed.nodeChanged();}}});}},find:function(n,t,s){var ed=this.editor,w=ed.getDoc().createTreeWalker(n,4,null,false),c=-1;while(n=w.nextNode()){c++;if(t==0&&n==s)return c;if(t==1&&c==s)return n;}return-1;},forceRoots:function(ed,e){var t=this,ed=t.editor,b=ed.getBody(),d=ed.getDoc(),se=ed.selection,s=se.getSel(),r=se.getRng(),si=-2,ei,so,eo,tr,c=-0xFFFFFF;var nx,bl,bp,sp,le,nl=b.childNodes,i;if(e&&e.keyCode==13)return true;for(i=nl.length-1;i>=0;i--){nx=nl[i];if(nx.nodeType==3||(!t.dom.isBlock(nx)&&nx.nodeType!=8)){if(!bl){if(nx.nodeType!=3||/[^\s]/g.test(nx.nodeValue)){if(si==-2&&r){if(!isIE){if(ed.dom.getParent(r.startContainer,function(e){return e===b;})){so=r.startOffset;eo=r.endOffset;si=t.find(b,0,r.startContainer);ei=t.find(b,0,r.endContainer);}}else{tr=d.body.createTextRange();tr.moveToElementText(b);tr.collapse(1);bp=tr.move('character',c)*-1;tr=r.duplicate();tr.collapse(1);sp=tr.move('character',c)*-1;tr=r.duplicate();tr.collapse(0);le=(tr.move('character',c)*-1)-sp;si=sp-bp;ei=le;}}bl=ed.dom.create(ed.settings.forced_root_block);bl.appendChild(nx.cloneNode(1));nx.parentNode.replaceChild(bl,nx);}}else{if(bl.hasChildNodes())bl.insertBefore(nx,bl.firstChild);else bl.appendChild(nx);}}else bl=null;}if(si!=-2){if(!isIE){bl=b.getElementsByTagName(ed.settings.element)[0];r=d.createRange();if(si!=-1)r.setStart(t.find(b,1,si),so);else r.setStart(bl,0);if(ei!=-1)r.setEnd(t.find(b,1,ei),eo);else r.setEnd(bl,0);if(s){s.removeAllRanges();s.addRange(r);}}else{try{r=s.createRange();r.moveToElementText(b);r.collapse(1);r.moveStart('character',si);r.moveEnd('character',ei);r.select();}catch(ex){}}}},getParentBlock:function(n){var d=this.dom;return d.getParent(n,d.isBlock);},insertPara:function(e){var t=this,ed=t.editor,dom=ed.dom,d=ed.getDoc(),se=ed.settings,s=ed.selection.getSel(),r=s.getRangeAt(0),b=d.body;var rb,ra,dir,sn,so,en,eo,sb,eb,bn,bef,aft,sc,ec,n,vp=dom.getViewPort(ed.getWin()),y,ch;function isEmpty(n){n=n.innerHTML;n=n.replace(/<(img|hr|table)/gi,'-');n=n.replace(/<[^>]+>/g,'');return n.replace(/[ \t\r\n]+/g,'')=='';};rb=d.createRange();rb.setStart(s.anchorNode,s.anchorOffset);rb.collapse(true);ra=d.createRange();ra.setStart(s.focusNode,s.focusOffset);ra.collapse(true);dir=rb.compareBoundaryPoints(rb.START_TO_END,ra)<0;sn=dir?s.anchorNode:s.focusNode;so=dir?s.anchorOffset:s.focusOffset;en=dir?s.focusNode:s.anchorNode;eo=dir?s.focusOffset:s.anchorOffset;if(sn===en&&/^(TD|TH)$/.test(sn.nodeName)){dom.remove(sn.firstChild);ed.dom.add(sn,se.element,null,'<br />');aft=ed.dom.add(sn,se.element,null,'<br />');r=d.createRange();r.selectNodeContents(aft);r.collapse(1);ed.selection.setRng(r);return false;}if(sn==b&&en==b&&b.firstChild&&ed.dom.isBlock(b.firstChild)){sn=en=sn.firstChild;so=eo=0;rb=d.createRange();rb.setStart(sn,0);ra=d.createRange();ra.setStart(en,0);}sn=sn.nodeName=="HTML"?d.body:sn;sn=sn.nodeName=="BODY"?sn.firstChild:sn;en=en.nodeName=="HTML"?d.body:en;en=en.nodeName=="BODY"?en.firstChild:en;sb=t.getParentBlock(sn);eb=t.getParentBlock(en);bn=sb?sb.nodeName:se.element;if(t.dom.getParent(sb,function(n){return/OL|UL|PRE/.test(n.nodeName);}))return true;if(sb&&(sb.nodeName=='CAPTION'||/absolute|relative|static/gi.test(sb.style.position))){bn=se.element;sb=null;}if(eb&&(eb.nodeName=='CAPTION'||/absolute|relative|static/gi.test(eb.style.position))){bn=se.element;eb=null;}if(/(TD|TABLE|TH|CAPTION)/.test(bn)||(sb&&bn=="DIV"&&/left|right/gi.test(sb.style.cssFloat))){bn=se.element;sb=eb=null;}bef=(sb&&sb.nodeName==bn)?sb.cloneNode(0):ed.dom.create(bn);aft=(eb&&eb.nodeName==bn)?eb.cloneNode(0):ed.dom.create(bn);aft.removeAttribute('id');if(/^(H[1-6])$/.test(bn)&&sn.nodeValue&&so==sn.nodeValue.length)aft=ed.dom.create(se.element);n=sc=sn;do{if(n==b||n.nodeType==9||t.dom.isBlock(n)||/(TD|TABLE|TH|CAPTION)/.test(n.nodeName))break;sc=n;}while((n=n.previousSibling?n.previousSibling:n.parentNode));n=ec=en;do{if(n==b||n.nodeType==9||t.dom.isBlock(n)||/(TD|TABLE|TH|CAPTION)/.test(n.nodeName))break;ec=n;}while((n=n.nextSibling?n.nextSibling:n.parentNode));if(sc.nodeName==bn)rb.setStart(sc,0);else rb.setStartBefore(sc);rb.setEnd(sn,so);bef.appendChild(rb.cloneContents()||d.createTextNode(''));try{ra.setEndAfter(ec);}catch(ex){}ra.setStart(en,eo);aft.appendChild(ra.cloneContents()||d.createTextNode(''));r=d.createRange();if(!sc.previousSibling&&sc.parentNode.nodeName==bn){r.setStartBefore(sc.parentNode);}else{if(rb.startContainer.nodeName==bn&&rb.startOffset==0)r.setStartBefore(rb.startContainer);else r.setStart(rb.startContainer,rb.startOffset);}if(!ec.nextSibling&&ec.parentNode.nodeName==bn)r.setEndAfter(ec.parentNode);else r.setEnd(ra.endContainer,ra.endOffset);r.deleteContents();if(isOpera)ed.getWin().scrollTo(0,vp.y);if(bef.firstChild&&bef.firstChild.nodeName==bn)bef.innerHTML=bef.firstChild.innerHTML;if(aft.firstChild&&aft.firstChild.nodeName==bn)aft.innerHTML=aft.firstChild.innerHTML;if(isEmpty(bef))bef.innerHTML='<br />';if(isEmpty(aft))aft.innerHTML=isOpera?'&nbsp;':'<br />';if(isOpera&&parseFloat(opera.version())<9.5){r.insertNode(bef);r.insertNode(aft);}else{r.insertNode(aft);r.insertNode(bef);}aft.normalize();bef.normalize();function first(n){return d.createTreeWalker(n,NodeFilter.SHOW_TEXT,null,false).nextNode()||n;};r=d.createRange();r.selectNodeContents(isGecko?first(aft):aft);r.collapse(1);s.removeAllRanges();s.addRange(r);y=ed.dom.getPos(aft).y;ch=aft.clientHeight;if(y<vp.y||y+ch>vp.y+vp.h){ed.getWin().scrollTo(0,y<vp.y?y:y-vp.h+ch);}return false;},backspaceDelete:function(e,bs){var t=this,ed=t.editor,b=ed.getBody(),n,se=ed.selection,r=se.getRng(),sc=r.startContainer,n,w,tn;if(sc&&ed.dom.isBlock(sc)&&!/^(TD|TH)$/.test(sc.nodeName)&&bs){if(sc.childNodes.length==0||(sc.childNodes.length==1&&sc.firstChild.nodeName=='BR')){n=sc;while((n=n.previousSibling)&&!ed.dom.isBlock(n));if(n){if(sc!=b.firstChild){w=ed.dom.doc.createTreeWalker(n,NodeFilter.SHOW_TEXT,null,false);while(tn=w.nextNode())n=tn;r=ed.getDoc().createRange();r.setStart(n,n.nodeValue?n.nodeValue.length:0);r.setEnd(n,n.nodeValue?n.nodeValue.length:0);se.setRng(r);ed.dom.remove(sc);}return Event.cancel(e);}}}function handler(e){e=e.target;if(e&&e.parentNode&&e.nodeName=='BR'&&(n=t.getParentBlock(e))){Event.remove(b,'DOMNodeInserted',handler);if(e.previousSibling||e.nextSibling)ed.dom.remove(e);}};Event._add(b,'DOMNodeInserted',handler);window.setTimeout(function(){Event._remove(b,'DOMNodeInserted',handler);},1);}});})();(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,each=tinymce.each,extend=tinymce.extend;tinymce.create('tinymce.ControlManager',{ControlManager:function(ed,s){var t=this,i;s=s||{};t.editor=ed;t.controls={};t.onAdd=new tinymce.util.Dispatcher(t);t.onPostRender=new tinymce.util.Dispatcher(t);t.prefix=s.prefix||ed.id+'_';t._cls={};t.onPostRender.add(function(){each(t.controls,function(c){c.postRender();});});},get:function(id){return this.controls[this.prefix+id]||this.controls[id];},setActive:function(id,s){var c=null;if(c=this.get(id))c.setActive(s);return c;},setDisabled:function(id,s){var c=null;if(c=this.get(id))c.setDisabled(s);return c;},add:function(c){var t=this;if(c){t.controls[c.id]=c;t.onAdd.dispatch(c,t);}return c;},createControl:function(n){var c,t=this,ed=t.editor;each(ed.plugins,function(p){if(p.createControl){c=p.createControl(n,t);if(c)return false;}});switch(n){case"|":case"separator":return t.createSeparator();}if(!c&&ed.buttons&&(c=ed.buttons[n]))return t.createButton(n,c);return t.add(c);},createDropMenu:function(id,s,cc){var t=this,ed=t.editor,c,bm,v,cls;s=extend({'class':'mceDropDown',constrain:ed.settings.constrain_menus},s);s['class']=s['class']+' '+ed.getParam('skin')+'Skin';if(v=ed.getParam('skin_variant'))s['class']+=' '+ed.getParam('skin')+'Skin'+v.substring(0,1).toUpperCase()+v.substring(1);id=t.prefix+id;cls=cc||t._cls.dropmenu||tinymce.ui.DropMenu;c=t.controls[id]=new cls(id,s);c.onAddItem.add(function(c,o){var s=o.settings;s.title=ed.getLang(s.title,s.title);if(!s.onclick){s.onclick=function(v){ed.execCommand(s.cmd,s.ui||false,s.value);};}});ed.onRemove.add(function(){c.destroy();});if(tinymce.isIE){c.onShowMenu.add(function(){bm=ed.selection.getBookmark(1);});c.onHideMenu.add(function(){if(bm)ed.selection.moveToBookmark(bm);});}return t.add(c);},createListBox:function(id,s,cc){var t=this,ed=t.editor,cmd,c,cls;if(t.get(id))return null;s.title=ed.translate(s.title);s.scope=s.scope||ed;if(!s.onselect){s.onselect=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}s=extend({title:s.title,'class':'mce_'+id,scope:s.scope,control_manager:t},s);id=t.prefix+id;if(ed.settings.use_native_selects)c=new tinymce.ui.NativeListBox(id,s);else{cls=cc||t._cls.listbox||tinymce.ui.ListBox;c=new cls(id,s);}t.controls[id]=c;if(tinymce.isWebKit){c.onPostRender.add(function(c,n){Event.add(n,'mousedown',function(){ed.bookmark=ed.selection.getBookmark('simple');});Event.add(n,'focus',function(){ed.selection.moveToBookmark(ed.bookmark);ed.bookmark=null;});});}if(c.hideMenu)ed.onMouseDown.add(c.hideMenu,c);return t.add(c);},createButton:function(id,s,cc){var t=this,ed=t.editor,o,c,cls;if(t.get(id))return null;s.title=ed.translate(s.title);s.label=ed.translate(s.label);s.scope=s.scope||ed;if(!s.onclick&&!s.menu_button){s.onclick=function(){ed.execCommand(s.cmd,s.ui||false,s.value);};}s=extend({title:s.title,'class':'mce_'+id,unavailable_prefix:ed.getLang('unavailable',''),scope:s.scope,control_manager:t},s);id=t.prefix+id;if(s.menu_button){cls=cc||t._cls.menubutton||tinymce.ui.MenuButton;c=new cls(id,s);ed.onMouseDown.add(c.hideMenu,c);}else{cls=t._cls.button||tinymce.ui.Button;c=new cls(id,s);}return t.add(c);},createMenuButton:function(id,s){s=s||{};s.menu_button=1;return this.createButton(id,s);},createSplitButton:function(id,s,cc){var t=this,ed=t.editor,cmd,c,cls;if(t.get(id))return null;s.title=ed.translate(s.title);s.scope=s.scope||ed;if(!s.onclick){s.onclick=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}if(!s.onselect){s.onselect=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}s=extend({title:s.title,'class':'mce_'+id,scope:s.scope,control_manager:t},s);id=t.prefix+id;cls=cc||t._cls.splitbutton||tinymce.ui.SplitButton;c=t.add(new cls(id,s));ed.onMouseDown.add(c.hideMenu,c);return c;},createColorSplitButton:function(id,s,cc){var t=this,ed=t.editor,cmd,c,cls,bm;if(t.get(id))return null;s.title=ed.translate(s.title);s.scope=s.scope||ed;if(!s.onclick){s.onclick=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}if(!s.onselect){s.onselect=function(v){ed.execCommand(s.cmd,s.ui||false,v||s.value);};}s=extend({title:s.title,'class':'mce_'+id,'menu_class':ed.getParam('skin')+'Skin',scope:s.scope,more_colors_title:ed.getLang('more_colors')},s);id=t.prefix+id;cls=cc||t._cls.colorsplitbutton||tinymce.ui.ColorSplitButton;c=new cls(id,s);ed.onMouseDown.add(c.hideMenu,c);ed.onRemove.add(function(){c.destroy();});if(tinymce.isIE){c.onShowMenu.add(function(){bm=ed.selection.getBookmark(1);});c.onHideMenu.add(function(){if(bm){ed.selection.moveToBookmark(bm);bm=0;}});}return t.add(c);},createToolbar:function(id,s,cc){var c,t=this,cls;id=t.prefix+id;cls=cc||t._cls.toolbar||tinymce.ui.Toolbar;c=new cls(id,s);if(t.get(id))return null;return t.add(c);},createSeparator:function(cc){var cls=cc||this._cls.separator||tinymce.ui.Separator;return new cls();},setControlType:function(n,c){return this._cls[n.toLowerCase()]=c;},destroy:function(){each(this.controls,function(c){c.destroy();});this.controls=null;}});})();(function(){var Dispatcher=tinymce.util.Dispatcher,each=tinymce.each,isIE=tinymce.isIE,isOpera=tinymce.isOpera;tinymce.create('tinymce.WindowManager',{WindowManager:function(ed){var t=this;t.editor=ed;t.onOpen=new Dispatcher(t);t.onClose=new Dispatcher(t);t.params={};t.features={};},open:function(s,p){var t=this,f='',x,y,mo=t.editor.settings.dialog_type=='modal',w,sw,sh,vp=tinymce.DOM.getViewPort(),u;s=s||{};p=p||{};sw=isOpera?vp.w:screen.width;sh=isOpera?vp.h:screen.height;s.name=s.name||'mc_'+new Date().getTime();s.width=parseInt(s.width||320);s.height=parseInt(s.height||240);s.resizable=true;s.left=s.left||parseInt(sw/ 2.0) - (s.width /2.0);s.top=s.top||parseInt(sh/ 2.0) - (s.height /2.0);p.inline=false;p.mce_width=s.width;p.mce_height=s.height;p.mce_auto_focus=s.auto_focus;if(mo){if(isIE){s.center=true;s.help=false;s.dialogWidth=s.width+'px';s.dialogHeight=s.height+'px';s.scroll=s.scrollbars||false;}}each(s,function(v,k){if(tinymce.is(v,'boolean'))v=v?'yes':'no';if(!/^(name|url)$/.test(k)){if(isIE&&mo)f+=(f?';':'')+k+':'+v;else f+=(f?',':'')+k+'='+v;}});t.features=s;t.params=p;t.onOpen.dispatch(t,s,p);u=s.url||s.file;if(tinymce.relaxedDomain)u+=(u.indexOf('?')==-1?'?':'&')+'mce_rdomain='+tinymce.relaxedDomain;u=tinymce._addVer(u);try{if(isIE&&mo){w=1;window.showModalDialog(u,window,f);}else w=window.open(u,s.name,f);}catch(ex){}if(!w)alert(t.editor.getLang('popup_blocked'));},close:function(w){w.close();this.onClose.dispatch(this);},createInstance:function(cl,a,b,c,d,e){var f=tinymce.resolve(cl);return new f(a,b,c,d,e);},confirm:function(t,cb,s){cb.call(s||this,confirm(this._decode(this.editor.getLang(t,t))));},alert:function(tx,cb,s){var t=this;alert(t._decode(t.editor.getLang(tx,tx)));if(cb)cb.call(s||t);},_decode:function(s){return tinymce.DOM.decode(s).replace(/\\n/g,'\n');}});}());tinyMCEPreInit.start();tinyMCE.addI18n({en:{
common:{
edit_confirm:"Do you want to use the WYSIWYG mode for this textarea?",
apply:"Apply",
insert:"Insert",
update:"Update",
cancel:"Cancel",
close:"Close",
browse:"Browse",
class_name:"Class",
not_set:"-- Not set --",
clipboard_msg:"Copy/Cut/Paste is not available in Mozilla and Firefox.",
clipboard_no_support:"Currently not supported by your browser, use keyboard shortcuts instead.",
popup_blocked:"Sorry, but we have noticed that your popup-blocker has disabled a window that provides application functionality. You will need to disable popup blocking on this site in order to fully utilize this tool.",
invalid_data:"Error: Invalid values entered, these are marked in red.",
more_colors:"More colors"
},
contextmenu:{
align:"Alignment",
left:"Left",
center:"Center",
right:"Right",
full:"Full"
},
insertdatetime:{
date_fmt:"%Y-%m-%d",
time_fmt:"%H:%M:%S",
insertdate_desc:"Insert date",
inserttime_desc:"Insert time",
months_long:"January,February,March,April,May,June,July,August,September,October,November,December",
months_short:"Jan_January_abbreviation,Feb_February_abbreviation,Mar_March_abbreviation,Apr_April_abbreviation,May_May_abbreviation,Jun_June_abbreviation,Jul_July_abbreviation,Aug_August_abbreviation,Sep_September_abbreviation,Oct_October_abbreviation,Nov_November_abbreviation,Dec_December_abbreviation",
day_long:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday",
day_short:"Sun,Mon,Tue,Wed,Thu,Fri,Sat"
},
print:{
print_desc:"Print"
},
preview:{
preview_desc:"Preview"
},
directionality:{
ltr_desc:"Direction left to right",
rtl_desc:"Direction right to left"
},
layer:{
insertlayer_desc:"Insert new layer",
forward_desc:"Move forward",
backward_desc:"Move backward",
absolute_desc:"Toggle absolute positioning",
content:"New layer..."
},
save:{
save_desc:"Save",
cancel_desc:"Cancel all changes"
},
nonbreaking:{
nonbreaking_desc:"Insert non-breaking space character"
},
iespell:{
iespell_desc:"Run spell checking",
download:"ieSpell not detected. Do you want to install it now?"
},
advhr:{
advhr_desc:"Horizontale rule"
},
emotions:{
emotions_desc:"Emotions"
},
searchreplace:{
search_desc:"Find",
replace_desc:"Find/Replace"
},
advimage:{
image_desc:"Insert/edit image"
},
advlink:{
link_desc:"Insert/edit link"
},
xhtmlxtras:{
cite_desc:"Citation",
abbr_desc:"Abbreviation",
acronym_desc:"Acronym",
del_desc:"Deletion",
ins_desc:"Insertion",
attribs_desc:"Insert/Edit Attributes"
},
style:{
desc:"Edit CSS Style"
},
paste:{
paste_text_desc:"Paste as Plain Text",
paste_word_desc:"Paste from Word",
selectall_desc:"Select All"
},
paste_dlg:{
text_title:"Use CTRL+V on your keyboard to paste the text into the window.",
text_linebreaks:"Keep linebreaks",
word_title:"Use CTRL+V on your keyboard to paste the text into the window."
},
table:{
desc:"Inserts a new table",
row_before_desc:"Insert row before",
row_after_desc:"Insert row after",
delete_row_desc:"Delete row",
col_before_desc:"Insert column before",
col_after_desc:"Insert column after",
delete_col_desc:"Remove column",
split_cells_desc:"Split merged table cells",
merge_cells_desc:"Merge table cells",
row_desc:"Table row properties",
cell_desc:"Table cell properties",
props_desc:"Table properties",
paste_row_before_desc:"Paste table row before",
paste_row_after_desc:"Paste table row after",
cut_row_desc:"Cut table row",
copy_row_desc:"Copy table row",
del:"Delete table",
row:"Row",
col:"Column",
cell:"Cell"
},
autosave:{
unload_msg:"The changes you made will be lost if you navigate away from this page."
},
fullscreen:{
desc:"Toggle fullscreen mode (Alt+Shift+G)"
},
media:{
desc:"Insert / edit embedded media",
delta_width:"0",
delta_height:"0",
edit:"Edit embedded media"
},
fullpage:{
desc:"Document properties"
},
template:{
desc:"Insert predefined template content"
},
visualchars:{
desc:"Visual control characters on/off."
},
spellchecker:{
desc:"Toggle spellchecker (Alt+Shift+N)",
menu:"Spellchecker settings",
ignore_word:"Ignore word",
ignore_words:"Ignore all",
langs:"Languages",
wait:"Please wait...",
sug:"Suggestions",
no_sug:"No suggestions",
no_mpell:"No misspellings found."
},
pagebreak:{
desc:"Insert page break."
}}});

tinyMCE.addI18n("en.advanced",{
style_select:"Styles",
font_size:"Font size",
fontdefault:"Font family",
block:"Format",
paragraph:"Paragraph",
div:"Div",
address:"Address",
pre:"Preformatted",
h1:"Heading 1",
h2:"Heading 2",
h3:"Heading 3",
h4:"Heading 4",
h5:"Heading 5",
h6:"Heading 6",
blockquote:"Blockquote",
code:"Code",
samp:"Code sample",
dt:"Definition term ",
dd:"Definition description",
bold_desc:"Bold (Ctrl / Alt+Shift + B)",
italic_desc:"Italic (Ctrl / Alt+Shift + I)",
underline_desc:"Underline",
striketrough_desc:"Strikethrough (Alt+Shift+D)",
justifyleft_desc:"Align left (Alt+Shift+L)",
justifycenter_desc:"Align center (Alt+Shift+C)",
justifyright_desc:"Align right (Alt+Shift+R)",
justifyfull_desc:"Align full (Alt+Shift+J)",
bullist_desc:"Unordered list (Alt+Shift+U)",
numlist_desc:"Ordered list (Alt+Shift+O)",
outdent_desc:"Outdent",
indent_desc:"Indent",
undo_desc:"Undo (Ctrl+Z)",
redo_desc:"Redo (Ctrl+Y)",
link_desc:"Insert/edit link (Alt+Shift+A)",
link_delta_width:"0",
link_delta_height:"0",
unlink_desc:"Unlink (Alt+Shift+S)",
image_desc:"Insert/edit image (Alt+Shift+M)",
image_delta_width:"0",
image_delta_height:"0",
cleanup_desc:"Cleanup messy code",
code_desc:"Edit HTML Source",
sub_desc:"Subscript",
sup_desc:"Superscript",
hr_desc:"Insert horizontal ruler",
removeformat_desc:"Remove formatting",
forecolor_desc:"Select text color",
backcolor_desc:"Select background color",
charmap_desc:"Insert custom character",
visualaid_desc:"Toggle guidelines/invisible elements",
anchor_desc:"Insert/edit anchor",
cut_desc:"Cut",
copy_desc:"Copy",
paste_desc:"Paste",
image_props_desc:"Image properties",
newdocument_desc:"New document",
help_desc:"Help",
blockquote_desc:"Blockquote (Alt+Shift+Q)",
clipboard_msg:"Copy/Cut/Paste is not available in Mozilla and Firefox.",
path:"Path",
newdocument:"Are you sure you want to clear all contents?",
toolbar_focus:"Jump to tool buttons - Alt+Q, Jump to editor - Alt-Z, Jump to element path - Alt-X",
more_colors:"More colors",
colorpicker_delta_width:"0",
colorpicker_delta_height:"0"
});

tinyMCE.addI18n("en.advanced_dlg",{
about_title:"About TinyMCE",
about_general:"About",
about_help:"Help",
about_license:"License",
about_plugins:"Plugins",
about_plugin:"Plugin",
about_author:"Author",
about_version:"Version",
about_loaded:"Loaded plugins",
anchor_title:"Insert/edit anchor",
anchor_name:"Anchor name",
code_title:"HTML Source Editor",
code_wordwrap:"Word wrap",
colorpicker_title:"Select a color",
colorpicker_picker_tab:"Picker",
colorpicker_picker_title:"Color picker",
colorpicker_palette_tab:"Palette",
colorpicker_palette_title:"Palette colors",
colorpicker_named_tab:"Named",
colorpicker_named_title:"Named colors",
colorpicker_color:"Color:",
colorpicker_name:"Name:",
charmap_title:"Select custom character",
image_title:"Insert/edit image",
image_src:"Image URL",
image_alt:"Image description",
image_list:"Image list",
image_border:"Border",
image_dimensions:"Dimensions",
image_vspace:"Vertical space",
image_hspace:"Horizontal space",
image_align:"Alignment",
image_align_baseline:"Baseline",
image_align_top:"Top",
image_align_middle:"Middle",
image_align_bottom:"Bottom",
image_align_texttop:"Text top",
image_align_textbottom:"Text bottom",
image_align_left:"Left",
image_align_right:"Right",
link_title:"Insert/edit link",
link_url:"Link URL",
link_target:"Target",
link_target_same:"Open link in the same window",
link_target_blank:"Open link in a new window",
link_titlefield:"Title",
link_is_email:"The URL you entered seems to be an email address, do you want to add the required mailto: prefix?",
link_is_external:"The URL you entered seems to external link, do you want to add the required http:// prefix?",
link_list:"Link list"
});

tinyMCE.addI18n("en.media_dlg",{
title:"Insert / edit embedded media",
general:"General",
advanced:"Advanced",
file:"File/URL",
list:"List",
size:"Dimensions",
preview:"Preview",
constrain_proportions:"Constrain proportions",
type:"Type",
id:"Id",
name:"Name",
class_name:"Class",
vspace:"V-Space",
hspace:"H-Space",
play:"Auto play",
loop:"Loop",
menu:"Show menu",
quality:"Quality",
scale:"Scale",
align:"Align",
salign:"SAlign",
wmode:"WMode",
bgcolor:"Background",
base:"Base",
flashvars:"Flashvars",
liveconnect:"SWLiveConnect",
autohref:"AutoHREF",
cache:"Cache",
hidden:"Hidden",
controller:"Controller",
kioskmode:"Kiosk mode",
playeveryframe:"Play every frame",
targetcache:"Target cache",
correction:"No correction",
enablejavascript:"Enable JavaScript",
starttime:"Start time",
endtime:"End time",
href:"Href",
qtsrcchokespeed:"Choke speed",
target:"Target",
volume:"Volume",
autostart:"Auto start",
enabled:"Enabled",
fullscreen:"Fullscreen",
invokeurls:"Invoke URLs",
mute:"Mute",
stretchtofit:"Stretch to fit",
windowlessvideo:"Windowless video",
balance:"Balance",
baseurl:"Base URL",
captioningid:"Captioning id",
currentmarker:"Current marker",
currentposition:"Current position",
defaultframe:"Default frame",
playcount:"Play count",
rate:"Rate",
uimode:"UI Mode",
flash_options:"Flash options",
qt_options:"Quicktime options",
wmp_options:"Windows media player options",
rmp_options:"Real media player options",
shockwave_options:"Shockwave options",
autogotourl:"Auto goto URL",
center:"Center",
imagestatus:"Image status",
maintainaspect:"Maintain aspect",
nojava:"No java",
prefetch:"Prefetch",
shuffle:"Shuffle",
console:"Console",
numloop:"Num loops",
controls:"Controls",
scriptcallbacks:"Script callbacks",
swstretchstyle:"Stretch style",
swstretchhalign:"Stretch H-Align",
swstretchvalign:"Stretch V-Align",
sound:"Sound",
progress:"Progress",
qtsrc:"QT Src",
qt_stream_warn:"Streamed rtsp resources should be added to the QT Src field under the advanced tab.",
align_top:"Top",
align_right:"Right",
align_bottom:"Bottom",
align_left:"Left",
align_center:"Center",
align_top_left:"Top left",
align_top_right:"Top right",
align_bottom_left:"Bottom left",
align_bottom_right:"Bottom right",
flv_options:"Flash video options",
flv_scalemode:"Scale mode",
flv_buffer:"Buffer",
flv_startimage:"Start image",
flv_starttime:"Start time",
flv_defaultvolume:"Default volume",
flv_hiddengui:"Hidden GUI",
flv_autostart:"Auto start",
flv_loop:"Loop",
flv_showscalemodes:"Show scale modes",
flv_smoothvideo:"Smooth video",
flv_jscallback:"JS Callback"
});

tinyMCE.addI18n("en.wordpress",{
wp_adv_desc:"Show/Hide Kitchen Sink (Alt+Shift+Z)",
wp_more_desc:"Insert More tag (Alt+Shift+T)",
wp_page_desc:"Insert Page break (Alt+Shift+P)",
wp_help_desc:"Help (Alt+Shift+H)",
wp_more_alt:"More...",
wp_page_alt:"Next page...",
add_media:"Add Media",
add_image:"Add an Image",
add_video:"Add Video",
add_audio:"Add Audio"
});

tinyMCE.addI18n("en.wpeditimage",{
edit_img:"Edit Image",
del_img:"Delete Image",
adv_settings:"Advanced Settings",
none:"None",
size:"Size",
thumbnail:"Thumbnail",
medium:"Medium",
full_size:"Full Size",
current_link:"Current Link",
link_to_img:"Link to Image",
link_help:"Enter a link URL or click above for presets.",
adv_img_settings:"Advanced Image Settings",
source:"Source",
width:"Width",
height:"Height",
orig_size:"Original Size",
css:"CSS Class",
adv_link_settings:"Advanced Link Settings",
link_rel:"Link Rel",
height:"Height",
orig_size:"Original Size",
css:"CSS Class",
s60:"60%",
s70:"70%",
s80:"80%",
s90:"90%",
s100:"100%",
s110:"110%",
s120:"120%",
s130:"130%",
img_title:"Edit Image Title",
caption:"Edit Image Caption",
alt:"Edit Alternate Text"
});
(function(){var DOM=tinymce.DOM,Event=tinymce.dom.Event,extend=tinymce.extend,each=tinymce.each,Cookie=tinymce.util.Cookie,lastExtID,explode=tinymce.explode;tinymce.ThemeManager.requireLangPack('advanced');tinymce.create('tinymce.themes.AdvancedTheme',{controls:{bold:['bold_desc','Bold'],italic:['italic_desc','Italic'],underline:['underline_desc','Underline'],strikethrough:['striketrough_desc','Strikethrough'],justifyleft:['justifyleft_desc','JustifyLeft'],justifycenter:['justifycenter_desc','JustifyCenter'],justifyright:['justifyright_desc','JustifyRight'],justifyfull:['justifyfull_desc','JustifyFull'],bullist:['bullist_desc','InsertUnorderedList'],numlist:['numlist_desc','InsertOrderedList'],outdent:['outdent_desc','Outdent'],indent:['indent_desc','Indent'],cut:['cut_desc','Cut'],copy:['copy_desc','Copy'],paste:['paste_desc','Paste'],undo:['undo_desc','Undo'],redo:['redo_desc','Redo'],link:['link_desc','mceLink'],unlink:['unlink_desc','unlink'],image:['image_desc','mceImage'],cleanup:['cleanup_desc','mceCleanup'],help:['help_desc','mceHelp'],code:['code_desc','mceCodeEditor'],hr:['hr_desc','InsertHorizontalRule'],removeformat:['removeformat_desc','RemoveFormat'],sub:['sub_desc','subscript'],sup:['sup_desc','superscript'],forecolor:['forecolor_desc','ForeColor'],forecolorpicker:['forecolor_desc','mceForeColor'],backcolor:['backcolor_desc','HiliteColor'],backcolorpicker:['backcolor_desc','mceBackColor'],charmap:['charmap_desc','mceCharMap'],visualaid:['visualaid_desc','mceToggleVisualAid'],anchor:['anchor_desc','mceInsertAnchor'],newdocument:['newdocument_desc','mceNewDocument'],blockquote:['blockquote_desc','mceBlockQuote']},stateControls:['bold','italic','underline','strikethrough','bullist','numlist','justifyleft','justifycenter','justifyright','justifyfull','sub','sup','blockquote'],init:function(ed,url){var t=this,s,v;t.editor=ed;t.url=url;t.onResolveName=new tinymce.util.Dispatcher(this);t.settings=s=extend({theme_advanced_path:true,theme_advanced_toolbar_location:'bottom',theme_advanced_buttons1:"bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect",theme_advanced_buttons2:"bullist,numlist,|,outdent,indent,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code",theme_advanced_buttons3:"hr,removeformat,visualaid,|,sub,sup,|,charmap",theme_advanced_blockformats:"p,address,pre,h1,h2,h3,h4,h5,h6",theme_advanced_toolbar_align:"center",theme_advanced_fonts:"Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats",theme_advanced_font_sizes:"1,2,3,4,5,6,7",theme_advanced_more_colors:1,theme_advanced_row_height:23,theme_advanced_resize_horizontal:1,theme_advanced_resizing_use_cookie:1},ed.settings);if((v=s.theme_advanced_path_location)&&v!='none')s.theme_advanced_statusbar_location=s.theme_advanced_path_location;if(s.theme_advanced_statusbar_location=='none')s.theme_advanced_statusbar_location=0;ed.onInit.add(function(){ed.onNodeChange.add(t._nodeChanged,t);if(ed.settings.content_css!==false)ed.dom.loadCSS(ed.baseURI.toAbsolute("themes/advanced/skins/"+ed.settings.skin+"/content.css"));});ed.onSetProgressState.add(function(ed,b,ti){var co,id=ed.id,tb;if(b){t.progressTimer=setTimeout(function(){co=ed.getContainer();co=co.insertBefore(DOM.create('DIV',{style:'position:relative'}),co.firstChild);tb=DOM.get(ed.id+'_tbl');DOM.add(co,'div',{id:id+'_blocker','class':'mceBlocker',style:{width:tb.clientWidth+2,height:tb.clientHeight+2}});DOM.add(co,'div',{id:id+'_progress','class':'mceProgress',style:{left:tb.clientWidth/ 2, top : tb.clientHeight /2}});},ti||0);}else{DOM.remove(id+'_blocker');DOM.remove(id+'_progress');clearTimeout(t.progressTimer);}});DOM.loadCSS(ed.baseURI.toAbsolute(s.editor_css||"themes/advanced/skins/"+ed.settings.skin+"/ui.css"));if(s.skin_variant)DOM.loadCSS(ed.baseURI.toAbsolute(s.editor_css||"themes/advanced/skins/"+ed.settings.skin+"/ui_"+s.skin_variant+".css"));},createControl:function(n,cf){var cd,c;if(c=cf.createControl(n))return c;switch(n){case"styleselect":return this._createStyleSelect();case"formatselect":return this._createBlockFormats();case"fontselect":return this._createFontSelect();case"fontsizeselect":return this._createFontSizeSelect();case"forecolor":return this._createForeColorMenu();case"backcolor":return this._createBackColorMenu();}if((cd=this.controls[n]))return cf.createButton(n,{title:"advanced."+cd[0],cmd:cd[1],ui:cd[2],value:cd[3]});},execCommand:function(cmd,ui,val){var f=this['_'+cmd];if(f){f.call(this,ui,val);return true;}return false;},_importClasses:function(e){var ed=this.editor,c=ed.controlManager.get('styleselect');if(c.getLength()==0){each(ed.dom.getClasses(),function(o){c.add(o['class'],o['class']);});}},_createStyleSelect:function(n){var t=this,ed=t.editor,cf=ed.controlManager,c=cf.createListBox('styleselect',{title:'advanced.style_select',onselect:function(v){if(c.selectedValue===v){ed.execCommand('mceSetStyleInfo',0,{command:'removeformat'});c.select();return false;}else ed.execCommand('mceSetCSSClass',0,v);}});if(c){each(ed.getParam('theme_advanced_styles','','hash'),function(v,k){if(v)c.add(t.editor.translate(k),v);});c.onPostRender.add(function(ed,n){Event.add(n.id+'_text','focus',t._importClasses,t);Event.add(n.id+'_text','mousedown',t._importClasses,t);});}return c;},_createFontSelect:function(){var c,t=this,ed=t.editor;c=ed.controlManager.createListBox('fontselect',{title:'advanced.fontdefault',cmd:'FontName'});if(c){each(ed.getParam('theme_advanced_fonts',t.settings.theme_advanced_fonts,'hash'),function(v,k){c.add(ed.translate(k),v,{style:v.indexOf('dings')==-1?'font-family:'+v:''});});}return c;},_createFontSizeSelect:function(){var t=this,ed=t.editor,c,lo=["1 (8 pt)","2 (10 pt)","3 (12 pt)","4 (14 pt)","5 (18 pt)","6 (24 pt)","7 (36 pt)"],fz=[8,10,12,14,18,24,36];c=ed.controlManager.createListBox('fontsizeselect',{title:'advanced.font_size',cmd:'FontSize'});if(c){each(ed.getParam('theme_advanced_font_sizes',t.settings.theme_advanced_font_sizes,'hash'),function(v,k){c.add(k!=v?k:lo[parseInt(v)-1],v,{'style':'font-size:'+fz[v-1]+'pt','class':'mceFontSize'+v});});}return c;},_createBlockFormats:function(){var c,fmts={p:'advanced.paragraph',address:'advanced.address',pre:'advanced.pre',h1:'advanced.h1',h2:'advanced.h2',h3:'advanced.h3',h4:'advanced.h4',h5:'advanced.h5',h6:'advanced.h6',div:'advanced.div',blockquote:'advanced.blockquote',code:'advanced.code',dt:'advanced.dt',dd:'advanced.dd',samp:'advanced.samp'},t=this;c=t.editor.controlManager.createListBox('formatselect',{title:'advanced.block',cmd:'FormatBlock'});if(c){each(t.editor.getParam('theme_advanced_blockformats',t.settings.theme_advanced_blockformats,'hash'),function(v,k){c.add(t.editor.translate(k!=v?k:fmts[v]),v,{'class':'mce_formatPreview mce_'+v});});}return c;},_createForeColorMenu:function(){var c,t=this,s=t.settings,o={},v;if(s.theme_advanced_more_colors){o.more_colors_func=function(){t._mceColorPicker(0,{color:c.value,func:function(co){c.setColor(co);}});};}if(v=s.theme_advanced_text_colors)o.colors=v;o.title='advanced.forecolor_desc';o.cmd='ForeColor';o.scope=this;c=t.editor.controlManager.createColorSplitButton('forecolor',o);return c;},_createBackColorMenu:function(){var c,t=this,s=t.settings,o={},v;if(s.theme_advanced_more_colors){o.more_colors_func=function(){t._mceColorPicker(0,{color:c.value,func:function(co){c.setColor(co);}});};}if(v=s.theme_advanced_background_colors)o.colors=v;o.title='advanced.backcolor_desc';o.cmd='HiliteColor';o.scope=this;c=t.editor.controlManager.createColorSplitButton('backcolor',o);return c;},renderUI:function(o){var n,ic,tb,t=this,ed=t.editor,s=t.settings,sc,p,nl;n=p=DOM.create('span',{id:ed.id+'_parent','class':'mceEditor '+ed.settings.skin+'Skin'+(s.skin_variant?' '+ed.settings.skin+'Skin'+t._ufirst(s.skin_variant):'')});if(!DOM.boxModel)n=DOM.add(n,'div',{'class':'mceOldBoxModel'});n=sc=DOM.add(n,'table',{id:ed.id+'_tbl','class':'mceLayout',cellSpacing:0,cellPadding:0});n=tb=DOM.add(n,'tbody');switch((s.theme_advanced_layout_manager||'').toLowerCase()){case"rowlayout":ic=t._rowLayout(s,tb,o);break;case"customlayout":ic=ed.execCallback("theme_advanced_custom_layout",s,tb,o,p);break;default:ic=t._simpleLayout(s,tb,o,p);}n=o.targetNode;nl=DOM.stdMode?sc.getElementsByTagName('tr'):sc.rows;DOM.addClass(nl[0],'mceFirst');DOM.addClass(nl[nl.length-1],'mceLast');each(DOM.select('tr',tb),function(n){DOM.addClass(n.firstChild,'mceFirst');DOM.addClass(n.childNodes[n.childNodes.length-1],'mceLast');});if(DOM.get(s.theme_advanced_toolbar_container))DOM.get(s.theme_advanced_toolbar_container).appendChild(p);else DOM.insertAfter(p,n);Event.add(ed.id+'_path_row','click',function(e){e=e.target;if(e.nodeName=='A'){t._sel(e.className.replace(/^.*mcePath_([0-9]+).*$/,'$1'));return Event.cancel(e);}});if(!ed.getParam('accessibility_focus')||ed.getParam('tab_focus'))Event.add(DOM.add(p,'a',{href:'#'},'<!-- IE -->'),'focus',function(){tinyMCE.get(ed.id).focus();});if(s.theme_advanced_toolbar_location=='external')o.deltaHeight=0;t.deltaHeight=o.deltaHeight;o.targetNode=null;return{iframeContainer:ic,editorContainer:ed.id+'_parent',sizeContainer:sc,deltaHeight:o.deltaHeight};},getInfo:function(){return{longname:'Advanced theme',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',version:tinymce.majorVersion+"."+tinymce.minorVersion}},resizeBy:function(dw,dh){var e=DOM.get(this.editor.id+'_tbl');this.resizeTo(e.clientWidth+dw,e.clientHeight+dh);},resizeTo:function(w,h){var ed=this.editor,s=ed.settings,e=DOM.get(ed.id+'_tbl'),ifr=DOM.get(ed.id+'_ifr'),dh;w=Math.max(s.theme_advanced_resizing_min_width||100,w);h=Math.max(s.theme_advanced_resizing_min_height||100,h);w=Math.min(s.theme_advanced_resizing_max_width||0xFFFF,w);h=Math.min(s.theme_advanced_resizing_max_height||0xFFFF,h);dh=e.clientHeight-ifr.clientHeight;DOM.setStyle(ifr,'height',h-dh);DOM.setStyles(e,{width:w,height:h});},destroy:function(){var id=this.editor.id;Event.clear(id+'_resize');Event.clear(id+'_path_row');Event.clear(id+'_external_close');},_simpleLayout:function(s,tb,o,p){var t=this,ed=t.editor,lo=s.theme_advanced_toolbar_location,sl=s.theme_advanced_statusbar_location,n,ic,etb,c;if(lo=='top')t._addToolbars(tb,o);if(lo=='external'){n=c=DOM.create('div',{style:'position:relative'});n=DOM.add(n,'div',{id:ed.id+'_external','class':'mceExternalToolbar'});DOM.add(n,'a',{id:ed.id+'_external_close',href:'javascript:;','class':'mceExternalClose'});n=DOM.add(n,'table',{id:ed.id+'_tblext',cellSpacing:0,cellPadding:0});etb=DOM.add(n,'tbody');if(p.firstChild.className=='mceOldBoxModel')p.firstChild.appendChild(c);else p.insertBefore(c,p.firstChild);t._addToolbars(etb,o);ed.onMouseUp.add(function(){var e=DOM.get(ed.id+'_external');DOM.show(e);DOM.hide(lastExtID);var f=Event.add(ed.id+'_external_close','click',function(){DOM.hide(ed.id+'_external');Event.remove(ed.id+'_external_close','click',f);});DOM.show(e);DOM.setStyle(e,'top',0-DOM.getRect(ed.id+'_tblext').h-1);DOM.hide(e);DOM.show(e);e.style.filter='';lastExtID=ed.id+'_external';e=null;});}if(sl=='top')t._addStatusBar(tb,o);if(!s.theme_advanced_toolbar_container){n=DOM.add(tb,'tr');n=ic=DOM.add(n,'td',{'class':'mceIframeContainer'});}if(lo=='bottom')t._addToolbars(tb,o);if(sl=='bottom')t._addStatusBar(tb,o);return ic;},_rowLayout:function(s,tb,o){var t=this,ed=t.editor,dc,da,cf=ed.controlManager,n,ic,to,a;dc=s.theme_advanced_containers_default_class||'';da=s.theme_advanced_containers_default_align||'center';each(explode(s.theme_advanced_containers||''),function(c,i){var v=s['theme_advanced_container_'+c]||'';switch(v.toLowerCase()){case'mceeditor':n=DOM.add(tb,'tr');n=ic=DOM.add(n,'td',{'class':'mceIframeContainer'});break;case'mceelementpath':t._addStatusBar(tb,o);break;default:a=(s['theme_advanced_container_'+c+'_align']||da).toLowerCase();a='mce'+t._ufirst(a);n=DOM.add(DOM.add(tb,'tr'),'td',{'class':'mceToolbar '+(s['theme_advanced_container_'+c+'_class']||dc)+' '+a||da});to=cf.createToolbar("toolbar"+i);t._addControls(v,to);DOM.setHTML(n,to.renderHTML());o.deltaHeight-=s.theme_advanced_row_height;}});return ic;},_addControls:function(v,tb){var t=this,s=t.settings,di,cf=t.editor.controlManager;if(s.theme_advanced_disable&&!t._disabled){di={};each(explode(s.theme_advanced_disable),function(v){di[v]=1;});t._disabled=di;}else di=t._disabled;each(explode(v),function(n){var c;if(di&&di[n])return;if(n=='tablecontrols'){each(["table","|","row_props","cell_props","|","row_before","row_after","delete_row","|","col_before","col_after","delete_col","|","split_cells","merge_cells"],function(n){n=t.createControl(n,cf);if(n)tb.add(n);});return;}c=t.createControl(n,cf);if(c)tb.add(c);});},_addToolbars:function(c,o){var t=this,i,tb,ed=t.editor,s=t.settings,v,cf=ed.controlManager,di,n,h=[],a;a=s.theme_advanced_toolbar_align.toLowerCase();a='mce'+t._ufirst(a);n=DOM.add(DOM.add(c,'tr'),'td',{'class':'mceToolbar '+a});if(!ed.getParam('accessibility_focus')||ed.getParam('tab_focus'))h.push(DOM.createHTML('a',{href:'#',onfocus:'tinyMCE.get(\''+ed.id+'\').focus();'},'<!-- IE -->'));h.push(DOM.createHTML('a',{href:'#',accesskey:'q',title:ed.getLang("advanced.toolbar_focus")},'<!-- IE -->'));for(i=1;(v=s['theme_advanced_buttons'+i]);i++){tb=cf.createToolbar("toolbar"+i,{'class':'mceToolbarRow'+i});if(s['theme_advanced_buttons'+i+'_add'])v+=','+s['theme_advanced_buttons'+i+'_add'];if(s['theme_advanced_buttons'+i+'_add_before'])v=s['theme_advanced_buttons'+i+'_add_before']+','+v;t._addControls(v,tb);h.push(tb.renderHTML());o.deltaHeight-=s.theme_advanced_row_height;}h.push(DOM.createHTML('a',{href:'#',accesskey:'z',title:ed.getLang("advanced.toolbar_focus"),onfocus:'tinyMCE.getInstanceById(\''+ed.id+'\').focus();'},'<!-- IE -->'));DOM.setHTML(n,h.join(''));},_addStatusBar:function(tb,o){var n,t=this,ed=t.editor,s=t.settings,r,mf,me,td;n=DOM.add(tb,'tr');n=td=DOM.add(n,'td',{'class':'mceStatusbar'});n=DOM.add(n,'div',{id:ed.id+'_path_row'},s.theme_advanced_path?ed.translate('advanced.path')+': ':'&nbsp;');DOM.add(n,'a',{href:'#',accesskey:'x'});if(s.theme_advanced_resizing&&!tinymce.isOldWebKit){DOM.add(td,'a',{id:ed.id+'_resize',href:'javascript:;',onclick:"return false;",'class':'mceResize'});if(s.theme_advanced_resizing_use_cookie){ed.onPostRender.add(function(){var o=Cookie.getHash("TinyMCE_"+ed.id+"_size"),c=DOM.get(ed.id+'_tbl');if(!o)return;if(s.theme_advanced_resize_horizontal)c.style.width=Math.max(10,o.cw)+'px';c.style.height=Math.max(10,o.ch)+'px';DOM.get(ed.id+'_ifr').style.height=Math.max(10,parseInt(o.ch)+t.deltaHeight)+'px';});}ed.onPostRender.add(function(){Event.add(ed.id+'_resize','mousedown',function(e){var c,p,w,h,n,pa;c=DOM.get(ed.id+'_tbl');w=c.clientWidth;h=c.clientHeight;miw=s.theme_advanced_resizing_min_width||100;mih=s.theme_advanced_resizing_min_height||100;maw=s.theme_advanced_resizing_max_width||0xFFFF;mah=s.theme_advanced_resizing_max_height||0xFFFF;p=DOM.add(DOM.get(ed.id+'_parent'),'div',{'class':'mcePlaceHolder'});DOM.setStyles(p,{width:w,height:h});DOM.hide(c);DOM.show(p);r={x:e.screenX,y:e.screenY,w:w,h:h,dx:null,dy:null};mf=Event.add(DOM.doc,'mousemove',function(e){var w,h;r.dx=e.screenX-r.x;r.dy=e.screenY-r.y;w=Math.max(miw,r.w+r.dx);h=Math.max(mih,r.h+r.dy);w=Math.min(maw,w);h=Math.min(mah,h);if(s.theme_advanced_resize_horizontal)p.style.width=w+'px';p.style.height=h+'px';return Event.cancel(e);});me=Event.add(DOM.doc,'mouseup',function(e){var ifr;Event.remove(DOM.doc,'mousemove',mf);Event.remove(DOM.doc,'mouseup',me);c.style.display='';DOM.remove(p);if(r.dx===null)return;ifr=DOM.get(ed.id+'_ifr');if(s.theme_advanced_resize_horizontal)c.style.width=Math.max(10,r.w+r.dx)+'px';c.style.height=Math.max(10,r.h+r.dy)+'px';ifr.style.height=Math.max(10,ifr.clientHeight+r.dy)+'px';if(s.theme_advanced_resizing_use_cookie){Cookie.setHash("TinyMCE_"+ed.id+"_size",{cw:r.w+r.dx,ch:r.h+r.dy});}});return Event.cancel(e);});});}o.deltaHeight-=21;n=tb=null;},_nodeChanged:function(ed,cm,n,co){var t=this,p,de=0,v,c,s=t.settings;tinymce.each(t.stateControls,function(c){cm.setActive(c,ed.queryCommandState(t.controls[c][1]));});cm.setActive('visualaid',ed.hasVisual);cm.setDisabled('undo',!ed.undoManager.hasUndo()&&!ed.typing);cm.setDisabled('redo',!ed.undoManager.hasRedo());cm.setDisabled('outdent',!ed.queryCommandState('Outdent'));p=DOM.getParent(n,'A');if(c=cm.get('link')){if(!p||!p.name){c.setDisabled(!p&&co);c.setActive(!!p);}}if(c=cm.get('unlink')){c.setDisabled(!p&&co);c.setActive(!!p&&!p.name);}if(c=cm.get('anchor')){c.setActive(!!p&&p.name);if(tinymce.isWebKit){p=DOM.getParent(n,'IMG');c.setActive(!!p&&DOM.getAttrib(p,'mce_name')=='a');}}p=DOM.getParent(n,'IMG');if(c=cm.get('image'))c.setActive(!!p&&n.className.indexOf('mceItem')==-1);if(c=cm.get('styleselect')){if(n.className){t._importClasses();c.select(n.className);}else c.select();}if(c=cm.get('formatselect')){p=DOM.getParent(n,DOM.isBlock);if(p)c.select(p.nodeName.toLowerCase());}if(c=cm.get('fontselect'))c.select(ed.queryCommandValue('FontName'));if(c=cm.get('fontsizeselect'))c.select(''+ed.queryCommandValue('FontSize'));if(s.theme_advanced_path&&s.theme_advanced_statusbar_location){p=DOM.get(ed.id+'_path')||DOM.add(ed.id+'_path_row','span',{id:ed.id+'_path'});DOM.setHTML(p,'');ed.dom.getParent(n,function(n){var na=n.nodeName.toLowerCase(),u,pi,ti='';if(n.nodeType!=1||(DOM.hasClass(n,'mceItemHidden')||DOM.hasClass(n,'mceItemRemoved')))return;if(v=DOM.getAttrib(n,'mce_name'))na=v;if(tinymce.isIE&&n.scopeName!=='HTML')na=n.scopeName+':'+na;na=na.replace(/mce\:/g,'');switch(na){case'b':na='strong';break;case'i':na='em';break;case'img':if(v=DOM.getAttrib(n,'src'))ti+='src: '+v+' ';break;case'a':if(v=DOM.getAttrib(n,'name')){ti+='name: '+v+' ';na+='#'+v;}if(v=DOM.getAttrib(n,'href'))ti+='href: '+v+' ';break;case'font':if(s.convert_fonts_to_spans)na='span';if(v=DOM.getAttrib(n,'face'))ti+='font: '+v+' ';if(v=DOM.getAttrib(n,'size'))ti+='size: '+v+' ';if(v=DOM.getAttrib(n,'color'))ti+='color: '+v+' ';break;case'span':if(v=DOM.getAttrib(n,'style'))ti+='style: '+v+' ';break;}if(v=DOM.getAttrib(n,'id'))ti+='id: '+v+' ';if(v=n.className){v=v.replace(/(webkit-[\w\-]+|Apple-[\w\-]+|mceItem\w+|mceVisualAid)/g,'');if(v&&v.indexOf('mceItem')==-1){ti+='class: '+v+' ';if(DOM.isBlock(n)||na=='img'||na=='span')na+='.'+v;}}na=na.replace(/(html:)/g,'');na={name:na,node:n,title:ti};t.onResolveName.dispatch(t,na);ti=na.title;na=na.name;pi=DOM.create('a',{'href':"javascript:;",onmousedown:"return false;",title:ti,'class':'mcePath_'+(de++)},na);if(p.hasChildNodes()){p.insertBefore(DOM.doc.createTextNode(' \u00bb '),p.firstChild);p.insertBefore(pi,p.firstChild);}else p.appendChild(pi);},ed.getBody());}},_sel:function(v){this.editor.execCommand('mceSelectNodeDepth',false,v);},_mceInsertAnchor:function(ui,v){var ed=this.editor;ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/anchor.htm',width:320+parseInt(ed.getLang('advanced.anchor_delta_width',0)),height:90+parseInt(ed.getLang('advanced.anchor_delta_height',0)),inline:true},{theme_url:this.url});},_mceCharMap:function(){var ed=this.editor;ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/charmap.htm',width:550+parseInt(ed.getLang('advanced.charmap_delta_width',0)),height:250+parseInt(ed.getLang('advanced.charmap_delta_height',0)),inline:true},{theme_url:this.url});},_mceHelp:function(){var ed=this.editor;ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/about.htm',width:480,height:380,inline:true},{theme_url:this.url});},_mceColorPicker:function(u,v){var ed=this.editor;v=v||{};ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/color_picker.htm',width:375+parseInt(ed.getLang('advanced.colorpicker_delta_width',0)),height:250+parseInt(ed.getLang('advanced.colorpicker_delta_height',0)),close_previous:false,inline:true},{input_color:v.color,func:v.func,theme_url:this.url});},_mceCodeEditor:function(ui,val){var ed=this.editor;ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/source_editor.htm',width:parseInt(ed.getParam("theme_advanced_source_editor_width",720)),height:parseInt(ed.getParam("theme_advanced_source_editor_height",580)),inline:true,resizable:true,maximizable:true},{theme_url:this.url});},_mceImage:function(ui,val){var ed=this.editor;if(ed.dom.getAttrib(ed.selection.getNode(),'class').indexOf('mceItem')!=-1)return;ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/image.htm',width:355+parseInt(ed.getLang('advanced.image_delta_width',0)),height:275+parseInt(ed.getLang('advanced.image_delta_height',0)),inline:true},{theme_url:this.url});},_mceLink:function(ui,val){var ed=this.editor;ed.windowManager.open({url:tinymce.baseURL+'/themes/advanced/link.htm',width:310+parseInt(ed.getLang('advanced.link_delta_width',0)),height:200+parseInt(ed.getLang('advanced.link_delta_height',0)),inline:true},{theme_url:this.url});},_mceNewDocument:function(){var ed=this.editor;ed.windowManager.confirm('advanced.newdocument',function(s){if(s)ed.execCommand('mceSetContent',false,'');});},_mceForeColor:function(){var t=this;this._mceColorPicker(0,{color:t.fgColor,func:function(co){t.fgColor=co;t.editor.execCommand('ForeColor',false,co);}});},_mceBackColor:function(){var t=this;this._mceColorPicker(0,{color:t.bgColor,func:function(co){t.bgColor=co;t.editor.execCommand('HiliteColor',false,co);}});},_ufirst:function(s){return s.substring(0,1).toUpperCase()+s.substring(1);}});tinymce.ThemeManager.add('advanced',tinymce.themes.AdvancedTheme);}());(function(){var Event=tinymce.dom.Event,grep=tinymce.grep,each=tinymce.each,inArray=tinymce.inArray,isOldWebKit=tinymce.isOldWebKit;tinymce.create('tinymce.plugins.Safari',{init:function(ed){var t=this,dom;if(!tinymce.isWebKit)return;t.editor=ed;t.webKitFontSizes=['x-small','small','medium','large','x-large','xx-large','-webkit-xxx-large'];t.namedFontSizes=['xx-small','x-small','small','medium','large','x-large','xx-large'];ed.addCommand('CreateLink',function(u,v){var n=ed.selection.getNode(),dom=ed.dom,a;if(n&&(/^(left|right)$/i.test(dom.getStyle(n,'float',1))||/^(left|right)$/i.test(dom.getAttrib(n,'align')))){a=dom.create('a',{href:v},n.cloneNode());n.parentNode.replaceChild(a,n);ed.selection.select(a);}else ed.getDoc().execCommand("CreateLink",false,v);});ed.onPaste.add(function(ed,e){function removeStyles(e){e=e.target;if(e.nodeType==1){e.style.cssText='';each(ed.dom.select('*',e),function(e){e.style.cssText='';});}};Event.add(ed.getDoc(),'DOMNodeInserted',removeStyles);window.setTimeout(function(){Event.remove(ed.getDoc(),'DOMNodeInserted',removeStyles);},0);});ed.onKeyUp.add(function(ed,e){var h,b;if(e.keyCode==46||e.keyCode==8){b=ed.getBody();h=b.innerHTML;if(b.childNodes.length==1&&!/<(img|hr)/.test(h)&&tinymce.trim(h.replace(/<[^>]+>/g,'')).length==0)ed.setContent('',{format:'raw'});}});ed.addCommand('FormatBlock',function(u,v){var dom=ed.dom,e=dom.getParent(ed.selection.getNode(),dom.isBlock);if(e)dom.replace(dom.create(v),e,1);else ed.getDoc().execCommand("FormatBlock",false,v);});ed.addCommand('mceInsertContent',function(u,v){ed.getDoc().execCommand("InsertText",false,'mce_marker');ed.getBody().innerHTML=ed.getBody().innerHTML.replace(/mce_marker/g,v+'<span id="_mce_tmp">XX</span>');ed.selection.select(ed.dom.get('_mce_tmp'));ed.getDoc().execCommand("Delete",false,' ');});ed.onKeyPress.add(function(ed,e){if(e.keyCode==13&&(e.shiftKey||ed.settings.force_br_newlines&&ed.selection.getNode().nodeName!='LI')){t._insertBR(ed);Event.cancel(e);}});ed.addQueryValueHandler('FontSize',function(u,v){var e,v;if((e=ed.dom.getParent(ed.selection.getStart(),'span'))&&(v=e.style.fontSize))return tinymce.inArray(t.namedFontSizes,v)+1;if((e=ed.dom.getParent(ed.selection.getEnd(),'span'))&&(v=e.style.fontSize))return tinymce.inArray(t.namedFontSizes,v)+1;return ed.getDoc().queryCommandValue('FontSize');});ed.addQueryValueHandler('FontName',function(u,v){var e,v;if((e=ed.dom.getParent(ed.selection.getStart(),'span'))&&(v=e.style.fontFamily))return v.replace(/, /g,',');if((e=ed.dom.getParent(ed.selection.getEnd(),'span'))&&(v=e.style.fontFamily))return v.replace(/, /g,',');return ed.getDoc().queryCommandValue('FontName');});ed.onClick.add(function(ed,e){e=e.target;if(e.nodeName=='IMG'){t.selElm=e;ed.selection.select(e);}else t.selElm=null;});ed.onInit.add(function(){t._fixWebKitSpans();if(isOldWebKit)t._patchSafari2x(ed);});ed.onSetContent.add(function(){dom=ed.dom;each(['strong','b','em','u','strike','sub','sup','a'],function(v){each(grep(dom.select(v)).reverse(),function(n){var nn=n.nodeName.toLowerCase(),st;if(nn=='a'){if(n.name)dom.replace(dom.create('img',{mce_name:'a',name:n.name,'class':'mceItemAnchor'}),n);return;}switch(nn){case'b':case'strong':if(nn=='b')nn='strong';st='font-weight: bold;';break;case'em':st='font-style: italic;';break;case'u':st='text-decoration: underline;';break;case'sub':st='vertical-align: sub;';break;case'sup':st='vertical-align: super;';break;case'strike':st='text-decoration: line-through;';break;}dom.replace(dom.create('span',{mce_name:nn,style:st,'class':'Apple-style-span'}),n,1);});});});ed.onPreProcess.add(function(ed,o){dom=ed.dom;each(grep(o.node.getElementsByTagName('span')).reverse(),function(n){var v,bg;if(o.get){if(dom.hasClass(n,'Apple-style-span')){bg=n.style.backgroundColor;switch(dom.getAttrib(n,'mce_name')){case'font':if(!ed.settings.convert_fonts_to_spans)dom.setAttrib(n,'style','');break;case'strong':case'em':case'sub':case'sup':dom.setAttrib(n,'style','');break;case'strike':case'u':if(!ed.settings.inline_styles)dom.setAttrib(n,'style','');else dom.setAttrib(n,'mce_name','');break;default:if(!ed.settings.inline_styles)dom.setAttrib(n,'style','');}if(bg)n.style.backgroundColor=bg;}}if(dom.hasClass(n,'mceItemRemoved'))dom.remove(n,1);});});ed.onPostProcess.add(function(ed,o){o.content=o.content.replace(/<br \/><\/(h[1-6]|div|p|address|pre)>/g,'</$1>');o.content=o.content.replace(/ id=\"undefined\"/g,'');});},getInfo:function(){return{longname:'Safari compatibility',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/safari',version:tinymce.majorVersion+"."+tinymce.minorVersion};},_fixWebKitSpans:function(){var t=this,ed=t.editor;if(!isOldWebKit){Event.add(ed.getDoc(),'DOMNodeInserted',function(e){e=e.target;if(e&&e.nodeType==1)t._fixAppleSpan(e);});}else{ed.onExecCommand.add(function(){each(ed.dom.select('span'),function(n){t._fixAppleSpan(n);});ed.nodeChanged();});}},_fixAppleSpan:function(e){var ed=this.editor,dom=ed.dom,fz=this.webKitFontSizes,fzn=this.namedFontSizes,s=ed.settings,st,p;if(dom.getAttrib(e,'mce_fixed'))return;if(e.nodeName=='SPAN'&&e.className=='Apple-style-span'){st=e.style;if(!s.convert_fonts_to_spans){if(st.fontSize){dom.setAttrib(e,'mce_name','font');dom.setAttrib(e,'size',inArray(fz,st.fontSize)+1);}if(st.fontFamily){dom.setAttrib(e,'mce_name','font');dom.setAttrib(e,'face',st.fontFamily);}if(st.color){dom.setAttrib(e,'mce_name','font');dom.setAttrib(e,'color',dom.toHex(st.color));}if(st.backgroundColor){dom.setAttrib(e,'mce_name','font');dom.setStyle(e,'background-color',st.backgroundColor);}}else{if(st.fontSize)dom.setStyle(e,'fontSize',fzn[inArray(fz,st.fontSize)]);}if(st.fontWeight=='bold')dom.setAttrib(e,'mce_name','strong');if(st.fontStyle=='italic')dom.setAttrib(e,'mce_name','em');if(st.textDecoration=='underline')dom.setAttrib(e,'mce_name','u');if(st.textDecoration=='line-through')dom.setAttrib(e,'mce_name','strike');if(st.verticalAlign=='super')dom.setAttrib(e,'mce_name','sup');if(st.verticalAlign=='sub')dom.setAttrib(e,'mce_name','sub');dom.setAttrib(e,'mce_fixed','1');}},_patchSafari2x:function(ed){var t=this,setContent,getNode,dom=ed.dom,lr;if(ed.windowManager.onBeforeOpen){ed.windowManager.onBeforeOpen.add(function(){r=ed.selection.getRng();});}ed.selection.select=function(n){this.getSel().setBaseAndExtent(n,0,n,1);};getNode=ed.selection.getNode;ed.selection.getNode=function(){return t.selElm||getNode.call(this);};ed.selection.getRng=function(){var t=this,s=t.getSel(),d=ed.getDoc(),r,rb,ra,di;if(s.anchorNode){r=d.createRange();try{rb=d.createRange();rb.setStart(s.anchorNode,s.anchorOffset);rb.collapse(1);ra=d.createRange();ra.setStart(s.focusNode,s.focusOffset);ra.collapse(1);di=rb.compareBoundaryPoints(rb.START_TO_END,ra)<0;r.setStart(di?s.anchorNode:s.focusNode,di?s.anchorOffset:s.focusOffset);r.setEnd(di?s.focusNode:s.anchorNode,di?s.focusOffset:s.anchorOffset);lr=r;}catch(ex){}}return r||lr;};setContent=ed.selection.setContent;ed.selection.setContent=function(h,s){var r=this.getRng(),b;try{setContent.call(this,h,s);}catch(ex){b=dom.create('body');b.innerHTML=h;each(b.childNodes,function(n){r.insertNode(n.cloneNode(true));});}};},_insertBR:function(ed){var dom=ed.dom,s=ed.selection,r=s.getRng(),br;r.insertNode(br=dom.create('br'));r.setStartAfter(br);r.setEndAfter(br);s.setRng(r);if(s.getSel().focusNode==br.previousSibling){s.select(dom.insertAfter(dom.doc.createTextNode('\u00a0'),br));s.collapse(1);}ed.getWin().scrollTo(0,dom.getPos(s.getRng().startContainer).y);}});tinymce.PluginManager.add('safari',tinymce.plugins.Safari);})();(function(){var DOM=tinymce.DOM,Element=tinymce.dom.Element,Event=tinymce.dom.Event,each=tinymce.each,is=tinymce.is;tinymce.create('tinymce.plugins.InlinePopups',{init:function(ed,url){ed.onBeforeRenderUI.add(function(){ed.windowManager=new tinymce.InlineWindowManager(ed);DOM.loadCSS(url+'/skins/'+(ed.settings.inlinepopups_skin||'clearlooks2')+"/window.css");});},getInfo:function(){return{longname:'InlinePopups',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/inlinepopups',version:tinymce.majorVersion+"."+tinymce.minorVersion};}});tinymce.create('tinymce.InlineWindowManager:tinymce.WindowManager',{InlineWindowManager:function(ed){var t=this;t.parent(ed);t.zIndex=300000;t.count=0;},open:function(f,p){var t=this,id,opt='',ed=t.editor,dw=0,dh=0,vp,po,mdf,clf,we,w,u;f=f||{};p=p||{};if(!f.inline)return t.parent(f,p);if(!f.type)t.bookmark=ed.selection.getBookmark('simple');id=DOM.uniqueId();vp=DOM.getViewPort();f.width=parseInt(f.width||320);f.height=parseInt(f.height||240)+(tinymce.isIE?8:0);f.min_width=parseInt(f.min_width||150);f.min_height=parseInt(f.min_height||100);f.max_width=parseInt(f.max_width||2000);f.max_height=parseInt(f.max_height||2000);f.left=f.left||Math.round(Math.max(vp.x,vp.x+(vp.w/ 2.0) - (f.width /2.0)));f.top=f.top||Math.round(Math.max(vp.y,vp.y+(vp.h/ 2.0) - (f.height /2.0)));f.movable=f.resizable=true;p.mce_width=f.width;p.mce_height=f.height;p.mce_inline=true;p.mce_window_id=id;p.mce_auto_focus=f.auto_focus;t.features=f;t.params=p;t.onOpen.dispatch(t,f,p);if(f.type){opt+=' mceModal';if(f.type)opt+=' mce'+f.type.substring(0,1).toUpperCase()+f.type.substring(1);f.resizable=false;}if(f.statusbar)opt+=' mceStatusbar';if(f.resizable)opt+=' mceResizable';if(f.minimizable)opt+=' mceMinimizable';if(f.maximizable)opt+=' mceMaximizable';if(f.movable)opt+=' mceMovable';t._addAll(DOM.doc.body,['div',{id:id,'class':ed.settings.inlinepopups_skin||'clearlooks2',style:'width:100px;height:100px'},['div',{id:id+'_wrapper','class':'mceWrapper'+opt},['div',{id:id+'_top','class':'mceTop'},['div',{'class':'mceLeft'}],['div',{'class':'mceCenter'}],['div',{'class':'mceRight'}],['span',{id:id+'_title'},f.title||'']],['div',{id:id+'_middle','class':'mceMiddle'},['div',{id:id+'_left','class':'mceLeft'}],['span',{id:id+'_content'}],['div',{id:id+'_right','class':'mceRight'}]],['div',{id:id+'_bottom','class':'mceBottom'},['div',{'class':'mceLeft'}],['div',{'class':'mceCenter'}],['div',{'class':'mceRight'}],['span',{id:id+'_status'},'Content']],['a',{'class':'mceMove',tabindex:'-1',href:'javascript:;'}],['a',{'class':'mceMin',tabindex:'-1',href:'javascript:;',onmousedown:'return false;'}],['a',{'class':'mceMax',tabindex:'-1',href:'javascript:;',onmousedown:'return false;'}],['a',{'class':'mceMed',tabindex:'-1',href:'javascript:;',onmousedown:'return false;'}],['a',{'class':'mceClose',tabindex:'-1',href:'javascript:;',onmousedown:'return false;'}],['a',{id:id+'_resize_n','class':'mceResize mceResizeN',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_s','class':'mceResize mceResizeS',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_w','class':'mceResize mceResizeW',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_e','class':'mceResize mceResizeE',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_nw','class':'mceResize mceResizeNW',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_ne','class':'mceResize mceResizeNE',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_sw','class':'mceResize mceResizeSW',tabindex:'-1',href:'javascript:;'}],['a',{id:id+'_resize_se','class':'mceResize mceResizeSE',tabindex:'-1',href:'javascript:;'}]]]);DOM.setStyles(id,{top:-10000,left:-10000});if(tinymce.isGecko)DOM.setStyle(id,'overflow','auto');if(!f.type){dw+=DOM.get(id+'_left').clientWidth;dw+=DOM.get(id+'_right').clientWidth;dh+=DOM.get(id+'_top').clientHeight;dh+=DOM.get(id+'_bottom').clientHeight;}DOM.setStyles(id,{top:f.top,left:f.left,width:f.width+dw,height:f.height+dh});u=f.url||f.file;if(u){if(tinymce.relaxedDomain)u+=(u.indexOf('?')==-1?'?':'&')+'mce_rdomain='+tinymce.relaxedDomain;u=tinymce._addVer(u);}if(!f.type){DOM.add(id+'_content','iframe',{id:id+'_ifr',src:'javascript:""',frameBorder:0,style:'border:0;width:10px;height:10px'});DOM.setStyles(id+'_ifr',{width:f.width,height:f.height});DOM.setAttrib(id+'_ifr','src',u);}else{DOM.add(id+'_wrapper','a',{id:id+'_ok','class':'mceButton mceOk',href:'javascript:;',onmousedown:'return false;'},'Ok');if(f.type=='confirm')DOM.add(id+'_wrapper','a',{'class':'mceButton mceCancel',href:'javascript:;',onmousedown:'return false;'},'Cancel');DOM.add(id+'_middle','div',{'class':'mceIcon'});DOM.setHTML(id+'_content',f.content.replace('\n','<br />'));}mdf=Event.add(id,'mousedown',function(e){var n=e.target,w,vp;w=t.windows[id];t.focus(id);if(n.nodeName=='A'||n.nodeName=='a'){if(n.className=='mceMax'){w.oldPos=w.element.getXY();w.oldSize=w.element.getSize();vp=DOM.getViewPort();vp.w-=2;vp.h-=2;w.element.moveTo(vp.x,vp.y);w.element.resizeTo(vp.w,vp.h);DOM.setStyles(id+'_ifr',{width:vp.w-w.deltaWidth,height:vp.h-w.deltaHeight});DOM.addClass(id+'_wrapper','mceMaximized');}else if(n.className=='mceMed'){w.element.moveTo(w.oldPos.x,w.oldPos.y);w.element.resizeTo(w.oldSize.w,w.oldSize.h);w.iframeElement.resizeTo(w.oldSize.w-w.deltaWidth,w.oldSize.h-w.deltaHeight);DOM.removeClass(id+'_wrapper','mceMaximized');}else if(n.className=='mceMove')return t._startDrag(id,e,n.className);else if(DOM.hasClass(n,'mceResize'))return t._startDrag(id,e,n.className.substring(13));}});clf=Event.add(id,'click',function(e){var n=e.target;t.focus(id);if(n.nodeName=='A'||n.nodeName=='a'){switch(n.className){case'mceClose':t.close(null,id);return Event.cancel(e);case'mceButton mceOk':case'mceButton mceCancel':f.button_func(n.className=='mceButton mceOk');return Event.cancel(e);}}});t.windows=t.windows||{};w=t.windows[id]={id:id,mousedown_func:mdf,click_func:clf,element:new Element(id,{blocker:1,container:ed.getContainer()}),iframeElement:new Element(id+'_ifr'),features:f,deltaWidth:dw,deltaHeight:dh};w.iframeElement.on('focus',function(){t.focus(id);});if(t.count==0&&t.editor.getParam('dialog_type')=='modal'){DOM.add(DOM.doc.body,'div',{id:'mceModalBlocker','class':(t.editor.settings.inlinepopups_skin||'clearlooks2')+'_modalBlocker',style:{left:vp.x,top:vp.y,zIndex:t.zIndex-1}});DOM.show('mceModalBlocker');}else DOM.setStyle('mceModalBlocker','z-index',t.zIndex-1);if(tinymce.isIE6||(tinymce.isIE&&!DOM.boxModel))DOM.setStyles('mceModalBlocker',{position:'absolute',width:vp.w-2,height:vp.h-2});t.focus(id);t._fixIELayout(id,1);if(DOM.get(id+'_ok'))DOM.get(id+'_ok').focus();t.count++;return w;},focus:function(id){var t=this,w=t.windows[id];w.zIndex=this.zIndex++;w.element.setStyle('zIndex',w.zIndex);w.element.update();id=id+'_wrapper';DOM.removeClass(t.lastId,'mceFocus');DOM.addClass(id,'mceFocus');t.lastId=id;},_addAll:function(te,ne){var i,n,t=this,dom=tinymce.DOM;if(is(ne,'string'))te.appendChild(dom.doc.createTextNode(ne));else if(ne.length){te=te.appendChild(dom.create(ne[0],ne[1]));for(i=2;i<ne.length;i++)t._addAll(te,ne[i]);}},_startDrag:function(id,se,ac){var t=this,mu,mm,d=DOM.doc,eb,w=t.windows[id],we=w.element,sp=we.getXY(),p,sz,ph,cp,vp,sx,sy,sex,sey,dx,dy,dw,dh;cp={x:0,y:0};vp=DOM.getViewPort();vp.w-=2;vp.h-=2;sex=se.screenX;sey=se.screenY;dx=dy=dw=dh=0;mu=Event.add(d,'mouseup',function(e){Event.remove(d,'mouseup',mu);Event.remove(d,'mousemove',mm);if(eb)eb.remove();we.moveBy(dx,dy);we.resizeBy(dw,dh);sz=we.getSize();DOM.setStyles(id+'_ifr',{width:sz.w-w.deltaWidth,height:sz.h-w.deltaHeight});t._fixIELayout(id,1);return Event.cancel(e);});if(ac!='Move')startMove();function startMove(){if(eb)return;t._fixIELayout(id,0);DOM.add(d.body,'div',{id:'mceEventBlocker','class':'mceEventBlocker '+(t.editor.settings.inlinepopups_skin||'clearlooks2'),style:{left:vp.x,top:vp.y,zIndex:t.zIndex+1}});if(tinymce.isIE6||(tinymce.isIE&&!DOM.boxModel))DOM.setStyles('mceEventBlocker',{position:'absolute',width:vp.w-2,height:vp.h-2});eb=new Element('mceEventBlocker');eb.update();p=we.getXY();sz=we.getSize();sx=cp.x+p.x-vp.x;sy=cp.y+p.y-vp.y;DOM.add(eb.get(),'div',{id:'mcePlaceHolder','class':'mcePlaceHolder',style:{left:sx,top:sy,width:sz.w,height:sz.h}});ph=new Element('mcePlaceHolder');};mm=Event.add(d,'mousemove',function(e){var x,y,v;startMove();x=e.screenX-sex;y=e.screenY-sey;switch(ac){case'ResizeW':dx=x;dw=0-x;break;case'ResizeE':dw=x;break;case'ResizeN':case'ResizeNW':case'ResizeNE':if(ac=="ResizeNW"){dx=x;dw=0-x;}else if(ac=="ResizeNE")dw=x;dy=y;dh=0-y;break;case'ResizeS':case'ResizeSW':case'ResizeSE':if(ac=="ResizeSW"){dx=x;dw=0-x;}else if(ac=="ResizeSE")dw=x;dh=y;break;case'mceMove':dx=x;dy=y;break;}if(dw<(v=w.features.min_width-sz.w)){if(dx!==0)dx+=dw-v;dw=v;}if(dh<(v=w.features.min_height-sz.h)){if(dy!==0)dy+=dh-v;dh=v;}dw=Math.min(dw,w.features.max_width-sz.w);dh=Math.min(dh,w.features.max_height-sz.h);dx=Math.max(dx,vp.x-(sx+vp.x));dy=Math.max(dy,vp.y-(sy+vp.y));dx=Math.min(dx,(vp.w+vp.x)-(sx+sz.w+vp.x));dy=Math.min(dy,(vp.h+vp.y)-(sy+sz.h+vp.y));if(dx+dy!==0){if(sx+dx<0)dx=0;if(sy+dy<0)dy=0;ph.moveTo(sx+dx,sy+dy);}if(dw+dh!==0)ph.resizeTo(sz.w+dw,sz.h+dh);return Event.cancel(e);});return Event.cancel(se);},resizeBy:function(dw,dh,id){var w=this.windows[id];if(w){w.element.resizeBy(dw,dh);w.iframeElement.resizeBy(dw,dh);}},close:function(win,id){var t=this,w,d=DOM.doc,ix=0,fw,id;id=t._findId(id||win);t.count--;if(t.count==0)DOM.remove('mceModalBlocker');if(!id&&win){t.parent(win);return;}if(w=t.windows[id]){t.onClose.dispatch(t);Event.remove(d,'mousedown',w.mousedownFunc);Event.remove(d,'click',w.clickFunc);Event.clear(id);Event.clear(id+'_ifr');DOM.setAttrib(id+'_ifr','src','javascript:""');w.element.remove();delete t.windows[id];each(t.windows,function(w){if(w.zIndex>ix){fw=w;ix=w.zIndex;}});if(fw)t.focus(fw.id);}},setTitle:function(w,ti){var e;w=this._findId(w);if(e=DOM.get(w+'_title'))e.innerHTML=DOM.encode(ti);},alert:function(txt,cb,s){var t=this,w;w=t.open({title:t,type:'alert',button_func:function(s){if(cb)cb.call(s||t,s);t.close(null,w.id);},content:DOM.encode(t.editor.getLang(txt,txt)),inline:1,width:400,height:130});},confirm:function(txt,cb,s){var t=this,w;w=t.open({title:t,type:'confirm',button_func:function(s){if(cb)cb.call(s||t,s);t.close(null,w.id);},content:DOM.encode(t.editor.getLang(txt,txt)),inline:1,width:400,height:130});},_findId:function(w){var t=this;if(typeof(w)=='string')return w;each(t.windows,function(wo){var ifr=DOM.get(wo.id+'_ifr');if(ifr&&w==ifr.contentWindow){w=wo.id;return false;}});return w;},_fixIELayout:function(id,s){var w,img;if(!tinymce.isIE6)return;each(['n','s','w','e','nw','ne','sw','se'],function(v){var e=DOM.get(id+'_resize_'+v);DOM.setStyles(e,{width:s?e.clientWidth:'',height:s?e.clientHeight:'',cursor:DOM.getStyle(e,'cursor',1)});DOM.setStyle(id+"_bottom",'bottom','-1px');e=0;});if(w=this.windows[id]){w.element.hide();w.element.show();each(DOM.select('div,a',id),function(e,i){if(e.currentStyle.backgroundImage!='none'){img=new Image();img.src=e.currentStyle.backgroundImage.replace(/url\(\"(.+)\"\)/,'$1');}});DOM.get(id).style.filter='';}}});tinymce.PluginManager.add('inlinepopups',tinymce.plugins.InlinePopups);})();(function(){tinymce.create('tinymce.plugins.AutoSavePlugin',{init:function(ed,url){var t=this;t.editor=ed;window.onbeforeunload=tinymce.plugins.AutoSavePlugin._beforeUnloadHandler;},getInfo:function(){return{longname:'Auto save',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/autosave',version:tinymce.majorVersion+"."+tinymce.minorVersion};},'static':{_beforeUnloadHandler:function(){var msg;tinymce.each(tinyMCE.editors,function(ed){if(ed.getParam("fullscreen_is_enabled"))return;if(ed.isDirty()){msg=ed.getLang("autosave.unload_msg");return false;}});return msg;}}});tinymce.PluginManager.add('autosave',tinymce.plugins.AutoSavePlugin);})();/**
 * $Id: editor_plugin_src.js 425 2007-11-21 15:17:39Z spocke $
 *
 * @author Moxiecode
 * @copyright Copyright � 2004-2008, Moxiecode Systems AB, All rights reserved.
 */

(function() {
	var JSONRequest = tinymce.util.JSONRequest, each = tinymce.each, DOM = tinymce.DOM;

	tinymce.create('tinymce.plugins.SpellcheckerPlugin', {
		getInfo : function() {
			return {
				longname : 'Spellchecker',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/spellchecker',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},

		init : function(ed, url) {
			var t = this, cm;

			t.url = url;
			t.editor = ed;

			// Register commands
			ed.addCommand('mceSpellCheck', function() {
				if (!t.active) {
					ed.setProgressState(1);
					t._sendRPC('checkWords', [t.selectedLang, t._getWords()], function(r) {
						if (r.length > 0) {
							t.active = 1;
							t._markWords(r);
							ed.setProgressState(0);
							ed.nodeChanged();
						} else {
							ed.setProgressState(0);
							ed.windowManager.alert('spellchecker.no_mpell');
						}
					});
				} else
					t._done();
			});

			ed.onInit.add(function() {
				if (ed.settings.content_css !== false)
					ed.dom.loadCSS(url + '/css/content.css');
			});

			ed.onClick.add(t._showMenu, t);
			ed.onContextMenu.add(t._showMenu, t);
			ed.onBeforeGetContent.add(function() {
				if (t.active)
					t._removeWords();
			});

			ed.onNodeChange.add(function(ed, cm) {
				cm.setActive('spellchecker', t.active);
			});

			ed.onSetContent.add(function() {
				t._done();
			});

			ed.onBeforeGetContent.add(function() {
				t._done();
			});

			ed.onBeforeExecCommand.add(function(ed, cmd) {
				if (cmd == 'mceFullScreen')
					t._done();
			});

			// Find selected language
			t.languages = {};
			each(ed.getParam('spellchecker_languages', '+English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr,German=de,Italian=it,Polish=pl,Portuguese=pt,Spanish=es,Swedish=sv', 'hash'), function(v, k) {
				if (k.indexOf('+') === 0) {
					k = k.substring(1);
					t.selectedLang = v;
				}

				t.languages[k] = v;
			});
		},

		createControl : function(n, cm) {
			var t = this, c, ed = t.editor;

			if (n == 'spellchecker') {
				c = cm.createSplitButton(n, {title : 'spellchecker.desc', cmd : 'mceSpellCheck', scope : t});

				c.onRenderMenu.add(function(c, m) {
					m.add({title : 'spellchecker.langs', 'class' : 'mceMenuItemTitle'}).setDisabled(1);
					each(t.languages, function(v, k) {
						var o = {icon : 1}, mi;

						o.onclick = function() {
							mi.setSelected(1);
							t.selectedItem.setSelected(0);
							t.selectedItem = mi;
							t.selectedLang = v;
						};

						o.title = k;
						mi = m.add(o);
						mi.setSelected(v == t.selectedLang);

						if (v == t.selectedLang)
							t.selectedItem = mi;
					})
				});

				return c;
			}
		},

		// Internal functions

		_walk : function(n, f) {
			var d = this.editor.getDoc(), w;

			if (d.createTreeWalker) {
				w = d.createTreeWalker(n, NodeFilter.SHOW_TEXT, null, false);

				while ((n = w.nextNode()) != null)
					f.call(this, n);
			} else
				tinymce.walk(n, f, 'childNodes');
		},

		_getSeparators : function() {
			var re = '', i, str = this.editor.getParam('spellchecker_word_separator_chars', '\\s!"#$%&()*+,-./:;<=>?@[\]^_{|}����������������\u201d\u201c');

			// Build word separator regexp
			for (i=0; i<str.length; i++)
				re += '\\' + str.charAt(i);

			return re;
		},

		_getWords : function() {
			var ed = this.editor, wl = [], tx = '', lo = {};

			// Get area text
			this._walk(ed.getBody(), function(n) {
				if (n.nodeType == 3)
					tx += n.nodeValue + ' ';
			});

			// Split words by separator
			tx = tx.replace(new RegExp('([0-9]|[' + this._getSeparators() + '])', 'g'), ' ');
			tx = tinymce.trim(tx.replace(/(\s+)/g, ' '));

			// Build word array and remove duplicates
			each(tx.split(' '), function(v) {
				if (!lo[v]) {
					wl.push(v);
					lo[v] = 1;
				}
			});

			return wl;
		},

		_removeWords : function(w) {
			var ed = this.editor, dom = ed.dom, se = ed.selection, b = se.getBookmark();

			each(dom.select('span').reverse(), function(n) {
				if (n && (dom.hasClass(n, 'mceItemHiddenSpellWord') || dom.hasClass(n, 'mceItemHidden'))) {
					if (!w || dom.decode(n.innerHTML) == w)
						dom.remove(n, 1);
				}
			});

			se.moveToBookmark(b);
		},

		_markWords : function(wl) {
			var r1, r2, r3, r4, r5, w = '', ed = this.editor, re = this._getSeparators(), dom = ed.dom, nl = [];
			var se = ed.selection, b = se.getBookmark();

			each(wl, function(v) {
				w += (w ? '|' : '') + v;
			});

			r1 = new RegExp('([' + re + '])(' + w + ')([' + re + '])', 'g');
			r2 = new RegExp('^(' + w + ')', 'g');
			r3 = new RegExp('(' + w + ')([' + re + ']?)$', 'g');
			r4 = new RegExp('^(' + w + ')([' + re + ']?)$', 'g');
			r5 = new RegExp('(' + w + ')([' + re + '])', 'g');

			// Collect all text nodes
			this._walk(this.editor.getBody(), function(n) {
				if (n.nodeType == 3) {
					nl.push(n);
				}
			});

			// Wrap incorrect words in spans
			each(nl, function(n) {
				var v;

				if (n.nodeType == 3) {
					v = n.nodeValue;

					if (r1.test(v) || r2.test(v) || r3.test(v) || r4.test(v)) {
						v = dom.encode(v);
						v = v.replace(r5, '<span class="mceItemHiddenSpellWord">$1</span>$2');
						v = v.replace(r3, '<span class="mceItemHiddenSpellWord">$1</span>$2');

						dom.replace(dom.create('span', {'class' : 'mceItemHidden'}, v), n);
					}
				}
			});

			se.moveToBookmark(b);
		},

		_showMenu : function(ed, e) {
			var t = this, ed = t.editor, m = t._menu, p1, dom = ed.dom, vp = dom.getViewPort(ed.getWin());

			if (!m) {
				p1 = DOM.getPos(ed.getContentAreaContainer());
				//p2 = DOM.getPos(ed.getContainer());

				m = ed.controlManager.createDropMenu('spellcheckermenu', {
					offset_x : p1.x,
					offset_y : p1.y,
					'class' : 'mceNoIcons'
				});

				t._menu = m;
			}

			if (dom.hasClass(e.target, 'mceItemHiddenSpellWord')) {
				m.removeAll();
				m.add({title : 'spellchecker.wait', 'class' : 'mceMenuItemTitle'}).setDisabled(1);

				t._sendRPC('getSuggestions', [t.selectedLang, dom.decode(e.target.innerHTML)], function(r) {
					m.removeAll();

					if (r.length > 0) {
						m.add({title : 'spellchecker.sug', 'class' : 'mceMenuItemTitle'}).setDisabled(1);
						each(r, function(v) {
							m.add({title : v, onclick : function() {
								dom.replace(ed.getDoc().createTextNode(v), e.target);
								t._checkDone();
							}});
						});

						m.addSeparator();
					} else
						m.add({title : 'spellchecker.no_sug', 'class' : 'mceMenuItemTitle'}).setDisabled(1);

					m.add({
						title : 'spellchecker.ignore_word',
						onclick : function() {
							dom.remove(e.target, 1);
							t._checkDone();
						}
					});

					m.add({
						title : 'spellchecker.ignore_words',
						onclick : function() {
							t._removeWords(dom.decode(e.target.innerHTML));
							t._checkDone();
						}
					});

					m.update();
				});

				ed.selection.select(e.target);
				p1 = dom.getPos(e.target);
				m.showMenu(p1.x, p1.y + e.target.offsetHeight - vp.y);

				return tinymce.dom.Event.cancel(e);
			} else
				m.hideMenu();
		},

		_checkDone : function() {
			var t = this, ed = t.editor, dom = ed.dom, o;

			each(dom.select('span'), function(n) {
				if (n && dom.hasClass(n, 'mceItemHiddenSpellWord')) {
					o = true;
					return false;
				}
			});

			if (!o)
				t._done();
		},

		_done : function() {
			var t = this, la = t.active;

			if (t.active) {
				t.active = 0;
				t._removeWords();

				if (t._menu)
					t._menu.hideMenu();

				if (la)
					t.editor.nodeChanged();
			}
		},

		_sendRPC : function(m, p, cb) {
			var t = this, url = t.editor.getParam("spellchecker_rpc_url", this.url+"/rpc.php");

			if (url == '{backend}') {
				t.editor.setProgressState(0);
				alert('Please specify: spellchecker_rpc_url');
				return;
			}

			JSONRequest.sendRPC({
				url : url,
				method : m,
				params : p,
				success : cb,
				error : function(e, x) {
					t.editor.setProgressState(0);
					t.editor.windowManager.alert(e.errstr || ('Error response: ' + x.responseText));
				}
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('spellchecker', tinymce.plugins.SpellcheckerPlugin);
})();(function(){var Event=tinymce.dom.Event;tinymce.create('tinymce.plugins.PastePlugin',{init:function(ed,url){var t=this;t.editor=ed;ed.addCommand('mcePasteText',function(ui,v){if(ui){if((ed.getParam('paste_use_dialog',true))||(!tinymce.isIE)){ed.windowManager.open({file:url+'/pastetext.htm',width:450,height:400,inline:1},{plugin_url:url});}else t._insertText(clipboardData.getData("Text"),true);}else t._insertText(v.html,v.linebreaks);});ed.addCommand('mcePasteWord',function(ui,v){if(ui){if((ed.getParam('paste_use_dialog',true))||(!tinymce.isIE)){ed.windowManager.open({file:url+'/pasteword.htm',width:450,height:400,inline:1},{plugin_url:url});}else t._insertText(t._clipboardHTML());}else t._insertWordContent(v);});ed.addCommand('mceSelectAll',function(){ed.execCommand('selectall');});ed.addButton('pastetext',{title:'paste.paste_text_desc',cmd:'mcePasteText',ui:true});ed.addButton('pasteword',{title:'paste.paste_word_desc',cmd:'mcePasteWord',ui:true});ed.addButton('selectall',{title:'paste.selectall_desc',cmd:'mceSelectAll'});if(ed.getParam("paste_auto_cleanup_on_paste",false)){ed.onPaste.add(function(ed,e){return t._handlePasteEvent(e)});}if(!tinymce.isIE&&ed.getParam("paste_auto_cleanup_on_paste",false)){ed.onKeyDown.add(function(ed,e){if(e.ctrlKey&&e.keyCode==86){window.setTimeout(function(){ed.execCommand("mcePasteText",true);},1);Event.cancel(e);}});}},getInfo:function(){return{longname:'Paste text/word',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/paste',version:tinymce.majorVersion+"."+tinymce.minorVersion};},_handlePasteEvent:function(e){var html=this._clipboardHTML(),ed=this.editor,sel=ed.selection,r;if(ed&&(r=sel.getRng())&&r.text.length>0)ed.execCommand('delete');if(html&&html.length>0)ed.execCommand('mcePasteWord',false,html);return Event.cancel(e);},_insertText:function(content,bLinebreaks){content=this.editor.dom.encode(content);if(content&&content.length>0){if(bLinebreaks){if(this.editor.getParam("paste_create_paragraphs",true)){var rl=this.editor.getParam("paste_replace_list",'\u2122,<sup>TM</sup>,\u2026,...,\u201c|\u201d,",\u2019,\',\u2013|\u2014|\u2015|\u2212,-').split(',');for(var i=0;i<rl.length;i+=2)content=content.replace(new RegExp(rl[i],'gi'),rl[i+1]);content=content.replace(/\r\n\r\n/g,'</p><p>');content=content.replace(/\r\r/g,'</p><p>');content=content.replace(/\n\n/g,'</p><p>');if((pos=content.indexOf('</p><p>'))!=-1){this.editor.execCommand("Delete");var node=this.editor.selection.getNode();var breakElms=[];do{if(node.nodeType==1){if(node.nodeName=="TD"||node.nodeName=="BODY")break;breakElms[breakElms.length]=node;}}while(node=node.parentNode);var before="",after="</p>";before+=content.substring(0,pos);for(var i=0;i<breakElms.length;i++){before+="</"+breakElms[i].nodeName+">";after+="<"+breakElms[(breakElms.length-1)-i].nodeName+">";}before+="<p>";content=before+content.substring(pos+7)+after;}}if(this.editor.getParam("paste_create_linebreaks",true)){content=content.replace(/\r\n/g,'<br />');content=content.replace(/\r/g,'<br />');content=content.replace(/\n/g,'<br />');}}this.editor.execCommand("mceInsertRawHTML",false,content);}},_insertWordContent:function(content){var t=this,ed=t.editor;if(content&&content.length>0){var bull=String.fromCharCode(8226);var middot=String.fromCharCode(183);if(ed.getParam('paste_insert_word_content_callback'))content=ed.execCallback('paste_insert_word_content_callback','before',content);var rl=ed.getParam("paste_replace_list",'\u2122,<sup>TM</sup>,\u2026,...,\u201c|\u201d,",\u2019,\',\u2013|\u2014|\u2015|\u2212,-').split(',');for(var i=0;i<rl.length;i+=2)content=content.replace(new RegExp(rl[i],'gi'),rl[i+1]);if(this.editor.getParam("paste_convert_headers_to_strong",false)){content=content.replace(new RegExp('<p class=MsoHeading.*?>(.*?)<\/p>','gi'),'<p><b>$1</b></p>');}content=content.replace(new RegExp('tab-stops: list [0-9]+.0pt">','gi'),'">'+"--list--");content=content.replace(new RegExp(bull+"(.*?)<BR>","gi"),"<p>"+middot+"$1</p>");content=content.replace(new RegExp('<SPAN style="mso-list: Ignore">','gi'),"<span>"+bull);content=content.replace(/<o:p><\/o:p>/gi,"");content=content.replace(new RegExp('<br style="page-break-before: always;.*>','gi'),'-- page break --');content=content.replace(new RegExp('<(!--)([^>]*)(--)>','g'),"");if(this.editor.getParam("paste_remove_spans",true))content=content.replace(/<\/?span[^>]*>/gi,"");if(this.editor.getParam("paste_remove_styles",true))content=content.replace(new RegExp('<(\\w[^>]*) style="([^"]*)"([^>]*)','gi'),"<$1$3");content=content.replace(/<\/?font[^>]*>/gi,"");switch(this.editor.getParam("paste_strip_class_attributes","all")){case"all":content=content.replace(/<(\w[^>]*) class=([^ |>]*)([^>]*)/gi,"<$1$3");break;case"mso":content=content.replace(new RegExp('<(\\w[^>]*) class="?mso([^ |>]*)([^>]*)','gi'),"<$1$3");break;}content=content.replace(new RegExp('href="?'+this._reEscape(""+document.location)+'','gi'),'href="'+this.editor.documentBaseURI.getURI());content=content.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi,"<$1$3");content=content.replace(/<\\?\?xml[^>]*>/gi,"");content=content.replace(/<\/?\w+:[^>]*>/gi,"");content=content.replace(/-- page break --\s*<p>&nbsp;<\/p>/gi,"");content=content.replace(/-- page break --/gi,"");if(!this.editor.getParam('force_p_newlines')){content=content.replace('','','gi');content=content.replace('</p>','<br /><br />','gi');}if(!tinymce.isIE&&!this.editor.getParam('force_p_newlines')){content=content.replace(/<\/?p[^>]*>/gi,"");}content=content.replace(/<\/?div[^>]*>/gi,"");if(this.editor.getParam("paste_convert_middot_lists",true)){var div=ed.dom.create("div",null,content);var className=this.editor.getParam("paste_unindented_list_class","unIndentedList");while(this._convertMiddots(div,"--list--"));while(this._convertMiddots(div,middot,className));while(this._convertMiddots(div,bull));content=div.innerHTML;}if(this.editor.getParam("paste_convert_headers_to_strong",false)){content=content.replace(/<h[1-6]>&nbsp;<\/h[1-6]>/gi,'<p>&nbsp;&nbsp;</p>');content=content.replace(/<h[1-6]>/gi,'<p><b>');content=content.replace(/<\/h[1-6]>/gi,'</b></p>');content=content.replace(/<b>&nbsp;<\/b>/gi,'<b>&nbsp;&nbsp;</b>');content=content.replace(/^(&nbsp;)*/gi,'');}content=content.replace(/--list--/gi,"");if(ed.getParam('paste_insert_word_content_callback'))content=ed.execCallback('paste_insert_word_content_callback','after',content);this.editor.execCommand("mceInsertContent",false,content);if(this.editor.getParam('paste_force_cleanup_wordpaste',true)){var ed=this.editor;window.setTimeout(function(){ed.execCommand("mceCleanup");},1);}}},_reEscape:function(s){var l="?.\\*[](){}+^$:";var o="";for(var i=0;i<s.length;i++){var c=s.charAt(i);if(l.indexOf(c)!=-1)o+='\\'+c;else o+=c;}return o;},_convertMiddots:function(div,search,class_name){var ed=this.editor,mdot=String.fromCharCode(183),bull=String.fromCharCode(8226);var nodes,prevul,i,p,ul,li,np,cp,li;nodes=div.getElementsByTagName("p");for(i=0;i<nodes.length;i++){p=nodes[i];if(p.innerHTML.indexOf(search)==0){ul=ed.dom.create("ul");if(class_name)ul.className=class_name;li=ed.dom.create("li");li.innerHTML=p.innerHTML.replace(new RegExp(''+mdot+'|'+bull+'|--list--|&nbsp;',"gi"),'');ul.appendChild(li);np=p.nextSibling;while(np){if(np.nodeType==3&&new RegExp('^\\s$','m').test(np.nodeValue)){np=np.nextSibling;continue;}if(search==mdot){if(np.nodeType==1&&new RegExp('^o(\\s+|&nbsp;)').test(np.innerHTML)){if(!prevul){prevul=ul;ul=ed.dom.create("ul");prevul.appendChild(ul);}np.innerHTML=np.innerHTML.replace(/^o/,'');}else{if(prevul){ul=prevul;prevul=null;}if(np.nodeType!=1||np.innerHTML.indexOf(search)!=0)break;}}else{if(np.nodeType!=1||np.innerHTML.indexOf(search)!=0)break;}cp=np.nextSibling;li=ed.dom.create("li");li.innerHTML=np.innerHTML.replace(new RegExp(''+mdot+'|'+bull+'|--list--|&nbsp;',"gi"),'');np.parentNode.removeChild(np);ul.appendChild(li);np=cp;}p.parentNode.replaceChild(ul,p);return true;}}return false;},_clipboardHTML:function(){var div=document.getElementById('_TinyMCE_clipboardHTML');if(!div){var div=document.createElement('DIV');div.id='_TinyMCE_clipboardHTML';with(div.style){visibility='hidden';overflow='hidden';position='absolute';width=1;height=1;}document.body.appendChild(div);}div.innerHTML='';var rng=document.body.createTextRange();rng.moveToElementText(div);rng.execCommand('Paste');var html=div.innerHTML;div.innerHTML='';return html;}});tinymce.PluginManager.add('paste',tinymce.plugins.PastePlugin);})();/**
 * WordPress plugin.
 */

(function() {
	var DOM = tinymce.DOM;

	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('wordpress');

	tinymce.create('tinymce.plugins.WordPress', {
		init : function(ed, url) {
			var t = this, tbId = ed.getParam('wordpress_adv_toolbar', 'toolbar2');
			var moreHTML = '<img src="' + url + '/img/trans.gif" class="mceWPmore mceItemNoResize" title="'+ed.getLang('wordpress.wp_more_alt')+'" />';
			var nextpageHTML = '<img src="' + url + '/img/trans.gif" class="mceWPnextpage mceItemNoResize" title="'+ed.getLang('wordpress.wp_page_alt')+'" />';

			if ( tinymce.util.Cookie.get('kitchenSink') == '1' )
				ed.settings.wordpress_adv_hidden = 0;

			// Hides the specified toolbar and resizes the iframe
			ed.onPostRender.add(function() {
				if ( ed.getParam('wordpress_adv_hidden', 1) ) {
					DOM.hide(ed.controlManager.get(tbId).id);
					t._resizeIframe(ed, tbId, 28);
				}
			});

			// Register commands
			ed.addCommand('WP_More', function() {
				ed.execCommand('mceInsertContent', 0, moreHTML);
			});

			ed.addCommand('WP_Page', function() {
				ed.execCommand('mceInsertContent', 0, nextpageHTML);
			});

			ed.addCommand('WP_Help', function() {
					ed.windowManager.open({
						url : tinymce.baseURL + '/wp-mce-help.php',
						width : 450,
						height : 420,
						inline : 1
					});
				});

			ed.addCommand('WP_Adv', function() {
				var id = ed.controlManager.get(tbId).id, cm = ed.controlManager, cook = tinymce.util.Cookie, date;

				date = new Date();
				date.setTime(date.getTime()+(10*365*24*60*60*1000));

				if (DOM.isHidden(id)) {
					cm.setActive('wp_adv', 1);
					DOM.show(id);
					t._resizeIframe(ed, tbId, -28);
					ed.settings.wordpress_adv_hidden = 0;
					cook.set('kitchenSink', '1', date);
				} else {
					cm.setActive('wp_adv', 0);
					DOM.hide(id);
					t._resizeIframe(ed, tbId, 28);
					ed.settings.wordpress_adv_hidden = 1;
					cook.set('kitchenSink', '0', date);
				}
			});

			// Register buttons
			ed.addButton('wp_more', {
				title : 'wordpress.wp_more_desc',
				image : url + '/img/more.gif',
				cmd : 'WP_More'
			});

			ed.addButton('wp_page', {
				title : 'wordpress.wp_page_desc',
				image : url + '/img/page.gif',
				cmd : 'WP_Page'
			});

			ed.addButton('wp_help', {
				title : 'wordpress.wp_help_desc',
				image : url + '/img/help.gif',
				cmd : 'WP_Help'
			});

			ed.addButton('wp_adv', {
				title : 'wordpress.wp_adv_desc',
				image : url + '/img/toolbars.gif',
				cmd : 'WP_Adv'
			});

			// Add Media buttons
			ed.addButton('add_media', {
				title : 'wordpress.add_media',
				image : url + '/img/media.gif',
				onclick : function() {
					tb_show('', tinymce.DOM.get('add_media').href);
					tinymce.DOM.setStyle( ['TB_overlay','TB_window','TB_load'], 'z-index', '999999' );
				}
			});

			ed.addButton('add_image', {
				title : 'wordpress.add_image',
				image : url + '/img/image.gif',
				onclick : function() {
					tb_show('', tinymce.DOM.get('add_image').href);
					tinymce.DOM.setStyle( ['TB_overlay','TB_window','TB_load'], 'z-index', '999999' );
				}
			});

			ed.addButton('add_video', {
				title : 'wordpress.add_video',
				image : url + '/img/video.gif',
				onclick : function() {
					tb_show('', tinymce.DOM.get('add_video').href);
					tinymce.DOM.setStyle( ['TB_overlay','TB_window','TB_load'], 'z-index', '999999' );
				}
			});

			ed.addButton('add_audio', {
				title : 'wordpress.add_audio',
				image : url + '/img/audio.gif',
				onclick : function() {
					tb_show('', tinymce.DOM.get('add_audio').href);
					tinymce.DOM.setStyle( ['TB_overlay','TB_window','TB_load'], 'z-index', '999999' );
				}
			});

			// Add Media buttons to fullscreen
			ed.onBeforeExecCommand.add(function(ed, cmd, ui, val) {
				if ( 'mceFullScreen' != cmd ) return;
				if ( 'mce_fullscreen' != ed.id )
					ed.settings.theme_advanced_buttons1 += ',|,add_image,add_video,add_audio,add_media';
			});

			// Add class "alignleft", "alignright" and "aligncenter" when selecting align for images.
			ed.addCommand('JustifyLeft', function() {
				var n = ed.selection.getNode();

				if ( n.nodeName != 'IMG' )
					ed.editorCommands.mceJustify('JustifyLeft', 'left');
				else ed.plugins.wordpress.do_align(n, 'alignleft');
			});

			ed.addCommand('JustifyRight', function() {
				var n = ed.selection.getNode();

				if ( n.nodeName != 'IMG' )
					ed.editorCommands.mceJustify('JustifyRight', 'right');
				else ed.plugins.wordpress.do_align(n, 'alignright');
			});

			ed.addCommand('JustifyCenter', function() {
				var n = ed.selection.getNode(), P = ed.dom.getParent(n, 'p'), DL = ed.dom.getParent(n, 'dl');

				if ( n.nodeName == 'IMG' && ( P || DL ) )
					ed.plugins.wordpress.do_align(n, 'aligncenter');
				else ed.editorCommands.mceJustify('JustifyCenter', 'center');
			});

			// Word count if script is loaded
			if ( 'undefined' != typeof wpWordCount ) {
				var last = 0;
				ed.onKeyUp.add(function(ed, e) {
					if ( e.keyCode == last ) return;
					if ( 13 == e.keyCode || 8 == last || 46 == last ) wpWordCount.wc( ed.getContent({format : 'raw'}) );
					last = e.keyCode;
				});
			};

			// Add listeners to handle more break
			t._handleMoreBreak(ed, url);

			// Add custom shortcuts
			ed.addShortcut('alt+shift+c', ed.getLang('justifycenter_desc'), 'JustifyCenter');
			ed.addShortcut('alt+shift+r', ed.getLang('justifyright_desc'), 'JustifyRight');
			ed.addShortcut('alt+shift+l', ed.getLang('justifyleft_desc'), 'JustifyLeft');
			ed.addShortcut('alt+shift+j', ed.getLang('justifyfull_desc'), 'JustifyFull');
			ed.addShortcut('alt+shift+q', ed.getLang('blockquote_desc'), 'mceBlockQuote');
			ed.addShortcut('alt+shift+u', ed.getLang('bullist_desc'), 'InsertUnorderedList');
			ed.addShortcut('alt+shift+o', ed.getLang('numlist_desc'), 'InsertOrderedList');
			ed.addShortcut('alt+shift+d', ed.getLang('striketrough_desc'), 'Strikethrough');
			ed.addShortcut('alt+shift+n', ed.getLang('spellchecker.desc'), 'mceSpellCheck');
			ed.addShortcut('alt+shift+a', ed.getLang('link_desc'), 'mceLink');
			ed.addShortcut('alt+shift+s', ed.getLang('unlink_desc'), 'unlink');
			ed.addShortcut('alt+shift+m', ed.getLang('image_desc'), 'mceImage');
			ed.addShortcut('alt+shift+g', ed.getLang('fullscreen.desc'), 'mceFullScreen');
			ed.addShortcut('alt+shift+z', ed.getLang('wp_adv_desc'), 'WP_Adv');
			ed.addShortcut('alt+shift+h', ed.getLang('help_desc'), 'WP_Help');
			ed.addShortcut('alt+shift+t', ed.getLang('wp_more_desc'), 'WP_More');
			ed.addShortcut('alt+shift+p', ed.getLang('wp_page_desc'), 'WP_Page');

			if ( tinymce.isWebKit ) {
				ed.addShortcut('alt+shift+b', ed.getLang('bold_desc'), 'Bold');
				ed.addShortcut('alt+shift+i', ed.getLang('italic_desc'), 'Italic');
			}
		},

		getInfo : function() {
			return {
				longname : 'WordPress Plugin',
				author : 'WordPress', // add Moxiecode?
				authorurl : 'http://wordpress.org',
				infourl : 'http://wordpress.org',
				version : '3.0'
			};
		},

		// Internal functions
		do_align : function(n, a) {
			var P, DL, DIV, cls, c, ed = tinyMCE.activeEditor;

			P = ed.dom.getParent(n, 'p');
			DL = ed.dom.getParent(n, 'dl');
			DIV = ed.dom.getParent(n, 'div');

			if ( DL && DIV ) {
				cls = ed.dom.hasClass(DL, a) ? 'alignnone' : a;
				DL.className = DL.className.replace(/align[^ '"]+\s?/g, '');
				ed.dom.addClass(DL, cls);
				c = (cls == 'aligncenter') ? ed.dom.addClass(DIV, 'mceIEcenter') : ed.dom.removeClass(DIV, 'mceIEcenter');
			} else if ( P ) {
				cls = ed.dom.hasClass(n, a) ? 'alignnone' : a;
				n.className = n.className.replace(/align[^ '"]+\s?/g, '');
				ed.dom.addClass(n, cls);
				if ( cls == 'aligncenter' )
					ed.dom.setStyle(P, 'textAlign', 'center');
				else if (P.style && P.style.textAlign == 'center')
					ed.dom.setStyle(P, 'textAlign', '');
			}

			ed.execCommand('mceRepaint');
		},

		// Resizes the iframe by a relative height value
		_resizeIframe : function(ed, tb_id, dy) {
			var ifr = ed.getContentAreaContainer().firstChild;

			DOM.setStyle(ifr, 'height', ifr.clientHeight + dy); // Resize iframe
			ed.theme.deltaHeight += dy; // For resize cookie
		},

		_handleMoreBreak : function(ed, url) {
			var moreHTML = '<img src="' + url + '/img/trans.gif" alt="$1" class="mceWPmore mceItemNoResize" title="'+ed.getLang('wordpress.wp_more_alt')+'" />';
			var nextpageHTML = '<img src="' + url + '/img/trans.gif" class="mceWPnextpage mceItemNoResize" title="'+ed.getLang('wordpress.wp_page_alt')+'" />';

			// Load plugin specific CSS into editor
			ed.onInit.add(function() {
				ed.dom.loadCSS(url + '/css/content.css');
			});

			// Display morebreak instead if img in element path
			ed.onPostRender.add(function() {
				if (ed.theme.onResolveName) {
					ed.theme.onResolveName.add(function(th, o) {
						if (o.node.nodeName == 'IMG') {
							if ( ed.dom.hasClass(o.node, 'mceWPmore') )
								o.name = 'wpmore';
							if ( ed.dom.hasClass(o.node, 'mceWPnextpage') )
								o.name = 'wppage';
						}

					});
				}
			});

			// Replace morebreak with images
			ed.onBeforeSetContent.add(function(ed, o) {
				o.content = o.content.replace(/<!--more(.*?)-->/g, moreHTML);
				o.content = o.content.replace(/<!--nextpage-->/g, nextpageHTML);
			});

			// Replace images with morebreak
			ed.onPostProcess.add(function(ed, o) {
				if (o.get)
					o.content = o.content.replace(/<img[^>]+>/g, function(im) {
						if (im.indexOf('class="mceWPmore') !== -1) {
							var m, moretext = (m = im.match(/alt="(.*?)"/)) ? m[1] : '';
							im = '<!--more'+moretext+'-->';
						}
						if (im.indexOf('class="mceWPnextpage') !== -1)
							im = '<!--nextpage-->';

						return im;
					});
			});

			// Set active buttons if user selected pagebreak or more break
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('wp_page', n.nodeName === 'IMG' && ed.dom.hasClass(n, 'mceWPnextpage'));
				cm.setActive('wp_more', n.nodeName === 'IMG' && ed.dom.hasClass(n, 'mceWPmore'));
			});
		}
	});

	// Register plugin
	tinymce.PluginManager.add('wordpress', tinymce.plugins.WordPress);
})();
(function(){var each=tinymce.each;tinymce.create('tinymce.plugins.MediaPlugin',{init:function(ed,url){var t=this;t.editor=ed;t.url=url;function isMediaElm(n){return/^(mceItemFlash|mceItemShockWave|mceItemWindowsMedia|mceItemQuickTime|mceItemRealMedia)$/.test(n.className);};ed.onPreInit.add(function(){ed.serializer.addRules('param[name|value|_value]');});ed.addCommand('mceMedia',function(){ed.windowManager.open({file:url+'/media.htm',width:430+parseInt(ed.getLang('media.delta_width',0)),height:470+parseInt(ed.getLang('media.delta_height',0)),inline:1},{plugin_url:url});});ed.addButton('media',{title:'media.desc',cmd:'mceMedia'});ed.onNodeChange.add(function(ed,cm,n){cm.setActive('media',n.nodeName=='IMG'&&isMediaElm(n));});ed.onInit.add(function(){var lo={mceItemFlash:'flash',mceItemShockWave:'shockwave',mceItemWindowsMedia:'windowsmedia',mceItemQuickTime:'quicktime',mceItemRealMedia:'realmedia'};if(ed.settings.content_css!==false)ed.dom.loadCSS(url+"/css/content.css");if(ed.theme.onResolveName){ed.theme.onResolveName.add(function(th,o){if(o.name=='img'){each(lo,function(v,k){if(ed.dom.hasClass(o.node,k)){o.name=v;o.title=ed.dom.getAttrib(o.node,'title');return false;}});}});}if(ed&&ed.plugins.contextmenu){ed.plugins.contextmenu.onContextMenu.add(function(th,m,e){if(e.nodeName=='IMG'&&/mceItem(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)/.test(e.className)){m.add({title:'media.edit',icon:'media',cmd:'mceMedia'});}});}});ed.onBeforeSetContent.add(function(ed,o){var h=o.content;h=h.replace(/<script[^>]*>\s*write(Flash|ShockWave|WindowsMedia|QuickTime|RealMedia)\(\{([^\)]*)\}\);\s*<\/script>/gi,function(a,b,c){var o=t._parse(c);return'<img class="mceItem'+b+'" title="'+ed.dom.encode(c)+'" src="'+url+'/img/trans.gif" width="'+o.width+'" height="'+o.height+'" />'});h=h.replace(/<object([^>]*)>/gi,'<span class="mceItemObject" $1>');h=h.replace(/<embed([^>]*)\/?>/gi,'<span class="mceItemEmbed" $1></span>');h=h.replace(/<embed([^>]*)>/gi,'<span class="mceItemEmbed" $1>');h=h.replace(/<\/(object)([^>]*)>/gi,'</span>');h=h.replace(/<\/embed>/gi,'');h=h.replace(/<param([^>]*)>/gi,function(a,b){return'<span '+b.replace(/value=/gi,'_value=')+' class="mceItemParam"></span>'});h=h.replace(/\/ class=\"mceItemParam\"><\/span>/gi,'class="mceItemParam"></span>');o.content=h;});ed.onSetContent.add(function(){t._spansToImgs(ed.getBody());});ed.onPreProcess.add(function(ed,o){var dom=ed.dom;if(o.set){t._spansToImgs(o.node);each(dom.select('IMG',o.node),function(n){var p;if(isMediaElm(n)){p=t._parse(n.title);dom.setAttrib(n,'width',dom.getAttrib(n,'width',p.width||100));dom.setAttrib(n,'height',dom.getAttrib(n,'height',p.height||100));}});}if(o.get){each(dom.select('IMG',o.node),function(n){var ci,cb,mt;if(ed.getParam('media_use_script')){if(isMediaElm(n))n.className=n.className.replace(/mceItem/g,'mceTemp');return;}switch(n.className){case'mceItemFlash':ci='d27cdb6e-ae6d-11cf-96b8-444553540000';cb='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0';mt='application/x-shockwave-flash';break;case'mceItemShockWave':ci='166b1bca-3f9c-11cf-8075-444553540000';cb='http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=8,5,1,0';mt='application/x-director';break;case'mceItemWindowsMedia':ci=ed.getParam('media_wmp6_compatible')?'05589fa1-c356-11ce-bf01-00aa0055595a':'6bf52a52-394a-11d3-b153-00c04f79faa6';cb='http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701';mt='application/x-mplayer2';break;case'mceItemQuickTime':ci='02bf25d5-8c17-4b23-bc80-d3488abddc6b';cb='http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0';mt='video/quicktime';break;case'mceItemRealMedia':ci='cfcdaa03-8be4-11cf-b84b-0020afbbccfa';cb='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0';mt='audio/x-pn-realaudio-plugin';break;}if(ci){dom.replace(t._buildObj({classid:ci,codebase:cb,type:mt},n),n);}});}});ed.onPostProcess.add(function(ed,o){o.content=o.content.replace(/_value=/g,'value=');});if(ed.getParam('media_use_script')){function getAttr(s,n){n=new RegExp(n+'=\"([^\"]+)\"','g').exec(s);return n?ed.dom.decode(n[1]):'';};ed.onPostProcess.add(function(ed,o){o.content=o.content.replace(/<img[^>]+>/g,function(im){var cl=getAttr(im,'class');if(/^(mceTempFlash|mceTempShockWave|mceTempWindowsMedia|mceTempQuickTime|mceTempRealMedia)$/.test(cl)){at=t._parse(getAttr(im,'title'));at.width=getAttr(im,'width');at.height=getAttr(im,'height');im='<script type="text/javascript">write'+cl.substring(7)+'({'+t._serialize(at)+'});</script>';}return im;});});}},getInfo:function(){return{longname:'Media',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/media',version:tinymce.majorVersion+"."+tinymce.minorVersion};},_buildObj:function(o,n){var ob,ed=this.editor,dom=ed.dom,p=this._parse(n.title);p.width=o.width=dom.getAttrib(n,'width')||100;p.height=o.height=dom.getAttrib(n,'height')||100;ob=dom.create('span',{mce_name:'object',classid:"clsid:"+o.classid,codebase:o.codebase,width:o.width,height:o.height});if(p.src)p.src=ed.convertURL(p.src,'src',n);each(p,function(v,k){if(!/^(width|height|codebase|classid)$/.test(k)){if(o.type=='application/x-mplayer2'&&k=='src')k='url';dom.add(ob,'span',{mce_name:'param',name:k,'_value':v});}});dom.add(ob,'span',tinymce.extend({mce_name:'embed',type:o.type},p));return ob;},_spansToImgs:function(p){var t=this,dom=t.editor.dom,im,ci;each(dom.select('span',p),function(n){if(dom.getAttrib(n,'class')=='mceItemObject'){ci=dom.getAttrib(n,"classid").toLowerCase().replace(/\s+/g,'');switch(ci){case'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000':dom.replace(t._createImg('mceItemFlash',n),n);break;case'clsid:166b1bca-3f9c-11cf-8075-444553540000':dom.replace(t._createImg('mceItemShockWave',n),n);break;case'clsid:6bf52a52-394a-11d3-b153-00c04f79faa6':case'clsid:22d6f312-b0f6-11d0-94ab-0080c74c7e95':case'clsid:05589fa1-c356-11ce-bf01-00aa0055595a':dom.replace(t._createImg('mceItemWindowsMedia',n),n);break;case'clsid:02bf25d5-8c17-4b23-bc80-d3488abddc6b':dom.replace(t._createImg('mceItemQuickTime',n),n);break;case'clsid:cfcdaa03-8be4-11cf-b84b-0020afbbccfa':dom.replace(t._createImg('mceItemRealMedia',n),n);break;default:dom.replace(t._createImg('mceItemFlash',n),n);}return;}if(dom.getAttrib(n,'class')=='mceItemEmbed'){switch(dom.getAttrib(n,'type')){case'application/x-shockwave-flash':dom.replace(t._createImg('mceItemFlash',n),n);break;case'application/x-director':dom.replace(t._createImg('mceItemShockWave',n),n);break;case'application/x-mplayer2':dom.replace(t._createImg('mceItemWindowsMedia',n),n);break;case'video/quicktime':dom.replace(t._createImg('mceItemQuickTime',n),n);break;case'audio/x-pn-realaudio-plugin':dom.replace(t._createImg('mceItemRealMedia',n),n);break;default:dom.replace(t._createImg('mceItemFlash',n),n);}}});},_createImg:function(cl,n){var im,dom=this.editor.dom,pa={},ti='';im=dom.create('img',{src:this.url+'/img/trans.gif',width:dom.getAttrib(n,'width')||100,height:dom.getAttrib(n,'height')||100,'class':cl});each(['id','name','width','height','bgcolor','align','flashvars','src','wmode'],function(na){var v=dom.getAttrib(n,na);if(v)pa[na]=v;});each(dom.select('span',n),function(n){if(dom.hasClass(n,'mceItemParam'))pa[dom.getAttrib(n,'name')]=dom.getAttrib(n,'_value');});if(pa.movie){pa.src=pa.movie;delete pa.movie;}delete pa.width;delete pa.height;im.title=this._serialize(pa);return im;},_parse:function(s){return tinymce.util.JSON.parse('{'+s+'}');},_serialize:function(o){return tinymce.util.JSON.serialize(o).replace(/[{}]/g,'');}});tinymce.PluginManager.add('media',tinymce.plugins.MediaPlugin);})();(function(){var DOM=tinymce.DOM;tinymce.create('tinymce.plugins.FullScreenPlugin',{init:function(ed,url){var t=this,s={},vp;t.editor=ed;ed.addCommand('mceFullScreen',function(){var win,de=DOM.doc.documentElement;if(ed.getParam('fullscreen_is_enabled')){if(ed.getParam('fullscreen_new_window'))closeFullscreen();else{DOM.win.setTimeout(function(){tinymce.dom.Event.remove(DOM.win,'resize',t.resizeFunc);tinyMCE.get(ed.getParam('fullscreen_editor_id')).setContent(ed.getContent({format:'raw'}),{format:'raw'});tinyMCE.remove(ed);DOM.remove('mce_fullscreen_container');de.style.overflow=ed.getParam('fullscreen_html_overflow');DOM.setStyle(DOM.doc.body,'overflow',ed.getParam('fullscreen_overflow'));DOM.win.scrollTo(ed.getParam('fullscreen_scrollx'),ed.getParam('fullscreen_scrolly'));tinyMCE.settings=tinyMCE.oldSettings;},10);}return;}if(ed.getParam('fullscreen_new_window')){win=DOM.win.open(url+"/fullscreen.htm","mceFullScreenPopup","fullscreen=yes,menubar=no,toolbar=no,scrollbars=no,resizable=yes,left=0,top=0,width="+screen.availWidth+",height="+screen.availHeight);try{win.resizeTo(screen.availWidth,screen.availHeight);}catch(e){}}else{tinyMCE.oldSettings=tinyMCE.settings;s.fullscreen_overflow=DOM.getStyle(DOM.doc.body,'overflow',1)||'auto';s.fullscreen_html_overflow=DOM.getStyle(de,'overflow',1);vp=DOM.getViewPort();s.fullscreen_scrollx=vp.x;s.fullscreen_scrolly=vp.y;if(tinymce.isOpera&&s.fullscreen_overflow=='visible')s.fullscreen_overflow='auto';if(tinymce.isIE&&s.fullscreen_overflow=='scroll')s.fullscreen_overflow='auto';if(s.fullscreen_overflow=='0px')s.fullscreen_overflow='';DOM.setStyle(DOM.doc.body,'overflow','hidden');de.style.overflow='hidden';vp=DOM.getViewPort();DOM.win.scrollTo(0,0);if(tinymce.isIE)vp.h-=1;n=DOM.add(DOM.doc.body,'div',{id:'mce_fullscreen_container',style:'position:'+(tinymce.isIE6||(tinymce.isIE&&!DOM.boxModel)?'absolute':'fixed')+';top:0;left:0;width:'+vp.w+'px;height:'+vp.h+'px;z-index:200000;'});DOM.add(n,'div',{id:'mce_fullscreen'});tinymce.each(ed.settings,function(v,n){s[n]=v;});s.id='mce_fullscreen';s.width=n.clientWidth;s.height=n.clientHeight-15;s.fullscreen_is_enabled=true;s.fullscreen_editor_id=ed.id;s.theme_advanced_resizing=false;s.save_onsavecallback=function(){ed.setContent(tinyMCE.get(s.id).getContent({format:'raw'}),{format:'raw'});ed.execCommand('mceSave');};tinymce.each(ed.getParam('fullscreen_settings'),function(v,k){s[k]=v;});if(s.theme_advanced_toolbar_location==='external')s.theme_advanced_toolbar_location='top';t.fullscreenEditor=new tinymce.Editor('mce_fullscreen',s);t.fullscreenEditor.onInit.add(function(){t.fullscreenEditor.setContent(ed.getContent());t.fullscreenEditor.focus();});t.fullscreenEditor.render();tinyMCE.add(t.fullscreenEditor);t.fullscreenElement=new tinymce.dom.Element('mce_fullscreen_container');t.fullscreenElement.update();t.resizeFunc=tinymce.dom.Event.add(DOM.win,'resize',function(){var vp=tinymce.DOM.getViewPort();t.fullscreenEditor.theme.resizeTo(vp.w,vp.h);});}});ed.addButton('fullscreen',{title:'fullscreen.desc',cmd:'mceFullScreen'});ed.onNodeChange.add(function(ed,cm){cm.setActive('fullscreen',ed.getParam('fullscreen_is_enabled'));});},getInfo:function(){return{longname:'Fullscreen',author:'Moxiecode Systems AB',authorurl:'http://tinymce.moxiecode.com',infourl:'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/fullscreen',version:tinymce.majorVersion+"."+tinymce.minorVersion};}});tinymce.PluginManager.add('fullscreen',tinymce.plugins.FullScreenPlugin);})();
(function() {
	tinymce.create('tinymce.plugins.wpEditImage', {

		init : function(ed, url) {
			var t = this;

			t.url = url;
			t._createButtons();

			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('...');
			ed.addCommand('WP_EditImage', function() {
				var el = ed.selection.getNode();

				if ( ed.dom.getAttrib(el, 'class').indexOf('mceItem') != -1 || el.nodeName != 'IMG' )
					return;

				tb_show('', url + '/editimage.html?ver=311g&TB_iframe=true');
				tinymce.DOM.setStyle( ['TB_overlay','TB_window','TB_load'], 'z-index', '999999' );
			});

			ed.onInit.add(function(ed) {
				tinymce.dom.Event.add(ed.getWin(), 'scroll', function(e) {
					ed.plugins.wpeditimage.hideButtons();
				});
			});

			ed.onBeforeExecCommand.add(function(ed, cmd, ui, val) {
				ed.plugins.wpeditimage.hideButtons();
			});

			ed.onSaveContent.add(function(ed, o) {
				ed.plugins.wpeditimage.hideButtons();
			});

			ed.onMouseUp.add(function(ed, e) {
				if ( tinymce.isOpera ) {
					if ( e.target.nodeName == 'IMG' )
						ed.plugins.wpeditimage.showButtons(e.target);
				} else if ( ! tinymce.isWebKit ) {
					var n = ed.selection.getNode(), DL;
					
					if ( n.nodeName == 'IMG' && (DL = ed.dom.getParent(n, 'DL')) ) {					
						window.setTimeout(function(){
							var ed = tinyMCE.activeEditor, n = ed.selection.getNode(), DL = ed.dom.getParent(n, 'DL');
						
							if ( n.width != (parseInt(ed.dom.getStyle(DL, 'width')) - 10) ) {
								ed.dom.setStyle(DL, 'width', parseInt(n.width)+10);
								ed.execCommand('mceRepaint');
							}
						}, 100);
					}
				}
			});

			ed.onMouseDown.add(function(ed, e) {
				if ( tinymce.isOpera || e.target.nodeName != 'IMG' ) {
					t.hideButtons();
					return;
				}
				ed.plugins.wpeditimage.showButtons(e.target);
			});

			ed.onKeyPress.add(function(ed, e) {
				var DL, DIV;

				if ( e.keyCode == 13 && (DL = ed.dom.getParent(ed.selection.getNode(), 'DL')) ) {
					var P = ed.dom.create('p', {}, '&nbsp;');
					if ( (DIV = DL.parentNode) && DIV.nodeName == 'DIV' ) 
						ed.dom.insertAfter( P, DIV );
					else ed.dom.insertAfter( P, DL );

					tinymce.dom.Event.cancel(e);
					ed.selection.select(P);
					return false;
				}
			});

			ed.onBeforeSetContent.add(function(ed, o) {
				o.content = t._do_shcode(o.content);
			});

			ed.onPostProcess.add(function(ed, o) {
				if (o.get)
					o.content = t._get_shcode(o.content);
			});
		},

		_do_shcode : function(co) {
			return co.replace(/\[(?:wp_)?caption([^\]]+)\]([\s\S]+?)\[\/(?:wp_)?caption\][\s\u00a0]*/g, function(a,b,c){
				b = b.replace(/\\'|\\&#39;|\\&#039;/g, '&#39;').replace(/\\"|\\&quot;/g, '&quot;');
				c = c.replace(/\\&#39;|\\&#039;/g, '&#39;').replace(/\\&quot;/g, '&quot;');
				var id = b.match(/id=['"]([^'"]+)/i), cls = b.match(/align=['"]([^'"]+)/i);
				var w = b.match(/width=['"]([0-9]+)/), cap = b.match(/caption=['"]([^'"]+)/i);

				id = ( id && id[1] ) ? id[1] : '';
				cls = ( cls && cls[1] ) ? cls[1] : 'alignnone';
				w = ( w && w[1] ) ? w[1] : '';
				cap = ( cap && cap[1] ) ? cap[1] : '';
				if ( ! w || ! cap ) return c;
				
				var div_cls = (cls == 'aligncenter') ? 'mceTemp mceIEcenter' : 'mceTemp';

				return '<div class="'+div_cls+'"><dl id="'+id+'" class="wp-caption '+cls+'" style="width: '+(10+parseInt(w))+
				'px"><dt class="wp-caption-dt">'+c+'</dt><dd class="wp-caption-dd">'+cap+'</dd></dl></div>';
			});
		},

		_get_shcode : function(co) {
			return co.replace(/<div class="mceTemp[^"]*">\s*<dl([^>]+)>\s*<dt[^>]+>([\s\S]+?)<\/dt>\s*<dd[^>]+>(.+?)<\/dd>\s*<\/dl>\s*<\/div>\s*/gi, function(a,b,c,cap){
				var id = b.match(/id=['"]([^'"]+)/i), cls = b.match(/class=['"]([^'"]+)/i);
				var w = c.match(/width=['"]([0-9]+)/);

				id = ( id && id[1] ) ? id[1] : '';
				cls = ( cls && cls[1] ) ? cls[1] : 'alignnone';
				w = ( w && w[1] ) ? w[1] : '';

				if ( ! w || ! cap ) return c;
				cls = cls.match(/align[^ '"]+/) || 'alignnone';
				cap = cap.replace(/<\S[^<>]*>/gi, '').replace(/'/g, '&#39;').replace(/"/g, '&quot;');

				return '[caption id="'+id+'" align="'+cls+'" width="'+w+'" caption="'+cap+'"]'+c+'[/caption]';
			});
		},

		showButtons : function(n) {
			var t = this, ed = tinyMCE.activeEditor, p1, p2, vp, DOM = tinymce.DOM, X, Y;

			if (ed.dom.getAttrib(n, 'class').indexOf('mceItem') != -1)
				return;

			vp = ed.dom.getViewPort(ed.getWin());
			p1 = DOM.getPos(ed.getContentAreaContainer());
			p2 = ed.dom.getPos(n);

			X = Math.max(p2.x - vp.x, 0) + p1.x;
			Y = Math.max(p2.y - vp.y, 0) + p1.y;

			DOM.setStyles('wp_editbtns', {
				'top' : Y+5+'px',
				'left' : X+5+'px',
				'display' : 'block'
			});

			t.btnsTout = window.setTimeout( function(){ed.plugins.wpeditimage.hideButtons();}, 5000 );
		},

		hideButtons : function() {
			if ( tinymce.DOM.isHidden('wp_editbtns') ) return;

			tinymce.DOM.hide('wp_editbtns');
			window.clearTimeout(this.btnsTout);
		},

		_createButtons : function() {
			var t = this, ed = tinyMCE.activeEditor, DOM = tinymce.DOM;

			DOM.remove('wp_editbtns');

			var wp_editbtns = DOM.add(document.body, 'div', {
				id : 'wp_editbtns',
				style : 'display:none;'
			});

			var wp_editimgbtn = DOM.add('wp_editbtns', 'img', {
				src : t.url+'/img/image.png',
				id : 'wp_editimgbtn',
				width : '24',
				height : '24',
				title : ed.getLang('wpeditimage.edit_img')
			});

			wp_editimgbtn.onmousedown = function(e) {
				var ed = tinyMCE.activeEditor;
				ed.windowManager.bookmark = ed.selection.getBookmark('simple');
				ed.execCommand("WP_EditImage");
				this.parentNode.style.display = 'none';
			};

			var wp_delimgbtn = DOM.add('wp_editbtns', 'img', {
				src : t.url+'/img/delete.png',
				id : 'wp_delimgbtn',
				width : '24',
				height : '24',
				title : ed.getLang('wpeditimage.del_img')
			});

			wp_delimgbtn.onmousedown = function(e) {
				var ed = tinyMCE.activeEditor, el = ed.selection.getNode(), p;

				if ( el.nodeName == 'IMG' && ed.dom.getAttrib(el, 'class').indexOf('mceItem') == -1 ) {
					if ( (p = ed.dom.getParent(el, 'div')) && ed.dom.hasClass(p, 'mceTemp') )
						ed.dom.remove(p);
					else if ( (p = ed.dom.getParent(el, 'A')) && p.childNodes.length == 1 )
						ed.dom.remove(p);
					else ed.dom.remove(el);

					this.parentNode.style.display = 'none';
					ed.execCommand('mceRepaint');
					return false;
				}
			};
		},

		getInfo : function() {
			return {
				longname : 'Edit Image',
				author : 'WordPress',
				authorurl : 'http://wordpress.org',
				infourl : '',
				version : "1.0"
			};
		}
	});

	tinymce.PluginManager.add('wpeditimage', tinymce.plugins.wpEditImage);
})();

tinyMCE.init({mode:"none",onpageload:"wpEditorInit",width:"100%",theme:"advanced",skin:"wp_theme",theme_advanced_buttons1:"bold,italic,strikethrough,|,bullist,numlist,blockquote,|,justifyleft,justifycenter,justifyright,|,link,unlink,wp_more,|,spellchecker,fullscreen,wp_adv",theme_advanced_buttons2:"formatselect,underline,justifyfull,forecolor,|,pastetext,pasteword,removeformat,|,media,charmap,|,outdent,indent,|,undo,redo,wp_help",theme_advanced_buttons3:"",theme_advanced_buttons4:"",language:"en",spellchecker_languages:"+English=en,Danish=da,Dutch=nl,Finnish=fi,French=fr,German=de,Italian=it,Polish=pl,Portuguese=pt,Spanish=es,Swedish=sv",theme_advanced_toolbar_location:"top",theme_advanced_toolbar_align:"left",theme_advanced_statusbar_location:"bottom",theme_advanced_resizing:"1",theme_advanced_resize_horizontal:"",dialog_type:"modal",relative_urls:"",remove_script_host:"",convert_urls:"",apply_source_formatting:"",remove_linebreaks:"1",paste_convert_middot_lists:"1",paste_remove_spans:"1",paste_remove_styles:"1",gecko_spellcheck:"1",entities:"38,amp,60,lt,62,gt",accessibility_focus:"",tab_focus:":next",content_css:"http://www.worldolio.com/derek/wordpress/wp-includes/js/tinymce/wordpress.css",save_callback:"switchEditors.saveCallback",wpeditimage_disable_captions:"",plugins:"safari,inlinepopups,autosave,spellchecker,paste,wordpress,media,fullscreen,wpeditimage"});