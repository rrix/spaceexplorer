enyo.kind({
    name: "EnyoTasks.Main",
    kind: "HFlexBox",
    components: [
        {kind: "SlidingPane", flex:1, components: [
            {name: "left", width:"300px", edgeDragging: true, components: [
                {kind:"EnyoTasks.ProjectList", onOpenProject: "openProject"}
            ]},
            {name: "right", flex:1, edgeDragging: true, components: [
                {kind:"EnyoTasks.TasksList", name: "tasksList"}
            ]}
        ]}
    ],

    openProject: function(sender, project) {
        this.$.tasksList.open(project);
    }
});
