/* empty css             *//* empty css                */import{d as p,r as n,n as _,a as d,o as u,b as h,e as s,w as m,h as l,q as f,B as v,C as x}from"./index-036af5bf.js";import{_ as C}from"./_plugin-vue_export-helper-c27b6911.js";const T=o=>(v("data-v-c0a115a8"),o=o(),x(),o),E={class:"px-4"},y={class:"px-8"},g=T(()=>l("h3",null,"Editor Content:",-1)),H=["innerHTML"],M=p({__name:"index",setup(o){const a=n(""),t=n(null),i=()=>{const e=t.value.getHTML();console.log(e),a.value=e};return _(async()=>{const e=`       
        </li></ol><h1>This is an H1 Title</h1>
        <p>This is a paragraph of text.</p>
        <p>This is another paragraph.</p>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>
        <ol><li>tuhinjamal</li><li>yusuf</li><li>muhammad</li></ol>        
      `;t.value&&(t.value.setHTML(e),a.value=e)}),(e,w)=>{const c=d("QuillEditor"),r=f;return u(),h("div",E,[s(r,null,{default:m(()=>[s(c,{ref_key:"quillEditor",ref:t,theme:"snow",placeholder:"Type here...",onTextChange:i},null,512),l("div",y,[g,l("pre",{innerHTML:a.value},null,8,H)])]),_:1})])}}});const q=C(M,[["__scopeId","data-v-c0a115a8"]]);export{q as default};
