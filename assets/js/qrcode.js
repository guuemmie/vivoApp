function startScan() {

    var url = cordova.plugins.barcodeScanner.scan(
        function (result) {
            /*var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            alert(s);*/
            return result.text
        },
        function (error) {
            /*alert("Scanning failed: " + error);*/

        }
    );
    alert(url);
}