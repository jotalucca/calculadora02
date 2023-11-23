function calcularPlanos() {
    // Obter os valores inseridos pelo usuário
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
  
    // Lógica para calcular os planos de saúde
    const operadoraA = calcularOperadoraA(idade, peso, altura);
    const operadoraB = calcularOperadoraB(peso, altura);
  
    // Determinar o plano mais vantajoso entre as operadoras
    const planoMaisVantajoso = determinarPlanoMaisVantajoso(operadoraA, operadoraB);
  
    // Exibir resultados na página
    exibirResultados(operadoraA, operadoraB, planoMaisVantajoso);
  }
  
  function calcularOperadoraA(idade, peso, altura) {
    const imc = calcularIMC(peso, altura);
  
    return {
      basico: 100 + (idade * 10 * (imc / 10)),
      standard: (150 + (idade * 15)) * (imc / 10),
      premium: (200 - (imc * 10) + (idade * 20)) * (imc / 10)
    };
  }
  
  function calcularOperadoraB(peso, altura) {
    const imc = calcularIMC(peso, altura);
    const fatorComorbidade = obterFatorComorbidade(imc);
  
    return {
      basico: 100 + (fatorComorbidade * 10 * (imc / 10)),
      standard: (150 + (fatorComorbidade * 15)) * (imc / 10),
      premium: (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10)
    };
  }
  
  function obterFatorComorbidade(imc) {
    if (imc < 18.5) {
      return 10; // Abaixo do peso
    } else if (imc < 24.9) {
      return 1; // Normal
    } else if (imc < 29.9) {
      return 6; // Sobrepeso
    } else if (imc < 34.9) {
      return 10; // Obesidade
    } else if (imc < 39.9) {
      return 20; // Obesidade mórbida grave
    } else {
      return 30; // Obesidade mórbida muito grave
    }
  }
  
  function calcularIMC(peso, altura) {
    return peso / ((altura / 100) * (altura / 100));
  }
  
  function determinarPlanoMaisVantajoso(operadoraA, operadoraB) {
    const precosA = Object.values(operadoraA);
    const precosB = Object.values(operadoraB);
  
    const menorPrecoA = Math.min(...precosA);
    const menorPrecoB = Math.min(...precosB);
  
    return {
      operadora: menorPrecoA < menorPrecoB ? 'Operadora A' : 'Operadora B',
      plano: menorPrecoA < menorPrecoB ? Object.keys(operadoraA).find(plano => operadoraA[plano] === menorPrecoA) : Object.keys(operadoraB).find(plano => operadoraB[plano] === menorPrecoB),
      preco: menorPrecoA < menorPrecoB ? menorPrecoA : menorPrecoB
    };
  }
  
  function exibirResultados(operadoraA, operadoraB, planoMaisVantajoso) {
    const resultadoElement = document.getElementById('resultado');
    let destaqueMensagem = '';
  
    if (planoMaisVantajoso.operadora === 'Operadora A') {
      destaqueMensagem = 'O plano mais vantajoso é o da Operadora A.';
    } else {
      destaqueMensagem = 'O plano mais vantajoso é o da Operadora B.';
    }
  
    resultadoElement.innerHTML = `
      <h4>Resultados:</h4>
      <p>${destaqueMensagem}</p>
      <table class="table">
        <thead>
          <tr>
            <th>Plano</th>
            <th>Operadora A</th>
            <th>Operadora B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Básico</td>
            <td>${operadoraA.basico.toFixed(2)}</td>
            <td>${operadoraB.basico.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Standard</td>
            <td>${operadoraA.standard.toFixed(2)}</td>
            <td>${operadoraB.standard.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Premium</td>
            <td>${operadoraA.premium.toFixed(2)}</td>
            <td>${operadoraB.premium.toFixed(2)}</td>
          </tr>
          <tr class="destacado">
            <td>Mais Vantajoso</td>
            <td>${planoMaisVantajoso.operadora === 'Operadora A' ? planoMaisVantajoso.preco.toFixed(2) : ''}</td>
            <td>${planoMaisVantajoso.operadora === 'Operadora B' ? planoMaisVantajoso.preco.toFixed(2) : ''}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
  