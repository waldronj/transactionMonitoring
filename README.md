Transaction Monitoring
======================

This application is intended to allow external monitoring solutions such as Pingdom / SiteUptime etc, to hit a webpage and return back the appropriate response should your underlying casperjs test is successful.

Technologies
============
Transaction Monitoring leverages https://github.com/hapijs/hapi for it's web server and the creates a subprocess in which http://docs.casperjs.org is called to do the web testing.

Getting Started
---------------
- npm install -g phantomjs
- npm install -g casperjs
- npm install -g hapi
- Start creating your CasperJS tests in the siteTests dir.

Using
-----
Start your app `node app.js` load the webpage in a broswer, `localhost` this should return "Transaction Monitoring" to test your custom CasperJS scripts navigate to `localhost/checks/googleFR` as an example. Notice googleFR is already in the siteTests folder.


Acknowledgements
-----
* The web UI theme is provided by http://www.blacktie.co/demo/dashgumfree/index.html under the Creative License, http://www.blacktie.co/about-themes/ 
* The xml formatting on the test harness is accomplished using vkbeautify under the MIT license
