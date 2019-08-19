(window.webpackJsonpclient=window.webpackJsonpclient||[]).push([[0],{16:function(e,t,n){e.exports=n(27)},21:function(e,t,n){},22:function(e,t,n){},27:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(6),i=n.n(r),c=(n(21),n(7)),l=n(8),s=n(15),u=n(9),m=n(10),p=(n(22),n(3)),h=n(13);function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,a)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(n,!0).forEach(function(t){Object(p.a)(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}var g={p:{position:"absolute",left:0,right:0,zIndex:1,fontWeight:300,textAlign:"center",letterSpacing:".2rem",lineHeight:1.3},pTitle:{top:"1rem"},pIntro:{top:"60%",padding:"0 30%"},aIntro:{color:"#5086EC"},span:{display:"inline-block",fontWeight:500,fontSize:"3.6rem",paddingTop:".4rem"}};function b(e){var t=e.rotation;return o.a.createElement("mesh",{visible:!0,userData:{test:"hello"},position:[0,0,0],rotation:t},o.a.createElement("boxGeometry",{attach:"geometry",args:[2,2,2]}),o.a.createElement("meshStandardMaterial",{attach:"material",color:"indianred",transparent:!0}))}function v(e){var t=e.position;return o.a.createElement("mesh",{position:t,receiveShadow:!0},o.a.createElement("planeBufferGeometry",{attach:"geometry",args:[1e3,1e3]}),o.a.createElement("meshPhongMaterial",{attach:"material",color:"#272727"}))}var y=function(e){var t=e.connectionID,n=e.orientation,a=n.alpha,r=[n.beta,n.gamma,a];return o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{style:f({},g.p,{},g.pTitle)},"your code",o.a.createElement("br",null),o.a.createElement("span",{style:g.span},t)),o.a.createElement("p",{style:f({},g.p,{},g.pIntro)},"go to site on mobile  ",o.a.createElement("a",{style:g.aIntro,href:window.location.href},window.location.href)," info piece here"),o.a.createElement(h.a,{camera:{position:[0,0,15]}},o.a.createElement("ambientLight",{intensity:.8}),o.a.createElement("spotLight",{intensity:.9,position:[30,30,50],angle:.4,penumbra:1,castShadow:!0}),o.a.createElement(v,{position:[0,0,-20]}),o.a.createElement(b,{rotation:r})))},w=n(14),E={p:{fontWeight:300,fontSize:"1.2rem",letterSpacing:".2rem",lineHeight:1.3},input:{border:"none",borderBottom:"2px solid rgba(255, 255, 255, .6)",fontSize:"3.2rem",color:"#fff",backgroundColor:"transparent",width:"100%",maxWidth:"24rem"},button:{display:"block",letterSpacing:".2rem",color:"#fff",backgroundColor:"transparent",width:"100%",maxWidth:"24rem",marginTop:"1.2rem",padding:".8rem",border:"2px solid #fff"},pre:{fontSize:"3.6rem",textAlign:"center"}},O=function(e){var t=e.connectionID,n=e.onSubmit,r=Object(a.useState)(null),i=Object(w.a)(r,2),c=i[0],l=i[1],s=function(e){n(c),e.preventDefault()};return t?o.a.createElement("div",null,o.a.createElement("p",{style:E.p},"Yay, you are connected to ",o.a.createElement("pre",{style:E.pre},t)),o.a.createElement("p",{style:E.p},"Have fun rotating a box \ud83e\udd37\ud83c\udffb\u200d\u2642\ufe0f")):o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{style:E.p},"Enter the code to control the cube"),o.a.createElement("form",{onSubmit:s},o.a.createElement("input",{style:E.input,type:"number",placeholder:"e.g. 61511",value:c,onChange:function(e){var t=e.target.value;t<=99999&&l(t)}}),o.a.createElement("button",{style:E.button,onClick:s},"CONNECT")))};O.defaultProps={};var S=O;function k(e,t){var n={type:e,data:t};return JSON.stringify(n)}var D=function(e){function t(){var e,n;Object(c.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).state={isMobile:/Mobi/i.test(navigator.userAgent)||/Android/i.test(navigator.userAgent),orientation:{alpha:null,beta:null,gamma:null},wsClient:null,connectionID:null},n.handleSockets=function(e){var t=function(e){return JSON.parse(e)}(e.data);switch(t.type){case"register-client":case"result-client-check":n.setState({connectionID:t.data});break;case"receive-orientation":n.setState({orientation:t.data.orientation})}},n.handleDeviceOrientation=function(e){var t=n.state,a=t.wsClient,o=t.connectionID,r=e.alpha,i=e.beta,c=e.gamma;if(o&&a.readyState===WebSocket.OPEN){var l=k("send-orientation",{client:o,orientation:{alpha:(r+180)/20,beta:i/20,gamma:-c/20}});a.send(l)}},n.handleSubmitCode=function(e){var t=n.state.wsClient;if(e>=1e4&&e<=99999){var a=k("check-client",e);t.send(a)}},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.state.isMobile,t=function(e){var t=e.url,n=(e.config,e.callback),a=new WebSocket(t);return a.onopen=function(){var e=k("on-connect","connected");a.send(e),console.log("WebSocket Client Connected")},a.onerror=function(e){console.log("WebSocket error: ".concat(e),e)},a.onmessage=function(e){return n(e)},a}({url:"wss://gyro-thing-server-imwbhkzgzj.now.sh",callback:this.handleSockets});window.DeviceOrientationEvent&&e&&window.addEventListener("deviceorientation",this.handleDeviceOrientation,!1),this.setState({wsClient:t})}},{key:"componentWillUnmount",value:function(){window.removeEventListener("deviceorientation",this.handleDeviceOrientation)}},{key:"render",value:function(){var e=this.state,t=e.connectionID,n=e.orientation,a=e.isMobile;return o.a.createElement("div",{className:"main"},a?o.a.createElement(S,{onSubmit:this.handleSubmitCode,connectionID:t}):o.a.createElement(y,{orientation:n,connectionID:t}),o.a.createElement("footer",null,"Made on a \ud83d\udecb by ",o.a.createElement("a",{href:"https://github.com/kyunwang"},"kyunwang"),". Repo ",o.a.createElement("a",{href:"https://github.com/kyunwang/gyro-thing"},"here")))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(D,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[16,1,2]]]);
//# sourceMappingURL=main.e76a2f13.chunk.js.map