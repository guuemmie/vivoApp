function startScan() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            window.localStorage.setItem('dvc', result.text);
            dvc=result.text;
            /*var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            alert(s);*/
            inicio();
        },
        function (error) {
            window.localStorage.setItem('dvc', '');
            dvc='';
        }
    );
}