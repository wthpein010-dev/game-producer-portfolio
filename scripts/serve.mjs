import http from 'node:http';
import path from 'node:path';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
const defaultRoot=fileURLToPath(new URL('../',import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
export function createSiteServer({root=defaultRoot}={}){const absolute=path.resolve(root);return http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost');let pathname=decodeURIComponent(url.pathname);if(pathname==='/'||pathname.endsWith('/'))pathname+='index.html';const target=path.resolve(absolute,'.'+pathname);if(!target.startsWith(absolute+path.sep)||!/^\/(index\.html|assets\/|experience\/|projects\/)/.test(pathname)){res.writeHead(404);res.end('Not found');return;}if(!(await stat(target)).isFile())throw Error('not file');const bytes=await readFile(target);res.writeHead(200,{'content-type':mime[path.extname(target)]||'application/octet-stream','x-content-type-options':'nosniff'});res.end(bytes);}catch{res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');}});}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4180);createSiteServer().listen(port,'127.0.0.1',()=>console.log(`Portfolio: http://127.0.0.1:${port}/`));}
