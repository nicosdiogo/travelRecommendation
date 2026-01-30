const btnSearch = document.getElementById('btnSearch');

function searchCondition(event) {
  event.preventDefault();

  const input = document
    .getElementById('conditionInput')
    .value
    .trim()
    .toLowerCase();

  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  if (!input) {
    resultDiv.innerHTML = 'Por favor, insira uma palavra-chave.';
    return;
  }

  fetch('travel_recommendation_api.json')
    .then(res => res.json())
    .then(data => {
      const inputLower = input.toLowerCase();
      let paises = [];
      let cidades = [];
      let templos = [];
      let praias = [];

      paises = data.countries.filter(c =>
        c.name.toLowerCase().includes(inputLower)
      );

      for (const c of data.countries) {
        const matches = c.cities.filter(ct =>
          ct.name.toLowerCase().includes(inputLower) ||
          ct.description.toLowerCase().includes(inputLower)
        );
        cidades.push(...matches);
      }

      templos = data.temples.filter(t =>
        t.name.toLowerCase().includes(inputLower) ||
        t.description.toLowerCase().includes(inputLower)
      );

      praias = data.beaches.filter(b =>
        b.name.toLowerCase().includes(inputLower) ||
        b.description.toLowerCase().includes(inputLower)
      );


      if (paises.length || cidades.length || templos.length || praias.length) {
        let html = '';

        if (paises.length) {
          html += `<h3 class="categoria">Países</h3>`;
          paises.forEach(p => {
            html += `
              <div class="caixa">
                <img src="${p.imageUrl || ''}" class="imagem" alt="${p.name}">
                <div class="conteudo">
                  <h2 class="titulo">${p.name}</h2>
                  <p class="texto">${p.description || ''}</p>
                </div>
              </div>
            `;
          });
        }

        if (cidades.length) {
          
          cidades.forEach(ct => {
            html += `
              <div class="caixa">
                <img src="${ct.imageUrl}" class="imagem" alt="${ct.name}">
                <div class="conteudo">
                  <h2 class="titulo">${ct.name}</h2>
                  <p class="texto">${ct.description}</p>
                </div>
              </div>
            `;
          });
        }

        if (templos.length) {
          
          templos.forEach(t => {
            html += `
              <div class="caixa">
                <img src="${t.imageUrl}" class="imagem" alt="${t.name}">
                <div class="conteudo">
                  <h2 class="titulo">${t.name}</h2>
                  <p class="texto">${t.description}</p>
                </div>
              </div>
            `;
          });
        }

        if (praias.length) {
          
          praias.forEach(b => {
            html += `
              <div class="caixa">
                <img src="${b.imageUrl}" class="imagem" alt="${b.name}">
                <div class="conteudo">
                  <h2 class="titulo">${b.name}</h2>
                  <p class="texto">${b.description}</p>
                </div>
              </div>
            `;
          });
        }

        resultDiv.innerHTML = html;
      } else {
        resultDiv.innerHTML = 'Nenhum resultado encontrado.';
      }
    })
    .catch(() => {
      resultDiv.innerHTML = 'Erro ao carregar os dados.';
    });
}

btnSearch.addEventListener('click', searchCondition);
