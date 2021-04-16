#include <stdio.h>

main(){
	
	float nota, nota2, media=0;
	int cod;
	
	do{
		printf ("Voce deseja \n 1-calcular a media do aluno \n 2-sair do programa \n");
		scanf ("%i", &cod);
		if ((cod != 1 ) && (cod != 2)) {
		  printf ("");
		}
		switch (cod){
			case 1: 
				printf ("\n Digite a primeira nota do mestre ");
				scanf (" %f", &nota);
				printf ("\n Digite a segunda nota do doutor ");
				scanf (" %f", &nota2);
				media=((nota + nota2)/2);
				printf ("A nota media do consagrado: %f", media);
				break;
			case 2: 
				printf ("Programa encerrado!");
		}
	}
	while (cod == 1); 
}
