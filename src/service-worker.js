/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';

function readDB() {
  var request = indexedDB.open("mydb", 3);

  request.onsuccess = function (e) {

    var db = e.target.result;

    db.onsuccess = function (e) { console.log("onsuccess DB"); }
    db.onerror = function (e) { console.log("onerror DB"); }

    setInterval(function () {
      var tx = db.transaction(['_ionickv'], "readonly");

      var store = tx.objectStore('_ionickv');
      var r = store.get("tasks");

      r.onsuccess = function (e) {
        var tasks = JSON.parse(r.result);

        console.log(tasks);

        tasks.forEach(function (task) {
          if (task.hour) {
            var now = new Date();
            var hour;
            var minute;

            if (now.getHours() < 10) {
              hour = '0' + now.getHours();
            } else {
              hour = now.getHours() .toString();
            }

            if (now.getMinutes() < 10) {
              minute = '0' + now.getMinutes();
            } else {
              minute = now.getMinutes().toString();
            }

            var hourMinutes = hour + ':' + minute;

            /* Push Notification */
            if (hourMinutes == task.hour) {
              self.registration.showNotification('Check-it', {
                body: task.name,
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: 'task'
              });
            }
          }
        });
      }
    }, 35000);

  };

  request.onerror = function (e) { 
    console.log("onerror"); 
    setTimeout(function () {
      readDB();
    },3000);
  }
}

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('page-v1').then(function(cache) {
      return cache.addAll([
        '/'
      ]);
    })
  );
 });
 
self.addEventListener('activate', function (event) {
  console.log("Activate");
  event.waitUntil(self.clients.claim());
});

readDB();