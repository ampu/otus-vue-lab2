import{d as u,D as d,b as n,h as t,q as m,e as c,a as h,u as i,n as l,k as p}from"./index-d6ea6542.js";import{A}from"./add-9aeefab5.js";import{A as _}from"./AuthorForm-23d9df65.js";import{a as f}from"./book-store-8c0cc4d1.js";import{F as S}from"./flash-types-2fb8710c.js";const w=c("h1",null,"New Author",-1),b=u({__name:"AddAuthorView",setup(F){const a=p(),{addAuthor:o}=f(),{addFlash:s}=d(),r=async e=>{await o(e),s({status:S.SUCCESS,message:"Author added"}),await a.push({name:"authors",query:{page:-1}})};return(e,V)=>(h(),n("div",null,[w,t(_,{"onUpdate:modelValue":r},{default:m(()=>[t(i(A)),l(" Add ")]),_:1})]))}});export{b as default};