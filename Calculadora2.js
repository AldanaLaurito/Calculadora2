var numeros = [];
var signos = [];
var indexUltimoSigno = 0;
var index = 0;
var resultado = 0;
var ultimoResultado = 0;
var signoNegativo = false;

function numero(nro){
	var texto=document.getElementById("textoPantalla").innerHTML

	var largoTexto=texto.length;
	
	if(document.getElementById("textoPantalla").innerHTML == 0 && texto.substring(largoTexto-1,largoTexto) != '.'){
		document.getElementById("textoPantalla").innerHTML ='';
		document.getElementById("textoPantalla").innerHTML = nro;
	}else{
		document.getElementById("textoPantalla").innerHTML = texto + nro;
	}
}

function signo(signo){
	
	var texto=document.getElementById("textoPantalla").innerHTML

	var largoTexto=texto.length;
	
	var carAnterior = texto.substring(largoTexto-1,largoTexto);
	
	var carAnteUltimo = texto.substring(largoTexto-2,largoTexto-1);
	
	if(signo != '.'){
		try{
			if(signo == '-' && (carAnterior == '+' || carAnterior == '*' || carAnterior == '/' || carAnterior == '-') && !isNaN(carAnteUltimo)){
				signoNegativo = true;
			}else if(carAnterior != '.'){
				if(signoNegativo == true){
					signos.push(signo);
					numeros.push(parseInt('-' + texto.substring(indexUltimoSigno,largoTexto)));
					indexUltimoSigno = largoTexto+1;
					signoNegativo = false;
				}else{
					signos.push(signo);
					numeros.push(parseInt(texto.substring(indexUltimoSigno,largoTexto)));
					indexUltimoSigno = largoTexto+1;
				}				
			}else{
				alert("Por favor ingrese un numero entre el caracter ingresado y el caracter anterior.");
				document.getElementById("textoPantalla").innerHTML=texto.substring(0,largoTexto-1);
			}
			
		}catch(error){
			alert("Se produjo el siguiente error: "+error +'. Por favor, intente realizar otra operacion.')
		}
	}
	document.getElementById("textoPantalla").innerHTML += signo;
	
	
}

function signoIgual(signo){
	try{
		var texto=document.getElementById("textoPantalla").innerHTML
		
		var largoTexto=texto.length;
		
		numeros.push(parseInt(texto.substring(indexUltimoSigno,largoTexto)));
		resultado = calcular();
		if(resultado == 'Infinity' || isNaN(resultado)){
			alert("La operacion ingrasada da un resultado invalido. Por favor, intente realizar otra operacion. El resultado obtenido es "+resultado)
		}else{
			document.getElementById("textoPantalla").innerHTML += signo + resultado;
		}
	}catch(error){
		alert("Se produjo el siguiente error: "+error +'. Por favor, intente realizar otra operacion.')
	}	
}

function borradoTotal(){
	document.getElementById("textoPantalla").innerHTML ='0';
	signos = [];
	numeros = [];
	indexUltimoSigno = 0;
	index = 0;
	signoNegativo = false
}

function calcular(){
	var texto=document.getElementById("textoPantalla").innerHTML
	
	if(isNaN(texto.substring(texto.length-1,texto.length))){
		alert("Por favor, ingrese un numero mas antes de intentar terminar la operacion.")
	}else{
		for(var i=0; i<signos.length; i++){			
			if(index <= numeros.length){
				if(i==0){
					resultado = operaciones(numeros[0], numeros[1], signos[0])
					index = 2;
				}else{
					resultado = operaciones(resultado,numeros[2],signos[i]);
					index++;
				}
			}
		}
		
		ultimoResultado = resultado;
		return resultado;
	}
}

function operaciones(n1, n2, signo){
	
	switch (signo){
		case '+':
			resultado = n1+n2;
			break;
		case '-':
			resultado = n1-n2;
			break;
		case '*':
			resultado = n1*n2;
			break;	
		case '/':
			if(n2 == 0){
				alert("Se esta intentando dividir "+ n2 +" por cero. Por favor, realice una division valida.");
			}else{
				resultado = n1/n2;			 
			}
			break;
	}
	
	return resultado;
}

function ultResultado(){
	numero(ultimoResultado);
}