(async function() {
	GM.xmlHttpRequest({
      method: "GET",
      url: "http://127.0.0.1:8080/src/bundle.user.js",
      onload: function(response) {
          eval(response.responseText);
      },
  });
})();
