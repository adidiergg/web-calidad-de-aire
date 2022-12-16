import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
 
  session: {
    strategy: 'jwt',
  },
  providers: [

    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials)
        if(credentials.username==="administrador" && credentials.password==="1234"){
          return { name:"admin"};
        }

        if(credentials.username==="gerente" && credentials.password==="1234"){
          return { name:"gerente"};
        }





        
        return null;
        /*
        const client = await clientPromise();
        const usersCollection = client.db().collection('users');
        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }
        if (credentials.password===user.password) {
          client.close();
          throw new Error('Could not log you in!');
        }

        client.close();
        */
        
      },
      
    }),

    
  ],


});


/*
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  
})

*/