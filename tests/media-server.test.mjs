import test from 'node:test';
import assert from 'node:assert/strict';
import {once} from 'node:events';
import {readFile} from 'node:fs/promises';
import {createSiteServer} from '../scripts/serve.mjs';

test('Preview server supports real media ranges, suffixes, HEAD and invalid ranges',async()=>{
  const server=createSiteServer();server.listen(0,'127.0.0.1');await once(server,'listening');
  try{
    const url=`http://127.0.0.1:${server.address().port}/assets/project-design/sheep-match/slot-playback-redacted.mp4`;
    const bytes=await readFile(new URL('../assets/project-design/sheep-match/slot-playback-redacted.mp4',import.meta.url));
    const first=await fetch(url,{headers:{Range:'bytes=0-31'}});assert.equal(first.status,206);
    assert.equal(first.headers.get('content-range'),`bytes 0-31/${bytes.length}`);
    assert.equal(first.headers.get('content-type'),'video/mp4');
    assert.deepEqual(Buffer.from(await first.arrayBuffer()),bytes.subarray(0,32));
    const suffix=await fetch(url,{headers:{Range:'bytes=-24'}});assert.equal(suffix.status,206);
    assert.deepEqual(Buffer.from(await suffix.arrayBuffer()),bytes.subarray(-24));
    const head=await fetch(url,{method:'HEAD'});assert.equal(head.status,200);assert.equal(head.headers.get('accept-ranges'),'bytes');assert.equal(head.headers.get('content-length'),String(bytes.length));assert.equal((await head.arrayBuffer()).byteLength,0);
    const invalid=await fetch(url,{headers:{Range:`bytes=${bytes.length+1}-`}});assert.equal(invalid.status,416);assert.equal(invalid.headers.get('content-range'),`bytes */${bytes.length}`);
  }finally{server.closeAllConnections();await new Promise(resolve=>server.close(resolve));}
});
