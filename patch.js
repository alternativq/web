const fs = require('fs');
const p = 'webapp/dist/assets/index-D78GFneu.js';
let c = fs.readFileSync(p, 'utf8');

// The tab string:
const str1 = 'L&&!u&&(0,A.jsx)(`div`,{className:`vp-card`,style:{display:`grid`,gridTemplateColumns:`1fr 1fr`,gap:6,padding:4,background:`rgba(255,255,255,0.03)`,border:`1px solid rgba(255,255,255,0.07)`,borderRadius:14,marginBottom:16},children:[{label:`✨ Новый профиль`,val:`trial`},{label:`🔑 Восстановить`,val:`recover`}].map(({label:e,val:t})=>(0,A.jsx)(`button`,{type:`button`,className:`vp-tab`,onClick:()=>{x(t),l(null)},style:{padding:`11px`,borderRadius:10,border:`none`,background:b===t?`linear-gradient(135deg,rgba(99,102,241,.2),rgba(79,70,229,.1))`:`transparent`,color:b===t?`#c7d2fe`:`#475569`,fontWeight:700,fontSize:13,cursor:`pointer`,minHeight:44,boxShadow:b===t?`inset 0 1px 0 rgba(255,255,255,.06)`:`none`},children:e},t))}),';

// The text under trial:
const str2 = '!L&&(0,A.jsx)(`button`,{type:`button`,onClick:()=>{x(`recover`),l(null);let e=J(`veilora_trial_token`);e&&C(e)},style:{display:`block`,width:`100%`,marginTop:14,background:`transparent`,border:`none`,color:`#334155`,fontSize:12.5,cursor:`pointer`,textAlign:`center`,padding:`4px`,transition:`color .2s`},children:`Уже есть ключ? Восстановить →`})';

if(c.includes(str1)) {
    c = c.replace(str1, '');
    console.log("Tab removed.");
} else {
    console.log("Tab string not found!");
}

if(c.includes(str2)) {
    // If it's the last item in a conditional or array, we might leave a comma or something, but JSX compiles to function calls.
    // wait, the button is in an array of children.
    // Let's check the context of str2 in the JSON grep:
    // ... `🚀 Получить доступ`})]}),!L&&(0,A.jsx)(`button`,...`Уже есть ключ? Восстановить →`})]}):(0,A.jsxs) ...
    // It's preceded by `}),` so if we remove it, the array ends with `}),`. In JS it's fine. Wait, `]}` ends the array!
    // The code is `... `🚀 Получить доступ`})]}),!L&&(0,A.jsx)(...)`
    // Actually, if it's `[ A, B, !L && C ]`, removing `!L && C` will leave `[A, B, ]` or `[A, B,]`. But wait, in the minified code, it might be part of an array: `children:[..., ..., !L&&(...)]`.
    // Let's see the grep output: `... o?(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(Ae,{color:\`#fff\`}),L?\`Генерация...\`:\`Получение...\`]}):L?\`⚙️ Создать профиль\`:\`🚀 Получить доступ\`})]}),!L&&(0,A.jsx)(...)`
    // Yes, it's followed by `]}`. If we remove `,!L&&...` we need to remove the leading comma.
    // Wait, I don't see a comma before `!L`.
    // It says `})]}),!L&&(0,A.jsx)(`
    // Ah, it's separated by a comma. So we should replace `,!L&&...`
    
    // Let's just use string replace with the comma.
    c = c.replace(',' + str2, '');
    console.log("Link removed.");
} else {
    console.log("Link string not found!");
}

fs.writeFileSync(p, c);
