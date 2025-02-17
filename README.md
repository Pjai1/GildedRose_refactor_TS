# Approach

- Check base files provided (editorconfig, jest config & tsconfig) and amend if necessary
- Choose jest as testing framework, remove other deps (keep it clean)
- Add prettier for proper code formatting
- Do quick check of `gilded-rose.ts` and improve base typing
  - Seems like the item of a name could be narrowed down with a union type?
- Read requirements + make base test cases
  - Start with Aged Brie
  - Continue with Sulfuras cases
  - End with Backstage passes
  - Since we have coverage reports we can check what tests could be missing (result 100% so all good)
- Do some base readability changes in main file whilst watching test file
  - Add specific types aliases for known items
  - Add MAX QUALITY const
- Extract Aged Brie functionality separately and apply to main fn
- Extract Sulfuras functionality separately and apply to main fn
  - Add default quality const for Sulfuras
- Extract Backstage Passes functionality separately and apply to main fn
- Time to add the NEW Conjured item
  - Start with test cases
  - Add separate fn like with other cases
  - Update snapshot since it was incorrect for Conjured

# Gilded Rose

This is the Gilded Rose kata in TypeScript.

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line

There are two unit test frameworks to choose from, Jest and Mocha.

```sh
npm run test:jest
```

To run all tests in watch mode

```sh
npm run test:jest:watch
```

## Run the TextTest fixture from the Command-Line

_You may need to install `ts-node`_

```sh
npx ts-node test/golden-master-text-test.ts
```

Or with number of days as args:

```sh
npx ts-node test/golden-master-text-test.ts 10
```

You should make sure the command shown above works when you execute it in a terminal before trying to use TextTest (see below).

## Run the TextTest approval test that comes with this project

There are instructions in the [TextTest Readme](../texttests/README.md) for setting up TextTest. You will need to specify the Python executable and interpreter in [config.gr](../texttests/config.gr). Uncomment these lines:

    executable:${TEXTTEST_HOME}/python/texttest_fixture.py
    interpreter:python
