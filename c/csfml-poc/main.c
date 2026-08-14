#include<stdlib.h>
#include<SFML/Graphics.h>
#include<SFML/Window.h>

sfIntRect getSpritePosition(
    int heightSprite,
    int widthSprite,
    int boxesQtd,
    int boxesQtdByLine,
    int boxIndex)
{
    int row = boxIndex / boxesQtdByLine;
    int col = boxIndex % boxesQtdByLine;

    sfIntRect result;
    result.height = heightSprite / (boxesQtd / boxesQtdByLine);
    result.width = widthSprite / boxesQtdByLine;
    result.left = result.width * col;
    result.top = result.height * row;

    return result;
 }

int main()
{
    // Creating window
    sfRenderWindow *window;
    sfVideoMode videoMode = { 800, 600, 32 };
    window = sfRenderWindow_create(videoMode, "Test window", sfResize | sfClose, NULL);

    // Creating sprite and texture
    sfTexture *texture = sfTexture_createFromFile("images/raccoon.jpeg", NULL);
    sfSprite *sprite = sfSprite_create();
    sfSprite_setTexture(sprite, texture, 0);

    // sfIntRect box = boxPosition(366, 860, 10, 5, 8);
    int boxIndex = 0;

    // Sprite scale
    sfVector2f zoomFactor;
    zoomFactor.x = 0.75f;
    zoomFactor.y = 0.75f;
    sfSprite_scale(sprite, zoomFactor);

    sfClock *clock = sfClock_create();

    // Control sprite positions
    float posX = 0.0f, posY = 0.0f;

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

        // Clock to refresh sprite
        sfTime time = sfClock_getElapsedTime(clock);

        if(time.microseconds >= 300000)
        {
            boxIndex++;
            if(boxIndex >= 10)
            {
                boxIndex = 0;
            }

            sfClock_restart(clock);
        }

        // Keyboard threatment
        if(sfKeyboard_isKeyPressed(sfKeyDown))
        {
            posY += 0.5f;
        }

        if(sfKeyboard_isKeyPressed(sfKeyUp))
        {
            posY -= 0.5f;
        }

        if(sfKeyboard_isKeyPressed(sfKeyRight))
        {
            posX += 0.5f;
        }

        if(sfKeyboard_isKeyPressed(sfKeyLeft))
        {
            posX -= 0.5f;
        }

        sfRenderWindow_clear(window, sfBlack);

        sfSprite_setPosition(sprite, (sfVector2f)
        {
            posX, posY
        });

        sfIntRect spriteBox = getSpritePosition(320, 800, 25, 5, boxIndex);

        sfSprite_setTextureRect(sprite, spriteBox);

        sfRenderWindow_drawSprite(window, sprite, NULL);

        sfRenderWindow_display(window);
    }

    return 0;
}
