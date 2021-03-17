## Project Goals

This project was my implementation of the graphql query language in C#. My goal was to implement this API from the group up, limiting myself to just a JSON library to help process the JSON data that contains the actual GraphQL Query. Because I wanted to build this from the ground up, I also decided that I wouldn't implement the entire graphql spec. Adding to my current design would be very easy, but it would just take too long and I am more interested in doing other projects.

Things I left out:

- Scheme Generation
- Introspection
- Fragments
- Input
- Aliases
- Directives
- Extensions

## Design

I wanted to design the system more like a library, instead of just a pure server. This was because I wanted the system to be as dynamic as possible, allowing me to easily create new controllers and types without it being a big problem.

I wanted the core of how this system works to be based on C# attributes. I got my inspiration for this design from [TypeGraphQL](https://typegraphql.com/) and it's method of creating controllers and defining types. I use it for the **Bulletin** server and I have had a great experience with it. My goal here is to implement something similar to this in C#.

After thinking about it for a while, I came up with this design:

![Groundwrk Architecture](%architecture%)

(Excuse the bad hand writing)

To explain the image: I have a basic C# httplistener take requests and then send the requests to a thread pool. This thread pool will spawn a thread for each request, allowing for a large number of requests to be processed at once. Each thread will use a parser to transform the request string into a node tree that contains information about each node, and then the fields inside each of those nodes.
An example is to look at this query:

```graphql
{
  Country(Id: ID) {
    Number
    Towns {
      Name
    }
  }
  Population
}
```

This query will get parsed at each node, into this tree:

```json
{
  "Args": {},
  "implicitQuery": true,
  "QueryType": 1,
  "NodeType": null,
  "Name": null,
  "Fields": [
    {
      "Args": {
        "Id": "01234"
      },
      "implicitQuery": true,
      "QueryType": 0,
      "NodeType": {
        "Fields": [
          {
            "isArray": false,
            "type": {
              "TypeRef": "System.Int32",
              "TypeName": "Int"
            },
            "Name": "Number",
            "Nullable": false
          },
          {
            "isArray": false,
            "type": {
              "TypeRef": "System.String",
              "TypeName": "ID",
              "OverrideSameType": true
            },
            "Name": "Id",
            "Nullable": false
          },
          {
            "isArray": true,
            "type": {
              "Fields": [
                {
                  "isArray": false,
                  "type": {
                    "TypeRef": "System.String",
                    "TypeName": "ID",
                    "OverrideSameType": true
                  },
                  "Name": "Name",
                  "Nullable": false
                },
                {
                  "isArray": false,
                  "type": {
                    "TypeRef": "System.String",
                    "TypeName": "ID",
                    "OverrideSameType": true
                  },
                  "Name": "Id",
                  "Nullable": false
                }
              ],
              "TypeRef": "GraphQL_Server.Town",
              "TypeName": "Town",
              "OverrideSameType": false
            },
            "Name": "Towns",
            "Nullable": false
          }
        ],
        "TypeRef": "GraphQL_Server.Country",
        "TypeName": "Country",
        "OverrideSameType": false
      },
      "Name": "Country",
      "Fields": [
        {
          "Args": {},
          "implicitQuery": false,
          "QueryType": 4,
          "NodeType": {
            "TypeRef": "System.Int32",
            "TypeName": "Int",
            "OverrideSameType": false
          },
          "Name": "Number",
          "Fields": []
        },
        {
          "Args": {},
          "implicitQuery": false,
          "QueryType": 4,
          "NodeType": {
            "Fields": [
              {
                "isArray": false,
                "type": {
                  "TypeRef": "System.String",
                  "TypeName": "ID",
                  "OverrideSameType": true
                },
                "Name": "Name",
                "Nullable": false
              },
              {
                "isArray": false,
                "type": {
                  "TypeRef": "System.String",
                  "TypeName": "ID",
                  "OverrideSameType": true
                },
                "Name": "Id",
                "Nullable": false
              }
            ],
            "TypeRef": "GraphQL_Server.Town",
            "TypeName": "Town",
            "OverrideSameType": false
          },
          "Name": "Towns",
          "Fields": [
            {
              "Args": {},
              "implicitQuery": false,
              "QueryType": 4,
              "NodeType": {
                "TypeRef": "System.String",
                "TypeName": "ID",
                "OverrideSameType": true
              },
              "Name": "Name",
              "Fields": []
            }
          ]
        }
      ]
    },
    {
      "Args": {},
      "implicitQuery": true,
      "QueryType": 0,
      "NodeType": {
        "Fields": [
          {
            "isArray": false,
            "type": {
              "TypeRef": "System.Int32",
              "TypeName": "Int",
              "OverrideSameType": false
            },
            "Name": "populationAbove50",
            "Nullable": false
          },
          {
            "isArray": false,
            "type": {
              "TypeRef": "System.Int32",
              "TypeName": "Int",
              "OverrideSameType": false
            },
            "Name": "populationBelow50",
            "Nullable": false
          }
        ],
        "TypeRef": "GraphQL_Server.Population",
        "TypeName": "Population",
        "OverrideSameType": false
      },
      "Name": "Population",
      "Fields": []
    }
  ]
}
```

As you can see, it generates a lot of data. This data is useful though because it contains all the information for the executer to execute the query, and the pruner to remove all the data that might have been accidentally included by the query/mutation function.

The Executor will find the queries from the node tree, and look in the controllers for the method that matches the request. After the query is executed, it will verify the fields to look for extra or missing fields. It will the `@fieldresolver` function for each of the missing fields. This will be done recursively until the entire data tree is filled and matches the request.

## The Controllers

Controllers are classes that contain queries related to a specific type.

Consider the class Country and Town:

```cs
   public class Town
   {
      public string Name { get; set; }
      public string Id { get; set; }
   }


   public class Country
   {
      public int Number { get; set; }
      public string Id { get; set; }

      public Town[] Towns { get; set; }
   }
```

We can make a controller for country easily by doing this:

```cs
   [GQLController(type = typeof(Country))]
   public class CountryController : GraphQLController
   {

      [Query(Name = "getCountry", Default = true)]
      public Country getCountry(
         [Arg("Id", typeof(GraphQLTypeIntrinsic.ID))]
         string id)
      {
         return Countries.Find(c => c.Id == id);
      }
   }
```

Making the request:

```graphql
{
  Country(Id: ID)
}
```

or

```graphql
query getCountry($Id: ID) {
  Country
}
```

Will produce the country with that id. But lets say that `Towns` is actually stored in a seperate object somewhere. It would be expensive to get that field if the client doesn't want it.

We can make so that `getCountry()` only returns a portion of the Country so that this query:

```graphql
{
  Country(Id: ID) {
    Number
    Id
  }
}
```

Only returns the country with the ID and Number. We then put towns in it's own method called a field resolver:

```cs
   [FieldResolver(Name = "Towns")]
   public Town[] Towns([Root] Country root)
   {
      if (Towns.ContainsKey(root.Id))
            return Towns[root.Id].ToArray();

      return new Town[] { };
   }
```

The executer passes the parent `Country` into the field resolver so that it can use the Country's ID to find the towns related to it. This can work recursively where Town contains its own field resolvers, and so on.

The final method type in these controllers are `mutations`

Here is what that would look like:

```cs
   [Mutation(Name = "addCountry")]
   public Country addCountry([Arg("Id", typeof(GraphQLTypeIntrinsic.ID))]
      string Id,
      [Arg("number", typeof(GraphQLTypeIntrinsic.Int))]
      int number)
   {
      var created = new Country() {Id = Id, Number = number};
      _countries.Add(created);
      return created;
   }
```

Where mutation request like this would resolve to it:

```graphql
query addCountry($Id: ID, $number: Int) {
  Country
}
```

All this together creates an effective system that allows fast execution of requests.

When I benchmarked the program, it was able to processing 10,000 of these query requests in ~1850ms on a Ryzen 9 5900X:

```graphql
{
  Country(Id: ID) {
    Number
    Towns {
      Name
    }
  }
  Population
}
```

## Conclusion

I really liked doing this project. I have never really worked with parsers before because working with strings is never nice. I learned a lot about effective parsing techniques where I ended up rewriting my hacky original code to allow for easy expandability.
