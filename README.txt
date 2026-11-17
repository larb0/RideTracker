RideTracker phone app
=====================
These 4 files are the phone app (index.html, sw.js, manifest.json, icon.svg). They have to live on a web address that starts with https://
(Bluetooth from a web page only works on https). Free and easy: GitHub Pages.

PUT IT ONLINE (once, about 10 minutes)
 1. Make a free account at github.com (or log in).
 2. Top right "+"  ->  New repository.  Name it:  ridetracker   (Public).  Create.
 3. On the new repository page click "uploading an existing file", drag in
    index.html, sw.js, manifest.json, icon.svg   ->  Commit changes.
 4. Settings  ->  Pages  ->  Source: "Deploy from a branch", Branch: main, folder: / (root)  ->  Save.
 5. Wait a minute. Your page is at:  https://YOUR-GITHUB-NAME.github.io/ridetracker/  (or keep your existing mx one)

ON THE PHONE
 Android (S24 FE): open that address in Chrome. Menu (3 dots) -> "Add to Home screen" so it opens like an app.
 iPhone: install the free "Bluefy - Web BLE Browser" app and open the address in it.
 Switch the unit on, tap Connect, pick MX-xxxx. Next time it reconnects by itself.

UPDATING THE PAGE LATER
 Upload the new index.html over the old one on GitHub (same steps 3). Phones pick it up next time they open it.
