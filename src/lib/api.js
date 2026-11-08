const API=import.meta.env.VITE_API_URL||"";
async function req(path,options={}){const r=await fetch(API+path,options);const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||"Request failed");return d;}
export const getHealth=()=>req("/api/health"),getJobs=()=>req("/api/jobs"),getLibrary=()=>req("/api/library");
export const createJob=p=>req("/api/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});
export const generateScript=topic=>req("/api/scripts/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({topic})});
export const generateVoice=(text,voice)=>req("/api/tts/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text,voice})});
export const downloadSource=(url,authorized)=>req("/api/import/url",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url,authorized})});
export const narrationUrl=id=>API+"/api/narrations/"+encodeURIComponent(id);
export const exportUrl=name=>API+"/api/exports/"+encodeURIComponent(name);
export function uploadVideo(file,onProgress){return new Promise((resolve,reject)=>{const f=new FormData();f.append("video",file);const x=new XMLHttpRequest();x.open("POST",API+"/api/upload");x.upload.onprogress=e=>{if(e.lengthComputable)onProgress?.(Math.round(e.loaded/e.total*100));};x.onload=()=>{let d={};try{d=JSON.parse(x.responseText)}catch{}x.status>=200&&x.status<300?resolve(d):reject(new Error(d.error||"Upload failed"));};x.onerror=()=>reject(new Error("Upload network error"));x.send(f);});}