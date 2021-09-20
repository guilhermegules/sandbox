#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

// configuração do tabuleiro
#define _ALTURA_    10
#define _LARGURA_   10
#define _QT_BOMBAS_ 15

// visualização do tabuleiro
#define _ABERTA_   0
#define _FECHADA_  1
#define _BANDEIRA_ 2

// conteúdo das células
#define _BOMBA_   -1
#define _VAZIA_    0

/*
  - estado da célula: int TabVisualiz[_ALTURA_][_LARGURA_];
   * aberta
   * fechada
   * esta com bandeira?

  - informações
   * se possui uma bomba
   * a qt de bombas ao redor
   0 -> 8
   -1 tem bomba!

*/

int AbreArea ( int TabVisualiz[_ALTURA_][_LARGURA_],
               int TabConteudo[_ALTURA_][_LARGURA_],
               int X /* coluna */,
               int Y /* linha  */ )
{
    int cont=0;

    if( TabVisualiz[Y][X] == _FECHADA_ && TabConteudo[Y][X] == _VAZIA_)
    {
       TabVisualiz[Y][X] = _ABERTA_;
       cont++;

       //printf("Y: %d ::: X: %d\n", Y, X);
       if( Y > 0 )              if( TabVisualiz[Y - 1][X] == _FECHADA_) cont+= AbreArea(TabVisualiz, TabConteudo, X, Y-1); // conta para cima
       if( Y < ( _ALTURA_ - 1)) if( TabVisualiz[Y + 1][X] == _FECHADA_) cont+= AbreArea(TabVisualiz, TabConteudo, X, Y+1); // conta para baixo
       if( X < (_LARGURA_ - 1)) if( TabVisualiz[Y][X + 1] == _FECHADA_) cont+= AbreArea(TabVisualiz, TabConteudo, X+1, Y); // conta para a direita
       if( X > 0 )              if( TabVisualiz[Y][X - 1] == _FECHADA_) cont+= AbreArea(TabVisualiz, TabConteudo, X-1, Y); // conta para a direita
    }

    return ( cont );
}


void InicializaTabuleiro( int TabVisualiz[_ALTURA_][_LARGURA_],
                          int TabConteudo[_ALTURA_][_LARGURA_] )
{
    int L, C;
    int qtBombasAlocadas = 0;
    bool achei = false;

    for(L=0; L < _ALTURA_; L++)
    {
        for(C=0; C < _LARGURA_; C++)
        {
            TabConteudo[L][C] = _VAZIA_;
            TabVisualiz[L][C] = _FECHADA_;
        }
    }

    while (qtBombasAlocadas < _QT_BOMBAS_ )
    {
        //printf(" qt bombas: %d\n", qtBombasAlocadas);
        achei = false;
        int X = rand() % (_LARGURA_ - 1);
        int Y = rand() % (_ALTURA_  - 1);

        if(TabConteudo[Y][X] == _BOMBA_)
        {
            achei = true;
        }

        if(!achei)
        {
            TabConteudo[Y][X] = _BOMBA_;
            qtBombasAlocadas++;
        }
    }

    //contagem
    int contaBombas = 0;
    for(L=0; L < _ALTURA_; L++)
    {
        for(C=0; C < _LARGURA_; C++)
        {
            if( TabConteudo[L][C] != _BOMBA_ )
            {
               contaBombas = 0;

               if(L > 0)               if(TabConteudo[L - 1][C] == _BOMBA_) contaBombas++; // cima
               if(L < (_ALTURA_  - 1)) if(TabConteudo[L + 1][C] == _BOMBA_) contaBombas++; // baixo
               if(C < (_LARGURA_ - 1)) if(TabConteudo[L][C + 1] == _BOMBA_) contaBombas++; // direita
               if(C > 0)               if(TabConteudo[L][C - 1] == _BOMBA_) contaBombas++; // esquerda


               if(L < (_ALTURA_  - 1) && C < (_LARGURA_ - 1))
                 if(TabConteudo[L + 1][C + 1] == _BOMBA_) contaBombas++; // diag inf dir

               if(L < (_ALTURA_  - 1) && C > 0 )
                 if(TabConteudo[L + 1][C - 1] == _BOMBA_) contaBombas++; // diag inf esq

               if(L > 0 && C < (_LARGURA_ - 1) )
                 if(TabConteudo[L - 1][C + 1] == _BOMBA_) contaBombas++; // diag sup dir

               if( L > 0 && C > 0 )
                 if(TabConteudo[L - 1][C - 1] == _BOMBA_) contaBombas++; // diag sup esq

               TabConteudo[L][C] = contaBombas;
            }
        }

    }

}

void MostraTabuleiro( int TabVisualiz[_ALTURA_][_LARGURA_],
                      int TabConteudo[_ALTURA_][_LARGURA_], bool cheat)
{
    int L, C;

    // mostra o conteúdo do tabuleiro
    for(L=0; L < _ALTURA_; L++)
    {
        for(C=0; C < _LARGURA_; C++)
        {
            if(TabVisualiz[L][C] == _ABERTA_ || cheat)
            {
              switch( TabConteudo[L][C] )
              {
                  case _BOMBA_: printf("| # "); break;
                  case 0:       printf("| . "); break;
                  default:      printf("| %d ", TabConteudo[L][C]);
                  break;
              }
            }
            else
            {
                printf("| + ");
            }

        }
        printf("|\n");
    }
}

int main()
{

 int TabVisualiz[_ALTURA_][_LARGURA_];
 int TabConteudo[_ALTURA_][_LARGURA_];


    //srand(time(NULL));
    InicializaTabuleiro (TabVisualiz, TabConteudo);
    MostraTabuleiro(TabVisualiz, TabConteudo, true);
    printf("\n");
    int cont = AbreArea( TabVisualiz, TabConteudo, 9, 1);
    //AbreArea( TabVisualiz, TabConteudo, 0, 2);
    MostraTabuleiro(TabVisualiz, TabConteudo, false);

    printf("\nposicoes abertas: %d\n", cont);
    return 0;
}

