const graphql = require('graphql');
const Admin = require('../models/admin');
const Distributor = require('../models/distributor');
const Dealer = require('../models/dealer');


const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLID,
        GraphQLNonNull
      } = graphql;


const AdminType = new GraphQLObjectType({
    name : "Admin",
    fields : () => ({
        id :  {type: GraphQLID},
        name : {type: GraphQLString},
        email : {type: GraphQLString},
        phone : {type : GraphQLString},
        distributors : {
            type : new GraphQLList(DistributorType),
            resolve(parent,args){
                return Distributor.find({adminId : parent.id});
            }
        } 
    })
});

const DistributorType = new GraphQLObjectType({
    name : "Distributor",
    fields : () => ({
        id :  {type: GraphQLID},
        name : {type: GraphQLString},
        email : {type: GraphQLString},
        phone : {type : GraphQLString},
        city : {type :GraphQLString},
        admin : {
            type : AdminType,
            resolve(parent,args){
                return Admin.findById(parent.adminId);
            }
        },
        dealers :{
            type : new GraphQLList(DealerType),
            resolve(parent,args){
                return Dealer.find({distributorId : parent.id});
            }
        }
    })
});

const DealerType = new GraphQLObjectType({
    name : "Dealer",
    fields : () => ({
        id :  {type: GraphQLID},
        name : {type: GraphQLString},
        email : {type: GraphQLString},
        phone : {type : GraphQLString},
        city : {type : GraphQLString},
        taluka : {type : GraphQLString},
        distributor : {
            type : DistributorType,
            resolve(parent,args){
                return Distributor.findById(parent.distributorId);
            }
        }
    })
});



const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        admin : {
            type : AdminType ,
            args : {id: {type : GraphQLID}},
            resolve(parent,args){
                return Admin.findById(args.id);
            }
        },
        distributor : {
            type : DistributorType ,
            args : {id: {type : GraphQLID}},
            resolve(parent,args){
                return Distributor.findById(args.id);
            }
        },
        dealer : {
            type : DealerType ,
            args : {id: {type : GraphQLID}},
            resolve(parent,args){
                return Dealer.findById(args.id);
            }
        },
        distributors : {
            type : new GraphQLList(DistributorType),
            resolve(parent,args){
                return Distributor.find({});
            }
        },
        dealers : {
            type : new GraphQLList(DealerType),
            resolve(parent,args){
                return Dealer.find({});
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name : 'Mutation',
    fields : {
        addAdmin : {
            type : AdminType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                email : {type : new GraphQLNonNull(GraphQLString)},
                phone : {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let admin = new Admin({
                    name : args.name,
                    email : args.email,
                    phone : args.phone
                });
                return admin.save();
            }
        },
        addDistributor :{
            type : DistributorType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                email : {type : new GraphQLNonNull(GraphQLString)},
                phone : {type : new GraphQLNonNull(GraphQLString)},
                city : {type : new GraphQLNonNull(GraphQLString)},
                adminId : {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let distributor = new Distributor({
                    name : args.name,
                    email : args.email,
                    phone : args.phone,
                    city : args.city,
                    adminId : args.adminId
                });

                return distributor.save();
            }
        },
        addDealer : {
            type : DealerType,
            args : {
                name : {type : new GraphQLNonNull(GraphQLString)},
                email : {type : new GraphQLNonNull(GraphQLString)},
                phone : {type : new GraphQLNonNull(GraphQLString)},
                city : {type : new GraphQLNonNull(GraphQLString)},
                taluka : {type : new GraphQLNonNull(GraphQLString)},
                distributorId : {type : new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                let dealer = new Dealer({
                    name : args.name,
                    email : args.email,
                    phone : args.phone,
                    city : args.city,
                    taluka : args.taluka,
                    distributorId : args.distributorId
                });

                return dealer.save();
            }
        }

    }
});



module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation : Mutation 
})