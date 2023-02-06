import{a as c,b as u,e as t,d as U,r as E,c as R,y as B,o as I,u as e,f,A as M,w as i,v as _,S,h as m,n as r,z as g,O as $,N,R as F,p as A,m as O,k as Z,P as D,_ as P}from"./index-c2a8d492.js";import{R as j}from"./flash-types-970c7394.js";import{u as z,O as l}from"./book-store-9245494e.js";const L={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 512 512"},T=t("path",{fill:"currentColor",d:"M442 48h-90a22 22 0 0 0 0 44h36.89l-60.39 60.39c-68.19-52.86-167-48-229.54 14.57C31.12 234.81 31.12 345.19 99 413a174.21 174.21 0 0 0 246 0c62.57-62.58 67.43-161.35 14.57-229.54L420 123.11V160a22 22 0 0 0 44 0V70a22 22 0 0 0-22-22ZM313.92 381.92a130.13 130.13 0 0 1-183.84 0c-50.69-50.68-50.69-133.16 0-183.84s133.16-50.69 183.84 0 50.69 133.16 0 183.84Z"},null,-1),q=[T];function G(d,h){return c(),u("svg",L,q)}const H={render:G},J={xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 512 512"},K=t("path",{fill:"currentColor",d:"M430 190c0-95.94-78.06-174-174-174S82 94.06 82 190c0 88.49 66.4 161.77 152 172.61V394h-58v44h58v58h44v-58h58v-44h-58v-31.39c85.6-10.84 152-84.12 152-172.61Zm-304 0c0-71.68 58.32-130 130-130s130 58.32 130 130-58.32 130-130 130-130-58.32-130-130Z"},null,-1),Q=[K];function W(d,h){return c(),u("svg",J,Q)}const X={render:W},b=d=>(A("data-v-79f72bcc"),d=d(),O(),d),Y=["onSubmit"],ee={class:"content-wrapper"},te={key:0,class:"fetch-badge"},se={key:1,class:"fetch-badge"},oe={class:"mb-3"},ae=b(()=>t("label",{for:"author-name",class:"form-label"}," Name ",-1)),ne=["disabled"],le={class:"mb-3 btn-group"},de=["disabled"],ie={for:"author-sex-female",class:"btn btn-outline-primary d-flex align-items-center gap-1"},re=["disabled"],ce={for:"author-sex-male",class:"btn btn-outline-primary d-flex align-items-center gap-1"},ue={class:"mb-3"},me=b(()=>t("label",{for:"author-birth",class:"form-label"}," Birthday ",-1)),he=["disabled"],_e={class:"mb-3"},be=b(()=>t("label",{for:"author-country",class:"form-label"}," Country ",-1)),pe=["disabled"],ve={class:"mt-4 mb-3 d-flex justify-content-between gap-2"},fe=["onClick","disabled"],Se=["disabled"],ge=U({__name:"AuthorForm",props:{modelValue:null},emits:["undefined"],setup(d,{emit:h}){const p=d,x=Z(),s=E({}),{fetchBooks:y,getFetchStatus:C}=z(),a=R(C),v=()=>{s.value={},Object.assign(s.value,p.modelValue),s.value.id||(s.value.id=D())},w=()=>{h("update:model-value",{...s.value})};return B(p,v,{immediate:!0}),I(y),(k,o)=>{const V=N("focus");return c(),u("form",{class:"AuthorForm",onSubmit:g(w,["prevent"])},[t("div",ee,[e(a)===e(l).PENDING?(c(),u("div",te," Loading... ")):f("",!0),e(a)===e(l).ERROR?(c(),u("div",se," Something went wrong... Please come back later! ")):f("",!0),t("div",{class:M(["content",{active:e(a)===e(l).SUCCESS}])},[t("div",oe,[ae,i(t("input",{type:"text",id:"author-name",class:"form-control",required:"","onUpdate:modelValue":o[0]||(o[0]=n=>s.value.name=n),disabled:e(a)!==e(l).SUCCESS},null,8,ne),[[V],[_,s.value.name]])]),t("div",le,[i(t("input",{type:"radio",id:"author-sex-female",value:"female",class:"btn-check","onUpdate:modelValue":o[1]||(o[1]=n=>s.value.sex=n),disabled:e(a)!==e(l).SUCCESS},null,8,de),[[S,s.value.sex]]),t("label",ie,[m(e(X)),r(" Female ")]),i(t("input",{type:"radio",id:"author-sex-male",value:"male",class:"btn-check","onUpdate:modelValue":o[2]||(o[2]=n=>s.value.sex=n),disabled:e(a)!==e(l).SUCCESS},null,8,re),[[S,s.value.sex]]),t("label",ce,[m(e(H)),r(" Male ")])]),t("div",ue,[me,i(t("input",{type:"date",id:"author-birth",class:"form-control","onUpdate:modelValue":o[3]||(o[3]=n=>s.value.birthday=n),disabled:e(a)!==e(l).SUCCESS},null,8,he),[[_,s.value.birthday]])]),t("div",_e,[be,i(t("input",{type:"text",id:"author-country",class:"form-control","onUpdate:modelValue":o[4]||(o[4]=n=>s.value.country=n),disabled:e(a)!==e(l).SUCCESS},null,8,pe),[[_,s.value.country]])])],2)]),t("div",ve,[t("button",{type:"button",class:"btn btn-secondary d-flex align-items-center gap-1",onClick:o[5]||(o[5]=n=>e(x).back())},[m(e(F)),r(" Back ")]),t("button",{type:"reset",class:"btn btn-danger me-auto d-flex align-items-center gap-1",onClick:g(v,["prevent"]),disabled:e(a)!==e(l).SUCCESS},[m(e(j)),r(" Reset ")],8,fe),t("button",{type:"submit",class:"btn btn-primary d-flex align-items-center gap-1",disabled:e(a)!==e(l).SUCCESS},[$(k.$slots,"default",{},()=>[r("Submit")],!0)],8,Se)])],40,Y)}}});const we=P(ge,[["__scopeId","data-v-79f72bcc"]]);export{we as A};
