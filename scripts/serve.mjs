import http from 'node:http';
import path from 'node:path';
import {stat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {fileURLToPath} from 'node:url';
const defaultRoot=fileURLToPath(new URL('../',import.meta.url));
const mime={'.mp4':'video/mp4','.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8'};
export function createSiteServer({root=defaultRoot}={}) {
  const absolute=path.resolve(root);
  return http.createServer(async(req,res)=>{
    try {
      const url=new URL(req.url,'http://localhost');
      let pathname=decodeURIComponent(url.pathname);
      if(pathname==='/'||pathname.endsWith('/'))pathname+='index.html';
      const target=path.resolve(absolute,'.'+pathname);
      if(!target.startsWith(absolute+path.sep)||!/^\/(index\.html|assets\/|experience\/|skills\/|projects\/)/.test(pathname))throw Error('Not public');
      const info=await stat(target);
      if(!info.isFile())throw Error('Not a file');
      const headers={'content-type':mime[path.extname(target)]||'application/octet-stream','x-content-type-options':'nosniff','accept-ranges':'bytes'};
      const range=req.method==='GET'?req.headers.range:null;
      if(range){
        const match=/^bytes=(\d*)-(\d*)$/.exec(range);
        let start=0,end=info.size-1;
        if(match&&(match[1]||match[2])){
          if(match[1]){start=Number(match[1]);if(match[2])end=Math.min(Number(match[2]),end);}
          else start=Math.max(0,info.size-Number(match[2]));
        }else start=info.size;
        if(start> end||start>=info.size||!Number.isSafeInteger(start)||!Number.isSafeInteger(end)){
          res.writeHead(416,{...headers,'content-range':`bytes */${info.size}`});res.end();return;
        }
        res.writeHead(206,{...headers,'content-range':`bytes ${start}-${end}/${info.size}`,'content-length':end-start+1});
        const stream=createReadStream(target,{start,end});stream.on('error',error=>res.destroy(error));res.once('close',()=>stream.destroy());stream.pipe(res);return;
      }
      res.writeHead(200,{...headers,'content-length':info.size});
      if(req.method==='HEAD'){res.end();return;}
      const stream=createReadStream(target);stream.on('error',error=>res.destroy(error));res.once('close',()=>stream.destroy());stream.pipe(res);
    }catch{res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');}
  });
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4180);createSiteServer().listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://127.0.0.1:${port}/`));}
