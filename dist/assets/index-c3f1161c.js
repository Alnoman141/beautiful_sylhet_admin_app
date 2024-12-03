/* empty css             *//* empty css                */import{d,r as n,n as p,a as _,o as u,b as h,e as a,w as m,h as s,q as f,s as v,v as x}from"./index-5ffde052.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const C=o=>(v("data-v-6ccd8017"),o=o(),x(),o),E={class:"px-4"},y={class:"px-8"},g=C(()=>s("h3",null,"Editor Content:",-1)),H=["innerHTML"],M=d({__name:"index",setup(o){const l=n(""),t=n(null),i=()=>{const e=t.value.getHTML();console.log(e),l.value=e};return p(async()=>{const e=`       
        </li></ol><h1>This is an H1 Title</h1>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph.</p>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>        
      `;t.value&&(t.value.setHTML(e),l.value=e)}),(e,w)=>{const c=_("QuillEditor"),r=f;return u(),h("div",E,[a(r,null,{default:m(()=>[a(c,{ref_key:"quillEditor",ref:t,theme:"snow",placeholder:"Type here...",onTextChange:i},null,512),s("div",y,[g,s("pre",{innerHTML:l.value},null,8,H)])]),_:1})])}}});const B=T(M,[["__scopeId","data-v-6ccd8017"]]);export{B as default};
