var api = {
    method: "GET",
    fetchData: function (url) {
        return new Promise((resolve, reject) => {
            var http = new XMLHttpRequest();
            console.log(this.method, url);
            http.open(this.method, url);
            http.send();
            http.onreadystatechange = (e) => {
                var response = http.responseText;
                var responseJSON = JSON.parse(response);
                resolve(responseJSON)
            }
        })
    },

    setMethod(method = "GET" | "POST") {
        this.method = method;
    }


}
