#include<stdio.h>
#include<SFML/Graphics.h>

#define ROWS 20
#define COLUMNS 10

int field[ROWS][COLUMNS] = {0};

int figures[7][4] =
{
    {1, 3, 5, 7}, // I
    {2, 4, 5, 7}, // Z
    {3, 5, 4, 6}, // S
    {3, 5, 4, 7}, // T
    {2, 3, 5, 7}, // L
    {3, 5, 7, 6}, // J
    {2, 3, 4, 5}  // O
};

struct Point
{
    int x;
    int y;
} a[4], b[4];

int main()
{
    int i, j;
    sfVideoMode videoMode = { 320, 480, 32 };
    sfRenderWindow *window;

    window = sfRenderWindow_create(videoMode, "Tetris", sfClose, NULL);

    // Creating sprites
    sfRenderTexture *texture = sfTexture_createFromFile("images/tiles.png", NULL);

    sfSprite *sprite = sfSprite_create();

    sfSprite_setTexture(sprite, texture, 0);

    // Canto superior esquerdo
    // Altura
    // Largura
    sfIntRect frame = {0, 0, 18, 18};
    sfSprite_setTextureRect(sprite, frame);

    while(sfRenderWindow_isOpen(window))
    {
        sfEvent event;

        while(sfRenderWindow_pollEvent(window, &event))
        {
                if(event.type == sfEvtClosed)
                {
                    sfRenderWindow_close(window);
                }
        }

        int index = 2;
        if(a[0].x == 0)
        {
            for(int i = 0; i < 4; i++)
            {
                a[i].x = figures[index][i] % 2;
                a[i].y = figures[index][i] / 2;
            }
        }

        // Draw the window
        sfRenderWindow_clear(window, sfWhite);

        sfRenderWindow_drawSprite(window, sprite, NULL);

        sfRenderWindow_display(window);
    }

    return 0;
}
