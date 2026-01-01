trigger insertNewOpportunity on Opportunity (after insert, after update) {
List<Opportunity> listOppor = new List<Opportunity>();
for(Opportunity opp : Trigger.new)
{
   
   if(opp.StageName == 'Closed Won' && opp.Account != null)
       {
          Opportunity oppNew = opp.clone(false);
          oppNew.Type = 'Upsell';
          Campaign c;
          oppNew.Campaign = c;
          oppNew.StageName = 'Prospecting';
          listOppor.add(oppNew);
       }
    if(listOppor.size() > 0)
     insert listOppor;    
   
}

}