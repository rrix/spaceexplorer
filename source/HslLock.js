enyo.kind({
    name: "HslLocks.Main",
    kind: "VFlexBox",
    components: [
        {name: "getLockStatus", kind: "WebService",
            url: "http://172.22.110.15/~access/cgi-bin/access.rb",
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
        this.$.getLockStatus.call({user: "will", pass: "uber", cmd: "status"});
    },

    getStatusCompleted: function(inSender, inResponse, inRequest) {
        if( inRequest.params.cmd == "status" ) {
            var results = inResponse;
            var lines = results.split("\r");
            for (i = 0; i< lines.length; i++){
                var line = lines[i];
                var lockStatus = line.match(/=[ul]/g);
                var lockStatus2 = line.match(/=[ul]/g);
                if(lockStatus2) {
                    lockStatus = lockStatus2;
                }
                if(lockStatus) {
                    lockStatus = lockStatus[0].toString()
                    lockStatus = lockStatus.substr(1,1);

                    this.currentStatus = lockStatus;
                    this.updateColor();
                }
            }
        }

        this.updateColor();
    },

    lockGroupClick: function(inSender, e) {
        this.currentStatus = inSender.getValue().substr(0,1);
        this.$.getLockStatus.call({user: "will", pass: "uber", cmd: inSender.getValue()});
    }
});
