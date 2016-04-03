function startScan() {
var url=''
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            /*var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            alert(s);*/
            url=result.text
        },
        function (error) {
            /*alert("Scanning failed: " + error);*/
            url='erro';
        }
    );
    alert(url);
}