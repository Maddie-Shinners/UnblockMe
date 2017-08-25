# Unit-1-Project

Unblock Me is a grid puzzle game. I created Unblock Me using jquery. The object of the game is to move a given block to the bottom right position by moving all other blocks out of its path. Blocks can only move directly into empty spaces. The user clicks the arrows on a block to move that block one position in the clicked direction. The goal is to move the given block to the exit in as few clicks as possible.

Process:
In order to create Unblock Me, I began by creating a simple square grid 3x3, 4x4, or 5x5 blocks. I then added buttons to each box except the empty box(es). Each box has a class which determines its state (the special box to be moved to the exit, an empty square, or a blocker). I created one function that could create a board of any dimensions. I decided to allow the user to input values that get passed to this function to create the board. I have three main views. The first is the view where the use inputs the size of the board. The second is the board itself where the user plays. I decided to leave the header and instructions on the screen so the user could see them as they play. The third view appears when you win. It has a message saying you've won and the highscores list. When this screen appears, I get rid of the table and blur the rest of the content so it doesn't distract from the win screen.

Roadblocks:
One roadblock I faced was created when I tried to refresh the board and allow the user to play multiple times. When I refreshed the board, instead of removing the board I hid it and created a new one. This caused problems because the user sees the new board, but the code was still accessing the old board. I eventually realized the issue and switched from hiding the board to removing it.

Bugs:
Currently, if the user wins and submits their username, the screen displays the name and score. However, if the user hits the submit button again, another list of high scores is appended with a duplicate of the most recent addition. Instead, I would like all submits after the first one to be ignored.

Wins and Challenges:
My biggest wins were getting the buttons to work correctly and randomizing the positions and numbers of empty/non-empty boxes as well as the position of the special block. To create the button functionality, I added a click event listener each time an individual button was created. The callback function checks if the adjacent box in the given direction is empty. If so, it switches the properties of the two boxes. To randomize the box positions and numbers, I give each space in the grid an index id. I generate random numbers to assign to the indices and then give those boxes the appropriate classes.

Future Features:
I would like to implement a timer so that you're success can be measured in both number of clicks and time. The user could also set the timer so that you lose when time runs out. Also, all of the blocks are currently square, and I would like to have rectangular blocks as well. I tried this, but then you have to update the width/height of the blocks as well as the number of blocks per row/column. I wasn't able to get it working without significant bugs. 
