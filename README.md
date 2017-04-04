# Train Tracker
A semi-functional web application for the real time tracking of trains between Sheffield and London St. Pancras. Dreamt up while on a train, and after navigating a poorly signposted train station, only to realise it had already been done.

Location representation hasn't been properly implemented yet.

To start the app, navigate to the `/base` directory and run:

```
rackup -p 4567
```

Or the port of your choice.

If you want to run the app in production as a Daemon, run

```
rackup -p 4567 -E production -D
```
