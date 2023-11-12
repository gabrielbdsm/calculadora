const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

let num = "";
equacao = [];

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    
    verificacao(button.textContent);
  });
});

function verificacao(button) {
  let conteudoAtual = previousOperationText.innerHTML  ;
  if (currentOperationText.innerHTML != ""){
    currentOperationText.innerHTML =""
  }

  if (!isNaN(parseInt(button))) {
      num += button;
      previousOperationText.innerHTML = conteudoAtual + button
  }else if(button == "."){
      num += button;
      previousOperationText.innerHTML = conteudoAtual + button
  } else {
      if (button == "CE") {
        ce()
      } else if (button == "C") {
        previousOperationText.innerHTML =""
        currentOperationText.innerHTML =""
        equacao = []
        num = ""
      } else if (button == "=") {
          if (num != ''){
            equacao.push(num);
            num = ''
          }
          if(equacao.length >= 2 ){
            enviarListaParaBackend()
          }
      }else if(button == "DEL"){
        del ()
      }else {
        if (num != ""){
          equacao.push(num);
        }
        if(isNaN(parseInt(equacao[equacao.length -1]))){
          
          equacao[equacao.length -1] = button;
        }else{
          equacao.push(button);
        }
        
        previousOperationText.innerHTML =equacao.reduce((total , element) => total + element )
        num = "";
      }
  }
}

function ce (){
  if (num != "" ){
    num = ""
  }
  else{
    if(!isNaN(parseInt(equacao[equacao.length -1]))){
      equacao.pop()  
    }
  }
  
  if (equacao.length == 0 ) {
    previousOperationText.innerHTML = ''
  }else{
    previousOperationText.innerHTML = equacao.reduce((total , element) => {
      if (!isNaN(parseInt(element))){
        return total + parseInt(element)
      }
      else{
        return total + element
      }
    })
  }
  
}

function del (){
  let item = previousOperationText.innerHTML.slice(0, -1);

        previousOperationText.innerHTML = item
        if (!isNaN(parseInt(num))){
          num = num.slice(0, -1)
        }else{
          
          if ((equacao[equacao.length -1]).length == 1){
            equacao.pop() 
          }else{
            equacao[equacao.length -1]= equacao[equacao.length -1].slice(0, -1)
          }
        }
}

function enviarListaParaBackend() {
  fetch('/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ equacao }),
  })
  .then(response => response.json())
  .then(data => {
    
    currentOperationText.innerHTML = data.resultado
    previousOperationText.innerHTML = ''
    equacao = []
    num = ""
    
  })
  .catch(error => console.error({'Erro':error }));
}
