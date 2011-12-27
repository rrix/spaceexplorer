enyo.kind({
    name: "HslLocks.Main",
    kind: "VFlexBox",
    components: [
        {name: "getLockStatus", kind: "WebService",
            url: "http://hsl-access/~access/cgi-bin/access.rb",
            onSuccess: "getStatusCompleted",
            onFailure: "getStatusFailed"},
        {kind: "RadioGroup", name: "lockGroup", onclick: "lockGroupClick",
            components: [
                {name: "lockedButton", caption: "Locked", icon: "images/lock.png", value: "lock", style:"font-size:48px"},
                {name: "unlockedButton", caption: "Unlocked", icon: "images/unlocked.png", value: "unlock", style:"font-size:48px"}
            ]
        }
    ],

    create: function() {
        this.inherited(arguments);

        this.currentStatus = this.getCurrentStatus();
        this.timerOpen = true;

        setTimeout( "hslLock.getCurrentStatus()", 30000 );
    },

    updateColor: function() {
        var color;
        if(this.currentStatus == "l"){
            this.$.lockedButton.setState("depressed", true);
            this.$.unlockedButton.setState("depressed", false);
            color = "red";
        } else {
            this.$.unlockedButton.setState("depressed", true);
            this.$.lockedButton.setState("depressed", false);
            color = "green";
        }
        this.applyStyle("background" , color);
    },

    getCurrentStatus: function() {
        this.$.getLockStatus.call({user: "XXXX", pass: "XXXX", cmd: "status"});
    },

    getStatusCompleted: function(inSender, inResponse, inRequest) {
        if( inRequest.params.cmd == "status" ) {
            var results = inResponse;
            var lines = results.split("\r");
            for (i = 0; i< lines.length; i++){
                var line = lines[i];
                var lockStatus = line.match(/[0-9]$/g);
                var lockStatus2 = line.match(/[0-9]$/g);
                if(lockStatus2) {
                    lockStatus = lockStatus2;
                }
                if(lockStatus) {
                    lockStatus = lockStatus[0].toString()

                    this.currentStatus = lockStatus;
                    this.updateColor();
                }
            }
        }

        this.timerOpen = true;
        this.updateColor();
    },

    getStatusFailed: function(inSender, inError) {
        this.timerOpen = true;
    },

    lockGroupClick: function(inSender, e) {
        if(this.timerOpen) {
            this.currentStatus = inSender.getValue().substr(0,1);
            this.$.getLockStatus.call({user: "XXXX", pass: "XXXX", cmd: inSender.getValue()});
            this.timerOpen = false;
        }
    }
});
