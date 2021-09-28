/* Windows only */

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <windows.h>
#include <stdbool.h>
 
#define _Tab_H_ 20
#define _Tab_W_ 79
#define _Ship_H_ 5
#define _Ship_W_ 5
#define _UFO_H_  3
#define _UFO_W_  5
#define _Sun_H_  5
#define _Sun_W_  5
#define _Exp_H_ 4 // linhas
#define _Exp_W_ 4 // colunas
#define _Exp_D_ 4 // profundidade
 
 
int RandI(int minVal, int maxVal)
{
    return (double)rand()/RAND_MAX * (maxVal - minVal) + minVal;
}
 
//Defines gotoxy() for ANSI C compilers.
void gotoxy(short x, short y) {
  COORD pos = {y, x};
  SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), pos);
}
 
void ShowScreen( char M[_Tab_H_][_Tab_W_] )
{
    int i,j;
 
    for(i=0; i<_Tab_H_; i++)
    {
        for(j=0; j<_Tab_W_; j++)
        {
            gotoxy(i,j);
            printf("%c", M[i][j]);
        }
    }
}
 
void ClearScreen( char M[_Tab_H_][_Tab_W_] )
{
    int i,j;
 
    for(i=0; i<_Tab_H_; i++)
    {
        for(j=0; j<_Tab_W_; j++)
        {
            M[i][j] = ' ';
        }
    }
}
 
void InsertStars( char M[_Tab_H_][_Tab_W_], int HorizonLine, int Stars )
{
    int i, x, y;
    for(i=0; i < Stars; i++)
    {
        x = RandI(0, HorizonLine-1);
        y = RandI(0, _Tab_W_-1);
        M[x][y] = '.';
    }
}
 
void InsertGround(char M[_Tab_H_][_Tab_W_], int HorizonLine)
{
    // try to insert grass-like stuff
    int i, j;
    for(i=HorizonLine; i < _Tab_H_; i++)
    {
        for(j=0; j < _Tab_W_; j++)
        {
            M[i][j] = '_';
        }
    }
}

void InsertExplosion(char M[_Tab_H_][_Tab_W_], 
                     char Explosion[_Exp_H_][_Exp_W_][_Exp_D_], 
					 int Line, int Column, int Frame)
{
 
    //
    // Insert the desired Explosion frame sprite on the (Line, Column) position on the Screen.
    //
    int j, k;
    for(j=0; j < _Exp_W_; j++)
    {
        for(k=0; k < _Exp_D_; k++)
        {
            M[j+Line][k+Column] = Explosion[Frame][j][k];
        }
    }
}

 
void InsertShip(char M[_Tab_H_][_Tab_W_], char Ship[_Ship_H_][_Ship_W_], int Line, int Column)
{
 
    //
    // Insert the ship sprite on the (Line, Column) position on the Screen
    //
    int i, j;
    for(i=0; i < _Ship_H_; i++)
    {
        for(j=0; j < _Ship_W_; j++)
        {
            M[i+Line][j+Column] = Ship[i][j];
        }
    }
}
 
void InsertUFO(char M[_Tab_H_][_Tab_W_], char UFO[_UFO_H_][_UFO_W_], int Line, int Column)
{
 
    //
    // Insert the UFO sprite on the (Line, Column) position on the Screen
    //
    int i, j;
    for(i=0; i < _UFO_H_; i++)
    {
        for(j=0; j < _UFO_W_; j++)
        {
            M[i+Line][j+Column] = UFO[i][j];
        }
    }
}

void InsertSun(char M[_Tab_H_][_Tab_W_], char Sun[_Sun_H_][_Sun_W_], int Line, int Column)
{
 
    //
    // Insert the SUN sprite on the (Line, Column) position on the Screen
    //
    int i, j;
    for(i=0; i < _Sun_H_; i++)
    {
        for(j=0; j < _Sun_W_; j++)
        {
            M[i+Line][j+Column] = Sun[i][j];
        }
    }
}

 
int main()
{
 
  char M[_Tab_H_][_Tab_W_];
  char Ship[_Ship_H_][_Ship_W_] = { {' ',' ',241,' ',' '},
                                    {193,201,254,187,193},
                                    {219,186,001,186,219},
                                    {' ',200,254,188,' '},
                                    {' ',' ',' ',' ',' '} };
 
  char UFO[_UFO_H_][_UFO_W_] = { {' ',242,242,242,' '},
                                 {191,177,001,177,218},
                                 {' ',219,219,219,' '} };
 
  char Sun[_Sun_H_][_Sun_W_] =
                 {
  	               {' ',' ',176,' ', ' '},
  	               {' ',176,177,176, ' '},
  	               {176,177,178,177, 176},
  	               {' ',176,177,176, ' '},
  	               {' ',' ',176,' ', ' '}
                 };
 
   char Explosion[_Exp_H_][_Exp_W_][_Exp_D_] =
                             { { {' ', ' ', ' ', ' '}, 
                                 {' ', 254, 254, ' '}, 
                                 {' ', 254, 254, ' '},
						         {' ', ' ', ' ', ' '} },
						   
                               { {' ', 254, 254, ' '}, 
         						 {254, 178, 178, 254},
						         {254, 178, 178, 254}, 
						         {' ', 254, 254, ' '} },

						       { {'\\', '|', '|', '/'}, 
						         {249, 177, 177, 249},
						         {249, 177, 177, 249}, 
						         {'/', '|', '|', '\\'} },

                               { {'\\', ' ', 249, '/'}, 
						         {' ', 249, ' ', ' '},
						         {' ', ' ', 249, ' '}, 
						         {'/', 249, ' ', '\\'} }

					         };
 
 
  char lastHit;
  
  system("mode 80,40");
  srand(time(NULL));
 
  ClearScreen (M);
  InsertStars (M, 15, 10);
  InsertGround(M, 15);
 
  //to center the ship
  int ShipPosX =  _Tab_H_ - _Ship_H_ ;
  int ShipPosY = (_Tab_W_ - _Ship_W_) / 2;
  InsertShip(M, Ship, ShipPosX, ShipPosY);
 
  // UFO initial position
  int UFOPosX = 5;
  int UFOPosY = 0;
  int UFODirection = 0; // 0: to right. 1: to left

  // Fallen UFO settings
  int FUFOPosX = 0;
  int FUFOPosY = RandI(0, _Tab_W_ - _UFO_W_);
  
  // explosion control
  int  ExplosionPosX  = 10;
  int  ExplosionPosY  = 10;
  int  ExplosionFrame =  0;
  bool ExplosionActivate = false;
   
    
  ShowScreen  (M);
 
 
  while(1)
  {
      if(kbhit())
      {
          char hit = getch();
          switch(hit)
          {
              case 'H': case 'W': case 'w': ShipPosX--; break; // go up
              case 'P': case 'S': case 's': ShipPosX++; break; // go down
          }
 
          // prevents the ship to extrapolate the screen limits.
          if(ShipPosX <0) ShipPosX=0;
          if(ShipPosX > (_Tab_H_-_Ship_H_)) ShipPosX = (_Tab_H_-_Ship_H_);
          
          // saves the last hit
          lastHit = hit;
      }
 
      // finally, updates the screen.
      ClearScreen (M);
      InsertStars (M, 15, 10);
      InsertGround(M, 15);
      InsertSun   (M, Sun, 1, 1);

      // Fallen UFO must explode when hit the ground!
	  if(ExplosionActivate)
	  {
	     InsertExplosion(M, Explosion, ExplosionPosX, ExplosionPosY, ExplosionFrame);	
	     ExplosionFrame++;
	     if(ExplosionFrame>=4)
	     {
	     	ExplosionActivate = false;
	     	ExplosionFrame = 0;
		 }
	  }
	  
      
            
      InsertUFO   (M, UFO, UFOPosX, UFOPosY);
      InsertUFO   (M, UFO, FUFOPosX, FUFOPosY); // fallen UFO!
      InsertShip  (M, Ship, ShipPosX, ShipPosY);
      ShowScreen  (M);
      printf("\nLast Command: %c", lastHit);
 
      // update object positions
      // UFO
      if(UFODirection==0) // right
      {
		UFOPosY++;
        if(UFOPosY >= (_Tab_W_ - _UFO_W_))
		{
		   UFOPosY = (_Tab_W_ - _UFO_W_);	
		   UFODirection = 1;
		} 
	  } 
	  else // to left
      {
		UFOPosY--;
        if(UFOPosY <= 0)
		{
		   UFOPosY = 0;	
		   UFODirection = 0;
		} 
	  }

      // fallen UFO
      if(FUFOPosX >= (_Tab_H_ - _UFO_H_)) // atingiu o solo?
      {
        ExplosionActivate = true;
		ExplosionPosX = _Tab_H_ - 4;
		ExplosionPosY = FUFOPosY;
      	FUFOPosX = 0;
		FUFOPosY = RandI(0, _Tab_W_ - _UFO_W_);
		//FUFOPosY = _Tab_W_ - 5; // teste teste
	  }
	  else
	  {
	  	FUFOPosX++;
	  }
  }
 
    return 0;
}