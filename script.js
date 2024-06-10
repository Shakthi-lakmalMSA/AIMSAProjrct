window.addEventListener("load", function() {
    document.getElementById('capture').onchange = function (evt) {
        var tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        // FileReader support
        if (FileReader && files && files.length) {
            var fr = new FileReader();
            fr.onload = function () {
                document.getElementById('PredictedPicture').src = fr.result;
            }
            fr.readAsDataURL(files[0]);
        }
    }

    button.addEventListener("click", function() {
        const file = document.getElementById('capture').files[0];
        var URL = "https://bagprintdetectionmodel-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/181d35af-3fec-49c7-aa7c-8c9140d76d63/classify/iterations/Iteration1/image";
        var xhr = new XMLHttpRequest();
        xhr.open('POST', URL, true);
        xhr.setRequestHeader('Prediction-Key','4b8826d6ee7d44aa8458efb48e2f3380');
        xhr.setRequestHeader('Content-Type','application/octet-stream')
        xhr.send(file); 
        xhr.onreadystatechange = processRequest;

        function processRequest(e) {
            if(xhr.readyState == 4 && xhr.status == 200){
                var json = JSON.parse(xhr.responseText);
                json.predictions.sort(function(a, b) {
                    return b.probability - a.probability;
                });
                var highestPrediction = json.predictions[0];
                var table = document.getElementById("myTable");
                var row = table.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                cell1.innerHTML = highestPrediction['tagName'];
                cell2.innerHTML = highestPrediction['probability'] * 100 + '%';
            }
        }
    }, false);
}, false);
