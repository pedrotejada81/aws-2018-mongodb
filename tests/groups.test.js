'use strict';

var chai = require('chai');
chai.use(require('chai-things'));
var expect = chai.expect;
var groups = require('../groups.js');

describe('Connect to BD Groups', function() {
    beforeEach(function(done) {
        
        groups.connectDb((err) => {

            if (err) {

                return done(err);

            }    
        
        
       groups.removeAll(function(err) {
            if (err) {
                return done(err);
            }
            
       
           
            groups.add([{
                id: "100",
                name: "Prueba Grunt",
                responsable: "Paola Martinez",
                email: "test@groups.com"
            }, {
                id: "99",
                name: "Mineria de datos",
                responsable: "David Felix",
                email: "test2@groups.com"
            }],done);
        });
    });
    
    });
    
    
    //allGroups===================================================================================================================
      describe('#GET all Groups()', function() {
        it('should return all Groups', function(done) {
            groups.allGroups((err, res) => {
                if (err) {
                    return done(err);
                }
                
                expect(res).to.have.lengthOf(2);
                expect(res).to.contain.an.item.with.property('id', '100');
                expect(res).to.contain.an.item.with.property('id', '99');
                done();
            });
        });
    });
    
    
    
    
    //inicio Prueba metodo get one==============================================================================================
     describe('#Get one Group()', function() {
        it('should return group with id:99', function(done) {
            groups.get('99',(err, res) => {
                if (err) {
                    return done(err);
                
                    }
                expect(res).to.have.lengthOf(1);
                expect(res).to.contain.an.item.with.property('id', '99');
                done();
            });
        });
    });
    
    
    // Fin de Prueba metodo get one 
    
    
   
    
    
     // inicio de Prueba metodo remove all==================================================================================
     
      describe('#Remove all groups()', function() {
        it('should remove all groups', function(done) {
            groups.removeAll((err) => {
                if (err) {
                    return done(err);
                }
                
                groups.allGroups((err,res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(res).to.have.lengthOf(0);
                    
                    done();
                });
            });
        });
    }); 

    
    

    
    
    // inicio de Prueba metodo remove one====================================================================================
    describe('#Remove()', function() {
        it('should remove the group with id:100', function(done) {
            groups.remove('100', (err) => {
                if (err) {
                    return done(err);
                }
                
                groups.allGroups((err,res) => {
                    if (err) {
                        return done(err);
                    }
                    
                    expect(res).to.have.lengthOf(1);
                    expect(res).not.to.contain.an.item.with.property('id', '100');
                    done();
                });
            });
        });
    });  
    
    
     //inicio Prueba metodo update==============================================================================================
     describe('#Update group()', function() {
        it('should return an updated group with id:99/name: Mecatronica', function(done) {
            groups.update('99', {"id":"99","name":"Mecatronica","responsable":"Juan Martinez","email":"updated@group.com"},(err) => {
                if (err) {
                    return done(err);
                
                    }
                    
                     groups.get('99',(err, res) => {
                if (err) {
                    return done(err);
                
                    } 
                expect(res).to.have.lengthOf(1);
                expect(res).to.contain.an.item.with.property('name', 'Mecatronica');
                expect(res).to.contain.an.item.with.property('id', '99');
               done();
            });
        });
    });
     });
    
    
    // Fin de Prueba metodo update
    

});