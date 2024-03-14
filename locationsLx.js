class Transition {
    transition(address, arr1, arr2) {
        arr1.length = 0;
        arr2.length = 0;
        let td = document.querySelectorAll('td');
        for (i = 0; i < td.length; i++) {
            td[i].parentNode.removeChild(td[i]);
        }
        Render(address);
    }
}
let trans = new Transition



class Hills {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,0,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0];
    locationName = "Холмы";
    locationPic = "url('FieldsLx/hills1.JPG')";
}

class Hills2 {
    address = [hill];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,new Transition,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0];
    locationName = "Холмы-2";
    locationPic = "url('FieldsLx/hills2.JPG')";
}

class Forest {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,new Transition,0,0,0,0,0,0,0,new Transition,0,0,0,new Transition,0,0,0,0,0,0,0,new Transition,0,0];
    locationName = "Лес";
    locationPic = "url('FieldsLx/forest.JPG')";
}

class Road {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,new Transition,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    locationName = "Дорога";
    locationPic;
}
class Foothills {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,new Transition,0,0,0,0,0,0,0,new Transition,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0];
    locationName = "Предгорья";
    locationPic;
}

class EntranceToTheAlnoyar {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,new Transition,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,new Transition,0,0];
    locationName = "Вход в Альнояр";
    locationPic;
}

class Alnoyar {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,new Transition,0,0,0,0,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0,0,new Transition,0,0];
    locationName = "Альнояр";
    locationPic;
}

class Brook {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,new Transition,0,0];
    locationName = "Ручей";
    locationPic;
}

class AlderForest {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,new Transition,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0];
    locationName = "Ольховый лес";
    locationPic;
}

class AlderForest2 {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,0,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0];
    locationName = "Ольховый лес-2";
    locationPic;
}

class Mountains {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,new Transition,0,0];
    locationName = "Горы";
    locationPic;
}

class EntranceToTheCaves {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,new Transition,0,0,0,new Transition,0,0,0,0,0,0,0,0,0,0];
    locationName = "Вход в пещеры";
    locationPic;
}

class Caves {
    address = [];
    cellsArray = [];
    cellsArrayRow = [];
    cellsArrayContent = [Player,0,0,0,0,0,0,0,0,0,new Transition,0,0,0,Bat,0,0,0,0,0,0,0,0,0,0];
    locationName = "Пещеры";
    locationPic = "url('FieldsLx/caves.JPG')";
}

