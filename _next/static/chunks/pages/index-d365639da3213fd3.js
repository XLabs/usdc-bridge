(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{48312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(88536)}])},88536:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return e_}});var n=a(85893),s=a(22759),i=a.n(s),r=a(65644),o=a.n(r),c=a(67294),l=a(40036),d=a(83454);let h={[l.ZN]:"0x07865c6E87B9F70255377e024ace6630C1Eaa37F",[l.$7]:"0x5425890298aed601595a70AB815c96711a31Bc65",[l.xA]:"0xfd064A18f3BF249cf1f87FC203E90D8f650f2d63"},u=(l.ZN,l.$7,l.xA,"https://goerli.etherscan.io/tx/"),p="https://testnet.snowtrace.io/tx/",g="https://goerli.arbiscan.io/tx/",x=e=>window.location.href.includes("localhost")?"https://nextjs-cors-anywhere.vercel.app/api?endpoint=https://relayer.dev.stable.io/v1/relays?test=hola".concat(e,"&txHash="):"https://relayer.dev.stable.io/v1/relays?txHash=",m={5:"https://rpc.ankr.com/eth_goerli",43113:"https://api.avax-test.network/ext/bc/C/rpc",421613:"https://goerli-rollup.arbitrum.io/rpc",1:"CONFIG ERROR",43114:"CONFIG ERROR",42161:"CONFIG ERROR"},_=e=>e===l.ZN?5:e===l.$7?43113:e===l.xA?421613:void 0;d.env.NEXT_APP_PUBLIC_URL;let f={[l.ZN]:"0x26413e8157CD32011E726065a5462e97dD4d03D9",[l.$7]:"0xa9fB1b3009DCb79E2fe346c16a604B8Fa8aE0a79",[l.xA]:"0x109bc137cb64eab7c0b1dddd1edf341467dc2d35"},v={[l.ZN]:"0x17da1ff5386d044c63f00747b5b8ad1e3806448d",[l.$7]:"0x774a70bbd03327c21460b60f25b677d9e46ab458",[l.xA]:"0xbf683d541e11320418ca78ec13309938e6c5922f"};l.ZN,l.$7,l.xA;var j=a(78181),b=a.n(j);let w=e=>{let{size:t}=e;return(0,n.jsx)("svg",{width:"".concat(t),height:"".concat(t),viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,n.jsx)("path",{d:"M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})};var C=a(25675),N=a.n(C);let A=e=>"ETH"===e?"".concat("/usdc-bridge","/ethereum.svg"):"AVAX"===e?"".concat("/usdc-bridge","/avalanche.svg"):"ARBITRUM"===e?"".concat("/usdc-bridge","/arbitrum.svg"):"",T=e=>"ETH"===e?"Ethereum":"AVAX"===e?"Avalanche":"ARBITRUM"===e?"Arbitrum":"",y=e=>{let{selected:t,changeChain:a}=e,s="AVAX"===t?["ETH","ARBITRUM"]:"ETH"===t?["AVAX","ARBITRUM"]:["AVAX","ETH"],i="AVAX"===t?["".concat("/usdc-bridge","/ethereum.svg"),"".concat("/usdc-bridge","/arbitrum.svg")]:"ETH"===t?["".concat("/usdc-bridge","/avalanche.svg"),"".concat("/usdc-bridge","/arbitrum.svg")]:["".concat("/usdc-bridge","/avalanche.svg"),"".concat("/usdc-bridge","/ethereum.svg")],[r,o]=(0,c.useState)(0),[l,d]=(0,c.useState)(A(t)),[h,u]=(0,c.useState)(T(t)),p=(0,c.useRef)(null),g=(0,c.useRef)(null);(0,c.useEffect)(()=>{o(0),setTimeout(()=>{d(A(t)),u(T(t)),o(1)},200)},[t]);let[x,m]=(0,c.useState)(!1),_=()=>{x?setTimeout(()=>{m(!1)},200):(m(!0),setTimeout(()=>{var e;null===(e=p.current)||void 0===e||e.focus()},200))};return(0,n.jsxs)("div",{className:b().chainContainer,children:[(0,n.jsxs)("div",{className:b().chainSelect,style:{opacity:r},onClick:_,children:[(0,n.jsx)(N(),{src:l,width:24,height:24,alt:"".concat(h," icon"),className:b().chainImg}),(0,n.jsx)("span",{children:h}),(0,n.jsx)(w,{size:24})]}),x&&(0,n.jsx)(n.Fragment,{children:("AVAX"===t?["Ethereum","Arbitrum"]:"ETH"===t?["Avalanche","Arbitrum"]:["Avalanche","Ethereum"]).map((e,t)=>(0,n.jsxs)("div",{className:b().chainOption,style:{top:"calc(".concat(t+1," * (5vh + 2px))")},tabIndex:1,ref:0===t?p:g,onBlur:_,onClick:()=>{_(),a(s[t])},children:[(0,n.jsx)(N(),{alt:"".concat(e," icon"),src:i[t],width:24,height:24,className:b().chainImg}),(0,n.jsx)("span",{children:e})]},e))})]})};var S=a(38063),E=a.n(S);let k=e=>{let{onClick:t,source:a}=e;return(0,n.jsx)("div",{className:E().exchange,onClick:t,style:{transform:"rotate(".concat("AVAX"===a?0:360,"deg)")},children:(0,n.jsx)(N(),{alt:"Exchange source and destination chains",src:"".concat("/usdc-bridge","/fromTo.png"),width:30,height:30})})};var L=a(69077),R=a(31407),D=a(16476),I=a(24697),B=a(52828),P=a.n(B),U=a(86828),H=a.n(U);let F=e=>{let{value:t,setValue:a,maxDecimals:s}=e,i=e=>{if(/^\d+(\.\d*)?$/.exec(e.target.value)){let t=e.target.value,[n,i]=t.split(".");Number(n)>99999999&&(t=n.slice(0,"".concat(99999999).length)),i&&i.length>s&&(t="".concat(n,".").concat(i.slice(0,s))),a(t)}else""===e.target.value&&a("0")},r=(0,c.useRef)(null),[o,l]=(0,c.useState)(!1);return(0,n.jsxs)("div",{className:H().usdcInputContainer,style:{border:o?"1px solid rgba(var(--foreground-rgb), 1)":"1px solid rgba(var(--foreground-rgb), 0.35)"},children:[(0,n.jsx)("input",{className:P().className,value:t,onChange:i,ref:r,onFocus:()=>l(!0),onBlur:()=>l(!1),onClick:()=>{var e;return"0"===t&&(null===(e=r.current)||void 0===e?void 0:e.select())}}),(0,n.jsxs)("div",{className:H().usdcText,children:[(0,n.jsx)(N(),{alt:"USDC icon",width:26,height:26,src:"".concat("/usdc-bridge","/usdc.png")}),(0,n.jsx)("span",{children:"USDC"})]})]})};var X=a(81082),W=a.n(X);let O=e=>{let{text:t,children:a}=e,[s,i]=(0,c.useState)(!1),[r,o]=(0,c.useState)(0),l=()=>{i(!0),setTimeout(()=>{o(1)},50)},d=()=>{o(0),setTimeout(()=>{i(!1)},350)};return(0,n.jsxs)("div",{className:W().tooltipWrapper,children:[(0,n.jsx)("div",{style:{opacity:r,display:s?"block":"none"},className:W().tooltip,children:t}),(0,n.jsx)("div",{onMouseEnter:l,onMouseLeave:d,children:a})]})};var V=a(95116),G=a.n(V),M=a(21842),Y=a(60634),q=a.n(Y);let Z=e=>{let{size:t="l"}=e;return(0,n.jsx)("div",{className:q().spinnerLoaderContainer,style:{transform:"scale(".concat("m"===t?.75:1,") translateY(-").concat("m"===t?6:0,"px)")},children:(0,n.jsx)("span",{className:q().spinnerLoader})})},$=e=>{let{gas:t,onChange:a,maxDestinationGas:s,estimatedGas:i,destination:r,sliderPercentage:o}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("div",{className:G().gasContainer,children:[(0,n.jsxs)("div",{className:G().gasTitle,children:[(0,n.jsx)("span",{children:"Add destination gas"}),(0,n.jsx)(O,{text:"Convert some USDC to ETH or AVAX and use it as gas to pay for transaction fees on the destination network.",children:(0,n.jsx)("span",{className:G().question,children:"?"})})]}),s?(0,n.jsx)(M.Z,{className:G().gasSlider,thumbClassName:G().gasSelector,onChange:e=>a(e),value:o}):(0,n.jsx)("div",{className:G().sliderLoading,children:(0,n.jsx)(Z,{})})]}),(0,n.jsxs)("div",{className:G().gasDetails,style:{opacity:t?1:0},children:[(0,n.jsxs)("div",{className:G().gasAmount,children:[(0,n.jsx)("span",{className:G().gasCoin,children:"USDC"}),(0,n.jsx)("span",{children:t})]}),(0,n.jsxs)("div",{className:G().gasAmount,children:[(0,n.jsx)("span",{className:G().gasCoin,children:r}),(0,n.jsx)("span",{children:i?"≈ ".concat(i):"..."})]})]})]})};var Q=a(86459),z=a.n(Q);let K=e=>{let{amount:t,estimatedGas:a,destination:s,destinationGas:i,transactionFee:r}=e,o=(+t-+i).toFixed(5);return(0,n.jsxs)("div",{className:z().transactionDetail,children:[(0,n.jsxs)("div",{className:z().infoLine,children:[(0,n.jsx)("span",{children:"You receive"}),(0,n.jsx)("span",{children:"".concat(o," USDC")})]}),(0,n.jsxs)("div",{className:z().infoLine,children:[(0,n.jsx)("span",{children:"Est. Destination Gas"}),(0,n.jsx)("span",{children:a?"≈".concat(a," ").concat(s):"..."})]}),(0,n.jsxs)("div",{className:z().infoLine,children:[(0,n.jsx)("span",{children:"Relay Cost"}),(0,n.jsxs)("span",{children:[""===r?"0.00":"≈"+r," USDC"]})]})]})};var J=a(93901),ee=a(64146),et=a(56371),ea=a(49077),en=a(22920);let es=(e,t)=>{en.Am.error(e,{hideProgressBar:!0,pauseOnHover:!0,draggable:!1,autoClose:t||6e3,theme:"colored"})},ei=(e,t)=>{en.Am.success(e,{hideProgressBar:!0,pauseOnHover:!0,draggable:!1,autoClose:t||6e3,theme:"colored"})},er=(e,t)=>{en.Am.info(e,{hideProgressBar:!0,pauseOnHover:!0,draggable:!1,autoClose:t||6e3,theme:"colored"})};var eo=a(9669),ec=a.n(eo),el=a(8198),ed=a(38197);let eh=(e,t)=>{for(let a of e)if(a.address.toLowerCase()===t.toLowerCase()){let e=new el.vU(["event MessageSent(bytes message)"]);return e.parseLog(a).args.message}return null};async function eu(e){return new Promise(t=>setTimeout(t,e))}async function ep(e){for(;;){let t=await ec().get("".concat("https://iris-api-sandbox.circle.com/attestations/").concat(e)).catch(e=>null).then(async e=>null!==e&&200===e.status&&"complete"===e.data.status?e.data.attestation:null);if(null!==t)return t;await eu(3500)}}let eg=async(e,t)=>{let a=eh(e,t);if(null===a)return[null,null];let n=ed.keccak256(a),s=await ep(n);return[a,s]},ex=[R.cn,R.ws,R.Jn],em=e=>"AVAX"===e?l.$7:"ARBITRUM"===e?l.xA:l.ZN;function e_(){let[e,t]=(0,c.useState)("AVAX"),[a,s]=(0,c.useState)("ETH"),r=em(e),l=em(a),[d,j]=(0,c.useState)(!1),{address:b,isConnected:w}=(0,L.mA)(),{data:C}=(0,L.mx)(),{connect:A}=(0,L.$4)({onError:e=>{console.error(e),es((0,n.jsxs)("div",{children:[(0,n.jsx)("p",{children:"Error: Wallet not found"}),(0,n.jsx)("p",{children:"(Do you have a wallet installed?)"}),(0,n.jsx)("p",{children:"(Did you approve the connection?)"})]}))},onSuccess:e=>{console.log("data puta"),console.log({data:e,address:b,isConnected:w})},connector:new D._({chains:ex})}),[T,S]=(0,c.useState)(!1),{switchNetwork:E}=(0,L.g0)({onSuccess:()=>{console.log("success switchinggg"),S(!1)},onError:()=>{P(!0),es((0,n.jsxs)("div",{children:[(0,n.jsx)("p",{children:"Error changing network."}),(0,n.jsx)("p",{children:"(Did you reject the network change?)"}),(0,n.jsx)("p",{children:"(Do you have any pending action on your wallet?)"})]}),1e4)}}),{data:R,refetch:B}=(0,L.KQ)({chainId:_(r),address:b,token:h[r]}),P=function(){let n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];w&&S(!0),console.log({source:e,destination:a,newSource:a,destinationChainId:l,evmChain:_(l)}),s(e),t(a),n?S(!1):(console.log("about to switch"),null==E||E(_(l)))},U=n=>{w&&S(!0),n===a&&s(e),t(n),null==E||E(_(em(n)))},H=n=>{n===e&&t(a),s(n)};(0,c.useEffect)(()=>{ef("0"),e_(0)},[e]);let X=()=>{w?ek?+eL>+en-+Q?er("The fee of this transaction is higher than the amount you are trying to receive.",8e3):eI():eE(en):(console.log("about to connect...",{sourceChainId:r,evmChainId:_(r)}),A({chainId:_(r)}))},[W,V]=(0,c.useState)("..."),[G,M]=(0,c.useState)("..."),[Y,q]=(0,c.useState)("0");(0,c.useEffect)(()=>{Y&&+Y<+en&&ef(Y)},[Y]);let[Q,z]=(0,c.useState)(0),[en,eo]=(0,c.useState)("0"),[el,ed]=(0,c.useState)(BigInt(0)),[eh]=(0,I.Nr)(el,500),[eu,ep]=(0,c.useState)(0),e_=e=>{if(ep(e),eC){let t=Number((0,et.formatUnits)(eC,6)),a=(t*e/100).toFixed(6);z(+a),ed((0,et.parseUnits)(a,6).toBigInt())}},ef=e=>{let t=e;if(Y&&+t>+Y){er("You cannot send more than your balance",3e3);return}for(;t.startsWith("00");)t=t.substring(1);t.length>1&&t.startsWith("0")&&!t.startsWith("0.")&&(t=t.substring(1)),Q>+t&&e_(0),eo(t)},ev=v[r],ej=v[l],eb=h[r],ew=h[l],[eC,eN]=(0,c.useState)(null),[eA,eT]=(0,c.useState)(null),{isFetchingAllowance:ey,isProcessingApproval:eS,approveAmount:eE,sufficientAllowance:ek,transactionFee:eL}=function(e,t,a,n,s,i,r){let[o,l]=(0,c.useState)(null),[d,h]=(0,c.useState)(""),[u,p]=(0,c.useState)(!1),[g,x]=(0,c.useState)(!1),m=o&&s&&+o>=+s;(0,c.useEffect)(()=>{let t=!1;if(n&&e&&i&&!g&&!r){p(!0);let s=new ee.CH(i,[{inputs:[{internalType:"uint16",name:"chainId_",type:"uint16"},{internalType:"address",name:"token",type:"address"}],name:"relayerFee",outputs:[{internalType:"uint256",name:"",type:"uint256"}],stateMutability:"view",type:"function"}],e);(async()=>{console.log("por ejecutar lo que falla",{destinationChainId:a,tokenAddress:n,switchingNetwork:r});let e=await s.relayerFee(a,n);if(!t){let t=(0,et.formatUnits)(e,6);h(e.isZero()?"":t)}})(),(0,ea.Nq)(i,n,e).then(e=>{t||(p(!1),console.log("allowance",(0,et.formatUnits)(e,6)),l((0,et.formatUnits)(e,6)))},e=>{t||p(!1)})}return()=>{t=!0}},[a,t,n,g,i,e,r]);let _=(0,c.useMemo)(()=>t=>{x(!0),er("Asking for approval...");let a=(0,et.parseUnits)(t,6),s=!1;setTimeout(()=>{s||er("Approving spending limit...")},14e3),(0,ea.YC)(i,n,e,a,{}).then(e=>{ei("You approved a spending limit successfully!")},e=>{console.error(e),es("Error: Something went wrong. (Did you reject the spending limit?)")}).catch(e=>{console.error(e),es("Something went wrong approving the transaction. Check the console for more info")}).finally(()=>{s=!0,x(!1)})},[i,e,n]);return(0,c.useMemo)(()=>({approveAmount:_,isFetchingAllowance:u,isProcessingApproval:g,sufficientAllowance:m,transactionFee:d}),[_,u,g,m,d])}(C,r,l,eb,en,ev,T);(0,c.useEffect)(()=>{(null==R?void 0:R.formatted)?q(R.formatted):q(""),w?(M("".concat(null==b?void 0:b.slice(0,6),"...").concat(null==b?void 0:b.slice(-6))),V(ek?"Transfer":"Approve")):(M("Connect Wallet"),V("Connect Wallet"))},[b,w,R,ek]),(0,c.useEffect)(()=>{if(eN(null),!ej||!ew)return;let e=_(l);if(!e)return;let t=m[e];if(!t)return;let a=new J.c(t),n=!1;return(async()=>{let e=new ee.CH(ej,["function calculateMaxSwapAmountIn(\n              address token\n          ) external view returns (uint256)"],a),t=await e.calculateMaxSwapAmountIn(ew);n||eN(t.toBigInt())})(),()=>{n=!0}},[ej,ew,l]),(0,c.useEffect)(()=>{if(eT(null),!ej||!ew)return;let e=_(l);if(!e)return;let t=m[e];if(!t)return;let a=new J.c(t),n=!1;return(async()=>{let e=new ee.CH(ej,["function calculateNativeSwapAmountOut(\n            address token,\n            uint256 toNativeAmount\n        ) external view returns (uint256)"],a),t=await e.calculateNativeSwapAmountOut(ew,eh);n||eT(t.toBigInt())})(),()=>{n=!0}},[ej,ew,l,eh]);let[eR,eD]=(0,c.useState)(!1),eI=(0,c.useCallback)(async()=>{if(!C)return;let t=await C.getAddress();if(!t||!eb)return;let s=f[r];if(!s)return;let i=(0,et.parseUnits)(en,6);if(!i||!ev)return;let o=new ee.CH(ev,["function transferTokensWithRelay(\n            address token,\n            uint256 amount,\n            uint256 toNativeTokenAmount,\n            uint16 targetChain,\n            bytes32 targetRecipientWallet\n          ) external payable returns (uint64 messageSequence)"],C);er("Starting transaction...",2e3),eD(!0);try{let r=await o.transferTokensWithRelay(eb,i,el,l,(0,et.hexZeroPad)(t,32));er("(1/4) Transaction hash: ".concat(r.hash),5e3),console.log("tx hash:",r.hash);let c=!0,d=()=>{c&&(er("Waiting for the contract to finish processing",3e3),h=setTimeout(d,15e3))},h=setTimeout(d,15e3),m=await r.wait();if(c=!1,clearTimeout(h),!m)throw Error("Invalid receipt");er((0,n.jsxs)("a",{target:"_blank",href:"AVAX"===e?"".concat(p).concat(r.hash):"ETH"===e?"".concat(u).concat(r.hash):"".concat(g).concat(r.hash),children:[(0,n.jsx)("p",{children:"(2/4) Source transaction confirmed"}),(0,n.jsx)("p",{children:"Click here to see it on the Explorer"})]}),12e3),c=!0;let _=()=>{c&&(er("Still processing: Waiting for enough block confirmations",4e3),f=setTimeout(_,22500))},f=setTimeout(_,22500),[v,j]=await eg(m.logs,s);if(c=!1,clearTimeout(f),er("(3/4) Circle attestation done",4e3),null===v||null===j)throw Error("Error parsing receipt for ".concat(r.hash));console.log({circleBridgeMessage:v,circleAttestation:j,receipt:m,tx:r});let b=0,w=!1,C=async()=>{var e,t,a,n;console.log("vaa info?",w),w||(w=await ec().get("".concat("https://api.testnet.wormscan.io/api/v1/vaas?txHash=").concat(r.hash)).then(e=>e).catch(e=>!1));let s="FINALITY";return(null===(e=null===(t=w.data)||void 0===t?void 0:t.data[0])||void 0===e?void 0:e.vaa)?(console.log("VAA:",null===(a=null==w?void 0:null===(n=w.data)||void 0===n?void 0:n.data[0])||void 0===a?void 0:a.vaa),s=await ec().get("".concat(x(b)).concat(r.hash)).then(e=>e).catch(e=>(console.log("Error getting relayer info for",r.hash),console.error(e),b>2)?"RELAYER_ERROR":"RELAYER_WAIT")):w=!1,console.log("RESPPPPPPP",s),s},N=async()=>{var e,t;let s=await C();if(console.log("response",s),(null===(e=s.data)||void 0===e?void 0:null===(t=e.data)||void 0===t?void 0:t.status)==="redeemed"){let e=s.data.data.to.txHash;eD(!1),ei((0,n.jsxs)("a",{target:"_blank",href:"AVAX"===a?"".concat(p).concat(e):"ETH"===a?"".concat(u).concat(e):"".concat(g).concat(e),children:[(0,n.jsx)("p",{children:"(4/4) Your transfer was sent successfully!"}),(0,n.jsx)("p",{children:"Click here to see the transaction on your destination"})]}),2e4),eU()}else"FINALITY"===s?(er("Waiting for transaction finality...",4e3),setTimeout(()=>{N()},2e4)):"RELAYER_ERROR"===s?(er("We were not able to get the transaction relay status. It should arrive shortly!"),eD(!1),eU()):(b++,er("Waiting for the relay to happen...",4e3),setTimeout(()=>{N()},12e3))};N()}catch(e){console.error(e),eD(!1),es("Error: Something went wrong. Check the console for more info")}finally{await B()}},[e,a,B,en,C,eb,r,l,ev,el]),eB=eA?Number((0,et.formatUnits)(eA,18)).toFixed(6):"",eP=eS||eR||ey,eU=()=>{z(0),eo("0"),ed(BigInt(0)),ep(0),eT(null)};return(0,c.useEffect)(()=>{eS||eR||ey||T?j(!0):j(!1)},[T,eS,eR,ey]),(0,n.jsxs)("main",{className:"".concat(o().main," ").concat(i().className),children:[(0,n.jsxs)("header",{className:o().header,children:[(0,n.jsx)("div",{className:o().gradBg}),(0,n.jsx)("div",{className:o().logo,children:(0,n.jsx)(N(),{alt:"Portal",width:155,height:68,src:"".concat("/usdc-bridge","/portal.svg")})}),(0,n.jsxs)("div",{className:o().headerInteractions,children:[(0,n.jsx)("div",{className:o().headerLink,children:(0,n.jsx)("a",{href:"https://www.portalbridge.com/#/transfer",children:"Token Bridge"})}),(0,n.jsx)("div",{className:o().headerLink,children:(0,n.jsx)("a",{href:"https://www.portalbridge.com/usdc-bridge",children:"USDC Bridge"})}),(0,n.jsx)("div",{className:o().headerLink,children:(0,n.jsx)("a",{href:"https://www.portalbridge.com/sui",children:"Sui Bridge"})}),(0,n.jsx)("div",{className:o().headerLink,children:(0,n.jsx)("a",{href:"https://docs.wormhole.com/wormhole/faqs",children:"FAQ"})}),(0,n.jsx)("div",{className:o().headerLink,children:(0,n.jsx)("a",{href:"https://wormhole.com/",children:"Wormhole"})})]})]}),(0,n.jsxs)("div",{className:o().center,children:[(0,n.jsx)("h2",{className:o().title,children:(0,n.jsx)("span",{children:"USDC Bridge"})}),(0,n.jsxs)("h3",{className:o().subtitle,children:[(0,n.jsx)("span",{children:"Bridge and send native USDC between Ethereum and Avalanche through the official "}),(0,n.jsx)(O,{text:"Cross-Chain Transfer Protocol (CCTP) is a permissionless on-chain utility that can burn native USDC on a source chain and mint native USDC of the same amount on a destination chain.",children:(0,n.jsx)("a",{target:"__blank",href:"https://developers.circle.com/stablecoin/docs",className:o().CCTP,children:"CCTP"})})]}),(0,n.jsxs)("div",{className:o().container,children:[d&&(0,n.jsx)("div",{className:o().blocked}),(0,n.jsxs)("div",{className:o().fromToContainer,children:[(0,n.jsxs)("div",{className:o().chain,children:[(0,n.jsx)("div",{className:o().boxText,children:"From"}),(0,n.jsx)(y,{selected:e,changeChain:e=>U(e)})]}),(0,n.jsx)(k,{onClick:()=>P(!1),source:e}),(0,n.jsxs)("div",{className:o().chain,children:[(0,n.jsx)("div",{className:o().boxText,children:"To"}),(0,n.jsx)(y,{selected:a,changeChain:e=>H(e)})]})]}),(0,n.jsx)("div",{className:o().boxText,children:"Amount"}),(0,n.jsx)(F,{value:en,setValue:ef,maxDecimals:6}),Y&&(0,n.jsxs)("div",{className:o().balance,children:[(0,n.jsxs)("span",{className:o().balanceTxt,children:["Balance ",Y]}),(0,n.jsx)("span",{onClick:()=>ef(Y),className:o().maxTxt,children:"MAX"})]}),(0,n.jsx)($,{gas:Q,onChange:e_,destination:a,maxDestinationGas:eC,estimatedGas:eB,sliderPercentage:eu}),(0,n.jsx)("div",{className:o().separator}),(0,n.jsx)(K,{amount:en,estimatedGas:eB,destinationGas:Q,destination:a,transactionFee:eL}),(0,n.jsxs)("button",{onClick:()=>!eP&&X(),className:"".concat(eP?"".concat(o().btnLoading," ").concat(eR?o().txLoading:""):""),children:[eP&&(0,n.jsx)(Z,{size:"m"}),!eP&&W]})]}),(0,n.jsxs)("div",{className:o().poweredBy,children:[(0,n.jsx)("span",{children:"Powered by "}),(0,n.jsx)("a",{href:"https://developers.circle.com/stablecoin/docs/cctp-faq",target:"_blank",children:(0,n.jsx)(N(),{alt:"Powered by Circle",src:"".concat("/usdc-bridge","/circle.png"),width:120,height:30})}),(0,n.jsx)("span",{children:" & "}),(0,n.jsx)("a",{href:"https://wormhole.com/",target:"_blank",children:(0,n.jsx)(N(),{alt:"Powered by Wormhole",src:"".concat("/usdc-bridge","/wormhole.png"),width:200,height:45})})]})]}),(0,n.jsxs)("footer",{children:[(0,n.jsx)("a",{className:o().tweet,href:"https://twitter.com/wormholecrypto",target:"_blank",children:(0,n.jsx)(N(),{alt:"Twitter logo",src:"".concat("/usdc-bridge","/twitter.png"),width:20,height:20})}),(0,n.jsx)("a",{className:o().tweet,href:"https://discord.gg/wormholecrypto",target:"_blank",children:(0,n.jsx)(N(),{alt:"Discord logo",src:"".concat("/usdc-bridge","/discord.svg"),width:20,height:20})}),(0,n.jsx)("a",{href:"mailto:hello@stable.io",target:"_blank",children:"Contact Us"})]}),(0,n.jsxs)("div",{className:o().gradients,children:[(0,n.jsx)("div",{className:o().gradientLeft}),(0,n.jsx)("div",{className:o().gradientLeft2}),(0,n.jsx)("div",{className:o().gradientRight}),(0,n.jsx)("div",{className:o().gradientRight2})]})]})}},38063:function(e){e.exports={exchange:"ExchangeChains_exchange__Eg1vQ"}},60634:function(e){e.exports={spinnerLoaderContainer:"Loader_spinnerLoaderContainer__TLkq0",spinnerLoader:"Loader_spinnerLoader__Vw3_6","spinner-rotation":"Loader_spinner-rotation___FoI_"}},81082:function(e){e.exports={tooltipWrapper:"Tooltip_tooltipWrapper__mo3Da",tooltip:"Tooltip_tooltip__4l7fD"}},86459:function(e){e.exports={transactionDetail:"TransactionDetail_transactionDetail__8labX",infoLine:"TransactionDetail_infoLine__E1BkQ"}},86828:function(e){e.exports={usdcInputContainer:"USDCInput_usdcInputContainer__uqhG7",usdcText:"USDCInput_usdcText__S0CRQ"}},78181:function(e){e.exports={chainContainer:"Chain_chainContainer__lJ9_H",chainImg:"Chain_chainImg__YjBMX",chainSelect:"Chain_chainSelect__s_SiG",chainOption:"Chain_chainOption__mYO8T"}},95116:function(e){e.exports={gasContainer:"DestinationGas_gasContainer__FPq_P",question:"DestinationGas_question____THp",gasSlider:"DestinationGas_gasSlider__PnS8i",gasSelector:"DestinationGas_gasSelector__LKSmR",sliderLoading:"DestinationGas_sliderLoading__G7bqS",gasDetails:"DestinationGas_gasDetails__bz0GB",gasAmount:"DestinationGas_gasAmount__12wiF",gasCoin:"DestinationGas_gasCoin__LRn25"}},65644:function(e){e.exports={header:"app_header__1bs_8",gradBg:"app_gradBg__5pwVR",logo:"app_logo__pMKsJ",headerInteractions:"app_headerInteractions__sb0op",headerLink:"app_headerLink__hA7av",main:"app_main__jA3Cj",center:"app_center__24t1i",title:"app_title__YqYlu",subtitle:"app_subtitle__A_18c",CCTP:"app_CCTP__H9iQv",container:"app_container__zfH6e",blocked:"app_blocked__IV3VC",fromToContainer:"app_fromToContainer__W3Jsr",chain:"app_chain__E2nug",balance:"app_balance__z68i1",balanceTxt:"app_balanceTxt__lbSVz",maxTxt:"app_maxTxt__cwNv5",separator:"app_separator__Tt0f7",btnLoading:"app_btnLoading__EX8fl",txLoading:"app_txLoading__t43Ng",loading:"app_loading__kQTTt",boxText:"app_boxText__OAWSf",poweredBy:"app_poweredBy__rAPu6",tweet:"app_tweet__cKgAu",gradients:"app_gradients__IXQER",gradientRight:"app_gradientRight__YhXVX",gradientLeft:"app_gradientLeft__84p9F",gradientLeft2:"app_gradientLeft2__OgZKB",gradientRight2:"app_gradientRight2__R_HqK"}},7420:function(){},95856:function(){},89214:function(){},85568:function(){},34845:function(){},52361:function(){},94616:function(){},33370:function(){},55024:function(){}},function(e){e.O(0,[160,882,766,709,774,888,179],function(){return e(e.s=48312)}),_N_E=e.O()}]);