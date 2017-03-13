# BullHacks
Our thing for BullHacks

The app can be started by running app.rb.

For a more permenant solution that will work when the SSH session isn't running...

First make the following directories inside **`base`** as follows:
```
mkdir tmp
mkdir tmp/sockets
mkdir tmp/pids
mkdir log
```

To start the server, run `unicorn -c unicorn.rb -E development -D` from the **`base`** directory. This will start a Daemon running the website. 

To kill the server, run `cat tmp/pids/unicorn.pid | xargs kill -QUIT`, again from the `base` directory
