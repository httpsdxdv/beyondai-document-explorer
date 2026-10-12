import assert from 'node:assert/strict';
const base=process.env.DEMO_TEST_URL||'http://localhost:3010';
for(const locale of ['pt','en']){
 const response=await fetch(`${base}/${locale}`);assert.equal(response.status,200);const html=await response.text();assert.ok(html.includes(`lang="${locale==='pt'?'pt-BR':'en'}"`));assert.ok(html.includes('interface-accessibility'));
 const detail=await fetch(`${base}/${locale}/documents/search-design?q=search&category=product`);assert.equal(detail.status,200);assert.ok((await detail.text()).includes('category=product'));
 const missing=await fetch(`${base}/${locale}/documents/does-not-exist`);assert.equal(missing.status,404);
 const empty=await fetch(`${base}/${locale}?q=does-not-exist`);assert.ok((await empty.text()).includes(locale==='pt'?'Nenhum documento encontrado':'No documents found'));
 console.log(`OK ${locale}: library, detail, preserved query, 404, empty state`);
}
