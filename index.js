// Realiza uma requisição para obter os dados dos filmes a partir da API clenio teste 
fetch('https://render.com/docs/web-services#port-detection' )
  .then(response => response.json()) // Converte a resposta em JSON
  .then(body => {
    const listaFilmes = document.getElementById('lista-filmes'); // Obtém a lista de filmes na página
    const categoriaSelect = document.getElementById('categoria'); // Obtém o seletor de categoria

    // Adiciona um ouvinte de evento para o seletor de categoria
      categoriaSelect.addEventListener('change', () => {
      const categoriaSelecionada = categoriaSelect.value; // Obtém a categoria selecionada
      listaFilmes.innerHTML = ''; // Limpa a lista de filmes para atualização
      const anoAtual = new Date().getFullYear(); // Obtém o ano atual
      
      // Função para classificar os filmes por título
      const ordenarPorTitulo = (a, b) => {
        return a.titulo.localeCompare(b.titulo);
      };
      
      // Ordenar os filmes por título antes de processá-los
      body.sort(ordenarPorTitulo);
     
      body.forEach(filme => {
        // Verifica se o filme se encaixa nos critérios da categoria ou lançamento
        if ((categoriaSelecionada === 'Todos' || filme.genero === categoriaSelecionada) ||
            (categoriaSelecionada === 'Lancamentos' && anoAtual - filme.lancamento <= 1)){
          
          // Cria um elemento de lista para exibir informações do filme
          const filmeItem = document.createElement('li');
          filmeItem.innerHTML = `  
            <h2>${filme.titulo}</h2>
            <img src="${filme.imagem}" alt="${filme.titulo}" class="filme-image" />
            <p><strong>Ano de Lançamento:</strong> ${filme.lancamento}</p>
            <p><strong>Gênero:</strong> ${filme.genero}</p>
            <p><strong>Descrição:</strong>${filme.descricao}</p>
            <a href="${filme.ondeAssistir}" target="_blank" class="assistir-link">
            <img src="https://static.vecteezy.com/system/resources/previews/001/200/436/non_2x/music-player-button-play-png.png" class="netflix-icon">
            </a>
          `;
          // Adiciona o elemento de lista à lista de filmes na página
          listaFilmes.appendChild(filmeItem);
        }
      });
    });

    // Dispara o evento de mudança de categoria para preencher a lista inicialmente
    categoriaSelect.dispatchEvent(new Event('change'));
  })
  .catch(error => console.error(error,"SERVIDOR DA API NÃO RESPONDEU")); // Trata erros na requisição

