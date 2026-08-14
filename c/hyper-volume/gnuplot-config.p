# Set the output to a png file
set terminal png size 500,500

# The file name
set output 'hyper-volume.png'

# The graphic title
set title 'Hyper volume'

# Plot the grafic
plot "./hyper-volume.csv" linetype 7 linecolor 6