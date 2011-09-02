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
                {caption: "Locked", icon: "images/lock.png", value: "lock"},
                {caption: "Unlocked", icon: "images/unlocked.png", value: "unlock"}
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
            color = "red";
        } else {
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
