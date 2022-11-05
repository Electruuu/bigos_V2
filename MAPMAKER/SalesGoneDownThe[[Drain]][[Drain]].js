function generateMatrix() {
    let matrixSize = document.forms.uwu.msize
    console.log(matrixSize)
    let flop = 0
    for (let i = 0; i < matrixSize.value; i++) {
        let headDiv = document.createElement('div')

        for (let j = 0; j < matrixSize.value; j++) {
            let tempDiv = document.createElement('div')
            tempDiv.classList.add('clickbox')
            tempDiv.style.width = 20 + 'px'
            tempDiv.style.height = 20 + 'px'
            tempDiv.id= flop;
            flop++
            headDiv.appendChild(tempDiv)
        }
        document.getElementById('inpMatr').appendChild(headDiv)
    }
    let divs = document.getElementsByClassName('clickbox')
    for (let i = 0; i < matrixSize.value**2; i++) {
        console.log(divs[i], matrixSize.value**2)
        if (i != matrixSize.value**2) {
            divs[i].addEventListener('click',changeCell)
        }
    }
    function changeCell(event) {
        let cords = event.target.id
        console.log(cords%matrixSize.value, parseInt(cords/matrixSize.value))
        let xt = parseInt(cords/matrixSize.value)*document.forms.uwu.factor.value
        let yt = (cords%matrixSize.value)*document.forms.uwu.factor.value
        for (let i in map[0].x) {
            if (xt == map[0].x[i] && yt == map[0].y[0]) {
                map[0].x.splice(i,1)
                map[0].y.splice(i,1)
                event.target.style.backgroundColor = '#ff000000'
                return 0;
            }
        }
        map[0].x.push(xt)
        map[0].y.push(yt)
        console.log(map)
        event.target.style.backgroundColor = '#ff0000'
        
    }
}

let hidDiv = document.getElementById('hid')

document.forms.uwu.msize.addEventListener('change', (value) => {hidDiv.hidden=false; console.log(2)})

document.forms.uwu.sub.addEventListener('click', ()=>{generateMatrix()})

let map = [
    {type: 'wall', x:[], y:[]}
]

function downloadFile(file) {
    // Create a link and set the URL using `createObjectURL`
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = URL.createObjectURL(file);
    link.download = file.name;
  
    // It needs to be added to the DOM so it can be clicked
    document.body.appendChild(link);
    link.click();
  
    // To make this work on Firefox we need to wait
    // a little while before removing it.
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
      link.parentNode.removeChild(link);
    }, 0);
}

// Dynamically create a File
console.log(JSON.stringify(map))
//const myFile = new File([JSON.stringify(map)], document.getElementById('fname').value != '' ? document.forms.uwu.fname.value : `map${(((new Date()).getTime()-((newDate()).getTime()/(10**9))%2)*(10**15))%(10**8)}.json`);
 
// Download it using our function
document.getElementById('down').addEventListener('click', ()=>{
    console.log(JSON.stringify(map))
    const myFile = new File([JSON.stringify(map)], document.getElementById('fname').value != '' ? document.forms.uwu.fname.value : `map${(((new Date()).getTime()-((new Date()).getTime()/(10**9))%2)*(10**15))%(10**8)}.json`);
    downloadFile(myFile)
})

  
