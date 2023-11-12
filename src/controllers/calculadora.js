import UserOperacao  from "../models/operacaoesUser.js"
import moment from 'moment-timezone';

export  const calcular =  (req, res) => {
        let error  = ""
        let equacao = req.body.equacao;
        let resultado = equacao.reduce((acumulador, element, index) => {
            if (index % 2 === 0) {
              switch (equacao[index - 1]) {
                case "+":
                  return acumulador + parseFloat(element);
                case "-":
                  return acumulador -parseFloat(element);
                case "*":
                  return acumulador * parseFloat (element);
                case "/":
                  if (parseFloat(element) == 0){
                    error = "Divisão por zero"
                  }
                  return acumulador / parseFloat(element);
                default:
                  return parseFloat(element);
              }
            }
            
            return acumulador;
          }, 0).toFixed(11);
          const partes = resultado.split('.')
          if (partes[1]) {
            // Remove zeros à direita
            partes[1] = partes[1].replace(/0+$/, '');
        
            // Se todas as casas decimais foram removidas, também remova o ponto decimal
            if (partes[1].length === 0) {
              resultado= partes[0];
            }else{
              resultado= partes.join('.');
            }
        
            
          }
          
          
          salvar (equacao , resultado)
          if (error != ""){
            
            error = ""
            res.json({ resultado : "ERROR: Divisão por Zero"});
          }else{
            res.json({ resultado });
          }
          
        }
async function  salvar (equacao , resultado){
  const dataHoraSaoPaulo = moment().tz('America/Sao_Paulo');
  const operation =  new UserOperacao ({
      equacao : equacao , 
      resultado: resultado,
      dthora_calculo : dataHoraSaoPaulo.format('YYYY-MM-DD HH:mm:ss')
  })
  await operation.save();
}
         
  

