//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from "assert"

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import * as myExtension from '../extension';
import {Color} from "../store/figma/color"

// Defines a Mocha test suite to group tests of similar kind together
describe("Figma Color Type", function() {
  // Defines a Mocha unit test
  it("Has rgba format", function() {
    const color = Color.create({r: 0, g: 0, b: 0, a: 1})
    assert.deepEqual(color, {r: 0, b: 0, g: 0, a: 1})
    assert.equal(-1, [1, 2, 3].indexOf(0))
  })
})
