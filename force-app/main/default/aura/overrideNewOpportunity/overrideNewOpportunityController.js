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
                    console.log("...:::: ¿ Es de B2B ? ::::...")
                    if(response.getReturnValue() === true){
                        console.log(':::::.... YES ....::::');
                        // SI ES DE B2B, SE REDIRECCIONA
                        var createRecordEvent = $A.get("e.force:createRecord");
                        createRecordEvent.setParams({
                            "entityApiName": "Opportunity",
                            "recordTypeId" : recordTypeId
                        });
                        createRecordEvent.fire();
                    } else {
                    	console.log(':::::.... NO ....::::');
                        // SI NO ES DE B2B, SE MUESTRA UN MENSAJE Y SE CIERRA EL MODAL
                        alert('NO ES POSIBLE CREAR UNA OPORTUNIDAD DE FORMA MANUAL.');
                        component.set("v.notB2B", true);
                    }
        		} else {
            		console.log("Failed with state: " + state);
                }
            });
    	$A.enqueueAction(action);
    }
})