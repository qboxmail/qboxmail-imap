var assert = require("assert");

var normalizeFetchXMailbox = require("../lib/Parser").normalizeFetchXMailbox;
var cases = require("./fixtures/normalize-fetch-xmailbox");

cases.forEach(function (testCase) {
  var actual = normalizeFetchXMailbox(testCase.input);
  assert.strictEqual(
    actual,
    testCase.expected,
    "[" + testCase.name + "] Expected: " + testCase.expected + " Got: " + actual
  );
});
