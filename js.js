document.getElementById('geminiForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=AIzaSyDA-Oa3GFjeaDtf0UHoouPE7Py66g7SILM';
  var promptBase = document.getElementById('promptBase').value;
  var searchQuery = document.getElementById('consulta').value;
  
  var data = {
    contents: [
      {
        parts: [
          {
            text: promptBase + '\n\nConsulta del usuario: ' + searchQuery
          }
        ]
      }
    ]
  };
  
  var respuestaDiv = document.getElementById('respuesta');
  respuestaDiv.textContent = "Consultando...";
  
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        try {
          var res = JSON.parse(xhr.responseText);
          // Accede a la propiedad `text` dentro del objeto JSON
          var respuestaTexto = res.candidates[0].content.parts[0].text;
          respuestaDiv.textContent = respuestaTexto;
        } catch (err) {
          respuestaDiv.textContent = "Error al parsear respuesta: " + err;
        }
      } else {
        respuestaDiv.textContent = "Error: " + xhr.status + "\n" + xhr.responseText;
      }
    }
  };
  
  xhr.send(JSON.stringify(data));
});