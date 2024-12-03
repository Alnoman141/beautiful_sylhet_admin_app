/* empty css             *//* empty css                */import{d as c,r as s,n as _,a as d,o as u,b as h,e as n,w as m,h as l,q as f,s as v,v as x}from"./index-5ffde052.js";import{_ as T}from"./_plugin-vue_export-helper-c27b6911.js";const C=o=>(v("data-v-214f8e5a"),o=o(),x(),o),E={class:"px-4"},y={class:"px-8"},g=C(()=>l("h3",null,"Editor Content:",-1)),H=["innerHTML"],M=c({__name:"index",setup(o){const a=s(""),t=s(null),i=()=>{const e=t.value.getHTML();console.log(e),a.value=e};return _(async()=>{const e=`       
        </li></ol><h1>This is an H1 Title</h1>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph.</p>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>        
      `;t.value&&(t.value.setHTML(e),a.value=e)}),(e,w)=>{const r=d("QuillEditor"),p=f;return u(),h("div",E,[n(p,null,{default:m(()=>[n(r,{ref_key:"quillEditor",ref:t,theme:"snow",placeholder:"Type here...",onTextChange:i},null,512),l("div",y,[g,l("pre",{innerHTML:a.value},null,8,H)])]),_:1})])}}});const B=T(M,[["__scopeId","data-v-214f8e5a"]]);export{B as default};
