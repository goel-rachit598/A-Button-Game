var Player1=prompt("Player One: Enter Your Name, You will be Blue");
var Player1Color = 'rgb(86,151,255)';

var Player2=prompt("Player Two: Enter Your Name, You will be Red");
var Player2Color='rgb(237,45,73)';

var game_on=true;
var table =$('table tr');  //jquery call to table having tr tags

//function reportWin(rowNum,colNum)
//{
//  console.log("You, won starting at this row,col");
//  console.log(rowNum);
  //console.log(colNum);
//}

function changeColor(rowIndex,colIndex,color)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);

}

function returnColor(rowIndex,colIndex)
{
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex)
{
  var colorReport=returnColor(5,colIndex);
  for (var row=5 ; row > -1;row--)
  {
    colorReport = returnColor(row,colIndex);
    if(colorReport === 'rgb(128, 128, 128)')
    {
      return row;
    }
  }
}


function colorMathchCheck(one,two,three,four)
{
  return (one===two && one===three && one === four  && one!=='rgb(128, 128, 128)' && one !==undefined)
}

function horizontalWinCheck()
{
  for (var row=0;row<6;row++)
  {
    for (Var=col=0; col<4; col++)
    {
      if(colorMathchCheck(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3)))
      {
        console.log('horiz');
        //reportWin(row,col);
        return true;
      }
      else
      {
        continue;
      }
    }
  }
}

function verticalWinCheck()
{
  for (var row=0;row<7;row++)
  {
    for (Var=col=0; col<3; col++)
    {
      if(colorMathchCheck(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col)))
      {
        console.log('vertical');
      //  reportWin(row,col);
        return true;
      }
      else
      {
        continue;
      }
    }
  }
}

function diagonalWinCheck()
{
  for (var row=0;row<5;row++)
  {
    for (Var=col=0; col<7; col++)
    {
      if(colorMathchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3)))
      {
        console.log('diagonal');
        //reportWin(row,col);
        return true;
      }
      else if(colorMathchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3)))
      {
        console.log('diagonal');
        //reportWin(row,col);
        return true;
      }
      else
      {
        continue;
      }
    }
  }
}

//GAME LOGIC

var currentPlayer=1;
var currentName=Player1;
var currentColor=Player1Color;

$('h3').text(Player1+" it is your turn, pick a column to drop in ! ")

$('.board button').on('click',function()
{
  var col = $(this).closest('td').index();
  console.log(col);
  var bottomAvail=checkBottom(col);
  // console.log(bottomAvail);
  changeColor(bottomAvail,col,currentColor);

  if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck())
  {
    $('h1').text(currentName+" you have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
  }

  currentPlayer=currentPlayer* -1;

  if(currentPlayer === 1)
  {
    currentName=Player1;
    $('h3').text(currentName+ "it is your turn");
    currentColor=Player1Color
  }
  else
  {
    currentName=Player2;
    $('h3').text(currentName+ "it is your turn");
    currentColor=Player2Color;
  }
})
