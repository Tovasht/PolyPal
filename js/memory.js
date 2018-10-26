// Save & load a picture from localstorage

const saveButton = document.querySelector(".save")
    , loadButton = document.querySelector(".load")
    , resetButton = document.querySelector(".reset");

const resetPicture = () => {
    points = [{x : startX, y : startY},
      {x : startX + size, y : startY},
      {x : startX + size, y : startY + size},
      {x : startX, y : startY + size}
    ];
    grids = [];
    grids.push(new Grid(points, "right"));
}

const loadPicture = () => {
   let picture = window.localStorage.getItem("picture");

    if(picture) {
        let pictureData = JSON.parse(picture);
        let gridArrays = pictureData.gridArrays;
        
        grids = [];
        points = pictureData.points;

        gridArrays.map(array => {
            let newArray = [];

            array = array.map(p => {
                for(var i = 0; i < points.length; i++) {
                    let existingPoint = points[i];
                    if(comparePoints(p,existingPoint)) {
                        return existingPoint;
                    }
                }
            });
            grids.push(new Grid(array, "top"));
        });
        return true;
    } else {
        return false;
    }
}

saveButton.addEventListener("click", () => {
    let gridArrays = grids.map(grid => {
        return grid.points;
    });

    window.localStorage.setItem("picture", JSON.stringify({
        gridArrays : gridArrays,
        points : points
    }));
});

loadButton.addEventListener("click", () => {
    loadPicture();
});

resetButton.addEventListener("click", () => {
    resetPicture();
});

