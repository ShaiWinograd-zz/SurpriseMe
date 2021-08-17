# SurpriseMe! API

- **Version** - 1.0.0
- **Author** - Shai Winograd
- **Description** - This api returns a surprising response, according to the parameters passed by the client.

## Guide to run the code - 

Navigate to the *SurpriseMe!-api* directory in terminal or command line.
To do so copy the path to it and use the `cd` command. 
Afterwards run the following command - 
`node app.js`. Then open the browser by clicking on the url pasted to the log (if you're using macOS hold cmd and double click the url).

Now you can choose between two options - 
- <u>Getting a surprise response</u>, to do so add **/api/surprise?name=*name*&birth_year=*year*** to the url.
Make sure you pass both parameters. For example - 
(http://localhost:3000/api/surprise?name=shai%20Winograd&birth_year=1996).
- <u>Getting statistics</u> of all previous calls to the api, to do so add  **/api/stats** to the url, For example - (http://localhost:3000/api/stats).

Enjoy!