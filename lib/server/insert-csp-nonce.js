function insertNonce(html, nonce) {
  return html.replace(/<script/g, `<script nonce=${nonce}`);
}

module.exports = insertNonce;
