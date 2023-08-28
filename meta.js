import pkg from './package.json' assert {type: 'json'};

const production = !process.env.ROLLUP_WATCH;
const extraGrant = !production ? '// @grant GM_xmlhttpRequest' : '';

export default `
// ==UserScript==
// @name ${pkg.name}
// @description ${pkg.description}
// @version ${pkg.version}
// @author ${pkg.author}
// @icon icon
// @include /your_url/
${extraGrant}
// ==/UserScript==
`;