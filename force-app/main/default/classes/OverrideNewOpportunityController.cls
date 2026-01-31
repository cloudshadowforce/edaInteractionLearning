public with sharing class OverrideNewOpportunityController {
    @AuraEnabled
    public static Boolean isB2BRecordType(Id oppRecordTypeId) {
        System.debug('OverrideNewOpportunityController :::: isB2BRecordType ::: oppRecordTypeId: ' + oppRecordTypeId);
        Boolean isB2B = false;
        List<String> b2bRecordTypeNames = new List<String>{
            // 'No_B2B',
            // 'No_B2B_2',
            // 'No_B2B_3',
            'B2B'
        };
        try {
            //Opportunity opp = [SELECT Id, RecordTypeId FROM Opportunity WHERE Id = :oppRecordTypeId LIMIT 1];
            String oppRecordType = Schema.SObjectType.Opportunity.getRecordTypeInfosById().get(oppRecordTypeId).getDeveloperName();
            System.debug('OverrideNewOpportunityController :::: isB2BRecordType ::: oppRecordType: ' + oppRecordType);
            isB2B = b2bRecordTypeNames.contains(oppRecordType) ? true : false;
        } catch (Exception e) {
            throw new AuraHandledException('Error checking Record Type: ' + e.getMessage());
        }
        return isB2B;
    }
}