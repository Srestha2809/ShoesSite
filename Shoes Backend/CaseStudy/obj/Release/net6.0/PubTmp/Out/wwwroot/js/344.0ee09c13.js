"use strict";(self["webpackChunkcasestudy"]=self["webpackChunkcasestudy"]||[]).push([[344],{5572:(t,e,a)=>{a.d(e,{C:()=>d,_:()=>l});const r="/api/",l=async t=>{let e,a=s();try{let l=await fetch(`${r}${t}`,{method:"GET",headers:a});e=await l.json()}catch(l){console.log(l),e={error:`Error has occured: ${l.message}`}}return e},s=()=>{const t=new Headers,e=JSON.parse(sessionStorage.getItem("customer"));return e?(t.append("Content-Type","application/json"),t.append("Authorization","Bearer "+e.token)):t.append("Content-Type","application/json"),t},d=async(t,e)=>{let a,l=s();try{let s=await fetch(`${r}${t}`,{method:"POST",headers:l,body:JSON.stringify(e)});a=await s.json()}catch(d){a=d}return a}},7081:(t,e,a)=>{a.d(e,{p:()=>l,x:()=>r});const r=t=>t.toLocaleString("en-US",{style:"currency",currency:"USD"}),l=t=>{let e;e=void 0===t?new Date:new Date(Date.parse(t));let a=e.getDate(),r=e.getMonth()+1,l=e.getFullYear(),s=(e.getHours(),e.getMinutes());return s<10&&(s="0"+s),l+"-"+r+"-"+a}},6344:(t,e,a)=>{a.r(e),a.d(e,{default:()=>E});var r=a(9835),l=a(6970);const s={class:"text-center"},d=["src"],o=(0,r._)("div",{class:"text-h5 q-mt-md"},"Order History",-1),c={class:"text-positive text-h6 q-mt-lg q-mb-lg"},n=(0,r.Uk)("#"),u=(0,r.Uk)("Date"),i=["src"],m=(0,r.Uk)("Name"),w=(0,r.Uk)("Quantities"),x=(0,r.Uk)("Extended"),f=(0,r.Uk)(" S O B "),g=(0,r.Uk)("Sub:"),p=(0,r.Uk)("Tax(13%): "),h=(0,r.Uk)("Total: ");function y(t,e,a,y,_,W){const k=(0,r.up)("q-item-label"),b=(0,r.up)("q-item-section"),S=(0,r.up)("q-item"),U=(0,r.up)("q-list"),q=(0,r.up)("q-card"),D=(0,r.up)("q-btn"),O=(0,r.up)("q-card-actions"),C=(0,r.up)("q-card-section"),z=(0,r.up)("q-dialog"),v=(0,r.Q2)("close-popup");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",s,[(0,r._)("img",{src:"cart.png",width:"100",height:"100"},null,8,d),o,(0,r._)("div",c,(0,l.zw)(y.state.status),1)]),(0,r.Wm)(q,{class:"q-ma-sm"},{default:(0,r.w5)((()=>[(0,r.Wm)(U,{highlight:""},{default:(0,r.w5)((()=>[(0,r.Wm)(S,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,null,{default:(0,r.w5)((()=>[(0,r.Wm)(k,null,{default:(0,r.w5)((()=>[n])),_:1})])),_:1}),(0,r.Wm)(b,null,{default:(0,r.w5)((()=>[(0,r.Wm)(k,null,{default:(0,r.w5)((()=>[u])),_:1})])),_:1})])),_:1}),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(y.state.orders,(t=>((0,r.wg)(),(0,r.j4)(S,{clickable:"",key:t.id,onClick:e=>y.selectOrder(t.id)},{default:(0,r.w5)((()=>[(0,r.Wm)(b,null,{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(t.id),1)])),_:2},1024),(0,r.Wm)(b,null,{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.formatDate(t.dateCreated)),1)])),_:2},1024)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1}),(0,r.Wm)(z,{modelValue:y.state.selectedAOrder,"onUpdate:modelValue":e[0]||(e[0]=t=>y.state.selectedAOrder=t),"transition-show":"rotate","transition-hide":"rotate"},{default:(0,r.w5)((()=>[(0,r.Wm)(q,null,{default:(0,r.w5)((()=>[(0,r.Wm)(O,{align:"right"},{default:(0,r.w5)((()=>[(0,r.wy)((0,r.Wm)(D,{flat:"",label:"X",color:"primary",class:"text-h5"},null,512),[[v]])])),_:1}),(0,r.Wm)(C,{class:"text-h5 text-center text-primary text-bold col-2"},{default:(0,r.w5)((()=>[(0,r.Uk)(" Order "+(0,l.zw)(y.state.orderDetails[0].orderId),1)])),_:1}),(0,r.Wm)(C,{class:"text-h7 text-center text-primary text-bold col-2"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.state.orderDetails[0].dateCreated),1)])),_:1}),(0,r.Wm)(C,{class:"text-center"},{default:(0,r.w5)((()=>[(0,r._)("img",{src:"cart.png",width:"100",height:"100"},null,8,i)])),_:1}),(0,r.Wm)(U,{highlight:""},{default:(0,r.w5)((()=>[(0,r.Wm)(S,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{class:"text-h7 text-center text-primary text-bold"},{default:(0,r.w5)((()=>[(0,r.Wm)(k,null,{default:(0,r.w5)((()=>[m])),_:1})])),_:1}),(0,r.Wm)(b,{class:"text-h7 text-center text-primary text-bold",style:{"margin-left":"40px"}},{default:(0,r.w5)((()=>[(0,r.Wm)(k,null,{default:(0,r.w5)((()=>[w])),_:1})])),_:1}),(0,r.Wm)(b,{class:"text-h7 text-center text-primary text-bold",style:{"margin-left":"50px"}},{default:(0,r.w5)((()=>[(0,r.Wm)(k,null,{default:(0,r.w5)((()=>[x])),_:1})])),_:1})])),_:1}),(0,r.Wm)(U,{separator:""},{default:(0,r.w5)((()=>[(0,r.Wm)(S,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{class:"text-primary text-center text-bold",style:{"word-spacing":"20px"}},{default:(0,r.w5)((()=>[f])),_:1})])),_:1}),((0,r.wg)(!0),(0,r.iD)(r.HY,null,(0,r.Ko)(y.state.orderDetails,(t=>((0,r.wg)(),(0,r.j4)(S,{key:t.orderId},{default:(0,r.w5)((()=>[(0,r.Wm)(b,{class:"text-left",style:{"font-size":"10px"}},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(t.productName),1)])),_:2},1024),(0,r.Wm)(b,{class:"text-center col-5",style:{"word-spacing":"20px"}},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(t.qtySold)+" "+(0,l.zw)(t.qtyOrdered)+" "+(0,l.zw)(t.qtyBackOrdered),1)])),_:2},1024),(0,r.Wm)(b,{class:"text-right"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.formatCurrency(t.sellingPrice)),1)])),_:2},1024)])),_:2},1024)))),128)),(0,r.Wm)(S,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{class:"text-h7 text-right text-bold"}),(0,r.Wm)(b,{class:"text-h7 text-right text-bold"},{default:(0,r.w5)((()=>[g])),_:1}),(0,r.Wm)(b,{class:"text-right"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.formatCurrency(y.state.sub)),1)])),_:1})])),_:1}),(0,r.Wm)(S,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{class:"text-h7 text-right text-bold"}),(0,r.Wm)(b,{class:"text-h7 text-left text-bold",style:{"margin-right":"-50px"}},{default:(0,r.w5)((()=>[p])),_:1}),(0,r.Wm)(b,{class:"text-right"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.formatCurrency(y.state.tax)),1)])),_:1})])),_:1}),(0,r.Wm)(S,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{class:"text-h7 text-right text-bold"}),(0,r.Wm)(b,{class:"text-h7 text-right text-bold text-primary"},{default:(0,r.w5)((()=>[h])),_:1}),(0,r.Wm)(b,{class:"text-right text-bold text-primary"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.formatCurrency(y.state.sub+y.state.tax)),1)])),_:1})])),_:1}),(0,r.Wm)(b,{class:"text-center text-primary"},{default:(0,r.w5)((()=>[(0,r.Uk)((0,l.zw)(y.state.dialogStatus)+" "+(0,l.zw)(y.state.orderDetails[0].orderId),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"])],64)}var _=a(499),W=a(5572),k=a(7081);const b={setup(){let t=(0,_.qj)({status:"",orders:[],dialogStatus:"",selectedAOrder:!1,orderDetails:[],orderSelected:{id:0,orderAmount:0,orderLineItems:[{id:0,qtySold:0,qtyOnBackOrdered:0,qtyOrdered:0,productId:"",SellingPrice:0}]},sub:0,tax:0});(0,r.bv)((()=>{e()}));const e=async()=>{try{let e=JSON.parse(sessionStorage.getItem("customer"));const a=await(0,W._)(`order/${e.email}`);void 0===a.error?(t.orders=a,t.status=`loaded ${t.orders.length} orders`):t.status=a.error}catch(e){console.log(e),t.status=`Error has occured: ${e.message}`}},a=async e=>{try{let a=JSON.parse(sessionStorage.getItem("customer"));const r=await(0,W._)(`order/${e}/${a.email}`);t.orderDetails=r,t.dialogStatus="details for order ",t.selectedAOrder=!0,t.orderSelected=t.orders.find((t=>t.id===e)),t.orderDetails.forEach((e=>{0==e.qtySold?t.sub:t.sub+=e.sellingPrice,t.tax+=.13*e.sellingPrice}))}catch(a){console.log(a),t.status=`Error has occured: ${a.message}`}};return{state:t,formatDate:k.p,selectOrder:a,formatCurrency:k.x}}};var S=a(1639),U=a(4458),q=a(3246),D=a(490),O=a(1233),C=a(3115),z=a(7743),v=a(1821),I=a(4455),Q=a(3190),Z=a(2146),$=a(9984),j=a.n($);const A=(0,S.Z)(b,[["render",y]]),E=A;j()(b,"components",{QCard:U.Z,QList:q.Z,QItem:D.Z,QItemSection:O.Z,QItemLabel:C.Z,QDialog:z.Z,QCardActions:v.Z,QBtn:I.Z,QCardSection:Q.Z}),j()(b,"directives",{ClosePopup:Z.Z})}}]);