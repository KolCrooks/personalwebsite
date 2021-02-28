?> The source code for the server is not available but since this tool was based on an old version, I am able to include the source files for both the tool gen script and the file that it produces.

## About

A large part of my Bulletin's (my company's) main product is the server's API. For every product, you need the api and had to type of the api routes by looking at the documentation about what those routes are, and what they consume. This was the main motivation for creating the tool. Having to hand write everything for every application that uses the api seemed like a recipe for disaster. The other solution would be to hand write the library. While this was what I was doing before I wrote this, it seemed like there was a better way to do it as most of it was just copy and pasting.

## Looking at the data

The server runs on Typescript, and primarily uses a library called `routing-controllers`, which was good because it enabled me to use tool called `ts-morph`. With this tool, I look for controllers and create api modules that would make requests to them.

This would be an example of a `routing controller`:

```ts User.controller.ts
/**
 * Manages the bulletin user route for the server.
 */
@JsonController('/user')
export default class UserController {
  /** ... */
  @Get('/:userId')
  @ResponseSchema(UserPropsSchema)
  @Authorized(DefinedPerm.USER_VIEW)
  async getUser(@Param('userId') userId: string): Promise<UserPropsSchema> {...}

  /**
   * Modify info about a user
   * @param userId id of the user to update
   * @param userObject Information to update the user with
   */
  @Patch('/:userId')
  async modifyUserInfo(
    @CurrentUser({required: true}) client: BulletinClient,
    @Param('userId') userId: string,
    @Body() userObject: ModifyUserInfoValidator
  ): Promise<void> {...}

  ...
}
```

The things that I wanted to focus on extracting information from is

- Controller URL path (`@JsonController('/user')`)
- File Name (`User.controller.ts`)
- Method Names
- Method Decorators -- Ex: `@Get('/:userId')`
- Method Comments
- Method Parameters
- Method Return Type

All of these together will tell me everything I need to know when generating the route in the client.

## Data extraction

To start data extraction, I first needed to find the files that contain the data. To do this, I used a combination of `ts-morph` and `routing-controllers`. `routing-controllers` makes this easy through it's function `getMetadataArgsStorage()` which allows me to view all the controllers that are loaded into the server.

I loop through all of the controllers and get each of their source files, where in this loop I start by:

- Create a new class that will be emitted to the client library
- And extract the jsdoc about the class and put it in the new client library

so far, the output file will look like this:

```ts client.ts
/**
 * Manages the bulletin user route for the server.
 */
export class User {}
```

Next in this loop, we will parse every method. When we parse a method, we:

- Get the name
- Get the JSDoc comments
- Parse the decorators for:
  - The path and path variables
  - The REST request type
  - The response type
  - The required permission level
- Parse the parameters

With all this data, we add the found types to the file that we will emit, and we will also create a method in the output class that has the required data.

This is and example of the output of this step:

```ts client.ts
  /**
   * REQUIRES PERMISSION: USER_VIEW
   *
   * Get a specific User
   * @param token Authorization token for verifying your identity to the server.
   */
  static async getUser(
    token: string,
    userId: string
  ): Promise<UserPropsSchema> {
    const response = await superagent
      .get(`${serverAddress}/api/v1/user/${userId}`)
      .set('authorization', token)
      .set({Accept: 'application/json'});
    if (!response.ok) throw new Error('Error making request');
    return response.body;
  }
```

As you can see, I added a `REQUIRES PERMISSION:` statement on the top of the function to inform the user about the required level, and also copied the jsdoc from the original function. It creates the function body from a template that it fills in and includes all the data needed as parameters for the function. The one problem that I wasn't able to solve was getting the correct parameter comments into the output.

## Conclusion

This tool was very important for the api as it allowed others to easily use api routes that I created. The output file not only looked good, but it also contained all the information that you will need to create applications that used the bulletin API. I am happy to share the output source now because since the creation of this tool, we have moved to a graphql based api as it fits our needs better.

[Script Source](https://gist.github.com/KolCrooks/bcb797bd173b1be9490a2d58187393fe)

[Output File Source](https://gist.github.com/KolCrooks/7aa45111e6a78ef82051199f40cf55f0)
