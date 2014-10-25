Transaction Monitoring
======================

This application is intended to allow external monitoring solutions such as Pingdom / SiteUptime etc, to hit a webpage and return back the appropriate response should your underlying casperjs test is successful.

Techonologies
============
Transaction Monitoring leverages Hapi for it's web server and the creates a subprocess in which CasperJS is called to do the web testing.
