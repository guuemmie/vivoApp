function startScan() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            window.localStorage.setItem('device', result.text);
            device=result.text;
            /*var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            alert(s);*/
        },
        function (error) {
            /*alert("Scanning failed: " + error);*/
            url='erro';
        }
    );
}