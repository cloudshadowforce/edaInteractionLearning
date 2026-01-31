({
    doInit : function(component, event, helper) {
        let pageRef = component.get("v.pageReference");
        console.log('pageRef: ', pageRef);
        let recordTypeId = component.get("v.pageReference").state.recordTypeId + '';
        console.log('recordTypeId: ', recordTypeId);
        var action = component.get("c.isB2BRecordType");
        	action.setParams({ oppRecordTypeId : recordTypeId });
    		action.setCallback(this, function(response) {
        		var state = response.getState();
        		if (state === "SUCCESS") {
            		// do something with response.getReturnValue(), such as firing your create event here.
                    console.log("...:::: ¿ Es de B2B ? ::::...")
                    if(response.getReturnValue() === true){
                        console.log(':::::.... YES ....::::');
                    } else {
                    	console.log(':::::.... NO ....::::');
                    }
        		} else {
            		console.log("Failed with state: " + state);
                }
            });
    	$A.enqueueAction(action);
    }
})