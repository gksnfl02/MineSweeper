const grid = document.getElementById('field')
const squares = Array.from(grid.getElementsByTagName('div'))
const buttonGrid = document.getElementsByClassName('buttons')[0]
let buttons = Array.from(buttonGrid.getElementsByTagName('div'))
let mineNumber = 0
const mines = []
const buttonList = Array.from(buttonGrid.getElementsByTagName('button'))
// get info from index
let indexSize = window.getComputedStyle(squares[0]).getPropertyValue('width')
indexSize = Number(indexSize.slice(0, -2)) // delete 'px'
let paddingSize = window.getComputedStyle(squares[0]).getPropertyValue('padding')
paddingSize = Number(paddingSize.slice(0, -2)) // delete 'px'
const cellSize = indexSize + (paddingSize * 2)
let width = window.getComputedStyle(grid).getPropertyValue('width')
width = Number(width.slice(0, -2)) // delete 'px'
width = width / cellSize
let height = window.getComputedStyle(grid).getPropertyValue('height')
height = Number(height.slice(0, -2)) // delete 'px'
height = height / cellSize
let minecount = Number(document.getElementById('minecount').innerHTML)
let normalIndexCount = (width * height) - minecount
let clicked = false
// checklists for each type of indexes
const ulCheck = [1, width, width + 1] // UL Corner
const uCheck = [-1, 1, width - 1, width, width + 1] // U Edge
const urCheck = [-1, width - 1, width] // UR Corner
const lCheck = [-width, -width + 1, 1, width, width + 1] // L Edge
const mCheck = [-width - 1, -width, -width + 1, -1, 1, width - 1, width, width + 1] // Middle
const rCheck = [-width - 1, -width, -1, width - 1, width] // Right Edge
const dlCheck = [-width, -width + 1, 1] // DL Corner
const dCheck = [-width - 1, -width, -width + 1, -1, 1] // D Edge
const drCheck = [-width - 1, -width, -1] // DR Corner
// return a boolean for a location of index
function getLocationAttribute (index) {
  const location = ['ULCorner', 'UEdge', 'URCorner', 'LEdge', 'Middle', 'REdge', 'DLCorner', 'DEdge', 'DRCorner']
  const isAtLeft = index % width === 0
  const isAtRight = index % width === width - 1
  const isAtTop = Math.floor(index / width) === 0
  const isAtBottom = Math.floor(index / width) === height - 1
  if ((isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // UL Corner
    return location[0]
  } else if ((!isAtLeft) && (!isAtRight) && (isAtTop) && (!isAtBottom)) { // U Edge
    return location[1]
  } else if ((!isAtLeft) && (isAtRight) && (isAtTop) && (!isAtBottom)) { // UR Corner
    return location[2]
  } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // L Edge
    return location[3]
  } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (!isAtBottom)) { // MIddle
    return location[4]
  } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (!isAtBottom)) { // R Edge
    return location[5]
  } else if ((isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // DL Corner
    return location[6]
  } else if ((!isAtLeft) && (!isAtRight) && (!isAtTop) && (isAtBottom)) { // D Edge
    return location[7]
  } else if ((!isAtLeft) && (isAtRight) && (!isAtTop) && (isAtBottom)) { // DR Corner
    return location[8]
  }
}
// set timer
let time = Number(document.getElementById('timer').innerHTML)
let timerId = null
let clickCount = 0
// generate a mine field
function generateField () {
  while (mineNumber < minecount) {
    mineNumber++
    const random = Math.floor(Math.random() * width * height)
    if (mines.includes(random)) {
      mineNumber--
    } else {
      mines.push(random)
      squares[random].setAttribute('id', 'mine')
      squares[random].setAttribute('class', 'mine')
    }
  }
}
function insertNumbers () {
  for (let index = 0; index < squares.length; index++) {
    let mineQuantity = 0
    if (!(squares[index].classList.contains('mine'))) {
      getLocationAttribute(index)
      // choose a number for each type of indexes
      if (getLocationAttribute(index) === 'ULCorner') { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'UEdge') { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'URCorner') { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'LEdge') { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'Middle') { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'REdge') { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'DLCorner') { // DL Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[dlCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'DEdge') { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      } else if (getLocationAttribute(index) === 'DRCorner') { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a] + index].classList.contains('mine')) {
            mineQuantity++
          }
        }
      }
      // insert number
      if (mineQuantity !== 0) {
        squares[index].innerHTML = mineQuantity
        squares[index].setAttribute('id', 'filled')
      } else {
        squares[index].setAttribute('id', 'blank')
      }
    } else { // if mine is in this index, skip to next index
      continue
    }
  }
}
// prevent context menu to pop up
document.addEventListener('contextmenu', e => e.preventDefault())
// functions of buttons
// remove buttons
function removeButtons (i) {
  const flagged = buttonList[i].classList.contains('field-button-flagged')
  if (!(flagged) && (buttonList[i].getAttribute('class') !== 'opened-button')) {
    normalIndexCount--
    buttonList[i].setAttribute('class', 'opened-button')
    buttons[i].setAttribute('class', 'opened-button')
    squares[i].setAttribute('class', 'opened-field')
    if ((squares[i].getAttribute('id') !== 'blank') && (squares[i].getAttribute('id') === 'mine')) {
      clearInterval(timerId)
      mines.forEach(index => {
        if (!(flagged)) {
          squares[i].setAttribute('class', 'mine')
          buttonList[index].setAttribute('class', 'opened-button')
          squares[index].style.backgroundColor = 'red'
        }
      })
      alert('망겜')
      removeEListenerAll()
    } else if (squares[i].getAttribute('id') === 'blank') {
      // boolean for a location of the index
      // delete buttons in each type of indexes
      if (getLocationAttribute(i) === 'ULCorner') { // UL Corner
        for (let a = 0; a < ulCheck.length; a++) {
          if (squares[ulCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(ulCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'UEdge') { // U Edge
        for (let a = 0; a < uCheck.length; a++) {
          if (squares[uCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(uCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'URCorner') { // UR Corner
        for (let a = 0; a < urCheck.length; a++) {
          if (squares[urCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(urCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'LEdge') { // L Edge
        for (let a = 0; a < lCheck.length; a++) {
          if (squares[lCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(lCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'Middle') { // MIddle
        for (let a = 0; a < mCheck.length; a++) {
          if (squares[mCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(mCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'REdge') { // R Edge
        for (let a = 0; a < rCheck.length; a++) {
          if (squares[rCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(rCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'DLCorner') { // DL Corner
        for (let a = 0; a < dlCheck.length; a++) {
          if (squares[dlCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(dlCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'DEdge') { // D Edge
        for (let a = 0; a < dCheck.length; a++) {
          if (squares[dCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(dCheck[a] + i)
          }
        }
      } else if (getLocationAttribute(i) === 'DRCorner') { // DR Corner
        for (let a = 0; a < drCheck.length; a++) {
          if (squares[drCheck[a] + i].getAttribute('class') === 'opened-field') {
            continue
          } else {
            removeButtons(drCheck[a] + i)
          }
        }
      }
      gameClear(i)
    }
  }
}
// put/remove a flag on a button
function flag (index) {
  const flagged = buttonList[index].classList.contains('field-button-flagged')
  if (flagged) {
    buttonList[index].setAttribute('class', 'field-button')
    minecount++
    document.getElementById('minecount').innerHTML = minecount
  } else {
    buttonList[index].setAttribute('class', 'field-button-flagged')
    minecount--
    document.getElementById('minecount').innerHTML = minecount
  }
}
// autoclick(wheel click) function
function autoClick (index) {
  let flagQuantity = 0
  // check the number of flags around an index
  if (getLocationAttribute(index) === 'ULCorner') { // UL Corner
    for (let a = 0; a < ulCheck.length; a++) {
      if (buttonList[ulCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'UEdge') { // U Edge
    for (let a = 0; a < uCheck.length; a++) {
      if (buttonList[uCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'URCorner') { // UR Corner
    for (let a = 0; a < urCheck.length; a++) {
      if (buttonList[urCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'LEdge') { // L Edge
    for (let a = 0; a < lCheck.length; a++) {
      if (buttonList[lCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'Middle') { // MIddle
    for (let a = 0; a < mCheck.length; a++) {
      if (buttonList[mCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'REdge') { // R Edge
    for (let a = 0; a < rCheck.length; a++) {
      if (buttonList[rCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'DLCorer') { // DL Corner
    for (let a = 0; a < drCheck.length; a++) {
      if (buttonList[dlCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'DEdge') { // D Edge
    for (let a = 0; a < dCheck.length; a++) {
      if (buttonList[dCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  } else if (getLocationAttribute(index) === 'DRCorner') { // DR Corner
    for (let a = 0; a < drCheck.length; a++) {
      if (buttonList[drCheck[a] + index].classList.contains('field-button-flagged')) {
        flagQuantity++
      }
    }
  }
  if ((Number(squares[index].innerHTML) === flagQuantity) && (squares[index].getAttribute('class')) === 'opened-field') {
    if (getLocationAttribute(index) === 'ULCorner') { // UL Corner
      ulCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'UEdge') { // U Edge
      uCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'URCorner') { // UR Corner
      urCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'LEdge') { // L Edge
      lCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'Middle') { // MIddle
      mCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'REdge') { // R Edge
      rCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'DLCorer') { // DL Corner
      dlCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'DEdge') { // D Edge
      dCheck.forEach(element => removeButtons(element + index))
    } else if (getLocationAttribute(index) === 'DRCorner') { // DR Corner
      drCheck.forEach(element => removeButtons(element + index))
    }
  }
}
// Add functions on buttons
function assignButtonFunction () {
  for (let index = 0; index < buttons.length; index++) {
    buttonList[index].addEventListener('mousedown', (event) => {
      clicked = true
      if ((buttonList[index].getAttribute('class') === 'field-button') && (event.button === 0)) {
        buttonList[index].setAttribute('class', 'field-button-pressed')
      }
    })
    buttonList[index].addEventListener('mouseup', (event) => {
      clicked = false
      buttonControl(event, index)
      gameClear(index)
    })
    buttonList[index].addEventListener('mouseout', () => {
      if ((clicked) && buttonList[index].getAttribute('class') !== 'field-button-flagged') {
        buttonList[index].setAttribute('class', 'field-button')
      }
    })
    buttonList[index].addEventListener('mouseover', (event) => {
      if ((clicked) && (buttonList[index].getAttribute('class') !== 'field-button-flagged') && (event.button === 0)) {
        buttonList[index].setAttribute('class', 'field-button-pressed')
      }
    })
  }
}
// Add functions on field
function assignFieldFunction () {
  for (let index = 0; index < squares.length; index++) {
    squares[index].addEventListener('mousedown', () => {
      clicked = true
      if (getLocationAttribute(index) === 'ULCorner') {
        for (let a = 0; a < ulCheck.length; a++) { // UL Corner
          if (buttonList[index + ulCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + ulCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'UEdge') {
        for (let a = 0; a < uCheck.length; a++) {
          if (buttonList[index + uCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + uCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'URCorner') {
        for (let a = 0; a < urCheck.length; a++) {
          if (buttonList[index + urCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + urCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'LEdge') {
        for (let a = 0; a < lCheck.length; a++) {
          if (buttonList[index + lCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + lCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'Middle') {
        for (let a = 0; a < mCheck.length; a++) {
          if (buttonList[index + mCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + mCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'REdge') {
        for (let a = 0; a < rCheck.length; a++) {
          if (buttonList[index + rCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + rCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'DLCorner') {
        for (let a = 0; a < dlCheck.length; a++) {
          if (buttonList[index + dlCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + dlCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'DEdge') {
        for (let a = 0; a < dCheck.length; a++) {
          if (buttonList[index + dCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + dCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      } else if (getLocationAttribute(index) === 'DRCorner') {
        for (let a = 0; a < drCheck.length; a++) {
          if (buttonList[index + drCheck[a]].getAttribute('class') === 'field-button') {
            buttonList[index + drCheck[a]].setAttribute('class', 'field-button-pressed')
          }
        }
      }
    })
    squares[index].addEventListener('mouseout', event => {
      for (let element = 0; element < buttonList.length; element++) {
        if (buttonList[element].getAttribute('class') === 'field-button-pressed') {
          buttonList[element].setAttribute('class' , 'field-button')
        }
      }
    })
    squares[index].addEventListener('mouseover', () => {
      if (clicked) {
        if (getLocationAttribute(index) === 'ULCorner') {
          for (let a = 0; a < ulCheck.length; a++) { // UL Corner
            if (buttonList[index + ulCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + ulCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'UEdge') {
          for (let a = 0; a < uCheck.length; a++) {
            if (buttonList[index + uCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + uCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'URCorner') {
          for (let a = 0; a < urCheck.length; a++) {
            if (buttonList[index + urCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + urCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'LEdge') {
          for (let a = 0; a < lCheck.length; a++) {
            if (buttonList[index + lCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + lCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'Middle') {
          for (let a = 0; a < mCheck.length; a++) {
            if (buttonList[index + mCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + mCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'REdge') {
          for (let a = 0; a < rCheck.length; a++) {
            if (buttonList[index + rCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + rCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'DLCorner') {
          for (let a = 0; a < dlCheck.length; a++) {
            if (buttonList[index + dlCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + dlCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'DEdge') {
          for (let a = 0; a < dCheck.length; a++) {
            if (buttonList[index + dCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + dCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        } else if (getLocationAttribute(index) === 'DRCorner') {
          for (let a = 0; a < drCheck.length; a++) {
            if (buttonList[index + drCheck[a]].getAttribute('class') === 'field-button') {
              buttonList[index + drCheck[a]].setAttribute('class', 'field-button-pressed')
            }
          }
        }
      }
    })
    squares[index].addEventListener('mouseup', event => {
      for (let element = 0; element < buttonList.length; element++) {
        if (buttonList[element].getAttribute('class') === 'field-button-pressed') {
          buttonList[element].setAttribute('class' , 'field-button')
        }
      }
      fieldControl(event, index)
      clicked = false
      gameClear(index)
    })
  }
}
// game clear
function gameClear (index) {
  if ((normalIndexCount === 0) && (squares[index].getAttribute('id') !== 'mine')) {
    alert('축하드립니다!\n기록: ' + time + '초')
    removeEListenerAll()
    clearInterval(timerId)
  }
}
// button control function
function buttonControl (event, index) {
  if ((event.button === 0) || (event.button === 1)) {
    clickCount++
    removeButtons(index)
  } else if (event.button === 2) {
    clickCount++
    flag(index)
  }
  if ((clickCount === 1) && !(squares[index].classList.contains('mine'))) { // start timer
    timerId = setInterval(() => {
      time++
      document.getElementById('timer').innerHTML = time
    }, 1000)
  }
}
function fieldControl (event, index) {
  if ((event.button === 0) || (event.button === 1)) {
    autoClick(index)
    clicked = false
  }
}
// remove button event
function removeEListenerAll () {
  const gridClone = grid.cloneNode(true)
  const buttonGridClone = buttonGrid.cloneNode(true)
  grid.parentNode.replaceChild(gridClone, grid)
  buttonGrid.parentNode.replaceChild(buttonGridClone, buttonGrid)
}
generateField()
insertNumbers()
assignButtonFunction()
assignFieldFunction()
