/* empty css             *//* empty css                */import{d as c,r as n,n as _,a as d,o as u,b as h,e as a,w as m,h as s,q as f,s as v,v as x}from"./index-5ffde052.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const C=o=>(v("data-v-bb968e25"),o=o(),x(),o),E={class:"px-4"},b={class:"px-8"},y=C(()=>s("h3",null,"Editor Content:",-1)),g=["innerHTML"],H=c({__name:"index",setup(o){const l=n(""),t=n(null),i=()=>{const e=t.value.getHTML();console.log(e),l.value=e};return _(async()=>{const e=`       
        </li></ol><h1>This is an H1 Title</h1>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph.</p>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>        
      `;t.value&&(t.value.setHTML(e),l.value=e)}),(e,M)=>{const r=d("QuillEditor"),p=f;return u(),h("div",E,[a(p,null,{default:m(()=>[a(r,{ref_key:"quillEditor",ref:t,theme:"snow",placeholder:"Type here...",onTextChange:i},null,512),s("div",b,[y,s("pre",{innerHTML:l.value},null,8,g)])]),_:1})])}}});const q=T(H,[["__scopeId","data-v-bb968e25"]]);export{q as default};
