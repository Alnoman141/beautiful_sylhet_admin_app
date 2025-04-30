/* empty css             *//* empty css                   *//* empty css                */import{d as v,u as x,r as o,x as y,a as k,o as b,b as w,p as n,g as T,w as l,e,V as C,h as L,l as S,m as B,z as D,A as V,B as N,s as F,v as I}from"./index-459f5cb2.js";import{u as E}from"./fairStore-0592b938.js";import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                  */import{V as M,a as h}from"./VRow-32e2c6b5.js";import{_ as $}from"./_plugin-vue_export-helper-c27b6911.js";import"./request-695e3bec.js";const A={class:"border px-2 py-2"},H={class:"text-end"},R=n("label",null,"Fare Detail",-1),P=n("hr",null,null,-1),j=["innerHTML"],G=v({__name:"fairTable",props:{filterTableData:{type:Object,default:()=>({})},columns:{type:Array,default:()=>[]},pageNo:{type:Number,default:1},pageSize:{type:Number,default:10}},emits:["tableDataEmit"],setup(t,{emit:i}){return x(),E(),o(""),y(()=>{const s=document.createElement("style");s.innerHTML=`
    table {
    background-color: #fff;
    border-collapse: collapse;
    box-shadow: 0 0 10px rgba(0, 0, 0, 10%);
    font-family: Arial, sans-serif;
    font-size: 14px;
    inline-size: 100%;
    margin-block: 20px;
    margin-inline: 0;
  }

  
  tr:first-child {
    background-color: #868585b0;
  }

  tr:first-child:hover {
    background-color: #868585b0;
  }

  thead tr {
    background-color: #f4f4f4;
  }

  th, td {
    border: 1px solid #ddd;
    padding-block: 12px;
    padding-inline: 15px;
    text-align: center;
  }

  th {
    background-color: #f0f0f0;
    color: #333;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #fafafa;
  }

  tr:hover {
    background-color: #f1f7ff;
  }

  td:first-child {
    text-align: start;
  }

  @media (max-width: 768px) {
    table, thead, tbody, th, td, tr {
      display: block;
    }

    thead tr {
      display: none;
    }

    tr {
      padding: 10px;
      border: 1px solid #ddd;
      margin-block-end: 15px;
    }

    td {
      position: relative;
      padding-inline-start: 50%;
      text-align: end;
    }

    td::before {
      position: absolute;
      content: attr(data-label);
      font-weight: bold;
      inline-size: 45%;
      inset-inline-start: 10px;
      padding-inline-end: 10px;
      text-align: start;
      white-space: nowrap;
    }
  }
  `,document.head.appendChild(s)}),(s,c)=>{var a;const p=S,u=B,_=k("RouterLink");return b(),w("div",null,[n("div",A,[n("div",H,[s.$can("edit","fare")?(b(),T(_,{key:0,class:"mx-2",style:{color:"white"},to:{name:"editFair",params:{id:((a=t.filterTableData)==null?void 0:a.fair_board_parent_id)||0}}},{default:l(()=>[e(u,{class:"item",effect:"dark",content:"Edit",placement:"top-start"},{default:l(()=>[e(p,{size:"small",type:"primary"},{default:l(()=>[e(C,{icon:"tabler-edit",size:"15"})]),_:1})]),_:1})]),_:1},8,["to"])):L("",!0)]),R,P,n("div",{class:"fare-table",innerHTML:t.filterTableData.name},null,8,j)])])}}});const O=t=>(F("data-v-62aca85e"),t=t(),I(),t),q=O(()=>n("b",null," Fare Board",-1)),J={class:"mb-5"},K=v({__name:"index",setup(t){const i=o(!0);x();const s=E(),c=o([]),p=o([{label:"S.L",prop:"id",sortable:!1},{label:"Name",prop:"name",sortable:!1}]),u=o(0),_=o(1),a=o(10),f=async(m,g)=>{a.value=m,i.value=!0;let d={page:g,per_page:m,language_id:2};try{const{data:r}=await s.getFair(d);i.value=!1,c.value=r.data}catch(r){i.value=!1,console.log(r)}};return y(()=>{f(a.value,1)}),(m,g)=>{const d=V,r=k("PaginationSection"),z=N;return b(),w("div",null,[e(d,{class:"my-4"},{default:l(()=>[e(M,null,{default:l(()=>[e(h,{cols:"6"},{default:l(()=>[q]),_:1}),e(h,{cols:"6",class:"text-right"})]),_:1})]),_:1}),e(d,null,{default:l(()=>[n("div",J,[D(e(G,{"filter-table-data":c.value,columns:p.value,"page-no":_.value,"page-size":a.value,onTableDataEmit:f},null,8,["filter-table-data","columns","page-no","page-size"]),[[z,i.value]])]),e(r,{"total-data":u.value,"page-size-passed":a.value,onGetEmit:f},null,8,["total-data","page-size-passed"])]),_:1})])}}});const ne=$(K,[["__scopeId","data-v-62aca85e"]]);export{ne as default};
