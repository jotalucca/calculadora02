function calcularPlanos() {
    // Obter os valores inseridos pelo usuário
    const idade = parseInt(document.getElementById('idade').value);
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
  
    // Lógica para calcular os planos de saúde
    const operadoraA = calcularOperadoraA(idade, peso, altura);
    const operadoraB = calcularOperadoraB(peso, altura);
  
    // Determinar o plano mais vantajoso
    const planoMaisVantajosoA = determinarPlanoMaisVantajoso(operadoraA);
    const planoMaisVantajosoB = determinarPlanoMaisVantajoso(operadoraB);
  
    // Exibir resultados na página
    exibirResultados(operadoraA, operadoraB, planoMaisVantajosoA, planoMaisVantajosoB);
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
  
  function determinarPlanoMaisVantajoso(operadora) {
    const precos = Object.values(operadora);
    const menorPreco = Math.min(...precos);
    const planoMaisVantajoso = Object.keys(operadora).find(plano => operadora[plano] === menorPreco);
    return {
      plano: planoMaisVantajoso,
      preco: menorPreco
    };
  }
  
  function exibirResultados(operadoraA, operadoraB, planoMaisVantajosoA, planoMaisVantajosoB) {
    const resultadoElement = document.getElementById('resultado');
  
    resultadoElement.innerHTML = `
      <h4>Resultados:</h4>
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
          <tr class="${planoMaisVantajosoA.plano === 'basico' ? 'destacado' : ''}">
            <td>Mais Vantajoso (A)</td>
            <td>${planoMaisVantajosoA.preco.toFixed(2)}</td>
            <td></td>
          </tr>
          <tr class="${planoMaisVantajosoB.plano === 'basico' ? 'destacado' : ''}">
            <td>Mais Vantajoso (B)</td>
            <td></td>
            <td>${planoMaisVantajosoB.preco.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    `;
  }
  