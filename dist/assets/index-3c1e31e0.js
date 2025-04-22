/* empty css             *//* empty css                   *//* empty css                */import{d as h,u as x,r as a,x as v,a as w,o as m,b as y,p as l,g as E,w as o,e,V as T,h as z,l as C,m as L,z as B,A as V,B as D,s as N,v as S}from"./index-d8e6d9a9.js";import{u as k}from"./fairStore-aadb74d7.js";import"./el-tooltip-4ed993c7.js";/* empty css                  *//* empty css                  */import{V as F,a as g}from"./VRow-c0964684.js";import{_ as I}from"./_plugin-vue_export-helper-c27b6911.js";import"./request-a4ac8e94.js";const M={class:"border px-2 py-2"},$={class:"text-end"},A=l("label",null,"Fare Detail",-1),H=l("hr",null,null,-1),R=["innerHTML"],j=h({__name:"fairTable",props:{filterTableData:{type:Object,default:()=>({})},columns:{type:Array,default:()=>[]},pageNo:{type:Number,default:1},pageSize:{type:Number,default:10}},emits:["tableDataEmit"],setup(t,{emit:s}){return x(),k(),a(""),v(()=>{const n=document.createElement("style");n.innerHTML=`
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
  `,document.head.appendChild(n)}),(n,p)=>{var i;const u=C,_=L,d=w("RouterLink");return m(),y("div",null,[l("div",M,[l("div",$,[n.$can("edit","fare")?(m(),E(d,{key:0,class:"mx-2",style:{color:"white"},to:{name:"editFair",params:{id:((i=t.filterTableData)==null?void 0:i.fair_board_parent_id)||0}}},{default:o(()=>[e(_,{class:"item",effect:"dark",content:"Edit",placement:"top-start"},{default:o(()=>[e(u,{size:"small",type:"primary"},{default:o(()=>[e(T,{icon:"tabler-edit",size:"15"})]),_:1})]),_:1})]),_:1},8,["to"])):z("",!0)]),A,H,l("div",{class:"fare-table",innerHTML:t.filterTableData.name},null,8,R)])])}}});const O=t=>(N("data-v-02a15329"),t=t(),S(),t),q=O(()=>l("b",null," Fare Board",-1)),G={class:"mb-5"},J=h({__name:"index",setup(t){const s=a(!0);x();const n=k(),p=a([]),u=a([{label:"S.L",prop:"id",sortable:!1},{label:"Name",prop:"name",sortable:!1}]);a(0);const _=a(1),d=a(10),i=async(f,b)=>{d.value=f,s.value=!0;let c={page:b,per_page:f,language_id:2};try{const{data:r}=await n.getFair(c);s.value=!1,p.value=r.data}catch(r){s.value=!1,console.log(r)}};return v(()=>{i(10,1)}),(f,b)=>{const c=V,r=D;return m(),y("div",null,[e(c,{class:"my-4"},{default:o(()=>[e(F,null,{default:o(()=>[e(g,{cols:"6"},{default:o(()=>[q]),_:1}),e(g,{cols:"6",class:"text-right"})]),_:1})]),_:1}),e(c,null,{default:o(()=>[l("div",G,[B(e(j,{"filter-table-data":p.value,columns:u.value,"page-no":_.value,"page-size":d.value,onTableDataEmit:i},null,8,["filter-table-data","columns","page-no","page-size"]),[[r,s.value]])])]),_:1})])}}});const oe=I(J,[["__scopeId","data-v-02a15329"]]);export{oe as default};
