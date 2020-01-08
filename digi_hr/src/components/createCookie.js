function createCookie(key, value, date) 
        {
            var expiration = new Date(date).toUTCString();
            var cookie = escape(key) + "=" + escape(value) + "; expires=" + expiration + ";" + "path=/";
            document.cookie = cookie;
            console.log(cookie);
            console.log("cookie created with key= " + key + " and value= " + value + " expiration= " + expiration);
        };




export default createCookie;

