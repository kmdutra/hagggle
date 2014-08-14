Hagggles = new Meteor.Collection('hagggles');

Hagggles.allow({
//only allow inserting if the user is not anonymous, and the document
//being inserted belongs to the user inserting it.      
    'insert': function(userId, doc) {           
        return true
    }        
});