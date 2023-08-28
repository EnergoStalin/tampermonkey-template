(async function() {
  GM_xmlhttpRequest({
      method: "GET",
      url: "http://127.0.0.1:8080/bundle.user.js",
      onload: function(response) {
          eval(response.responseText);
      },
  });
})();
